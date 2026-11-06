export interface Program {
  id: string
  day: string
  audience: 'Enfants' | 'Adultes'
  schedule: string
  price: number
}

export const workshopPrices = { children: 20, adults: 30 } as const

export const programs: readonly Program[] = [
  { id: 'mercredi-enfants', day: 'Mercredi', audience: 'Enfants', schedule: '14 h – 16 h', price: workshopPrices.children },
  { id: 'samedi-enfants', day: 'Samedi', audience: 'Enfants', schedule: '10 h – 12 h', price: workshopPrices.children },
  { id: 'samedi-adultes', day: 'Samedi', audience: 'Adultes', schedule: '14 h – 17 h', price: workshopPrices.adults },
  { id: 'dimanche-adultes', day: 'Dimanche', audience: 'Adultes', schedule: '10 h – 13 h', price: workshopPrices.adults },
]
