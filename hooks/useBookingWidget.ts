'use client'

import { useEffect, useState, type RefObject } from 'react'
import { booking } from '@/data/booking'

export function useBookingWidget(hostRef: RefObject<HTMLDivElement>) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const host = hostRef.current
    if (!host) {
      console.error('[useBookingWidget.ts > mountWidget] Conteneur introuvable ; élément reçu :', host)
      setStatus('error')
      return
    }
    let active = true
    let started = false
    let settled = false
    let timer: number | undefined
    let script: HTMLScriptElement | undefined
    setStatus('loading')

    function failWidget(reason: string) {
      if (!active || settled) return
      settled = true
      window.clearTimeout(timer)
      console.error('[useBookingWidget.ts > failWidget] ' + reason + ' ; configuration reçue :', { source: booking.scriptUrl, organization: booking.organization })
      // Retirer aussi le script empêche une réponse tardive d’insérer une iframe après l’erreur.
      host!.replaceChildren()
      setStatus('error')
    }

    function handleScriptError() { failWidget('Chargement du script de réservation impossible') }
    function handleScriptLoad() {
      if (!active || settled) return
      const widget = host!.querySelector('[data-booking-widget]')
      if (!widget?.querySelector('iframe')) {
        failWidget('Le script n’a pas créé le module de réservation attendu')
        return
      }
      // La v4 initialise ensuite son iframe et gère seule la réponse du calendrier.
      settled = true
      window.clearTimeout(timer)
      setStatus('loaded')
    }

    function mountWidget() {
      if (!active || started) return
      started = true
      const fallback = document.createElement('a')
      fallback.href = booking.publicUrl
      fallback.dataset.bookingFallback = ''
      fallback.target = '_blank'
      fallback.rel = 'noopener noreferrer'
      fallback.textContent = booking.fallbackLabel
      script = document.createElement('script')
      script.src = booking.scriptUrl
      script.dataset.organization = booking.organization
      script.dataset.mode = booking.mode
      script.defer = true
      script.addEventListener('error', handleScriptError)
      script.addEventListener('load', handleScriptLoad)
      // La v4 reprend le lien précédent et déplace ce nœud dans son propre module.
      host!.append(fallback, script)
      timer = window.setTimeout(() => failWidget('Le module ne répond pas dans le délai prévu'), booking.loadingTimeoutMs)
    }

    // Charger près de la zone visible évite une requête externe inutile en haut de page.
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        observer?.disconnect()
        mountWidget()
      }
    }, { rootMargin: '300px' })
    if (observer) observer.observe(host)
    else {
      console.warn('[useBookingWidget.ts > mountWidget] Observation indisponible, chargement immédiat ; valeur reçue :', typeof IntersectionObserver)
      mountWidget()
    }

    return () => {
      active = false
      observer?.disconnect()
      window.clearTimeout(timer)
      script?.removeEventListener('error', handleScriptError)
      script?.removeEventListener('load', handleScriptLoad)
      host.replaceChildren()
    }
  }, [attempt, hostRef])

  return { status, retry: () => setAttempt(value => value + 1) }
}
