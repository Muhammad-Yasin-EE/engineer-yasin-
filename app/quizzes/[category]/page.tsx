import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Target, ArrowRight } from 'lucide-react'
import { categoryData } from '@/app/prep/[category]/page'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function QuizCategoryPage(props: { params: Promise<{ category: string }> }) {
  const params = await props.params;
  const { category } = params
  
  // Reuse the beautiful data from prep categories
  const data = categoryData[category]
  
  if (!data) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold">Quiz Category not found</h2>
        <Link href="/quizzes" className="text-[#B8212E] hover:underline mt-4 inline-block">Return to Quizzes Hub</Link>
      </div>
    )
  }

  const colorClass = data.color === 'emerald' ? 'bg-emerald-50 border-emerald-200' : 
                     data.color === 'blue' ? 'bg-blue-50 border-blue-200' : 
                     'bg-amber-50 border-amber-200'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow flex flex-col gap-10 bg-white text-gray-800">
      <Link href="/quizzes" className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#B8212E] w-fit">
        <ArrowLeft className="w-4 h-4" /> Back to Quizzes Hub
      </Link>
      
      {/* Header */}
      {data.headerImageUrl ? (
        <div className="relative rounded-md overflow-hidden shadow-sm border border-gray-200 min-h-[250px] sm:min-h-[300px] flex items-center justify-center">
          <div className="absolute inset-0 bg-[#0A192F]/80 z-10 mix-blend-multiply"></div>
          <Image src={data.headerImageUrl} alt={data.title} fill priority className="absolute inset-0 object-cover object-top" />
          <div className="relative z-20 flex flex-col items-center text-center p-8 sm:p-14 text-white w-full">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 drop-shadow-lg text-white">
              {data.title.replace('Career Cards', 'Quiz Hub').replace('Preparation', 'Quizzes')}
            </h1>
            <p className="text-sm sm:text-base max-w-2xl mx-auto font-medium text-gray-200 drop-shadow-md">
              {data.description}
            </p>
          </div>
        </div>
      ) : (
        <div className={`flex flex-col items-center text-center p-6 sm:p-10 rounded-md border ${colorClass} shadow-sm relative overflow-hidden`}>
          <div className="w-14 h-14 bg-white rounded-md flex items-center justify-center mb-6 shadow-sm border border-gray-100">
            {data.icon}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            {data.title.replace('Career Cards', 'Quiz Hub').replace('Preparation', 'Quizzes')}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
            {data.description}
          </p>
        </div>
      )}

      {/* Subgroups & Exams */}
      <div className="space-y-12">
        {data.subgroups.map((subgroup: any) => (
          <div key={subgroup.name}>
            <div className="flex items-center gap-3 mb-6 border-b border-gray-150 pb-3">
              {subgroup.iconUrl ? (
                <div className="w-10 h-10 shrink-0 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 overflow-hidden p-1 relative">
                  <img src={subgroup.iconUrl} alt={subgroup.name} className="w-full h-full object-contain p-1" />
                </div>
              ) : (
                <Target className="w-6 h-6 text-[#B8212E]" />
              )}
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 uppercase tracking-widest">{subgroup.name} Quizzes</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {subgroup.exams.map((exam: any) => (
                <Link 
                  key={exam.id}
                  href={`/quizzes/${category}/${exam.id}`}
                  className={`group border border-gray-200 rounded-md hover:border-[#B8212E] hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full min-h-[160px] relative overflow-hidden ${exam.cardBgUrl ? '' : 'p-5 bg-white'}`}
                >
                  {exam.cardBgUrl && (
                    <>
                      <Image src={exam.cardBgUrl} alt={exam.name} fill sizes="(max-width: 768px) 100vw, 300px" className="object-cover absolute inset-0 z-0 group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
                    </>
                  )}
                  {!exam.cardBgUrl && <div className="absolute top-0 left-0 w-1 h-full bg-gray-200 group-hover:bg-[#B8212E] transition-colors"></div>}
                  
                  <div className={`relative z-20 ${exam.cardBgUrl ? 'p-5 flex flex-col h-full justify-end' : 'pl-2'}`}>
                    <h3 className={`font-bold text-base sm:text-lg transition-colors ${exam.cardBgUrl ? 'text-white drop-shadow-md' : 'text-gray-900 group-hover:text-[#B8212E]'}`}>{exam.name}</h3>
                    <div className={`mt-2 flex items-center justify-between text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors ${exam.cardBgUrl ? 'text-gray-300 group-hover:text-white' : 'text-gray-400 group-hover:text-[#B8212E] mt-6'}`}>
                      <span>Attempt Quizzes</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
