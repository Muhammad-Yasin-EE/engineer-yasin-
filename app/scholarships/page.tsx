import type { Metadata } from 'next'
import ScholarshipCardsHome from '@/components/ScholarshipCardsHome'

export const dynamic = 'force-static'
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'NATIONAL, INTERNATIONAL & FSC SCHOLARSHIPS PORTAL 2026 | ENGINEER YASIN',
  description: 'Select your respective scholarship category: International Study Abroad (Chevening, Fulbright, DAAD), National University Merit Aid (LUMS, NUST, IBA), and Intermediate / FSc Talent Schemes.',
  openGraph: {
    title: 'NATIONAL, INTERNATIONAL & FSC SCHOLARSHIPS PORTAL 2026 | ENGINEER YASIN',
    description: 'Select your respective scholarship category: International Study Abroad, National University Merit Aid, and Intermediate / FSc Talent Schemes.',
    url: 'https://www.engineeryasin.xyz/scholarships',
    type: 'website',
    images: [{ url: '/images/public-service-header.jpg', width: 1200, height: 630, alt: 'National, International & FSc Scholarships Directory' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NATIONAL, INTERNATIONAL & FSC SCHOLARSHIPS PORTAL 2026 | ENGINEER YASIN',
    description: 'Select your respective scholarship category: International Study Abroad, National University Merit Aid, and Intermediate / FSc Talent Schemes.',
    images: ['/images/public-service-header.jpg'],
  }
}

export default function ScholarshipsRootPage() {
  return <ScholarshipCardsHome />
}
