import CategoryPage from '@/app/prep/[category]/page'

export const revalidate = 3600

export async function generateMetadata() {
  const title = 'JOIN PAKISTAN AIR FORCE (PAF) - Official Test Prep & Career Cards | Engineer Yasin'
  const description = 'Prepare for GD Pilot, Aeronautical Engineering, Air Defence, Admin & Special Duties, Logistics, IT, Education and Airmen examinations with live timed online mock tests & center selection data.'
  const url = 'https://www.engineeryasin.xyz/paf'
  const image = '/images/exam-paf-bg.jpg'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: 'Pakistan Air Force Preparation Hub' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    }
  }
}

export default function PafPage() {
  return <CategoryPage params={Promise.resolve({ category: 'paf' })} />
}
