import CategoryPage from '@/app/prep/[category]/page'

export const revalidate = 3600

export async function generateMetadata() {
  return {
    title: 'Join Pakistan Air Force (PAF) Preparation & Career Cards | Engineer Yasin',
    description: 'Prepare for GD Pilot, Aeronautical Engineering, Air Defence, Admin & Special Duties, Logistics, IT, Education and Airmen examinations.'
  }
}

export default function PafPage() {
  return <CategoryPage params={Promise.resolve({ category: 'paf' })} />
}
