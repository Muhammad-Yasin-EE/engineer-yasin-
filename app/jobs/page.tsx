'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Briefcase, CheckCircle2, Award, ShieldCheck, FileText, Globe, MessageCircle, Sparkles, Building2, Search } from 'lucide-react'

interface JobCard {
  id: string
  title: string
  body: string
  category: 'federal' | 'punjab' | 'sindh' | 'kp_bpsc' | 'defense'
  categoryLabel: string
  grade: string
  eligibility: string
  syllabus: string
  officialUrl: string
  badgeColor: string
}

const jobsData: JobCard[] = [
  // FPSC & Federal
  {
    id: "css-2026",
    title: "CSS Competitive Examination (Central Superior Services)",
    body: "Federal Public Service Commission (FPSC)",
    category: "federal",
    categoryLabel: "FPSC / Federal Civil Services",
    grade: "BPS-17 (PAAS, PAS, PSP, FSP, IRS)",
    eligibility: "Bachelor's Degree (2nd Division / Grade C), Age: 21–30 Years (up to 32 with age relaxation).",
    syllabus: "Compulsory Subjects (600 marks) + Optional Group Subjects (600 marks) -> MPT Screening -> Psychological Assessment -> Viva Voce.",
    officialUrl: "https://www.fpsc.gov.pk",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300"
  },
  {
    id: "fia-ad",
    title: "FIA Assistant Director (AD & Inspector Investigation)",
    body: "Federal Investigation Agency (via FPSC)",
    category: "federal",
    categoryLabel: "FPSC / Ministry of Interior",
    grade: "BPS-17 (Assistant Director) / BPS-16 (Inspector)",
    eligibility: "Master's Degree (for AD) / Graduation (for Inspector) with physical standards (5'6\" height for male, 5'2\" for female).",
    syllabus: "English (20%) + Professional Test & General Intelligence (80%: Pakistan Affairs, Islamic Studies, FIA Act 1974, Everyday Science).",
    officialUrl: "https://www.fpsc.gov.pk",
    badgeColor: "bg-blue-100 text-blue-900 border-blue-300"
  },
  {
    id: "ib-ad",
    title: "Intelligence Bureau (IB) Assistant Director & Security Officer",
    body: "Prime Minister's Office Intelligence Bureau (via FPSC)",
    category: "federal",
    categoryLabel: "FPSC / Intelligence Bureau",
    grade: "BPS-17 / BPS-16",
    eligibility: "Master's / Bachelor's (2nd Div) from HEC recognized university. Age limit: 21–30 years + 5 years federal general relaxation.",
    syllabus: "Analytical Reasoning, Current Affairs, English Grammar, Pakistan History, Security Administration & Quantitative aptitude.",
    officialUrl: "https://www.fpsc.gov.pk",
    badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300"
  },
  {
    id: "mod-ad",
    title: "Ministry of Defence (MOD) Assistant Director & Sub-Inspector",
    body: "Ministry of Defence Executive & Security Cadre",
    category: "defense",
    categoryLabel: "MOD Intelligence & Administrative Cadre",
    grade: "BPS-17 (AD MOD) / BPS-16 (Traffic / Security)",
    eligibility: "Graduation / Master's degree in any discipline. Physical fitness & complete intelligence screening required.",
    syllabus: "Special MOD Screening Test (English, Math, Analytical Reasoning, Current Affairs) -> Descriptive Test -> Psychometric -> Medical.",
    officialUrl: "https://www.recruitments.com.pk",
    badgeColor: "bg-rose-100 text-rose-900 border-rose-300"
  },
  {
    id: "customs-inspector",
    title: "FBR Inspector Customs, Intelligence & Valuation Officer",
    body: "Federal Board of Revenue (Inland Revenue & Customs via FPSC)",
    category: "federal",
    categoryLabel: "FPSC / Federal Board of Revenue",
    grade: "BPS-16 / BPS-17",
    eligibility: "Bachelor’s degree in Economics, Commerce, Statistics, Business Administration, or Computer Science with strict physical measurements.",
    syllabus: "General Intelligence & Vocabulary (50%) + Customs Act 1969, Sales Tax Act, FBR Functions & Fiscal Policy (50%).",
    officialUrl: "https://www.fpsc.gov.pk",
    badgeColor: "bg-purple-100 text-purple-900 border-purple-300"
  },

  // PPSC & Punjab
  {
    id: "pms-punjab",
    title: "PMS Punjab Combined Competitive Examination",
    body: "Punjab Public Service Commission (PPSC)",
    category: "punjab",
    categoryLabel: "PPSC / Punjab Provincial Administration",
    grade: "BPS-17 (Section Officer / Assistant Commissioner)",
    eligibility: "Graduation (Second Division) from HEC recognized institute. Age: 21–30 Years (plus government relaxed limits). Domicile: Punjab.",
    syllabus: "Compulsory Subjects (600 Marks: English, Urdu, GK, Islamic Studies, Pak Studies) + Three Optional Subjects (600 Marks) + Psychological Interview.",
    officialUrl: "https://www.ppsc.gop.pk",
    badgeColor: "bg-teal-100 text-teal-900 border-teal-300"
  },
  {
    id: "ppsc-police",
    title: "Punjab Police Sub-Inspector & Tehsildar / Naib Tehsildar",
    body: "Punjab Police & Board of Revenue (via PPSC)",
    category: "punjab",
    categoryLabel: "PPSC / Police & Revenue Department",
    grade: "BPS-14 (Sub-Inspector) / BPS-16 (Tehsildar)",
    eligibility: "Graduation (minimum 2nd Division). Male Height: 5'7\", Chest: 33\"-34.5\". Female Height: 5'2\". Running endurance required.",
    syllabus: "General Ability MCQ Test (100 Marks: Pakistan Studies, Current Affairs, Everyday Science, Urdu, English, Basic IT & MS Office).",
    officialUrl: "https://www.ppsc.gop.pk",
    badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300"
  },
  {
    id: "ppsc-anticorruption",
    title: "Assistant Director Anti-Corruption & Local Government",
    body: "Punjab Anti-Corruption Establishment (via PPSC)",
    category: "punjab",
    categoryLabel: "PPSC / Executive Services",
    grade: "BPS-17",
    eligibility: "Master’s degree / LL.B / B.Sc Engg / BBA (Hons) or equivalent with valid Punjab Domicile.",
    syllabus: "General Ability Test (100 MCQs) covering analytical thinking, criminal procedural codes basics, ethics, and civic governance.",
    officialUrl: "https://www.ppsc.gop.pk",
    badgeColor: "bg-cyan-100 text-cyan-900 border-cyan-300"
  },

  // SPSC & Sindh
  {
    id: "pms-sindh",
    title: "SPSC Combined Competitive Examination (CCE / PMS Sindh)",
    body: "Sindh Public Service Commission (SPSC Hyderabad)",
    category: "sindh",
    categoryLabel: "SPSC / Sindh Civil Services",
    grade: "BPS-17 (Mukhtiarkar, Assistant Commissioner, Section Officer)",
    eligibility: "Bachelor's degree at least in 2nd Division. Age limit: 21–30 years (with applicable provincial age relaxation). Domicile: Sindh Rural & Urban.",
    syllabus: "Screening test (MCQ based on GK, English, Mathematics) followed by descriptive subjective written papers and final Viva Voce.",
    officialUrl: "https://spsc.gov.pk",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300"
  },
  {
    id: "spsc-asi",
    title: "Sindh Police Assistant Sub-Inspector (ASI) & Excise Inspector",
    body: "Sindh Police & Taxation Department (via SPSC)",
    category: "sindh",
    categoryLabel: "SPSC / Police & Taxation",
    grade: "BPS-11 (ASI) / BPS-16 (Excise & Taxation Inspector)",
    eligibility: "Intermediate / Graduation with physical measurement criteria as prescribed in police induction laws.",
    syllabus: "General Knowledge, English Grammar, Elementary Mathematics, Sindhi / Urdu language translation & physical efficiency test.",
    officialUrl: "https://spsc.gov.pk",
    badgeColor: "bg-red-100 text-red-900 border-red-300"
  },

  // KPPSC, BPSC, AJK & GB
  {
    id: "kppsc-pms",
    title: "KPPSC PMS & Provincial Executive Cadre (Tehsildar / DSP)",
    body: "Khyber Pakhtunkhwa Public Service Commission (KPPSC Peshawar)",
    category: "kp_bpsc",
    categoryLabel: "KPPSC / KP Administrative Services",
    grade: "BPS-17 (PMS / DSP / Excise Commissioner)",
    eligibility: "Bachelor’s Degree (2nd Division) from recognized institutions. Valid Domicile of Khyber Pakhtunkhwa / Merged Districts.",
    syllabus: "Comprehensive Provincial Civil Service examination syllabus: English, Urdu, General Knowledge, Everyday Science & optional choices.",
    officialUrl: "https://www.kppsc.gov.pk",
    badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300"
  },
  {
    id: "bpsc-pms",
    title: "BPSC PMS & Assistant Commissioner Balochistan",
    body: "Balochistan Public Service Commission (BPSC Quetta)",
    category: "kp_bpsc",
    categoryLabel: "BPSC / Balochistan Civil Services",
    grade: "BPS-17 (Section Officer / AC / DSP)",
    eligibility: "Bachelor’s degree in second division with genuine local / domicile certificate of Balochistan Province.",
    syllabus: "Screening test, written descriptive essays in English & Urdu/Balochi/Pashto, Islamic Studies and general affairs.",
    officialUrl: "http://www.bpsc.gob.pk",
    badgeColor: "bg-orange-100 text-orange-900 border-orange-300"
  },
  {
    id: "ajk-gb-psc",
    title: "AJK & Gilgit-Baltistan PSC Assistant Director & PMS Exams",
    body: "AJK Public Service Commission & Gilgit-Baltistan PSC",
    category: "kp_bpsc",
    categoryLabel: "AJKPSC / GBPSC Civil Administration",
    grade: "BPS-17 / BPS-16",
    eligibility: "Graduation or Master's degree with respective AJK / Gilgit-Baltistan State Subject / Domicile certificate.",
    syllabus: "General Knowledge, English Composition, Pakistan Affairs, Geography & Regional Development Administration.",
    officialUrl: "https://www.ajkpsc.gov.pk",
    badgeColor: "bg-sky-100 text-sky-900 border-sky-300"
  },

  // Special Armed & Civil Security
  {
    id: "asf-ad",
    title: "Airport Security Force (ASF) Assistant Director & Corporal",
    body: "Airport Security Force Pakistan (Ministry of Aviation / FPSC)",
    category: "defense",
    categoryLabel: "ASF Executive & Security Cadre",
    grade: "BPS-17 (Assistant Director) / BPS-16 (Inspector) / BPS-07 (Corporal)",
    eligibility: "Master’s/Bachelor’s for Officers; Matric/Intermediate for Corporals. Height: 5'6\" (male), 5'2\" (female).",
    syllabus: "ASF Act 1975, Aviation Security standards, English, General Knowledge, Intelligence test & Physical running milestones.",
    officialUrl: "https://joinasf.gov.pk",
    badgeColor: "bg-slate-100 text-slate-900 border-slate-300"
  },
  {
    id: "anf-inspector",
    title: "Anti-Narcotics Force (ANF) Inspector & Sub-Inspector",
    body: "Anti-Narcotics Force Pakistan (Ministry of Narcotics Control / FPSC)",
    category: "defense",
    categoryLabel: "ANF Federal Enforcement",
    grade: "BPS-16 (Inspector) / BPS-14 (Sub-Inspector) / BPS-11 (ASI)",
    eligibility: "Graduation (2nd Div) with rigorous physical measurements and medical endurance clearance.",
    syllabus: "Control of Narcotic Substances Act 1997, General Intelligence, Analytical English Vocabulary, and Pakistan current affairs.",
    officialUrl: "https://anf.gov.pk",
    badgeColor: "bg-indigo-100 text-indigo-900 border-indigo-300"
  },
  {
    id: "nhmp-patrol",
    title: "National Highways & Motorway Police (NHMP) Patrol Officer",
    body: "National Highways & Motorway Police (via FPSC)",
    category: "defense",
    categoryLabel: "NHMP Road Enforcement & Security",
    grade: "BPS-16 (Senior Patrol Officer / SPO) / BPS-14 (Patrol Officer / PO)",
    eligibility: "Graduation (2nd Division). Minimum male height: 5'8\" (5'6\" for Balochistan/Sindh Rural), chest: 33-35 inches. Valid driving license often advantageous.",
    syllabus: "Motorway Ordinance 2000, Highway Safety Code, English Grammar, General Ability & Mechanical aptitude basics.",
    officialUrl: "https://nhmp.gov.pk",
    badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300"
  }
]

export default function JobsPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'federal' | 'punjab' | 'sindh' | 'kp_bpsc' | 'defense'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredJobs = jobsData.filter(job => {
    const matchesCategory = activeFilter === 'all' || job.category === activeFilter
    const matchesSearch = searchQuery === '' || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      job.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans text-gray-800">
      
      {/* Hero Banner Section */}
      <section className="bg-[#0A192F] text-white py-12 sm:py-18 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b-4 border-[#B8212E]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Portal Home
          </Link>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[11px] font-black uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" /> 🇵🇰 Pakistan Official Civil &amp; Defense Career Portal
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase leading-[1.15]">
                Public Service Commission &amp; Federal Forces Jobs 2026
              </h1>
              <p className="text-sm sm:text-base text-gray-300 font-medium leading-relaxed">
                Complete verified examination syllabi, eligibility criteria, grade scales, and official portal links for all FPSC, PPSC, SPSC, KPPSC, BPSC, CSS, PMS, and Ministry of Defence intake competitions.
              </p>
            </div>

            <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-3">
              <a
                href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#1faf53] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 transition-transform hover:scale-102 shrink-0"
              >
                <MessageCircle className="w-5 h-5 fill-current" /> Daily Job Alert WhatsApp Group &rarr;
              </a>
            </div>
          </div>

          {/* Search Bar */}
          <div className="pt-4 max-w-2xl">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search exams, ministries, commissions (e.g. FPSC, CSS, Police, FIA, MOD)..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-amber-400 hover:underline uppercase"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-8">
        
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap pb-4 border-b border-gray-200">
          {[
            { id: 'all', label: `🏛️ All Commissions (${jobsData.length})` },
            { id: 'federal', label: '🇵🇰 Federal / FPSC (CSS/FIA)' },
            { id: 'punjab', label: '🦁 PPSC Punjab (PMS/Police)' },
            { id: 'sindh', label: '🌅 SPSC Sindh (CCE/ASI)' },
            { id: 'kp_bpsc', label: '🏔️ KPPSC / BPSC / AJK / GB' },
            { id: 'defense', label: '🛡️ MOD / ASF / ANF / Motorway' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-4.5 py-3 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer shadow-md ${
                activeFilter === tab.id
                  ? 'bg-[#0A192F] text-amber-400 scale-102 shadow-lg ring-2 ring-amber-400/50'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-gray-500">
          <span>Showing {filteredJobs.length} Active Public Service &amp; Federal Career Profiles</span>
          <Link href="/quizzes" className="text-[#B8212E] hover:underline flex items-center gap-1">
            Attempt Free Online Mock Tests &rarr;
          </Link>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-md space-y-4">
            <Building2 className="w-12 h-12 text-gray-400 mx-auto animate-bounce" />
            <h3 className="text-xl font-black text-[#0A192F] uppercase">No Career Posts Matched Your Query</h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Try changing your search keywords or select &apos;All Commissions&apos; to browse the complete list of available testing syllabi.
            </p>
            <button
              onClick={() => { setActiveFilter('all'); setSearchQuery('') }}
              className="px-6 py-3 rounded-xl bg-[#0A192F] text-white font-black text-xs uppercase tracking-wider hover:bg-[#B8212E] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-gray-150 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group hover:-translate-y-1"
              >
                <div className="absolute top-0 left-0 right-0 h-2 bg-[#0A192F] group-hover:bg-[#B8212E] transition-colors" />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border ${job.badgeColor}`}>
                      <Building2 className="w-3.5 h-3.5 shrink-0" /> {job.categoryLabel}
                    </span>
                    <span className="text-xs font-black text-[#B8212E] uppercase bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                      {job.grade}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-[#0A192F] group-hover:text-[#B8212E] transition-colors tracking-tight leading-snug mb-1">
                      {job.title}
                    </h3>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      {job.body}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-gray-100 text-xs text-gray-700">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 font-black text-[#0A192F] uppercase text-[11px] tracking-wider">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Eligibility &amp; Age Limit:</span>
                      </div>
                      <p className="font-medium text-gray-600 pl-5 leading-relaxed">
                        {job.eligibility}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 font-black text-[#0A192F] uppercase text-[11px] tracking-wider">
                        <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                        <span>Examination &amp; Syllabus Structure:</span>
                      </div>
                      <p className="font-medium text-gray-600 pl-5 leading-relaxed">
                        {job.syllabus}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-gray-100 flex flex-col sm:flex-row gap-2.5">
                  <a
                    href={job.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 px-4 rounded-2xl bg-[#0A192F] hover:bg-[#162a4a] text-white font-black text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-md hover:scale-102 transition-all cursor-pointer"
                  >
                    <Globe className="w-4 h-4" /> Official Portal &rarr;
                  </a>
                  <Link
                    href="/quizzes"
                    className="py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#0A192F] font-black text-xs uppercase tracking-wider text-center flex items-center justify-center transition-all shrink-0"
                  >
                    Attempt Mock &rarr;
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Bottom Call to Action Banner */}
        <div className="bg-[#0A192F] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border-2 border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 mt-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-3 max-w-2xl relative z-10 text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-black uppercase tracking-widest inline-block">
              🚀 Free Digital Prep Guidance
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Preparing for FPSC, PPSC or MOD Screening Tests?
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">
              Our online portal features instant automatic mock examination evaluators for General Intelligence, Everyday Science, Current Affairs, and Quantitative Aptitude completely free of cost.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto relative z-10 shrink-0">
            <Link
              href="/quizzes"
              className="py-4 px-8 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl shadow-xl transition-transform hover:scale-105 text-xs sm:text-sm uppercase tracking-wider text-center flex items-center justify-center gap-2"
            >
              Start Free Practice Mock &rarr;
            </Link>
            <Link
              href="/ebooks"
              className="py-4 px-8 bg-white/10 hover:bg-white/20 text-white font-black rounded-2xl border border-white/20 transition-all text-xs sm:text-sm uppercase tracking-wider text-center flex items-center justify-center"
            >
              Download E-Books &rarr;
            </Link>
          </div>
        </div>

      </div>

    </div>
  )
}
