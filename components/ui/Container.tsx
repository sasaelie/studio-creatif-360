import type { ReactNode } from 'react'
import styles from './Container.module.css'

export default function Container({ children, className = '', narrow = false }: {
  children: ReactNode
  className?: string
  narrow?: boolean
}) {
  return <div className={[styles.container, narrow ? styles.narrow : '', className].join(' ')}>{children}</div>
}
