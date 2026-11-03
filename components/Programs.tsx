import Link from 'next/link'

const programmes = [
  { jour: 'Mercredi', public: 'Enfants', horaire: '14h - 16h', prix: '20 €', places: 3 },
  { jour: 'Vendredi', public: 'Enfants', horaire: '16h30 - 18h30', prix: '20 €', places: 5 },
  { jour: 'Samedi', public: 'Enfants', horaire: '10h - 12h', prix: '20 €', places: 2 },
  { jour: 'Samedi', public: 'Adultes', horaire: '14h - 17h', prix: '35 €', places: 4 },
  { jour: 'Dimanche', public: 'Adultes', horaire: '10h - 13h', prix: '35 €', places: 1 },
]

export default function Programs() {
  return (
    <section id="programme" className="py-24 bg-rose-poudre/20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl mb-4">Programme &amp; Tarifs</h2>
          <p className="text-gray-600 text-lg">Cinq créneaux par semaine, 36 semaines par an.</p>
        </div>
        <div className="grid gap-4">
          {programmes.map((prog, index) => (
            <div key={index} className="bg-ivoire p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-rose-poudre/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-bold text-xl">{prog.jour}</span>
                  <span className="bg-sauge/10 text-sauge-fonce px-3 py-1 rounded-full text-sm font-medium">{prog.public}</span>
                </div>
                <p className="text-gray-600">{prog.horaire}</p>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <span className="block font-bold text-lg">{prog.prix}</span>
                  <span className="text-sm text-gray-500">par séance</span>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={
                        'w-3 h-3 rounded-full ' +
                        (i < prog.places ? 'bg-sauge' : 'bg-gray-300')
                      }
                    />
                  ))}
                </div>
                <Link href="/reservation" className="bg-sauge text-white px-6 py-3 rounded-full hover:bg-sauge-fonce transition-colors font-medium text-center">
                  Réserver
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}