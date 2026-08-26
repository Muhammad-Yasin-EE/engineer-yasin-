import { MetadataRoute } from 'next'
import { createPublicClient } from '@/lib/supabase/public'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.engineeryasin.xyz'
  const currentDate = new Date().toISOString()

  // 1. Core Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/prep`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/prep/army`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/prep/navy`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/prep/paf`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/issb`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/issb/ai-interview`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/issb/tat`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/issb/ranks`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/scholarships`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ebooks`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/jobs`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/study-planner`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/flashcards`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/ranks/pak-army`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ranks/pak-navy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ranks/pak-paf`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // 2. Dynamic Quizzes & Custom Pages from Supabase
  let dynamicQuizRoutes: MetadataRoute.Sitemap = []
  let dynamicCustomPageRoutes: MetadataRoute.Sitemap = []

  try {
    const supabase = createPublicClient()

    // Fetch all published quizzes
    const { data: quizzes } = await supabase
      .from('quizzes')
      .select('id, updated_at')
      .limit(100)

    if (quizzes && quizzes.length > 0) {
      dynamicQuizRoutes = quizzes.map((quiz) => ({
        url: `${baseUrl}/prep/quiz/${quiz.id}`,
        lastModified: quiz.updated_at || currentDate,
        changeFrequency: 'weekly',
        priority: 0.85,
      }))
    }

    // Fetch all custom pages
    const { data: customPages } = await supabase
      .from('custom_pages')
      .select('slug, updated_at')
      .limit(50)

    if (customPages && customPages.length > 0) {
      dynamicCustomPageRoutes = customPages.map((page) => ({
        url: `${baseUrl}/p/${page.slug}`,
        lastModified: page.updated_at || currentDate,
        changeFrequency: 'monthly',
        priority: 0.7,
      }))
    }
  } catch (err) {
    console.warn('Sitemap dynamic data fetch error (fallback to static):', err)
  }

  return [
    ...staticRoutes,
    ...dynamicQuizRoutes,
    ...dynamicCustomPageRoutes,
  ]
}
