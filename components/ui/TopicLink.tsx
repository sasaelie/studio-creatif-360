import Link from 'next/link'
import styles from './TopicLink.module.css'

export default function TopicLink({ title, description, href, label }: {
  title: string
  description: string
  href: string
  label: string
}) {
  return <div className={styles.panel}>
    <div className={styles.copy}>
      <h2><Link href={href}>{title}</Link></h2>
      <p>{description}</p>
    </div>
    <Link href={href} className="button-secondary">{label}</Link>
  </div>
}
