import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react'
import { armedForcesData } from '@/lib/data/armedForcesData'
import { notFound } from 'next/navigation'

// Removed static params to prevent Vercel caching 404s

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

  const imageMap: Record<string, string> = {
    'pma-long-course': '/images/card-pma.jpg',
    'lcc': '/images/card-lcc.jpg',
    'dssc': '/images/card-dssc.jpg',
    'tcc': '/images/card-tcc.jpg',
    'afns': '/images/card-afns.jpg',
    'army-soldier': '/images/card-soldier.jpg',
    'army-amc': '/images/card-army-amc.jpg',
    'navy-pn-cadet': '/images/card-pn-cadet.jpg',
    'navy-ssc': '/images/card-ssc-navy.jpg',
    'navy-marines': '/images/card-marines.jpg',
    'navy-sailor': '/images/card-sailor.jpg',
    'navy-pnec': '/images/card-navy-pnec.jpg',
    'paf-gd-pilot': '/images/card-gd-pilot.jpg',
    'paf-aeronautical-engineering': '/images/card-aeronautical.jpg',
    'paf-admin': '/images/card-paf-admin.jpg',
    'paf-airmen': '/images/card-paf-airmen.jpg',
    'paf-civilian': '/images/card-civilian.jpg',
    'paf-education': '/images/card-paf-education.jpg',
    'paf-it': '/images/card-paf-it.jpg',
    'paf-logistics': '/images/card-paf-logistics.jpg',
    'paf-accounts': '/images/card-paf-accounts.jpg',
    'wat': '/images/issb-header.jpg',
    'oir': '/images/issb-header.jpg',
    'mechanical': '/images/issb-header.jpg',
  }

  // For Armed Forces, populate from armedForcesData
  if (['army', 'navy', 'paf'].includes(category)) {
    Object.entries(armedForcesData).forEach(([slug, data]) => {
      if (data.branchSlug === category) {
        config.exams.push({
          id: slug,
          title: data.title,
          desc: data.overview,
          href: `/quizzes/${category}/${slug}`,
          imageUrl: imageMap[slug] || '/images/real-forces-illustration.jpg'
        })
      }
    })
  } else if (category === 'issb') {
    config.exams = [
      { id: 'wat', title: 'Word Association Test (WAT)', desc: 'Practice psychological word association tests for ISSB.', href: `/quizzes/issb/wat`, imageUrl: imageMap['wat'] },
      { id: 'oir', title: 'Officer Intelligence Rating (OIR)', desc: 'Verbal and non-verbal intelligence tests.', href: `/quizzes/issb/oir`, imageUrl: imageMap['oir'] },
      { id: 'mechanical', title: 'Mechanical Aptitude Test (MAT)', desc: 'Gears, pulleys, and mechanical reasoning.', href: `/quizzes/issb/mechanical`, imageUrl: imageMap['mechanical'] },
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {config.exams.map(exam => (
              <Link 
                key={exam.id} 
                href={exam.href}
                className={`flex flex-col p-6 rounded-3xl border-2 transition-all duration-300 group shadow-sm hover:shadow-xl hover:-translate-y-1 bg-white ${config.colorClass}`}
              >
                <div className="relative h-40 sm:h-48 w-full mb-6 rounded-2xl overflow-hidden shadow-sm bg-slate-100">
                  {exam.imageUrl && (
                    <Image src={exam.imageUrl} alt={exam.title} fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
                  <div className="absolute bottom-4 left-4 z-20 flex items-center justify-between w-[calc(100%-2rem)]">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-md ${config.textClass}`}>
                      <FileText className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-3 text-gray-900 group-hover:text-[#B8212E] transition-colors line-clamp-1">
                  {exam.title}
                </h3>
                <p className="text-gray-500 font-medium text-sm leading-relaxed line-clamp-2">
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
