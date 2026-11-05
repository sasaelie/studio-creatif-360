import { navigation } from '@/data/navigation'
import Container from './ui/Container'
import styles from './Footer.module.css'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.layout}>
        <div className={styles.brand}>
          <h3 className={styles.brandTitle}>StudioCreatif360</h3>
          <p className={styles.description}>
            De l'imagination à la création.<br/>
            ASBL à Seraing.
          </p>
        </div>
        <div>
          <h4 className={styles.heading}>Navigation</h4>
          <ul className={styles.links}>
            <li><Link href="/" className={styles.link}>Accueil</Link></li>
            {navigation.map(item => <li key={item.href}><Link href={item.href} className={styles.link}>{item.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className={styles.heading}>Contact</h4>
          <ul className={styles.contact}>
            <li>Rue Bois de Mont 288</li>
            <li>4101 Seraing</li>
            <li><a href="mailto:contact@studiocreatif360.be" className={styles.link}>contact@studiocreatif360.be</a></li>
          </ul>
        </div>
        <div>
          <h4 className={styles.heading}>Légal</h4>
          <ul className={styles.links}>
            <li><Link prefetch={false} href="/mentions-legales" className={styles.link}>Mentions légales</Link></li>
            <li><Link prefetch={false} href="/rgpd" className={styles.link}>Politique de confidentialité</Link></li>
            <li className={styles.businessNumber}>N° d'entreprise : 1041.458.712</li>
          </ul>
        </div>
      </Container>
    </footer>
  )
}
