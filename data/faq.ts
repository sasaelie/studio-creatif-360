import { site } from './site'
import { workshopPrices } from './programs'

export const frequentlyAskedQuestions = [
  { question: 'Faut-il savoir coudre pour s’inscrire ?', answer: 'Non. Nos cours de couture sont conçus pour les débutants, enfants et adultes.' },
  { question: 'Combien de personnes par cours ?', answer: `${site.groupCapacity} participants maximum par séance, pour un accompagnement de près.` },
  { question: 'Où ont lieu les cours ?', answer: `${site.address[0]}, à ${site.address[1]}, en Belgique.` },
  { question: 'Combien coûte un cours de couture ?', answer: `${workshopPrices.children} € la séance pour les enfants, ${workshopPrices.adults} € la séance pour les adultes.` },
  { question: 'Peut-on suivre les cours en ligne ?', answer: 'Découvrez les cours de couture en ligne sur la page dédiée et contactez-nous par e-mail pour connaître les modalités.' },
] as const
