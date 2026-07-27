'use client'

import Link from 'next/link'
import { pointerStoryPrompts, meritsDemeritsGuide } from '@/lib/data/issbRemainingData'
import { ArrowLeft, MessageCircle, CheckCircle, XCircle, Shield, Award, Sparkles } from 'lucide-react'

export default function PointerStoryPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-[#B8212E] selection:text-white pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 max-w-4xl">
          <Link href="/issb" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Return to ISSB Portal
          </Link>
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-sky-400 block">
            Official ISSB Psychology Assessment Module
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight uppercase">
            Pointer Story <span className="text-emerald-400">&amp; Merit/Demerit Assessment</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 font-medium leading-relaxed max-w-3xl">
            Master open-ended scenario writing from stimulus pointer sentences, and prepare your official 5 Merits and 5 Demerits self-appraisal with strict psychological alignment.
          </p>
        </div>

        {/* Section 1: Pointer Stories Repository */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wide">
              Official Stimulus Pointer Story Starters
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pointerStoryPrompts.map((prompt, index) => (
              <div
                key={index}
                className="bg-[#0A192F] border border-[#1A2E4C] hover:border-sky-500/60 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between space-y-6 group relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3.5 py-1 rounded-full text-xs font-black bg-sky-500/15 text-sky-400 border border-sky-500/30 uppercase tracking-widest">
                      Pointer Prompt #{index + 1}
                    </span>
                    <span className="text-xs text-gray-400 font-bold">⏱️ 3.5 Minutes Limit</span>
                  </div>
                  <p className="text-base sm:text-lg text-white font-serif italic font-bold leading-relaxed border-l-4 border-amber-400 pl-4 py-1">
                    &ldquo;{prompt}&rdquo;
                  </p>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-xs text-gray-300 font-medium">
                  <strong className="text-emerald-400 uppercase">💡 Assessor Tip:</strong> Ensure your hero immediately investigates the crisis calmly, delegates roles, notifies authorities, and achieves complete containment without panic.
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Merit & Demerit Self-Appraisal Matrix */}
        <div className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-emerald-400" />
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wide">
                5 Merits &amp; 5 Demerits Official Guidelines
              </h2>
            </div>
            <span className="px-4 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 text-xs font-black uppercase">
              ⚠️ Avoid Self-Sabotage
            </span>
          </div>

          <div className="bg-[#0A192F] border border-[#1A2E4C] rounded-3xl p-6 sm:p-8 shadow-xl text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">
            {meritsDemeritsGuide.overview}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Recommended Merits Box */}
            <div className="bg-gradient-to-b from-emerald-950/40 to-[#0A192F] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center gap-3 border-b border-emerald-500/30 pb-4">
                <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
                <h3 className="text-lg sm:text-xl font-black text-emerald-400 uppercase">
                  Recommended Candidate Merits
                </h3>
              </div>
              <ul className="space-y-4">
                {meritsDemeritsGuide.recommendedMerits.map((m, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-gray-200 font-semibold bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-black text-xs shrink-0">{i + 1}</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Acceptable Safe Demerits Box */}
            <div className="bg-gradient-to-b from-amber-950/30 to-[#0A192F] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center gap-3 border-b border-amber-500/30 pb-4">
                <Award className="w-6 h-6 text-amber-400 shrink-0" />
                <h3 className="text-lg sm:text-xl font-black text-amber-400 uppercase">
                  Acceptable &amp; Safe Demerits
                </h3>
              </div>
              <ul className="space-y-4">
                {meritsDemeritsGuide.acceptableDemerits.map((d, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-gray-200 font-semibold bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-black text-xs shrink-0">{i + 1}</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* WhatsApp Evaluation Banner */}
        <div className="bg-gradient-to-r from-[#0A192F] via-[#112240] to-[#0A192F] border border-[#1A2E4C] rounded-3xl p-8 sm:p-10 text-center max-w-4xl mx-auto space-y-5 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-black text-white uppercase">Get Your Merits &amp; Demerits Verified</h3>
          <p className="text-xs sm:text-sm text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Before appearing before the ISSB Psychologist or Deputy President, share your draft self-appraisal with Engineer Yasin on WhatsApp for an authentic suitability check!
          </p>
          <div className="pt-2">
            <a
              href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-2xl transition-all border border-emerald-400/20"
            >
              <MessageCircle className="w-5 h-5 fill-current" /> Consult on WhatsApp ➔
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
