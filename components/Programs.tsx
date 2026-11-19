import BookingWidget from './reservation/BookingWidget'
import Container from './ui/Container'
import SectionHeading from './ui/SectionHeading'
import styles from './Programs.module.css'

export default function Programs() {
  return (
    <section id="programme" className={styles.section}>
      <Container narrow>
        <div className={styles.heading}>
          <SectionHeading title="Réservez votre atelier de couture à Seraing" description="Choisissez votre atelier et votre créneau directement dans le module de réservation." />
        </div>
        <BookingWidget />
      </Container>
    </section>
  )
}
