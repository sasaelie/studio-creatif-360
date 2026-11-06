import Image from 'next/image'
import Link from 'next/link'
import type { Course } from '@/data/courses'
import styles from './CourseCard.module.css'

export default function CourseCard({ course }: { course: Course }) {
  return <article className={styles.card}>
    <div className={styles.imageFrame}>
      <Image src={course.image} alt={course.imageAlt} fill sizes="(min-width: 1280px) 400px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 95vw" className={styles.image} />
    </div>
    <div className={styles.content}>
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <div className={styles.actions}>
        <span className={styles.price}>{course.price} €</span>
        <Link prefetch={false} href={course.href} className={styles.link} aria-label={`Découvrir le cours : ${course.title}`}>Découvrir →</Link>
      </div>
    </div>
  </article>
}
