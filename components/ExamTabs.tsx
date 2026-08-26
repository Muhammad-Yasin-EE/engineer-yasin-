'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight, CheckCircle2, ExternalLink,
  Users, Calendar, Clock, UserCheck,
  ChevronRight, Zap, FileText, BookOpen,
  ListChecks, Info, GraduationCap, Lock, ShoppingCart, Brain, Sparkles, Flame, Shield
} from 'lucide-react'
import { generateCourseTests, CourseTestItem } from '@/lib/data/branchTestsData'

interface SelectionStep {
  step: number
  title: string
  desc: string
}

interface QuickFact {
  label: string
  value: string
}

interface ExamTabsProps {
  info: {
    title: string
    branch: string
    branchSlug: string
    commissionType: string
    overview: string
    quickFacts: QuickFact[]
    eligibility: string[]
    selectionProcess: SelectionStep[]
    training: string
    commission: string
    officialUrl: string
  }
  quizzes: any[]
  clr: {
    primary: string
    bg: string
    badge: string
    border: string
  }
}

export default function ExamTabs({ info, quizzes, clr }: ExamTabsProps) {
  const [activeTab, setActiveTab] = useState<'preparation' | 'information'>('preparation')

  // Generate 20+ Tests per Category dynamically for this course
  const branchNormalized = (info.branchSlug || 'army').toLowerCase().includes('paf')
    ? 'paf'
    : (info.branchSlug || 'army').toLowerCase().includes('navy')
    ? 'navy'
    : 'army'

  const courseSlugNormalized = info.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'course'

  const allGeneratedTests = generateCourseTests(branchNormalized as any, courseSlugNormalized, info.title)

  const verbalTests = allGeneratedTests.filter(t => t.type === 'verbal')
  const nonVerbalTests = allGeneratedTests.filter(t => t.type === 'non-verbal')
  const academicTests = allGeneratedTests.filter(t => t.type === 'academic')

  const tabs = [
    { id: 'preparation' as const, label: 'Official Practice Tests (60 Tests)', icon: GraduationCap },
    { id: 'information' as const, label: 'Course Eligibility & Process', icon: Info },
  ]

  return (
    <div>
      {/* ── STICKY TAB HEADER BAR ────────────────────────────────────────── */}
      <div className="sticky top-16 z-30 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-6 py-4 text-xs sm:text-sm font-black transition-all cursor-pointer border-b-2 uppercase tracking-wider ${
                    isActive
                      ? 'text-[#B8212E] border-[#B8212E] bg-rose-50/40'
                      : 'text-slate-500 border-transparent hover:text-slate-800 hover:border-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── TAB CONTENT ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── TAB 1: PREPARATION (3 DEDICATED SECTIONS STACKED) ────────────── */}
        {activeTab === 'preparation' && (
          <div className="space-y-16 animate-fadeIn">
            
            {/* Top Overview Banner */}
            <div className="bg-gradient-to-r from-[#0A192F] to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 inline-block">
                  🎖️ {info.branch} Official Selection Hub
                </span>
                <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
                  {info.title} Complete Testing Suite
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-medium">
                  Attempt timed test series across all 3 official modules required for initial computer screening at Selection Centers.
                </p>
              </div>

              {/* Jump To Section Buttons */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-end shrink-0">
                <a href="#verbal-section" className="px-4 py-2 bg-emerald-600/30 border border-emerald-500/50 hover:bg-emerald-600 text-emerald-200 hover:text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all">
                  🧠 Verbal (20) ↓
                </a>
                <a href="#non-verbal-section" className="px-4 py-2 bg-rose-600/30 border border-rose-500/50 hover:bg-rose-600 text-rose-200 hover:text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all">
                  🧩 Non-Verbal (20) ↓
                </a>
                <a href="#academic-section" className="px-4 py-2 bg-indigo-600/30 border border-indigo-500/50 hover:bg-indigo-600 text-indigo-200 hover:text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all">
                  📚 Academic (20) ↓
                </a>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* SECTION 1: VERBAL INTELLIGENCE TESTS (20 Tests)                */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <section id="verbal-section" className="space-y-6 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-emerald-600 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center font-black text-xl shadow-xs">
                    🧠
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                        Section 1
                      </span>
                      <span className="text-xs font-bold text-slate-500">84 MCQs • 30 Minutes • Pass: 50%</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight mt-0.5">
                      Verbal Intelligence Tests ({verbalTests.length} Tests)
                    </h2>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 self-start sm:self-auto">
                  ✓ Official AS&RC Pattern
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {verbalTests.map((test) => (
                  <div
                    key={test.id}
                    className="bg-white border-2 border-slate-200 hover:border-emerald-600 rounded-2xl p-4 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group hover:-translate-y-0.5"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Verbal IQ
                        </span>
                        <span className="text-[11px] font-black text-slate-400">
                          #{test.testNumber}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {test.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-emerald-600" /> 30m</span>
                        <span>•</span>
                        <span>84 MCQs</span>
                      </div>
                    </div>

                    <div className="pt-4 mt-3 border-t border-slate-100">
                      <Link
                        href={`/prep/quiz/${test.id}`}
                        className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        <Flame className="w-3.5 h-3.5 text-amber-300 fill-current" />
                        Attempt Test {test.testNumber} ➔
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* SECTION 2: NON-VERBAL INTELLIGENCE TESTS (20 Tests)            */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <section id="non-verbal-section" className="space-y-6 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#B8212E] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-100 border border-rose-300 text-rose-800 flex items-center justify-center font-black text-xl shadow-xs">
                    🧩
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
                        Section 2
                      </span>
                      <span className="text-xs font-bold text-slate-500">64 Shapes &amp; Diagrams • 30 Minutes • Pass: 50%</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight mt-0.5">
                      Non-Verbal Intelligence Tests ({nonVerbalTests.length} Tests)
                    </h2>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-[#B8212E] bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200 self-start sm:self-auto">
                  ✓ High-DPI Vector Diagrams
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {nonVerbalTests.map((test) => (
                  <div
                    key={test.id}
                    className="bg-white border-2 border-slate-200 hover:border-[#B8212E] rounded-2xl p-4 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group hover:-translate-y-0.5"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                          Non-Verbal
                        </span>
                        <span className="text-[11px] font-black text-slate-400">
                          #{test.testNumber}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-[#B8212E] transition-colors">
                        {test.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-rose-600" /> 30m</span>
                        <span>•</span>
                        <span>64 Diagrams</span>
                      </div>
                    </div>

                    <div className="pt-4 mt-3 border-t border-slate-100">
                      <Link
                        href={`/prep/quiz/${test.id}`}
                        className="w-full py-2.5 bg-[#B8212E] hover:bg-[#961A25] text-white font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        <Flame className="w-3.5 h-3.5 text-amber-300 fill-current" />
                        Attempt Test {test.testNumber} ➔
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* SECTION 3: ACADEMIC SCREENING TESTS (20 Tests)                  */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <section id="academic-section" className="space-y-6 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-indigo-600 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-100 border border-indigo-300 text-indigo-800 flex items-center justify-center font-black text-xl shadow-xs">
                    📚
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-300">
                        Section 3
                      </span>
                      <span className="text-xs font-bold text-slate-500">50 Subject MCQs • 25 Minutes • Pass: 50%</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight mt-0.5">
                      Academic Screening Tests ({academicTests.length} Tests)
                    </h2>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-200 self-start sm:self-auto">
                  ✓ Physics, Math, Eng, GK
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {academicTests.map((test) => (
                  <div
                    key={test.id}
                    className="bg-white border-2 border-slate-200 hover:border-indigo-600 rounded-2xl p-4 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group hover:-translate-y-0.5"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                          Academic
                        </span>
                        <span className="text-[11px] font-black text-slate-400">
                          #{test.testNumber}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-indigo-700 transition-colors">
                        {test.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-indigo-600" /> 25m</span>
                        <span>•</span>
                        <span>50 MCQs</span>
                      </div>
                    </div>

                    <div className="pt-4 mt-3 border-t border-slate-100">
                      <Link
                        href={`/prep/quiz/${test.id}`}
                        className="w-full py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        <Flame className="w-3.5 h-3.5 text-amber-300 fill-current" />
                        Attempt Test {test.testNumber} ➔
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* ── TAB 2: COURSE INFORMATION ───────────────────────────────────── */}
        {activeTab === 'information' && (
          <div className="space-y-12 animate-fadeIn">

            {/* Overview */}
            <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-[#B8212E]" />
                <h2 className="text-xl font-black text-slate-900 uppercase">Overview</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-medium">
                {info.overview}
              </p>
            </section>

            {/* Eligibility & Side Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Eligibility */}
              <section className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <ListChecks className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-lg font-black text-slate-900 uppercase">Eligibility Criteria</h2>
                </div>
                <ul className="space-y-3">
                  {info.eligibility.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 leading-snug font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Commission & Training Side Box */}
              <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-slate-500" />
                  <h3 className="text-sm font-black text-slate-900 uppercase">Commission Details</h3>
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Commissioned As</p>
                    <p className="text-slate-900 font-extrabold mt-0.5">{info.commission}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Training Duration</p>
                    <p className="text-slate-700 font-bold mt-0.5">{info.training}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Commission Type</p>
                    <p className="text-slate-700 font-bold mt-0.5">{info.commissionType}</p>
                  </div>
                </div>

                <a
                  href={info.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 w-full px-4 py-3 rounded-xl bg-[#0A192F] hover:bg-[#B8212E] text-white text-xs font-bold transition-all shadow-md mt-4"
                >
                  <span>Official Recruitment Portal</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </section>
            </div>

            {/* Selection Steps */}
            <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                <h2 className="text-xl font-black text-slate-900 uppercase">Selection Process Roadmap</h2>
              </div>
              <div className="space-y-4">
                {info.selectionProcess.map((step, i) => (
                  <div key={step.step} className="flex gap-4 items-start p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-9 h-9 rounded-xl bg-[#B8212E] text-white font-black text-xs flex items-center justify-center shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">{step.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed font-medium">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

      </div>
    </div>
  )
}
