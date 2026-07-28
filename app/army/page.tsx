import CategoryPage from '@/app/prep/[category]/page'

export const revalidate = 3600

export async function generateMetadata() {
  const title = 'JOIN PAKISTAN ARMY - Official Test Prep & Selection Guide | Engineer Yasin'
  const description = 'Explore online preparation, syllabus, past solved tests for PMA Long Course, LCC, DSSC, TCC, AFNS, Soldier, and AMC with live mock tests & selection center helplines.'
  const url = 'https://www.engineeryasin.xyz/army'
  const image = '/images/exam-army-bg.jpg'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: 'Pakistan Army Preparation Hub' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    }
  }
}

export default function ArmyPage() {
  return <CategoryPage params={Promise.resolve({ category: 'army' })} />
}
