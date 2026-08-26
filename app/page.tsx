import Link from 'next/link'
import Image from 'next/image'
import { createPublicClient } from '@/lib/supabase/public'
import AuthGateButton from '@/components/AuthGateButton'
import LiveTrustTicker from '@/components/LiveTrustTicker'
import InteractiveDailyMcq from '@/components/InteractiveDailyMcq'
import { ForcesCalculators, SelectionCentersSection, FaqSection } from '@/components/ForcesCalculators'
import { 
  GraduationCap, Download, BookOpen, 
  Sparkles, ArrowRight, ShieldCheck, FileText,
  Award, Users, Compass, MapPin, Star, Zap, MessageCircle, Flame, Shield
} from 'lucide-react'

export const revalidate = 3600

export default async function Home() {
  const supabase = createPublicClient()

  // ── 5 Core Service Branch Emblems (Row 1) ──────────────────────────────────
  const serviceBranches = [
    {
      title: 'Join Pak Army',
      img: '/images/army-circle-logo.jpg',
      href: '/prep/army',
      ring: 'border-emerald-600/60'
    },
    {
      title: 'Join Pak Navy',
      img: '/images/navy-logo.jpg',
      href: '/prep/navy',
      ring: 'border-indigo-600/60'
    },
    {
      title: 'Join Pak Air Force',
      img: '/images/paf-logo.jpg',
      href: '/prep/paf',
      ring: 'border-sky-500/60'
    },
    {
      title: 'ISSB Tests',
      img: '/images/issb-header.jpg',
      href: '/issb',
      ring: 'border-rose-600/60'
    },
    {
      title: 'Scholarships',
      img: '/images/cadet-colleges-logo.jpg',
      href: '/scholarships',
      ring: 'border-amber-500/60'
    }
  ]

  // ── Row 2: Ranks & Quizzes ──────────────────────────────────────────────────
  const ranksAndQuizzes = [
    {
      title: 'Ranks In Pak Army',
      desc: 'Lieutenant to General',
      href: '/ranks/pak-army',
      img: '/images/army-rank.jpg',
      ring: 'border-emerald-600/60'
    },
    {
      title: 'Ranks In Pak Navy',
      desc: 'Sub Lieut to Admiral',
      href: '/ranks/pak-navy',
      img: '/images/navy-rank.jpg',
      ring: 'border-indigo-600/60'
    },
    {
      title: 'Ranks In PAF',
      desc: 'Pilot Officer to Air Chief',
      href: '/ranks/pak-paf',
      img: '/images/paf-rank.jpg',
      ring: 'border-sky-500/60'
    },
    {
      title: 'Online Quizzes',
      desc: 'Timed Intelligence Mocks',
      href: '/prep',
      img: '/images/online-quiz.jpg',
      ring: 'border-rose-600/60'
    }
  ]

  // ── Row 3: Selection Centers & Free E-Books ─────────────────────────────────
  const centersAndEbooks = [
    {
      title: 'Army Selection Centers',
      desc: 'AS&RC Regional Addresses',
      href: '#centers-directory',
      img: '/images/army-circle-logo.jpg',
      ring: 'border-emerald-600/60'
    },
    {
      title: 'Navy Selection Centers',
      desc: 'PNSC Recruitment Hubs',
      href: '#centers-directory',
      img: '/images/navy-logo.jpg',
      ring: 'border-indigo-600/60'
    },
    {
      title: 'PAF Selection Centers',
      desc: 'PAF Information Centers',
      href: '#centers-directory',
      img: '/images/paf-logo.jpg',
      ring: 'border-sky-500/60'
    },
    {
      title: 'Free E-Books & Notes',
      desc: 'Verified PDF Downloads',
      href: '/ebooks',
      img: '/images/download-pdf.jpg',
      ring: 'border-purple-600/60'
    }
  ]

  return (
    <div className="space-y-16 pb-24 bg-slate-50 text-gray-800 font-sans selection:bg-[#B8212E] selection:text-white">
      
      {/* ── HERO SECTION ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white pt-3 pb-12 sm:pt-5 sm:pb-16 text-[#0A192F] border-b border-gray-200 shadow-sm">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-rose-50 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] bg-amber-50 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-14">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left space-y-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[#0A192F] text-[11px] uppercase tracking-widest font-extrabold shadow-xs">
                <Sparkles className="w-4 h-4 text-[#B8212E]" />
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
                  href="/prep"
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
                    { title: "Armed Forces", icon: ShieldCheck, href: "/prep", color: "text-emerald-700" },
                    { title: "ISSB Portal", icon: Award, href: "/issb", color: "text-amber-700" },
                    { title: "Scholarships", icon: GraduationCap, href: "/scholarships", color: "text-blue-700" },
                    { title: "E-Books Library", icon: Download, href: "/ebooks", color: "text-rose-700" },
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
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-sky-100 rounded-3xl blur-2xl opacity-70" />
                
                <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden border-2 border-gray-200 shadow-xl bg-white group">
                  <Image 
                    src="/images/hero-armed-forces.jpg" 
                    alt="Salute to the Armed Forces of Pakistan" 
                    fill 
                    priority
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-90" />

                  <div className="absolute top-6 right-6 bg-white/95 border border-gray-200 p-3.5 rounded-2xl shadow-lg backdrop-blur-md flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 font-extrabold text-xs">
                      ✓
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

      {/* ── ADMISSIONS OPEN & KILLER AI FEATURES CARD ───────────────────────── */}
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

          {/* Center Content: Premium AI Features Grid */}
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
                { title: "GTO Evaluator", icon: "🎯", href: "/gto-tasks", bg: "hover:bg-indigo-50 hover:border-indigo-500 text-indigo-900" }
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

      {/* ── ROUND EMBLEM CIRCLE HUBS (Row 1: 5 Service Branches) ────────────── */}
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
          {serviceBranches.map((hub) => (
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

      {/* ── INTERACTIVE DAILY MCQ CHALLENGE WIDGET ──────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InteractiveDailyMcq />
      </section>

      {/* ── INTERACTIVE FORCES CALCULATORS (Age & Weight) ───────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ForcesCalculators />
      </section>

      {/* ── FORCES RANKS, SALARY, SELECTION CENTERS & RESOURCES (Rows 2 & 3) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-black text-[#B8212E] uppercase tracking-widest">
            📖 Essential Knowledge Vault
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
          {ranksAndQuizzes.map((item) => (
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
          {centersAndEbooks.map((item) => (
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

      {/* ── OUR MISSION EXECUTIVE BOX ───────────────────────────────────────── */}
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

      {/* ── EXPLORE OUR TOP STUDY RESOURCES PILL GRID ───────────────────────── */}
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
              { label: "Online Quizzes", href: "/prep", bg: "bg-[#0A192F] hover:bg-[#B8212E]" },
              { label: "ISSB Preparation", href: "/issb", bg: "bg-emerald-800 hover:bg-[#B8212E]" },
              { label: "Personality Tests", href: "/issb/wat", bg: "bg-[#0A192F] hover:bg-[#B8212E]" },
              { label: "PMA Long Course", href: "/prep/army", bg: "bg-indigo-900 hover:bg-[#B8212E]" },
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
      <div id="centers-directory">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SelectionCentersSection />
        </section>
      </div>

      {/* ── FAQS ─────────────────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FaqSection />
      </section>

    </div>
  )
}
