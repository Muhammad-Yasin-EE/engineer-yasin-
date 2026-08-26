import Link from 'next/link'
import Image from 'next/image'
import { createPublicClient } from '@/lib/supabase/public'
import { ForcesCalculators, SelectionCentersSection, FaqSection } from '@/components/ForcesCalculators'
import LiveTrustTicker from '@/components/LiveTrustTicker'
import InteractiveDailyMcq from '@/components/InteractiveDailyMcq'
import TestimonialsSection from '@/components/TestimonialsSection'
import { 
  Shield, Award, BookOpen, Sparkles, ArrowRight, CheckCircle2, 
  Users, Clock, Zap, MessageCircle, Flame, Star, Compass, 
  GraduationCap, FileText, ChevronRight, Lock, MapPin, Brain, Calendar, Layers
} from 'lucide-react'

export const revalidate = 3600

export default async function Home() {
  const supabase = createPublicClient()

  // Fetch count of verified mock quizzes
  let quizCount = 120
  try {
    const { count } = await supabase.from('quizzes').select('*', { count: 'exact', head: true })
    if (count) quizCount = count
  } catch (e) {
    console.warn('Quiz count query fallback:', e)
  }

  // ── 5 Core Service Branch Emblems ──────────────────────────────────────────
  const serviceBranches = [
    {
      title: 'Join Pak Army',
      desc: 'PMA Long Course, TCC, LCC, AFNS & Soldiers',
      iconUrl: '/images/pak_army_emblem.jpg',
      badge: 'Commissioned Officer',
      href: '/prep/army',
      color: 'border-emerald-600/60 shadow-emerald-500/10 hover:border-emerald-600',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      title: 'Join Pak Navy',
      desc: 'PN Cadet, SSC, Marines & Sailor Entry',
      iconUrl: '/images/pak_navy_emblem.jpg',
      badge: 'Permanent Commission',
      href: '/prep/navy',
      color: 'border-indigo-600/60 shadow-indigo-500/10 hover:border-indigo-600',
      badgeColor: 'bg-indigo-100 text-indigo-800'
    },
    {
      title: 'Join Pak Air Force',
      desc: 'GD Pilot, CAE Aeronautical, Air Defence & Airmen',
      iconUrl: '/images/pak_paf_emblem.jpg',
      badge: 'Flight Cadet',
      href: '/prep/paf',
      color: 'border-sky-600/60 shadow-sky-500/10 hover:border-sky-600',
      badgeColor: 'bg-sky-100 text-sky-800'
    },
    {
      title: 'ISSB Complete Hub',
      desc: 'Psychologist Tests, GTO Tasks & DP Interviews',
      iconUrl: '/images/issb-header.jpg',
      badge: 'Board Preparation',
      href: '/issb',
      color: 'border-amber-600/60 shadow-amber-500/10 hover:border-amber-600',
      badgeColor: 'bg-amber-100 text-amber-900'
    },
    {
      title: 'Cadet Colleges',
      desc: '8th / 11th Class Entry Tests & Scholarships',
      iconUrl: '/images/scholarship-portal-international.jpg',
      badge: 'Admissions 2026',
      href: '/scholarships',
      color: 'border-rose-600/60 shadow-rose-500/10 hover:border-rose-600',
      badgeColor: 'bg-rose-100 text-rose-800'
    }
  ]

  // ── 6 Essential Knowledge Vault Cards ──────────────────────────────────────
  const knowledgeVault = [
    {
      title: 'Forces Ranks in Pak Army',
      desc: 'Complete hierarchy from Second Lieutenant up to Field Marshal with insignias & pay scales.',
      icon: '/images/pak_army_emblem.jpg',
      href: '/ranks/pak-army',
      badge: 'Army Hierarchy'
    },
    {
      title: 'Forces Ranks in Pak Navy',
      desc: 'Naval officers hierarchy from Midshipman to Admiral of the Fleet with rank shoulder marks.',
      icon: '/images/pak_navy_emblem.jpg',
      href: '/ranks/pak-navy',
      badge: 'Navy Hierarchy'
    },
    {
      title: 'Forces Ranks in Pak PAF',
      desc: 'Air Force ranks from Officer Cadet to Air Chief Marshal with official uniform insignia.',
      icon: '/images/pak_paf_emblem.jpg',
      href: '/ranks/pak-paf',
      badge: 'PAF Hierarchy'
    },
    {
      title: 'Online Mock Quizzes',
      desc: 'Official 84 Verbal & 50 Academic timed tests with instant result certificates.',
      icon: '/images/pak_army_emblem.jpg',
      href: '/prep',
      badge: 'Official Simulation'
    },
    {
      title: 'Selection Centers Directory',
      desc: 'Complete contact directory and reporting addresses for AS&RC, I&SC and SRC centers.',
      icon: '/images/pak_paf_emblem.jpg',
      href: '#centers-directory',
      badge: '36 Centers Listed'
    },
    {
      title: 'Free Solved E-Books',
      desc: 'High-yield intelligence books, solved past papers, and physics cheat sheets in PDF.',
      icon: '/images/pak_navy_emblem.jpg',
      href: '/ebooks',
      badge: 'Downloadable PDF'
    }
  ]

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 bg-slate-50 text-slate-900 font-sans">
      
      {/* ── TOP URGENT ANNOUNCEMENT TICKER BANNER ────────────────────────────── */}
      <div className="bg-[#B8212E] text-white py-2.5 px-4 text-center font-extrabold text-xs sm:text-sm tracking-wide shadow-md flex items-center justify-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-amber-300 animate-ping shrink-0" />
        <span className="truncate">
          🚨 <strong>ADMISSIONS OPEN :</strong> JOIN US FOR ARMED FORCES & CADET COLLEGES TEST PREPARATION 2026
        </span>
        <Link 
          href="/prep" 
          className="hidden md:inline-flex items-center gap-1 bg-white text-[#B8212E] px-3 py-0.5 rounded-full text-xs font-black uppercase hover:bg-amber-300 transition-colors ml-2"
        >
          Attempt Tests →
        </Link>
      </div>

      {/* ── HERO SECTION ──────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 min-h-[460px] sm:min-h-[520px] flex items-center">
          <Image 
            src="/images/hero-armed-forces.jpg" 
            alt="Pakistan Armed Forces Cadets" 
            fill 
            priority 
            className="object-cover object-top opacity-55" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10" />

          <div className="relative z-20 max-w-3xl p-6 sm:p-12 lg:p-16 space-y-6 text-white">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#D4AF37] text-xs font-black uppercase tracking-widest">
              <Shield className="w-4 h-4" /> Salute to Pakistan Armed Forces
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] uppercase">
              Join Pakistan Armed Forces & Pass Initial Tests
            </h1>

            <p className="text-sm sm:text-base text-slate-200 max-w-xl leading-relaxed font-medium">
              Prepare with authentic <strong className="text-[#D4AF37]">84 Verbal (30m)</strong> & <strong className="text-[#D4AF37]">50 Academic (25m)</strong> computerized screening exams, AI-driven ISSB evaluations, and solved preparation notes.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/prep"
                className="px-8 py-4 rounded-2xl bg-[#B8212E] hover:bg-[#961A25] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-rose-900/40 hover:-translate-y-0.5 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <Flame className="w-4 h-4 text-amber-300 fill-current" />
                Start Free Mock Quizzes <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/issb"
                className="px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center gap-2 hover:-translate-y-0.5 cursor-pointer"
              >
                <Award className="w-4 h-4 text-amber-300" /> Enter ISSB Hub
              </Link>
            </div>

            {/* 4 Direct Access Hub Pills */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-2xl">
              <Link href="/prep/army" className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-center hover:bg-white/20 transition-all">
                <p className="text-xs font-black uppercase text-emerald-300">Pakistan Army</p>
                <p className="text-[10px] text-slate-300">PMA & TCC Tests</p>
              </Link>
              <Link href="/prep/navy" className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-center hover:bg-white/20 transition-all">
                <p className="text-xs font-black uppercase text-indigo-300">Pakistan Navy</p>
                <p className="text-[10px] text-slate-300">PN Cadet & SSC</p>
              </Link>
              <Link href="/prep/paf" className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-center hover:bg-white/20 transition-all">
                <p className="text-xs font-black uppercase text-sky-300">Pak Air Force</p>
                <p className="text-[10px] text-slate-300">GD Pilot & Aero</p>
              </Link>
              <Link href="/issb" className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-center hover:bg-white/20 transition-all">
                <p className="text-xs font-black uppercase text-amber-300">ISSB Hub</p>
                <p className="text-[10px] text-slate-300">Psych, GTO & DP</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── KILLER AI FEATURES & INTERACTIVE TOOLS ───────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] uppercase font-black text-[#B8212E] tracking-widest bg-rose-50 px-2.5 py-1 rounded-full">
                🚀 AI-Powered Preparation
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1 uppercase">
                Featured Academy Tools & Simulators
              </h2>
            </div>
            <p className="text-xs text-slate-500 font-medium">Practice with next-generation testing simulators</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            <Link href="/issb/ai-interview" className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-purple-400 hover:shadow-md transition-all group flex flex-col justify-between">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black mb-3">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 group-hover:text-purple-700 transition-colors">AI Psychologist</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">WAT, TAT, SCT evaluation</p>
              </div>
            </Link>

            <Link href="/issb/tat" className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-rose-400 hover:shadow-md transition-all group flex flex-col justify-between">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#B8212E] flex items-center justify-center font-black mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 group-hover:text-[#B8212E] transition-colors">TAT Story Evaluator</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Picture story feedback</p>
              </div>
            </Link>

            <Link href="/study-planner" className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-400 hover:shadow-md transition-all group flex flex-col justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black mb-3">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 group-hover:text-blue-700 transition-colors">Study Planner</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Daily exam schedule</p>
              </div>
            </Link>

            <Link href="/flashcards" className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-400 hover:shadow-md transition-all group flex flex-col justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 group-hover:text-amber-700 transition-colors">Smart Flashcards</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Rapid swipe revision</p>
              </div>
            </Link>

            <Link href="/gto-tasks" className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-400 hover:shadow-md transition-all group flex flex-col justify-between col-span-2 sm:col-span-1">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black mb-3">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">GTO Simulator</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Obstacles & GPE logic</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── LIVE CANDIDATE ACTIVITY TICKER ───────────────────────────────────── */}
      <LiveTrustTicker />

      {/* ── CHOOSE YOUR SERVICE BRANCH (CIRCULAR EMBLEMS HUB) ───────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <span className="text-[10px] uppercase font-black text-[#B8212E] tracking-widest bg-rose-50 px-3 py-1 rounded-full">
            Official Commission Categories
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase text-slate-900 tracking-tight">
            Choose Your Service Branch
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Explore authentic preliminary test papers, eligibility guides, and training schedules.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {serviceBranches.map((branch) => (
            <Link
              key={branch.title}
              href={branch.href}
              className={`bg-white rounded-3xl p-5 border-2 ${branch.color} shadow-lg transition-all duration-300 flex flex-col items-center text-center justify-between group hover:-translate-y-1.5 cursor-pointer`}
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-slate-100 shadow-md group-hover:scale-105 transition-transform bg-white relative">
                  <Image 
                    src={branch.iconUrl} 
                    alt={branch.title} 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider ${branch.badgeColor}`}>
                  {branch.badge}
                </span>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-[#B8212E] transition-colors leading-tight">
                  {branch.title}
                </h3>
                <p className="text-[11px] text-slate-500 leading-snug font-medium line-clamp-2">
                  {branch.desc}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 w-full flex items-center justify-center gap-1 text-[11px] font-black text-[#B8212E] uppercase tracking-wider">
                <span>Start Prep</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── INTERACTIVE DAILY MCQ CHALLENGE WIDGET ──────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InteractiveDailyMcq />
      </section>

      {/* ── INTERACTIVE FORCES ELIGIBILITY & BMI CALCULATOR ──────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ForcesCalculators />
      </section>

      {/* ── ESSENTIAL ARMED FORCES KNOWLEDGE VAULT & RANKS ──────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <span className="text-[10px] uppercase font-black text-indigo-700 tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
            Essential Military Knowledge
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase text-slate-900 tracking-tight">
            Armed Forces Ranks, Tests & Directories
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Learn official officer hierarchies, selection center addresses, and past solved papers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {knowledgeVault.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#B8212E]/40 transition-all duration-300 flex items-start gap-4 group hover:-translate-y-1 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-sm shrink-0 bg-white relative">
                <Image src={item.icon} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="flex-1 space-y-1">
                <span className="text-[9px] uppercase font-black text-[#B8212E] bg-rose-50 px-2 py-0.5 rounded tracking-wider">
                  {item.badge}
                </span>
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-[#B8212E] transition-colors leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── OUR MISSION & ACADEMY EXECUTIVE STATEMENT ───────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[10px] uppercase font-black text-emerald-700 tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
              Academy Mission
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase mt-2">
              Empowering Future Officers of Pakistan
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            <p>
              <strong>Engineer Yasin Forces Academy</strong> is Pakistan's dedicated online preparation platform built to provide equal opportunity and high-quality preparation materials to candidates across Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan, Azad Kashmir, and Gilgit-Baltistan.
            </p>
            <p>
              Our testing engine replicates the computerized examination system of Army Selection and Recruitment Centers (AS&RC), PAF Information & Selection Centers (I&SC), and Pakistan Navy Recruitment Centers (SRC) with strict <strong>84 Verbal (30m)</strong> and <strong>50 Academic (25m)</strong> countdowns.
            </p>
          </div>
        </div>
      </section>

      {/* ── OFFICIAL SELECTION CENTERS DIRECTORY ─────────────────────────────── */}
      <div id="centers-directory">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SelectionCentersSection />
        </section>
      </div>

      {/* ── CANDIDATE TESTIMONIALS & SUCCESS STORIES ─────────────────────────── */}
      <TestimonialsSection />

      {/* ── FAQS ─────────────────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FaqSection />
      </section>

      {/* ── FREE WHATSAPP CHANNEL & COMMUNITY INVITATION BANNER ─────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <MessageCircle className="w-3.5 h-3.5" /> Official Aspirants Network
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Join 15,000+ Candidates in Our Free WhatsApp Group
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-medium">
              Receive daily intelligence test batteries, solved past papers, official recruitment circulars, and merit list announcements directly on your phone.
            </p>
          </div>

          <a
            href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white hover:bg-emerald-50 text-emerald-900 font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl shadow-xl hover:scale-105 transition-all shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 text-emerald-600 fill-current" />
            Join WhatsApp Group Free →
          </a>
        </div>
      </section>

    </div>
  )
}
