'use client'

import Link from 'next/link'
import { militaryEquivalentRanks } from '@/lib/data/issbPrepData'
import { ArrowLeft, MessageCircle, Shield, Award, Star } from 'lucide-react'

export default function MilitaryRanksPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-[#B8212E] selection:text-white pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 max-w-4xl">
          <Link href="/issb" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Return to ISSB Portal
          </Link>
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#D4AF37] block">
            Official Military General Knowledge & Interview Prep
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight uppercase">
            Armed Forces <span className="text-emerald-400">Equivalent Ranks</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 font-medium leading-relaxed max-w-3xl">
            Essential commissioning knowledge for Deputy President (DP) interview and GTO basic military orientation. Memorize comparative officer rank equivalence across Pakistan Army, Navy, and Air Force.
          </p>
        </div>

        {/* Comparison Table Card */}
        <div className="bg-[#0A192F] border border-[#1A2E4C] rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-6">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-[#D4AF37]" />
              <h2 className="text-lg sm:text-2xl font-black text-white uppercase tracking-wider">
                Commissioned Officers Equivalence Chart
              </h2>
            </div>
            <span className="text-xs font-black px-3 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-full uppercase tracking-widest">
              Official Protocol
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-slate-800 text-xs sm:text-sm font-black uppercase tracking-wider text-[#D4AF37] bg-slate-900/60">
                  <th className="py-4 px-6 rounded-l-2xl">Pakistan Army</th>
                  <th className="py-4 px-6">Pakistan Navy</th>
                  <th className="py-4 px-6">Pakistan Air Force</th>
                  <th className="py-4 px-6 rounded-r-2xl text-emerald-400">Insignia / Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-bold text-xs sm:text-sm text-gray-200">
                {militaryEquivalentRanks.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-4 px-6 font-black text-white">{item.army}</td>
                    <td className="py-4 px-6 text-emerald-300">{item.navy}</td>
                    <td className="py-4 px-6 text-sky-300">{item.airForce}</td>
                    <td className="py-4 px-6 text-gray-400 font-medium text-xs flex items-center gap-2">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-current shrink-0" /> {item.stars}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-[#0A192F] to-[#112240] border border-[#1A2E4C] rounded-3xl p-8 sm:p-10 text-center max-w-4xl mx-auto space-y-5 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-black text-white uppercase">Want More Military Interview Notes?</h3>
          <p className="text-xs sm:text-sm text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Join Engineer Yasin&apos;s candidate community to access official interview booklets, bio-data PIF templates, and general knowledge capsules!
          </p>
          <div className="pt-2">
            <a
              href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-2xl transition-all border border-emerald-400/20"
            >
              <MessageCircle className="w-5 h-5 fill-current" /> Get Interview Booklets on WhatsApp ➔
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
