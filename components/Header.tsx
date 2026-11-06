'use client'
import { useRef } from 'react'
import { useScrolled } from '@/hooks/useScrolled'
import { useHeaderHeight } from '@/hooks/useHeaderHeight'
import { navigation, reservationHref } from '@/data/navigation'
import Container from './ui/Container'
import MobileMenu from './navigation/MobileMenu'
import styles from './Header.module.css'
import Link from 'next/link'
import Brand from './ui/Brand'

export default function Header() {
  const scrolled = useScrolled()
  const headerRef = useRef<HTMLElement>(null)
  useHeaderHeight(headerRef)

  return (
    <header ref={headerRef} className={[styles.header, scrolled ? styles.scrolled : ""].join(" ")}>
      <Container className={styles.layout}>
        <Link href="/" className={styles.logo} aria-label="Studio Créatif 360 — accueil">
          <Brand />
        </Link>
        <nav aria-label="Navigation principale" className={styles.navigation}>
          {navigation.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          <Link prefetch={false} href={reservationHref} className="button-primary">Réserver</Link>
        </nav>
        <MobileMenu />
      </Container>
    </header>
  )
}
