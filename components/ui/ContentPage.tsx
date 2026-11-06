import type { ReactNode } from 'react'
import Link from 'next/link'
import Container from './Container'
import styles from './ContentPage.module.css'

export default function ContentPage({ title, description, children, backHref = '/', backLabel = 'Retour à l’accueil', illustrated = false }: {
  title: string
  description?: string
  children: ReactNode
  backHref?: string
  backLabel?: string
  illustrated?: boolean
}) {
  return <section className={styles.page}>
    <Container narrow>
      <Link className={styles.back} href={backHref}>← {backLabel}</Link>
      <header className={styles.heading}><h1>{title}</h1>{description ? <p>{description}</p> : null}</header>
      <div className={[styles.content, illustrated ? styles.illustrated : ''].join(' ')}>{children}</div>
    </Container>
  </section>
}
