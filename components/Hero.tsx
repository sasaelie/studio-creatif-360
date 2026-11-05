import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-rose-poudre/30 rounded-bl-[100px] -z-10"></div>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-up">
          <span className="inline-block bg-rose-poudre text-sauge-fonce px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide">
            ASBL à Seraing
          </span>
          <h1 className="text-5xl md:text-7xl leading-tight">
            Apprendre, créer, <br/>
            <span className="text-rose-poudre drop-shadow-sm">se rencontrer.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-md">
            Ateliers de couture et de création textile pour enfants et adultes, en petits groupes de 5.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/reservation" className="bg-sauge text-white text-center px-8 py-4 rounded-full hover:bg-sauge-fonce transition-all shadow-lg font-medium">
              Réserver un atelier
            </Link>
            <Link href="#mission" className="border border-sauge text-sauge text-center px-8 py-4 rounded-full hover:bg-sauge/10 transition-all font-medium">
              Découvrir l'ASBL
            </Link>
          </div>
        </div>
        <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl animate-float">
          <Image src="/hero-image.jpg" alt="Atelier de couture" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-sauge/10 mix-blend-multiply"></div>
        </div>
      </div>
    </section>
  )
}
