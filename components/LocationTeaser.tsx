import Link from 'next/link'
import Container from './ui/Container'
import { site } from '@/data/site'
import styles from './LocationTeaser.module.css'

export default function LocationTeaser() {
  return <section id="localisation" className={styles.section}>
    <Container narrow>
      <h2>Votre atelier de couture à Seraing</h2>
      <p>Retrouvez {site.legalName} au {site.address[0]}, à {site.address[1]}, près de Liège.</p>
      <Link href="/localisation" className="button-secondary">Adresse et itinéraire</Link>
    </Container>
  </section>
}
