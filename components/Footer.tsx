import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-texte-fonce text-ivoire py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
        <div className="col-span-2 md:col-span-1">
          <h3 className="font-manuscrite text-3xl mb-4 text-rose-poudre">StudioCreatif360</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            De l'imagination Ã  la crÃ©ation.<br/>
            ASBL Ã  Seraing.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4 uppercase tracking-wider text-sm text-sauge">Navigation</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="#" className="hover:text-rose-poudre transition-colors">Accueil</Link></li>
            <li><Link href="#programme" className="hover:text-rose-poudre transition-colors">Ateliers</Link></li>
            <li><Link href="#cours" className="hover:text-rose-poudre transition-colors">Cours en ligne</Link></li>
            <li><Link href="#blog" className="hover:text-rose-poudre transition-colors">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 uppercase tracking-wider text-sm text-sauge">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Rue Bois de Mont 288</li>
            <li>4101 Seraing</li>
            <li>contact@studiocreatif360.be</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 uppercase tracking-wider text-sm text-sauge">LÃ©gal</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/mentions-legales" className="hover:text-rose-poudre transition-colors">Mentions lÃ©gales</Link></li>
            <li><Link href="/rgpd" className="hover:text-rose-poudre transition-colors">Politique de confidentialitÃ©</Link></li>
            <li className="pt-4 text-xs text-gray-500">NÂ° d'entreprise : 1041.458.712</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
