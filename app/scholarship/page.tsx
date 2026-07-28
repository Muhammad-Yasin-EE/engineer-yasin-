import type { Metadata } from 'next'
import ScholarshipPortalClient from '@/components/ScholarshipPortalClient'

export const dynamic = 'force-static'
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'NATIONAL & INTERNATIONAL SCHOLARSHIPS PORTAL 2026 - FULLY FUNDED | ENGINEER YASIN',
  description: 'Complete verified directory of Chevening UK, Fulbright USA, DAAD Germany EPOS, Turkiye Burslari, HEC foreign nominations, Pakistani university merit aid (LUMS, NUST, IBA) and minority grants.',
  openGraph: {
    title: 'NATIONAL & INTERNATIONAL SCHOLARSHIPS PORTAL 2026 - FULLY FUNDED | ENGINEER YASIN',
    description: 'Complete verified directory of Chevening UK, Fulbright USA, DAAD Germany EPOS, Turkiye Burslari, HEC foreign nominations, Pakistani university merit aid (LUMS, NUST, IBA) and minority grants.',
    url: 'https://www.engineeryasin.xyz/scholarship',
    type: 'website',
    images: [{ url: '/images/card-scholarship-prep.jpg', width: 1200, height: 630, alt: 'National & International Scholarships Portal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NATIONAL & INTERNATIONAL SCHOLARSHIPS PORTAL 2026 - FULLY FUNDED | ENGINEER YASIN',
    description: 'Complete verified directory of Chevening UK, Fulbright USA, DAAD Germany EPOS, Turkiye Burslari, HEC foreign nominations, Pakistani university merit aid and minority grants.',
    images: ['/images/card-scholarship-prep.jpg'],
  }
}

export default function ScholarshipRootPage() {
  return <ScholarshipPortalClient />
}
