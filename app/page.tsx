import Link from 'next/link'
import Image from 'next/image'
import { createPublicClient } from '@/lib/supabase/public'
import InteractiveDailyMcq from '@/components/InteractiveDailyMcq'
import TestimonialsSection from '@/components/TestimonialsSection'
import { ForcesCalculators, SelectionCentersSection, FaqSection } from '@/components/ForcesCalculators'
import { 
  Shield, Award, BookOpen, Sparkles, ArrowRight, CheckCircle2, 
  Users, Clock, Zap, MessageCircle, Flame, Star, Compass, GraduationCap, FileText, ChevronRight
} from 'lucide-react'

export const revalidate = 3600

export default async function Home() {
  const supabase = createPublicClient()

  // Fetch verified quizzes count or fallback
  let quizCount = 120
  try {
    const { count } = await supabase.from('quizzes').select('*', { count: 'exact', head: true })
    if (count) quizCount = count
  } catch (e) {
    console.warn('Quiz count query fallback:', e)
  }

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-slate-50 text-slate-900 font-sans">
      
      {/* ── SECTION 1: HERO (Modern EdTech Standard) ───────────────────────── */}
      <section className="relative overflow-hidden bg-white pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-slate-200/80 shadow-xs">
        {/* Soft Ambient Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[48rem] h-96 bg-gradient-to-tr from-rose-50 via-slate-50 to-amber-50 rounded-full blur-3xl opacity-70 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-extrabold uppercase tracking-wider shadow-xs">
                <Sparkles className="w-4 h-4 text-[#B8212E]" />
                Pakistan's #1 Forces & ISSB Prep Platform
              </div>
          
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12] uppercase">
                Master Your Selection in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B8212E] via-[#0A192F] to-[#B8212E]">
                  Pak Army, PAF & Navy
                </span>
              </h1>
              
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Ace your preliminary computer tests with official <strong className="text-slate-900">84 Verbal (30m)</strong> and <strong className="text-slate-900">50 Academic (25m)</strong> timed mock batteries, AI-powered ISSB psychological evaluations, and authentic past solved papers.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/prep"
                  className="px-8 py-4 rounded-2xl bg-[#B8212E] hover:bg-[#961A25] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-rose-900/20 hover:-translate-y-0.5 transition-all flex items-center gap-2 group"
                >
                  <Flame className="w-4 h-4 text-amber-300 fill-current" />
                  Start Free Mock Test <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/issb"
                  className="px-7 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-[#0A192F] font-black text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center gap-2 hover:-translate-y-0.5"
                >
                  <Shield className="w-4 h-4 text-[#B8212E]" /> Explore ISSB Suite
                </Link>
              </div>

              {/* Verified Trust Stats Bar */}
              <div className="pt-6 border-t border-slate-100 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
                <div>
                  <p className="text-xl sm:text-2xl font-black text-slate-900">50,000+</p>
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Tests Taken</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-[#B8212E]">84 / 50</p>
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Official Pattern</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-emerald-600">94%</p>
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Pass Rate</p>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Showcase */}
            <div className="flex-1 w-full max-w-md lg:max-w-none relative">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-3xl overflow-hidden border-2 border-slate-200 shadow-2xl bg-slate-900 group">
                <Image 
                  src="/images/hero-armed-forces.jpg" 
                  alt="Pakistan Armed Forces Cadets in Uniform" 
                  fill 
                  priority 
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                {/* Floating Live Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md border border-slate-200 px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <div>
                    <p className="text-[10px] uppercase font-black text-slate-400">Live Status</p>
                    <p className="text-xs font-black text-slate-900">100% Free Online Tests</p>
                  </div>
                </div>

                {/* Bottom Floating Feature Pill */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-4 rounded-2xl flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#B8212E] flex items-center justify-center font-black">
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs sm:text-sm">ISSB Master Coaching 2026</h4>
                      <p className="text-[11px] text-slate-300">Psychological, GTO & DP Interview Prep</p>
                    </div>
                  </div>
                  <Link href="/issb" className="px-3 py-1.5 bg-white text-slate-900 rounded-xl text-xs font-black uppercase hover:bg-amber-300 transition-colors shrink-0">
                    Join →
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 2: INTERACTIVE MCQ OF THE DAY WIDGET ───────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InteractiveDailyMcq />
      </section>

      {/* ── SECTION 3: BENTO GRID COURSE EXPLORER ───────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#B8212E] text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" /> Target Your Career
          </div>
          <h2 className="text-2xl sm:text-4xl font-black uppercase text-slate-900 tracking-tight">
            Official Commission Courses & Tests
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Select your targeted branch below to access authentic selection tests, physical standards, and syllabus guides.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Pak Army */}
          <Link
            href="/prep/army"
            className="group bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-500/60 transition-all duration-300 flex flex-col justify-between relative overflow-hidden hover:-translate-y-1"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-xl border border-emerald-200">
                  <Shield className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black text-emerald-700 bg-emerald-100/60 px-3 py-1 rounded-full uppercase tracking-wider">
                  Pak Army
                </span>
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors uppercase">
                  Pakistan Army
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium">
                  PMA Long Course, Technical Cadet Course (TCC), Lady Cadet Course (LCC), AFNS Nursing & DSSC.
                </p>
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-black text-emerald-700 uppercase tracking-wider">
              <span>Explore Army Tests</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Pak Air Force */}
          <Link
            href="/prep/paf"
            className="group bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-sky-500/60 transition-all duration-300 flex flex-col justify-between relative overflow-hidden hover:-translate-y-1"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center font-black text-xl border border-sky-200">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black text-sky-700 bg-sky-100/60 px-3 py-1 rounded-full uppercase tracking-wider">
                  Pak Air Force
                </span>
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 group-hover:text-sky-700 transition-colors uppercase">
                  Pakistan Air Force
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium">
                  General Duty Pilot (GD Pilot), Aeronautical Engineering (CAE), Air Defence, Admin & Airmen.
                </p>
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-black text-sky-700 uppercase tracking-wider">
              <span>Explore PAF Tests</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Pak Navy */}
          <Link
            href="/prep/navy"
            className="group bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-indigo-500/60 transition-all duration-300 flex flex-col justify-between relative overflow-hidden hover:-translate-y-1"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-black text-xl border border-indigo-200">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black text-indigo-700 bg-indigo-100/60 px-3 py-1 rounded-full uppercase tracking-wider">
                  Pak Navy
                </span>
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-700 transition-colors uppercase">
                  Pakistan Navy
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium">
                  PN Cadet Permanent Commission, Short Service Commission (SSC), Pak Marines & Sailors.
                </p>
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-black text-indigo-700 uppercase tracking-wider">
              <span>Explore Navy Tests</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </Link>

          {/* Card 4: ISSB Master Suite */}
          <Link
            href="/issb"
            className="group bg-gradient-to-br from-slate-900 to-[#0A192F] text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden hover:-translate-y-1 md:col-span-2"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-black text-xl border border-amber-400/30">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black text-amber-300 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full uppercase tracking-wider">
                  ISSB 4-Day Board Exam
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-white group-hover:text-amber-300 transition-colors uppercase">
                  Complete ISSB Preparation Suite
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl leading-relaxed font-medium">
                  Master the 3 assessment dimensions: Psychologist Tests (WAT, TAT, SCT), Group Testing Officer (GTO) indoor/outdoor obstacle tasks, and Deputy President Personal Interview.
                </p>
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between text-xs font-black text-amber-300 uppercase tracking-wider">
              <span>Enter ISSB Hub</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </Link>

          {/* Card 5: Cadet Colleges & Scholarships */}
          <Link
            href="/scholarships"
            className="group bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-amber-500/60 transition-all duration-300 flex flex-col justify-between relative overflow-hidden hover:-translate-y-1"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-black text-xl border border-amber-200">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black text-amber-700 bg-amber-100/60 px-3 py-1 rounded-full uppercase tracking-wider">
                  Admissions
                </span>
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 group-hover:text-amber-700 transition-colors uppercase">
                  Cadet Colleges & Scholarships
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium">
                  Hasanabdal, Kohat, Petaro 8th/11th class entrance test mock papers and HEC international scholarships.
                </p>
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-black text-amber-700 uppercase tracking-wider">
              <span>Explore Scholarships</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </Link>

        </div>
      </section>

      {/* ── SECTION 4: EDTECH VALUE PILLARS (Why Choose Us) ────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-slate-900 tracking-tight">
              Why Prepare with Engineer Yasin Academy?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              We bring official Selection Center standards directly to your mobile and laptop screens.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#B8212E] flex items-center justify-center font-black">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">Exact Timed Simulation</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Strict 84 MCQs in 30 minutes for Verbal and 50 MCQs in 25 minutes matching AS&RC standards.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">Anti-Cheat Engine</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Real-time tab-blur detection with a 2-strike warning protocol simulating real examination pressure.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">Verified Result Certificates</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Instant percentage score breakdown and downloadable passing certificates for high scorers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">AI Interview Coaching</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Practice Deputy President interviews and psychological story writing with intelligent feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: INTERACTIVE FORCES ELIGIBILITY CALCULATORS ──────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ForcesCalculators />
      </section>

      {/* ── SECTION 6: OFFICIAL SELECTION CENTERS DIRECTORY ────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SelectionCentersSection />
      </section>

      {/* ── SECTION 7: TESTIMONIALS & REVIEWS ───────────────────────────────── */}
      <TestimonialsSection />

      {/* ── SECTION 8: FAQS ─────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FaqSection />
      </section>

      {/* ── SECTION 9: WHATSAPP COMMUNITY CTA BANNER ───────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <MessageCircle className="w-3.5 h-3.5" /> Official Aspirants Network
            </div>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight">
              Join 15,000+ Aspirants in Our Free WhatsApp Group
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-medium">
              Receive daily intelligence test batteries, solved past papers, official recruitment circulars, and merit list announcements directly on your phone.
            </p>
          </div>

          <a
            href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white hover:bg-emerald-50 text-emerald-900 font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl shadow-xl hover:scale-105 transition-all shrink-0 flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5 text-emerald-600 fill-current" />
            Join WhatsApp Group Free →
          </a>
        </div>
      </section>

    </div>
  )
}
