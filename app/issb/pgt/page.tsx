'use client'

import Link from 'next/link'
import Image from 'next/image'
import { gtoGroundRules } from '@/lib/data/issbRemainingData'
import { ArrowLeft, MessageCircle, ShieldCheck, Users, Compass, CheckCircle } from 'lucide-react'
import GtoAiSimulator from '@/components/GtoAiSimulator'

export default function PgtPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-[#B8212E] selection:text-white pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 max-w-4xl">
          <Link href="/issb" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Return to ISSB Portal
          </Link>
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-emerald-400 block">
            Official GTO Outdoor Assessment Module
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight uppercase">
            Progressive Group <span className="text-sky-400">Task (PGT) Rules</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 font-medium leading-relaxed max-w-3xl">
            The Progressive Group Task is the premier testing ground for assessing leadership initiative, physical endurance, and mechanical common sense. Master the mandatory GTO ground rules before stepping onto the testing field.
          </p>
        </div>

        {/* Realistic Testing Scene Banner */}
        <div className="relative w-full h-64 sm:h-80 md:h-[400px] rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
          <Image
            src="/images/gto/pgt.jpg"
            alt="Progressive Group Task (PGT) Field Obstacles"
            fill
            className="object-cover hover:scale-[1.01] transition-transform duration-500"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          <div className="absolute bottom-4 left-6 sm:bottom-6 sm:left-8 z-10 flex items-center gap-2">
            <span className="px-3 py-1 bg-emerald-500 text-slate-950 text-xs font-black uppercase rounded-lg shadow">
              Official Testing Standard
            </span>
            <span className="text-xs font-bold text-gray-300 uppercase bg-slate-950/80 px-3 py-1 rounded-lg border border-slate-800">
              Outdoor Field Assessment
            </span>
          </div>
        </div>

        {/* GTO Ground Rules Cards */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wide">
              Mandatory GTO Obstacle Rules
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gtoGroundRules.map((rule, idx) => (
              <div
                key={idx}
                className="bg-[#0A192F] border border-[#1A2E4C] hover:border-emerald-500/60 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3.5 py-1 rounded-full text-xs font-black bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 uppercase tracking-widest">
                      Rule #{idx + 1}
                    </span>
                    <span className="text-xs text-amber-400 font-bold uppercase">{rule.badge}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-emerald-300 transition-colors uppercase">
                    {rule.title}
                  </h3>
                  <ul className="space-y-3 pt-2">
                    {rule.details.map((desc, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-gray-200 font-medium leading-relaxed bg-slate-900/80 p-3.5 rounded-xl border border-slate-800/80">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Helper Material Bridging Tactics Box */}
        <div className="bg-gradient-to-r from-[#0A192F] via-[#112240] to-[#0A192F] border border-[#1A2E4C] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Compass className="w-6 h-6 text-sky-400" />
            <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-wider">
              Helping Material Tactics (Planks, Ballis &amp; Ropes)
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-gray-200 font-medium">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-black uppercase block">🪵 The Plank (Takhtha)</span>
              <p>Ideal for flat cantilever projection over 4-feet gaps. Wedge one end under a white structural cross-bar while a teammate anchors the counterweight.</p>
            </div>
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-sky-400 font-black uppercase block">🎋 The Balli (Bamboo Pole)</span>
              <p>Used for high-angle pivoting and diagonal support bridging. Exceptional for reaching elevated white loops or supporting the plank from below.</p>
            </div>
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-black uppercase block">🪢 Manila Ropes (Knotting)</span>
              <p>Essential for clove-hitching and lashing helping timber to stationary white structures. Never wrap rope around red painted metal or timber!</p>
            </div>
          </div>
        </div>

        {/* AI Simulator Engine */}
        <GtoAiSimulator taskType="PGT" />

        {/* WhatsApp Call to Action */}
        <div className="bg-gradient-to-r from-[#0A192F] to-[#112240] border border-[#1A2E4C] rounded-3xl p-8 sm:p-10 text-center max-w-4xl mx-auto space-y-5 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-black text-white uppercase">Master GTO Field Strategy</h3>
          <p className="text-xs sm:text-sm text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Want visual obstacle illustrations and knot-tying video tutorials? Message Engineer Yasin on WhatsApp for complete GTO Field Guide notes!
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
