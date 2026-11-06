import { reservationHref } from '@/data/navigation'
import Container from './ui/Container'
import styles from './Hero.module.css'
import Link from 'next/link'
import Illustration from './ui/Illustration'

export default function Hero() {
  return (
    <section className={styles.section}>
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
            <Link href={reservationHref} className="button-primary">
              Demander un atelier
            </Link>
            <Link href="#mission" className="button-secondary">
              Découvrir l'ASBL
            </Link>
          </div>
        </div>
        <div className={styles.visual}>
          <Illustration src="/hero-image.jpg" alt="Signature graphique de Studio Créatif 360" banner sizes="(min-width: 1280px) 600px, (min-width: 768px) 45vw, 90vw" priority />
          <div className={styles.visualCopy}>
            <p className={styles.eyebrow}>Un fil, une idée, une rencontre.</p>
            <p>Un espace pour apprendre et laisser grandir votre créativité.</p>
          </div>
          <ul className={styles.highlights}>
            <li><strong>5</strong><span>personnes par groupe</span></li>
            <li><strong>Pour tous</strong><span>enfants et adultes</span></li>
            <li><strong>Seraing</strong><span>un atelier de proximité</span></li>
          </ul>
        </div>
      </Container>
    </section>
  )
}
