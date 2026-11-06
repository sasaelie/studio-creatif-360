import Container from './ui/Container'
import styles from './Mission.module.css'
import Image from 'next/image'

export default function Mission() {
  return (
    <section id="mission" className={styles.section}>
      <Container className={styles.layout}>
        <div className={styles.imageFrame}>
          <Image src="/mission-image.jpg" alt="Notre mission" fill className={styles.image} sizes="(min-width: 1280px) 600px, (min-width: 768px) 45vw, 95vw" />
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>Notre mission</h2>
          <p className={styles.description}>
            StudioCreatif360 est une ASBL qui propose un espace de création accessible et convivial, autour de la couture et de la création textile.
          </p>
          <ul className={styles.benefits}>
            {['Petits groupes de 5', 'Enfants & adultes', 'Pédagogie par projet'].map(item => (
              <li key={item} className={styles.benefit}>
                <span aria-hidden="true" className={styles.check}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
