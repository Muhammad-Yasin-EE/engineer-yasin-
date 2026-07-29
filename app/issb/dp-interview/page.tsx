'use client'

import { useState } from 'react'
import Link from 'next/link'
import { dpInterviewQuestions } from '@/lib/data/issbRemainingData'
import { ArrowLeft, MessageCircle, Award, Shield, HelpCircle, Flame, CheckCircle, Brain, Sparkles, BrainCircuit } from 'lucide-react'

type TabType = 'personal' | 'military' | 'gk' | 'stress'

export default function DpInterviewPage() {
  const [activeTab, setActiveTab] = useState<TabType>('personal')

  const tabContent: Record<TabType, { title: string; questions: { q: string; focus: string }[]; color: string }> = {
    personal: { title: "Personal & Family Bio-Data Questions", questions: dpInterviewQuestions.personalAndFamily, color: "text-amber-400 border-amber-500 bg-amber-500/10" },
    military: { title: "Military Heritage & Defense GK", questions: dpInterviewQuestions.militaryAndDefenseGK, color: "text-emerald-400 border-emerald-500 bg-emerald-500/10" },
    gk: { title: "Current Affairs & Geo-Strategic Borders", questions: dpInterviewQuestions.currentAffairsAndGeoStrategy, color: "text-sky-400 border-sky-500 bg-sky-500/10" },
    stress: { title: "Stress Situations & Rapid Mental Math", questions: dpInterviewQuestions.stressAndRapidFireMath, color: "text-rose-400 border-rose-500 bg-rose-500/10" }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-[#B8212E] selection:text-white pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 max-w-4xl">
          <Link href="/issb" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Return to ISSB Portal
          </Link>
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-amber-400 block">
            Official Deputy President Assessment Module
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight uppercase">
            Deputy President <span className="text-emerald-400">(DP Interview Hub)</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 font-medium leading-relaxed max-w-3xl">
            The Deputy President Interview is a rigorous 30 to 45 minute one-on-one psychological oral examination. Assessors test your emotional maturity, truthfulness, defense awareness, and stress resistance.
          </p>
        </div>

        {/* AI Mock Interview CTA */}
        <div className="bg-gradient-to-r from-amber-900/40 to-amber-700/20 border border-amber-500/30 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-3 z-10 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center justify-center md:justify-start gap-3">
              <BrainCircuit className="w-8 h-8 text-amber-400" />
              Start Interactive AI Mock Interview
            </h2>
            <p className="text-sm text-gray-300 font-medium max-w-xl leading-relaxed">
              Experience a realistic, high-pressure 15-question interview simulator. The AI Deputy President will dynamically cross-question you based on your live Bio-Data Form (PIF).
            </p>
          </div>
          <Link
            href="/issb/dp-interview/ai-mock"
            className="shrink-0 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black uppercase tracking-widest text-sm rounded-2xl shadow-xl hover:shadow-amber-500/20 transition-all flex items-center gap-2"
          >
            Start Interview ➔
          </Link>
        </div>

        {/* Category Navigation Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { id: 'personal', label: "Personal & Family", icon: Award, color: "hover:border-amber-400" },
            { id: 'military', label: "Military & Defense", icon: Shield, color: "hover:border-emerald-400" },
            { id: 'gk', label: "Current Affairs & GK", icon: Sparkles, color: "hover:border-sky-400" },
            { id: 'stress', label: "Stress & Rapid Math", icon: Flame, color: "hover:border-rose-400" }
          ].map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`p-5 rounded-3xl border text-left transition-all flex items-center justify-between shadow-xl ${
                  isActive ? 'bg-[#112240] border-[#D4AF37] scale-[1.02] shadow-amber-950/20' : 'bg-[#0A192F] border-[#1A2E4C] text-gray-400 ' + tab.color
                }`}
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">Question Bank</span>
                  <span className={`text-sm sm:text-base font-black uppercase ${isActive ? 'text-white' : 'text-gray-200'}`}>{tab.label}</span>
                </div>
                <Icon className={`w-6 h-6 shrink-0 ${isActive ? 'text-[#D4AF37]' : 'text-gray-500'}`} />
              </button>
            )
          })}
        </div>

        {/* Questions Display list */}
        <div className="bg-[#0A192F]/90 border border-[#1A2E4C] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-6">
            <h2 className={`text-xl sm:text-2xl font-black uppercase ${tabContent[activeTab].color.split(' ')[0]}`}>
              {tabContent[activeTab].title}
            </h2>
            <span className="text-xs font-extrabold text-gray-400 uppercase">Official Real Batch Archives</span>
          </div>

          <div className="space-y-6">
            {tabContent[activeTab].questions.map((item, idx) => (
              <div key={idx} className="bg-slate-950/90 border border-slate-800 p-6 rounded-2xl space-y-4 hover:border-slate-700 transition-colors shadow-lg">
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-amber-400 flex items-center justify-center font-black text-sm shrink-0">
                    Q{idx + 1}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white font-serif italic pt-0.5">
                    &ldquo;{item.q}&rdquo;
                  </h3>
                </div>
                <div className="pl-12 pt-1 border-t border-slate-900 flex items-center gap-2 text-xs sm:text-sm">
                  <span className="text-emerald-400 font-black uppercase shrink-0">🎯 Assessor Evaluation Target:</span>
                  <span className="text-gray-300 font-medium">{item.focus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Banner */}
        <div className="bg-gradient-to-r from-[#0A192F] to-[#112240] border border-[#1A2E4C] rounded-3xl p-8 sm:p-10 text-center max-w-4xl mx-auto space-y-5 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-black text-white uppercase">Schedule a Mock DP Interview</h3>
          <p className="text-xs sm:text-sm text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Experience real-time interview questions, stress testing, and voice tone assessment over live WhatsApp sessions with Engineer Yasin!
          </p>
          <div className="pt-2">
            <a
              href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-2xl transition-all border border-emerald-400/20"
            >
              <MessageCircle className="w-5 h-5 fill-current" /> Book Mock Interview ➔
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
