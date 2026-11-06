import Link from 'next/link'
import ContentPage from '@/components/ui/ContentPage'
import Illustration from '@/components/ui/Illustration'
import { courses } from '@/data/courses'
import { about } from '@/data/about'
import styles from '@/components/ui/ContentList.module.css'

export const metadata = {
  title: 'Cours de couture en ligne pour débutants',
  description: 'Découvrez les cours de couture en ligne de StudioCreatif360 : machine à coudre, tissus et patrons. Demandez les modalités par e-mail.',
  alternates: { canonical: '/cours' },
}

export default function CoursesPage() {
  return <ContentPage title="Cours de couture en ligne" description={about.online} backHref="/#cours" backLabel="Retour à l’accueil">
    <div className={styles.list}>
      {courses.map(course => <article key={course.id} className={styles.item}>
        <div className={styles.illustration}><Illustration src={course.image} alt={course.imageAlt} sizes="(min-width: 768px) 224px, 85vw" /></div>
        <div className={styles.copy}>
          <h2><Link href={course.href}>{course.title}</Link></h2>
          <p>{course.description}</p>
          <p className={styles.label}>Tarif indicatif : {course.price} €. Modalités à demander par e-mail.</p>
          <Link href={course.href} className="button-secondary">Découvrir ce cours</Link>
        </div>
      </article>)}
    </div>
  </ContentPage>
}
