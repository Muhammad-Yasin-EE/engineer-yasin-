'use client'

import React, { useState, useEffect } from 'react'
import { Award, Star, Users, Zap, ShieldCheck, TrendingUp } from 'lucide-react'

export default function LiveTrustTicker() {
  const [tickerIndex, setTickerIndex] = useState(0)

  const testimonials = [
    { text: '"Selected in PMA 154 Long Course! Engineer Yasin\'s WAT battery built my projection room confidence."', author: 'Capt Ahmad (Lahore)', rating: 5, badge: '🛡️ PMA RECOMMENDED' },
    { text: '"Recommended by ISSB Gujranwala on 1st attempt! The solved intelligence cheat sheet is unbeatable."', author: 'Cadet Bilal (Rawalpindi)', rating: 5, badge: '✈️ PAF GD PILOT' },
    { text: '"Cleared Navy Initial test with top 5 percentile speed after drilling daily timed mock sessions!"', author: 'Midshipman Usman (Karachi)', rating: 5, badge: '⚓ PN CADET' },
    { text: '"The 9th-second audio alarm training completely eradicated my exam nervousness in Kohat hall."', author: 'Officer Candidate Zain (Peshawar)', rating: 5, badge: '🛡️ ARMY TCC' }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  const current = testimonials[tickerIndex]

  return (
    <div className="bg-[#060D1A] border-y border-[#1A2E4C] py-3 px-4 sm:px-6 text-white text-xs overflow-hidden shadow-inner">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        
        {/* Left Live Pulse Counter */}
        <div className="flex items-center gap-2.5 bg-slate-900/90 px-3.5 py-1.5 rounded-full border border-slate-800 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
          <span className="font-extrabold text-white text-[11px] uppercase tracking-wider flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-emerald-400" /> 2,480+ Pakistani Candidates Practicing Online
          </span>
        </div>

        {/* Center Looping Testimonial Ticker */}
        <div className="min-w-0 flex-1 px-2 transition-opacity duration-500">
          <div className="flex items-center justify-center sm:justify-end gap-2 flex-wrap text-[11px]">
            <span className="px-2 py-0.5 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] font-black uppercase text-[10px]">
              {current.badge}
            </span>
            <span className="flex text-amber-400">
              {'★'.repeat(current.rating)}
            </span>
            <span className="text-gray-200 font-medium italic truncate max-w-md sm:max-w-xl">
              {current.text}
            </span>
            <span className="text-emerald-400 font-black shrink-0">
              — {current.author}
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}
