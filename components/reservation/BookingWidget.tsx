'use client'

import { useRef } from 'react'
import { useBookingWidget } from '@/hooks/useBookingWidget'
import { site } from '@/data/site'
import styles from './BookingWidget.module.css'

export default function BookingWidget() {
  const hostRef = useRef<HTMLDivElement>(null)
  const { status, retry } = useBookingWidget(hostRef)

  return <div className={styles.widget}>
    {status === 'loading' ? <p role="status" className={styles.notice}>Chargement des ateliers et des disponibilités…</p> : null}
    <div ref={hostRef} className={styles.host} data-status={status} aria-busy={status === 'loading'} />
    {status === 'error' ? <div className={styles.notice}>
      <p role="alert">Le module de réservation est indisponible pour le moment.</p>
      <button type="button" className="button-secondary" onClick={retry}>Réessayer</button>
      <p>Pour toute question, écrivez-nous à <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </div> : null}
    <noscript><p>Activez JavaScript pour utiliser la réservation, ou contactez-nous à {site.email}.</p></noscript>
  </div>
}
