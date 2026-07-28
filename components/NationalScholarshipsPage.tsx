'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ExternalLink, MapPin, Search, Sparkles, MessageCircle, CheckCircle, Award } from 'lucide-react'
import { pakistaniUniversities, pakistaniMinorityScholarships } from '@/lib/data/scholarshipData'

export default function NationalScholarshipsPage() {
  const [activeTab, setActiveTab] = useState<'universities' | 'minorities' | 'checklist'>('universities')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredUnis = pakistaniUniversities.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.fields.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow flex flex-col gap-10 bg-white text-gray-800">
      <Link href="/scholarship" className="inline-flex items-center gap-2 text-xs font-extrabold text-gray-500 hover:text-[#0A192F] w-fit transition-colors uppercase tracking-wider">
        <ArrowLeft className="w-4 h-4" /> Back to Scholarship Categories
      </Link>

      {/* ── HERO BANNER WITH IMAGE ─────────────────────────────────────── */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-gray-200 min-h-[280px] sm:min-h-[350px] flex items-center justify-center">
        <div className="absolute inset-0 bg-[#0A192F]/90 z-10 mix-blend-multiply" />
        <Image 
          src="/images/card-tcc.jpg" 
          alt="National University Merit & Need Scholarships Pakistan" 
          fill 
          priority 
          className="absolute inset-0 object-cover object-center" 
        />
        <div className="relative z-20 flex flex-col items-center text-center p-8 sm:p-14 text-white w-full max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[11px] font-black uppercase tracking-widest mb-4 shadow-sm">
            <MapPin className="w-3.5 h-3.5" /> 🇵🇰 HEC &amp; PAKISTANI UNIVERSITY FINANCIAL AID PORTAL
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 drop-shadow-lg text-white uppercase leading-none">
            NATIONAL SCHOLARSHIPS
          </h1>
          <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium text-gray-200 drop-shadow-md leading-relaxed">
            Explore up to 100% merit tuition waivers and need-based financial support at premier Pakistani universities (LUMS, NUST, IBA, UMT, UCP), minority educational grants, and hardship verification document checklists.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <a
              href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#25D366] hover:bg-[#1EBE5B] text-[#0A192F] font-black text-xs sm:text-sm uppercase rounded-xl shadow-lg inline-flex items-center gap-2 transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5 fill-current" /> Join WhatsApp Alert Group &rarr;
            </a>
            <Link
              href="/jobs"
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-[#0A192F] font-black text-xs sm:text-sm uppercase rounded-xl shadow-lg inline-flex items-center gap-2"
            >
              <Award className="w-5 h-5" /> Explore Public Service Job Portal &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* ── SEARCH & FILTER INPUT ──────────────────────────────────────── */}
      <div className="bg-[#0A192F] rounded-2xl p-4 shadow-lg border border-slate-700 flex items-center gap-3">
        <Search className="w-5 h-5 text-amber-400 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Pakistani university (LUMS, IBA, NUST, UMT, FAST) or city (Lahore, Islamabad, Karachi)..."
          className="w-full bg-transparent text-white font-medium text-sm placeholder-gray-400 focus:outline-none"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="text-xs font-black text-amber-400 hover:underline shrink-0">
            Clear Filter
          </button>
        )}
      </div>

      {/* ── TABS BAR ───────────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3 pb-4 border-b-2 border-gray-200">
        <button
          onClick={() => setActiveTab('universities')}
          className={`px-6 py-3.5 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md ${
            activeTab === 'universities' ? 'bg-[#0A192F] text-amber-400 border-2 border-[#0A192F]' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-2 border-slate-200'
          }`}
        >
          🏫 University Merit &amp; Need Aid Cards (25+)
        </button>
        <button
          onClick={() => setActiveTab('minorities')}
          className={`px-6 py-3.5 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md ${
            activeTab === 'minorities' ? 'bg-[#0A192F] text-cyan-300 border-2 border-[#0A192F]' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-2 border-slate-200'
          }`}
        >
          🕊️ Religious Minorities Educational Schemes
        </button>
        <button
          onClick={() => setActiveTab('checklist')}
          className={`px-6 py-3.5 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md ${
            activeTab === 'checklist' ? 'bg-[#0A192F] text-emerald-400 border-2 border-[#0A192F]' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-2 border-slate-200'
          }`}
        >
          📋 Required Documents Checklist
        </button>
      </div>

      {/* ===============================================================
          VIEW 1: UNIVERSITY FINANCIAL AID CARDS
          =============================================================== */}
      {activeTab === 'universities' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black uppercase text-[#0A192F] tracking-tight">
              PAKISTANI UNIVERSITIES MERIT &amp; HARDSHIP AID CARDS
            </h2>
            <span className="text-xs font-black px-3 py-1 bg-amber-100 text-[#0A192F] rounded-lg border border-amber-300">
              {filteredUnis.length} Premier Universities
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUnis.map((u) => (
              <div
                key={u.id}
                className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border-2 border-slate-800 hover:border-amber-400 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-amber-400 bg-amber-950 px-3 py-1 rounded-full border border-amber-700/50">
                      {u.city}
                    </span>
                    <span className="text-[10px] font-black text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800">
                      Active Portal
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white uppercase tracking-tight leading-snug">
                    {u.name}
                  </h3>

                  <div className="space-y-2 bg-slate-800/80 p-3 rounded-xl border border-white/5 text-xs">
                    <div>
                      <span className="text-gray-400 font-medium block">Merit Scholarship Support:</span>
                      <strong className="text-emerald-400 font-extrabold">{u.meritAid}</strong>
                    </div>
                    <div className="pt-2 border-t border-slate-700">
                      <span className="text-gray-400 font-medium block">Financial Hardship Aid:</span>
                      <strong className="text-amber-300 font-extrabold">{u.needAid}</strong>
                    </div>
                  </div>

                  <div className="text-xs text-gray-300 leading-relaxed font-normal">
                    <span className="text-white font-bold block mb-1">🎓 Offered Fields of Study:</span>
                    {u.fields}
                  </div>

                  <div className="text-[11px] text-gray-300 bg-black/40 p-2.5 rounded-xl border-l-2 border-amber-400">
                    📅 <strong>Admission Window:</strong> Opens {u.opening} &bull; Deadline: <strong className="text-amber-300">{u.closing}</strong>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800 flex flex-col gap-3">
                  <a
                    href={u.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0A192F] font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all group-hover:scale-102 text-center"
                  >
                    UNIVERSITY ADMISSION PORTAL <ExternalLink className="w-4 h-4 text-[#0A192F]" />
                  </a>
                  <Link
                    href="/quizzes"
                    className="text-center text-[11px] font-black text-cyan-400 hover:underline transition-colors"
                  >
                    Practice Entry Test MCQs &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===============================================================
          VIEW 2: RELIGIOUS MINORITIES SCHOLARSHIP CARDS
          =============================================================== */}
      {activeTab === 'minorities' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-gradient-to-r from-[#0A192F] via-slate-900 to-[#0A192F] p-8 rounded-3xl border-2 border-cyan-400 shadow-xl space-y-2 text-white">
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-cyan-300">
              🕊️ Dedicated Religious Minority Educational Scholarships
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
              Official government and institutional grants specifically reserved for Christians, Hindus, Sikhs, Parsis, Bahá’ís, and recognized minority students in Punjab, KP, Sindh, Balochistan, and Federal areas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pakistaniMinorityScholarships.map((m, idx) => (
              <div key={idx} className="bg-slate-900 text-white rounded-3xl p-6 border-2 border-slate-800 hover:border-cyan-400 shadow-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-xs font-black uppercase text-cyan-300 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800 w-fit">
                    Minority Scheme &bull; {m.level}
                  </span>
                  <h4 className="text-xl font-black uppercase text-white leading-snug">{m.title}</h4>
                  <p className="text-xs text-amber-300 font-extrabold"><strong>Target Group:</strong> {m.target}</p>
                  <div className="text-xs font-extrabold text-emerald-400 bg-emerald-950/60 p-3 rounded-xl border border-emerald-800/40">
                    {m.funding}
                  </div>
                  <p className="text-xs text-gray-300"><strong>Eligibility Requirements:</strong> {m.eligibility}</p>
                  <div className="bg-slate-800 p-2.5 rounded-lg text-xs text-gray-300">
                    Opens: <strong className="text-white">{m.opening}</strong> &bull; Deadline: <strong className="text-amber-300">{m.closing}</strong>
                  </div>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-800 flex justify-end">
                  <a
                    href={m.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-[#0A192F] font-black text-xs uppercase py-3 px-4 rounded-xl text-center shadow flex items-center justify-center gap-1.5 transition-all"
                  >
                    Official Government Apply Portal <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===============================================================
          VIEW 3: MANDATORY HARDSHIP DOCUMENTS CHECKLIST
          =============================================================== */}
      {activeTab === 'checklist' && (
        <div className="bg-[#0A192F] rounded-3xl border-2 border-emerald-500 p-6 sm:p-10 space-y-8 text-white shadow-2xl animate-in fade-in duration-300">
          <div>
            <span className="text-xs font-black text-emerald-400 uppercase tracking-widest bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
              📂 Official Verification Requirements
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-white mt-3 tracking-tight">
              MANDATORY DOCUMENTS FOR NEED &amp; FINANCIAL AID APPLICATIONS
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 mt-2 font-medium leading-relaxed">
              When submitting applications for university tuition waivers or government financial assistance (such as LUMS Aid, IBA Endowment, NUST Ehsaas/PMMI, or PEEF), you must scan and append clear copies of these verified household documents:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "University Admission / Enrollment Proof", desc: "Copy of confirmed admission letter or active valid university student ID card." },
              { title: "Parent / Guardian Salary Slips", desc: "Latest computerized monthly salary slip or signed employer income verification certificate." },
              { title: "Income Tax Return Declaration", desc: "Copy of latest FBR active tax filing return of father/guardian (or tax exemption affidavit)." },
              { title: "6-Months Official Bank Statements", desc: "Complete attested account statements of parents or primary supporting family household members." },
              { title: "Last 3 Months Utility Bills", desc: "Copies of electricity, gas, water, and telephone bills paid at primary family residence." },
              { title: "CNIC & B-Form Documentation", desc: "Attested photocopies of valid national CNICs of parents/guardians and Family Registration Certificate (FRC)." },
              { title: "Property & Asset Ownership Records", desc: "Declaration of house ownership (rental agreement if leased) and agricultural land/vehicle registers." },
              { title: "Medical / Hardship Expense Proofs", desc: "If family faces extreme ongoing hospitalization or sudden unemployment, attach authentic hospital invoices." }
            ].map((doc, idx) => (
              <div key={idx} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex items-start gap-3.5 hover:border-emerald-400 transition-all shadow-lg">
                <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-white text-sm uppercase">{doc.title}</h4>
                  <p className="text-xs text-gray-300 leading-normal mt-1.5">{doc.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <span className="text-gray-300 font-bold">
              💡 <strong>Pro Tip:</strong> Ensure every PDF attachment is sharp and readable; incomplete utility attachments trigger immediate rejection.
            </span>
            <Link
              href="/jobs"
              className="bg-amber-400 hover:bg-amber-300 text-[#0A192F] font-black uppercase text-xs px-6 py-3.5 rounded-xl shadow-lg shrink-0 inline-flex items-center gap-1.5 transition-transform hover:scale-105"
            >
              Explore Provincial PSC Jobs &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* ── MONETIZED AD CALLOUT BANNER ───────────────────────────────── */}
      <div className="bg-[#0A192F] text-white rounded-3xl p-8 sm:p-10 text-center flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-slate-800 mt-4">
        <div className="space-y-2 max-w-2xl text-left">
          <span className="text-[11px] font-black uppercase tracking-widest text-amber-400 bg-amber-950 px-3 py-1 rounded-full">
            ✨ NEVER MISS AN ADMISSION &amp; SCHOLARSHIP DEADLINE
          </span>
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-2">
            JOIN VIP WHATSAPP ALERT COMMUNITY
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">
            Get instant mobile alerts whenever LUMS, NUST, IBA, UMT, or Provincial Government scholarship windows open. Access free practice multiple choice quizzes and application advice!
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
