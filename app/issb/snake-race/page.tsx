'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, MessageCircle, Users, Flame, Trophy, ShieldAlert } from 'lucide-react'
import SnakeRaceAiSimulator from '@/components/SnakeRaceAiSimulator'

export default function SnakeRacePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-[#B8212E] selection:text-white pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 max-w-4xl">
          <Link href="/issb" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Return to ISSB Portal
          </Link>
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-rose-400 block">
            Official GTO Outdoor Teamwork Race
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight uppercase">
            Group Obstacle <span className="text-amber-400">Race (Snake Race)</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 font-medium leading-relaxed max-w-3xl">
            The Snake Race is the most adrenaline-charged high-energy teamwork assessment in ISSB. Competing squads transport a heavy, tent-wrapped canvas &ldquo;python snake&rdquo; across challenging hurdles while shouting energetic military war cries.
          </p>
        </div>

        {/* Realistic Testing Scene Banner */}
        <div className="relative w-full h-64 sm:h-80 md:h-[400px] rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
          <Image
            src="/images/gto/snake_race.jpg"
            alt="Group Obstacle Race (Snake Race) Squad Action"
            fill
            className="object-cover hover:scale-[1.01] transition-transform duration-500"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          <div className="absolute bottom-4 left-6 sm:bottom-6 sm:left-8 z-10 flex items-center gap-2">
            <span className="px-3 py-1 bg-rose-500 text-slate-950 text-xs font-black uppercase rounded-lg shadow">
              Official Testing Standard
            </span>
            <span className="text-xs font-bold text-gray-300 uppercase bg-slate-950/80 px-3 py-1 rounded-lg border border-slate-800">
              High-Energy Squad Cohesion
            </span>
          </div>
        </div>

        {/* 4 Mandatory Rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "1. Complete Contact Rule", desc: "Every member of the candidate squad must maintain physical hand contact with the canvas snake when running between obstacles. Leaving the snake behind causes immediate penalty.", color: "border-rose-500/40 text-rose-400" },
            { title: "2. War Cry Energy (Adrenaline)", desc: "Squads choose an inspiring war cry (e.g., 'Allah o Akbar', 'Sher Dil', 'Haidar'). Continual vigorous shouting demonstrates collective courage and intimidates opposing squads.", color: "border-amber-500/40 text-amber-400" },
            { title: "3. Obstacle Crossing Protocol", desc: "While negotiating ramps, spider webs, and wooden high walls, the snake must never touch the earth or loop under the barrier. At least three candidates must carry it during climbing.", color: "border-emerald-500/40 text-emerald-400" },
            { title: "4. Supporting Weak Teammates", desc: "If a shorter or physically exhausted cadet stumbles, strong candidates must hoist them over the wooden wall before crossing themselves. Team victory supersedes individual speed.", color: "border-sky-500/40 text-sky-400" }
          ].map((item, idx) => (
            <div key={idx} className={`bg-[#0A192F] border ${item.color.split(' ')[0]} rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-4`}>
              <h3 className={`text-lg font-black uppercase ${item.color.split(' ')[1]}`}>{item.title}</h3>
              <p className="text-xs sm:text-sm text-gray-200 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Major Obstacles on Snake Course */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider border-b border-slate-800 pb-4">
            🐍 Snake Race Hurdles Sequence
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm font-medium">
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 text-gray-300">
              <strong className="text-amber-400 uppercase block pb-1">1. Wooden Ramp &amp; Ditch</strong>
              Sprint in tight formation up the incline and coordinate double feet landing across the introductory trench.
            </div>
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 text-gray-300">
              <strong className="text-sky-400 uppercase block pb-1">2. Spider Web Rope Net</strong>
              Pass the snake carefully through designated upper netting holes while helping cadets weave through without tangling.
            </div>
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 text-gray-300">
              <strong className="text-emerald-400 uppercase block pb-1">3. Parallel High Walls</strong>
              Hoist the first two athletic cadets to anchor the top ledge, hoist the snake up, and lift remaining members from below.
            </div>
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 text-gray-300">
              <strong className="text-rose-400 uppercase block pb-1">4. Giant Cement Pipe Crawl</strong>
              Two candidates rush ahead to pull the snake through the darkened cylinder while rear members push forward.
            </div>
          </div>
        </div>

        {/* AI Simulator Engine */}
        <SnakeRaceAiSimulator />

        {/* WhatsApp Banner */}
        <div className="bg-gradient-to-r from-[#0A192F] to-[#112240] border border-[#1A2E4C] rounded-3xl p-8 sm:p-10 text-center max-w-4xl mx-auto space-y-5 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-black text-white uppercase">Ready for Real ISSB Competition?</h3>
          <p className="text-xs sm:text-sm text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Get expert outdoor training tips and teamwork guidance directly on WhatsApp from Engineer Yasin!
          </p>
          <div className="pt-2">
            <a
              href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-2xl transition-all border border-emerald-400/20"
            >
              <MessageCircle className="w-5 h-5 fill-current" /> Join Official Group ➔
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
