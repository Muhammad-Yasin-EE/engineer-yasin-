'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Calendar, Scale, CheckCircle2, ShieldCheck, MapPin, Phone, Mail, HelpCircle, ChevronDown, ChevronUp, AlertCircle, ExternalLink } from 'lucide-react'

export function ForcesCalculators() {
  // Age Calculator State
  const [dob, setDob] = useState('')
  const [ageResult, setAgeResult] = useState<{ years: number; months: number; days: number; status: string } | null>(null)

  // Weight Finder State
  const [feet, setFeet] = useState('5')
  const [inches, setInches] = useState('8')
  const [cm, setCm] = useState('')
  const [weightResult, setWeightResult] = useState<{ minKg: number; maxKg: number; bmiText: string } | null>(null)

  const calculateAge = () => {
    if (!dob) return
    const birthDate = new Date(dob)
    const today = new Date()
    
    let years = today.getFullYear() - birthDate.getFullYear()
    let months = today.getMonth() - birthDate.getMonth()
    let days = today.getDate() - birthDate.getDate()

    if (days < 0) {
      months -= 1
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate()
    }
    if (months < 0) {
      years -= 1
      months += 12
    }

    let status = 'Eligible for standard Civilian & Service courses.'
    if (years >= 17 && years <= 22) {
      status = '✅ FULLY ELIGIBLE for PMA Long Course, PAF GD Pilot (16-22 yrs), & PN Cadet!'
    } else if (years >= 21 && years <= 28) {
      status = '✅ ELIGIBLE for Graduate Short Service Commission (DSSC / ICTO / Education Branch)!'
    } else if (years < 17) {
      status = '⏳ Underage for Officer intake. Ideal age for Cadet Colleges test preparation!'
    } else {
      status = '⚠️ Overage for direct initial cadet intake. Consider specialized civilian or age-relaxed quotas.'
    }

    setAgeResult({ years, months, days, status })
  }

  const calculateWeight = () => {
    let heightInMeters = 0
    if (cm && !isNaN(Number(cm))) {
      heightInMeters = Number(cm) / 100
    } else {
      const totalInches = (Number(feet) * 12) + Number(inches)
      heightInMeters = totalInches * 0.0254
    }

    if (heightInMeters > 0) {
      // Standard Military BMI range: 19.5 to 24.5
      const minKg = Math.round(19.5 * (heightInMeters * heightInMeters))
      const maxKg = Math.round(24.5 * (heightInMeters * heightInMeters))
      setWeightResult({
        minKg,
        maxKg,
        bmiText: `Based on standard Armed Forces medical fitness standards (BMI 19.5 - 24.5) for high physical endurance.`
      })
    }
  }

  return (
    <div className="space-y-12 my-12">
      {/* ── DUAL INTERACTIVE TOOL CARDS ───────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        
        {/* Calculate Your Age Card */}
        <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0A192F] to-[#B8212E]" />
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0A192F] uppercase tracking-tight">
                  Calculate Your Age
                </h3>
                <p className="text-xs font-extrabold tracking-widest text-[#B8212E] uppercase mt-0.5">
                  ENGINEER YASIN ONLINE PREP PORTAL
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#0A192F]/10 flex items-center justify-center text-[#0A192F] group-hover:bg-[#0A192F] group-hover:text-white transition-colors">
                <Calendar className="w-6 h-6" />
              </div>
            </div>

            <p className="text-xs text-gray-500 font-medium mb-6">
              Enter your Date of Birth to verify exact eligibility for PMA Long Course, PAF GD Pilot, and PN Cadet batches.
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                  Enter Date of Birth:
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-300 rounded-2xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-[#B8212E] transition-colors"
                />
              </div>

              {ageResult && (
                <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 animate-fade-in space-y-2">
                  <div className="flex items-center gap-3 text-sm font-black text-[#0A192F]">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Exact Age: {ageResult.years} Years, {ageResult.months} Months &amp; {ageResult.days} Days</span>
                  </div>
                  <p className="text-xs font-bold text-gray-700 bg-white p-2.5 rounded-xl border border-gray-200">
                    {ageResult.status}
                  </p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={calculateAge}
            className="w-full py-4 px-6 bg-[#0A192F] hover:bg-[#162A4A] text-white font-black rounded-2xl shadow-lg transition-all active:scale-95 text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
          >
            CALCULATE EXACT AGE &rarr;
          </button>
        </div>

        {/* Ideal Weight Finder Card */}
        <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#B8212E] to-[#0A192F]" />
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0A192F] uppercase tracking-tight">
                  Ideal Weight Finder
                </h3>
                <p className="text-xs font-extrabold tracking-widest text-[#B8212E] uppercase mt-0.5">
                  ENGINEER YASIN ONLINE PREP PORTAL
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#B8212E]/10 flex items-center justify-center text-[#B8212E] group-hover:bg-[#B8212E] group-hover:text-white transition-colors">
                <Scale className="w-6 h-6" />
              </div>
            </div>

            <p className="text-xs text-gray-500 font-medium mb-6">
              Calculate your recommended medical weight range according to initial selection center BMI requirements.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Feet</label>
                <select
                  value={feet}
                  onChange={(e) => setFeet(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-300 rounded-2xl px-3 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-[#0A192F]"
                >
                  {[4, 5, 6, 7].map(num => (
                    <option key={num} value={num}>{num} Ft</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Inches</label>
                <select
                  value={inches}
                  onChange={(e) => setInches(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-300 rounded-2xl px-3 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-[#0A192F]"
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(num => (
                    <option key={num} value={num}>{num} In</option>
                  ))}
                </select>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">OR Height (CM)</label>
                <input
                  type="number"
                  placeholder="e.g. 174"
                  value={cm}
                  onChange={(e) => setCm(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-300 rounded-2xl px-3 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-[#0A192F]"
                />
              </div>
            </div>

            {weightResult && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 animate-fade-in space-y-1.5 mb-6">
                <div className="text-sm font-black text-emerald-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>Recommended Weight: {weightResult.minKg} KG &mdash; {weightResult.maxKg} KG</span>
                </div>
                <p className="text-xs text-emerald-800 font-medium">
                  {weightResult.bmiText}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={calculateWeight}
            className="w-full py-4 px-6 bg-[#0A192F] hover:bg-[#162A4A] text-white font-black rounded-2xl shadow-lg transition-all active:scale-95 text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
          >
            FIND WEIGHT RANGE &rarr;
          </button>
        </div>
      </div>
    </div>
  )
}

export function SelectionCentersSection() {
  const [activeTab, setActiveTab] = useState<'army' | 'navy' | 'paf'>('army')

  const centersData = {
    army: [
      { city: "Rawalpindi", address: "Army Selection and Recruitment Center (AS&RC), Roomi Road, near Ordnance Club, Rawalpindi.", phone: "051-9271393", email: "asrc_rwp@joinpakarmy.gov.pk" },
      { city: "Lahore", address: "AS&RC, Fortress Stadium Road, near Polo Ground, Lahore Cantt.", phone: "042-99220320", email: "asrc_lhr@joinpakarmy.gov.pk" },
      { city: "Karachi", address: "AS&RC, Shahrah-e-Faisal, opposite Drig Road Railway Station, Karachi.", phone: "021-99244671", email: "asrc_khi@joinpakarmy.gov.pk" },
      { city: "Peshawar", address: "AS&RC, Khyber Road, opposite Railway Station, Peshawar Cantt.", phone: "091-9211747", email: "asrc_psr@joinpakarmy.gov.pk" },
      { city: "Quetta", address: "AS&RC, Zarghoon Road, near Railway Station, Quetta Cantt.", phone: "081-9201506", email: "asrc_qta@joinpakarmy.gov.pk" },
      { city: "Multan", address: "AS&RC, Tipu Road, near Sher Shah Road, Multan Cantt.", phone: "061-9200424", email: "asrc_mtn@joinpakarmy.gov.pk" }
    ],
    navy: [
      { city: "Karachi", address: "Pakistan Navy Recruitment & Selection Centre, 9-Liaquat Barracks, Rafiqui Shaheed Road, Karachi.", phone: "021-48506704", email: "pnsrc_karachi@navy.gov.pk" },
      { city: "Rawalpindi", address: "PN Recruitment & Selection Centre, House No 102, Gali No 1, Westridge-III, Rawalpindi.", phone: "051-5154378", email: "pnsrc_rawalpindi@navy.gov.pk" },
      { city: "Lahore", address: "PN Recruitment & Selection Centre, 92-A, Model Town, Lahore.", phone: "042-99232230", email: "pnsrc_lahore@navy.gov.pk" },
      { city: "Peshawar", address: "PN Recruitment & Selection Centre, Warsak Road, Peshawar Cantt.", phone: "091-9212316", email: "pnsrc_peshawar@navy.gov.pk" },
      { city: "Quetta", address: "PN Recruitment & Selection Centre, Model Town, Quetta.", phone: "081-9201249", email: "pnsrc_quetta@navy.gov.pk" },
      { city: "Multan", address: "PN Recruitment & Selection Centre, Multan Cantt.", phone: "061-9201183", email: "pnsrc_multan@navy.gov.pk" }
    ],
    paf: [
      { city: "Rawalpindi", address: "PAF Information & Selection Centre, The Mall, Rawalpindi.", phone: "051-9271183", email: "pisc_rwp@paf.gov.pk" },
      { city: "Lahore", address: "PAF Information & Selection Centre, 14-Abbott Road, Lahore.", phone: "042-99201083", email: "pisc_lhr@paf.gov.pk" },
      { city: "Karachi", address: "PAF Information & Selection Centre, Main Shahrah-e-Faisal, Karachi.", phone: "021-99240999", email: "pisc_khi@paf.gov.pk" },
      { city: "Peshawar", address: "PAF Information & Selection Centre, 9-The Mall, Peshawar Cantt.", phone: "091-9210829", email: "pisc_psr@paf.gov.pk" },
      { city: "Quetta", address: "PAF Information & Selection Centre, M.A Jinnah Road, Quetta.", phone: "081-9201753", email: "pisc_qta@paf.gov.pk" },
      { city: "Faisalabad", address: "PAF Information & Selection Centre, Main University Road, Faisalabad.", phone: "041-9200779", email: "pisc_fsd@paf.gov.pk" }
    ]
  }

  return (
    <div id="selection-centers" className="bg-[#0A192F] text-white rounded-3xl p-6 sm:p-12 shadow-2xl border border-[#1d335a] my-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 space-y-8">
        <div className="text-center sm:text-left space-y-2">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-black uppercase tracking-widest">
            📍 Official Candidate Guidance
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
            Official Selection &amp; Recruitment Centers (AS&amp;RC, PNSC, PISC)
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 font-medium">
            Locate your nearest official Pakistan Armed Forces intake testing center with verified phone numbers and contact emails for initial registration.
          </p>
        </div>

        {/* Branch Switcher Tabs */}
        <div className="flex justify-center sm:justify-start gap-2 border-b border-slate-800 pb-4">
          {[
            { id: 'army', label: '⚔️ Pak Army (AS&RC)' },
            { id: 'navy', label: '⚓ Pak Navy Centers' },
            { id: 'paf', label: '✈️ PAF Selection Centers' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 sm:px-6 py-3 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer shadow-lg ${
                activeTab === tab.id ? 'bg-[#D4AF37] text-slate-950 scale-105 shadow-amber-500/20' : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Centers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {centersData[activeTab].map((center, idx) => (
            <div key={idx} className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 space-y-3 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#D4AF37] font-black uppercase tracking-wide text-sm mb-1.5">
                  <MapPin className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>{center.city} Center</span>
                </div>
                <p className="text-xs text-gray-300 font-medium leading-relaxed mb-3">
                  {center.address}
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  <span>Ph: {center.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-medium text-amber-300/90 truncate">
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{center.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 text-center sm:text-left">
          <Link
            href={`/centers/${activeTab}`}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:scale-102 transition-all"
          >
            <ExternalLink className="w-4 h-4" /> View All 12+ Official {activeTab.toUpperCase()} Centers &amp; Email Contacts &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      q: "How can I prepare for Pakistan Army, Navy, and Air Force tests through Engineer Yasin Digital Portal?",
      a: "Our online portal provides complete initial assessment preparatory quizzes, intelligence (verbal/non-verbal) tests, academic series, and live ISSB guidance. Simply select your desired branch from our top navigation tabs and attempt the timed mock exams for instant automatic evaluation!"
    },
    {
      q: "What are the age limits for PMA Long Course, PAF GD Pilot, and PN Cadet in 2026?",
      a: "For PMA Long Course, candidates aged 17-22 (with Intermediate) are eligible. For PAF GD Pilot, the age limit is 16-22 years. For PN Cadet in Pakistan Navy, it is 16.5-21 years. You can use our interactive Age Calculator above to check your exact status down to the exact day!"
    },
    {
      q: "How does Engineer Yasin's ISSB 2.8s Audio Hooter Word Association Test (WAT) work?",
      a: "Our portal features Pakistan's most advanced online ISSB simulator without any artificial buffers. In our WAT practice module, words advance automatically every 8 seconds, accompanied by an authentic 2.8-second military-grade audio hooter buzzer to condition your rapid nervous responses!"
    },
    {
      q: "Are all online practice tests, E-Books, and preparation resources free?",
      a: "Yes! 100% of our online timed mock quizzes, PDF E-Books library, verified past papers, and ISSB audio simulators in our portal are completely free for all aspiring candidates across Pakistan."
    },
    {
      q: "How can I contact Engineer Yasin or join the official candidate WhatsApp group?",
      a: "You can reach out and connect directly via our official WhatsApp community link available anywhere on the portal. Engineer Yasin provides verified digital guidance and online mentorship with guaranteed precision for all military induction tests."
    }
  ]

  return (
    <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 sm:p-12 shadow-xl my-12 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-black text-[#B8212E] uppercase tracking-widest block">
          ❓ Have Queries? We Have Answers
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-[#0A192F] tracking-tight uppercase">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="divide-y divide-gray-200 max-w-4xl mx-auto">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index
          return (
            <div key={index} className="py-4">
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-4 text-left font-black text-sm sm:text-base text-[#0A192F] hover:text-[#B8212E] transition-colors py-2 cursor-pointer"
              >
                <span>{faq.q}</span>
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-[#0A192F]">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>
              {isOpen && (
                <div className="pt-2 pb-4 text-xs sm:text-sm text-gray-600 leading-relaxed font-medium pr-8 animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
