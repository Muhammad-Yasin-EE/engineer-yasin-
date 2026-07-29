import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { ArrowLeft, ArrowRight, FileText, BookOpen } from 'lucide-react'
import { armedForcesData } from '@/lib/data/armedForcesData'

export const dynamic = 'force-dynamic'

export default async function QuizExamListPage(props: { params: Promise<{ category: string, exam: string }> }) {
  const params = await props.params;
  const { category, exam } = params
  const supabase = createClient()

  let examTitle = exam.replace(/-/g, ' ').toUpperCase()
  let searchTerms: string[] = [exam.replace(/-/g, ' ')]

  // Try to find the exam details in armedForcesData
  if (armedForcesData[exam]) {
    examTitle = armedForcesData[exam].title
    if (armedForcesData[exam].quizSearchTerms) {
      searchTerms = armedForcesData[exam].quizSearchTerms
    }
  } else if (category === 'issb') {
    if (exam === 'wat') {
      examTitle = 'Word Association Test (WAT)'
      searchTerms = ['wat', 'word association']
    } else if (exam === 'oir') {
      examTitle = 'Officer Intelligence Rating (OIR)'
      searchTerms = ['oir', 'officer intelligence']
    } else if (exam === 'mechanical') {
      examTitle = 'Mechanical Aptitude Test'
      searchTerms = ['mechanical', 'mat']
    }
  }

  let quizzes: any[] = []
  let errorMsg = ''

  try {
    const seenIds = new Set<string>()
    for (const term of searchTerms) {
      const { data, error } = await supabase
        .from('quizzes')
        .select('id, title, description, category, created_at')
        .ilike('title', `%${term}%`)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching quiz for term:', term, error)
        continue
      }
      
      if (data) {
        for (const q of data) {
          if (!seenIds.has(q.id)) {
            seenIds.add(q.id)
            quizzes.push(q)
          }
        }
      }
    }
  } catch (err: any) {
    console.error('Error loading specific quizzes:', err)
    errorMsg = 'Failed to load quizzes from database.'
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Header */}
        <div className="flex flex-col items-start gap-3 border-b border-gray-200 pb-8">
          <Link href={`/quizzes/${category}`} className="inline-flex items-center gap-2 text-xs font-extrabold text-gray-500 hover:text-[#B8212E] transition-colors uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Back to {category.toUpperCase()} Exams
          </Link>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-rose-100 text-[#B8212E] font-black text-xs uppercase tracking-wider">
              🔥 Dedicated Mock Tests
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0A192F] tracking-tight uppercase">
            {examTitle} QUIZZES
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl font-medium">
            Attempt official preliminary academic, verbal, and non-verbal mock tests strictly patterned for {examTitle}.
          </p>
        </div>

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-[#B8212E] font-bold text-center text-sm">
            ⚠️ {errorMsg}
          </div>
        )}

        {quizzes.length === 0 ? (
          <div className="py-20 bg-white border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-center p-6 space-y-3">
            <BookOpen className="w-14 h-14 text-gray-300" />
            <h3 className="text-lg font-black text-gray-700">No Practice Quizzes Found</h3>
            <p className="text-xs text-gray-400 font-medium max-w-md">
              We are currently preparing and uploading new automated mock quiz banks for {examTitle}. Please check back very soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {quizzes.map(quiz => (
              <div 
                key={quiz.id} 
                className="bg-white border border-gray-200 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-[#B8212E]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#B8212E] flex items-center justify-center shrink-0 group-hover:bg-[#B8212E] group-hover:text-white transition-colors shadow-sm">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider border px-3 py-1 rounded-full bg-slate-100 text-slate-700 border-slate-200">
                      🛡️ {quiz.category}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-gray-900 text-lg sm:text-xl leading-snug group-hover:text-[#B8212E] transition-colors line-clamp-2">
                    {quiz.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium line-clamp-3">
                    {quiz.description || 'Attempt this timed mock examination to evaluate your speed, accuracy, and concepts for initial military screening.'}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-100 mt-4 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                    ⚡ Instant Result
                  </span>
                  <Link
                    href={`/prep/quiz/${quiz.id}`}
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#0A192F] hover:bg-[#B8212E] text-white font-black rounded-xl text-xs shadow-md transition-all uppercase tracking-wider active:scale-95"
                  >
                    Attempt Test <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
