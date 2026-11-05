export interface Program {
  id: string
  day: string
  audience: 'Enfants' | 'Adultes'
  schedule: string
  price: number
  places: number
}

export const programs: readonly Program[] = [
  { id: 'mercredi-enfants', day: 'Mercredi', audience: 'Enfants', schedule: '14h - 16h', price: 20, places: 3 },
  { id: 'vendredi-enfants', day: 'Vendredi', audience: 'Enfants', schedule: '16h30 - 18h30', price: 20, places: 5 },
  { id: 'samedi-enfants', day: 'Samedi', audience: 'Enfants', schedule: '10h - 12h', price: 20, places: 2 },
  { id: 'samedi-adultes', day: 'Samedi', audience: 'Adultes', schedule: '14h - 17h', price: 35, places: 4 },
  { id: 'dimanche-adultes', day: 'Dimanche', audience: 'Adultes', schedule: '10h - 13h', price: 35, places: 1 },
]
