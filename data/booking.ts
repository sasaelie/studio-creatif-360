const scriptUrl = 'https://saas-booking-recette-elis-projects-ddf0bd9d.vercel.app/widget.js?v=3'
const organization = 'moncoutire'
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
