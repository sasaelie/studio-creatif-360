import './globals.css'
import { DM_Sans, Caveat } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { site } from '@/data/site'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
})

export const metadata = {
  metadataBase: new URL(site.origin),
  title: { default: 'Studio Créatif 360 | Couture & création à Seraing', template: '%s | Studio Créatif 360' },
  description: 'Apprenez la couture dans un espace accessible et convivial.',
  icons: { icon: '/logo-noir.png' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={dmSans.variable + " " + caveat.variable}>
      <body className="font-sans">
        <div className="site-atmosphere" aria-hidden="true" />
        <a href="#contenu" className="skip-link">Aller au contenu</a>
        <Header />
        <main id="contenu" tabIndex={-1} className="site-main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
