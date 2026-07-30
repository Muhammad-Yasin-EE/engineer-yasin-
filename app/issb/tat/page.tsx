'use client'

import { useState } from 'react'
import Link from 'next/link'
import { tatScenarios, TatScene } from '@/lib/data/issbRemainingData'
import { ArrowLeft, MessageCircle, Eye, Shield, CheckCircle2, Award, Clock, BookOpen } from 'lucide-react'

export default function TatHubPage() {
  const [selectedScene, setSelectedScene] = useState<TatScene | null>(tatScenarios[0])

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-[#B8212E] selection:text-white pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 max-w-4xl">
          <Link href="/issb" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Return to ISSB Portal
          </Link>
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-emerald-400 block">
            Official ISSB Psychological Selection Tests
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight uppercase">
            Picture Story <span className="text-amber-400">Writing (TAT)</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 font-medium leading-relaxed max-w-3xl">
            In Thematic Apperception Test (TAT), candidates observe black-and-white ambiguous character scenes for 30 seconds, then formulate a constructive hero-oriented action narrative within 3.5 minutes.
          </p>
          <div className="pt-2">
            <Link href="/issb/tat/ai-practice" className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#B8212E] hover:bg-[#961a25] text-white font-black rounded-xl text-sm uppercase tracking-widest shadow-lg shadow-rose-900/20 transition-all active:scale-95">
              🚀 Launch AI Simulator
            </Link>
          </div>
        </div>

        {/* Official Criteria Pills */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-wider">
          <span className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-emerald-400 shrink-0" /> 30s View / 3.5 Min Writing
          </span>
          <span className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400 shrink-0" /> 4-Part Narrative Structure
          </span>
          <span className="px-4 py-2 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-sky-400 shrink-0" /> Officer Leadership Traits
          </span>
        </div>

        {/* Scenarios Grid & Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Scene Selection List (Left Column) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-gray-400 px-1">
              Select Official Practice Scene
            </h3>
            {tatScenarios.map((scene) => (
              <button
                key={scene.id}
                onClick={() => setSelectedScene(scene)}
                className={`w-full text-left p-5 sm:p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between space-y-3 shadow-xl ${
                  selectedScene?.id === scene.id
                    ? 'bg-gradient-to-r from-slate-900 to-emerald-950/40 border-emerald-500 shadow-emerald-900/30 scale-[1.02]'
                    : 'bg-[#0A192F] hover:bg-slate-900 border-[#1A2E4C] text-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-slate-950 text-amber-400 border border-slate-800">
                    Scene #{scene.id}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-400 uppercase">
                    {scene.theme.split('&')[0]}
                  </span>
                </div>
                {scene.imageUrl && (
                  <div className="relative w-full h-36 sm:h-44 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/80 my-2">
                    <img
                      src={scene.imageUrl}
                      alt={scene.title}
                      className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <h4 className="text-base sm:text-lg font-extrabold text-white leading-snug">
                  {scene.title}
                </h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {scene.idealOfficerQualities.map((q, i) => (
                    <span key={i} className="text-[10px] font-semibold bg-slate-900 px-2 py-0.5 rounded text-gray-400 border border-slate-800">
                      #{q}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          {/* Model Officer Story Display (Right Column) */}
          {selectedScene && (
            <div className="lg:col-span-7 bg-[#0A192F]/90 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl space-y-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-4 relative z-10 border-b border-slate-800 pb-6">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black uppercase rounded-lg">
                    Model Officer Solution
                  </span>
                  <span className="text-xs font-bold text-gray-400 flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-emerald-400" /> Observation Target: 30s
                  </span>
                </div>
                {selectedScene.imageUrl && (
                  <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-3xl overflow-hidden border border-emerald-500/40 bg-slate-950 shadow-2xl p-3 flex items-center justify-center">
                    <img
                      src={selectedScene.imageUrl}
                      alt={selectedScene.title}
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                )}
                <h2 className="text-2xl sm:text-3xl font-black text-white uppercase pt-2">
                  {selectedScene.title}
                </h2>
                <p className="text-xs sm:text-sm text-sky-200 bg-sky-950/40 p-4 rounded-2xl border border-sky-500/20 font-medium italic">
                  &ldquo;{selectedScene.description}&rdquo;
                </p>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="space-y-2 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
                  <span className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    1️⃣ Past / Background Context:
                  </span>
                  <p className="text-xs sm:text-sm text-gray-200 font-medium leading-relaxed">
                    {selectedScene.sampleStory.background}
                  </p>
                </div>

                <div className="space-y-2 bg-emerald-950/30 border border-emerald-500/30 p-5 rounded-2xl">
                  <span className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    2️⃣ Current Constructive Action (Hero Role):
                  </span>
                  <p className="text-xs sm:text-sm text-white font-bold leading-relaxed">
                    {selectedScene.sampleStory.currentAction}
                  </p>
                </div>

                <div className="space-y-2 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
                  <span className="text-xs font-black text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                    3️⃣ Positive Resolution &amp; Outcome:
                  </span>
                  <p className="text-xs sm:text-sm text-gray-200 font-medium leading-relaxed">
                    {selectedScene.sampleStory.positiveOutcome}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 relative z-10 flex items-center justify-between text-xs text-gray-400 font-extrabold uppercase">
                <span>🛡️ Assessed Qualities: {selectedScene.idealOfficerQualities.join(', ')}</span>
                <span className="text-emerald-400">Official Standard ✓</span>
              </div>
            </div>
          )}

        </div>

        {/* WhatsApp Evaluation Banner */}
        <div className="bg-gradient-to-r from-[#0A192F] to-[#112240] border border-[#1A2E4C] rounded-3xl p-8 sm:p-10 text-center max-w-4xl mx-auto space-y-5 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-black text-white uppercase">Want Your TAT Stories Evaluated?</h3>
          <p className="text-xs sm:text-sm text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Write your spontaneous picture stories on an answer copy and share them directly on WhatsApp with Engineer Yasin for detailed psychological feedback!
          </p>
          <div className="pt-2">
            <a
              href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-2xl transition-all border border-emerald-400/20"
            >
              <MessageCircle className="w-5 h-5 fill-current" /> Send Stories on WhatsApp ➔
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
