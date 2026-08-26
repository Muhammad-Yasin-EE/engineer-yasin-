'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight, CheckCircle2, ExternalLink,
  Users, Calendar, Clock, UserCheck,
  ChevronRight, Zap, FileText, BookOpen,
  ListChecks, Info, GraduationCap, Lock, ShoppingCart, Brain, Sparkles, Flame
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
  const [activeTab, setActiveTab] = useState<'information' | 'preparation'>('preparation')
  const [testFilter, setTestFilter] = useState<'all' | 'non-verbal' | 'verbal' | 'academic'>('all')

  // Generate 20+ Tests per Category dynamically for this course
  const branchNormalized = (info.branchSlug || 'army').toLowerCase().includes('paf')
    ? 'paf'
    : (info.branchSlug || 'army').toLowerCase().includes('navy')
    ? 'navy'
    : 'army'

  const courseSlugNormalized = info.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'course'

  const allGeneratedTests = generateCourseTests(branchNormalized as any, courseSlugNormalized, info.title)

  const filteredTests = testFilter === 'all' 
    ? allGeneratedTests 
    : allGeneratedTests.filter(t => t.type === testFilter)

  const tabs = [
    { id: 'preparation' as const, label: 'Practice Tests (60+)', icon: GraduationCap },
    { id: 'information' as const, label: 'Course Information', icon: Info },
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

        {/* TAB 1: PREPARATION (20+ Tests Matrix) */}
        {activeTab === 'preparation' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Header & Filter Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <span className="text-[10px] font-black text-[#B8212E] uppercase tracking-widest bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                  Official Selection Bank
                </span>
                <h2 className="text-xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mt-1">
                  {info.title} Practice Tests
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Attempt timed test batteries with official countdown timers, anti-cheat, and instant certificate evaluation.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start sm:self-auto overflow-x-auto">
                <button
                  onClick={() => setTestFilter('all')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    testFilter === 'all'
                      ? 'bg-[#B8212E] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  All (60)
                </button>
                <button
                  onClick={() => setTestFilter('non-verbal')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    testFilter === 'non-verbal'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  <Brain className="w-3.5 h-3.5" /> Non-Verbal (20)
                </button>
                <button
                  onClick={() => setTestFilter('verbal')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    testFilter === 'verbal'
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  Verbal IQ (20)
                </button>
                <button
                  onClick={() => setTestFilter('academic')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    testFilter === 'academic'
                      ? 'bg-indigo-700 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  Academic (20)
                </button>
              </div>
            </div>

            {/* Test Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTests.map((test) => {
                const isNV = test.type === 'non-verbal'
                const isVerbal = test.type === 'verbal'

                let typeColor = 'bg-indigo-50 border-indigo-200 text-indigo-700'
                if (isNV) typeColor = 'bg-rose-50 border-rose-200 text-rose-700'
                if (isVerbal) typeColor = 'bg-emerald-50 border-emerald-200 text-emerald-700'

                return (
                  <div
                    key={test.id}
                    className="bg-white border-2 border-slate-200/80 hover:border-[#B8212E] rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden"
                  >
                    <div className="space-y-3">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${typeColor}`}>
                          {isNV ? '🧩 Non-Verbal Shapes' : isVerbal ? '🧠 Verbal Intelligence' : '📚 Academic Screening'}
                        </span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                          Test #{test.testNumber}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-[#B8212E] transition-colors leading-snug">
                        {test.title}
                      </h3>

                      {/* Meta Tags */}
                      <div className="flex items-center gap-3 text-xs font-bold text-slate-500 pt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-rose-600" /> {test.timeMinutes} Mins
                        </span>
                        <span>•</span>
                        <span>{test.totalQuestions} Questions</span>
                        <span>•</span>
                        <span className="text-emerald-700">Pass: 50%</span>
                      </div>
                    </div>

                    <div className="pt-6 mt-4 border-t border-slate-100">
                      <Link
                        href={`/prep/quiz/${test.id}`}
                        className="w-full py-3 bg-[#B8212E] hover:bg-[#961A25] text-white font-black rounded-xl text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 group-hover:scale-[1.02] transition-all cursor-pointer"
                      >
                        <Flame className="w-4 h-4 text-amber-300 fill-current" />
                        Attempt Test {test.testNumber} <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        )}

        {/* TAB 2: COURSE INFORMATION */}
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
