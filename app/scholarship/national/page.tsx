import type { Metadata } from 'next'
import NationalScholarshipsPage from '@/components/NationalScholarshipsPage'

export const dynamic = 'force-static'
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'NATIONAL SCHOLARSHIPS (PAKISTANI UNIVERSITIES AID & MERIT) | ENGINEER YASIN',
  description: 'Complete guide to up to 100% merit tuition waivers and need-based financial aid at LUMS, NUST, IBA, UMT, UCP, FAST, religious minority grants and required document checklists.',
  openGraph: {
    title: 'NATIONAL SCHOLARSHIPS (PAKISTANI UNIVERSITIES AID & MERIT) | ENGINEER YASIN',
    description: 'Complete guide to up to 100% merit tuition waivers and need-based financial aid at LUMS, NUST, IBA, UMT, UCP, FAST, religious minority grants and required document checklists.',
    url: 'https://www.engineeryasin.xyz/scholarship/national',
    type: 'website',
    images: [{ url: '/images/card-tcc.jpg', width: 1200, height: 630, alt: 'National University Merit Scholarships Pakistan' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NATIONAL SCHOLARSHIPS (PAKISTANI UNIVERSITIES AID & MERIT) | ENGINEER YASIN',
    description: 'Complete guide to up to 100% merit tuition waivers and need-based financial aid at LUMS, NUST, IBA, UMT, UCP, FAST, religious minority grants and required document checklists.',
    images: ['/images/card-tcc.jpg'],
  }
}

export default function NationalPage() {
  return <NationalScholarshipsPage />
}
