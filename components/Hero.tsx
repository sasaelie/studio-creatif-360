import { reservationHref } from '@/data/navigation'
import Container from './ui/Container'
import styles from './Hero.module.css'
import Link from 'next/link'
import { about } from '@/data/about'

export default function Hero() {
  return (
    <section className={styles.section}>
      <Container narrow>
        <div className={styles.content}>
          <span className={styles.badge}>
            ASBL à Seraing
          </span>
          <p className={styles.eyebrow}>De l’imagination à la création</p>
          <h1 className={styles.title}>Cours de couture pour débutants à Seraing, pour enfants et adultes</h1>
          <p className={styles.description}>{about.introduction}</p>
          <p className={styles.online}>Vous préférez commencer à distance ? <Link href="/cours">Découvrez nos cours de couture en ligne.</Link></p>
          <div className={styles.actions}>
            <Link href={reservationHref} className="button-primary">
              Demander un atelier
            </Link>
            <Link href="#mission" className="button-secondary">
              Découvrir l'ASBL
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
