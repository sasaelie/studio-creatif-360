import Link from 'next/link'
import { notFound } from 'next/navigation'
import ContentPage from '@/components/ui/ContentPage'
import Illustration from '@/components/ui/Illustration'
import { articles } from '@/data/articles'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() { return articles.map(article => ({ slug: article.id })) }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const article = articles.find(item => item.id === slug)
  return { title: article?.title ?? 'Article introuvable', description: article?.excerpt }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = articles.find(item => item.id === slug)
  if (!article) notFound()
  return <ContentPage title={article.title} description={article.excerpt} backHref="/blog" backLabel="Tous les articles">
    {article.sections.map(section => <section key={section.title}>
      <h2>{section.title}</h2>
      {section.paragraphs?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      {section.steps ? <ol>{section.steps.map(step => <li key={step}>{step}</li>)}</ol> : null}
    </section>)}
    <figure><Illustration src={article.image} alt={article.imageAlt} large /></figure>
    <Link href="/reservation" className="button-primary">Découvrir les ateliers avec nous</Link>
  </ContentPage>
}
