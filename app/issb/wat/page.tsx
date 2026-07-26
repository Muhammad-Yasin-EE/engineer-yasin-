'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { watSets } from '@/lib/data/watData'
import { ArrowLeft, Brain, Clock, Volume2, ShieldCheck, Sparkles, Search, CheckCircle2, ChevronRight, FileText, Download } from 'lucide-react'

export default function WatIndexPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSets = watSets.filter(set => 
    set.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    set.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    set.id.includes(searchQuery)
  )

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-[#B8212E] selection:text-white pb-24">
      
      {/* Top Minimalist Luxury Header */}
      <header className="border-b border-slate-800/80 bg-[#060D1A]/90 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8 shadow-xl">
        <div className="max-w-5xl mx-auto space-y-6">
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Link 
              href="/issb" 
              className="inline-flex items-center gap-2 text-xs uppercase font-black tracking-widest text-[#D4AF37] hover:text-amber-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to ISSB Portal
            </Link>

            <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 py-1.5 px-4 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] font-black uppercase tracking-wider text-gray-300">15 Real-Time Batteries • 1,500 Words</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6 pt-2">
            <Image src="/logo.jpg" alt="Engineer Yasin Logo" width={64} height={64} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-[#D4AF37] object-cover shadow-2xl shrink-0" />
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#D4AF37] block mb-1">Engineer Yasin Official Prep</span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Word Association Test <span className="text-emerald-400">(WAT) Directory</span>
              </h1>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl font-medium leading-relaxed">
            Attempt real-time psychological tests in full-window projection cinema mode. Each test features exactly <strong className="text-white font-black">100 curated stimulus words</strong> with automatic 10-second transitions and audio warning alarms.
          </p>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-8">
        
        {/* Top Control Bar: Search & Quick Guide */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search test number or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors font-medium"
            />
          </div>

          <div className="flex items-center gap-4 text-xs font-black uppercase tracking-wider text-gray-400 shrink-0">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Clock className="w-4 h-4" /> 10s Timer
            </span>
            <span className="flex items-center gap-1.5 text-rose-400">
              <Volume2 className="w-4 h-4" /> 9s Audio Siren
            </span>
            <span className="text-amber-400">
              ⭐ 100% Free
            </span>
          </div>
        </div>

        {/* ── SLEEK EXECUTIVE TABLE / LIST DIRECTORY ── */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl divide-y divide-slate-800/80">
          <div className="px-5 sm:px-6 py-4 bg-[#0A192F] flex items-center justify-between text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-800">
            <span>Test Battery Name &amp; Syllabus</span>
            <span className="hidden sm:inline-block">Difficulty Pool</span>
            <span>Action</span>
          </div>

          {filteredSets.length === 0 ? (
            <div className="p-12 text-center text-gray-400 text-sm">
              No test battery matches your search query. Try another keyword or number.
            </div>
          ) : (
            filteredSets.map((set, idx) => (
              <div
                key={set.id}
                className="p-4 sm:p-5 lg:px-6 flex items-center justify-between gap-4 hover:bg-slate-800/50 transition-colors duration-150 group"
              >
                <div className="flex items-center gap-3.5 sm:gap-5 min-w-0 flex-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-slate-950 text-[#D4AF37] font-black text-sm sm:text-base flex items-center justify-center border border-slate-800 shadow-md group-hover:border-[#D4AF37]/50 transition-all shrink-0">
                    #{set.id}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-emerald-400 block truncate">
                        {set.subtitle}
                      </span>
                      <span className="text-[10px] font-bold text-gray-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 shrink-0 hidden md:inline-block">
                        100 Words
                      </span>
                    </div>
                    
                    <h3 className="text-sm sm:text-base lg:text-lg font-black text-white group-hover:text-emerald-400 transition-colors leading-snug truncate">
                      {set.title}
                    </h3>

                    <p className="text-[11px] text-gray-400 truncate hidden sm:block font-medium mt-0.5 max-w-xl">
                      {set.description}
                    </p>
                  </div>
                </div>

                <div className="hidden lg:flex items-center gap-1.5 text-[10px] font-bold text-gray-400 shrink-0">
                  <span className="px-2 py-1 bg-slate-950 rounded-md text-emerald-300 border border-slate-800">50 Basic</span>
                  <span className="px-2 py-1 bg-slate-950 rounded-md text-amber-300 border border-slate-800">30 Action</span>
                  <span className="px-2 py-1 bg-slate-950 rounded-md text-rose-300 border border-slate-800">20 Stress</span>
                </div>

                <Link
                  href={`/issb/wat/${set.id}`}
                  className="px-4 sm:px-6 py-3 bg-[#B8212E] hover:bg-[#961a25] active:scale-95 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-rose-900/30 transition-all shrink-0 flex items-center gap-1.5"
                >
                  🚀 Launch <span className="hidden xs:inline">Test</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))
          )}
        </div>

        {/* Bottom Officer Guidance Box */}
        <div className="bg-gradient-to-r from-[#0A192F] via-[#112240] to-[#0A192F] border border-[#233554] rounded-3xl p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-base sm:text-lg font-black text-[#D4AF37] uppercase tracking-wider flex items-center justify-center sm:justify-start gap-2">
              <Brain className="w-5 h-5 text-[#D4AF37]" /> Need Solved WAT Sentence Formats &amp; Guidance?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">
              Engineer Yasin provides complete solved 500+ sentence construction booklets with optimism training and self-evaluation checklists. Text directly on WhatsApp for your copy.
            </p>
          </div>

          <a
            href="https://wa.me/923116826552?text=Hello%20Engineer%20Yasin,%20please%20send%20me%20Solved%20WAT%20Notes%20and%20Guidance!"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-xs sm:text-sm rounded-2xl uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2.5 shrink-0 w-full sm:w-auto"
          >
            📥 Get Free Solved Notes ➔
          </a>
        </div>

      </main>
    </div>
  )
}
