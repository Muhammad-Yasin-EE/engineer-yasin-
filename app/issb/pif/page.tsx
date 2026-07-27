'use client'

import Link from 'next/link'
import { ArrowLeft, MessageCircle, UserCheck, FileText, ShieldAlert, CheckCircle2 } from 'lucide-react'

export default function PifPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-[#B8212E] selection:text-white pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 max-w-4xl">
          <Link href="/issb" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Return to ISSB Portal
          </Link>
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-amber-400 block">
            Official Deputy President Assessment Module
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight uppercase">
            Personal Information <span className="text-emerald-400">Form (PIF Guide)</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 font-medium leading-relaxed max-w-3xl">
            The Personal Information Form (PIF) is the absolute foundation of your ISSB assessment. The Deputy President, Psychologist, and GTO scrutinize this single bio-data document to cross-examine your personality consistency.
          </p>
        </div>

        {/* Core PIF Golden Rules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "1. Zero Contradiction Rule", desc: "Never invent fictitious hobbies or exaggerated sports records. If you claim to read historical literature on your PIF, the Deputy President will rigorously cross-question authors, publication dates, and historical themes.", color: "border-amber-500/40 text-amber-400" },
            { title: "2. Transparent Economics", desc: "State parental profession, agricultural acreage, and household income accurately. Armed forces assessors value humble background determination far higher than artificial financial embellishment.", color: "border-emerald-500/40 text-emerald-400" },
            { title: "3. Consistent Leadership", desc: "List actual school house captaincies, debate club representation, or scouting experiences. Ensure these match the confidence level demonstrated during your GTO discussions.", color: "border-sky-500/40 text-sky-400" }
          ].map((item, idx) => (
            <div key={idx} className={`bg-[#0A192F] border ${item.color.split(' ')[0]} rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-4`}>
              <h3 className={`text-lg font-black uppercase ${item.color.split(' ')[1]}`}>{item.title}</h3>
              <p className="text-xs sm:text-sm text-gray-200 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* PIF Sections Breakdown */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider border-b border-slate-800 pb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-amber-400" /> Key PIF Data Fields &amp; Filling Strategy
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-emerald-400 font-black uppercase text-base block">🎯 Hobbies &amp; Extra-Curriculars</span>
              <p className="text-gray-300 leading-relaxed">
                Select 1 or 2 genuine active interests (e.g., jogging, gardening, technical troubleshooting, playing cricket). Avoid passive entries like &ldquo;watching television&rdquo; or &ldquo;scrolling mobile media.&rdquo;
              </p>
            </div>
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-sky-400 font-black uppercase text-base block">📚 Academic Setbacks &amp; Gaps</span>
              <p className="text-gray-300 leading-relaxed">
                If you took a gap year or experienced a grade dip in FSC/A-Levels, write the sincere logical explanation clearly (such as severe medical illness or family financial responsibilities) without making excuses.
              </p>
            </div>
          </div>
        </div>

        {/* WhatsApp Consultation Banner */}
        <div className="bg-gradient-to-r from-[#0A192F] to-[#112240] border border-[#1A2E4C] rounded-3xl p-8 sm:p-10 text-center max-w-4xl mx-auto space-y-5 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-black text-white uppercase">Get Your Bio-Data Sheet Inspected</h3>
          <p className="text-xs sm:text-sm text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Avoid lifelong selection regrets caused by conflicting bio-data entries. Send your draft PIF sheet to Engineer Yasin on WhatsApp for complete officer verification!
          </p>
          <div className="pt-2">
            <a
              href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-2xl transition-all border border-amber-400/20"
            >
              <MessageCircle className="w-5 h-5 fill-current" /> Consult on WhatsApp ➔
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
