import Link from 'next/link'
import Illustration from '../ui/Illustration'
import type { Article } from '@/data/articles'
import styles from './ArticleCard.module.css'

export default function ArticleCard({ article }: { article: Article }) {
  return <article className={styles.card}>
    <div className={styles.imageFrame}>
      <Illustration src={article.image} alt={article.imageAlt} />
    </div>
    <div className={styles.content}>
      <span className={styles.category}>{article.category}</span>
      <h3><Link href={`/blog/${article.id}`}>{article.title}</Link></h3>
      <p>{article.excerpt}</p>
      <Link className={styles.link} href={`/blog/${article.id}`} aria-label={`Lire l’article : ${article.title}`}>Lire l’article →</Link>
    </div>
  </article>
}
