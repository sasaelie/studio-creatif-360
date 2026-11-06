'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { illustrationAssets } from '@/data/illustrations'
import styles from './Illustration.module.css'

export default function Illustration({ src, alt, sizes = '(min-width: 1024px) 400px, (min-width: 640px) 45vw, 90vw', banner = false, large = false, priority = false }: {
  src: string
  alt: string
  sizes?: string
  banner?: boolean
  large?: boolean
  priority?: boolean
}) {
  const [failedSource, setFailedSource] = useState<string | null>(null)
  const asset = illustrationAssets[src]

  useEffect(() => {
    if (!asset) console.error('[Illustration.tsx > resolveIllustration] Visuel absent du registre ; source reçue :', src)
  }, [asset, src])

  function handleImageError() {
    console.error('[Illustration.tsx > handleImageError] Chargement du visuel impossible ; source reçue :', src)
    setFailedSource(src)
  }

  return <div className={[styles.frame, banner ? styles.banner : '', large ? styles.large : ''].join(' ')}>
    {failedSource === src || !asset
      ? <span role="img" aria-label={alt} className={styles.fallback}>Visuel indisponible</span>
      : <Image src={asset} alt={alt} sizes={sizes} priority={priority} className={styles.image} onError={handleImageError} />}
  </div>
}
