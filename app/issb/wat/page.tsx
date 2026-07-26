'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { watSets } from '@/lib/data/watData'
import { ArrowLeft, Brain, Clock, Volume2, ShieldCheck, Sparkles, Search, CheckCircle2, ChevronRight, FileText, Download, Target, Award } from 'lucide-react'

export default function WatIndexPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSets = watSets.filter(set => 
    set.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    set.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    set.id.includes(searchQuery)
  )

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-[#B8212E] selection:text-white pb-24 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-[#B8212E]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Luxury Header Banner */}
      <header className="border-b border-slate-800 bg-[#060D1A]/95 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8 shadow-2xl relative z-10">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Link 
              href="/issb" 
              className="inline-flex items-center gap-2 text-xs uppercase font-black tracking-widest text-[#D4AF37] hover:text-amber-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to ISSB Portal
            </Link>

            <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 py-2 px-4 rounded-full shadow-inner">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-black uppercase tracking-wider text-gray-300">15 Real-Time Batteries • 1,500 Words</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6 pt-2">
            <Image src="/logo.jpg" alt="Engineer Yasin Logo" width={72} height={72} className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border-2 border-[#D4AF37] object-cover shadow-2xl shrink-0" />
            <div className="space-y-1">
              <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#D4AF37] block">Engineer Yasin Official Prep</span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Word Association Test <span className="text-emerald-400">(WAT) Directory</span>
              </h1>
            </div>
          </div>

          <p className="text-xs sm:text-base text-gray-300 max-w-3xl font-medium leading-relaxed">
            Attempt official real-time psychological testing in full-window projector mode. Each set contains exactly <strong className="text-white font-black">100 curated stimulus words</strong> with automatic slide switching and high-intensity audio alarms.
          </p>

          {/* Feature Highlight Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-black uppercase tracking-wider text-gray-300">
            <span className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 flex items-center gap-1.5 shadow-sm">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" /> Official 10s Timer Per Word
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-rose-400 flex items-center gap-1.5 shadow-sm">
              <Volume2 className="w-4 h-4 text-rose-400 shrink-0" /> Air Horn Hooter Audio Enabled
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[#D4AF37] flex items-center gap-1.5 shadow-sm">
              <Award className="w-4 h-4 text-[#D4AF37] shrink-0" /> 100% Free Practice
            </span>
          </div>

        </div>
      </header>

      {/* Main Content & Responsive Card Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-10 relative z-10">
        
        {/* Search & Filtering Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search test set number or syllabus topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors font-medium shadow-inner"
            />
          </div>

          <div className="text-xs font-black text-gray-400 uppercase tracking-widest w-full sm:w-auto text-center sm:text-right">
            Showing <span className="text-[#D4AF37] font-bold">{filteredSets.length}</span> of 15 Test Batteries
          </div>
        </div>

        {/* ── RESPONSIVE PREMIUM MILITARY CARD GRID ── */}
        {filteredSets.length === 0 ? (
          <div className="p-16 bg-slate-900/50 border border-slate-800 rounded-3xl text-center text-gray-400 text-base font-medium">
            No test battery matches your search query. Try searching for &quot;Set&quot; or a number from 01 to 15.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSets.map((set) => (
              <div
                key={set.id}
                className="bg-[#0A192F]/90 border border-[#1A2E4C] hover:border-[#D4AF37]/60 rounded-3xl p-6 sm:p-7 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group h-full relative overflow-hidden"
              >
                {/* Decorative background glow on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-xl group-hover:bg-[#D4AF37]/15 transition-all pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between gap-2">
                    <span className="w-12 h-12 rounded-2xl bg-slate-950 text-[#D4AF37] font-black text-lg flex items-center justify-center border border-[#233554] shadow-md group-hover:scale-105 transition-transform shrink-0">
                      #{set.id}
                    </span>
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-extrabold text-xs rounded-full uppercase tracking-wider shrink-0">
                      100 Words
                    </span>
                  </div>
                  
                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs font-black uppercase tracking-widest text-[#D4AF37] block">
                      {set.subtitle}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-emerald-400 transition-colors leading-snug">
                      {set.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">
                    {set.description}
                  </p>

                  {/* Feature Breakdown Badges */}
                  <div className="pt-2 flex items-center gap-2 flex-wrap text-[11px] font-extrabold">
                    <span className="px-2.5 py-1 bg-slate-950/80 rounded-lg text-emerald-300 border border-slate-800">
                      ⚡ 100 Words Battery
                    </span>
                    <span className="px-2.5 py-1 bg-slate-950/80 rounded-lg text-amber-300 border border-slate-800">
                      ⏱️ 10s Slide Transition
                    </span>
                  </div>
                </div>

                <div className="pt-6 relative z-10">
                  <Link
                    href={`/issb/wat/${set.id}`}
                    className="w-full py-4 bg-[#B8212E] hover:bg-[#961a25] active:scale-95 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl shadow-lg hover:shadow-rose-900/40 transition-all flex items-center justify-center gap-2"
                  >
                    🚀 Launch Projection Battery <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Officer Guidance Banner */}
        <div className="bg-gradient-to-r from-[#0A192F] via-[#112240] to-[#0A192F] border border-[#233554] rounded-3xl p-8 sm:p-10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 max-w-3xl">
            <span className="px-3.5 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 text-[11px] font-black uppercase tracking-widest inline-block mb-1">
              ⭐ Exclusive Assessor Notes
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center justify-center sm:justify-start gap-2.5">
              <Brain className="w-6 h-6 text-[#D4AF37] shrink-0" /> Need Solved WAT Sentence Booklets &amp; Guidance?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">
              Engineer Yasin provides comprehensive solved 500+ sentence construction booklets featuring optimism training, leader attributes, and self-evaluation checklists. Text directly on WhatsApp for your personal copy.
            </p>
          </div>

          <a
            href="https://wa.me/923116826552?text=Hello%20Engineer%20Yasin,%20please%20send%20me%20Solved%20WAT%20Notes%20and%20Guidance!"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-xs sm:text-sm rounded-2xl uppercase tracking-widest shadow-xl hover:shadow-emerald-900/40 transition-all flex items-center justify-center gap-2.5 shrink-0 w-full sm:w-auto"
          >
            📥 Get Solved Notes on WhatsApp ➔
          </a>
        </div>

      </main>
    </div>
  )
}
