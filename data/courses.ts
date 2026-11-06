export interface Course {
  id: string
  title: string
  description: string
  image: string
  imageAlt: string
  price: number
  href: string
  topics: readonly string[]
}

export const courses: readonly Course[] = [
  { id: 'machine', title: 'Connaître sa machine', description: 'Enfiler le fil, canette, réglages de base.', image: '/cours-machine.jpg', imageAlt: 'Affiche : connaître sa machine à coudre', price: 29, href: '/cours/machine', topics: ['Repérer les principales parties de la machine', 'Préparer la canette et enfiler le fil', 'Comprendre les réglages de base'] },
  { id: 'tissu', title: 'Choisir son tissu', description: 'Coton, épaisseur, tombé et préparation.', image: '/cours-tissu.jpg', imageAlt: 'Affiche : choisir son tissu', price: 19, href: '/cours/tissu', topics: ['Identifier un tissu adapté à son projet', 'Observer son épaisseur et son tombé', 'Préparer le tissu avant la coupe'] },
  { id: 'patron', title: 'Lire son patron', description: 'Droit-fil, crans, marges de couture.', image: '/cours-patron.jpg', imageAlt: 'Affiche : lire et couper son patron', price: 24, href: '/cours/patron', topics: ['Repérer le droit-fil et les crans', 'Comprendre les marges de couture', 'Préparer la découpe des pièces'] },
]
