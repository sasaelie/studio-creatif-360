import Link from 'next/link'
import ContentPage from '@/components/ui/ContentPage'
import { site } from '@/data/site'

export const metadata = { title: 'Mentions légales' }

export default function LegalPage() {
  return <ContentPage title="Mentions légales" description="Les informations pratiques pour identifier et contacter l’association.">
    <h2>L’association</h2>
    <p><strong>{site.name}</strong> — ASBL à Seraing.</p>
    <p>{site.address.join(', ')}.<br />Numéro d’entreprise : {site.companyNumber}.</p>
    <p>Contact : <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
    <h2>Hébergement</h2>
    <p>Ce site est hébergé par Vercel. Les informations sur cet hébergeur sont disponibles sur <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>.</p>
    <h2>Informations sur les ateliers et les cours</h2>
    <p>Les horaires, tarifs et disponibilités présentés sont indicatifs. Une demande envoyée depuis votre messagerie ne vaut pas confirmation de réservation. L’association confirme directement les modalités avant toute inscription ou paiement.</p>
    <h2>Données personnelles</h2>
    <p>Consultez la <Link href="/rgpd">politique de confidentialité</Link> pour comprendre le fonctionnement de la demande par e-mail.</p>
  </ContentPage>
}
