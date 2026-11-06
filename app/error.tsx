'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('[error.tsx > ErrorPage] Affichage de la page impossible ; erreur reçue :', { message: error.message, digest: error.digest })
  }, [error])
  return <section className="error-panel">
    <h1>La page n’a pas pu s’afficher</h1>
    <p>Réessayez ou revenez à l’accueil.</p>
    <button className="button-primary" onClick={reset}>Réessayer</button>{' '}
    <Link href="/" className="button-secondary">Retour à l’accueil</Link>
  </section>
}
