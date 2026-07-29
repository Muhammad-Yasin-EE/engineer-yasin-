'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, MessageCircle, Users, CheckCircle, Target, Shield, Zap } from 'lucide-react'
import GtoAiSimulator from '@/components/GtoAiSimulator'

export default function HgtPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-[#B8212E] selection:text-white pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 max-w-4xl">
          <Link href="/issb" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Return to ISSB Portal
          </Link>
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-sky-400 block">
            Official GTO Outdoor Assessment Module
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight uppercase">
            Half Group <span className="text-emerald-400">Task (HGT Strategy)</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 font-medium leading-relaxed max-w-3xl">
            In HGT, the original candidate squad is halved into smaller groups of 4-5 individuals. This allows the Group Testing Officer (GTO) to closely scrutinize candidates who were previously overshadowed by louder or dominating members in PGT.
          </p>
        </div>

        {/* Realistic Testing Scene Banner */}
        <div className="relative w-full h-64 sm:h-80 md:h-[400px] rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
          <Image
            src="/images/gto/hgt.jpg"
            alt="Half Group Task (HGT) Teamwork Obstacle"
            fill
            className="object-cover hover:scale-[1.01] transition-transform duration-500"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          <div className="absolute bottom-4 left-6 sm:bottom-6 sm:left-8 z-10 flex items-center gap-2">
            <span className="px-3 py-1 bg-sky-400 text-slate-950 text-xs font-black uppercase rounded-lg shadow">
              Official Testing Standard
            </span>
            <span className="text-xs font-bold text-gray-300 uppercase bg-slate-950/80 px-3 py-1 rounded-lg border border-slate-800">
              Sub-Group Field Evaluation
            </span>
          </div>
        </div>

        {/* HGT Core Execution Protocols */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "1. Individual Initiative", desc: "With fewer teammates, you cannot stay in the background. Immediately inspect the obstacle and offer practical structural solutions within the first 30 seconds.", color: "border-emerald-500/40 text-emerald-400" },
            { title: "2. Constructive Inclusion", desc: "If a teammate is silent or hesitant, actively hand them a rope or invite them onto the stable white platform. True officer leadership lifts the entire unit.", color: "border-sky-500/40 text-sky-400" },
            { title: "3. Calm Under Pressure", desc: "When helping planks slip or time ticks away, avoid shouting or blaming teammates. Re-evaluate cantilever anchor points with composed determination.", color: "border-amber-500/40 text-amber-400" }
          ].map((item, idx) => (
            <div key={idx} className={`bg-[#0A192F] border ${item.color.split(' ')[0]} rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-4`}>
              <h3 className={`text-lg font-black uppercase ${item.color.split(' ')[1]}`}>{item.title}</h3>
              <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Key Difference Table */}
        <div className="bg-[#0A192F] border border-[#1A2E4C] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Zap className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
              PGT vs. HGT Tactical Comparison
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-gray-300">
              <thead className="text-emerald-400 uppercase font-black border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Feature Metric</th>
                  <th className="py-3 px-4">Progressive Group Task (PGT)</th>
                  <th className="py-3 px-4 text-sky-400">Half Group Task (HGT)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-medium">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-white">Squad Strength</td>
                  <td className="py-3.5 px-4">Full Group (8 to 10 Candidates)</td>
                  <td className="py-3.5 px-4 text-sky-300 font-bold">Half Squad (4 to 5 Candidates)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-white">Obstacle Count</td>
                  <td className="py-3.5 px-4">4 Successive Obstacles (40 Minutes)</td>
                  <td className="py-3.5 px-4 text-sky-300 font-bold">1 Complete Tactical Obstacle (~15 Minutes)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-white">GTO Assessment Focus</td>
                  <td className="py-3.5 px-4">Overall social adaptability &amp; team harmony</td>
                  <td className="py-3.5 px-4 text-sky-300 font-bold">Individual mechanical common sense &amp; initiative</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Simulator Engine */}
        <GtoAiSimulator taskType="HGT" />

        {/* WhatsApp Banner */}
        <div className="bg-gradient-to-r from-[#0A192F] to-[#112240] border border-[#1A2E4C] rounded-3xl p-8 sm:p-10 text-center max-w-4xl mx-auto space-y-5 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-black text-white uppercase">Want Real GTO Field Coaching?</h3>
          <p className="text-xs sm:text-sm text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Get personalized practical guidance and helping material training routines directly on WhatsApp with Engineer Yasin!
          </p>
          <div className="pt-2">
            <a
              href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-2xl transition-all border border-emerald-400/20"
            >
              <MessageCircle className="w-5 h-5 fill-current" /> Join Official WhatsApp Group ➔
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
