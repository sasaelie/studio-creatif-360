import Illustration from '../ui/Illustration'
import Link from 'next/link'
import type { Course } from '@/data/courses'
import styles from './CourseCard.module.css'

export default function CourseCard({ course }: { course: Course }) {
  return <article className={styles.card}>
    <div className={styles.imageFrame}>
      <Illustration src={course.image} alt={course.imageAlt} />
    </div>
    <div className={styles.content}>
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <div className={styles.actions}>
        <span className={styles.price}>{course.price} €</span>
        <Link href={course.href} className={styles.link} aria-label={`Découvrir le cours : ${course.title}`}>Découvrir →</Link>
      </div>
    </div>
  </article>
}
