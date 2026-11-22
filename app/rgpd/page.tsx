import ContentPage from '@/components/ui/ContentPage'
import { site } from '@/data/site'

export const metadata = {
  title: 'Confidentialité',
  description: 'Informations sur le module de réservation de StudioCreatif360, les renseignements communiqués et le contact pour vos questions sur vos données personnelles.',
  alternates: { canonical: '/rgpd' },
}

export default function PrivacyPage() {
  return <ContentPage title="Votre confidentialité" description="Comprendre ce qui se passe lorsque vous consultez le site ou réservez un atelier.">
    <h2>Consulter le site</h2>
    <p>Le site présente les activités de {site.name} et intègre un module de réservation. L’hébergeur Vercel peut traiter des informations techniques, notamment l’adresse IP et les journaux de requêtes, pour fournir et sécuriser le service.</p>
    <h2>Réserver un atelier</h2>
    <p>Le module intégré charge notre outil de réservation. Son chargement transmet les informations techniques nécessaires à son affichage. Les renseignements que vous saisissez dans ce module sont transmis à l’outil pour traiter votre réservation selon les étapes et modalités qui y sont présentées.</p>
    <p>Pour connaître les conditions de conservation de ces renseignements ou exercer vos droits, contactez l’association. Ne transmettez pas d’informations sensibles inutiles à votre réservation.</p>
    <h2>Nous écrire par e-mail</h2>
    <p>Si vous nous contactez par e-mail, votre message contient les informations que vous avez choisies de communiquer. L’adresse de contact reste disponible pour vos questions.</p>
    <h2>Traitement de votre message</h2>
    <p>Les coordonnées communiquées servent à répondre à votre demande et à organiser l’échange sur l’atelier. Pour connaître les conditions de conservation de votre correspondance ou exercer vos droits relatifs à vos données, contactez directement l’association.</p>
    <h2>Un contact pour vos questions</h2>
    <p><a href={`mailto:${site.email}?subject=${encodeURIComponent('Question sur mes données personnelles')}`}>{site.email}</a><br />{site.address.join(', ')}.</p>
  </ContentPage>
}
