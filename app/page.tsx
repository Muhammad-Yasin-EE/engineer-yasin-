import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import AuthGateButton from '@/components/AuthGateButton'
import LiveTrustTicker from '@/components/LiveTrustTicker'
import EligibilityCalculator from '@/components/EligibilityCalculator'
import { ForcesCalculators, SelectionCentersSection, FaqSection } from '@/components/ForcesCalculators'
import { 
  GraduationCap, Download, BookOpen, 
  Sparkles, ArrowRight, ShieldCheck, FileText,
  Award, Users, Compass, MapPin, Star, Zap, MessageCircle, Flame, Shield
} from 'lucide-react'

export const revalidate = 3600

// Helper to clean up raw database quiz names and categorize by branch
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

  let badge = '🛡️ ARMED FORCES'
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
  }

  return { displayTitle, badge, colorClass }
}

export default async function Home() {
  const supabase = await createClient()
  
  let quizzes: any[] = []
  let errorMsg: string | null = null

  try {
    // 1. Fetch quizzes for our Featured Mock Tests Showcase
    const { data: quizData, error: quizError } = await supabase
      .from('quizzes')
      .select('id, title, description, category, created_at')
      .order('created_at', { ascending: false })
    if (quizError) throw quizError

    const allQuizzes = quizData || []
    
    // Curate specifically to highlight Pak Army, PAF & Navy equally
    const forcesOnly = allQuizzes.filter((q: any) => {
      const t = (q.title || '').toLowerCase()
      return !t.includes('fpsc') && !t.includes('ppsc') && !t.includes('nts') && !t.includes('mcat') && !t.includes('ecat') && !t.includes('css') && !t.includes('general')
    })

    const armyList = forcesOnly.filter((q: any) => {
      const t = (q.title || '').toLowerCase() + ' ' + (q.category || '').toLowerCase()
      return t.includes('pma') || t.includes('army') || t.includes('tcc') || t.includes('lcc') || t.includes('afns') || t.includes('soldier') || t.includes('amc')
    })
    
    const pafList = forcesOnly.filter((q: any) => {
      const t = (q.title || '').toLowerCase() + ' ' + (q.category || '').toLowerCase()
      return t.includes('paf') || t.includes('gd') || t.includes('pilot') || t.includes('aero') || t.includes('airmen') || t.includes('icto') || t.includes('air')
    })
    
    const navyList = forcesOnly.filter((q: any) => {
      const t = (q.title || '').toLowerCase() + ' ' + (q.category || '').toLowerCase()
      return t.includes('navy') || t.includes('pn') || t.includes('cadet') || t.includes('marine') || t.includes('sailor') || t.includes('ssc')
    })

    const curated: any[] = []
    const usedIds = new Set<string>()

    const addToCurated = (list: any[], count: number) => {
      let added = 0
      for (const q of list) {
        if (!usedIds.has(q.id) && added < count) {
          curated.push(q)
          usedIds.add(q.id)
          added++
        }
      }
    }

    addToCurated(armyList, 2)
    addToCurated(pafList, 2)
    addToCurated(navyList, 2)
    
    if (curated.length < 6) {
      addToCurated(forcesOnly, 6 - curated.length)
    }

    if (curated.length === 0) {
      quizzes = [
        { id: 'pma-long-course-mock-1', title: 'PMA Long Course Initial Intelligence Mock', category: 'Pak Army', description: 'Timed verbal and non-verbal reasoning test modeled on authentic AS&RC screening patterns.' },
        { id: 'paf-gd-pilot-mock-1', title: 'PAF GD Pilot Academic & IQ Evaluation', category: 'Pak Air Force', description: 'Physics, English, and rapid spatial visual pattern series for General Duty Pilot candidates.' },
        { id: 'pn-cadet-navy-mock-1', title: 'PN Cadet (Pakistan Navy) Screening Mock', category: 'Pak Navy', description: 'Mathematics, analytical physics, and verbal logic timed mock test for Naval officer selection.' },
        { id: 'issb-wat-psych-mock-1', title: 'ISSB Word Association & IQ Evaluation', category: 'ISSB', description: 'Fast-paced psychological projection screening practice to train spontaneous leader traits.' },
        { id: 'army-tcc-academic-mock-1', title: 'Army TCC (Technical Cadet) Math & Physics', category: 'Pak Army', description: 'High-level calculus, trigonometry, and electrostatics multiple choice questions.' },
        { id: 'cadet-colleges-scholarship-mock-1', title: 'Forces & Cadet Scholarships Entry Mock 2026', category: 'Scholarships', description: 'Comprehensive 8th & 11th class military scholarship entrance test covering English, Math, & Urdu.' }
      ]
    } else {
      quizzes = curated
    }
  } catch (err: any) {
    console.error('Home Page Data Fetching Error:', err)
    quizzes = [
      { id: 'pma-long-course-mock-1', title: 'PMA Long Course Initial Intelligence Mock', category: 'Pak Army', description: 'Timed verbal and non-verbal reasoning test modeled on authentic AS&RC screening patterns.' },
      { id: 'paf-gd-pilot-mock-1', title: 'PAF GD Pilot Academic & IQ Evaluation', category: 'Pak Air Force', description: 'Physics, English, and rapid spatial visual pattern series for General Duty Pilot candidates.' },
      { id: 'pn-cadet-navy-mock-1', title: 'PN Cadet (Pakistan Navy) Screening Mock', category: 'Pak Navy', description: 'Mathematics, analytical physics, and verbal logic timed mock test for Naval officer selection.' },
      { id: 'issb-wat-psych-mock-1', title: 'ISSB Word Association & IQ Evaluation', category: 'ISSB', description: 'Fast-paced psychological projection screening practice to train spontaneous leader traits.' },
      { id: 'army-tcc-academic-mock-1', title: 'Army TCC (Technical Cadet) Math & Physics', category: 'Pak Army', description: 'High-level calculus, trigonometry, and electrostatics multiple choice questions.' },
      { id: 'cadet-colleges-scholarship-mock-1', title: 'Forces & Cadet Scholarships Entry Mock 2026', category: 'Scholarships', description: 'Comprehensive 8th & 11th class military scholarship entrance test covering English, Math, & Urdu.' }
    ]
    errorMsg = null
  }

  return (
    <div className="space-y-16 pb-24 bg-slate-50 text-gray-800 font-sans selection:bg-[#B8212E] selection:text-white">
      
      {/* ── HERO SECTION (Ultra Premium Military Suite - Light Theme) ──────── */}
      <section className="relative overflow-hidden bg-white pt-3 pb-12 sm:pt-5 sm:pb-16 text-[#0A192F] border-b border-gray-200 shadow-sm">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-rose-50 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] bg-amber-50 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-14">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left space-y-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[#0A192F] text-[11px] uppercase tracking-widest font-extrabold shadow-xs">
                <Sparkles className="w-4 h-4 animate-spin-slow text-[#B8212E]" />
                Pakistan&apos;s Premier Armed Forces &amp; Cadet Portal
              </div>
          
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0A192F] max-w-2xl mx-auto lg:mx-0 leading-[1.15] uppercase">
                Free Online Preparation for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B8212E] via-[#0A192F] to-[#B8212E]">Pak Army, Navy</span> &amp; PAF Tests 2026
              </h1>
              
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Whether you aim to serve in the Pakistani Armed Forces, Civil Services, Cadet Colleges or pursue a career in engineering &amp; leadership, <span className="text-[#0A192F] font-extrabold">Engineer Yasin Digital Prep Portal</span> is the definitive first step towards achieving your goals.
              </p>

              {/* Primary Call to Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/prep/armed-forces"
                  className="px-8 py-4 rounded-2xl bg-[#B8212E] hover:bg-[#961a25] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"
                >
                  <Flame className="w-4 h-4 fill-current text-amber-300" /> Start Free Mock Quizzes ➔
                </Link>
                <Link
                  href="/issb"
                  className="px-7 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 text-[#0A192F] font-black text-xs sm:text-sm uppercase tracking-wider shadow-sm transition-all hover:scale-[1.02] flex items-center gap-2"
                >
                  <Shield className="w-4 h-4 text-[#B8212E]" /> Enter ISSB Hub
                </Link>
              </div>

              {/* Quick Navigation Hub Grid */}
              <div className="pt-6">
                <p className="text-[11px] uppercase tracking-widest text-gray-500 font-extrabold mb-3 text-center lg:text-left">
                  ⚡ Quick Direct access Hub
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto lg:mx-0">
                  {[
                    { title: "Armed Forces", icon: ShieldCheck, href: "/prep/armed-forces", color: "text-emerald-700" },
                    { title: "ISSB Portal", icon: Award, href: "/issb", color: "text-amber-700" },
                    { title: "Scholarships", icon: GraduationCap, href: "/colleges", color: "text-blue-700" },
                    { title: "E-Books Library", icon: Download, href: "/pdfs", color: "text-rose-700" },
                  ].map((tab) => {
                    const TIcon = tab.icon;
                    return (
                      <Link
                        key={tab.title}
                        href={tab.href}
                        className="p-3.5 bg-slate-50 border border-gray-200 hover:border-[#B8212E] hover:bg-white rounded-2xl text-center flex flex-col items-center gap-2 group transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-xs flex items-center justify-center group-hover:scale-110 transition-transform">
                          <TIcon className={`w-5 h-5 ${tab.color}`} />
                        </div>
                        <span className="text-xs font-black text-[#0A192F] tracking-wider uppercase">{tab.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Content - Interactive Hero Showcase */}
            <div className="flex-1 w-full max-w-md lg:max-w-none relative">
              <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] w-full sm:w-4/5 lg:w-full mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-sky-100 rounded-3xl blur-2xl opacity-70"></div>
                
                <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden border-2 border-gray-200 shadow-xl bg-white group">
                  <Image 
                    src="/images/hero-armed-forces.jpg" 
                    alt="Salute to the Armed Forces of Pakistan" 
                    fill
                    priority
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-90"></div>

                  <div className="absolute top-6 right-6 bg-white/95 border border-gray-200 p-3.5 rounded-2xl shadow-lg backdrop-blur-md flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 font-extrabold text-xs">
                      ✔
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-500 font-extrabold">Status</p>
                      <p className="text-xs font-black text-[#0A192F]">100% Free Online Quizzes</p>
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 border border-gray-200 p-4 rounded-2xl shadow-xl backdrop-blur-md flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#B8212E] flex items-center justify-center text-white shrink-0 shadow-sm">
                        <Star className="w-6 h-6 fill-current text-amber-300" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-[#0A192F]">ISSB Complete Guidance</h4>
                        <p className="text-xs text-gray-600 font-medium">Psychology, GTO &amp; Interview Batches</p>
                      </div>
                    </div>
                    <Link href="/issb" className="px-3.5 py-2 rounded-xl bg-[#0A192F] text-white text-xs font-black uppercase tracking-wider hover:bg-[#B8212E] transition-colors shrink-0">
                      Explore ➔
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── ADMISSIONS OPEN & CORE SUBJECTS PORTAL CARD ────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden">
          
          {/* Top Red Alert Banner */}
          <div className="bg-[#B8212E] text-white py-4 px-6 text-center shadow-md flex items-center justify-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping shrink-0" />
            <p className="text-xs sm:text-sm md:text-base font-black uppercase tracking-wider">
              🚨 ADMISSIONS OPEN : JOIN US FOR ARMED FORCES &amp; CADET COLLEGES TEST PREPARATION 2026 🚨
            </p>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping shrink-0" />
          </div>

          {/* Center Content: Premium Features Grid */}
          <div className="p-6 sm:p-10 space-y-6 text-center bg-gradient-to-b from-white to-slate-50">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-widest mb-2 border border-amber-200 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Killer Features
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-[#0A192F] uppercase tracking-tight inline-block pb-1 border-b-4 border-[#B8212E]/80">
                PREMIUM AI TOOLS
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium max-w-2xl mx-auto">
              Unlock our exclusive AI-powered evaluations and smart interactive study planners designed to maximize your recommendation chances.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 max-w-5xl mx-auto">
              {[
                { title: "Psychologist", icon: "🧠", href: "/issb/ai-interview", bg: "hover:bg-emerald-50 hover:border-emerald-500 text-emerald-900" },
                { title: "TAT Evaluator", icon: "🖼️", href: "/issb/tat", bg: "hover:bg-blue-50 hover:border-blue-500 text-blue-900" },
                { title: "Study Planner", icon: "📅", href: "/study-planner", bg: "hover:bg-amber-50 hover:border-amber-500 text-amber-900" },
                { title: "Tinder Flashcards", icon: "🃏", href: "/flashcards", bg: "hover:bg-rose-50 hover:border-rose-500 text-rose-900" },
                { title: "GTO Evaluator", icon: "🚩", href: "/issb/gto-evaluator", bg: "hover:bg-indigo-50 hover:border-indigo-500 text-indigo-900" }
              ].map((subj) => (
                <AuthGateButton
                  key={subj.title}
                  href={subj.href}
                  className={`w-full h-full p-4 rounded-2xl bg-white border-2 border-gray-200 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1 flex flex-col items-center justify-center gap-2 group ${subj.bg}`}
                >
                  <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform">{subj.icon}</span>
                  <span className="text-[11px] sm:text-xs font-extrabold tracking-tight uppercase">{subj.title}</span>
                </AuthGateButton>
              ))}
            </div>
          </div>

          {/* Bottom WhatsApp Announcement Bar */}
          <a
            href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-50 hover:bg-slate-100 border-t border-gray-200 text-[#0A192F] py-4 px-6 text-center flex items-center justify-center gap-3 transition-colors group cursor-pointer block"
          >
            <MessageCircle className="w-5 h-5 text-emerald-600 fill-current group-hover:scale-110 transition-transform" />
            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-gray-700 group-hover:text-[#B8212E] transition-colors">
              📢 Free Updates of Armed Forces &amp; Scholarships: <span className="underline text-[#B8212E] font-black">Click Here To Join Official WhatsApp Channel</span> &rarr;
            </p>
          </a>

        </div>
      </section>

      {/* ── LIVE TELEMETRY & PROVINCIAL CANDIDATES DASHBOARD ────────────────── */}
      <LiveTrustTicker />

      {/* ── ROUND EMBLEM CIRCLE HUBS (Row 1) ──────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-black text-[#B8212E] uppercase tracking-widest">
            🛡️ Choose Your Service Branch
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0A192F] tracking-tight uppercase">
            Official Career Portals
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Select your target institution below to access dedicated initial testing banks and syllabus guides.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 justify-items-center">
          {[
            { title: "Join Pak Army", img: "/images/army-circle-logo.jpg", href: "/prep/army", ring: "border-emerald-600/60" },
            { title: "Join Pak Navy", img: "/images/navy-logo.jpg", href: "/prep/navy", ring: "border-indigo-600/60" },
            { title: "Join Pak Air Force", img: "/images/paf-logo.jpg", href: "/prep/paf", ring: "border-sky-500/60" },
            { title: "ISSB Tests", img: "/images/issb-header.jpg", href: "/issb", ring: "border-rose-600/60" },
            { title: "Scholarships", img: "/images/cadet-colleges-logo.jpg", href: "/colleges", ring: "border-amber-500/60" }
          ].map((hub) => (
            <Link
              key={hub.title}
              href={hub.href}
              className="flex flex-col items-center text-center group cursor-pointer w-full max-w-[180px]"
            >
              <div className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 ${hub.ring} p-2 bg-white shadow-lg group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300 relative overflow-hidden flex items-center justify-center`}>
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <Image
                    src={hub.img}
                    alt={hub.title}
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <span className="mt-4 text-sm sm:text-base font-black text-[#0A192F] group-hover:text-[#B8212E] tracking-tight uppercase transition-colors">
                {hub.title}
              </span>
              <span className="text-[11px] font-extrabold text-gray-400 group-hover:text-[#0A192F] transition-colors">
                Enter Portal &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── INTERACTIVE FORCES CALCULATORS (Age & Weight) ───────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ForcesCalculators />
      </section>

      {/* ── FORCES RANKS, SALARY, SELECTION CENTERS & RESOURCES (Rows 2 & 3) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-black text-[#B8212E] uppercase tracking-widest">
            📚 Essential Knowledge Vault
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0A192F] tracking-tight uppercase">
            Forces Ranks, Salary, Selection Centers &amp; Practice Resources
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Everything you need to know about military pay scales, insignia hierarchy, and regional test venues.
          </p>
        </div>

        {/* Row 2: Ranks & Quizzes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 justify-items-center">
          {[
            { title: "Ranks In Pak Army", desc: "Lieutenant to General", href: "/issb/ranks", img: "/images/army-rank.jpg", ring: "border-emerald-600/60" },
            { title: "Ranks In Pak Navy", desc: "Sub Lieut to Admiral", href: "/issb/ranks", img: "/images/navy-rank.jpg", ring: "border-indigo-600/60" },
            { title: "Ranks In PAF", desc: "Pilot Officer to Air Chief", href: "/issb/ranks", img: "/images/paf-rank.jpg", ring: "border-sky-500/60" },
            { title: "Online Quizzes", desc: "Timed Intelligence Mocks", href: "/quizzes", img: "/images/online-quiz.jpg", ring: "border-rose-600/60" }
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="flex flex-col items-center text-center group cursor-pointer w-full max-w-[200px]"
            >
              <div className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 ${item.ring} p-2 bg-white shadow-lg group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300 relative overflow-hidden flex items-center justify-center`}>
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <h4 className="mt-4 text-sm sm:text-base font-black text-[#0A192F] group-hover:text-[#B8212E] tracking-tight uppercase transition-colors">
                {item.title}
              </h4>
              <span className="text-[11px] font-extrabold text-gray-500 group-hover:text-[#B8212E] uppercase transition-colors">
                {item.desc} &rarr;
              </span>
            </Link>
          ))}
        </div>

        {/* Row 3: Selection Centers & Free E-Books */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          {[
            { title: "Army Selection Centers", desc: "AS&RC Regional Addresses", href: "/centers/army", img: "/images/army-circle-logo.jpg", ring: "border-emerald-600/60" },
            { title: "Navy Selection Centers", desc: "PNSC Recruitment Hubs", href: "/centers/navy", img: "/images/navy-logo.jpg", ring: "border-indigo-600/60" },
            { title: "PAF Selection Centers", desc: "PAF Information Centers", href: "/centers/paf", img: "/images/paf-logo.jpg", ring: "border-sky-500/60" },
            { title: "Free E-Books & Notes", desc: "Verified PDF Downloads", href: "/ebooks", img: "/images/download-pdf.jpg", ring: "border-purple-600/60" }
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="flex flex-col items-center text-center group cursor-pointer w-full max-w-[200px]"
            >
              <div className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 ${item.ring} p-2 bg-white shadow-lg group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300 relative overflow-hidden flex items-center justify-center`}>
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <h4 className="mt-4 text-sm sm:text-base font-black text-[#0A192F] group-hover:text-[#B8212E] tracking-tight uppercase transition-colors">
                {item.title}
              </h4>
              <span className="text-[11px] font-extrabold text-gray-500 group-hover:text-[#B8212E] uppercase transition-colors">
                {item.desc} &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── OUR MISSION EXECUTIVE BOX ──────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-3xl p-8 sm:p-14 text-gray-800 shadow-xl border-2 border-gray-200 relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-32 h-32 bg-amber-50 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-rose-50 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            <span className="px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-[#B8212E] text-xs font-black uppercase tracking-widest inline-block shadow-2xs">
              🎖️ ENGINEER YASIN FORCES ACADEMY
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#0A192F]">
              OUR MISSION
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed font-medium text-justify sm:text-center">
              &ldquo;Engineer Yasin Forces Academy is dedicated to shaping the defenders and leaders of tomorrow. With a firm commitment to excellence in guidance, preparation, and motivation, we provide an unparalleled online learning experience for candidates preparing for careers in the Pakistan Army, Navy, and Air Force. We integrate authentic military testing standards, realistic timed simulations, and expert mentoring under one unified digital roof to ensure your triumph in selection exams.&rdquo;
            </p>
            <div className="pt-4 flex items-center justify-center gap-6 text-xs sm:text-sm font-black text-[#0A192F]">
              <span>⚔️ Courage</span> &bull; <span>🛡️ Honour</span> &bull; <span>🇵🇰 Dedication</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPLORE OUR TOP STUDY RESOURCES PILL GRID ──────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-gray-100 shadow-xl text-center space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0A192F] tracking-tight uppercase inline-block pb-2 border-b-4 border-emerald-600">
              EXPLORE OUR TOP STUDY RESOURCES
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Click any subject tag below to jump directly to dedicated study materials and preparation modules.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 max-w-5xl mx-auto">
            {[
              { label: "Online Quizzes", href: "/quizzes", bg: "bg-[#0A192F] hover:bg-[#B8212E]" },
              { label: "ISSB Preparation", href: "/issb", bg: "bg-emerald-800 hover:bg-[#B8212E]" },
              { label: "Personality Tests", href: "/issb/wat", bg: "bg-[#0A192F] hover:bg-[#B8212E]" },
              { label: "PMA Long Course", href: "/prep/army/pma-long-course", bg: "bg-indigo-900 hover:bg-[#B8212E]" },
              { label: "General Updates", href: "/blog", bg: "bg-[#0A192F] hover:bg-[#B8212E]" },
              { label: "Latest Blogs", href: "/blog", bg: "bg-emerald-900 hover:bg-[#B8212E]" },
              { label: "Scholarships Prep", href: "/scholarships", bg: "bg-[#0A192F] hover:bg-[#B8212E]" },
              { label: "PAF Initial MCQs", href: "/prep/paf", bg: "bg-blue-950 hover:bg-[#B8212E]" },
              { label: "Pak Navy MCQs", href: "/prep/navy", bg: "bg-[#0A192F] hover:bg-[#B8212E]" },
              { label: "Free E-Books", href: "/ebooks", bg: "bg-teal-900 hover:bg-[#B8212E]" }
            ].map((tag) => (
              <Link
                key={tag.label}
                href={tag.href}
                className={`py-3.5 px-4 rounded-2xl text-white font-black text-xs sm:text-sm shadow-md transition-all duration-300 uppercase tracking-wider hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center text-center ${tag.bg}`}
              >
                {tag.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── OFFICIAL SELECTION CENTERS DIRECTORY (Interactive Suite) ────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SelectionCentersSection />
      </section>

      {/* ── WHY CHOOSE US (Trust & Stats Banner) ─────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200/80 p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {[
            { title: "Unlimited Free Mocks", desc: "Instant result evaluations with explanation notes for PMA, PAF & Navy exams.", icon: Zap, bg: "bg-amber-50 text-amber-600 border-amber-200" },
            { title: "ISSB Specialists", desc: "Personal evaluations and mock interviews by retired military officers.", icon: Award, bg: "bg-rose-50 text-[#B8212E] border-rose-200" },
            { title: "Verified Past Papers", desc: "Comprehensive E-Books question banks and cheat sheets compiled from recent test centers.", icon: FileText, bg: "bg-emerald-50 text-emerald-600 border-emerald-200" },
            { title: "Scholarships Guidance", desc: "Complete syllabus breakdown and preparatory modules for 8th & 11th class entry exams.", icon: GraduationCap, bg: "bg-blue-50 text-blue-600 border-blue-200" }
          ].map((feat, i) => {
            const FIcon = feat.icon;
            return (
              <div key={i} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${feat.bg} shadow-sm`}>
                  <FIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-gray-900 leading-tight mb-1">{feat.title}</h3>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {errorMsg && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-4 bg-[#B8212E]/10 border border-[#B8212E]/20 text-[#B8212E] font-bold rounded-2xl text-sm text-center">
            ⚠️ {errorMsg} Check connection configurations.
          </div>
        </div>
      )}

      {/* ── LATEST ARMED FORCES MOCK TESTS SECTION ────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-gray-200 gap-4">
          <div>
            <span className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-[#B8212E] mb-2">
              <Flame className="w-4 h-4 fill-current text-[#B8212E]" /> Practice &amp; Succeed
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Featured Preliminary Quizzes
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm font-medium mt-1">
              Curated initial intelligence &amp; academic practice tests for Pak Army, Navy &amp; PAF candidates.
            </p>
          </div>
          <Link 
            href="/prep/armed-forces" 
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-[#0A192F] hover:text-[#B8212E] px-5 py-3 rounded-xl bg-white border-2 border-gray-300 shadow-sm hover:shadow transition-all uppercase tracking-wider shrink-0"
          >
            Explore All Forces Tests <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {quizzes.length === 0 ? (
          <div className="py-16 bg-white border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-gray-400 text-sm font-semibold">
            <BookOpen className="w-12 h-12 text-gray-300 mb-2" />
            No forces mock tests published yet. Check back shortly!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {quizzes.map(quiz => {
              const { displayTitle, badge, colorClass } = formatQuizDisplay(quiz.title, quiz.category);
              return (
                <div 
                  key={quiz.id} 
                  className="bg-white border border-gray-200/90 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-[#B8212E]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
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
                      {quiz.description || 'Attempt this timed mock examination to evaluate your speed, accuracy, and concepts for preliminary selection.'}
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
      </section>

      {/* ── ISSB SPECIAL FEATURE SHOWCASE (High-Impact Banner) ───────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-white text-[#0A192F] p-8 sm:p-14 border-2 border-gray-200 shadow-xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-50/60 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="space-y-4 text-center lg:text-left max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-xs font-black uppercase tracking-widest shadow-2xs">
                🎖️ Complete ISSB Selection Suite
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#0A192F] tracking-tight leading-tight">
                Recommended by Assessor Specialists!
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
                Our newly integrated ISSB Hub combines general testing intelligence, <span className="text-[#B8212E] font-bold">FREE WAT &amp; GTO study libraries</span>, and personal 1-on-1 coaching slots to guarantee your success.
              </p>

              <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-2">
                <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-gray-800 text-xs font-extrabold border border-slate-200">🧠 Psychological WAT &amp; TAT</span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-gray-800 text-xs font-extrabold border border-slate-200">🏃‍♂️ Outdoor GTO Tasks</span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-gray-800 text-xs font-extrabold border border-slate-200">🎙️ Deputy President Interview</span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto">
              <Link
                href="/issb"
                className="px-8 py-4 bg-[#0A192F] hover:bg-[#B8212E] text-white font-black rounded-2xl shadow-lg transition-all text-center uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                🚀 Explore ISSB 3-Tab Hub
              </Link>
              <a
                href="https://wa.me/923116826552?text=Hello%20Sir,%20I%20want%20information%20about%20ISSB%20Preparation%20&%20Coaching%20Batches."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#25D366] hover:bg-[#1faf53] text-white font-black rounded-2xl shadow-lg transition-all text-center uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" /> Chat for Coaching Slot
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE ARMED FORCES ELIGIBILITY & AGE CHECKER ───────────── */}
      <EligibilityCalculator />

      {/* ── FREQUENTLY ASKED QUESTIONS ACCORDION ─────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FaqSection />
      </section>

      {/* ── COMMUNITY JOIN CTA BANNER ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[11px] uppercase font-black tracking-widest text-emerald-200">Official WhatsApp Community</span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Stay Connected With Daily Past Papers &amp; Alerts!
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm font-medium leading-relaxed">
              Don&apos;t miss any job openings, ISSB test schedules, or free PDF test notes. Join our verified student &amp; candidate group today!
            </p>
          </div>
          <a
            href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-2xl bg-white text-emerald-900 hover:bg-emerald-50 font-black text-xs sm:text-sm uppercase tracking-wider shadow-2xl transition-transform hover:scale-105 shrink-0 flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5 text-emerald-600 fill-current" /> Join Group Now
          </a>
        </div>
      </section>

    </div>
  )
}
