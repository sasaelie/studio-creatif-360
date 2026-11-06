import Container from './ui/Container'
import TopicLink from './ui/TopicLink'
import styles from './Blog.module.css'

export default function Blog() {
  return (
    <section id="blog" className={styles.section}>
      <Container narrow>
        <TopicLink title="Le blog : conseils et tutoriels" description="Des idées, des gestes à découvrir et de petits projets pour poursuivre votre apprentissage de la couture." href="/blog" label="Tous les articles" />
      </Container>
    </section>
  )
}
