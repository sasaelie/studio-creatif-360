import { notFound } from 'next/navigation'
import ContentPage from '@/components/ui/ContentPage'
import Illustration from '@/components/ui/Illustration'
import { courses } from '@/data/courses'
import { site } from '@/data/site'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() { return courses.map(course => ({ slug: course.id })) }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const course = courses.find(item => item.id === slug)
  return { title: course?.title ?? 'Cours introuvable', description: course?.description }
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params
  const course = courses.find(item => item.id === slug)
  if (!course) notFound()
  return <ContentPage title={course.title} description={course.description} backHref="/#cours" backLabel="Retour aux cours">
    <h2>Ce que nous allons explorer</h2>
    <ul>{course.topics.map(topic => <li key={topic}>{topic}</li>)}</ul>
    <h2>Disponibilité et renseignements</h2>
    <p>Tarif de présentation : <strong>{course.price} €</strong>. Contactez l’association pour connaître la disponibilité de ce module et ses modalités. Aucun achat ni accès à un espace de formation n’est proposé sur cette page.</p>
    <a className="button-primary" href={`mailto:${site.email}?subject=${encodeURIComponent('Renseignements — ' + course.title)}`}>Me renseigner sur ce cours</a>
    <figure><Illustration src={course.image} alt={course.imageAlt} large /></figure>
  </ContentPage>
}
