import Image from 'next/image'
import Link from 'next/link'

export default function Blog() {
  return (
    <section id="blog" className="py-24 bg-rose-poudre/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-5xl mb-4">Le blog</h2>
            <p className="text-gray-600 text-lg">Astuces et tutoriels pour aller plus loin.</p>
          </div>
          <Link href="/blog" className="hidden md:inline-block border border-sauge text-sauge px-6 py-2 rounded-full hover:bg-sauge/10 transition-colors">
            Tous les articles
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <article className="group cursor-pointer">
            <div className="relative h-[300px] rounded-2xl overflow-hidden mb-6">
              <Image src="/blog-chouchou.jpg" alt="Créer son premier chouchou" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <span className="text-sm font-semibold text-sauge tracking-wider uppercase">Débutant</span>
            <h3 className="text-2xl font-manuscrite mt-2 group-hover:text-sauge transition-colors">Ton premier projet : le chouchou</h3>
            <p className="text-gray-600 mt-2 line-clamp-2">Pour prendre confiance, commence par un petit accessoire facile à terminer...</p>
          </article>
          <article className="group cursor-pointer">
            <div className="relative h-[300px] rounded-2xl overflow-hidden mb-6">
              <Image src="/blog-materiel.jpg" alt="Préparer son matériel" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <span className="text-sm font-semibold text-sauge tracking-wider uppercase">Matériel</span>
            <h3 className="text-2xl font-manuscrite mt-2 group-hover:text-sauge transition-colors">Les indispensables pour débuter</h3>
            <p className="text-gray-600 mt-2 line-clamp-2">Inutile d'acheter tout le magasin ! Voici ce qu'il te faut vraiment...</p>
          </article>
        </div>
      </div>
    </section>
  )
}
