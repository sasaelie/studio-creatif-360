import Image from 'next/image'
import Link from 'next/link'

export default function OnlineCourses() {
  return (
    <section id="cours" className="py-24 bg-ivoire">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl mb-4">Apprenez Ã  votre rythme</h2>
          <p className="text-gray-600 text-lg">Des modules clairs pour progresser Ã©tape par Ã©tape.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="relative h-64">
              <Image src="/cours-machine.jpg" alt="Apprendre sa machine" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-manuscrite mb-2">ConnaÃ®tre sa machine</h3>
              <p className="text-gray-600 mb-4">Enfiler le fil, canette, rÃ©glages de base.</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">29 â‚¬</span>
                <Link href="/cours/machine" className="text-sauge font-medium hover:underline">DÃ©couvrir â†’</Link>
              </div>
            </div>
          </div>
          <div className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="relative h-64">
              <Image src="/cours-tissu.jpg" alt="Choisir son tissu" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-manuscrite mb-2">Choisir son tissu</h3>
              <p className="text-gray-600 mb-4">Coton, Ã©paisseur, tombÃ© et prÃ©paration.</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">19 â‚¬</span>
                <Link href="/cours/tissu" className="text-sauge font-medium hover:underline">DÃ©couvrir â†’</Link>
              </div>
            </div>
          </div>
          <div className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="relative h-64">
              <Image src="/cours-patron.jpg" alt="Lire son patron" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-manuscrite mb-2">Lire son patron</h3>
              <p className="text-gray-600 mb-4">Droit-fil, crans, marges de couture.</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">24 â‚¬</span>
                <Link href="/cours/patron" className="text-sauge font-medium hover:underline">DÃ©couvrir â†’</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
