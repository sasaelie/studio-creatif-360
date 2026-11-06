import Link from 'next/link'
import { programs } from '@/data/programs'
import { reservationHref } from '@/data/navigation'
import Container from './ui/Container'
import SectionHeading from './ui/SectionHeading'
import styles from './Programs.module.css'

export default function Programs() {
  return (
    <section id="programme" className={styles.section}>
      <Container narrow>
        <div className={styles.heading}>
          <SectionHeading title="Programme & Tarifs" description="Cinq créneaux par semaine, 36 semaines par an." />
          <p className={styles.availabilityNote}>Disponibilités indicatives, à confirmer lors de la réservation.</p>
        </div>
        <div className={styles.list}>
          {programs.map(prog => (
            <article key={prog.id} className={styles.program}>
              <div className={styles.details}>
                <div className={styles.dayAudience}>
                  <span className={styles.day}>{prog.day}</span>
                  <span className={styles.audience}>{prog.audience}</span>
                </div>
                <p className={styles.schedule}>{prog.schedule}</p>
              </div>
              <div className={styles.actions}>
                <div className={styles.priceBlock}>
                  <span className={styles.price}>{prog.price} €</span>
                  <span className={styles.priceLabel}>par séance</span>
                </div>
                <p className={styles.availability}>{prog.places} place{prog.places > 1 ? "s" : ""}<br />sur 5</p>
                <Link href={`${reservationHref}?atelier=${prog.id}`} className={styles.reserve} aria-label={`Demander l’atelier ${prog.day.toLowerCase()} ${prog.audience.toLowerCase()} à ${prog.schedule}`}>
                  Demander
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
