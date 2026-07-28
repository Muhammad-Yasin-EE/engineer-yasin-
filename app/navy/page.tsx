import CategoryPage from '@/app/prep/[category]/page'

export const revalidate = 3600

export async function generateMetadata() {
  const title = 'JOIN PAKISTAN NAVY - Official Test Prep & Selection Guide | Engineer Yasin'
  const description = 'Complete syllabus, mock quizzes and exam guidance for PN Cadet, Short Service Commission (SSC), Marines, Sailor, Civilian, and M-Cadet Navy with instant testing.'
  const url = 'https://www.engineeryasin.xyz/navy'
  const image = '/images/exam-navy-bg.jpg'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: 'Pakistan Navy Preparation Hub' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    }
  }
}

export default function NavyPage() {
  return <CategoryPage params={Promise.resolve({ category: 'navy' })} />
}
