'use client'

import Link from 'next/link'
import { individualObstaclesList } from '@/lib/data/issbRemainingData'
import { ArrowLeft, MessageCircle, Award, CheckCircle2, Trophy, Flame, Activity } from 'lucide-react'

export default function ObstaclesPage() {
  const totalMarks = individualObstaclesList.reduce((acc, curr) => acc + curr.marks, 0)

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-[#B8212E] selection:text-white pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 max-w-4xl">
          <Link href="/issb" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Return to ISSB Portal
          </Link>
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-emerald-400 block">
            Official GTO Outdoor Physical Assessment
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight uppercase">
            Individual Obstacles <span className="text-amber-400">(IO Course)</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 font-medium leading-relaxed max-w-3xl">
            Candidates are given exactly 2 minutes to navigate up to 10 standard military field obstacles. Master the scoring weights and biomechanical execution techniques to achieve maximum overall physical rating.
          </p>
        </div>

        {/* Criteria Pills */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-wider">
          <span className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-emerald-400 shrink-0" /> 10 Obstacles in 2 Minutes
          </span>
          <span className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-400 shrink-0" /> Total {totalMarks} Marks Available
          </span>
          <span className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-rose-400 shrink-0" /> Repetition Bonus Available
          </span>
        </div>

        {/* Obstacles Grid */}
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wide border-b border-slate-800 pb-4">
            Official 10-Obstacle Specification &amp; Technique Map
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {individualObstaclesList.map((obs) => (
              <div
                key={obs.no}
                className="bg-[#0A192F] border border-[#1A2E4C] hover:border-amber-500/60 rounded-3xl p-6 sm:p-7 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3.5 py-1 rounded-full text-xs font-black bg-slate-900 text-sky-400 border border-slate-800 uppercase tracking-widest">
                      Obstacle #{obs.no}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/15 text-amber-400 border border-amber-500/30 uppercase">
                      ⭐ {obs.marks} {obs.marks === 1 ? 'Mark' : 'Marks'}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-emerald-400 transition-colors">
                    {obs.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed pt-1">
                    {obs.technique}
                  </p>
                </div>
                <div className="pt-2 flex items-center gap-1.5 text-[11px] font-extrabold text-emerald-400 uppercase border-t border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 shrink-0" /> Safety standard protocol verified
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Repetition Rule Guidance */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 text-xs sm:text-sm text-gray-200">
          <h3 className="text-base sm:text-lg font-black text-amber-400 uppercase">💡 Pro Stamina Strategy: The Repetition Rule</h3>
          <p>
            If a highly physically fit candidate successfully clears all 10 obstacles before the 2-minute horn blasts, they are legally allowed to re-commence from Obstacle #1 or #10 to accumulate additional bonus points (e.g., scoring 65+ out of 55). Pace your breathing and never hesitate on the Tiger Leap or Vertical Rope!
          </p>
        </div>

        {/* WhatsApp Banner */}
        <div className="bg-gradient-to-r from-[#0A192F] to-[#112240] border border-[#1A2E4C] rounded-3xl p-8 sm:p-10 text-center max-w-4xl mx-auto space-y-5 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-black text-white uppercase">Need Physical Conditioning Routines?</h3>
          <p className="text-xs sm:text-sm text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Connect with Engineer Yasin on WhatsApp for specialized pre-ISSB running intervals, upper-body pullup schedules, and injury prevention guides!
          </p>
          <div className="pt-2">
            <a
              href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-2xl transition-all border border-emerald-400/20"
            >
              <MessageCircle className="w-5 h-5 fill-current" /> Get Physical Guide on WhatsApp ➔
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
