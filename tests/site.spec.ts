import { test, expect } from '@playwright/test'

const paths = ['/', '/notre-mission', '/localisation', '/reservation', '/cours', '/cours/machine', '/cours/tissu', '/cours/patron', '/blog', '/blog/chouchou', '/blog/materiel', '/mentions-legales', '/rgpd']
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
  for (const selector of ['body > header', '#mission > div > div', '#programme article', '#cours > div > div', '#blog > div > div', 'footer > div']) {
    const style = await page.locator(selector).first().evaluate(element => {
      const computed = getComputedStyle(element)
      return { background: computed.backgroundColor, blur: computed.backdropFilter, shadow: computed.boxShadow }
    })
    const alpha = Number(style.background.match(/,\s*([\d.]+)\)$/)?.[1] ?? 1)
    expect(alpha).toBeGreaterThan(0)
    expect(alpha).toBeLessThan(1)
    expect(style.blur).not.toBe('none')
    expect(style.shadow).not.toBe('none')
  }
  await expect(page.locator('#cours article, #blog article')).toHaveCount(0)
  await page.locator('#cours').getByRole('link', { name: 'Découvrir les cours', exact: true }).click()
  await expect(page).toHaveURL(/\/cours$/)
  await expect(page.getByRole('article')).toHaveCount(3)
  await page.goto('/')
  await page.getByRole('link', { name: 'Tous les articles', exact: true }).click()
  await expect(page).toHaveURL(/\/blog$/)
  await expect(page.getByRole('article')).toHaveCount(2)
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
  await page.goto('/cours')
  await expect(page.getByText('Visuel indisponible', { exact: true })).toBeVisible()
})

test('les fiches restent entières sans action d’agrandissement et apportent des repères pratiques', async ({ page }) => {
  for (const path of ['/blog', '/cours', '/blog/chouchou', '/cours/machine']) {
    await page.goto(path)
    await expect(page.getByText('Voir le visuel en grand', { exact: true })).toHaveCount(0)
    for (const image of await page.locator('main img').all()) {
      await image.scrollIntoViewIfNeeded()
      await image.evaluate(element => (element as HTMLImageElement).decode())
      const geometry = await image.evaluate(element => {
        const image = element as HTMLImageElement
        const box = image.getBoundingClientRect()
        return { ratio: box.width / box.height, naturalRatio: image.naturalWidth / image.naturalHeight, link: image.closest('a'), interactive: image.closest('button, [role="button"]') !== null }
      })
      expect(geometry.ratio).toBeCloseTo(geometry.naturalRatio, 2)
      expect(geometry.link).toBeNull()
      expect(geometry.interactive).toBe(false)
    }
  }
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/blog')
  const article = page.getByRole('article').first()
  await expect(article).toContainText('Matériel : chute de tissu, élastique et fil.')
  await expect(article).toContainText('Gestes travaillés : couture droite')
  await expect(article).not.toContainText('Pour prendre confiance')
  const fillRatio = await article.locator('img').evaluate(element => element.getBoundingClientRect().width / element.closest('article')!.getBoundingClientRect().width)
  expect(fillRatio).toBeGreaterThan(.9)
  const heading = article.getByRole('heading').getByRole('link')
  expect(await heading.evaluate(element => getComputedStyle(element).textDecorationLine)).toBe('none')
  await heading.click()
  await expect(page).toHaveURL(/\/blog\/chouchou$/)
})

test('le retour reste sous le menu, même avec le texte agrandi sur petit écran', async ({ page }) => {
  for (const width of [320, 1024]) {
    await page.setViewportSize({ width, height: 740 })
    await page.goto('/blog')
    const back = page.locator('main').getByRole('link', { name: 'Retour à l’accueil', exact: false })
    const gap = () => back.evaluate(element => element.getBoundingClientRect().top - document.querySelector('body > header')!.getBoundingClientRect().bottom)
    await expect.poll(gap).toBeGreaterThanOrEqual(24)
    await page.addStyleTag({ content: 'html { font-size: 200% !important; }' })
    await expect.poll(gap).toBeGreaterThanOrEqual(24)
    const header = page.locator('body > header')
    expect(await header.evaluate(element => element.getBoundingClientRect().height < innerHeight * .4)).toBe(true)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await expect(back).toBeInViewport()
    const menu = page.getByRole('button', { name: 'Menu', exact: true })
    await expect(menu).toBeVisible()
    await menu.click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    const menuTitle = dialog.getByRole('heading', { name: 'Navigation', exact: true })
    expect(await menuTitle.evaluate(element => element.getBoundingClientRect().height <= parseFloat(getComputedStyle(element).lineHeight) + 1)).toBe(true)
    expect(await dialog.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true)
    await dialog.getByRole('link', { name: 'Réserver', exact: true }).scrollIntoViewIfNeeded()
    await expect(dialog.getByRole('link', { name: 'Réserver', exact: true })).toBeInViewport()
    await page.keyboard.press('Escape')
    await expect(menu).toBeFocused()
    await back.click()
    await expect(page).toHaveURL(/\/#blog$/)
  }
})

test('les informations confirmées sont cohérentes entre les horaires, la FAQ et les pages', async ({ page }) => {
  await page.goto('/')
  const sessions = page.locator('#programme article')
  await expect(sessions).toHaveCount(4)
  await expect(sessions.filter({ hasText: 'Enfants' })).toHaveCount(2)
  await expect(sessions.filter({ hasText: 'Adultes' })).toHaveCount(2)
  for (const session of await sessions.all()) {
    const text = await session.innerText()
    expect(text).toContain(text.includes('Enfants') ? '20 €' : '30 €')
    expect(text).toContain('5 participants')
    expect(text).not.toMatch(/places?\s+sur/)
  }
  await expect(page.locator('#programme')).not.toContainText('Vendredi')
  await page.getByText('Combien coûte un cours de couture ?', { exact: true }).click()
  await expect(page.locator('#questions details[open]')).toContainText('30 €')
  await page.goto('/notre-mission')
  await expect(page.locator('main')).toContainText('Alyssia Wilkins')
  await expect(page.locator('main')).toContainText('trois générations')
  await expect(page.locator('main')).toContainText('pas encore des propositions')
  for (const path of ['/localisation', '/mentions-legales', '/rgpd']) {
    await page.goto(path)
    await expect(page.locator('main')).toContainText('Rue Sous les Vignes 8, boîte 1')
    await expect(page.locator('main')).toContainText('4100 Seraing')
    await expect(page.locator('body')).not.toContainText('Bois de Mont')
  }
  await page.goto('/mentions-legales')
  await expect(page.locator('main')).toContainText('21 août 2026')
  await page.goto('/reservation?atelier=vendredi-enfants')
  await expect(page.getByLabel('Atelier souhaité')).toHaveValue('conseil')
  await expect(page.getByLabel('Atelier souhaité').locator('option')).toHaveCount(5)
})

test('les pages dédiées ont leurs métadonnées et une localisation structurée cohérente', async ({ page, request }) => {
  const sitemap = await (await request.get('/sitemap.xml')).text()
  const titles: string[] = []
  const descriptions: string[] = []
  for (const path of paths) {
    await page.goto(path)
    const title = await page.title()
    expect(titles).not.toContain(title)
    titles.push(title)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{50,}/)
    const description = (await page.locator('meta[name="description"]').getAttribute('content'))!
    expect(descriptions, path).not.toContain(description)
    descriptions.push(description)
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveCount(1)
    expect(new URL((await canonical.getAttribute('href'))!).href).toBe(new URL(path, 'https://studio-creatif-360.vercel.app').href)
    expect(sitemap).toContain('https://studio-creatif-360.vercel.app' + path)
    const organization = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText())
    expect(organization.name).toBe('StudioCreatif360 ASBL')
    expect(organization.address.streetAddress).toBe('Rue Sous les Vignes 8, boîte 1')
    expect(organization.address.postalCode).toBe('4100')
  }
  await page.goto('/localisation')
  const maps = new URL((await page.getByRole('link', { name: 'Préparer mon itinéraire dans Google Maps' }).getAttribute('href'))!)
  expect(maps.hostname).toBe('www.google.com')
  expect(maps.searchParams.get('destination')).toContain('Rue Sous les Vignes 8, boîte 1, 4100 Seraing')
})
