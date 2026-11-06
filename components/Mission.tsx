import Container from './ui/Container'
import styles from './Mission.module.css'
import Illustration from './ui/Illustration'
import Link from 'next/link'
import { site } from '@/data/site'

export default function Mission() {
  return (
    <section id="mission" className={styles.section}>
      <Container narrow>
        <div className={styles.layout}>
        <div className={styles.content}>
          <h2 className={styles.title}><Link href="/notre-mission">Notre mission</Link></h2>
          <p className={styles.description}>
            Apprendre la couture à partir de zéro, un projet à la fois. Avec Alyssia Wilkins, les enfants et les adultes découvrent les bases dans une ambiance conviviale et avancent sur leurs propres créations.
          </p>
          <ul className={styles.benefits}>
            {[`${site.groupCapacity} participants maximum`, 'Enfants, ados et adultes', 'Une pédagogie par projet'].map(item => (
              <li key={item} className={styles.benefit}>
                <span aria-hidden="true" className={styles.check}>✓</span>
                {item}
              </li>
            ))}
          </ul>
          <p><Link href="/localisation">Un atelier à Seraing, près de Liège.</Link></p>
          <Link href="/notre-mission" className="button-secondary">Découvrir notre mission</Link>
        </div>
        <div className={styles.imageFrame}>
          <Illustration src="/mission-image.jpg" alt="Affiche de conseils pour débuter la couture, avec une machine Jack" sizes="(min-width: 768px) 320px, 85vw" />
        </div>
        </div>
      </Container>
    </section>
  )
}
