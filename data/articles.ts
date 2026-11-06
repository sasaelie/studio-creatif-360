export interface Article {
  id: string
  title: string
  excerpt: string
  category: string
  image: string
  imageAlt: string
}

// Les destinations des articles seront ajoutées lorsque les pages seront définies.
export const articles: readonly Article[] = [
  { id: 'chouchou', title: 'Ton premier projet : le chouchou', excerpt: 'Pour prendre confiance, commence par un petit accessoire facile à terminer…', category: 'Débutant', image: '/blog-chouchou.jpg', imageAlt: 'Créer son premier chouchou' },
  { id: 'materiel', title: 'Les indispensables pour débuter', excerpt: "Inutile d’acheter tout le magasin ! Voici ce qu’il te faut vraiment…", category: 'Matériel', image: '/blog-materiel.jpg', imageAlt: 'Préparer son matériel de couture' },
]
