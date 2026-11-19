import type { Page } from '@playwright/test'
import { booking } from '../../data/booking'

export const mockWidgetScript = `(() => {
  const script = document.currentScript;
  const origin = new URL(script.src).origin;
  const frame = document.createElement('iframe');
  frame.src = origin + '/embed/' + script.dataset.organization;
  frame.title = 'Réserver une activité';
  frame.style.cssText = 'display:block;width:100%;border:0;height:1000px';
  window.addEventListener('message', event => {
    if (event.origin !== origin || event.source !== frame.contentWindow) return;
    const height = event.data?.height;
    if (event.data?.type === 'booking-widget:resize' && Number.isFinite(height) && height >= 320 && height <= 6000) frame.style.height = Math.ceil(height) + 'px';
  });
  script.insertAdjacentElement('afterend', frame);
})();`

// Le doublage couvre le contrat du widget, sans appeler une API de réservation réelle.
export async function installBookingWidgetMock(page: Page, reportHeight = true) {
  await page.route(`${booking.origin}/**`, async route => {
    const request = route.request()
    if (request.method() !== 'GET') throw new Error(`Requête de réservation interdite dans les tests : ${request.method()} ${request.url()}`)
    const url = new URL(request.url())
    if (url.pathname === '/widget.js') {
      await route.fulfill({ contentType: 'application/javascript', body: mockWidgetScript })
      return
    }
    if (url.pathname === new URL(booking.embedUrl).pathname) {
      await route.fulfill({ contentType: 'text/html; charset=utf-8', body: `<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Catalogue de test</title><style>body{margin:0;padding:16px;box-sizing:border-box;font:16px sans-serif;overflow-wrap:anywhere}button{min-height:44px;max-width:100%}h1{font-size:24px}</style><body><h1>Choisissez un atelier</h1><p>Catalogue de test sans réservation réelle.</p><button type="button" id="choose">Choisir une séance</button><p id="details" hidden>Choisissez votre date.</p><script>const report = height => parent.postMessage({type:'booking-widget:resize',height},'*');document.querySelector('#choose').onclick=()=>{document.querySelector('#details').hidden=false;report(900)};${reportHeight ? 'requestAnimationFrame(() => report(640));' : ''}</script></body></html>` })
      return
    }
    throw new Error(`Chemin externe inattendu dans les tests : ${request.url()}`)
  })
}
