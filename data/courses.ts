export interface Course {
  id: string
  title: string
  description: string
  seoDescription: string
  image: string
  imageAlt: string
  price: number
  href: string
  topics: readonly string[]
}

export const courses: readonly Course[] = [
  { id: 'machine', title: 'Connaître sa machine', description: 'Enfiler le fil, canette, réglages de base.', seoDescription: 'Découvrez les bases de la machine à coudre : enfilage, canette et réglages. Un cours pour débutants avec StudioCreatif360, modalités par e-mail.', image: '/cours-machine.jpg', imageAlt: 'Affiche : connaître sa machine à coudre', price: 29, href: '/cours/machine', topics: ['Repérer les principales parties de la machine', 'Préparer la canette et enfiler le fil', 'Comprendre les réglages de base'] },
  { id: 'tissu', title: 'Choisir son tissu', description: 'Coton, épaisseur, tombé et préparation.', seoDescription: 'Apprenez à choisir et préparer un tissu : coton, épaisseur et tombé. Découvrez ce cours de couture débutant et demandez les modalités par e-mail.', image: '/cours-tissu.jpg', imageAlt: 'Affiche : choisir son tissu', price: 19, href: '/cours/tissu', topics: ['Identifier un tissu adapté à son projet', 'Observer son épaisseur et son tombé', 'Préparer le tissu avant la coupe'] },
  { id: 'patron', title: 'Lire son patron', description: 'Droit-fil, crans, marges de couture.', seoDescription: 'Découvrez comment lire un patron de couture : droit-fil, crans, marges et préparation des pièces. Renseignements par e-mail auprès de StudioCreatif360.', image: '/cours-patron.jpg', imageAlt: 'Affiche : lire et couper son patron', price: 24, href: '/cours/patron', topics: ['Repérer le droit-fil et les crans', 'Comprendre les marges de couture', 'Préparer la découpe des pièces'] },
]
