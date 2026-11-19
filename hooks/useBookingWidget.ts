'use client'

import { useEffect, useState, type RefObject } from 'react'
import { booking } from '@/data/booking'

export function useBookingWidget(hostRef: RefObject<HTMLDivElement>) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
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

    function handleMessage(event: MessageEvent<unknown>) {
      const frame = host!.querySelector('iframe')
      if (!active || settled || !frame || event.origin !== booking.origin || event.source !== frame.contentWindow) return
      const data = event.data
      if (!data || typeof data !== 'object' || !('type' in data) || data.type !== booking.resizeMessageType) return
      const height = 'height' in data ? data.height : undefined
      if (typeof height !== 'number' || !Number.isFinite(height) || height < booking.minHeight || height > booking.maxHeight) {
        console.warn('[useBookingWidget.ts > handleMessage] Hauteur de module invalide ; valeur reçue :', height)
        return
      }
      settled = true
      window.clearTimeout(timer)
      setStatus('ready')
    }

    function handleScriptError() { failWidget('Chargement du script de réservation impossible') }
    function handleScriptLoad() {
      const frame = host!.querySelector('iframe')
      if (!frame || frame.src !== booking.embedUrl) failWidget('Le script n’a pas créé le module de réservation attendu')
    }

    function mountWidget() {
      if (!active || started) return
      started = true
      script = document.createElement('script')
      script.src = booking.scriptUrl
      script.dataset.organization = booking.organization
      script.dataset.mode = booking.mode
      script.defer = true
      script.addEventListener('error', handleScriptError)
      script.addEventListener('load', handleScriptLoad)
      // Le script utilise document.currentScript pour insérer son iframe juste après lui.
      host!.append(script)
      timer = window.setTimeout(() => failWidget('Le module ne répond pas dans le délai prévu'), booking.loadingTimeoutMs)
    }

    window.addEventListener('message', handleMessage)
    // Le widget contient une iframe lazy : démarrer près de l’écran évite un faux délai dépassé.
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
      window.removeEventListener('message', handleMessage)
      script?.removeEventListener('error', handleScriptError)
      script?.removeEventListener('load', handleScriptLoad)
      host.replaceChildren()
    }
  }, [attempt, hostRef])

  return { status, retry: () => setAttempt(value => value + 1) }
}
