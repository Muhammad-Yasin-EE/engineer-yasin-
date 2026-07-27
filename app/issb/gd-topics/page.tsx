'use client'

import { useState } from 'react'
import Link from 'next/link'
import { gdAndLecturateTopics, GdTopic } from '@/lib/data/issbPrepData'
import { ArrowLeft, MessageCircle, Search, Users, Mic, Award, Shield, Check } from 'lucide-react'

export default function GdTopicsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const categories = ['all', 'National / Political', 'Social / General', 'International / Strategic', 'Abstract / Philosophical']

  const filteredTopics = gdAndLecturateTopics.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch = item.topic.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-[#B8212E] selection:text-white pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-10">
        
        {/* Header */}
        <div className="space-y-4 max-w-4xl">
          <Link href="/issb" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Return to ISSB Portal
          </Link>
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#D4AF37] block">
            GTO Indoor & Outdoor Testing Tasks
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight uppercase">
            Group Discussion & <span className="text-emerald-400">Lecturating Topics</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 font-medium leading-relaxed max-w-3xl">
            Complete official repository of 92 high-frequency GD and Lecturate topics tested during ISSB Day 2 and Day 3 GTO sessions. Prepare solid facts, polite conversational arguments, and assertive delivery.
          </p>
        </div>

        {/* Top Feature Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-[#0A192F] border border-[#1A2E4C] rounded-2xl p-5">
            <span className="text-2xl font-black text-white block">92 Topics</span>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Official Repository</span>
          </div>
          <div className="bg-[#0A192F] border border-[#1A2E4C] rounded-2xl p-5">
            <span className="text-2xl font-black text-emerald-400 block">Leaderless GD</span>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Group Dynamic Evaluation</span>
          </div>
          <div className="bg-[#0A192F] border border-[#1A2E4C] rounded-2xl p-5">
            <span className="text-2xl font-black text-amber-400 block">3 Min Lecturate</span>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Individual Expression</span>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="space-y-6 bg-[#0A192F] border border-[#1A2E4C] p-6 rounded-3xl shadow-xl">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search topics (e.g., IMF, CPEC, Education, Corruption, Jihad)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-900 border border-slate-800 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors font-medium"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                    : 'bg-slate-900 text-gray-400 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat === 'all' ? '🌐 All Topics (92)' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Topics List */}
        <div className="space-y-3">
          <div className="text-xs font-black uppercase tracking-wider text-gray-400 px-2">
            Showing {filteredTopics.length} of 92 Official Topics
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTopics.map((item) => (
              <div
                key={item.id}
                className="bg-[#0A192F] border border-[#1A2E4C] hover:border-emerald-500/50 rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase px-2.5 py-1 rounded bg-slate-900 text-amber-400 border border-slate-800">
                      Topic #{item.id}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                    {item.topic}
                  </h3>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-gray-400 font-medium">
                  <span className="flex items-center gap-1 text-[11px]">
                    <Mic className="w-3.5 h-3.5 text-emerald-400" /> Suitable for GD & Lecturate
                  </span>
                  <span className="text-[11px] font-extrabold text-[#D4AF37] uppercase">High Yield</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Call to Action */}
        <div className="bg-gradient-to-r from-[#0A192F] to-[#112240] border border-[#1A2E4C] rounded-3xl p-8 sm:p-10 text-center max-w-4xl mx-auto space-y-5 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-black text-white uppercase">Want Group Discussion Model Arguments?</h3>
          <p className="text-xs sm:text-sm text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Join Engineer Yasin&apos;s live candidate discussions on WhatsApp to exchange points on national policies, strategic security, and socioeconomic solutions!
          </p>
          <div className="pt-2">
            <a
              href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-2xl transition-all border border-emerald-400/20"
            >
              <MessageCircle className="w-5 h-5 fill-current" /> Join Live GD Sessions on WhatsApp ➔
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
