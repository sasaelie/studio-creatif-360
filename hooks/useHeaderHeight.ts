'use client'

import { useEffect, type RefObject } from 'react'

export function useHeaderHeight(headerRef: RefObject<HTMLElement>) {
  useEffect(() => {
    const header = headerRef.current
    if (!header) {
      console.error('[useHeaderHeight.ts > observeHeader] En-tête introuvable ; élément reçu :', header)
      return
    }
    const root = document.documentElement
    function measureHeader() {
      const height = Math.ceil(header!.getBoundingClientRect().height)
      if (!Number.isFinite(height) || height <= 0) {
        console.error('[useHeaderHeight.ts > measureHeader] Hauteur d’en-tête invalide ; valeur reçue :', height)
        return
      }
      root.style.setProperty('--site-header-height', `${height}px`)
    }
    measureHeader()
    if (typeof ResizeObserver === 'undefined') {
      console.warn('[useHeaderHeight.ts > observeHeader] Observation indisponible, suivi au redimensionnement ; valeur reçue :', typeof ResizeObserver)
      window.addEventListener('resize', measureHeader)
      return () => {
        window.removeEventListener('resize', measureHeader)
        root.style.removeProperty('--site-header-height')
      }
    }
    const observer = new ResizeObserver(measureHeader)
    observer.observe(header)
    return () => {
      observer.disconnect()
      root.style.removeProperty('--site-header-height')
    }
  }, [headerRef])
}
