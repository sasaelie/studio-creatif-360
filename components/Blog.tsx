import { articles } from '@/data/articles'
import ArticleCard from './cards/ArticleCard'
import Container from './ui/Container'
import SectionHeading from './ui/SectionHeading'
import styles from './Blog.module.css'
import Link from 'next/link'

export default function Blog() {
  return (
    <section id="blog" className={styles.section}>
      <Container>
        <div className={styles.heading}>
          <SectionHeading title="Le blog" description="Astuces et tutoriels pour aller plus loin." />
          <Link href="/blog" className="button-secondary">Tous les articles</Link>
        </div>
        <div className={styles.grid}>
          {articles.map(item => <ArticleCard key={item.id} article={item} />)}
        </div>
      </Container>
    </section>
  )
}
