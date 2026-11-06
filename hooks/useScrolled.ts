'use client'

import { useEffect, useState } from 'react'

export function useScrolled(threshold = 50) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > threshold)
    updateScrolled()
    window.addEventListener('scroll', updateScrolled, { passive: true })
    return () => window.removeEventListener('scroll', updateScrolled)
  }, [threshold])
  return scrolled
}
