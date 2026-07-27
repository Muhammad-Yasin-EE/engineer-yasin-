import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Flame, ArrowLeft, FileText, ArrowRight, BookOpen } from 'lucide-react'

export const dynamic = 'force-dynamic'

function formatQuizDisplay(title: string = '', cat: string = '') {
  let displayTitle = title
    .replace(/^pma-long-course/i, 'PMA Long Course')
    .replace(/^gd-pilot/i, 'PAF GD Pilot')
    .replace(/^pn-cadet/i, 'PN Cadet (Pakistan Navy)')
    .replace(/^aeronautical-engineering/i, 'PAF Aeronautical Engineering')
    .replace(/^tcc/i, 'TCC (Technical Cadet Course)')
    .replace(/^admin/i, 'PAF Admin & Special Duties')
    .replace(/^lcc/i, 'LCC (Lady Cadet Course)')
    .replace(/^afns/i, 'AFNS (Nursing Service)')
    .replace(/^dssc/i, 'DSSC (Direct Short Service)')
    .replace(/^ssc/i, 'Navy SSC')
    .replace(/^marines/i, 'Pak Marines')
    .replace(/^sailor/i, 'Navy Sailor')
    .replace(/^soldier/i, 'Pak Army Soldier')

  let badge = '🛡️ FORCES MOCK'
  let colorClass = 'bg-slate-100 text-slate-700 border-slate-200'
  const tLower = title.toLowerCase()
  const cLower = cat.toLowerCase()

  if (tLower.includes('pma') || tLower.includes('army') || tLower.includes('tcc') || tLower.includes('lcc') || tLower.includes('afns') || tLower.includes('soldier') || tLower.includes('amc') || cLower.includes('pma')) {
    badge = '🛡️ PAK ARMY'
    colorClass = 'bg-emerald-50 text-emerald-700 border-emerald-300'
  } else if (tLower.includes('paf') || tLower.includes('gd-pilot') || tLower.includes('aeronautical') || tLower.includes('airmen') || tLower.includes('icto') || cLower.includes('paf')) {
    badge = '✈️ PAK AIR FORCE'
    colorClass = 'bg-sky-50 text-sky-700 border-sky-300'
  } else if (tLower.includes('navy') || tLower.includes('pn-cadet') || tLower.includes('marines') || tLower.includes('sailor') || tLower.includes('ssc') || cLower.includes('navy')) {
    badge = '⚓ PAK NAVY'
    colorClass = 'bg-indigo-50 text-indigo-700 border-indigo-300'
  } else if (tLower.includes('fpsc') || tLower.includes('ppsc') || tLower.includes('css') || cLower.includes('civil')) {
    badge = '🏛️ CIVIL SERVICES'
    colorClass = 'bg-amber-50 text-amber-700 border-amber-300'
  }

  return { displayTitle, badge, colorClass }
}

export default async function QuizzesPage() {
  const supabase = createClient()
  let quizzes: any[] = []
  let errorMsg = ''

  try {
    const { data, error } = await supabase
      .from('quizzes')
      .select('id, title, description, category, created_at')
      .order('created_at', { ascending: false })

    if (error) throw error
    quizzes = data || []
  } catch (err: any) {
    console.error('Error loading all quizzes:', err)
    errorMsg = 'Could not load practice quizzes database at this time.'
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Header */}
        <div className="flex flex-col items-start gap-3 border-b border-gray-200 pb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-extrabold text-gray-500 hover:text-[#B8212E] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-rose-100 text-[#B8212E] font-black text-xs uppercase tracking-wider">
              🔥 Master Exam Vault
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0A192F] tracking-tight uppercase">
            All Online Practice Quizzes
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl font-medium">
            Complete repository of preliminary academic, verbal, and non-verbal mock tests for Pak Army, Navy &amp; PAF examinations. Click any quiz to start immediately.
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
              We are currently uploading new automated mock quiz banks for the upcoming 2026 induction courses.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {quizzes.map(quiz => {
              const { displayTitle, badge, colorClass } = formatQuizDisplay(quiz.title, quiz.category);
              return (
                <div 
                  key={quiz.id} 
                  className="bg-white border border-gray-200 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-[#B8212E]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#B8212E] flex items-center justify-center shrink-0 group-hover:bg-[#B8212E] group-hover:text-white transition-colors shadow-sm">
                        <FileText className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-wider border px-3 py-1 rounded-full ${colorClass}`}>
                        {badge}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-gray-900 text-lg sm:text-xl leading-snug group-hover:text-[#B8212E] transition-colors">
                      {displayTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium line-clamp-2">
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
              );
            })}
          </div>
        )}

      </div>
    </div>
  )
}
