import Link from 'next/link'
import { programs } from '@/data/programs'
import { reservationHref } from '@/data/navigation'
import Container from './ui/Container'
import SectionHeading from './ui/SectionHeading'
import styles from './Programs.module.css'
import { site } from '@/data/site'

export default function Programs() {
  return (
    <section id="programme" className={styles.section}>
      <Container narrow>
        <div className={styles.heading}>
          <SectionHeading title="Horaires et tarifs des cours à Seraing" description={`${site.groupCapacity} participants maximum par séance, pour les enfants et les adultes débutants.`} />
          <p className={styles.availabilityNote}>Prix par séance. Contactez-nous pour confirmer une place avant de venir.</p>
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
                <p className={styles.availability}>{site.groupCapacity} participants<br />maximum</p>
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
