import Link from 'next/link'
import ContentPage from '@/components/ui/ContentPage'
import { site } from '@/data/site'

export const metadata = {
  title: 'Où nous trouver : cours de couture à Seraing',
  description: 'Retrouvez StudioCreatif360 ASBL, Rue Sous les Vignes 8, boîte 1, 4100 Seraing, Belgique. Adresse, itinéraire et contact pour votre premier cours.',
  alternates: { canonical: '/localisation' },
}

export default function LocationPage() {
  const directions = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(site.address.join(', '))
  return <ContentPage title="Où nous trouver à Seraing" description="Un atelier de couture à Seraing, près de Liège, pour apprendre et créer ensemble.">
    <h2>L’adresse de l’atelier</h2>
    <address><strong>{site.legalName}</strong><br />{site.address.map(line => <span key={line}>{line}<br /></span>)}</address>
    <a href={directions} target="_blank" rel="noopener noreferrer" className="button-primary">Préparer mon itinéraire dans Google Maps</a>
    <h2>Avant votre première visite</h2>
    <p>Les cours accueillent les enfants et les adultes débutants, avec {site.groupCapacity} participants maximum par séance. Contactez-nous pour confirmer votre place et les modalités pratiques avant de venir.</p>
    <p>Une question sur l’accès à l’atelier ? Écrivez-nous à <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
    <p><Link href="/#programme">Consulter les horaires et les tarifs des cours.</Link></p>
    <Link href="/reservation" className="button-secondary">Préparer ma demande d’atelier</Link>
  </ContentPage>
}
