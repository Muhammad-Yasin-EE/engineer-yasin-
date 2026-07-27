'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, MessageCircle, MapPin, ShieldAlert, Target, CheckCircle2, Users } from 'lucide-react'

export default function GpePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-[#B8212E] selection:text-white pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 max-w-4xl">
          <Link href="/issb" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Return to ISSB Portal
          </Link>
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-sky-400 block">
            Official GTO Indoor Assessment Module
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight uppercase">
            Group Planning <span className="text-amber-400">Exercise (GPE / MOP)</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 font-medium leading-relaxed max-w-3xl">
            In the Group Planning Exercise (also known as Military Operations Plan), candidates inspect a tactical ground model, read a complex multi-crisis narrative, and formulate a structured operational resolution under tight time limits.
          </p>
        </div>

        {/* Realistic Testing Scene Banner */}
        <div className="relative w-full h-64 sm:h-80 md:h-[400px] rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
          <Image
            src="/images/gto/gpe.jpg"
            alt="Group Planning Exercise (GPE / MOP)"
            fill
            className="object-cover hover:scale-[1.01] transition-transform duration-500"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          <div className="absolute bottom-4 left-6 sm:bottom-6 sm:left-8 z-10 flex items-center gap-2">
            <span className="px-3 py-1 bg-amber-500/90 text-slate-950 text-xs font-black uppercase rounded-lg shadow">
              Official Testing Standard
            </span>
            <span className="text-xs font-bold text-gray-300 uppercase bg-slate-950/80 px-3 py-1 rounded-lg border border-slate-800">
              GTO Tactical Ground Model
            </span>
          </div>
        </div>

        {/* Priority Resolution Matrix */}
        <div className="bg-[#0A192F] border border-[#1A2E4C] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Target className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
              Official 4-Step Crisis Prioritization Rule
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { rank: "1st Priority", label: "Life-Threatening Emergency", desc: "Drowning civilian, casualty requiring bleeding arrest, or impending train accident.", color: "text-rose-400 border-rose-500/40 bg-rose-950/20" },
              { rank: "2nd Priority", label: "Military & Security Duty", desc: "Fleeing sabotage elements, checkpost alert, or preventing explosive detonation.", color: "text-amber-400 border-amber-500/40 bg-amber-950/20" },
              { rank: "3rd Priority", label: "Public Property & Infrastructure", desc: "Preventing crop fires, highway obstruction, or local infrastructure theft.", color: "text-sky-400 border-sky-500/40 bg-sky-950/20" },
              { rank: "4th Priority", label: "Routine & Personal Tasks", desc: "Reaching sports tournament, attending college lectures, or catching a normal bus.", color: "text-emerald-400 border-emerald-500/40 bg-emerald-950/20" }
            ].map((p, i) => (
              <div key={i} className={`p-5 sm:p-6 rounded-2xl border ${p.color} flex flex-col justify-between space-y-3 shadow-lg`}>
                <div>
                  <span className="text-xs font-black uppercase tracking-widest block pb-1">{p.rank}</span>
                  <h4 className="text-base font-black text-white uppercase leading-snug">{p.label}</h4>
                </div>
                <p className="text-xs text-gray-300 font-medium">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Model Tactical Scenario Box */}
        <div className="bg-gradient-to-b from-slate-900 to-[#0A192F] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-lg sm:text-xl font-black text-amber-400 uppercase flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-400" /> Model Ground Narrative Case Study
            </h3>
            <span className="text-xs font-bold text-emerald-400 uppercase">Official Hall Format</span>
          </div>
          
          <div className="space-y-4 text-xs sm:text-sm text-gray-200 font-medium leading-relaxed bg-slate-950 p-6 rounded-2xl border border-slate-800">
            <p>
              <strong>Scenario:</strong> You are a group of 8 college cadets returning in a jeep from a camping trip near Sherani Junction at 16:00 hours. A wounded villager informs you that armed dacoits have planted a detonator on the railway culvert scheduled to trigger when the Karakorum Express passes at 17:00 hours. Simultaneously, two injured passengers from an overturned rickshaw need immediate trauma aid at the nearby Basic Health Unit (8 km away), while your college gate locks strictly at 18:00 hours.
            </p>
            <div className="pt-2 text-emerald-400 font-bold">
              <strong>Official Solution Protocol:</strong> Divide group into 3 logical sub-teams. Deploy Team Alpha (3 cadets with fastest running stamina & toolkits) to inspect and report the culvert detonator to the nearest Rangers checkpost (2 km north). Assign Team Bravo (3 cadets with jeep) to transport trauma casualties immediately to BHU. Assign Team Charlie (2 cadets) to secure luggage and inform college authorities via BHU phone line regarding operational delay.
            </div>
          </div>
        </div>

        {/* WhatsApp Call to Action */}
        <div className="bg-gradient-to-r from-[#0A192F] to-[#112240] border border-[#1A2E4C] rounded-3xl p-8 sm:p-10 text-center max-w-4xl mx-auto space-y-5 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-black text-white uppercase">Practice GPE with Group Discussion Squads</h3>
          <p className="text-xs sm:text-sm text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Join Engineer Yasin&apos;s live WhatsApp group to participate in weekly tactical map discussions, group planning mock exercises, and peer debriefs!
          </p>
          <div className="pt-2">
            <a
              href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-2xl transition-all border border-emerald-400/20"
            >
              <MessageCircle className="w-5 h-5 fill-current" /> Join Live GPE Squad ➔
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
