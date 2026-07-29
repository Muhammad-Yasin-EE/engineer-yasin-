import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Shield, Anchor, Plane, Brain, GraduationCap, Briefcase } from 'lucide-react'

export const dynamic = 'force-static'
export const revalidate = 3600

export default function QuizzesHubPage() {
  const categories = [
    {
      id: 'army',
      title: 'PAKISTAN ARMY',
      desc: 'PMA Long Course, TCC, LCC, AFNS, DSSC & Soldier mock tests and intelligence batteries.',
      icon: Shield,
      color: 'emerald',
      bgClass: 'bg-emerald-50 hover:bg-emerald-100',
      textClass: 'text-emerald-700',
      borderClass: 'border-emerald-200 hover:border-emerald-400',
      href: '/quizzes/army',
      imageUrl: '/images/pak_army_emblem.jpg'
    },
    {
      id: 'navy',
      title: 'PAKISTAN NAVY',
      desc: 'PN Cadet, SSC, Marines, and Sailor academic, verbal and non-verbal screening tests.',
      icon: Anchor,
      color: 'indigo',
      bgClass: 'bg-indigo-50 hover:bg-indigo-100',
      textClass: 'text-indigo-700',
      borderClass: 'border-indigo-200 hover:border-indigo-400',
      href: '/quizzes/navy',
      imageUrl: '/images/pak_navy_emblem.jpg'
    },
    {
      id: 'paf',
      title: 'PAKISTAN AIR FORCE',
      desc: 'GD Pilot, Aero Eng, Admin, Airmen & Civilian spatial and technical mock exams.',
      icon: Plane,
      color: 'sky',
      bgClass: 'bg-sky-50 hover:bg-sky-100',
      textClass: 'text-sky-700',
      borderClass: 'border-sky-200 hover:border-sky-400',
      href: '/quizzes/paf',
      imageUrl: '/images/pak_paf_emblem.jpg'
    },
    {
      id: 'issb',
      title: 'ISSB PSYCHOLOGICAL',
      desc: 'Word Association (WAT), Picture Story (OIR), Mechanical Aptitude & MAT screening.',
      icon: Brain,
      color: 'purple',
      bgClass: 'bg-purple-50 hover:bg-purple-100',
      textClass: 'text-purple-700',
      borderClass: 'border-purple-200 hover:border-purple-400',
      href: '/quizzes/issb',
      imageUrl: '/images/issb-header.jpg'
    },
    {
      id: 'scholarships',
      title: 'SCHOLARSHIPS',
      desc: 'Cadet Colleges, FSc Merit, and HEC scholarship admission mock tests.',
      icon: GraduationCap,
      color: 'amber',
      bgClass: 'bg-amber-50 hover:bg-amber-100',
      textClass: 'text-amber-700',
      borderClass: 'border-amber-200 hover:border-amber-400',
      href: '/quizzes/scholarships',
      imageUrl: '/images/scholarship-portal-international.jpg'
    },
    {
      id: 'jobs',
      title: 'PUBLIC SERVICE JOBS',
      desc: 'FPSC, PPSC, FIA, and CSS general knowledge and current affairs MCQs.',
      icon: Briefcase,
      color: 'rose',
      bgClass: 'bg-rose-50 hover:bg-rose-100',
      textClass: 'text-rose-700',
      borderClass: 'border-rose-200 hover:border-rose-400',
      href: '/quizzes/jobs',
      imageUrl: '/images/public-service-header.jpg'
    }
  ]

  return (
    <div className="bg-slate-50 min-h-screen py-12 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Header */}
        <div className="flex flex-col items-start gap-3 border-b border-gray-200 pb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-extrabold text-gray-500 hover:text-[#B8212E] transition-colors uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-rose-100 text-[#B8212E] font-black text-xs uppercase tracking-wider">
              🔥 Master Exam Vault
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0A192F] tracking-tight uppercase">
            Select Your Category
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl font-medium">
            Choose your desired branch or field to access the complete repository of preliminary academic, verbal, and non-verbal mock tests.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(cat => {
            const Icon = cat.icon
            return (
              <Link 
                key={cat.id} 
                href={cat.href}
                className={`flex flex-col p-6 rounded-3xl border-2 transition-all duration-300 group shadow-sm hover:shadow-xl hover:-translate-y-1.5 ${cat.bgClass} ${cat.borderClass}`}
              >
                <div className="relative h-40 sm:h-48 w-full mb-6 rounded-2xl overflow-hidden shadow-sm">
                  {cat.imageUrl && (
                    <Image src={cat.imageUrl} alt={cat.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
                  <div className="absolute bottom-4 left-4 z-20">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-md ${cat.textClass}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                <h3 className={`text-2xl font-black uppercase tracking-tight mb-3 ${cat.textClass}`}>
                  {cat.title}
                </h3>
                <p className="text-gray-600 font-medium text-sm leading-relaxed mb-8 flex-grow">
                  {cat.desc}
                </p>
                <div className={`flex items-center gap-2 font-bold text-sm ${cat.textClass}`}>
                  View Exam Categories <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            )
          })}
        </div>

      </div>
    </div>
  )
}
