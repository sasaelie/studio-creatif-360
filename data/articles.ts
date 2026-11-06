export interface Article {
  id: string
  title: string
  excerpt: string
  category: string
  image: string
  imageAlt: string
  sections: readonly { title: string; paragraphs?: readonly string[]; steps?: readonly string[] }[]
}

export const articles: readonly Article[] = [
  { id: 'chouchou', title: 'Ton premier projet : le chouchou', excerpt: 'Matériel : chute de tissu, élastique et fil. Gestes travaillés : couture droite, retournement et fermeture.', category: 'Débutant', image: '/blog-chouchou.jpg', imageAlt: 'Affiche : réaliser un chouchou en tissu', sections: [
    { title: 'Un petit projet pour prendre confiance', paragraphs: ['Le chouchou permet de découvrir la couture droite, le retournement d’un tube de tissu et une petite finition à la main. Un coton souple est un bon point de départ : il se coupe et se coud facilement.'] },
    { title: 'Préparer le matériel', paragraphs: ['Prévois un rectangle de coton d’environ 50 × 10 cm, un élastique d’environ 18 à 20 cm, du fil, des ciseaux, des épingles et une épingle à nourrice. Ajuste la longueur de l’élastique au résultat souhaité.'] },
    { title: 'Les étapes', steps: ['Plie le tissu en deux dans la longueur, endroit contre endroit, et épingle le grand côté.', 'Couds ce côté à environ 1 cm du bord pour former un tube, en gardant les deux petites extrémités ouvertes.', 'Retourne le tube sur l’endroit, puis fais passer l’élastique avec l’épingle à nourrice. Garde une extrémité en main pour ne pas la perdre dans le tube.', 'Vérifie la souplesse du chouchou puis noue solidement les extrémités de l’élastique.', 'Rentre les bords du tissu vers l’intérieur et ferme l’ouverture avec quelques petits points.'] },
    { title: 'Apprendre ensemble', paragraphs: ['Pas besoin de réussir parfaitement du premier coup. Si une étape te bloque, apporte ton projet à l’atelier : comprendre un geste en le pratiquant fait partie de l’apprentissage.'] },
  ] },
  { id: 'materiel', title: 'Les indispensables pour débuter', excerpt: 'Avant d’acheter : vérifiez les fournitures du projet choisi. À l’atelier : testez le marquage et les réglages sur une chute.', category: 'Matériel', image: '/blog-materiel.jpg', imageAlt: 'Affiche : les outils essentiels pour la couture', sections: [
    { title: 'Commencer avec l’essentiel', paragraphs: ['Quelques outils bien choisis suffisent pour réaliser ses premiers projets. Avant d’acheter, regarde ce que tu possèdes déjà et choisis un projet simple : sa fiche de préparation t’indiquera les fournitures utiles.'] },
    { title: 'Une petite trousse de base', steps: ['Des ciseaux réservés au tissu, et une autre paire pour le papier.', 'Un mètre ruban et une règle pour vérifier les mesures.', 'Des épingles ou des pinces pour maintenir les pièces.', 'Du fil adapté au tissu et des aiguilles compatibles avec la machine.', 'Un outil de marquage effaçable, à tester sur une chute, et un découd-vite.'] },
    { title: 'Préparer plutôt qu’accumuler', paragraphs: ['Lave et repasse ton tissu selon ses consignes d’entretien avant de couper. Garde quelques chutes pour tester la longueur du point et la tension. Ces petites préparations rendent la couture plus régulière.', 'Pour une première séance à l’ASBL, demande quel matériel est utile pour le projet choisi avant de faire des achats.'] },
  ] },
]
