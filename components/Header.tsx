'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={
        'fixed top-0 w-full z-50 transition-all duration-300 ' +
        (scrolled ? 'bg-white/95 backdrop-blur shadow-md py-3' : 'bg-transparent py-5')
      }
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="relative w-48 h-12 md:w-56 md:h-14">
          <Image src="/logo-noir.png" alt="StudioCreatif360" fill className="object-contain object-left" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm tracking-wide">
          <Link href="#mission" className="hover:text-sauge transition-colors">L&apos;ASBL</Link>
          <Link href="#programme" className="hover:text-sauge transition-colors">Ateliers</Link>
          <Link href="#cours" className="hover:text-sauge transition-colors">En ligne</Link>
          <Link href="#blog" className="hover:text-sauge transition-colors">Blog</Link>
          <Link href="/reservation" className="bg-sauge text-white px-6 py-2.5 rounded-full hover:bg-sauge-fonce transition-all shadow-md hover:shadow-lg">
            Réserver
          </Link>
        </nav>
      </div>
    </header>
  )
}