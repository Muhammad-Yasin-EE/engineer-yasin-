import ExamPage, { generateMetadata as baseMeta } from '@/app/prep/[category]/[exam]/page'

export const revalidate = 3600

export async function generateMetadata() {
  return {
    title: 'Balochistan Public Service Commission (BPSC Quetta) Live Updates & Syllabi | Engineer Yasin Portal',
    description: 'Access real verified live advertisements (Advt 06/2026), interview schedules, online E-Letter (roll number slip) downloads, competitive exam syllabi and practice quizzes for BPSC.'
  }
}

export default function DirectBpscPage() {
  return <ExamPage params={Promise.resolve({ category: 'public-service', exam: 'bpsc' })} />
}
