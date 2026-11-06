import { reservationHref } from '@/data/navigation'
import Container from './ui/Container'
import styles from './Hero.module.css'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className={styles.section}>
      <div className={styles.decoration}></div>
      <Container className={styles.layout}>
        <div className={styles.content}>
          <span className={styles.badge}>
            ASBL à Seraing
          </span>
          <h1 className={styles.title}>
            Apprendre, créer, <br/>
            <span className={styles.accent}>se rencontrer.</span>
          </h1>
          <p className={styles.description}>
            Ateliers de couture et de création textile pour enfants et adultes, en petits groupes de 5.
          </p>
          <div className={styles.actions}>
            <Link prefetch={false} href={reservationHref} className="button-primary">
              Réserver un atelier
            </Link>
            <Link href="#mission" className="button-secondary">
              Découvrir l'ASBL
            </Link>
          </div>
        </div>
        <div className={styles.imageFrame}>
          <Image src="/hero-image.jpg" alt="Atelier de couture" fill className={styles.image} sizes="(min-width: 1280px) 600px, (min-width: 768px) 45vw, 95vw" priority />
          <div className={styles.overlay}></div>
        </div>
      </Container>
    </section>
  )
}
