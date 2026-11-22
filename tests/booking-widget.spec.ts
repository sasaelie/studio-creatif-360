import { test, expect } from '@playwright/test'
import { booking } from '../data/booking'
import { installBookingWidgetMock } from './fixtures/booking-widget'

test('le catalogue remplace les horaires et fonctionne après navigation entre les deux entrées', async ({ page }) => {
  await installBookingWidgetMock(page)
  await page.goto('/')
  await page.locator('#programme').scrollIntoViewIfNeeded()
  const script = page.locator('#programme script')
  await expect(script).toHaveAttribute('src', 'https://saas-booking-public-test.vercel.app/widget.js?v=4')
  await expect(script).toHaveAttribute('data-organization', 'moncoutire')
  await expect(script).toHaveAttribute('data-mode', 'inline')
  await expect(script).toHaveAttribute('defer', '')
  await expect(page.locator('#programme article')).toHaveCount(0)
  await expect(page.locator('#programme')).not.toContainText('Mercredi')
  const frame = page.frameLocator('#programme iframe')
  await expect(frame.getByRole('heading', { name: 'Choisissez un atelier' })).toBeVisible()
  await expect(page.locator('#programme a[data-booking-fallback]')).toHaveAttribute('href', 'https://saas-booking-public-test.vercel.app/moncoutire')
  await expect(page.locator('#programme a[data-booking-fallback]')).toHaveAttribute('target', '_blank')
  await expect(page.locator('#programme a[data-booking-fallback]')).toHaveAttribute('rel', 'noopener noreferrer')
  await frame.getByRole('button', { name: 'Choisir une séance' }).click()
  await expect(frame.getByText('Choisissez votre date.')).toBeVisible()
  await expect.poll(() => page.locator('#programme iframe').evaluate(element => element.getBoundingClientRect().height)).toBe(900)
  const reservationLink = page.getByRole('link', { name: 'Réserver un atelier', exact: true })
  // Revenir au bouton avant le clic évite de viser l’iframe pendant le défilement automatisé.
  await reservationLink.scrollIntoViewIfNeeded()
  await reservationLink.click()
  await expect(page).toHaveURL(/\/reservation$/)
  await expect(page.frameLocator('main iframe').getByRole('heading', { name: 'Choisissez un atelier' })).toBeVisible()
  await expect(page.locator('main iframe')).toHaveCount(1)
  await expect(page.locator('main form')).toHaveCount(0)
  await page.getByRole('link', { name: 'Retour aux ateliers', exact: false }).click()
  await expect(page.locator('#programme iframe')).toHaveCount(1)
  await expect(page.frameLocator('#programme iframe').getByRole('heading', { name: 'Choisissez un atelier' })).toBeVisible()
})

test('une erreur de chargement est expliquée et un nouvel essai recharge le module', async ({ page }) => {
  const errors: string[] = []
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  await installBookingWidgetMock(page)
  await page.route(booking.scriptUrl, route => route.abort(), { times: 1 })
  await page.goto('/reservation')
  await expect(page.locator('main').getByRole('alert')).toContainText('indisponible')
  await expect(page.locator('main iframe')).toHaveCount(0)
  await expect(page.locator('main').getByRole('link', { name: booking.fallbackLabel })).toHaveAttribute('href', booking.publicUrl)
  expect(errors.some(message => message.includes('[useBookingWidget.ts > failWidget]'))).toBe(true)
  await page.getByRole('button', { name: 'Réessayer', exact: true }).click()
  await expect(page.frameLocator('main iframe').getByRole('heading', { name: 'Choisissez un atelier' })).toBeVisible()
  await expect(page.locator('main').getByRole('alert')).toHaveCount(0)
  await expect(page.locator('main iframe')).toHaveCount(1)
  await expect(page.locator('main a[data-booking-fallback]')).toHaveCount(1)
})

test('un script sans réponse ne reste pas en chargement indéfini', async ({ page }) => {
  await page.clock.install()
  let release!: () => void
  const pendingResponse = new Promise<void>(resolve => { release = resolve })
  await page.route(booking.scriptUrl, async route => { await pendingResponse; await route.abort() })
  try {
    await page.goto('/reservation', { waitUntil: 'domcontentloaded' })
    await expect(page.locator('main script[src]')).toHaveCount(1)
    await page.clock.fastForward(booking.loadingTimeoutMs + 1000)
    await expect(page.locator('main').getByRole('alert')).toContainText('indisponible')
    await expect(page.locator('main iframe')).toHaveCount(0)
    await expect(page.locator('main script[src]')).toHaveCount(0)
    await expect(page.locator('main').getByRole('link', { name: booking.fallbackLabel })).toBeVisible()
  } finally {
    release()
    await page.unrouteAll({ behavior: 'wait' })
  }
})

test('un script chargé sans module conserve une sortie accessible', async ({ page }) => {
  await page.route(booking.scriptUrl, route => route.fulfill({ contentType: 'application/javascript', body: 'void 0;' }))
  await page.goto('/reservation')
  await expect(page.locator('main').getByRole('alert')).toContainText('indisponible')
  await expect(page.locator('main').getByRole('link', { name: booking.fallbackLabel })).toBeVisible()
  await expect(page.locator('main script[src]')).toHaveCount(0)
})

test('sans JavaScript le lien de réservation reste disponible', async ({ browser, baseURL }) => {
  const page = await browser.newPage({ javaScriptEnabled: false, baseURL })
  try {
    await page.goto('/reservation')
    const fallback = page.locator('main').getByRole('link', { name: booking.fallbackLabel })
    await expect(fallback).toBeVisible()
    await expect(fallback).toHaveAttribute('href', booking.publicUrl)
    await expect(fallback).toHaveAttribute('target', '_blank')
    await expect(fallback).toHaveAttribute('rel', 'noopener noreferrer')
    await expect(page.locator('main iframe')).toHaveCount(0)
  } finally {
    await page.close()
  }
})

test('le conteneur du module reste accessible sans débordement sur petit et grand écran', async ({ page }) => {
  await installBookingWidgetMock(page)
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/reservation')
    await expect(page.frameLocator('main iframe').getByRole('heading', { name: 'Choisissez un atelier' })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    expect(await page.frameLocator('main iframe').locator('html').evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true)
  }
})
