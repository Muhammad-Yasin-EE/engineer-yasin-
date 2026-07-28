import type { Metadata } from 'next'
import InternationalScholarshipsPage from '@/components/InternationalScholarshipsPage'

export const dynamic = 'force-static'
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'INTERNATIONAL SCHOLARSHIPS (STUDY ABROAD) 2026 - FULLY FUNDED | ENGINEER YASIN',
  description: 'Complete individual scholarship cards for Chevening UK, Fulbright USA, DAAD Germany EPOS (20 courses), Turkiye Burslari, MEXT Japan, HEC foreign nominations and women grants.',
  openGraph: {
    title: 'INTERNATIONAL SCHOLARSHIPS (STUDY ABROAD) 2026 - FULLY FUNDED | ENGINEER YASIN',
    description: 'Complete individual scholarship cards for Chevening UK, Fulbright USA, DAAD Germany EPOS (20 courses), Turkiye Burslari, MEXT Japan, HEC foreign nominations and women grants.',
    url: 'https://www.engineeryasin.xyz/scholarship/international',
    type: 'website',
    images: [{ url: '/images/card-paf-education.jpg', width: 1200, height: 630, alt: 'International Scholarships Directory 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'INTERNATIONAL SCHOLARSHIPS (STUDY ABROAD) 2026 - FULLY FUNDED | ENGINEER YASIN',
    description: 'Complete individual scholarship cards for Chevening UK, Fulbright USA, DAAD Germany EPOS, Turkiye Burslari, MEXT Japan, HEC foreign nominations and women grants.',
    images: ['/images/card-paf-education.jpg'],
  }
}

export default function InternationalPage() {
  return <InternationalScholarshipsPage />
}
