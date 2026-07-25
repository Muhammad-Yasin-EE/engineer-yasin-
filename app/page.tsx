import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import BookCard from '@/components/BookCard'
import CategoryCard from '@/components/CategoryCard'
import { 
  GraduationCap, Briefcase, Download, Hammer, BookOpen, 
  Sparkles, Layers, ArrowRight, ShieldCheck, FileText,
  CheckCircle2, Award, Users, Cpu, Laptop, ChevronRight,
  Star, Zap, MessageCircle, Flame, Shield, Compass, Code, Box
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  let quizzes: any[] = []
  let software: any[] = []
  let errorMsg = null

  try {
    const supabase = await createClient()

    const [
      quizRes,
      softRes
    ] = await Promise.all([
      supabase.from('quizzes').select('*').order('created_at', { ascending: false }).limit(6),
      supabase.from('items').select('*').eq('resource_type', 'software').order('created_at', { ascending: false }).limit(3)
    ])

    quizzes = quizRes.data || []
    software = softRes.data || []

  } catch (err: any) {
    console.error('Home Page Data Fetching Error:', err)
    errorMsg = 'Could not load portal directories.'
  }

  return (
    <div className="space-y-20 pb-24 bg-slate-50 text-gray-800 font-sans selection:bg-[#B8212E] selection:text-white">
      
      {/* ── HERO SECTION (Ultra Premium Dark Suite) ───────────────────────── */}
      <section className="relative overflow-hidden bg-[#0A192F] py-20 sm:py-28 text-white border-b border-[#112240] shadow-2xl">
        {/* Background Ambient Glows */}
        <div className="absolute top-0 -left-40 w-96 h-96 bg-[#B8212E]/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-14">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left space-y-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#D4AF37] text-[11px] uppercase tracking-widest font-extrabold shadow-inner backdrop-blur-md">
                <Sparkles className="w-4 h-4 animate-spin-slow text-[#D4AF37]" />
                Pakistan&apos;s #1 Forces &amp; Tech Learning Portal
              </div>
          
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-2xl mx-auto lg:mx-0 leading-[1.12] drop-shadow-md">
                Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37]">Destiny</span> &amp; Career
              </h1>
              
              <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Premier online mock testing for Pak Army, Navy &amp; PAF. Empowering candidates with complete ISSB guidance, FREE verified software repository, and world-class engineering consulting.
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
                  className="px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border-2 border-[#D4AF37]/60 text-[#D4AF37] font-black text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all hover:scale-[1.02] backdrop-blur-md flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" /> Enter ISSB Hub
                </Link>
              </div>

              {/* Quick Navigation Hub Grid */}
              <div className="pt-6">
                <p className="text-[11px] uppercase tracking-widest text-gray-400 font-extrabold mb-3 text-center lg:text-left">
                  ⚡ Quick Direct access Hub
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto lg:mx-0">
                  {[
                    { title: "Armed Forces", icon: ShieldCheck, href: "/prep/armed-forces", color: "text-emerald-400" },
                    { title: "ISSB Portal", icon: Award, href: "/issb", color: "text-amber-400" },
                    { title: "Tech Software", icon: Download, href: "/software", color: "text-blue-400" },
                    { title: "Eng Services", icon: Hammer, href: "/services", color: "text-rose-400" },
                  ].map((tab) => {
                    const TIcon = tab.icon;
                    return (
                      <Link
                        key={tab.title}
                        href={tab.href}
                        className="p-3.5 bg-white/5 border border-white/10 hover:border-[#D4AF37]/80 hover:bg-white/10 rounded-2xl text-center flex flex-col items-center gap-2 group transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:-translate-y-0.5"
                      >
                        <div className="w-10 h-10 rounded-xl bg-black/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <TIcon className={`w-5 h-5 ${tab.color}`} />
                        </div>
                        <span className="text-xs font-black text-gray-200 tracking-wider uppercase">{tab.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Content - Interactive Hero Showcase */}
            <div className="flex-1 w-full max-w-md lg:max-w-none relative">
              <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full sm:w-4/5 lg:w-full mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/30 to-[#B8212E]/30 rounded-3xl blur-2xl opacity-70"></div>
                
                <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl bg-black/40 group">
                  <Image 
                    src="/images/real-forces-illustration.jpg" 
                    alt="Official Armed Forces and Engineering Excellence" 
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent opacity-90"></div>

                  {/* Floating Live Badge Overlay 1 */}
                  <div className="absolute top-6 right-6 bg-[#0A192F]/90 border border-white/20 p-3.5 rounded-2xl shadow-xl backdrop-blur-md flex items-center gap-3 animate-float">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-extrabold text-xs">
                      ✔
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 font-extrabold">Status</p>
                      <p className="text-xs font-black text-white">100% Free Online Quizzes</p>
                    </div>
                  </div>

                  {/* Floating Live Badge Overlay 2 */}
                  <div className="absolute bottom-6 left-6 right-6 bg-[#112240]/95 border border-white/20 p-4 rounded-2xl shadow-2xl backdrop-blur-md flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#B8212E] flex items-center justify-center text-white shrink-0 shadow-md">
                        <Star className="w-6 h-6 fill-current text-[#D4AF37]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-white">ISSB Complete Guidance</h4>
                        <p className="text-xs text-gray-300 font-medium">Psychology, GTO &amp; Interview Batches</p>
                      </div>
                    </div>
                    <Link href="/issb" className="px-3 py-1.5 rounded-xl bg-[#D4AF37] text-slate-950 text-xs font-black uppercase tracking-wider hover:bg-amber-400 transition-colors shrink-0">
                      Explore ➔
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US (Trust & Stats Banner) ─────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200/80 p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {[
            { title: "Unlimited Free Mocks", desc: "Instant result evaluations with explanation notes for PMA, PAF & Navy exams.", icon: Zap, bg: "bg-amber-50 text-amber-600 border-amber-200" },
            { title: "ISSB Specialists", desc: "Personal evaluations and mock interviews by retired military officers.", icon: Award, bg: "bg-rose-50 text-[#B8212E] border-rose-200" },
            { title: "2-Step Software Vault", desc: "Verified APKs & desktop software delivered straight to your WhatsApp securely.", icon: CheckCircle2, bg: "bg-emerald-50 text-emerald-600 border-emerald-200" },
            { title: "Engineering Agency", desc: "Professional MATLAB simulations, 3D mechanical designs & coding solutions.", icon: Cpu, bg: "bg-blue-50 text-blue-600 border-blue-200" }
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

      {/* ── LATEST MOCK TESTS SECTION ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-gray-200 gap-4">
          <div>
            <span className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-[#B8212E] mb-2">
              <Flame className="w-4 h-4 fill-current text-[#B8212E]" /> Practice &amp; Succeed
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Featured Preliminary Quizzes
            </h2>
          </div>
          <Link 
            href="/prep/armed-forces" 
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-[#0A192F] hover:text-[#B8212E] px-4 py-2.5 rounded-xl bg-white border border-gray-300 shadow-sm hover:shadow transition-all uppercase tracking-wider shrink-0"
          >
            Explore All Exam Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {quizzes.length === 0 ? (
          <div className="py-16 bg-white border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-gray-400 text-sm font-semibold">
            <BookOpen className="w-12 h-12 text-gray-300 mb-2" />
            No mock tests published yet. Check back shortly!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {quizzes.map(quiz => (
              <div 
                key={quiz.id} 
                className="bg-white border border-gray-200/90 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-[#B8212E]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#B8212E] flex items-center justify-center shrink-0 group-hover:bg-[#B8212E] group-hover:text-white transition-colors">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1 rounded-full">
                      {quiz.category || 'General Prep'}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-gray-900 text-lg sm:text-xl leading-snug group-hover:text-[#B8212E] transition-colors">
                    {quiz.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium line-clamp-2">
                    {quiz.description || 'Attempt this timed mock examination to test your knowledge and preparation levels.'}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-100 mt-4 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                    ⚡ Instant Result
                  </span>
                  <Link
                    href={`/prep/quiz/${quiz.id}`}
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#0A192F] hover:bg-[#B8212E] text-white font-black rounded-xl text-xs shadow-md transition-all uppercase tracking-wider"
                  >
                    Attempt Test <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── ISSB SPECIAL FEATURE SHOWCASE (High-Impact Banner) ───────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0A192F] via-[#112240] to-[#0A192F] text-white p-8 sm:p-14 border border-[#1d335a] shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="space-y-4 text-center lg:text-left max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-black uppercase tracking-widest">
                🎖️ Complete ISSB Selection Suite
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Recommended by Assessor Specialists!
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium">
                Our newly integrated ISSB Hub combines general testing intelligence, <span className="text-[#D4AF37] font-bold">FREE WAT &amp; GTO study libraries</span>, and personal 1-on-1 coaching slots to guarantee your success.
              </p>

              <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-2">
                <span className="px-3 py-1 rounded-lg bg-white/10 text-white text-xs font-extrabold border border-white/15">🧠 Psychological WAT &amp; TAT</span>
                <span className="px-3 py-1 rounded-lg bg-white/10 text-white text-xs font-extrabold border border-white/15">🏃‍♂️ Outdoor GTO Tasks</span>
                <span className="px-3 py-1 rounded-lg bg-white/10 text-white text-xs font-extrabold border border-white/15">🎙️ Deputy President Interview</span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto">
              <Link
                href="/issb"
                className="px-8 py-4 bg-[#D4AF37] hover:bg-amber-400 text-slate-950 font-black rounded-2xl shadow-xl transition-all text-center uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                🚀 Explore ISSB 3-Tab Hub
              </Link>
              <a
                href="https://wa.me/923116826552?text=Hello%20Sir,%20I%20want%20information%20about%20ISSB%20Preparation%20&%20Coaching%20Batches."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#25D366] hover:bg-[#1faf53] text-white font-black rounded-2xl shadow-xl transition-all text-center uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" /> Chat for Coaching Slot
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED APPS & SOFTWARE (Secure 2-Step Vault) ───────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-gray-200 gap-4">
          <div>
            <span className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-violet-600 mb-2">
              <Download className="w-4 h-4 text-violet-600" /> Secure Software Vault
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Featured Apps &amp; Tech Tools
            </h2>
          </div>
          <Link 
            href="/software" 
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-white bg-violet-600 hover:bg-violet-700 px-4 py-2.5 rounded-xl shadow-md transition-all uppercase tracking-wider shrink-0"
          >
            Browse Full Software Library <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {software.length === 0 ? (
          <div className="py-16 bg-white border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-gray-400 text-sm font-semibold">
            <Download className="w-12 h-12 text-gray-300 mb-2" />
            No software uploaded yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {software.map(item => (
              <BookCard key={item.id} {...item} />
            ))}
          </div>
        )}
      </section>

      {/* ── ENGINEERING & PROGRAMMING SERVICES ───────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0A192F] rounded-3xl p-8 sm:p-12 text-white border border-[#112240] shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-white/10 pb-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-black uppercase tracking-wider">
                <Hammer className="w-3.5 h-3.5" /> Expert Technical Consultancy
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Engineering &amp; Programming Services
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm font-medium">
                Need customized technical help? Hire Engineer Yasin &amp; team for your complex simulations and digital tasks.
              </p>
            </div>
            <Link
              href="/services"
              className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white text-xs font-black uppercase tracking-wider transition-all shrink-0 self-start md:self-auto flex items-center gap-1.5"
            >
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "MATLAB & Simulink", desc: "Control systems, signal processing & Simulink modeling.", icon: Cpu, badge: "Simulation" },
              { title: "3D CAD Modeling", desc: "SolidWorks, AutoCAD & mechanical component blueprints.", icon: Box, badge: "Drafting" },
              { title: "Custom Programming", desc: "Python, C++, Web automation & full-stack development.", icon: Code, badge: "Development" },
              { title: "Academic Tutoring", desc: "1-on-1 technical mentorship for engineering & university subjects.", icon: Users, badge: "Mentoring" }
            ].map((srv, idx) => {
              const SIcon = srv.icon;
              return (
                <div key={idx} className="bg-white/5 border border-white/10 hover:border-[#D4AF37]/60 p-6 rounded-2xl transition-all hover:bg-white/10 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] uppercase font-black text-[#D4AF37] bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
                        {srv.badge}
                      </span>
                      <SIcon className="w-6 h-6 text-gray-300 group-hover:text-[#D4AF37] transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-6 font-medium">
                      {srv.desc}
                    </p>
                  </div>
                  <a
                    href={`https://wa.me/923116826552?text=Hello%20Engineer%20Yasin,%20I%20want%20to%20hire%20your%20services%20for%20${encodeURIComponent(srv.title)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#B8212E] hover:bg-[#961a25] text-white font-extrabold text-[11px] flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-md"
                  >
                    💬 Hire on WhatsApp ➔
                  </a>
                </div>
              );
            })}
          </div>
        </div>
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
              Don&apos;t miss any job openings, ISSB test schedules, or free APK releases. Join our verified student &amp; candidate group today!
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
