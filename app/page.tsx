import Hero from '@/components/Hero'
import Mission from '@/components/Mission'
import Programs from '@/components/Programs'
import OnlineCourses from '@/components/OnlineCourses'
import Blog from '@/components/Blog'
import Faq from '@/components/Faq'
import LocationTeaser from '@/components/LocationTeaser'

export const metadata = {
  title: { absolute: 'Cours de couture débutants à Seraing | StudioCreatif360' },
  description: 'Cours de couture pour débutants à Seraing, près de Liège : enfants et adultes, 5 participants maximum. Découvrez les horaires, tarifs et cours en ligne.',
  alternates: { canonical: '/' },
}

export default function Home() {
  return (
    <>
      <Hero />
      <Mission />
      <Programs />
      <OnlineCourses />
      <Blog />
      <LocationTeaser />
      <Faq />
    </>
  )
}
