'use client'

import { useRef } from 'react'
import { useBookingWidget } from '@/hooks/useBookingWidget'
import { site } from '@/data/site'
import { booking } from '@/data/booking'
import styles from './BookingWidget.module.css'

export default function BookingWidget() {
  const hostRef = useRef<HTMLDivElement>(null)
  const { status, retry } = useBookingWidget(hostRef)

  return <div className={styles.widget}>
    {status === 'loading' ? <p role="status" className={styles.notice}>Chargement des ateliers et des disponibilités…</p> : null}
    <div ref={hostRef} className={styles.host} data-status={status} aria-busy={status === 'loading'} />
    {status === 'error' ? <div className={styles.notice}>
      <p role="alert">Le module de réservation est indisponible pour le moment.</p>
      <a href={booking.publicUrl} data-booking-fallback target="_blank" rel="noopener noreferrer" className="button-secondary">{booking.fallbackLabel}</a>
      <button type="button" className="button-secondary" onClick={retry}>Réessayer</button>
      <p>Pour toute question, écrivez-nous à <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </div> : null}
    <noscript><p>Activez JavaScript pour utiliser le module intégré, ou <a href={booking.publicUrl} data-booking-fallback target="_blank" rel="noopener noreferrer">{booking.fallbackLabel}</a>.</p></noscript>
  </div>
}
