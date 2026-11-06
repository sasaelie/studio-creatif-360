import './globals.css'
import { DM_Sans, Caveat } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { site } from '@/data/site'
import OrganizationJsonLd from '@/components/seo/OrganizationJsonLd'

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
  title: { default: 'StudioCreatif360 | Cours de couture à Seraing', template: '%s | StudioCreatif360' },
  description: 'Cours de couture pour débutants à Seraing, près de Liège : enfants et adultes, en petits groupes de 5 participants maximum.',
  openGraph: { siteName: site.legalName, locale: 'fr_BE', type: 'website' },
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
        <OrganizationJsonLd />
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
