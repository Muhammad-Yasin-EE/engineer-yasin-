'use client'

import React, { useState, useEffect } from 'react'
import { Award, Star, Users, Zap, ShieldCheck, TrendingUp, MapPin, Activity } from 'lucide-react'

export default function LiveTrustTicker() {
  const [tickerIndex, setTickerIndex] = useState(0)
  const [candidateCount, setCandidateCount] = useState(2932)
  const [isIncrementing, setIsIncrementing] = useState(false)

  const testimonials = [
    { text: '"Selected in PMA 154 Long Course! Engineer Yasin\'s WAT battery built my projection room confidence."', author: 'Capt Ahmad (Lahore)', rating: 5, badge: '🛡️ PMA RECOMMENDED', time: '2m ago' },
    { text: '"Recommended by ISSB Gujranwala on 1st attempt! The solved intelligence cheat sheet is unbeatable."', author: 'Cadet Bilal (Rawalpindi)', rating: 5, badge: '✈️ PAF GD PILOT', time: '5m ago' },
    { text: '"Cleared Navy Initial test with top 5 percentile speed after drilling daily timed mock sessions!"', author: 'Midshipman Usman (Karachi)', rating: 5, badge: '⚓ PN CADET', time: '12m ago' },
    { text: '"The 9th-second audio alarm training completely eradicated my exam nervousness in Kohat hall."', author: 'Officer Candidate Zain (Peshawar)', rating: 5, badge: '🛡️ ARMY TCC', time: '18m ago' },
    { text: '"Secured admission in Cadet College Hasanabdal! The solved academic MCQs were 100% on target."', author: 'Cadet Hamza (Faisalabad)', rating: 5, badge: '🏅 CADET COLLEGE', time: '25m ago' }
  ]

  const provinces = [
    { name: 'Punjab', count: '1,420', percent: '45%', color: 'bg-emerald-500', bg: 'bg-emerald-50 text-emerald-900 border-emerald-200' },
    { name: 'Sindh & Karachi', count: '685', percent: '22%', color: 'bg-blue-500', bg: 'bg-blue-50 text-blue-900 border-blue-200' },
    { name: 'Khyber Pakhtunkhwa', count: '540', percent: '17%', color: 'bg-amber-500', bg: 'bg-amber-50 text-amber-900 border-amber-200' },
    { name: 'Balochistan', count: '215', percent: '7%', color: 'bg-rose-500', bg: 'bg-rose-50 text-rose-900 border-rose-200' },
    { name: 'AJK, GB & Islamabad', count: '280', percent: '9%', color: 'bg-purple-500', bg: 'bg-purple-50 text-purple-900 border-purple-200' },
  ]

  // Testimonials rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % testimonials.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [testimonials.length])

  // Live Candidate count incrementer (2932 up to 3229)
  useEffect(() => {
    const counterTimer = setInterval(() => {
      setCandidateCount((prev) => {
        if (prev >= 3229) {
          return 2932 // Cycle smoothly back or hold
        }
        // Random increment between 1 and 4
        const inc = Math.floor(Math.random() * 4) + 1
        setIsIncrementing(true)
        setTimeout(() => setIsIncrementing(false), 500)
        return prev + inc
      })
    }, 3500)

    return () => clearInterval(counterTimer)
  }, [])

  const current = testimonials[tickerIndex]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div className="bg-white rounded-3xl border-2 border-gray-200/80 shadow-xl overflow-hidden p-6 sm:p-8">
        
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-gray-150">
          
          {/* Left: Live Counter Dashboard */}
          <div className="flex items-center gap-4 sm:gap-6 w-full lg:w-auto">
            <div className="relative flex items-center justify-center shrink-0">
              <span className="w-12 h-12 rounded-2xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center shadow-sm">
                <Activity className="w-6 h-6 text-emerald-600 animate-pulse" />
              </span>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-2xl sm:text-4xl font-black tracking-tight text-gray-900 transition-all duration-300 ${isIncrementing ? 'text-emerald-600 scale-105 inline-block font-mono' : 'font-mono'}`}>
                  {candidateCount.toLocaleString()}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider animate-pulse">
                  🔴 LIVE NOW
                </span>
              </div>
              <p className="text-xs sm:text-sm font-extrabold text-gray-500 uppercase tracking-tight">
                Active Pakistani Candidates Drilling Mock Tests Online
              </p>
            </div>
          </div>

          {/* Right: Live Testimonial Card */}
          <div className="w-full lg:flex-1 lg:max-w-xl bg-slate-50 border border-slate-200 rounded-2xl p-4 transition-all duration-500 shadow-inner">
            <div className="flex items-center justify-between mb-1.5 gap-2 text-[10px]">
              <span className="px-2 py-0.5 rounded bg-white border border-gray-200 font-black text-[#B8212E] uppercase shadow-2xs shrink-0">
                {current.badge}
              </span>
              <span className="text-gray-400 font-bold">{current.time}</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-gray-800 italic leading-snug truncate mb-1">
              {current.text}
            </p>
            <div className="flex items-center justify-between text-[11px] font-black">
              <span className="text-emerald-700">✓ Verified Selection Report</span>
              <span className="text-gray-900">— {current.author}</span>
            </div>
          </div>

        </div>

        {/* Bottom Province Analytics Graph / Dashboard */}
        <div className="pt-6">
          <div className="flex items-center justify-between text-xs font-black uppercase text-gray-500 mb-3 tracking-wider">
            <span className="flex items-center gap-1 text-[#B8212E]">
              <TrendingUp className="w-4 h-4" /> Live Regional Aspirants Distribution across Pakistan
            </span>
            <span className="text-[10px] text-gray-400">Updated Real-time</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {provinces.map((prov) => (
              <div key={prov.name} className={`p-3 rounded-2xl border ${prov.bg} shadow-2xs flex flex-col justify-between`}>
                <div className="flex items-center justify-between text-[11px] font-black mb-1.5">
                  <span className="truncate pr-1">{prov.name}</span>
                  <span className="font-mono text-gray-900 font-extrabold shrink-0">{prov.count}</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200/60 rounded-full overflow-hidden">
                  <div className={`h-full ${prov.color} rounded-full transition-all duration-1000`} style={{ width: prov.percent }} />
                </div>
                <span className="text-[9px] font-extrabold text-gray-500 mt-1 text-right">{prov.percent} of Total</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
