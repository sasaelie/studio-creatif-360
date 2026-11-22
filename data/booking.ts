const scriptUrl = 'https://saas-booking-public-test.vercel.app/widget.js?v=4'
const organization = 'moncoutire'
const origin = new URL(scriptUrl).origin

export const booking = {
  scriptUrl,
  organization,
  origin,
  publicUrl: `${origin}/${organization}`,
  fallbackLabel: 'Ouvrir la réservation dans une nouvelle fenêtre',
  mode: 'inline',
  loadingTimeoutMs: 20_000,
} as const
