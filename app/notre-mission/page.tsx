import Link from 'next/link'
import ContentPage from '@/components/ui/ContentPage'
import { about } from '@/data/about'
import { programs } from '@/data/programs'
import { site } from '@/data/site'

export const metadata = {
  title: 'Notre mission : apprendre la couture à Seraing',
  description: 'Découvrez StudioCreatif360 ASBL, sa pédagogie par projet et Alyssia Wilkins, animatrice des cours pour débutants, enfants et adultes à Seraing.',
  alternates: { canonical: '/notre-mission' },
}

export default function MissionPage() {
  return <ContentPage title="De l’imagination à la création" description={about.introduction}>
    <h2>Apprendre la couture à partir de zéro</h2>
    <p>{about.startingOut}</p>
    <p>{about.children}</p>
    <p>{about.adults}</p>
    <h2>Une pédagogie par projet</h2>
    <p>{about.pedagogy}</p>
    <h2>Horaires et tarifs des cours de couture à Seraing</h2>
    <p>{site.groupCapacity} participants maximum par séance. Les tarifs ci-dessous sont par séance.</p>
    <ul>{programs.map(program => <li key={program.id}><strong>{program.day}, {program.schedule}</strong> : {program.audience.toLowerCase()}, {program.price} €.</li>)}</ul>
    <Link href="/reservation" className="button-primary">Demander une place à l’atelier</Link>
    <h2>Cours de couture en ligne</h2>
    <p>{about.online}</p>
    <p><Link href="/cours">Découvrir les cours en ligne et demander les modalités.</Link></p>
    <h2>Qui est {about.teacher.name}, votre professeure de couture ?</h2>
    <p><strong>{about.teacher.role}</strong></p>
    {about.teacher.biography.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
    <h2>Où nous trouver à Seraing</h2>
    <p>{site.legalName}<br />{site.address.map(line => <span key={line}>{line}<br /></span>)}</p>
    <p><Link href="/localisation">Localiser l’atelier et préparer votre itinéraire.</Link></p>
    <h2>Et ensuite ?</h2>
    <p>{about.future}</p>
    <p>Retrouvez les <Link href="/#questions">réponses aux questions fréquentes</Link> avant votre premier cours.</p>
  </ContentPage>
}
