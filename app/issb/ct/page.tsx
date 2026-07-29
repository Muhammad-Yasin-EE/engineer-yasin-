'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, MessageCircle, Award, CheckCircle, ShieldAlert, Target, Users, ShieldCheck, UserCog, Megaphone } from 'lucide-react'
import GtoAiSimulator from '@/components/GtoAiSimulator'

export default function CtPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-[#B8212E] selection:text-white pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 max-w-4xl">
          <Link href="/issb" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Return to ISSB Portal
          </Link>
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-amber-400 block">
            Official GTO Outdoor Assessment Module
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight uppercase">
            Command Task <span className="text-emerald-400">(CT Leadership)</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 font-medium leading-relaxed max-w-3xl">
            The Command Task is the defining practical leadership evaluation in ISSB. You are appointed as an officer commander to lead 2-3 selected subordinates through an intricate obstacle within strict time limitations.
          </p>
        </div>

        {/* Realistic Testing Scene Banner */}
        <div className="relative w-full h-64 sm:h-80 md:h-[400px] rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
          <Image
            src="/images/gto/ct.jpg"
            alt="Command Task (CT Leadership) Officer Briefing"
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
              Commander Field Briefing
            </span>
          </div>
        </div>

        {/* 4-Phase Commander Protocol */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Award className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wide">
              Official 4-Stage Commander Execution Protocol
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { step: "Phase 1: Obstacle Reconnaissance", desc: "When GTO grants you 2 minutes of individual observation, inspect the obstacle from all 360-degree angles. Identify stable white structural platforms, red out-of-bounds gaps, and calculate exact leverage points.", badge: "2 Minutes Solo Prep", color: "border-sky-500/40 text-sky-400" },
              { step: "Phase 2: Calling & Briefing Subordinates", desc: "Select 2 to 3 teammates based on required physical agility or height. Give a brisk, motivating operational briefing: explain the objective, safety rules, and initial structural plan clearly in Urdu or English.", badge: "Clear Oral Orders", color: "border-emerald-500/40 text-emerald-400" },
              { step: "Phase 3: Active Supervision & Safety", desc: "Do not do all manual labor yourself; delegate effectively! Stand at a clear tactical vantage point where you can monitor structural safety and direct subordinate positioning without micromanaging.", badge: "Command Posture", color: "border-amber-500/40 text-amber-400" },
              { step: "Phase 4: Handling GTO Stress & Alterations", desc: "If the GTO suddenly announces that a helping plank has cracked or your arm is disabled, never freeze! Acknowledge the constraint instantly and improvise an alternate diagonal balli pivot with confidence.", badge: "Crisis Adaptation", color: "border-rose-500/40 text-rose-400" }
            ].map((s, idx) => (
              <div key={idx} className={`bg-[#0A192F] border ${s.color.split(' ')[0]} rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-4`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-black uppercase ${s.color.split(' ')[1]}`}>{s.step}</span>
                  <span className="px-3 py-1 bg-slate-950 text-gray-300 rounded-lg text-[10px] font-extrabold border border-slate-800">{s.badge}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-200 font-medium leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What GTO Observes */}
        <div className="bg-gradient-to-r from-[#0A192F] to-[#112240] border border-[#1A2E4C] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-wider flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-400" /> Assessor Checklist: What Causes Rejection vs. Selection?
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm font-medium">
            <div className="bg-emerald-950/30 border border-emerald-500/30 p-6 rounded-2xl space-y-3">
              <span className="text-emerald-400 font-black uppercase block text-base">🟢 Selection Qualities (Do&apos;s)</span>
              <ul className="space-y-2 text-gray-200">
                <li>• Speaking with authoritative yet encouraging vocal tone.</li>
                <li>• Re-checking knot security before sending subordinates across.</li>
                <li>• Thanking teammates and maintaining high physical stamina.</li>
              </ul>
            </div>
            <div className="bg-rose-950/30 border border-rose-500/30 p-6 rounded-2xl space-y-3">
              <span className="text-rose-400 font-black uppercase block text-base">🔴 Rejection Flaws (Don&apos;ts)</span>
              <ul className="space-y-2 text-gray-300">
                <li>• Asking subordinates what to do when stuck (loss of command).</li>
                <li>• Losing temper or blaming teammates for rule violations.</li>
                <li>• Jumping over dangerous 4-feet red zone gaps without bridging.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* AI Simulator Engine */}
        <GtoAiSimulator taskType="CT" />

        {/* WhatsApp Banner */}
        <div className="bg-gradient-to-r from-[#0A192F] to-[#112240] border border-[#1A2E4C] rounded-3xl p-8 sm:p-10 text-center max-w-4xl mx-auto space-y-5 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-black text-white uppercase">Get Command Task Coaching</h3>
          <p className="text-xs sm:text-sm text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Connect directly on WhatsApp with Engineer Yasin to receive obstacle briefing video guides and solved Command Task field manuals!
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
