import Link from 'next/link'
import Container from './ui/Container'
import { frequentlyAskedQuestions } from '@/data/faq'
import styles from './Faq.module.css'

export default function Faq() {
  return <section id="questions" className={styles.section} aria-labelledby="faq-title">
    <Container narrow>
      <h2 id="faq-title">Questions fréquentes</h2>
      <div className={styles.questions}>
        {frequentlyAskedQuestions.map(item => <details key={item.question}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>)}
      </div>
      <p className={styles.contact}>Une autre question ? <Link href="/reservation">Écrivez-nous pour préparer votre premier cours.</Link></p>
    </Container>
  </section>
}
