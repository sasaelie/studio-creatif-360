import type { StaticImageData } from 'next/image'
import mission from '@/public/mission-image.jpg'
import machine from '@/public/cours-machine.jpg'
import tissu from '@/public/cours-tissu.jpg'
import patron from '@/public/cours-patron.jpg'
import chouchou from '@/public/blog-chouchou.jpg'
import materiel from '@/public/blog-materiel.jpg'
import signature from '@/public/hero-image.jpg'

// Les imports fournissent les proportions réelles et réservent la place avant chargement.
export const illustrationAssets: Readonly<Record<string, StaticImageData | undefined>> = {
  '/mission-image.jpg': mission,
  '/cours-machine.jpg': machine,
  '/cours-tissu.jpg': tissu,
  '/cours-patron.jpg': patron,
  '/blog-chouchou.jpg': chouchou,
  '/blog-materiel.jpg': materiel,
  '/hero-image.jpg': signature,
}
