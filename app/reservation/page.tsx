import Link from 'next/link'
import ContentPage from '@/components/ui/ContentPage'
import ReservationRequestForm from '@/components/reservation/ReservationRequestForm'
import { programs } from '@/data/programs'
import { site } from '@/data/site'

export const metadata = { title: 'Demander un atelier' }

export default async function ReservationPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams
  const initialProgram = typeof query.atelier === 'string' && programs.some(program => program.id === query.atelier) ? query.atelier : 'conseil'
  return <ContentPage title="Préparons votre prochain atelier" description="Une question, un projet, une envie de commencer ? Écrivons la suite ensemble." backHref="/#programme" backLabel="Retour aux ateliers">
    <h2>Une demande, puis un échange</h2>
    <p>Choisissez un créneau et présentez-nous votre projet. L’association vous répondra pour confirmer les places disponibles, la date et les modalités pratiques. Aucun paiement n’est demandé sur ce site.</p>
    <ReservationRequestForm initialProgram={initialProgram} />
    <h2>Vous préférez nous écrire directement ?</h2>
    <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
    <p>Consultez notre <Link href="/rgpd">politique de confidentialité</Link> avant de nous transmettre des informations personnelles.</p>
  </ContentPage>
}
