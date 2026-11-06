import type { MetadataRoute } from 'next'
import { site } from '@/data/site'
import { courses } from '@/data/courses'
import { articles } from '@/data/articles'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', '/reservation', '/blog', '/mentions-legales', '/rgpd', ...courses.map(course => course.href), ...articles.map(article => '/blog/' + article.id)]
  return paths.map(path => ({ url: site.origin + path }))
}
