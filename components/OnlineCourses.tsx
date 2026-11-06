import Container from './ui/Container'
import TopicLink from './ui/TopicLink'
import styles from './OnlineCourses.module.css'

export default function OnlineCourses() {
  return (
    <section id="cours" className={styles.section}>
      <Container narrow>
        <TopicLink title="Cours de couture en ligne" description="Apprenez à votre rythme, même si vous n’êtes pas encore prêt à venir à l’atelier. Découvrez les cours et demandez les modalités par e-mail." href="/cours" label="Découvrir les cours" />
      </Container>
    </section>
  )
}
