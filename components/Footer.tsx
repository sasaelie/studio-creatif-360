import { navigation } from '@/data/navigation'
import Container from './ui/Container'
import styles from './Footer.module.css'
import Link from 'next/link'
import Brand from './ui/Brand'
import { site } from '@/data/site'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.layout}>
        <div className={styles.brand}>
          <Link href="/" aria-label="Studio Créatif 360 — accueil"><Brand /></Link>
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
            {site.address.map(line => <li key={line}>{line}</li>)}
            <li><a href={`mailto:${site.email}`} className={styles.link}>{site.email}</a></li>
          </ul>
        </div>
        <div className={styles.legal}>
          <h4 className={styles.heading}>Légal</h4>
          <ul className={styles.links}>
            <li><Link href="/mentions-legales" className={styles.link}>Mentions légales</Link></li>
            <li><Link href="/rgpd" className={styles.link}>Confidentialité</Link></li>
            <li className={styles.businessNumber}>N° d’entreprise : {site.companyNumber}</li>
          </ul>
        </div>
      </Container>
    </footer>
  )
}
