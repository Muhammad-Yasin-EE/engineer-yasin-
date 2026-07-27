import CategoryPage from '@/app/prep/[category]/page'

export const revalidate = 3600

export async function generateMetadata() {
  return {
    title: 'Join Pakistan Army Preparation & Career Cards | Engineer Yasin',
    description: 'Explore online preparation, syllabus, past solved tests for PMA Long Course, LCC, DSSC, TCC, AFNS, Soldier, and AMC.'
  }
}

export default function ArmyPage() {
  return <CategoryPage params={Promise.resolve({ category: 'army' })} />
}
