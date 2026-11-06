'use client'
import { useScrolled } from '@/hooks/useScrolled'
import { navigation, reservationHref } from '@/data/navigation'
import Container from './ui/Container'
import MobileMenu from './navigation/MobileMenu'
import styles from './Header.module.css'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const scrolled = useScrolled()

  return (
    <header className={[styles.header, scrolled ? styles.scrolled : ""].join(" ")}>
      <Container className={styles.layout}>
        <Link href="/" className={styles.logo}>
          <Image src="/logo-noir.png" alt="StudioCreatif360" fill className={styles.image} sizes="224px" />
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
