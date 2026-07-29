import Link from 'next/link'
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react'
import { armedForcesData } from '@/lib/data/armedForcesData'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return [
    { category: 'army' },
    { category: 'navy' },
    { category: 'paf' },
    { category: 'issb' },
    { category: 'scholarships' },
    { category: 'jobs' },
  ]
}

export default function QuizCategoryPage({ params }: { params: { category: string } }) {
  const { category } = params
  
  const categoryConfigs: Record<string, { title: string, colorClass: string, bgClass: string, textClass: string, exams: any[] }> = {
    'army': { title: 'PAKISTAN ARMY EXAMS', colorClass: 'border-emerald-200', bgClass: 'bg-emerald-50', textClass: 'text-emerald-700', exams: [] },
    'navy': { title: 'PAKISTAN NAVY EXAMS', colorClass: 'border-indigo-200', bgClass: 'bg-indigo-50', textClass: 'text-indigo-700', exams: [] },
    'paf': { title: 'PAK AIR FORCE EXAMS', colorClass: 'border-sky-200', bgClass: 'bg-sky-50', textClass: 'text-sky-700', exams: [] },
    'issb': { title: 'ISSB PSYCHOLOGICAL EXAMS', colorClass: 'border-purple-200', bgClass: 'bg-purple-50', textClass: 'text-purple-700', exams: [] },
    'scholarships': { title: 'SCHOLARSHIP EXAMS', colorClass: 'border-amber-200', bgClass: 'bg-amber-50', textClass: 'text-amber-700', exams: [] },
    'jobs': { title: 'PUBLIC SERVICE EXAMS', colorClass: 'border-rose-200', bgClass: 'bg-rose-50', textClass: 'text-rose-700', exams: [] },
  }

  const config = categoryConfigs[category]
  if (!config) return notFound()

  // For Armed Forces, populate from armedForcesData
  if (['army', 'navy', 'paf'].includes(category)) {
    Object.entries(armedForcesData).forEach(([slug, data]) => {
      if (data.branchSlug === category) {
        config.exams.push({
          id: slug,
          title: data.title,
          desc: data.overview,
          href: `/quizzes/${category}/${slug}`
        })
      }
    })
  } else if (category === 'issb') {
    config.exams = [
      { id: 'wat', title: 'Word Association Test (WAT)', desc: 'Practice psychological word association tests for ISSB.', href: `/quizzes/issb/wat` },
      { id: 'oir', title: 'Officer Intelligence Rating (OIR)', desc: 'Verbal and non-verbal intelligence tests.', href: `/quizzes/issb/oir` },
      { id: 'mechanical', title: 'Mechanical Aptitude Test (MAT)', desc: 'Gears, pulleys, and mechanical reasoning.', href: `/quizzes/issb/mechanical` },
    ]
  }
  // Scholarships and Jobs remain empty

  return (
    <div className="bg-slate-50 min-h-screen py-12 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="flex flex-col items-start gap-3 border-b border-gray-200 pb-8">
          <Link href="/quizzes" className="inline-flex items-center gap-2 text-xs font-extrabold text-gray-500 hover:text-[#B8212E] transition-colors uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Back to Categories
          </Link>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full ${config.bgClass} ${config.textClass} font-black text-xs uppercase tracking-wider`}>
              📂 Select Exam Category
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0A192F] tracking-tight uppercase">
            {config.title}
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl font-medium">
            Select the specific course or branch to view and attempt the related mock tests.
          </p>
        </div>

        {config.exams.length === 0 ? (
          <div className="py-20 bg-white border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-center p-6 space-y-3 shadow-sm">
            <FileText className="w-14 h-14 text-gray-300" />
            <h3 className="text-lg font-black text-gray-700">No Exams Available Yet</h3>
            <p className="text-xs text-gray-400 font-medium max-w-md">
              We are currently uploading new automated mock quiz banks for this category. Please check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {config.exams.map(exam => (
              <Link 
                key={exam.id} 
                href={exam.href}
                className={`flex flex-col p-6 sm:p-8 rounded-3xl border-2 transition-all duration-300 group shadow-sm hover:shadow-xl hover:-translate-y-1 bg-white ${config.colorClass}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${config.bgClass} ${config.textClass}`}>
                    <FileText className="w-6 h-6" />
                  </div>
                  <ArrowRight className={`w-6 h-6 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-4 group-hover:translate-x-0 ${config.textClass}`} />
                </div>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-3 text-gray-900 group-hover:text-[#B8212E] transition-colors">
                  {exam.title}
                </h3>
                <p className="text-gray-500 font-medium text-sm leading-relaxed line-clamp-3">
                  {exam.desc}
                </p>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
