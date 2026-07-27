'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, MessageCircle, Users, CheckCircle, Award, Shield } from 'lucide-react'

export default function FgtPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-[#B8212E] selection:text-white pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 max-w-4xl">
          <Link href="/issb" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Return to ISSB Portal
          </Link>
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-emerald-400 block">
            Official GTO Outdoor Final Assessment
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight uppercase">
            Final Group <span className="text-amber-400">Task (FGT Consolidation)</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 font-medium leading-relaxed max-w-3xl">
            The Final Group Task is the ultimate collaborative field test where all candidates re-unite into a complete squad for one final tactical obstacle. This is the GTO&apos;s closing verification of your physical consistency, stamina, and team spirit.
          </p>
        </div>

        {/* Realistic Testing Scene Banner */}
        <div className="relative w-full h-64 sm:h-80 md:h-[400px] rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
          <Image
            src="/images/gto/fgt.jpg"
            alt="Final Group Task (FGT) Team Obstacle Consolidation"
            fill
            className="object-cover hover:scale-[1.01] transition-transform duration-500"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          <div className="absolute bottom-4 left-6 sm:bottom-6 sm:left-8 z-10 flex items-center gap-2">
            <span className="px-3 py-1 bg-amber-400 text-slate-950 text-xs font-black uppercase rounded-lg shadow">
              Official Testing Standard
            </span>
            <span className="text-xs font-bold text-gray-300 uppercase bg-slate-950/80 px-3 py-1 rounded-lg border border-slate-800">
              Closing Collaborative Evaluation
            </span>
          </div>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "1. Stamina Resilience", desc: "By the end of day 2 or day 3, fatigue sets in. FGT specifically separates resilient candidates who maintain enthusiastic physical vigor from those who become exhausted or passive.", color: "border-amber-500/40 text-amber-400" },
            { title: "2. Silent Contributions", desc: "You do not need to monopolize orders if another cadet has already proposed a sound bridging structure. Assist actively by securing ropes and balancing planks without vanity.", color: "border-emerald-500/40 text-emerald-400" },
            { title: "3. Flawless Rule Compliance", desc: "In the rush to finish the final task, candidates often step onto red out-of-bounds timber. Maintaining strict discipline regarding Color and Rigidity rules earns highest credit.", color: "border-sky-500/40 text-sky-400" }
          ].map((item, idx) => (
            <div key={idx} className={`bg-[#0A192F] border ${item.color.split(' ')[0]} rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-4`}>
              <h3 className={`text-lg font-black uppercase ${item.color.split(' ')[1]}`}>{item.title}</h3>
              <p className="text-xs sm:text-sm text-gray-200 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Final Officer Checklist */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider border-b border-slate-800 pb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-emerald-400" /> Closing GTO Performance Checklist
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-gray-200 font-semibold">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Did you maintain uniform cordiality with peers regardless of earlier command debates?</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Did you step forward voluntarily to handle heavy ballis over elevated gaps?</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Did you listen patiently to alternative bridging proposals from junior teammates?</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Did you cross the final exit line together as an unbroken, cohesive brotherhood?</span>
            </div>
          </div>
        </div>

        {/* WhatsApp Banner */}
        <div className="bg-gradient-to-r from-[#0A192F] to-[#112240] border border-[#1A2E4C] rounded-3xl p-8 sm:p-10 text-center max-w-4xl mx-auto space-y-5 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-black text-white uppercase">Consult Engineer Yasin</h3>
          <p className="text-xs sm:text-sm text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Have questions about GTO outdoor assessments or physical endurance preparation? Send a message on WhatsApp right now!
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
