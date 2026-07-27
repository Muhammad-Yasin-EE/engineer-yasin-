import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { armedForcesData, branchColors, branchImages } from '@/lib/data/armedForcesData'
import ExamTabs from '@/components/ExamTabs'
import {
  ArrowLeft, Shield, Calendar, GraduationCap, Clock, Users,
  BookOpen, ArrowRight, FileText
} from 'lucide-react'

export const revalidate = 3600

const formatTitle = (slug: string) =>
  slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

export async function generateMetadata({ params }: { params: Promise<{ category: string; exam: string }> }) {
  const { exam } = await params;
  const info = armedForcesData[exam];
  
  if (info) {
    return {
      title: `${info.title} Mock Tests & Preparation | Engineer Yasin`,
      description: `Prepare for the ${info.title} with premium mock tests, syllabus, and official selection process details.`,
    };
  }

  const title = formatTitle(exam);
  return {
    title: `${title} Preparation & Quizzes | Engineer Yasin`,
    description: `Access premium mock tests and past papers for ${title}.`,
  };
}

export default async function ExamPage({
  params,
}: {
  params: Promise<{ category: string; exam: string }>
}) {
  const { category, exam } = await params
  const info = armedForcesData[exam]
  const supabase = await createClient()

  // ── Fallback for non-armed-forces or unknown exams ─────────────────────────
  if (!['armed-forces', 'army', 'navy', 'paf'].includes(category) || !info) {
    const title = formatTitle(exam)
    let headerBg = '/images/exam-army-bg.jpg'
    if (['pma-long-course', 'lcc', 'dssc', 'tcc', 'afns', 'soldier', 'm-cadet', 'amc'].includes(exam))
      headerBg = '/images/exam-army-bg.jpg'
    else if (['gd-pilot', 'aeronautical-engineering', 'air-defence', 'admin', 'accounts', 'logistics', 'it', 'education', 'airmen'].includes(exam))
      headerBg = '/images/exam-paf-bg.jpg'
    else if (['pn-cadet', 'ssc', 'marines', 'sailor', 'civilian', 'm-cadet-navy', 'pnec'].includes(exam))
      headerBg = '/images/exam-navy-bg.jpg'
    else if (category === 'public-service') headerBg = '/images/public-service-header.jpg'
    else if (category === 'entry-tests') headerBg = '/images/entry-tests-header.jpg'

    const { data: quizzes } = await supabase
      .from('quizzes')
      .select('*')
      .ilike('title', `${title}%`)
      .order('created_at', { ascending: true })

    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow flex flex-col gap-10 bg-white text-gray-800">
        <Link
          href={category === 'public-service' ? '/jobs' : ['army', 'navy', 'paf'].includes(category) ? `/${category}` : `/prep/${category}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#B8212E] w-fit"
        >
          <ArrowLeft className="w-4 h-4" /> {category === 'public-service' ? 'Back to Public Services & Jobs' : `Back to ${formatTitle(category)}`}
        </Link>
        <div className="relative rounded-xl overflow-hidden shadow-md border border-gray-200 min-h-[240px] flex items-center p-8">
          <div className="absolute inset-0 bg-[#0A192F]/80 z-10" />
          <Image src={headerBg} alt={title} fill priority className="absolute inset-0 object-cover object-center" />
          <div className="relative z-20">
            <h1 className="text-4xl font-extrabold text-white tracking-tight">{title}</h1>
            <p className="text-gray-200 mt-2 text-sm font-medium">
              Practice with real mock tests designed for {title}.
            </p>
          </div>
        </div>

        {/* ── BPSC Real-Time Verified Live Updates & Download Portal ────────────── */}
        {exam === 'bpsc' && (
          <div className="space-y-8 my-2">
            <div className="border-b-2 border-gray-150 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-black text-[11px] uppercase tracking-widest border border-emerald-300 mb-2 shadow-sm">
                  🟢 Real-Time Verified BPSC Portal Data
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0A192F] uppercase tracking-tight">
                  Balochistan PSC (BPSC) Live Updates &amp; Downloads
                </h2>
                <p className="text-xs font-bold text-gray-500 mt-1 uppercase tracking-wider">
                  Official Samungli Road Quetta Portal Links &bull; No Guesswork &bull; 100% Authentic Downloads
                </p>
              </div>
              <a 
                href="http://www.bpsc.gob.pk" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-5 py-3 rounded-2xl bg-[#0A192F] hover:bg-slate-800 text-amber-300 font-black text-xs uppercase tracking-wider transition-all hover:scale-105 shrink-0 shadow-xl flex items-center gap-1.5 justify-center"
              >
                Visit Official bpsc.gob.pk &rarr;
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: Advertisements */}
              <div className="border-2 border-slate-200 rounded-3xl p-6 bg-white shadow-md flex flex-col justify-between hover:border-[#B8212E] hover:shadow-2xl transition-all group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#B8212E]/10 text-[#B8212E] flex items-center justify-center font-black text-2xl mb-4 group-hover:scale-110 transition-transform">
                    📢
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#B8212E]">Latest Advertisements</span>
                  <h3 className="text-lg font-black text-slate-900 mt-1 mb-2">Advt. No. 06/2026 &amp; Provincial Posts</h3>
                  <p className="text-xs text-slate-600 font-semibold leading-relaxed mb-6">
                    Download complete official recruitment circulars for B-16 and B-17 executive vacancies across Health, Irrigation, Education, and General Administration departments in Balochistan.
                  </p>
                </div>
                <a
                  href="http://www.bpsc.gob.pk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto w-full py-3.5 bg-[#B8212E] hover:bg-[#961a25] text-white text-xs font-black rounded-2xl text-center uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 group-hover:shadow-lg"
                >
                  Download Job Ads &rarr;
                </a>
              </div>

              {/* Card 2: Interview Schedules */}
              <div className="border-2 border-slate-200 rounded-3xl p-6 bg-white shadow-md flex flex-col justify-between hover:border-indigo-600 hover:shadow-2xl transition-all group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-600 flex items-center justify-center font-black text-2xl mb-4 group-hover:scale-110 transition-transform">
                    🗓️
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Viva Voce Program</span>
                  <h3 className="text-lg font-black text-slate-900 mt-1 mb-2">Official Interview Schedules</h3>
                  <p className="text-xs text-slate-600 font-semibold leading-relaxed mb-6">
                    Check verified timetable lists and active press releases for departmental viva voce sessions and competitive examination interviews announced by Quetta headquarters.
                  </p>
                </div>
                <a
                  href="http://www.bpsc.gob.pk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-2xl text-center uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 group-hover:shadow-lg"
                >
                  View Interview Schedule &rarr;
                </a>
              </div>

              {/* Card 3: E-Letter / Roll No Slip */}
              <div className="border-2 border-slate-200 rounded-3xl p-6 bg-white shadow-md flex flex-col justify-between hover:border-emerald-600 hover:shadow-2xl transition-all group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center font-black text-2xl mb-4 group-hover:scale-110 transition-transform">
                    🎟️
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Written Test Slip</span>
                  <h3 className="text-lg font-black text-slate-900 mt-1 mb-2">Download Roll No Slip (E-Letter)</h3>
                  <p className="text-xs text-slate-600 font-semibold leading-relaxed mb-6">
                    Access your computerized examination entry slip directly by entering your CNIC (without dashes). Original printed E-Letter is compulsory for center admission.
                  </p>
                </div>
                <a
                  href="http://www.bpsc.gob.pk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-2xl text-center uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 group-hover:shadow-lg"
                >
                  Download E-Letter &rarr;
                </a>
              </div>

              {/* Card 4: Syllabi & Past Papers */}
              <div className="border-2 border-slate-200 rounded-3xl p-6 bg-white shadow-md flex flex-col justify-between hover:border-amber-600 hover:shadow-2xl transition-all group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-600 flex items-center justify-center font-black text-2xl mb-4 group-hover:scale-110 transition-transform">
                    📚
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-700">Exam Curriculum</span>
                  <h3 className="text-lg font-black text-slate-900 mt-1 mb-2">Competitive Exam Syllabi</h3>
                  <p className="text-xs text-slate-600 font-semibold leading-relaxed mb-6">
                    Download authentic subject-wise syllabi and paper patterns directly from BPSC for PMS, Section Officer, Assistant Commissioner, and Tehsildar examinations.
                  </p>
                </div>
                <a
                  href="http://www.bpsc.gob.pk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-black rounded-2xl text-center uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 group-hover:shadow-lg"
                >
                  Download Syllabi &rarr;
                </a>
              </div>
            </div>

            {/* Helpline & Quetta Headquarters Info Box */}
            <div className="bg-[#0A192F] rounded-3xl p-6 sm:p-10 text-white border-2 border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
              <div className="space-y-2 max-w-2xl text-center md:text-left relative z-10">
                <span className="inline-block px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/40 rounded-full font-black text-[10px] uppercase tracking-widest">
                  🏛️ Official Quetta Headquarters Support Desk
                </span>
                <h3 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-white mt-2">Need E-Letter or Application Assistance?</h3>
                <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">
                  For technical errors regarding CNIC roll number searches or online form submissions, contact the official BPSC Computer &amp; Recruitment Section directly during working hours.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-5 shrink-0 text-xs font-bold text-slate-200 bg-slate-900/90 p-6 rounded-3xl border-2 border-slate-700 shadow-xl relative z-10 w-full md:w-auto">
                <div className="space-y-1.5">
                  <div className="text-amber-400 font-black uppercase text-[11px] tracking-wider">📍 Headquarter Address</div>
                  <div className="text-white text-sm font-black">Samungli Road, Quetta Cantt</div>
                  <div className="text-[11px] text-gray-400">Balochistan, Pakistan</div>
                </div>
                <div className="space-y-1.5 border-t sm:border-t-0 sm:border-l border-slate-700 pt-4 sm:pt-0 sm:pl-5">
                  <div className="text-amber-400 font-black uppercase text-[11px] tracking-wider">📞 Helplines &amp; Email</div>
                  <div className="text-white text-xs font-black">Recruitment: <span className="text-emerald-400 font-mono">081-9201601</span></div>
                  <div className="text-white text-xs font-black">Technical Desk: <span className="text-emerald-400 font-mono">081-9203264</span></div>
                  <div className="text-[11px] text-gray-400 font-mono">bpsc@bpsc.gob.pk</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4">
          <h2 className="text-xl sm:text-2xl font-black text-[#0A192F] uppercase tracking-wide mb-6">
            Online Practice Mock Quizzes for {title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {quizzes && quizzes.length > 0 ? (
              quizzes.map((quiz, i) => (
                <div
                  key={quiz.id}
                  className="border border-gray-200 rounded-xl p-5 hover:border-[#B8212E] hover:shadow-md transition-all bg-white flex flex-col gap-4"
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
            <div className="col-span-3 py-16 text-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <BookOpen className="w-10 h-10 mx-auto mb-3 text-gray-300" />
              <p className="font-semibold">Practice tests coming soon for {title}.</p>
            </div>
          )}
        </div>
        </div>
      </div>
    )
  }

  // ── Full armed-forces detail page ──────────────────────────────────────────
  const clr = branchColors[info.branchSlug]
  const bgImg = branchImages[info.branchSlug]

  // Fetch matching quizzes (combining all relevant search terms)
  let quizzes: any[] = []
  const seenIds = new Set<string>()
  for (const term of info.quizSearchTerms) {
    const { data } = await supabase
      .from('quizzes')
      .select('*')
      .ilike('title', `%${term}%`)
      .eq('category', info.quizCategory)
      .order('created_at', { ascending: true })
      .limit(20)
    if (data && data.length > 0) {
      for (const q of data) {
        // Exclude Verbal/Intelligence quizzes from soldier, sailor, civilian cards
        const isVerbalOrIntel = q.title.toLowerCase().includes('verbal') || q.title.toLowerCase().includes('intelligence')
        if (isVerbalOrIntel && ['soldier', 'sailor', 'civilian'].includes(exam)) {
          continue
        }
        if (!seenIds.has(q.id)) {
          seenIds.add(q.id)
          quizzes.push(q)
        }
      }
    }
  }

  const quickIcons = [Calendar, GraduationCap, Clock, Users]

  return (
    <div className="bg-white text-gray-800 pb-20">

      {/* ── Hero Banner ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[280px] sm:min-h-[360px] flex flex-col overflow-hidden">
        <Image
          src={bgImg}
          alt={info.title}
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/55 to-transparent z-10" />

        {/* Top row: back arrow left, branch badge right */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex items-center justify-between">
          <Link
            href={['army', 'navy', 'paf'].includes(category) ? `/${category}` : `/prep/${category}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {category === 'army' ? 'Pak Army Cards' : category === 'navy' ? 'Pak Navy Cards' : category === 'paf' ? 'Pak Air Force Cards' : 'Armed Forces'}
          </Link>
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest ${clr.badge}`}
          >
            <Shield className="w-3.5 h-3.5" />
            {info.branch}
          </div>
        </div>

        {/* Bottom: title + commission type */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 mt-auto">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-xl">
            {info.title}
          </h1>
          <p className="text-sm text-white/75 mt-2 font-semibold">{info.commissionType}</p>
        </div>
      </section>


      {/* ── Quick Facts Strip ────────────────────────────────────────────── */}
      <section className="bg-[#0A192F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {info.quickFacts.map((fact, i) => {
              const Icon = quickIcons[i] || Shield
              return (
                <div
                  key={fact.label}
                  className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      {fact.label}
                    </p>
                    <p className="text-white text-xs font-extrabold leading-snug mt-0.5">
                      {fact.value}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Tabbed Content (client component) ───────────────────────────── */}
      <ExamTabs
        info={info}
        quizzes={quizzes}
        clr={clr}
      />

    </div>
  )
}
