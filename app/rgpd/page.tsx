import ContentPage from '@/components/ui/ContentPage'
import { site } from '@/data/site'

export const metadata = { title: 'Confidentialité' }

export default function PrivacyPage() {
  return <ContentPage title="Votre confidentialité" description="Comprendre ce qui se passe lorsque vous consultez le site ou préparez une demande.">
    <h2>Consulter le site</h2>
    <p>Le site présente les activités de {site.name}. Aucun compte, paiement ou traceur publicitaire n’a été ajouté au code de ce site. L’hébergeur Vercel peut traiter des informations techniques, notamment l’adresse IP et les journaux de requêtes, pour fournir et sécuriser le service.</p>
    <h2>Préparer une demande d’atelier</h2>
    <p>Le formulaire prépare un message sur votre appareil. Le site n’envoie pas les champs saisis à un serveur de formulaire et ne les enregistre pas dans le stockage du navigateur. Ils sont transmis lorsque vous choisissez d’envoyer le message dans votre messagerie.</p>
    <p>L’e-mail envoyé à l’association contient les informations que vous avez choisies de fournir : nom, adresse de réponse, atelier et message. Ne transmettez pas d’informations sensibles inutiles à votre demande.</p>
    <h2>Traitement de votre message</h2>
    <p>Les coordonnées communiquées servent à répondre à votre demande et à organiser l’échange sur l’atelier. Pour connaître les conditions de conservation de votre correspondance ou exercer vos droits relatifs à vos données, contactez directement l’association.</p>
    <h2>Un contact pour vos questions</h2>
    <p><a href={`mailto:${site.email}?subject=${encodeURIComponent('Question sur mes données personnelles')}`}>{site.email}</a><br />{site.address.join(', ')}.</p>
  </ContentPage>
}
