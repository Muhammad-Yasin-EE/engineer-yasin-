'use client'

import Link from 'next/link'
import { selfDescriptionTemplates } from '@/lib/data/issbRemainingData'
import { ArrowLeft, MessageCircle, UserCheck, Shield, BookOpen, Sparkles } from 'lucide-react'

export default function SelfDescriptionPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-[#B8212E] selection:text-white pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 max-w-4xl">
          <Link href="/issb" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Return to ISSB Portal
          </Link>
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-amber-400 block">
            Official ISSB Psychology Assessment Module
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight uppercase">
            Self-Description <span className="text-emerald-400">(SD) &amp; Peer Rating</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 font-medium leading-relaxed max-w-3xl">
            Master the five golden paragraphs required in the official Self-Description test. Understand how to reflect consistent modesty, discipline, filial respect, and peer collaboration.
          </p>
        </div>

        {/* Criteria Pills */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-wider text-gray-300">
          <span className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 flex items-center gap-1.5 shadow-sm">
            <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" /> 5 Mandatory Perspectives
          </span>
          <span className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sky-400 flex items-center gap-1.5 shadow-sm">
            <Shield className="w-4 h-4 text-sky-400 shrink-0" /> Zero Contradiction Protocol
          </span>
          <span className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" /> Official Military Guidance
          </span>
        </div>

        {/* Templates Grid */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <BookOpen className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wide">
              Official Self-Description Paragraph Drafts
            </h2>
          </div>
          
          <div className="space-y-6">
            {selfDescriptionTemplates.map((item, index) => (
              <div
                key={index}
                className="bg-[#0A192F] border border-[#1A2E4C] hover:border-emerald-500/60 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between space-y-4 group relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
                  <h3 className="text-lg sm:text-xl font-black text-white uppercase group-hover:text-emerald-400 transition-colors">
                    {item.category}
                  </h3>
                  <span className="px-3 py-1 bg-slate-950 border border-slate-800 text-amber-400 font-extrabold text-[11px] rounded-full uppercase w-fit">
                    Paragraph #{index + 1}
                  </span>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-gray-200 font-medium leading-relaxed bg-slate-900/90 p-5 rounded-2xl border border-slate-800/80 shadow-inner">
                  {item.sample}
                </p>
                <div className="text-[11px] text-gray-400 font-bold uppercase flex items-center gap-2 pt-1">
                  <span className="text-emerald-400">✅ Assessor Validation:</span> Demonstrates balanced interpersonal maturity and steady ambition.
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Guidance Card */}
        <div className="bg-gradient-to-r from-[#0A192F] to-[#112240] border border-[#1A2E4C] rounded-3xl p-8 sm:p-10 text-center max-w-4xl mx-auto space-y-5 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-black text-white uppercase">Need Personalized SD Drafting?</h3>
          <p className="text-xs sm:text-sm text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Your Self-Description must match your actual schooling, sports, and family history. Discuss your specific background with Engineer Yasin on WhatsApp for a custom-tailored draft!
          </p>
          <div className="pt-2">
            <a
              href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-2xl transition-all border border-emerald-400/20"
            >
              <MessageCircle className="w-5 h-5 fill-current" /> Contact on WhatsApp ➔
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
