'use client'

import { useState } from 'react'
import Link from 'next/link'
import { srtSituations, srtGuidelines, SrtItem } from '@/lib/data/issbPrepData'
import { ArrowLeft, MessageCircle, Shield, AlertTriangle, CheckCircle2, HelpCircle, BookOpen, UserCheck, Flame } from 'lucide-react'

export default function SrtHubPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'solved' | 'past-experience' | 'female'>('solved')
  const [selectedSituation, setSelectedSituation] = useState<number | null>(null)

  const filteredSituations = activeTab === 'all' 
    ? srtSituations 
    : srtSituations.filter(s => s.category === activeTab)

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-[#B8212E] selection:text-white pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 max-w-4xl">
          <Link href="/issb" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Return to ISSB Portal
          </Link>
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#D4AF37] block">
            Official ISSB Psychology Assessment Module
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight uppercase">
            Situation Reaction <span className="text-emerald-400">Test (SRT Hub)</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 font-medium leading-relaxed max-w-3xl">
            In SRT, candidates face rapid day-to-day practical crises and military contingencies. You are judged on your presence of mind, practical sense, emotional composure, and leadership initiative.
          </p>
        </div>

        {/* Official Guidelines Callout Box */}
        <div className="bg-gradient-to-r from-[#0A192F] to-[#112240] border border-[#1A2E4C] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <Shield className="w-6 h-6 text-amber-400 shrink-0" />
            <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-wider">
              {srtGuidelines.title}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {srtGuidelines.points.map((pt, i) => (
              <div key={i} className="flex items-start gap-3 bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-200 font-medium leading-relaxed">{pt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 border-b border-slate-800 pb-4">
          {[
            { id: 'solved', label: '✅ Solved SRTs (Official Answers)', icon: CheckCircle2 },
            { id: 'past-experience', label: '🔥 Past ISSB Experiences (55+ Items)', icon: Flame },
            { id: 'female', label: '👩‍✈️ Female Officer Special SRTs', icon: UserCheck },
            { id: 'all', label: '📚 View Complete Repository', icon: BookOpen },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all shadow-md ${
                activeTab === tab.id
                  ? 'bg-[#B8212E] text-white border border-rose-400/40 shadow-rose-900/30 scale-105'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Situations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSituations.map((item) => (
            <div 
              key={item.id} 
              className="bg-[#0A192F] border border-[#1A2E4C] hover:border-emerald-500/50 rounded-3xl p-6 sm:p-8 shadow-xl transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#D4AF37] bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                    SRT Item #{item.id}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {item.category.replace('-', ' ')}
                  </span>
                </div>

                <p className="text-base sm:text-lg font-bold text-white leading-relaxed group-hover:text-emerald-200 transition-colors pt-2">
                  &ldquo;{item.situation}&rdquo;
                </p>
              </div>

              {item.solvedAnswer ? (
                <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 space-y-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Recommended Officer Response:
                  </span>
                  <p className="text-xs sm:text-sm text-gray-200 font-medium leading-relaxed">
                    {item.solvedAnswer}
                  </p>
                </div>
              ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between text-xs font-bold text-gray-400">
                  <span>💡 Write a concise 2-line practical solution without panicking.</span>
                  <span className="text-amber-400 font-black">Time: 2 Min</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* WhatsApp Guidance Box */}
        <div className="bg-[#112240] border border-emerald-500/40 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 shadow-2xl">
          <span className="text-xs font-black text-emerald-400 uppercase tracking-widest block">
            🎖️ Need Personalized Feedback on Your SRT Responses?
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white uppercase">
            Get Your Written Solutions Evaluated by Engineer Yasin
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Join our exclusive ISSB candidate community on WhatsApp or share your written SRT register directly with Engineer Yasin for official psychological review!
          </p>
          <a
            href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-2xl transition-all border border-emerald-400/20"
          >
            <MessageCircle className="w-5 h-5 fill-current" /> Submit SRTs on WhatsApp ➔
          </a>
        </div>

      </div>
    </div>
  )
}
