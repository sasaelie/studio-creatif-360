import { site } from '@/data/site'

export default function OrganizationJsonLd() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': site.origin + '/#association',
    name: site.legalName,
    url: site.origin,
    logo: site.origin + '/logo-noir.png',
    email: site.email,
    identifier: site.companyNumber,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address[0],
      postalCode: site.postalCode,
      addressLocality: site.city,
      addressCountry: site.countryCode,
    },
  }

  // Même des textes éditoriaux ne doivent pas pouvoir fermer la balise script.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, '\\u003c') }} />
}
