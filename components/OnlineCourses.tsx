import { courses } from '@/data/courses'
import CourseCard from './cards/CourseCard'
import Container from './ui/Container'
import SectionHeading from './ui/SectionHeading'
import styles from './OnlineCourses.module.css'

export default function OnlineCourses() {
  return (
    <section id="cours" className={styles.section}>
      <Container>
        <div className={styles.heading}>
          <SectionHeading title="Apprenez à votre rythme" description="Des modules clairs pour progresser étape par étape." />
        </div>
        <div className={styles.grid}>
          {courses.map(item => <CourseCard key={item.id} course={item} />)}
        </div>
      </Container>
    </section>
  )
}
