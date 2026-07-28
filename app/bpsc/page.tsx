import ExamPage, { generateMetadata as baseMeta } from '@/app/prep/[category]/[exam]/page'

export const revalidate = 3600

export async function generateMetadata() {
  const title = 'BALOCHISTAN PUBLIC SERVICE COMMISSION (BPSC QUETTA) - Live Portal'
  const description = 'Access real verified live advertisements (Advt 06/2026), interview schedules, online E-Letter (roll number slip) downloads via CNIC, competitive exam syllabi and practice quizzes for BPSC.'
  const url = 'https://www.engineeryasin.xyz/bpsc'
  const image = '/images/card-bpsc.jpg'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: 'BPSC Quetta Live Recruitment & Prep Portal' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    }
  }
}

export default function DirectBpscPage() {
  return <ExamPage params={Promise.resolve({ category: 'public-service', exam: 'bpsc' })} />
}
