import Image from 'next/image'

export default function Mission() {
  return (
    <section id="mission" className="py-24 bg-ivoire">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
          <Image src="/mission-image.jpg" alt="Notre mission" fill className="object-cover" />
        </div>
        <div className="space-y-6">
          <h2 className="text-5xl">Notre mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            StudioCreatif360 est une ASBL qui propose un espace de création accessible et convivial, autour de la couture et de la création textile.
          </p>
          <ul className="space-y-4 pt-4">
            {['Petits groupes de 5', 'Enfants & adultes', 'Pédagogie par projet'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-lg">
                <span className="w-8 h-8 rounded-full bg-rose-poudre flex items-center justify-center text-sauge-fonce font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
