export interface Course {
  id: string
  title: string
  description: string
  image: string
  imageAlt: string
  price: number
  href: string
}

export const courses: readonly Course[] = [
  { id: 'machine', title: 'Connaître sa machine', description: 'Enfiler le fil, canette, réglages de base.', image: '/cours-machine.jpg', imageAlt: 'Apprendre à utiliser sa machine à coudre', price: 29, href: '/cours/machine' },
  { id: 'tissu', title: 'Choisir son tissu', description: 'Coton, épaisseur, tombé et préparation.', image: '/cours-tissu.jpg', imageAlt: 'Choisir son tissu', price: 19, href: '/cours/tissu' },
  { id: 'patron', title: 'Lire son patron', description: 'Droit-fil, crans, marges de couture.', image: '/cours-patron.jpg', imageAlt: 'Lire son patron de couture', price: 24, href: '/cours/patron' },
]
