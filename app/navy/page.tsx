import CategoryPage from '@/app/prep/[category]/page'

export const revalidate = 3600

export async function generateMetadata() {
  return {
    title: 'Join Pakistan Navy Preparation & Career Cards | Engineer Yasin',
    description: 'Complete syllabus, mock quizzes and exam guidance for PN Cadet, Short Service Commission (SSC), Marines, Sailor, Civilian, and M-Cadet Navy.'
  }
}

export default function NavyPage() {
  return <CategoryPage params={Promise.resolve({ category: 'navy' })} />
}
