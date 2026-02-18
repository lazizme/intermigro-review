import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/TELEGRAM_SETUP.md', '/KOMMO_INTEGRATION.md'],
    },
    sitemap: 'https://intermigro.com/sitemap.xml',
  }
}
