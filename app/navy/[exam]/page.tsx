import ExamPage, { generateMetadata as baseMeta } from '@/app/prep/[category]/[exam]/page'
import { categoryData } from '@/app/prep/[category]/page'

export const revalidate = 3600

export async function generateStaticParams() {
  const exams: { exam: string }[] = []
  const data = categoryData['navy']
  if (data && data.subgroups) {
    for (const sub of data.subgroups) {
      for (const ex of sub.exams) {
        exams.push({ exam: ex.id })
      }
    }
  }
  return exams
}

export async function generateMetadata({ params }: { params: Promise<{ exam: string }> }) {
  const { exam } = await params
  return baseMeta({ params: Promise.resolve({ category: 'navy', exam }) })
}

export default async function NavyExamPage({ params }: { params: Promise<{ exam: string }> }) {
  const { exam } = await params
  return <ExamPage params={Promise.resolve({ category: 'navy', exam })} />
}
