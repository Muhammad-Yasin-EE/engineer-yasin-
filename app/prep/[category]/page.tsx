import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowLeft, ArrowRight, Shield, BookOpen, GraduationCap, 
  Target, Flame, Clock, Brain, CheckCircle2 
} from 'lucide-react'

export const revalidate = 60

export const categoryData: Record<string, any> = {
  'armed-forces': {
    title: 'Pakistan Armed Forces Initial Preparation',
    description: 'Official online computerized screening preparation for Pakistan Army, Pak Navy, and Pakistan Air Force.',
    icon: <Shield className="w-8 h-8 text-emerald-600" />,
    color: 'emerald',
    headerImageUrl: '/images/hero-armed-forces.jpg',
    subgroups: [
      {
        name: 'Pakistan Army Courses',
        iconUrl: '/images/army-circle-logo.jpg',
        exams: [
          { id: 'pma-long-course', name: 'PMA Long Course', cardBgUrl: '/images/card-pma.jpg' },
          { id: 'tcc', name: 'Technical Cadet (TCC)', cardBgUrl: '/images/card-tcc.jpg' },
          { id: 'lcc', name: 'Lady Cadet Course (LCC)', cardBgUrl: '/images/card-lcc.jpg' },
          { id: 'afns', name: 'AFNS Nursing', cardBgUrl: '/images/card-afns.jpg' },
          { id: 'soldier', name: 'Pak Army Soldier', cardBgUrl: '/images/card-soldier.jpg' },
          { id: 'dssc', name: 'Direct Short Service (DSSC)', cardBgUrl: '/images/card-dssc.jpg' },
          { id: 'amc', name: 'Army Medical College (AMC)', cardBgUrl: '/images/card-army-amc.jpg' },
        ]
      },
      {
        name: 'Pakistan Air Force (PAF) Courses',
        iconUrl: '/images/paf-logo.jpg',
        exams: [
          { id: 'gd-pilot', name: 'GD Pilot', cardBgUrl: '/images/card-gd-pilot.jpg' },
          { id: 'aeronautical-engineering', name: 'CAE Aeronautical Engineering', cardBgUrl: '/images/card-aeronautical.jpg' },
          { id: 'air-defence', name: 'Air Defence Branch', cardBgUrl: '/images/card-air-defence.jpg' },
          { id: 'admin', name: 'Admin & Special Duties', cardBgUrl: '/images/card-paf-admin.jpg' },
          { id: 'airmen', name: 'PAF Airmen Initial', cardBgUrl: '/images/card-paf-airmen.jpg' },
          { id: 'accounts', name: 'PAF Accounts Branch', cardBgUrl: '/images/card-paf-accounts.jpg' },
          { id: 'logistics', name: 'PAF Logistics Branch', cardBgUrl: '/images/card-paf-logistics.jpg' },
          { id: 'it', name: 'PAF IT Branch', cardBgUrl: '/images/card-paf-it.jpg' },
        ]
      },
      {
        name: 'Pakistan Navy Courses',
        iconUrl: '/images/navy-logo.jpg',
        exams: [
          { id: 'pn-cadet', name: 'PN Cadet Permanent Commission', cardBgUrl: '/images/card-pn-cadet.jpg' },
          { id: 'ssc', name: 'Short Service Commission (SSC)', cardBgUrl: '/images/card-ssc-navy.jpg' },
          { id: 'marines', name: 'Pak Marines Commando', cardBgUrl: '/images/card-marines.jpg' },
          { id: 'sailor', name: 'Pak Navy Sailor Matric', cardBgUrl: '/images/card-sailor.jpg' },
          { id: 'navy-pnec', name: 'PNEC Engineering Cadet', cardBgUrl: '/images/card-navy-pnec.jpg' },
          { id: 'civilian', name: 'Navy Civilian Cadre', cardBgUrl: '/images/card-civilian.jpg' },
        ]
      }
    ]
  },
  'army': {
    title: 'Pakistan Army Official Test Hub',
    description: 'Complete computerized test batteries for PMA Long Course, TCC, LCC, AFNS, Soldier & AMC entries.',
    icon: <Shield className="w-8 h-8 text-emerald-600" />,
    color: 'emerald',
    headerImageUrl: '/images/exam-army-bg.jpg',
    subgroups: [
      {
        name: 'All Pakistan Army Entry Courses',
        iconUrl: '/images/army-circle-logo.jpg',
        exams: [
          { id: 'pma-long-course', name: 'PMA Long Course', cardBgUrl: '/images/card-pma.jpg' },
          { id: 'tcc', name: 'Technical Cadet Course (TCC)', cardBgUrl: '/images/card-tcc.jpg' },
          { id: 'lcc', name: 'Lady Cadet Course (LCC)', cardBgUrl: '/images/card-lcc.jpg' },
          { id: 'afns', name: 'AFNS Nursing Service', cardBgUrl: '/images/card-afns.jpg' },
          { id: 'soldier', name: 'Pak Army Soldier Entry', cardBgUrl: '/images/card-soldier.jpg' },
          { id: 'dssc', name: 'Direct Short Service (DSSC)', cardBgUrl: '/images/card-dssc.jpg' },
          { id: 'amc', name: 'Army Medical College (AMC)', cardBgUrl: '/images/card-army-amc.jpg' },
        ]
      }
    ]
  },
  'navy': {
    title: 'Pakistan Navy Official Test Hub',
    description: 'Online computerized initial screening tests for PN Cadet, SSC, Marines, and Sailor selections.',
    icon: <Shield className="w-8 h-8 text-indigo-600" />,
    color: 'emerald',
    headerImageUrl: '/images/exam-navy-bg.jpg',
    subgroups: [
      {
        name: 'All Pakistan Navy Entry Courses',
        iconUrl: '/images/navy-logo.jpg',
        exams: [
          { id: 'pn-cadet', name: 'PN Cadet Permanent Commission', cardBgUrl: '/images/card-pn-cadet.jpg' },
          { id: 'ssc', name: 'Short Service Commission (SSC)', cardBgUrl: '/images/card-ssc-navy.jpg' },
          { id: 'marines', name: 'Pak Marines Commando', cardBgUrl: '/images/card-marines.jpg' },
          { id: 'sailor', name: 'Pak Navy Sailor Matric', cardBgUrl: '/images/card-sailor.jpg' },
          { id: 'navy-pnec', name: 'PNEC Engineering Cadet', cardBgUrl: '/images/card-navy-pnec.jpg' },
          { id: 'civilian', name: 'Navy Civilian Cadre', cardBgUrl: '/images/card-civilian.jpg' },
        ]
      }
    ]
  },
  'paf': {
    title: 'Pakistan Air Force (PAF) Official Test Hub',
    description: 'Official intelligence and academic initial mock tests for GD Pilot, CAE Engineering, Air Defence, and Airmen.',
    icon: <Shield className="w-8 h-8 text-sky-600" />,
    color: 'emerald',
    headerImageUrl: '/images/exam-paf-bg.jpg',
    subgroups: [
      {
        name: 'All PAF Commission & Airmen Courses',
        iconUrl: '/images/paf-logo.jpg',
        exams: [
          { id: 'gd-pilot', name: 'PAF GD Pilot', cardBgUrl: '/images/card-gd-pilot.jpg' },
          { id: 'aeronautical-engineering', name: 'CAE Aeronautical Engineering', cardBgUrl: '/images/card-aeronautical.jpg' },
          { id: 'air-defence', name: 'PAF Air Defence', cardBgUrl: '/images/card-air-defence.jpg' },
          { id: 'admin', name: 'Admin & Special Duties', cardBgUrl: '/images/card-paf-admin.jpg' },
          { id: 'airmen', name: 'PAF Airmen Initial', cardBgUrl: '/images/card-paf-airmen.jpg' },
          { id: 'accounts', name: 'PAF Accounts Branch', cardBgUrl: '/images/card-paf-accounts.jpg' },
          { id: 'logistics', name: 'PAF Logistics Branch', cardBgUrl: '/images/card-paf-logistics.jpg' },
          { id: 'it', name: 'PAF IT Branch', cardBgUrl: '/images/card-paf-it.jpg' },
        ]
      }
    ]
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  
  const data = categoryData[category] || categoryData['armed-forces']

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow flex flex-col gap-10 bg-white text-gray-800">
      
      {/* Back Link */}
      <Link href="/prep" className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#B8212E] w-fit">
        <ArrowLeft className="w-4 h-4" /> Back to Prep Hub
      </Link>
      
      {/* Hero Banner with Authentic Official Background */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 min-h-[240px] sm:min-h-[300px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/80 to-transparent z-10"></div>
        {data.headerImageUrl && (
          <Image 
            src={data.headerImageUrl} 
            alt={data.title} 
            fill 
            priority 
            className="absolute inset-0 object-cover object-center" 
          />
        )}
        <div className="relative z-20 flex flex-col items-center text-center p-6 sm:p-12 text-white w-full space-y-3">
          <span className="text-[10px] font-black uppercase tracking-widest bg-amber-400/20 text-amber-300 px-4 py-1 rounded-full border border-amber-400/40 shadow-xs backdrop-blur-md">
            🇵🇰 Official Selection Portal 2026
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase drop-shadow-lg">
            {data.title}
          </h1>
          <p className="text-xs sm:text-sm max-w-2xl mx-auto font-medium text-gray-200 drop-shadow-sm">
            {data.description}
          </p>
        </div>
      </div>

      {/* ── 3 CORE TESTING MODULES HIGHLIGHT HUB ───────────────────────────── */}
      <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-[10px] font-black text-[#B8212E] uppercase tracking-widest bg-rose-50 px-3 py-0.5 rounded-full border border-rose-200">
            ⚡ 3 Standard Test Modules
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">
            Official 3-Step Selection Engine
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Every candidate must clear Verbal, Non-Verbal, and Academic tests to pass the computerized initial test.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Section 1 Card */}
          <div className="p-5 rounded-2xl bg-white border-2 border-emerald-200 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm">🧠</span>
                <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">84 MCQs | 30m</span>
              </div>
              <h3 className="font-extrabold text-base text-slate-900">1. Verbal Intelligence</h3>
              <p className="text-xs text-slate-500 font-medium">Number series, analogies, blood relations, and coding-decoding puzzles.</p>
            </div>
            <div className="pt-2 text-xs font-black text-emerald-700">20+ Practice Tests Included ✓</div>
          </div>

          {/* Section 2 Card */}
          <div className="p-5 rounded-2xl bg-white border-2 border-[#B8212E]/40 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-black text-sm">🧩</span>
                <span className="text-[10px] font-black text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 uppercase">64 Shapes | 30m</span>
              </div>
              <h3 className="font-extrabold text-base text-slate-900">2. Non-Verbal Intelligence</h3>
              <p className="text-xs text-slate-500 font-medium">Pattern rotations, shape analogies, dot shifts, and matrix completion figures.</p>
            </div>
            <div className="pt-2 text-xs font-black text-[#B8212E]">20+ Practice Tests Included ✓</div>
          </div>

          {/* Section 3 Card */}
          <div className="p-5 rounded-2xl bg-white border-2 border-indigo-200 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-black text-sm">📚</span>
                <span className="text-[10px] font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 uppercase">50 MCQs | 25m</span>
              </div>
              <h3 className="font-extrabold text-base text-slate-900">3. Academic Screening</h3>
              <p className="text-xs text-slate-500 font-medium">Physics, Mathematics, English, Chemistry, and General Knowledge test batteries.</p>
            </div>
            <div className="pt-2 text-xs font-black text-indigo-700">20+ Practice Tests Included ✓</div>
          </div>

        </div>
      </div>

      {/* Subgroups & Original Course Picture Cards */}
      <div className="space-y-12">
        {data.subgroups.map((subgroup: any) => (
          <div key={subgroup.name} className="space-y-6">
            <div className="flex items-center gap-3 border-b-2 border-slate-200 pb-3">
              {subgroup.iconUrl ? (
                <div className="w-11 h-11 shrink-0 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200 overflow-hidden p-1 relative">
                  <Image src={subgroup.iconUrl} alt={subgroup.name} fill className="object-contain p-1" />
                </div>
              ) : (
                <Target className="w-6 h-6 text-[#B8212E]" />
              )}
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 uppercase tracking-tight">{subgroup.name}</h2>
                <p className="text-xs text-gray-500 font-medium">Select your desired commission course below to access all 60+ tests.</p>
              </div>
            </div>
            
            {/* Cards Grid with Official Verified Picture Mappings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {subgroup.exams.map((exam: any) => {
                const targetCategory = ['army', 'navy', 'paf'].includes(category) 
                  ? category 
                  : subgroup.name.toLowerCase().includes('paf') 
                  ? 'paf' 
                  : subgroup.name.toLowerCase().includes('navy') 
                  ? 'navy' 
                  : 'army'

                return (
                  <Link 
                    key={exam.id}
                    href={`/${targetCategory}/${exam.id}`}
                    className="group border-2 border-slate-300 hover:border-[#B8212E] rounded-3xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between min-h-[230px] relative overflow-hidden group hover:-translate-y-1 bg-slate-900"
                  >
                    {/* Authentic Background Picture */}
                    {exam.cardBgUrl && (
                      <>
                        <Image 
                          src={exam.cardBgUrl} 
                          alt={exam.name} 
                          fill 
                          sizes="(max-width: 768px) 100vw, 300px" 
                          className="object-cover absolute inset-0 z-0 group-hover:scale-110 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/65 to-black/30 z-10 group-hover:via-[#0A192F]/40 transition-colors"></div>
                      </>
                    )}

                    {/* Top Active Tag */}
                    <div className="relative z-20 p-5">
                      <span className="text-[10px] font-black uppercase text-amber-300 bg-black/70 px-3 py-1 rounded-full border border-amber-400/50 inline-flex items-center gap-1 backdrop-blur-md shadow-xs">
                        <Flame className="w-3 h-3 text-amber-400 fill-current" /> 60+ Tests Active
                      </span>
                    </div>

                    {/* Bottom Course Name & Action */}
                    <div className="relative z-20 p-5 space-y-2">
                      <h3 className="font-black text-base sm:text-lg text-white drop-shadow-md leading-tight group-hover:text-amber-300 transition-colors">
                        {exam.name}
                      </h3>
                      <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-200 group-hover:text-white pt-1">
                        <span>Attempt Tests</span>
                        <ArrowRight className="w-4 h-4 text-[#B8212E] group-hover:text-amber-300 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
