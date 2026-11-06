'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './Illustration.module.css'

export default function Illustration({ src, alt, sizes = '(min-width: 1024px) 400px, (min-width: 640px) 45vw, 90vw', banner = false, large = false, priority = false }: {
  src: string
  alt: string
  sizes?: string
  banner?: boolean
  large?: boolean
  priority?: boolean
}) {
  const [failed, setFailed] = useState(false)

  function handleImageError() {
    console.error('[Illustration.tsx > handleImageError] Chargement du visuel impossible ; source reçue :', src)
    setFailed(true)
  }

  return <a href={src} target="_blank" rel="noopener noreferrer" className={[styles.frame, banner ? styles.banner : '', large ? styles.large : ''].join(' ')} aria-label={`${alt} — ouvrir le visuel entier dans un nouvel onglet`}>
    <span className={styles.imageArea}>
      {failed ? <span role="img" aria-label={alt} className={styles.fallback}>Visuel indisponible</span> : <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={styles.image} onError={handleImageError} />}
    </span>
    <span className={styles.caption}>Voir le visuel en grand <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" focusable="false"><path d="M7 17 17 7M7 7h10v10" /></svg></span>
  </a>
}
