'use client'

import React, { useState } from 'react'
import { Shield, CheckCircle2, XCircle, ChevronRight, MessageCircle, Sparkles, UserCheck, HelpCircle, ArrowRight } from 'lucide-react'

export default function EligibilityCalculator() {
  const [age, setAge] = useState<number>(19)
  const [education, setEducation] = useState<'matric' | 'fsc' | 'bs' | 'mbbs'>('fsc')
  const [percentage, setPercentage] = useState<number>(65)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [heightFeet, setHeightFeet] = useState<number>(5)
  const [heightInches, setHeightInches] = useState<number>(6)

  const totalInches = heightFeet * 12 + heightInches

  // Calculate matching Armed Forces Branches
  const getMatches = () => {
    const results = []

    // PMA Long Course (Male, FSC 60%+, Age 17-22, Height 5'4" = 64 inches)
    if (gender === 'male' && (education === 'fsc' || education === 'bs') && percentage >= 60 && age >= 17 && age <= 24 && totalInches >= 64) {
      results.push({
        branch: 'Pak Army',
        course: 'PMA Long Course (Commissioned Officer)',
        badge: '🛡️ PAK ARMY',
        desc: '4-Year training at Pakistan Military Academy, Kakul leading to Captain rank.',
        bg: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-300',
        active: true
      })
    }

    // PAF GD Pilot (Male/Female, FSC Pre-Eng/Medical 60%+, Age 16-22, Height 5'4" for male, 5'2" for female)
    if ((education === 'fsc' || education === 'bs') && percentage >= 60 && age >= 16 && age <= 22 && totalInches >= (gender === 'male' ? 64 : 62)) {
      results.push({
        branch: 'Pak Air Force',
        course: 'General Duty (GD) Pilot Course',
        badge: '✈️ PAK AIR FORCE',
        desc: '3-Year Flying training at PAF Academy Asghar Khan, Risalpur as Flying Officer.',
        bg: 'border-blue-500/30 bg-blue-500/5 text-blue-300',
        active: true
      })
    }

    // PN Cadet (Male, FSC Pre-Eng/ICS 60%+, Age 17-22, Height 5'4")
    if (gender === 'male' && (education === 'fsc' || education === 'bs') && percentage >= 60 && age >= 17 && age <= 23 && totalInches >= 64) {
      results.push({
        branch: 'Pak Navy',
        course: 'PN Cadet (Permanent Commission)',
        badge: '⚓ PAK NAVY',
        desc: '2-Year initial training at Pakistan Naval Academy and BS degree from Bahria University.',
        bg: 'border-indigo-500/30 bg-indigo-500/5 text-indigo-300',
        active: true
      })
    }

    // TCC / Aeronautical Engineering (Male, FSC Pre-Eng 65%+)
    if (gender === 'male' && education === 'fsc' && percentage >= 65 && age >= 17 && age <= 21 && totalInches >= 64) {
      results.push({
        branch: 'Technical / Eng',
        course: 'Army TCC & PAF Aeronautical Engineering',
        badge: '⚙️ TECHNICAL CADET',
        desc: 'Full BE degree from NUST / CAE with regular military officer commission.',
        bg: 'border-amber-500/30 bg-amber-500/5 text-amber-300',
        active: true
      })
    }

    // AFNS (Female Nursing Commission, FSC Medical 50%+, Age 17-25, Height 5'0" = 60 inches)
    if (gender === 'female' && (education === 'fsc' || education === 'bs') && percentage >= 50 && age >= 17 && age <= 25 && totalInches >= 60) {
      results.push({
        branch: 'Medical / Army',
        course: 'AFNS (Armed Forces Nursing Service Commission)',
        badge: '🩺 AFNS COMMISSION',
        desc: 'BSc Nursing at CMH and direct commissioning as Lieutenant.',
        bg: 'border-rose-500/30 bg-rose-500/5 text-rose-300',
        active: true
      })
    }

    // DSSC / LCC (Graduates BS/BE)
    if (education === 'bs' && age >= 21 && age <= 28 && totalInches >= (gender === 'male' ? 64 : 60)) {
      results.push({
        branch: 'Direct Commission',
        course: 'DSSC & LCC (Lady Cadet Course / Short Service)',
        badge: '🎖️ DIRECT SHORT SERVICE',
        desc: '6-Month rigorous officer training for Engineers, IT Specialists, & Psychologists.',
        bg: 'border-purple-500/30 bg-purple-500/5 text-purple-300',
        active: true
      })
    }

    // Airmen / Sailor / Soldier (Matric / Low percentage)
    if (education === 'matric' || (education === 'fsc' && percentage < 60)) {
      results.push({
        branch: 'NCO / Airmen / Sailor',
        course: 'PAF Airmen (Aero Trades), Pak Navy Sailor & Army Soldier',
        badge: '🛡️ NCO / RECRUIT',
        desc: 'Fast-track career advancement across Technical and Administrative trades.',
        bg: 'border-cyan-500/30 bg-cyan-500/5 text-cyan-300',
        active: true
      })
    }

    return results
  }

  const matchedCourses = getMatches()

  return (
    <section className="bg-gradient-to-b from-[#0A192F] to-[#060D1A] border-y border-[#1A2E4C] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden shadow-2xl">
      {/* Background Decorative Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-[#D4AF37] font-extrabold text-xs uppercase tracking-widest inline-flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Viral Interactive Tool • 2025/2026 Criteria
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Armed Forces <span className="text-emerald-400">Eligibility &amp; Branch Matcher</span>
          </h2>
          <p className="text-xs sm:text-base text-gray-300 font-medium">
            Enter your age, qualification, and height below. Our smart algorithm instantly identifies every officer course you qualify for across the Pakistan Army, Navy, and Air Force.
          </p>
        </div>

        {/* Calculator Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form (Left 5 Columns) */}
          <div className="lg:col-span-5 bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#D4AF37] flex items-center gap-2 border-b border-slate-800 pb-3">
              <UserCheck className="w-4 h-4 text-[#D4AF37]" /> Candidate Credentials
            </h3>

            {/* Gender Selection */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-gray-300 uppercase block">Gender</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'male', label: '👨 Male Officer' },
                  { id: 'female', label: '👩 Female Officer / AFNS' }
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGender(g.id as 'male' | 'female')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-black transition-all border text-center truncate ${gender === g.id ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-md' : 'bg-slate-950 border-slate-800 text-gray-400 hover:text-white'}`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Education Selection */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-gray-300 uppercase block">Education Level</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'matric', label: 'Matric (10th)' },
                  { id: 'fsc', label: 'FSC / FA / ICS (12th)' },
                  { id: 'bs', label: 'Graduation (4-Y BS/BE)' },
                  { id: 'mbbs', label: 'MBBS / BDS Doctor' }
                ].map((edu) => (
                  <button
                    key={edu.id}
                    onClick={() => setEducation(edu.id as any)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border text-left transition-all ${education === edu.id ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white font-black shadow' : 'bg-slate-950 border-slate-800 text-gray-400 hover:text-white'}`}
                  >
                    {edu.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Percentage Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-extrabold text-gray-300 uppercase">
                <span>Marks Percentage:</span>
                <span className="text-amber-400 font-black text-sm">{percentage}%</span>
              </div>
              <input
                type="range"
                min="45"
                max="95"
                step="5"
                value={percentage}
                onChange={(e) => setPercentage(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-bold">
                <span>45%</span>
                <span>60% (Officer Standard)</span>
                <span>95%</span>
              </div>
            </div>

            {/* Age Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-extrabold text-gray-300 uppercase">
                <span>Current Age:</span>
                <span className="text-emerald-400 font-black text-sm">{age} Years</span>
              </div>
              <input
                type="range"
                min="16"
                max="28"
                step="1"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-bold">
                <span>16 (PMA/PAF Start)</span>
                <span>22 (PMA Limit)</span>
                <span>28 (Graduate LCC)</span>
              </div>
            </div>

            {/* Height Selectors */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-gray-300 uppercase block">Physical Height (Minimum 5&apos;4&quot; for Male Officers)</label>
              <div className="grid grid-cols-2 gap-3 text-xs font-bold">
                <div>
                  <select
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value={4}>4 Feet</option>
                    <option value={5}>5 Feet</option>
                    <option value={6}>6 Feet</option>
                  </select>
                </div>
                <div>
                  <select
                    value={heightInches}
                    onChange={(e) => setHeightInches(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(inc => (
                      <option key={inc} value={inc}>{inc} Inches</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

          </div>

          {/* Results Display (Right 7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between border-b border-[#1E3660] pb-3">
              <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Qualifying Armed Forces Careers ({matchedCourses.length})
              </h3>
              <span className="text-[11px] font-bold text-gray-400">Verified by Engineer Yasin Prep</span>
            </div>

            {matchedCourses.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-3">
                <XCircle className="w-12 h-12 text-rose-500 mx-auto" />
                <h4 className="text-base font-black text-white">No Direct Officer Matches Found</h4>
                <p className="text-xs text-gray-400 max-w-md mx-auto">
                  Please check if your percentage is above 60% or your height satisfies the 5&apos;4&quot; male / 5&apos;0&quot; female requirement. Contact Engineer Yasin for age relaxation rules.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {matchedCourses.map((m, idx) => (
                  <div key={idx} className={`p-5 rounded-3xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg ${m.bg}`}>
                    <div className="space-y-1.5 max-w-xl">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-slate-950/80 text-white border border-slate-700/60 block w-fit">
                        {m.badge}
                      </span>
                      <h4 className="text-base sm:text-lg font-black text-white leading-tight">
                        {m.course}
                      </h4>
                      <p className="text-xs text-gray-300 font-medium">
                        {m.desc}
                      </p>
                    </div>

                    <a
                      href={`https://wa.me/923116826552?text=Hello%20Engineer%20Yasin,%20I%20used%20your%20Eligibility%20Tool%20and%20qualified%20for%20${encodeURIComponent(m.course)}.%20Please%20guide%20me!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 bg-[#25D366] hover:bg-[#1EBE5D] active:scale-95 text-white text-xs font-black uppercase tracking-wider rounded-2xl shadow-xl flex items-center justify-center gap-2 shrink-0 sm:self-center transition-transform"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" /> Join Group Prep
                    </a>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-gradient-to-r from-slate-900 to-[#112240] border border-slate-800 rounded-2xl p-5 text-xs text-gray-300 font-medium flex items-center justify-between gap-4">
              <span>💡 Want to start testing your psychological WAT speed right now?</span>
              <a href="/issb" className="text-emerald-400 hover:text-emerald-300 font-black uppercase flex items-center gap-1 shrink-0">
                Go To ISSB Portal <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
