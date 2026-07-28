'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  GraduationCap, 
  Globe, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  ArrowRight, 
  ExternalLink, 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  Award, 
  HelpCircle, 
  Search,
  Users,
  MessageCircle,
  TrendingUp,
  AlertCircle
} from 'lucide-react'
import { 
  internationalScholarships, 
  hecSpecialSchemes, 
  germanEposCourses, 
  pakistaniUniversities, 
  pakistaniMinorityScholarships, 
  internationalWomenScholarships 
} from '@/lib/data/scholarshipData'

export default function ScholarshipPortalClient() {
  const [mainTab, setMainTab] = useState<'national' | 'international'>('international')
  const [intlSubTab, setIntlSubTab] = useState<'global' | 'hec' | 'germany' | 'women' | 'workflow'>('global')
  const [natSubTab, setNatSubTab] = useState<'universities' | 'minorities' | 'docs'>('universities')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredIntl = internationalScholarships.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.fields.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredPakUnis = pakistaniUniversities.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.fields.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="bg-[#0A192F] min-h-screen text-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* ── HERO BANNER & MONETIZED WHATSAPP ALERT ───────────────────── */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#112240] via-[#1A365D] to-[#0D254C] border border-cyan-500/30 p-8 sm:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-black uppercase tracking-widest animate-pulse">
                <Sparkles className="w-3.5 h-3.5" /> OFFICIAL SCHOLARSHIP PREVIEW & DIRECTORY 2026–2027
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-none">
                NATIONAL &amp; INTERNATIONAL <span className="text-amber-400">SCHOLARSHIPS PORTAL</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-300 font-medium leading-relaxed">
                Access fully funded study abroad opportunities (UK, USA, Europe, Turkiye, Germany), HEC nomination criteria, Pakistani university financial aid, minority grants and real-time document checklists.
              </p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                <a
                  href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5B] text-[#0A192F] font-black text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5 fill-current" /> Join WhatsApp Scholarship Alert Group
                </a>
                <Link
                  href="/quizzes"
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-[#0A192F] font-black text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  <Award className="w-5 h-5" /> Attempt HAT / GRE Mock Tests &rarr;
                </Link>
              </div>
            </div>

            <div className="w-full md:w-80 bg-[#081222]/80 border border-white/10 p-6 rounded-2xl text-center space-y-3 shrink-0 shadow-inner">
              <GraduationCap className="w-12 h-12 text-amber-400 mx-auto" />
              <div className="text-xl font-extrabold uppercase text-white">Live Monetized Directory</div>
              <p className="text-xs text-gray-400 font-normal leading-normal">
                Updated weekly with authentic deadlined notices directly from British Council, USEFP, HEC Islamabad &amp; German DAAD.
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-cyan-400 font-bold">
                <span>Verified Active Grants:</span>
                <span className="text-white bg-cyan-900/60 px-2 py-0.5 rounded-md">80+ Programs</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── MASTER TOGGLE CARDS: NATIONAL vs INTERNATIONAL ───────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => setMainTab('international')}
            className={`group text-left p-6 sm:p-8 rounded-3xl border-2 transition-all duration-300 relative overflow-hidden ${
              mainTab === 'international'
                ? 'bg-gradient-to-br from-[#1E3A8A] via-[#172554] to-[#0A192F] border-cyan-400 shadow-[0_0_35px_rgba(34,211,238,0.25)] scale-[1.01]'
                : 'bg-[#112240]/80 hover:bg-[#112240] border-gray-700 hover:border-gray-500 text-gray-400'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                <Globe className="w-8 h-8" />
              </div>
              {mainTab === 'international' && (
                <span className="px-3 py-1 bg-cyan-500 text-[#0A192F] font-black text-[11px] uppercase rounded-full tracking-wider animate-pulse">
                  Active Selected &bull; Abroad
                </span>
              )}
            </div>
            <h2 className={`text-2xl sm:text-3xl font-black uppercase tracking-tight mb-2 ${mainTab === 'international' ? 'text-white' : 'text-gray-200'}`}>
              INTERNATIONAL STUDY ABROAD
            </h2>
            <p className="text-xs sm:text-sm font-medium text-gray-300 leading-relaxed">
              Explore Chevening UK, Fulbright USA, Erasmus Mundus Europe, Stipendium Hungaricum, Turkiye Burslari, Germany DAAD EPOS, Australia RTP, Women Grants &amp; Complete HEC Workflow Guide.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-extrabold text-cyan-300">
              <span>View Global Catalog &amp; Application Dates</span> &rarr;
            </div>
          </button>

          <button
            onClick={() => setMainTab('national')}
            className={`group text-left p-6 sm:p-8 rounded-3xl border-2 transition-all duration-300 relative overflow-hidden ${
              mainTab === 'national'
                ? 'bg-gradient-to-br from-[#166534] via-[#052E16] to-[#0A192F] border-amber-400 shadow-[0_0_35px_rgba(251,191,36,0.25)] scale-[1.01]'
                : 'bg-[#112240]/80 hover:bg-[#112240] border-gray-700 hover:border-gray-500 text-gray-400'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 rounded-2xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8" />
              </div>
              {mainTab === 'national' && (
                <span className="px-3 py-1 bg-amber-400 text-[#0A192F] font-black text-[11px] uppercase rounded-full tracking-wider animate-pulse">
                  Active Selected &bull; Pakistan
                </span>
              )}
            </div>
            <h2 className={`text-2xl sm:text-3xl font-black uppercase tracking-tight mb-2 ${mainTab === 'national' ? 'text-white' : 'text-gray-200'}`}>
              NATIONAL SCHOLARSHIPS (PAKISTAN)
            </h2>
            <p className="text-xs sm:text-sm font-medium text-gray-300 leading-relaxed">
              Complete guide to merit waivers and need-based financial assistance at LUMS, IBA, NUST, UMT, FAST, UCP, PEEF Minority educational schemes, and verified hardship document checklists.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-extrabold text-amber-300">
              <span>Explore Pakistani Universities &amp; Minority Grants</span> &rarr;
            </div>
          </button>
        </div>

        {/* ── SEARCH & FILTER BAR ────────────────────────────────────── */}
        <div className="bg-[#112240] rounded-2xl border border-gray-700 p-4 flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${mainTab === 'international' ? 'country (UK, USA, Germany) or scholarship name...' : 'university (LUMS, NUST, IBA) or scholarship criteria...'}`}
            className="w-full bg-transparent text-white font-medium text-sm placeholder-gray-400 focus:outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-xs text-amber-400 hover:underline font-bold shrink-0">
              Clear Filter
            </button>
          )}
        </div>

        {/* ===============================================================
            SECTION 1: INTERNATIONAL STUDY ABROAD PORTAL
            =============================================================== */}
        {mainTab === 'international' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* SUB-TABS BAR */}
            <div className="flex flex-wrap gap-2 pb-2 border-b border-gray-700">
              <button
                onClick={() => setIntlSubTab('global')}
                className={`px-5 py-3 rounded-xl font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all ${
                  intlSubTab === 'global' ? 'bg-cyan-500 text-[#0A192F] shadow-lg' : 'bg-[#112240] text-gray-300 hover:bg-gray-800'
                }`}
              >
                🌐 Top Global &amp; Fully Funded (15+)
              </button>
              <button
                onClick={() => setIntlSubTab('hec')}
                className={`px-5 py-3 rounded-xl font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all ${
                  intlSubTab === 'hec' ? 'bg-amber-500 text-[#0A192F] shadow-lg' : 'bg-[#112240] text-gray-300 hover:bg-gray-800'
                }`}
              >
                🏛️ HEC Foreign Nominations &amp; Portals
              </button>
              <button
                onClick={() => setIntlSubTab('germany')}
                className={`px-5 py-3 rounded-xl font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all ${
                  intlSubTab === 'germany' ? 'bg-green-500 text-[#0A192F] shadow-lg' : 'bg-[#112240] text-gray-300 hover:bg-gray-800'
                }`}
              >
                🇩🇪 Germany DAAD EPOS (20 Courses)
              </button>
              <button
                onClick={() => setIntlSubTab('women')}
                className={`px-5 py-3 rounded-xl font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all ${
                  intlSubTab === 'women' ? 'bg-pink-500 text-white shadow-lg' : 'bg-[#112240] text-gray-300 hover:bg-gray-800'
                }`}
              >
                👩 Women-Only International Grants
              </button>
              <button
                onClick={() => setIntlSubTab('workflow')}
                className={`px-5 py-3 rounded-xl font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all border border-amber-400/50 ${
                  intlSubTab === 'workflow' ? 'bg-[#D97706] text-white shadow-lg' : 'bg-[#112240] text-amber-300 hover:bg-gray-800'
                }`}
              >
                🔥 HEC Ke Sath Kya Scene Hota Hai (Guide)
              </button>
            </div>

            {/* INT'L TAB 1: TOP GLOBAL FULLY FUNDED */}
            {intlSubTab === 'global' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredIntl.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-[#112240] rounded-2xl border border-gray-700/80 hover:border-cyan-400 p-6 shadow-lg flex flex-col justify-between transition-all duration-200 hover:-translate-y-1"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-widest text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800/60">
                          {item.country}
                        </span>
                        <span className="text-[11px] font-black text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-500/30">
                          Verified 2026
                        </span>
                      </div>
                      <h3 className="text-xl font-extrabold text-white uppercase tracking-tight leading-snug">
                        {item.name}
                      </h3>
                      <div className="text-xs font-extrabold text-emerald-400 bg-emerald-950/50 p-2 rounded-lg border border-emerald-800/40">
                        {item.funding}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-gray-700/60">
                        <div className="bg-[#0A192F] p-2.5 rounded-lg border border-white/5">
                          <div className="text-gray-400 font-medium">Typical Opening:</div>
                          <div className="font-extrabold text-white mt-0.5">{item.openingDate}</div>
                        </div>
                        <div className="bg-[#0A192F] p-2.5 rounded-lg border border-white/5">
                          <div className="text-gray-400 font-medium">Closing Deadline:</div>
                          <div className="font-extrabold text-amber-300 mt-0.5">{item.closingDate}</div>
                        </div>
                      </div>

                      <div className="text-xs text-gray-300 leading-relaxed">
                        <strong className="text-white">Eligible Fields:</strong> {item.fields}
                      </div>

                      {item.notes && (
                        <div className="text-[11px] text-gray-400 italic bg-black/20 p-2.5 rounded border-l-2 border-cyan-500">
                          📌 <strong>Requirement Note:</strong> {item.notes}
                        </div>
                      )}
                    </div>

                    <div className="pt-6 mt-6 border-t border-gray-700 flex items-center justify-between gap-3">
                      <Link
                        href="/quizzes"
                        className="text-xs font-extrabold text-amber-400 hover:underline inline-flex items-center gap-1"
                      >
                        Attempt Prep MCQs &rarr;
                      </Link>
                      <a
                        href={item.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-cyan-500 hover:bg-cyan-400 text-[#0A192F] font-black text-xs uppercase px-4 py-2.5 rounded-xl shadow transition-colors"
                      >
                        Official Apply Portal <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* INT'L TAB 2: HEC FOREIGN SCHOLARSHIPS */}
            {intlSubTab === 'hec' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-amber-500/20 via-amber-600/10 to-transparent p-6 rounded-2xl border border-amber-500/40">
                  <h3 className="text-lg font-black uppercase text-amber-300 mb-2 flex items-center gap-2">
                    🏛️ HEC Learning Opportunities Abroad (LOA) &amp; Foreign Nominations
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    The Higher Education Commission (HEC) of Pakistan administers official bilateral nominations for top international governments. For these programs, candidates MUST clear the <strong>HEC HAT Aptitude Test</strong> with at least 60% marks and submit dual applications (on both HEC scholarship portal and host country system).
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {hecSpecialSchemes.map((item) => (
                    <div key={item.id} className="bg-[#112240] rounded-2xl border border-gray-700 p-6 shadow flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="text-xs font-black uppercase text-amber-400 bg-amber-950 px-3 py-1 rounded-full border border-amber-800 w-fit">
                          {item.country} &bull; HEC Route
                        </div>
                        <h4 className="text-xl font-black text-white uppercase">{item.name}</h4>
                        <p className="text-xs text-emerald-400 font-extrabold">{item.funding}</p>
                        <p className="text-xs text-gray-300 font-medium"><strong>Eligibility:</strong> {item.eligible}</p>
                        <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                          <div className="bg-black/20 p-2 rounded">Opens: <span className="text-white font-bold">{item.openingDate}</span></div>
                          <div className="bg-black/20 p-2 rounded">Deadline: <span className="text-amber-300 font-bold">{item.closingDate}</span></div>
                        </div>
                        <div className="text-xs text-gray-400 italic pt-1">💡 {item.notes}</div>
                      </div>
                      <div className="pt-4 mt-4 border-t border-gray-700 flex justify-end">
                        <a href={item.applyUrl} target="_blank" rel="noopener noreferrer" className="bg-amber-500 hover:bg-amber-400 text-[#0A192F] font-black text-xs uppercase px-4 py-2 rounded-lg inline-flex items-center gap-1.5">
                          HEC Scholarship Portal <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* INT'L TAB 3: GERMANY DAAD EPOS (20 COURSES) */}
            {intlSubTab === 'germany' && (
              <div className="space-y-6">
                <div className="bg-green-900/30 p-6 rounded-2xl border border-green-500/40 space-y-2">
                  <h3 className="text-xl font-black uppercase text-green-300">
                    🇩🇪 20 English-Taught Master&apos;s Programs in Germany (DAAD EPOS Funded)
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    These top 20 degree courses are officially recognized under the DAAD EPOS scheme for professionals from Pakistan with at least <strong>2 years of practical work experience</strong> after a Bachelor&apos;s degree. Covers monthly €934 stipend, insurance, tuition and travel aid.
                  </p>
                </div>

                <div className="overflow-x-auto bg-[#112240] rounded-2xl border border-gray-700 shadow-xl">
                  <table className="w-full text-left text-xs text-gray-300">
                    <thead className="bg-[#1A365D] text-white uppercase font-black tracking-wider text-[11px]">
                      <tr>
                        <th className="p-4">#</th>
                        <th className="p-4">German University</th>
                        <th className="p-4">Master&apos;s Degree Program</th>
                        <th className="p-4">Field</th>
                        <th className="p-4">Funding Status</th>
                        <th className="p-4">Opens / Deadline</th>
                        <th className="p-4 text-right">Official Website</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700 font-medium">
                      {germanEposCourses.map((c) => (
                        <tr key={c.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 font-bold text-gray-400">{c.id}.0</td>
                          <td className="p-4 font-black text-white">{c.university}</td>
                          <td className="p-4 text-cyan-300 font-semibold">{c.program}</td>
                          <td className="p-4 text-amber-300">{c.field}</td>
                          <td className="p-4 font-bold text-emerald-400">{c.funding}</td>
                          <td className="p-4 text-gray-300">
                            <span className="text-white font-bold">{c.opening}</span> &bull; Deadline: <span className="text-amber-300 font-bold">{c.closing}</span>
                          </td>
                          <td className="p-4 text-right">
                            <a href={c.applyUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline font-extrabold inline-flex items-center gap-1">
                              Apply <ExternalLink className="w-3 h-3" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* INT'L TAB 4: WOMEN ONLY GRANTS */}
            {intlSubTab === 'women' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-pink-500/20 via-pink-600/10 to-transparent p-6 rounded-2xl border border-pink-500/40">
                  <h3 className="text-xl font-black uppercase text-pink-300 flex items-center gap-2 mb-1">
                    👩 Dedicated International Fellowships &amp; Grants for Women
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300">
                    Specialized worldwide financial fellowships empowering female scholars, scientists and STEM innovators from Pakistan and developing nations.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {internationalWomenScholarships.map((w) => (
                    <div key={w.id} className="bg-[#112240] rounded-2xl border border-pink-500/30 hover:border-pink-400 p-6 shadow-lg flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="text-[11px] font-black uppercase text-pink-300 bg-pink-950 px-3 py-1 rounded-full w-fit">
                          {w.country} &bull; Women Scholarship
                        </div>
                        <h4 className="text-xl font-black text-white uppercase">{w.name}</h4>
                        <div className="text-xs font-black text-emerald-400">{w.funding}</div>
                        <p className="text-xs text-gray-300"><strong>Eligible Fields:</strong> {w.fields}</p>
                        <div className="text-[11px] text-amber-300 bg-black/30 p-2 rounded font-semibold">
                          📅 Application Window: {w.openingDate} &mdash; {w.closingDate}
                        </div>
                        <p className="text-xs text-gray-400 italic">✨ {w.notes}</p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-gray-700 flex justify-end">
                        <a href={w.applyUrl} target="_blank" rel="noopener noreferrer" className="bg-pink-500 hover:bg-pink-400 text-white font-black text-xs uppercase px-4 py-2 rounded-lg inline-flex items-center gap-1.5">
                          Official Foundation Portal <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* INT'L TAB 5: HEC KE SATH KYA SCENE HOTA HAI */}
            {intlSubTab === 'workflow' && (
              <div className="bg-[#112240] rounded-3xl border-2 border-amber-500/50 p-6 sm:p-10 space-y-8 shadow-2xl">
                <div className="border-b border-gray-700 pb-4">
                  <span className="text-xs font-black text-amber-400 uppercase tracking-widest bg-amber-950/80 px-3 py-1 rounded-md border border-amber-600/40">
                    💡 Ultimate Step-by-Step Guidance
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black uppercase text-white mt-3">
                    HEC KE SATH KYA SCENE HOTA HAI? (COMPLETE MASTER GUIDE)
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 font-medium mt-2">
                    Har saal hazaron Pakistani students foreign scholarships ke liye apply karte hain lekin **HEC ke procedural errors** ki wajah se unka form preliminary round me hi reject ho jata hai. Niche bilkul easy aur authentic summary parhe k **HEC ke sath asal system kaisay kaam karta hai**:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#0A192F] p-6 rounded-2xl border border-gray-700/80 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-cyan-500 font-black text-[#0A192F] flex items-center justify-center text-sm shrink-0">1</div>
                      <h4 className="font-extrabold uppercase text-white text-base">Dual Application Process Is Mandatory</h4>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed pt-1">
                      Jab bhi koi Government-to-Government scholarship (jaise <strong>Stipendium Hungaricum, Commonwealth UK, ya Chinese CSC</strong>) aati hai, to aap ko **DOU JAGA (Two Places)** apply karna hota hai: Ek HEC ke online portal (<code>scholarships.hec.gov.pk</code>) par aur dosra Host Country ki official university ya embassy web portal par! Koi ek drop hua to application ZERO mana jata hai.
                    </p>
                  </div>

                  <div className="bg-[#0A192F] p-6 rounded-2xl border border-gray-700/80 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-400 font-black text-[#0A192F] flex items-center justify-center text-sm shrink-0">2</div>
                      <h4 className="font-extrabold uppercase text-white text-base">HAT Test Score (The Real Secret)</h4>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed pt-1">
                      HEC sab applicants ki academic percentage nahi balke apna test leta hai jise **Education Testing Council (ETC) HAT** kaha jata hai. HAT test me <strong>Verbal Reasoning, Quantitative Math, aur Analytical Logic</strong> ati hai. Nominations hasil karne ke liye **Minimum 60 to 75+ Marks** lazmi chahiye hote hain!
                    </p>
                  </div>

                  <div className="bg-[#0A192F] p-6 rounded-2xl border border-gray-700/80 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-400 font-black text-[#0A192F] flex items-center justify-center text-sm shrink-0">3</div>
                      <h4 className="font-extrabold uppercase text-white text-base">Degree Attestation &amp; IBCC Equivalence</h4>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed pt-1">
                      Foreign embassies visa application aur HEC nomination ke waqt **Original Degrees par HEC Attestation stamp** aur Matric/FSc par **IBCC verification stamp** check karti hain. Aakhri din ka intezar na karen; apny tamam documents pehle se attestation portal (<code>eservices.hec.gov.pk</code>) ke zariye verfiy krwa ke rakein.
                    </p>
                  </div>

                  <div className="bg-[#0A192F] p-6 rounded-2xl border border-gray-700/80 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-pink-400 font-black text-[#0A192F] flex items-center justify-center text-sm shrink-0">4</div>
                      <h4 className="font-extrabold uppercase text-white text-base">Medical Certificate &amp; Police Clearance</h4>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed pt-1">
                      Final merit list me naam ane ke baad HEC aap se **District Headquarter Hospital (DHQ)** se signed Official Medical Fitness Certificate aur local SP/Thane se Police Character Certificate (PCC) maangega taake visa timeline miss na ho.
                    </p>
                  </div>
                </div>

                {/* HIGH CONVERSION MOCK TEST MONETIZTION CALLOUT */}
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-6 text-[#0A192F] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                  <div className="space-y-1 text-center md:text-left">
                    <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                      🔥 Want to Ace the HEC HAT, GRE &amp; GAT Tests?
                    </h4>
                    <p className="text-xs sm:text-sm font-bold opacity-90">
                      Practice 5,000+ interactive solved multiple-choice questions with real exam timing &amp; detailed solutions right here on Engineer Yasin Portal!
                    </p>
                  </div>
                  <Link
                    href="/quizzes"
                    className="bg-[#0A192F] hover:bg-[#112749] text-white font-black text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-2xl shrink-0 transition-transform hover:scale-105"
                  >
                    Attempt Free Online Practice Quizzes &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===============================================================
            SECTION 2: NATIONAL SCHOLARSHIPS & UNIVERSITY AID (PAKISTAN)
            =============================================================== */}
        {mainTab === 'national' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* SUB-TABS BAR */}
            <div className="flex flex-wrap gap-2 pb-2 border-b border-gray-700">
              <button
                onClick={() => setNatSubTab('universities')}
                className={`px-5 py-3 rounded-xl font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all ${
                  natSubTab === 'universities' ? 'bg-amber-400 text-[#0A192F] shadow-lg' : 'bg-[#112240] text-gray-300 hover:bg-gray-800'
                }`}
              >
                🏫 Pakistani Universities Aid Directory (25+)
              </button>
              <button
                onClick={() => setNatSubTab('minorities')}
                className={`px-5 py-3 rounded-xl font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all ${
                  natSubTab === 'minorities' ? 'bg-cyan-400 text-[#0A192F] shadow-lg' : 'bg-[#112240] text-gray-300 hover:bg-gray-800'
                }`}
              >
                🕊️ Religious Minorities Scholarships
              </button>
              <button
                onClick={() => setNatSubTab('docs')}
                className={`px-5 py-3 rounded-xl font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all ${
                  natSubTab === 'docs' ? 'bg-emerald-400 text-[#0A192F] shadow-lg' : 'bg-[#112240] text-gray-300 hover:bg-gray-800'
                }`}
              >
                📋 Required Documents Checklist
              </button>
            </div>

            {/* NAT TAB 1: PAKISTANI UNIVERSITIES DIRECTORY */}
            {natSubTab === 'universities' && (
              <div className="space-y-6">
                <div className="bg-amber-500/10 border border-amber-500/30 p-6 rounded-2xl">
                  <h3 className="text-lg sm:text-xl font-black uppercase text-amber-400 mb-1">
                    🇵🇰 Comprehensive Financial Aid &amp; Merit Scholarships Across Pakistan
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    Almost all HEC-recognized premier institutions (LUMS, IBA, NUST, UMT, UCP, FAST) provide up to <strong>100% tuition waivers on merit</strong> and substantial interest-free loans / financial hardship support for undergraduate and Master&apos;s candidates.
                  </p>
                </div>

                <div className="overflow-x-auto bg-[#112240] rounded-2xl border border-gray-700 shadow-xl">
                  <table className="w-full text-left text-xs text-gray-300">
                    <thead className="bg-[#162A4A] text-white uppercase font-black tracking-wider text-[11px]">
                      <tr>
                        <th className="p-4">#</th>
                        <th className="p-4">University &amp; City</th>
                        <th className="p-4">Merit Scholarship</th>
                        <th className="p-4">Need / Hardship Aid</th>
                        <th className="p-4">Eligible Fields</th>
                        <th className="p-4">Admission Windows</th>
                        <th className="p-4 text-right">Official Website</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700 font-medium">
                      {filteredPakUnis.map((u) => (
                        <tr key={u.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 font-bold text-gray-400">{u.id}.0</td>
                          <td className="p-4 font-black text-white">
                            <div>{u.name}</div>
                            <span className="text-[11px] font-bold text-cyan-400">{u.city}</span>
                          </td>
                          <td className="p-4 text-emerald-400 font-bold">{u.meritAid}</td>
                          <td className="p-4 text-amber-300 font-bold">{u.needAid}</td>
                          <td className="p-4 text-gray-300 max-w-xs truncate" title={u.fields}>{u.fields}</td>
                          <td className="p-4 text-gray-300">
                            Opens: <span className="text-white font-bold">{u.opening}</span> &bull; Close: <span className="text-amber-400 font-bold">{u.closing}</span>
                          </td>
                          <td className="p-4 text-right">
                            <a href={u.applyUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline font-extrabold inline-flex items-center gap-1">
                              Portal <ExternalLink className="w-3 h-3" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* NAT TAB 2: RELIGIOUS MINORITIES SCHOLARSHIPS */}
            {natSubTab === 'minorities' && (
              <div className="space-y-6">
                <div className="bg-cyan-950/40 p-6 rounded-2xl border border-cyan-500/40 space-y-2">
                  <h3 className="text-xl font-black uppercase text-cyan-300">
                    🕊️ Dedicated Educational Scholarships for Religious Minorities
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    Government schemes specifically reserved for Pakistani minority candidates (Christians, Hindus, Sikhs, Parsis, Bahá’ís, Kalash) pursuing Intermediate, Bachelor&apos;s, Master&apos;s and PhD professional programs across public and private sector universities.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pakistaniMinorityScholarships.map((m, idx) => (
                    <div key={idx} className="bg-[#112240] rounded-2xl border border-cyan-500/30 hover:border-cyan-400 p-6 shadow-lg flex flex-col justify-between">
                      <div className="space-y-3">
                        <span className="text-xs font-black uppercase text-cyan-300 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
                          Minorities Scheme &bull; {m.level}
                        </span>
                        <h4 className="text-xl font-black text-white uppercase">{m.title}</h4>
                        <p className="text-xs text-amber-400 font-extrabold"><strong>Target Group:</strong> {m.target}</p>
                        <div className="text-xs font-extrabold text-emerald-400 bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-800/40">
                          {m.funding}
                        </div>
                        <p className="text-xs text-gray-300"><strong>Eligibility Criteria:</strong> {m.eligibility}</p>
                        <div className="text-xs text-gray-400 pt-1">
                          📅 <strong>Window:</strong> {m.opening} &mdash; Deadline: <strong className="text-white">{m.closing}</strong>
                        </div>
                      </div>
                      <div className="pt-4 mt-4 border-t border-gray-700 flex justify-end">
                        <a href={m.applyUrl} target="_blank" rel="noopener noreferrer" className="bg-cyan-500 hover:bg-cyan-400 text-[#0A192F] font-black text-xs uppercase px-4 py-2.5 rounded-xl inline-flex items-center gap-1.5 shadow">
                          Official Apply Portal <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* NAT TAB 3: REQUIRED DOCUMENTS CHECKLIST */}
            {natSubTab === 'docs' && (
              <div className="bg-[#112240] rounded-3xl border border-emerald-500/40 p-6 sm:p-10 space-y-8 shadow-2xl">
                <div>
                  <span className="text-xs font-black text-emerald-400 uppercase tracking-widest bg-emerald-950 px-3 py-1 rounded-md border border-emerald-800">
                    📂 Official Verification Checklist
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase text-white mt-3">
                    MANDATORY DOCUMENTS FOR NEED &amp; HARDSHIP AID APPLICATIONS
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 mt-2">
                    Whether you are applying for LUMS Financial Aid, IBA Endowment, NUST Need-based, or HEC scholarships, keep clear photocopies and scanned PDF versions of these exact documents ready to avoid disqualification:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "University Admission Offer / Student ID", desc: "Proof of confirmed admission or current active student enrollment in an eligible program." },
                    { title: "Parent / Guardian Salary Slips", desc: "Latest computerized payslips or employer-signed income certificate (if private/self-employed)." },
                    { title: "Income Tax Return Documents", desc: "Copy of FBR active tax filing return of father/guardian (where applicable or exemption certificate)." },
                    { title: "Last 6 Months Bank Statements", desc: "Complete official account statements of parents or supporting household earning members." },
                    { title: "Last 3 Months Utility Bills", desc: "Copies of electricity, gas, water, and telephone bills associated with household residence." },
                    { title: "Family CNIC & B-Form Copies", desc: "Attested photocopies of valid CNICs of parents/guardians and Family Registration Certificate (FRC)." },
                    { title: "Property & Asset Declarations", desc: "Details of house ownership (rental agreement if on rent) and agricultural land/vehicle records." },
                    { title: "Hardship Medical / Emergency Proofs", desc: "If family is suffering from extreme medical expenses or employment loss, attach hospital reports." }
                  ].map((doc, idx) => (
                    <div key={idx} className="bg-[#0A192F] p-4 rounded-xl border border-gray-700/80 flex items-start gap-3.5 hover:border-emerald-500/50 transition-colors">
                      <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-black text-white text-sm uppercase">{doc.title}</h4>
                        <p className="text-xs text-gray-400 leading-normal mt-1">{doc.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <span className="text-gray-400 font-medium">
                    💡 <strong>Tip for Applicants:</strong> Never upload blurred or unreadable PDFs; universities verify all utility and income parameters digitally.
                  </span>
                  <Link
                    href="/jobs"
                    className="bg-amber-500 hover:bg-amber-400 text-[#0A192F] font-black uppercase px-6 py-3 rounded-xl shadow-lg shrink-0 inline-flex items-center gap-1.5 transition-transform hover:-translate-y-0.5"
                  >
                    Check Public Service Job Portal &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── MONETIZED COMMUNITY BANNER & SEO LINKS ───────────────────── */}
        <div className="bg-[#112240] rounded-3xl border border-cyan-500/40 p-8 sm:p-10 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 bg-cyan-500/10 text-cyan-400 rounded-3xl flex items-center justify-center mx-auto border border-cyan-400/30">
            <Sparkles className="w-8 h-8 animate-bounce" />
          </div>
          <div className="space-y-2 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              NEVER MISS AN OFFICIAL SCHOLARSHIP DEADLINE!
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              We share verified application forms, fee waiver coupon codes, direct university helpline announcements and free solved practice quizzes directly in our VIP student network.
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
            <a
              href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#1EBE5B] text-[#0A192F] font-black text-xs sm:text-sm uppercase px-8 py-4 rounded-xl shadow-xl inline-flex items-center gap-2 transition-transform hover:-translate-y-1"
            >
              <MessageCircle className="w-5 h-5 fill-current" /> Join VIP WhatsApp Group Now &rarr;
            </a>
            <Link
              href="/"
              className="bg-[#0A192F] hover:bg-black text-gray-300 font-bold text-xs sm:text-sm uppercase px-6 py-4 rounded-xl border border-gray-700 transition-colors"
            >
              &larr; Back to Forces Portal
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
