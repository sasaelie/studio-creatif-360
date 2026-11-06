import ContentPage from '@/components/ui/ContentPage'
import Link from 'next/link'
import Illustration from '@/components/ui/Illustration'
import { articles } from '@/data/articles'
import styles from '@/components/ui/ContentList.module.css'

export const metadata = { title: 'Le blog : conseils de couture pour débutants', description: 'Conseils et premiers projets pour apprendre la couture avec StudioCreatif360 à Seraing.', alternates: { canonical: '/blog' } }

export default function BlogPage() {
  return <ContentPage illustrated title="Un peu de fil, beaucoup d’idées" description="Des conseils et des petits projets pour avancer à votre rythme." backHref="/#blog" backLabel="Retour à l’accueil">
    <div className={styles.list}>{articles.map(article => <article key={article.id} className={styles.item}>
      <div className={styles.illustration}><Illustration src={article.image} alt={article.imageAlt} sizes="(min-width: 768px) 224px, 85vw" /></div>
      <div className={styles.copy}>
        <p className={styles.badge}>{article.category}</p>
        <h2><Link className={styles.titleLink} href={`/blog/${article.id}`}>{article.title}</Link></h2>
        <p>{article.excerpt}</p>
        <Link href={`/blog/${article.id}`} className="button-secondary">Lire l’article</Link>
      </div>
    </article>)}</div>
  </ContentPage>
}
