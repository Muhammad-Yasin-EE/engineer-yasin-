import Link from 'next/link'
import { ShieldCheck, FileText, ArrowRight, BookMarked, Brain, Award, Sparkles, Clock, Flame } from 'lucide-react'

export const revalidate = 60

export default function PrepDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow flex flex-col gap-10 bg-white text-slate-800">
      
      {/* Top Header */}
      <div className="flex flex-col items-center text-center border-b border-slate-200 pb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B8212E]/10 border border-[#B8212E]/20 text-[#B8212E] text-xs font-black uppercase tracking-wider mb-4">
          <BookMarked className="w-4 h-4" />
          Test Preparation Hub
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4 uppercase">
          Master Your Armed Forces &amp; Selection Tests
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
          Select your target category below. Get instant access to authentic 84 Verbal (30m), 64 Non-Verbal (30m), and 50 Academic (25m) timed computer simulations.
        </p>
      </div>

      {/* Main Categories Grid (3 Balanced High-Yield Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
        
        {/* Card 1: Armed Forces Initial Tests */}
        <div className="bg-slate-50 border-2 border-slate-200 p-6 sm:p-8 rounded-3xl flex flex-col items-center text-center hover:border-emerald-600 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
          <div className="absolute top-0 w-full h-1.5 bg-emerald-600" />
          <div className="w-16 h-16 bg-white border-2 border-slate-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-50 transition-all shadow-xs">
            <ShieldCheck className="w-8 h-8 text-emerald-600" />
          </div>
          <div className="space-y-1 mb-3">
            <span className="text-[10px] uppercase font-black tracking-widest text-emerald-700 bg-emerald-100/60 px-2.5 py-0.5 rounded-full">
              84 Verbal &amp; 50 Academic
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">Armed Forces Tests</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mb-6 flex-grow font-medium leading-relaxed">
            Pak Army (PMA Long Course, TCC, LCC, AFNS), Pak Air Force (GD Pilot, Aero), and Pak Navy (PN Cadet, SSC) screening batteries.
          </p>
          <Link 
            href="/prep/armed-forces" 
            className="w-full py-3.5 bg-white border-2 border-slate-300 hover:bg-emerald-600 hover:border-emerald-600 text-slate-700 hover:text-white font-black rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            Explore Forces Exams <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Card 2: Non-Verbal Vector Intelligence Tests */}
        <div className="bg-slate-50 border-2 border-slate-200 p-6 sm:p-8 rounded-3xl flex flex-col items-center text-center hover:border-[#B8212E] hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
          <div className="absolute top-0 w-full h-1.5 bg-[#B8212E]" />
          <div className="w-16 h-16 bg-white border-2 border-slate-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-rose-50 transition-all shadow-xs">
            <Brain className="w-8 h-8 text-[#B8212E]" />
          </div>
          <div className="space-y-1 mb-3">
            <span className="text-[10px] uppercase font-black tracking-widest text-rose-700 bg-rose-100/60 px-2.5 py-0.5 rounded-full">
              64 Diagrams | 30 Mins
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">Non-Verbal Intelligence</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mb-6 flex-grow font-medium leading-relaxed">
            Interactive pattern series, shape rotations, analogies, matrix completion, and odd-one-out diagram puzzles with step-by-step logic.
          </p>
          <Link 
            href="/prep/quiz/non-verbal-intelligence-test-1" 
            className="w-full py-3.5 bg-[#B8212E] hover:bg-[#961A25] text-white font-black rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <Flame className="w-4 h-4 text-amber-300 fill-current" /> Start Non-Verbal Test <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Card 3: ISSB 4-Day Board Exam Suite */}
        <div className="bg-slate-50 border-2 border-slate-200 p-6 sm:p-8 rounded-3xl flex flex-col items-center text-center hover:border-amber-600 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
          <div className="absolute top-0 w-full h-1.5 bg-amber-600" />
          <div className="w-16 h-16 bg-white border-2 border-slate-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-50 transition-all shadow-xs">
            <Award className="w-8 h-8 text-amber-600" />
          </div>
          <div className="space-y-1 mb-3">
            <span className="text-[10px] uppercase font-black tracking-widest text-amber-800 bg-amber-100/60 px-2.5 py-0.5 rounded-full">
              4-Day Board Selection
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">ISSB Master Suite</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mb-6 flex-grow font-medium leading-relaxed">
            Comprehensive psychological evaluation (WAT, TAT, SCT), Group Testing Officer (GTO) obstacle logic, and Deputy President interview preparation.
          </p>
          <Link 
            href="/issb" 
            className="w-full py-3.5 bg-white border-2 border-slate-300 hover:bg-amber-600 hover:border-amber-600 text-slate-700 hover:text-white font-black rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            Enter ISSB Suite <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Bottom Freemium Access Banner */}
      <div className="mt-4 bg-[#0A192F] rounded-3xl p-6 sm:p-10 text-center flex flex-col items-center relative overflow-hidden shadow-xl border border-[#233554]">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-white/10 px-3.5 py-1 rounded-full text-[#D4AF37] text-[10px] font-black uppercase tracking-widest border border-[#D4AF37]/30">
            <Sparkles className="w-3.5 h-3.5" /> Elite Preparation Access
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Engineer Yasin <span className="text-[#D4AF37]">Pro Pass 2026</span>
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed font-medium">
            While basic quizzes are free, the Pro Pass gives you complete access to verified past papers, personal psychological evaluation reports, and interview secret tips.
          </p>
          <div className="pt-2">
            <Link 
              href="/pricing" 
              className="px-8 py-3.5 bg-[#D4AF37] hover:bg-[#F59E0B] text-[#0A192F] font-black rounded-xl transition-all shadow-md uppercase tracking-wider text-xs inline-block"
            >
              Explore Pro Plans →
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
