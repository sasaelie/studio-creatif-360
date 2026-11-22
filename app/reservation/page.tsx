import Link from 'next/link'
import ContentPage from '@/components/ui/ContentPage'
import BookingWidget from '@/components/reservation/BookingWidget'
import { site } from '@/data/site'

export const metadata = { title: 'Réserver un cours de couture à Seraing', description: 'Consultez les ateliers de couture de StudioCreatif360 à Seraing, choisissez une séance et suivez les étapes de réservation dans le module intégré.', alternates: { canonical: '/reservation' } }

export default function ReservationPage() {
  return <ContentPage title="Réservez votre prochain atelier" description="Choisissez votre activité, consultez les disponibilités et suivez les étapes de réservation." backHref="/#programme" backLabel="Retour aux ateliers">
    <BookingWidget />
    <h2>Une question avant de réserver ?</h2>
    <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
    <p>Consultez notre <Link href="/rgpd">politique de confidentialité</Link> avant de nous transmettre des informations personnelles.</p>
  </ContentPage>
}
