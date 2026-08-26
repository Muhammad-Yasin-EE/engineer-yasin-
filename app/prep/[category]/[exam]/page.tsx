import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { armedForcesData, branchColors, branchImages } from '@/lib/data/armedForcesData'
import ExamTabs from '@/components/ExamTabs'
import DynamicPublicServiceJobs from '@/components/DynamicPublicServiceJobs'
import {
  ArrowLeft, Shield, Calendar, GraduationCap, Clock, Users,
  BookOpen, ArrowRight, FileText
} from 'lucide-react'

export const revalidate = 3600

const formatTitle = (slug: string) =>
  slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

export async function generateMetadata({ params }: { params: Promise<{ category: string; exam: string }> }) {
  const { category, exam } = await params
  const info = armedForcesData[exam]

  const pscImages: Record<string, string> = {
    bpsc: '/images/card-bpsc.jpg',
    fpsc: '/images/card-fpsc.jpg',
    ppsc: '/images/card-ppsc.jpg',
    spsc: '/images/card-spsc.jpg',
    kppsc: '/images/card-kppsc.jpg',
    ajkpsc: '/images/card-ajkpsc.jpg',
    gbpsc: '/images/card-gbpsc.jpg',
  }
  const pscTitles: Record<string, string> = {
    bpsc: 'BALOCHISTAN PUBLIC SERVICE COMMISSION (BPSC QUETTA)',
    fpsc: 'FEDERAL PUBLIC SERVICE COMMISSION (FPSC ISLAMABAD)',
    ppsc: 'PUNJAB PUBLIC SERVICE COMMISSION (PPSC PUNJAB)',
    spsc: 'SINDH PUBLIC SERVICE COMMISSION (SPSC SINDH)',
    kppsc: 'KHYBER PAKHTUNKHWA PUBLIC SERVICE COMMISSION (KPPSC PESHAWAR)',
    ajkpsc: 'AZAD JAMMU & KASHMIR PUBLIC SERVICE COMMISSION (AJKPSC)',
    gbpsc: 'GILGIT-BALTISTAN PUBLIC SERVICE COMMISSION (GBPSC)',
  }
  
  if (info) {
    const title = `${info.title.toUpperCase()} - Official Selection Tests & Syllabus | Engineer Yasin`
    const description = `Prepare for ${info.title} with premium interactive online mock tests, subject-wise syllabus downloads, and official selection process guidance.`
    const image = info.branchSlug === 'paf' 
      ? '/images/exam-paf-bg.jpg' 
      : info.branchSlug === 'navy' 
      ? '/images/exam-navy-bg.jpg' 
      : '/images/exam-army-bg.jpg'
    const url = `https://www.engineeryasin.xyz/${info.branchSlug}/${exam}`

    return {
      title,
      description,
      openGraph: { title, description, url, type: 'website', images: [{ url: image, width: 1200, height: 630, alt: title }] },
      twitter: { card: 'summary_large_image', title, description, images: [image] }
    }
  }

  const examLower = exam.toLowerCase()
  const displayTitle = pscTitles[examLower] ? `${pscTitles[examLower]} - Live Job Portal` : `${formatTitle(exam).toUpperCase()} - Preparation & Quizzes | Engineer Yasin`
  const description = pscTitles[examLower]
    ? `Explore real-time verified recruitment advertisements, E-Letter roll number slips, interview schedules and competitive mock quizzes for ${formatTitle(exam).toUpperCase()}.`
    : `Access premium interactive mock tests, solved past papers and official preparation guidance for ${formatTitle(exam).toUpperCase()}.`
  const image = pscImages[examLower] || (category === 'public-service' ? '/images/public-service-header.jpg' : '/images/hero-armed-forces.jpg')
  const url = `https://www.engineeryasin.xyz/prep/${category}/${exam}`

  return {
    title: displayTitle,
    description,
    openGraph: { title: displayTitle, description, url, type: 'website', images: [{ url: image, width: 1200, height: 630, alt: displayTitle }] },
    twitter: { card: 'summary_large_image', title: displayTitle, description, images: [image] }
  }
}

export default async function ExamPage({
  params,
}: {
  params: Promise<{ category: string; exam: string }>
}) {
  const { category, exam } = await params
  const info = armedForcesData[exam]
  const supabase = await createClient()

  // ── Wide High-Resolution Header Banner Mappings ─────────────────────────────
  let headerBg = '/images/exam-army-bg.jpg'
  if (['pma-long-course', 'lcc', 'dssc', 'tcc', 'afns', 'soldier', 'amc'].includes(exam) || category === 'army') {
    headerBg = '/images/exam-army-bg.jpg'
  } else if (['gd-pilot', 'aeronautical-engineering', 'air-defence', 'admin', 'accounts', 'logistics', 'it', 'airmen'].includes(exam) || category === 'paf') {
    headerBg = '/images/exam-paf-bg.jpg'
  } else if (['pn-cadet', 'ssc', 'marines', 'sailor', 'civilian', 'navy-pnec'].includes(exam) || category === 'navy') {
    headerBg = '/images/exam-navy-bg.jpg'
  } else if (category === 'public-service') {
    headerBg = '/images/public-service-header.jpg'
  } else if (category === 'entry-tests') {
    headerBg = '/images/entry-tests-header.jpg'
  }

  // ── Fallback for non-armed-forces or custom exam routes ─────────────────────
  if (!['armed-forces', 'army', 'navy', 'paf'].includes(category) || !info) {
    const displayTitle = formatTitle(exam).toUpperCase()

    const { data: quizzes } = await supabase
      .from('quizzes')
      .select('*')
      .ilike('title', `%${formatTitle(exam)}%`)
      .order('created_at', { ascending: true })

    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow flex flex-col gap-10 bg-white text-gray-800">
        <Link
          href={['army', 'navy', 'paf'].includes(category) ? `/${category}` : `/prep/${category}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#B8212E] w-fit"
        >
          <ArrowLeft className="w-4 h-4" /> Back to {formatTitle(category)}
        </Link>
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 min-h-[240px] flex items-center p-8">
          <div className="absolute inset-0 bg-[#0A192F]/85 z-10" />
          <Image src={headerBg} alt={displayTitle} fill priority className="absolute inset-0 object-cover object-center" />
          <div className="relative z-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase drop-shadow-md">{displayTitle}</h1>
            <p className="text-gray-200 mt-2.5 text-sm sm:text-base font-semibold drop-shadow-sm max-w-3xl">
              Practice with authentic computerized mock tests designed for {displayTitle}.
            </p>
          </div>
        </div>

        {/* Dynamic Public Service Jobs if applicable */}
        {category === 'public-service' && <DynamicPublicServiceJobs commissionSlug={exam} />}

        {/* Quizzes List */}
        <div className="mt-4">
          <h2 className="text-xl sm:text-2xl font-black text-[#0A192F] uppercase tracking-wide mb-6">
            Online Practice Mock Quizzes for {displayTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {quizzes && quizzes.length > 0 ? (
              quizzes.map((quiz, i) => (
                <div
                  key={quiz.id}
                  className="border border-gray-200 rounded-2xl p-5 hover:border-[#B8212E] hover:shadow-md transition-all bg-white flex flex-col gap-4"
                >
                  <span className="text-xs font-bold text-gray-400">Test {i + 1}</span>
                  <h3 className="font-bold text-gray-900 text-base">{quiz.title}</h3>
                  <Link
                    href={`/prep/quiz/${quiz.id}`}
                    className="mt-auto w-full py-2 bg-[#B8212E] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 hover:bg-[#A31C28] transition-colors uppercase tracking-wider"
                  >
                    Start Test <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-3 py-16 text-center text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <BookOpen className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                <p className="font-semibold">Practice tests coming soon for {displayTitle}.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── Full Armed Forces Course Details Page ──────────────────────────────────
  const clr = branchColors[info.branchSlug] || { primary: '#15803d', bg: 'bg-green-50', badge: 'bg-green-100 text-green-800', border: 'border-green-200' }

  // Official Branch Emblems for Round Badges
  const branchEmblem = info.branchSlug === 'paf' 
    ? '/images/paf-logo.jpg' 
    : info.branchSlug === 'navy' 
    ? '/images/navy-logo.jpg' 
    : '/images/army-circle-logo.jpg'

  const quickIcons = [Calendar, GraduationCap, Clock, Users]

  return (
    <div className="bg-white text-gray-800 pb-20">

      {/* ── HERO BANNER WITH WIDE OFFICIAL PICTURE ─────────────────────────── */}
      <section className="relative min-h-[300px] sm:min-h-[380px] flex flex-col overflow-hidden">
        <Image
          src={headerBg}
          alt={info.title}
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/65 to-black/30 z-10" />

        {/* Top row: back link left, branch badge right */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex items-center justify-between">
          <Link
            href={['army', 'navy', 'paf'].includes(category) ? `/${category}` : `/prep/${category}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white/80 hover:text-white transition-colors bg-black/40 px-3.5 py-1.5 rounded-full border border-white/20 backdrop-blur-md"
          >
            <ArrowLeft className="w-4 h-4" /> Back to {info.branch} Cards
          </Link>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-white/10 text-amber-300 border border-amber-400/40 backdrop-blur-md">
            <div className="w-4 h-4 rounded-full overflow-hidden relative">
              <Image src={branchEmblem} alt={info.branch} fill className="object-contain" />
            </div>
            {info.branch}
          </div>
        </div>

        {/* Bottom: title + commission type */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 mt-auto space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 bg-black/60 px-3 py-1 rounded-full border border-amber-400/30 inline-block backdrop-blur-xs">
            Official Commission Course
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-xl uppercase">
            {info.title}
          </h1>
          <p className="text-xs sm:text-sm text-white/85 font-medium max-w-2xl">
            {info.commissionType} • 2-Year / 4-Year Commissioned Officer Career
          </p>
        </div>
      </section>

      {/* ── QUICK FACTS STRIP ──────────────────────────────────────────────── */}
      <section className="bg-[#0A192F] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {info.quickFacts.map((fact, i) => {
              const Icon = quickIcons[i] || Shield
              return (
                <div
                  key={fact.label}
                  className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 shadow-inner"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center shrink-0 border border-[#D4AF37]/30">
                    <Icon className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      {fact.label}
                    </p>
                    <p className="text-white text-xs font-black leading-snug mt-0.5">
                      {fact.value}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── TABBED EXAM & PRACTICE TESTS MATRIX (60+ Tests) ────────────────── */}
      <ExamTabs
        info={info}
        quizzes={[]}
        clr={clr}
      />

    </div>
  )
}
