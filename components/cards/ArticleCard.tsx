import Image from 'next/image'
import type { Article } from '@/data/articles'
import styles from './ArticleCard.module.css'

export default function ArticleCard({ article }: { article: Article }) {
  return <article className={styles.card}>
    <div className={styles.imageFrame}>
      <Image src={article.image} alt={article.imageAlt} fill sizes="(min-width: 1280px) 600px, (min-width: 768px) 45vw, 95vw" className={styles.image} />
    </div>
    <span className={styles.category}>{article.category}</span>
    <h3>{article.title}</h3>
    <p>{article.excerpt}</p>
  </article>
}
