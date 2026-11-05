'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import Link from 'next/link'
import { navigation, reservationHref } from '@/data/navigation'
import styles from './MobileMenu.module.css'

export default function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)

  function openMenu() {
    const dialog = dialogRef.current
    if (!dialog) {
      console.error('[MobileMenu.tsx > openMenu] Dialogue introuvable ; valeur reçue :', dialog)
      return
    }
    if (!dialog.open) {
      // Le dialogue natif gère le focus, la touche Échap et le contenu inerte.
      dialog.showModal()
      setOpen(true)
    }
  }

  function closeMenu() {
    const dialog = dialogRef.current
    if (!dialog) {
      console.error('[MobileMenu.tsx > closeMenu] Dialogue introuvable ; valeur reçue :', dialog)
      return
    }
    dialog.close()
  }

  function keepFocusInMenu(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== 'Tab') return
    const controls = event.currentTarget.querySelectorAll<HTMLElement>('button, a[href]')
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (!first || !last) {
      console.error('[MobileMenu.tsx > keepFocusInMenu] Aucun contrôle disponible ; valeur reçue :', controls.length)
      return
    }
    // Certains navigateurs passent par le document entre deux cycles du dialogue natif.
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)')
    const closeOnDesktop = () => {
      if (desktop.matches) dialogRef.current?.close()
    }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  return <div className={styles.mobile}>
    <button type="button" className={styles.trigger} aria-expanded={open} aria-controls="mobile-menu" aria-haspopup="dialog" onClick={openMenu}>Menu</button>
    <dialog ref={dialogRef} id="mobile-menu" aria-labelledby="mobile-menu-title" className={styles.dialog} onKeyDown={keepFocusInMenu} onClose={() => setOpen(false)} onClick={event => {
      if (event.target === event.currentTarget) closeMenu()
    }}>
      <div className={styles.panel}>
        <div className={styles.heading}>
          <h2 id="mobile-menu-title">Navigation</h2>
          <button type="button" className={styles.close} onClick={closeMenu} autoFocus>Fermer</button>
        </div>
        <nav aria-label="Navigation mobile" className={styles.links}>
          {navigation.map(item => <Link key={item.href} href={item.href} onClick={closeMenu}>{item.label}</Link>)}
          <Link prefetch={false} href={reservationHref} className="button-primary" onClick={closeMenu}>Réserver</Link>
        </nav>
      </div>
    </dialog>
  </div>
}
