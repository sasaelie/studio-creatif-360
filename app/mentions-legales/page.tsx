import Link from 'next/link'
import ContentPage from '@/components/ui/ContentPage'
import { site } from '@/data/site'

export const metadata = {
  title: 'Mentions légales',
  description: 'Identité, coordonnées et numéro d’entreprise de StudioCreatif360 ASBL à Seraing. Informations sur l’hébergement du site et les demandes d’atelier.',
  alternates: { canonical: '/mentions-legales' },
}

export default function LegalPage() {
  return <ContentPage title="Mentions légales" description="Les informations pratiques pour identifier et contacter l’association.">
    <h2>L’association</h2>
    <p><strong>{site.legalName}</strong> — ASBL à Seraing.</p>
    <p>{site.address.join(', ')}.<br />Numéro d’entreprise : {site.companyNumber}.</p>
    <p>Publiée aux Annexes du Moniteur belge le {site.publicationDate}.</p>
    <p><Link href="/localisation">Localisation et itinéraire vers l’atelier.</Link></p>
    <p>Contact : <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
    <h2>Hébergement</h2>
    <p>Ce site est hébergé par Vercel. Les informations sur cet hébergeur sont disponibles sur <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>.</p>
    <h2>Informations sur les ateliers et les cours</h2>
    <p>Les horaires, tarifs, disponibilités et modalités de réservation sont présentés dans le module dédié. Suivez les étapes et les confirmations de l’outil pour connaître l’état de votre réservation. Un e-mail de renseignements ne vaut pas réservation.</p>
    <h2>Données personnelles</h2>
    <p>Consultez la <Link href="/rgpd">politique de confidentialité</Link> pour comprendre le traitement des informations communiquées.</p>
  </ContentPage>
}
