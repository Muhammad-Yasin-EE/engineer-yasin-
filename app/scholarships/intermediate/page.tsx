import type { Metadata } from 'next'
import IntermediateScholarshipsPage from '@/components/IntermediateScholarshipsPage'

export const dynamic = 'force-static'
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'INTERMEDIATE & FSC SCHOLARSHIPS (MATRIC & COLLEGES) | ENGINEER YASIN',
  description: 'Verified educational scholarships, tuition waivers, and monthly stipends for Matric, FA, FSc, Intermediate students, Cadet Colleges and pre-university programs across Pakistan.',
  openGraph: {
    title: 'INTERMEDIATE & FSC SCHOLARSHIPS (MATRIC & COLLEGES) | ENGINEER YASIN',
    description: 'Verified educational scholarships, tuition waivers, and monthly stipends for Matric, FA, FSc, Intermediate students, Cadet Colleges and pre-university programs across Pakistan.',
    url: 'https://www.engineeryasin.xyz/scholarships/intermediate',
    type: 'website',
    images: [{ url: '/images/card-scholarship-prep.jpg', width: 1200, height: 630, alt: 'Intermediate & FSc Scholarships Portal Pakistan' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'INTERMEDIATE & FSC SCHOLARSHIPS (MATRIC & COLLEGES) | ENGINEER YASIN',
    description: 'Verified educational scholarships, tuition waivers, and monthly stipends for Matric, FA, FSc, Intermediate students, Cadet Colleges and pre-university programs across Pakistan.',
    images: ['/images/card-scholarship-prep.jpg'],
  }
}

export default function ScholarshipsIntermediatePage() {
  return <IntermediateScholarshipsPage />
}
