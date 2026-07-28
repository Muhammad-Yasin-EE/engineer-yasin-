'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, ExternalLink, Globe, Calendar, Search, Sparkles, MessageCircle, Award, CheckCircle } from 'lucide-react'
import { internationalScholarships, hecSpecialSchemes, germanEposCourses, internationalWomenScholarships } from '@/lib/data/scholarshipData'

export default function InternationalScholarshipsPage() {
  const [activeTab, setActiveTab] = useState<'global' | 'hec' | 'germany' | 'women'>('global')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredGlobal = internationalScholarships.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.fields.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow flex flex-col gap-10 bg-white text-gray-800">
      <Link href="/scholarship" className="inline-flex items-center gap-2 text-xs font-extrabold text-gray-500 hover:text-[#0A192F] w-fit transition-colors uppercase tracking-wider">
        <ArrowLeft className="w-4 h-4" /> Back to Scholarship Categories
      </Link>

      {/* ── HERO BANNER WITH IMAGE ─────────────────────────────────────── */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-gray-200 min-h-[300px] sm:min-h-[360px] flex items-center justify-center">
        <div className="absolute inset-0 bg-[#0A192F]/90 z-10 mix-blend-multiply" />
        <Image 
          src="/images/card-paf-education.jpg" 
          alt="International Study Abroad Scholarships Portal" 
          fill 
          priority 
          className="absolute inset-0 object-cover object-center" 
        />
        <div className="relative z-20 flex flex-col items-center text-center p-8 sm:p-14 text-white w-full max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-[11px] font-black uppercase tracking-widest mb-4 shadow-sm">
            <Globe className="w-3.5 h-3.5" /> 🌐 2026–2027 STUDY ABROAD GRANTS &amp; FELLOWSHIPS
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 drop-shadow-lg text-white uppercase leading-none">
            INTERNATIONAL SCHOLARSHIPS
          </h1>
          <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium text-gray-200 drop-shadow-md leading-relaxed">
            Every scholarship is presented in its own verified card below with exact typical opening windows, application closing deadlines, required documents, HEC nomination rules, and official apply portals.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <a
              href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#25D366] hover:bg-[#1EBE5B] text-[#0A192F] font-black text-xs sm:text-sm uppercase rounded-xl shadow-lg inline-flex items-center gap-2 transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5 fill-current" /> Join WhatsApp Alert Network &rarr;
            </a>
            <Link
              href="/quizzes"
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-[#0A192F] font-black text-xs sm:text-sm uppercase rounded-xl shadow-lg inline-flex items-center gap-2"
            >
              <Award className="w-5 h-5" /> Free HEC HAT &amp; GRE Practice Quizzes
            </Link>
          </div>
        </div>
      </div>

      {/* ── SEARCH & FILTER INPUT ──────────────────────────────────────── */}
      <div className="bg-[#0A192F] rounded-2xl p-4 shadow-lg border border-slate-700 flex items-center gap-3">
        <Search className="w-5 h-5 text-cyan-400 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by country (UK, USA, Germany, Turkiye) or scholarship name (Chevening, Fulbright, DAAD)..."
          className="w-full bg-transparent text-white font-medium text-sm placeholder-gray-400 focus:outline-none"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="text-xs font-black text-amber-400 hover:underline shrink-0">
            Clear Filter
          </button>
        )}
      </div>

      {/* ── TAB SWITCHER BAR ───────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3 pb-4 border-b-2 border-gray-200">
        <button
          onClick={() => setActiveTab('global')}
          className={`px-6 py-3.5 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md ${
            activeTab === 'global' ? 'bg-[#0A192F] text-amber-400 border-2 border-[#0A192F]' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-2 border-slate-200'
          }`}
        >
          🌟 Global Fully Funded Cards (15+)
        </button>
        <button
          onClick={() => setActiveTab('hec')}
          className={`px-6 py-3.5 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md ${
            activeTab === 'hec' ? 'bg-[#0A192F] text-cyan-300 border-2 border-[#0A192F]' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-2 border-slate-200'
          }`}
        >
          🏛️ HEC Foreign Portals &amp; Guide
        </button>
        <button
          onClick={() => setActiveTab('germany')}
          className={`px-6 py-3.5 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md ${
            activeTab === 'germany' ? 'bg-[#0A192F] text-emerald-400 border-2 border-[#0A192F]' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-2 border-slate-200'
          }`}
        >
          🇩🇪 Germany DAAD EPOS (20 Courses)
        </button>
        <button
          onClick={() => setActiveTab('women')}
          className={`px-6 py-3.5 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md ${
            activeTab === 'women' ? 'bg-[#0A192F] text-pink-400 border-2 border-[#0A192F]' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-2 border-slate-200'
          }`}
        >
          👩 Women-Only Study Fellowships
        </button>
      </div>

      {/* ===============================================================
          VIEW 1: EVERY SCHOLARSHIP AS AN INDIVIDUAL CARD (GLOBAL)
          =============================================================== */}
      {activeTab === 'global' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black uppercase text-[#0A192F] tracking-tight">
              WORLDWIDE FULLY FUNDED SCHOLARSHIP CARDS
            </h2>
            <span className="text-xs font-black px-3 py-1 bg-amber-100 text-[#0A192F] rounded-lg border border-amber-300">
              {filteredGlobal.length} Active Scholarships
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGlobal.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border-2 border-slate-800 hover:border-cyan-400 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-slate-900 to-slate-900 z-0 pointer-events-none" />
                
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-black uppercase tracking-widest text-cyan-300 bg-slate-800 px-3 py-1 rounded-full border border-cyan-700/50">
                      {item.country}
                    </span>
                    <span className="text-[10px] font-black text-amber-300 bg-amber-950 px-2.5 py-0.5 rounded border border-amber-500/30">
                      Verified
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-cyan-300 transition-colors leading-snug">
                    {item.name}
                  </h3>

                  <div className="text-xs font-extrabold text-emerald-400 bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800/40">
                    {item.funding}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-800">
                    <div className="bg-slate-800/80 p-2.5 rounded-xl border border-white/5">
                      <span className="text-gray-400 block font-medium">Opening Date:</span>
                      <strong className="text-white font-extrabold block mt-0.5">{item.openingDate}</strong>
                    </div>
                    <div className="bg-slate-800/80 p-2.5 rounded-xl border border-white/5">
                      <span className="text-gray-400 block font-medium">Typical Deadline:</span>
                      <strong className="text-amber-300 font-extrabold block mt-0.5">{item.closingDate}</strong>
                    </div>
                  </div>

                  <div className="text-xs text-gray-300 leading-relaxed font-normal">
                    <span className="text-white font-bold block mb-1">🎓 Eligible Fields of Study:</span>
                    {item.fields}
                  </div>

                  {item.notes && (
                    <div className="text-[11px] text-gray-300 bg-black/40 p-3 rounded-xl border-l-2 border-cyan-400 font-medium">
                      📌 <strong>Required Documents &amp; Note:</strong> {item.notes}
                    </div>
                  )}
                </div>

                <div className="relative z-10 pt-6 mt-6 border-t border-slate-800 flex flex-col gap-3">
                  <a
                    href={item.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#0A192F] font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all group-hover:scale-102"
                  >
                    APPLY ON OFFICIAL PORTAL <ExternalLink className="w-4 h-4 text-[#0A192F]" />
                  </a>
                  <Link
                    href="/quizzes"
                    className="text-center text-[11px] font-black text-amber-400 hover:underline transition-colors"
                  >
                    Attempt Free GRE / HEC Practice Quizzes &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===============================================================
          VIEW 2: HEC FOREIGN SCHOLARSHIPS + KYA SCENE HOTA HAI
          =============================================================== */}
      {activeTab === 'hec' && (
        <div className="space-y-10 animate-in fade-in duration-300">
          {/* HEC EXPLANATION BOX */}
          <div className="bg-[#0A192F] rounded-3xl border-2 border-amber-400 p-6 sm:p-10 text-white shadow-2xl space-y-8">
            <div className="border-b border-gray-800 pb-4">
              <span className="text-xs font-black uppercase text-amber-400 bg-amber-950 px-3 py-1 rounded-full border border-amber-600">
                ⚡ HEC Official Nominations System Explained
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-white uppercase mt-3 tracking-tight">
                HEC KE SATH KYA SCENE HOTA HAI? (COMPLETE APPLICATION WORKFLOW)
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-medium mt-2 leading-relaxed">
                Most students get rejected in preliminary administrative scrubbing because of misconceptions about how HEC processes foreign scholarships. Here is the exact procedure you must strictly follow:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-gray-800 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-amber-400 text-[#0A192F] font-black flex items-center justify-center text-sm shrink-0">1</span>
                  <h4 className="font-extrabold text-white text-base uppercase">Dual Application Portals (Mandatory)</h4>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed pt-1">
                  When HEC advertises a foreign scholarship (like <strong>Stipendium Hungaricum, Commonwealth UK, or Chinese CSC</strong>), you are legally required to submit TWO separate online applications: one on the HEC portal (<code>scholarships.hec.gov.pk</code>) and one on the foreign government&apos;s system. If you submit on only one, your form is rejected immediately without notice.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-gray-800 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-cyan-400 text-[#0A192F] font-black flex items-center justify-center text-sm shrink-0">2</span>
                  <h4 className="font-extrabold text-white text-base uppercase">ETC HAT Test (Minimum 60–75+ Score)</h4>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed pt-1">
                  HEC does not shortlist applicants solely on university CGPA. They require all candidates to take the **Education Testing Council (ETC) HAT** (Higher Education Aptitude Test), consisting of Verbal Reasoning, Quantitative Math, and Analytical Logic. A minimum score of **60/100 is mandatory**, with 75+ recommended for top Commonwealth and European merit slots.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-gray-800 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-400 text-[#0A192F] font-black flex items-center justify-center text-sm shrink-0">3</span>
                  <h4 className="font-extrabold text-white text-base uppercase">HEC Attestation &amp; IBCC Equivalence</h4>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed pt-1">
                  Embassies require all degrees and transcripts to bear original **HEC Attestation Stamps** and Matric/FSc certificates to bear **IBCC Equivalence verification**. Do not wait for interview calls; apply beforehand on <code>eservices.hec.gov.pk</code> to prevent visa delays.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-gray-800 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-pink-400 text-[#0A192F] font-black flex items-center justify-center text-sm shrink-0">4</span>
                  <h4 className="font-extrabold text-white text-base uppercase">Medical Fitness &amp; Police Clearance</h4>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed pt-1">
                  Once nominated, candidates must submit signed medical examinations from District Headquarter Hospitals (DHQ) and a clean Police Character Certificate (PCC) from local law enforcement before final placement notices are issued.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-bold text-gray-300">
                🔥 Prepare for HEC HAT, GRE, and Entry Test Logic with our live timed interactive quizzes!
              </span>
              <Link
                href="/quizzes"
                className="bg-amber-400 hover:bg-amber-300 text-[#0A192F] font-black uppercase text-xs px-6 py-3.5 rounded-xl shadow-lg shrink-0 transition-transform hover:scale-105"
              >
                Start Free HAT / GRE Practice Quizzes &rarr;
              </Link>
            </div>
          </div>

          {/* HEC SPECIAL SCHEME CARDS */}
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-black uppercase text-[#0A192F] tracking-tight">
              OFFICIAL HEC BILATERAL SCHOLARSHIP CARDS
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hecSpecialSchemes.map((hec) => (
                <div key={hec.id} className="bg-slate-900 text-white rounded-3xl p-6 border-2 border-slate-800 hover:border-amber-400 shadow-xl flex flex-col justify-between transition-all duration-200">
                  <div className="space-y-3">
                    <span className="text-xs font-black uppercase text-amber-400 bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
                      {hec.country} &bull; HEC Nomination Route
                    </span>
                    <h4 className="text-xl font-black text-white uppercase leading-snug">{hec.name}</h4>
                    <p className="text-xs text-emerald-400 font-extrabold">{hec.funding}</p>
                    <p className="text-xs text-gray-300"><strong>Eligibility Requirement:</strong> {hec.eligible}</p>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                      <div className="bg-slate-800 p-2.5 rounded-lg">Opening: <span className="text-white font-bold">{hec.openingDate}</span></div>
                      <div className="bg-slate-800 p-2.5 rounded-lg">Deadline: <span className="text-amber-300 font-bold">{hec.closingDate}</span></div>
                    </div>
                    
                    <p className="text-xs text-gray-300 italic bg-black/30 p-3 rounded-xl border-l-2 border-amber-400">
                      💡 <strong>Workflow Note:</strong> {hec.notes}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-800 flex justify-between items-center">
                    <Link href="/quizzes" className="text-xs font-extrabold text-amber-400 hover:underline">
                      Practice HEC HAT MCQs &rarr;
                    </Link>
                    <a
                      href={hec.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-amber-500 hover:bg-amber-400 text-[#0A192F] font-black text-xs uppercase px-5 py-2.5 rounded-xl shadow inline-flex items-center gap-1.5 transition-transform hover:-translate-y-0.5"
                    >
                      HEC Apply Portal <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===============================================================
          VIEW 3: GERMANY DAAD EPOS (20 COURSES DIRECTORY)
          =============================================================== */}
      {activeTab === 'germany' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-[#0A192F] text-white p-6 sm:p-8 rounded-3xl border-2 border-emerald-400 shadow-xl space-y-3">
            <span className="text-xs font-black text-emerald-400 uppercase tracking-widest bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
              🇩🇪 Special German Government Scheme
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              20 ENGLISH-TAUGHT DAAD EPOS MASTER&apos;S COURSES (GERMANY)
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium max-w-4xl">
              The DAAD EPOS scheme specifically funds postgraduate degrees in development-related fields for Pakistani professionals with at least <strong>2 years of verifiable full-time work experience</strong> after completing a Bachelor&apos;s degree. Covers monthly €934 stipend, university tuition, health insurance, and return airfare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {germanEposCourses.map((c) => (
              <div key={c.id} className="bg-slate-900 text-white rounded-3xl p-6 border-2 border-slate-800 hover:border-emerald-400 shadow-lg flex flex-col justify-between transition-all duration-200">
                <div className="space-y-3">
                  <span className="text-[11px] font-black text-emerald-300 bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-800 w-fit">
                    Course #{c.id}.0 &bull; {c.field}
                  </span>
                  <h4 className="text-lg font-black uppercase text-white leading-snug">{c.program}</h4>
                  <p className="text-xs text-cyan-300 font-bold">🏫 {c.university}</p>
                  <p className="text-xs font-extrabold text-emerald-400 bg-emerald-950/60 p-2 rounded-lg border border-emerald-800/40">{c.funding}</p>
                  <div className="bg-slate-800 p-2.5 rounded-lg text-xs text-gray-300">
                    <div>Opening: <strong className="text-white">{c.opening}</strong></div>
                    <div>Closing Deadline: <strong className="text-amber-300">{c.closing}</strong></div>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800 flex justify-end">
                  <a
                    href={c.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-[#0A192F] font-black text-xs uppercase py-3 px-4 rounded-xl text-center shadow flex items-center justify-center gap-1.5 transition-transform hover:scale-102"
                  >
                    Apply Direct University <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===============================================================
          VIEW 4: WOMEN-ONLY INTERNATIONAL FELLOWSHIPS
          =============================================================== */}
      {activeTab === 'women' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-gradient-to-r from-[#0A192F] via-slate-900 to-[#0A192F] p-8 rounded-3xl border-2 border-pink-500 shadow-xl space-y-2 text-white">
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-pink-400 flex items-center gap-2">
              👩 Women-In-Science &amp; Global Fellowship Cards
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
              Exclusively designated scholarship funds supporting female scholars and STEM professionals from Pakistan and developing nations. Offers substantial grants ranging from $10,000 up to full tuition with childcare allowance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {internationalWomenScholarships.map((w) => (
              <div key={w.id} className="bg-slate-900 text-white rounded-3xl p-6 border-2 border-slate-800 hover:border-pink-500 shadow-xl flex flex-col justify-between transition-all duration-200">
                <div className="space-y-3">
                  <span className="text-xs font-black uppercase text-pink-300 bg-pink-950 px-3 py-1 rounded-full border border-pink-800 w-fit">
                    {w.country} &bull; Women Grant
                  </span>
                  <h4 className="text-xl font-black text-white uppercase leading-snug">{w.name}</h4>
                  <div className="text-xs font-black text-emerald-400 bg-emerald-950/60 p-2 rounded-lg border border-emerald-800/40">{w.funding}</div>
                  <p className="text-xs text-gray-300"><strong>Eligible Fields:</strong> {w.fields}</p>
                  <div className="bg-slate-800 p-3 rounded-xl text-xs text-gray-300">
                    <span className="block font-medium">Typical Opening: <strong className="text-white">{w.openingDate}</strong></span>
                    <span className="block mt-1 font-medium">Closing Deadline: <strong className="text-amber-300">{w.closingDate}</strong></span>
                  </div>
                  <p className="text-xs text-gray-300 italic bg-black/40 p-3 rounded-xl border-l-2 border-pink-400">
                    ✨ <strong>Requirement Details:</strong> {w.notes}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-800 flex justify-end">
                  <a
                    href={w.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-pink-500 hover:bg-pink-400 text-white font-black text-xs uppercase py-3 px-4 rounded-xl text-center shadow flex items-center justify-center gap-1.5 transition-transform hover:scale-102"
                  >
                    Official Foundation Application <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MONETIZED AD CONTENT & CALLOUT WRAPPER ────────────────────── */}
      <div className="bg-[#0A192F] text-white rounded-3xl p-8 sm:p-10 text-center flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-gray-800 mt-6">
        <div className="space-y-2 max-w-2xl text-left">
          <span className="text-[11px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full">
            🚀 MAXIMIZE YOUR STUDY ABROAD SELECTION CHANCES
          </span>
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-2">
            JOIN VIP WHATSAPP ALERTS &amp; DAILY UPDATES
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">
            Receive verified real-time deadline notices, motivational statement tips, application processing updates, and free interactive practice sets right on your phone!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3.5 shrink-0 w-full md:w-auto">
          <a
            href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#25D366] hover:bg-[#1EBE5B] text-[#0A192F] font-black rounded-2xl shadow-xl transition-transform hover:scale-105 flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
          >
            <MessageCircle className="w-5 h-5 fill-current" /> JOIN WHATSAPP ALERT GROUP &rarr;
          </a>
        </div>
      </div>

    </div>
  )
}
