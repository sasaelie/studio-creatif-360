const scriptUrl = 'https://saas-booking-public-test.vercel.app/widget.js?v=3'
const organization = 'studiocreatif360'
const origin = new URL(scriptUrl).origin

export const booking = {
  scriptUrl,
  organization,
  origin,
  embedUrl: `${origin}/embed/${organization}`,
  mode: 'inline',
  resizeMessageType: 'booking-widget:resize',
  minHeight: 320,
  maxHeight: 6000,
  loadingTimeoutMs: 20_000,
} as const
