import { test, expect } from '@playwright/test'

const paths = ['/', '/reservation', '/cours/machine', '/cours/tissu', '/cours/patron', '/blog', '/blog/chouchou', '/blog/materiel', '/mentions-legales', '/rgpd']
const corruptedText = /\u00C3[\u0080-\u00BF]|\u00C2[\u0080-\u00BF]|\u00E2[\u0080-\u00BF\u20AC\u2010-\u2027]|\uFFFD/

test('les liens principaux aboutissent à des pages et les inconnus à une 404', async ({ request }) => {
  for (const path of paths) {
    const response = await request.get(path)
    expect(response.status(), path).toBe(200)
    expect(await response.text(), path).not.toMatch(corruptedText)
  }
  for (const path of ['/cours/inconnu', '/blog/inconnu', '/page-inconnue']) {
    expect((await request.get(path)).status(), path).toBe(404)
  }
})

test('les pages restent lisibles sans débordement et les images sont entières', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  for (const path of paths) {
    await page.goto(path)
    await page.evaluate(() => document.fonts.ready)
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
    expect(await page.locator('body').innerText()).not.toMatch(corruptedText)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), path).toBe(true)
    for (const image of await page.locator('img').all()) {
      await image.scrollIntoViewIfNeeded()
      await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).complete && (element as HTMLImageElement).naturalWidth > 0)).toBe(true)
      expect(await image.evaluate(element => getComputedStyle(element).objectFit)).toBe('contain')
    }
  }
  expect(errors).toEqual([])
})

test('navigation mobile, clavier, ancres et menu paysage', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 })
  await page.goto('/')
  const trigger = page.getByRole('button', { name: 'Menu', exact: true })
  await trigger.click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(page.getByRole('button', { name: 'Fermer', exact: true })).toBeFocused()
  for (let index = 0; index < 8; index++) {
    await page.keyboard.press('Tab')
    expect(await dialog.evaluate(element => element.contains(document.activeElement))).toBe(true)
  }
  await page.keyboard.press('Escape')
  await expect(trigger).toBeFocused()
  await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  await trigger.click()
  await page.getByRole('navigation', { name: 'Navigation mobile' }).getByRole('link', { name: 'Ateliers', exact: true }).click()
  await expect(dialog).not.toBeVisible()
  await expect(page).toHaveURL(/#programme$/)
  await expect.poll(() => page.locator('#programme h2').evaluate(element => Math.round(element.getBoundingClientRect().top))).toBeLessThan(200)
  const anchorIsVisible = await page.locator('#programme h2').evaluate(element => element.getBoundingClientRect().top > document.querySelector('body > header')!.getBoundingClientRect().bottom)
  expect(anchorIsVisible).toBe(true)
  await page.setViewportSize({ width: 844, height: 390 })
  await trigger.click()
  const action = page.getByRole('navigation', { name: 'Navigation mobile' }).getByRole('link', { name: 'Réserver', exact: true })
  expect(await action.evaluate(element => element.getBoundingClientRect().bottom <= innerHeight)).toBe(true)
  await page.keyboard.press('Escape')
})

test('une demande sélectionne le bon atelier et prépare un e-mail sans confirmation fictive', async ({ page }) => {
  await page.goto('/reservation?atelier=samedi-adultes')
  await expect(page.getByLabel('Atelier souhaité')).toHaveValue('samedi-adultes')
  await page.getByLabel('Votre nom', { exact: true }).fill('Alice Exemple')
  await page.getByLabel('Votre adresse e-mail').fill('alice@example.org')
  await page.getByLabel('Votre message').fill('Je souhaite découvrir la couture.')
  await page.getByRole('button', { name: 'Préparer ma demande' }).click()
  const link = page.getByRole('link', { name: 'Ouvrir ma messagerie' })
  const href = await link.getAttribute('href')
  expect(href).toMatch(/^mailto:contact@studiocreatif360.be\?/)
  expect(decodeURIComponent(href!)).toContain('Samedi — Adultes')
  expect(decodeURIComponent(href!)).toContain('Alice Exemple')
  await expect(page.getByRole('status')).toContainText('prête')
  await page.getByLabel('Votre nom', { exact: true }).fill('Autre personne')
  await expect(link).toHaveCount(0)
  await page.getByLabel('Votre nom', { exact: true }).fill('   ')
  await page.getByRole('button', { name: 'Préparer ma demande' }).click()
  await expect(page.locator('form').getByRole('alert')).toContainText('Vérifiez')
  await page.goto('/reservation?atelier=inconnu')
  await expect(page.getByLabel('Atelier souhaité')).toHaveValue('conseil')
})

test('les cartes et les panneaux utilisent un verre dépoli cohérent', async ({ page }) => {
  await page.goto('/')
  for (const selector of ['body > header', '#programme article', '#cours article', '#blog article', 'footer > div']) {
    const style = await page.locator(selector).first().evaluate(element => {
      const computed = getComputedStyle(element)
      return { background: computed.backgroundColor, blur: computed.backdropFilter, shadow: computed.boxShadow }
    })
    expect(style.background).toMatch(/0\.32\)/)
    expect(style.blur).not.toBe('none')
    expect(style.shadow).not.toBe('none')
  }
  await page.setViewportSize({ width: 768, height: 1024 })
  const centered = await page.locator('#cours article').last().evaluate(element => {
    const box = element.getBoundingClientRect()
    return Math.abs(box.x + box.width / 2 - innerWidth / 2) < 1
  })
  expect(centered).toBe(true)
})

test('texte agrandi, réduction des animations et repli en cas d’image indisponible', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 })
  await page.goto('/')
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' })
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Aller au contenu', exact: true })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#contenu')).toBeFocused()
  await page.route('**/_next/image?*', route => {
    if (route.request().url().includes('cours-tissu')) return route.abort()
    return route.continue()
  })
  await page.goto('/')
  await page.locator('#cours').scrollIntoViewIfNeeded()
  await expect(page.getByText('Visuel indisponible', { exact: true })).toBeVisible()
})
