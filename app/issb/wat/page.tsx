import Link from 'next/link'
import { watSets } from '@/lib/data/watData'
import { ArrowLeft, Brain, Clock, ShieldCheck, Zap, Volume2, Sparkles, AlertTriangle } from 'lucide-react'

export const metadata = {
  title: 'Engineer Yasin ISSB Prep | Word Association Test (WAT) Battery',
  description: 'Official 100-word sequential real-time WAT practice tests with 10-second timer and automatic 9th-second audio buzzer alarm.'
}

export default function WatIndexPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-[#B8212E] selection:text-white pb-24">
      {/* Top Hero Banner */}
      <header className="relative overflow-hidden bg-gradient-to-b from-[#0A192F] to-slate-950 border-b border-slate-800 py-16 px-4 sm:px-6 lg:px-8 text-center shadow-2xl">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <Link 
            href="/issb" 
            className="inline-flex items-center gap-1.5 text-xs uppercase font-extrabold tracking-widest text-[#D4AF37] bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Main ISSB Hub
          </Link>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Engineer Yasin ISSB Prep: <span className="text-[#D4AF37]">Real-Time WAT Battery</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Practice the true projection-room environment. Each test features exactly <strong className="text-amber-400">100 words</strong> shown sequentially for <strong className="text-amber-400">10 seconds each</strong>, complete with a loud alert tone at the 9th second.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-gray-300 font-bold">
            <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl">
              <Clock className="w-4 h-4 text-emerald-400" /> 10s Per Word Projection
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl">
              <Volume2 className="w-4 h-4 text-rose-500" /> 9s Audio Alarm Buzzer
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl">
              <Sparkles className="w-4 h-4 text-amber-400" /> Easy ➔ Hard Progression
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        
        {/* Instructions Alert Banner */}
        <div className="bg-[#112240] border border-[#233554] rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4 max-w-3xl">
            <div className="w-12 h-12 rounded-2xl bg-[#B8212E] flex items-center justify-center text-white shrink-0 shadow-md">
              <Brain className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">How to Attempt This Real-Time WAT Practice</h3>
              <ul className="mt-2 text-xs sm:text-sm text-gray-300 space-y-1.5 list-disc pl-4 font-medium">
                <li>Keep a blank sheet of paper and pen ready before clicking <strong>Launch Test</strong>.</li>
                <li>Words start simple (Basic/Positive) and transition into stress/psychological terms towards the end.</li>
                <li>Write a short, meaningful sentence immediately as the word appears on your display.</li>
                <li>When the alarm beeps at second 9, stop writing immediately and look up for the next word.</li>
              </ul>
            </div>
          </div>
          <div className="shrink-0">
            <span className="px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-black uppercase tracking-wider block text-center">
              ⭐ 15 Complete Sets Available
            </span>
          </div>
        </div>

        {/* WAT Sets Grid */}
        <section>
          <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <ShieldCheck className="w-7 h-7 text-[#D4AF37]" /> Select Your Practice Battery
            </h2>
            <span className="text-xs text-slate-400 font-extrabold uppercase tracking-widest">
              Total 1,500 Curated Words
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watSets.map((set, idx) => (
              <div 
                key={set.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-[#D4AF37]/60 rounded-3xl p-6 shadow-xl flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="w-9 h-9 rounded-xl bg-slate-800 text-[#D4AF37] font-black text-xs flex items-center justify-center border border-slate-700">
                      #{idx + 1}
                    </span>
                    <span className="text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg">
                      100 Words • 16 Mins
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                      {set.title}
                    </h3>
                    <p className="text-xs font-semibold text-amber-400 mt-0.5">
                      {set.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed font-medium">
                    {set.description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-bold text-slate-300">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-300">🟢 50 Basic</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300">🟡 30 Action</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-rose-300">🔴 20 Stress</span>
                  </div>
                </div>

                <Link
                  href={`/issb/wat/${set.id}`}
                  className="mt-6 w-full py-3.5 bg-[#B8212E] hover:bg-[#961a25] text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg hover:shadow-rose-900/30 transition-all flex items-center justify-center gap-2"
                >
                  🚀 Launch Test Battery ➔
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Golden Rules Reminder */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center max-w-4xl mx-auto">
          <h3 className="text-lg font-black text-[#D4AF37] uppercase tracking-wider mb-2">
            ⚠️ Officer&apos;s Advisory for Sentence Formation
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium">
            Remember, WAT is a test of subconscious reactions and personality traits. Never use mugged-up or crammed sentences from general guides. Build natural expressions showing leadership, patriotism, responsibility, and teamwork.
          </p>
        </section>

      </main>
    </div>
  )
}
