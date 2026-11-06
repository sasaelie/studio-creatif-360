import Image from 'next/image'
import { site } from '@/data/site'
import styles from './Brand.module.css'

export default function Brand() {
  return <span className={styles.brand}>
    <Image src="/logo-noir.png" alt="" width={48} height={48} className={styles.symbol} />
    <span className={styles.words}><span className={styles.name}>{site.name}</span><span className={styles.tagline}>Couture · Création · Rencontres</span></span>
  </span>
}
