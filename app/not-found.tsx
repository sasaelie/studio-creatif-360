import Link from 'next/link'
import ContentPage from '@/components/ui/ContentPage'

export default function NotFound() {
  return <ContentPage title="Cette page n’existe pas" description="Le lien a peut-être changé. Retrouvons le bon chemin.">
    <p>Vous pouvez revenir aux ateliers ou nous contacter pour être accompagné.</p>
    <Link href="/" className="button-primary">Retour à l’accueil</Link>{' '}
    <Link href="/reservation" className="button-secondary">Nous contacter</Link>
  </ContentPage>
}
