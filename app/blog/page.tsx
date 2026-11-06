import ContentPage from '@/components/ui/ContentPage'
import ArticleCard from '@/components/cards/ArticleCard'
import { articles } from '@/data/articles'
import styles from '@/components/Blog.module.css'

export const metadata = { title: 'Le blog', description: 'Conseils et premiers projets pour apprendre la couture.' }

export default function BlogPage() {
  return <ContentPage title="Un peu de fil, beaucoup d’idées" description="Des conseils et des petits projets pour avancer à votre rythme." backHref="/#blog" backLabel="Retour à l’accueil">
    <div className={styles.grid}>{articles.map(article => <ArticleCard key={article.id} article={article} />)}</div>
  </ContentPage>
}
