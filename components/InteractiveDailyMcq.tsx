'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Sparkles, CheckCircle2, XCircle, ArrowRight, RotateCcw, Brain, BookOpen } from 'lucide-react'

interface Question {
  category: 'Verbal Intelligence' | 'Academic Physics' | 'General Knowledge'
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

const SAMPLE_QUESTIONS: Question[] = [
  {
    category: 'Verbal Intelligence',
    question: 'Which number comes next in the logical sequence? 2, 6, 12, 20, 30, ?',
    options: ['38', '40', '42', '44'],
    correctIndex: 2,
    explanation: 'The difference between numbers increases by 2 each step (+4, +6, +8, +10, +12). Hence: 30 + 12 = 42.'
  },
  {
    category: 'Academic Physics',
    question: 'The rate of change of momentum of a body is directly proportional to the applied:',
    options: ['Velocity', 'External Force', 'Acceleration', 'Torque'],
    correctIndex: 1,
    explanation: "According to Newton's Second Law of Motion: F = dp/dt. Rate of change of momentum equals applied net force."
  },
  {
    category: 'General Knowledge',
    question: 'Who was the first female recipient of the Nishan-e-Haider in Pakistan Armed Forces?',
    options: ['Major Shabnam', 'N/A (Awarded to Male Combatants)', 'Begum Raana Liaquat', 'Capt. Bilquis'],
    correctIndex: 1,
    explanation: 'To date, Nishan-e-Haider (Pakistan’s highest military gallantry award) has been conferred upon 11 male military personnel.'
  }
]

export default function InteractiveDailyMcq() {
  const [selectedCategory, setSelectedCategory] = useState<number>(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const currentQ = SAMPLE_QUESTIONS[selectedCategory]

  const handleSelect = (idx: number) => {
    if (isSubmitted) return
    setSelectedOption(idx)
    setIsSubmitted(true)
  }

  const handleReset = (newCatIdx: number) => {
    setSelectedCategory(newCatIdx)
    setSelectedOption(null)
    setIsSubmitted(false)
  }

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-[#0A192F] to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-slate-800 relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-[#E63946] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Instant Practice Widget
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Daily Intelligence & Academic Challenge
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Test your preparation instantly with authentic Selection Center MCQs.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60 self-start sm:self-auto overflow-x-auto">
            {SAMPLE_QUESTIONS.map((q, idx) => (
              <button
                key={q.category}
                onClick={() => handleReset(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === idx
                    ? 'bg-[#B8212E] text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {q.category.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Question Text */}
        <div className="p-4 sm:p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 min-h-[90px] flex items-center">
          <p className="text-base sm:text-lg font-bold text-slate-100 leading-relaxed">
            <span className="text-[#D4AF37] font-black mr-2">Q:</span>
            {currentQ.question}
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentQ.options.map((option, idx) => {
            const isChosen = selectedOption === idx
            const isCorrect = idx === currentQ.correctIndex

            let btnStyle = "bg-slate-800/60 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600"
            if (isSubmitted) {
              if (isCorrect) {
                btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500"
              } else if (isChosen && !isCorrect) {
                btnStyle = "bg-rose-950/60 border-rose-500 text-rose-200 ring-1 ring-rose-500"
              } else {
                btnStyle = "bg-slate-800/30 border-slate-800 text-slate-500 opacity-60"
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={isSubmitted}
                className={`w-full p-4 rounded-xl border-2 text-left font-bold text-sm transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer disabled:cursor-default ${btnStyle}`}
              >
                <span className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-slate-700/60 text-slate-300 text-xs flex items-center justify-center font-black">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </span>
                {isSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                {isSubmitted && isChosen && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
              </button>
            )
          })}
        </div>

        {/* Result & Explanation */}
        {isSubmitted && (
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-black text-sm">
                {selectedOption === currentQ.correctIndex ? (
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Correct Answer! Outstanding!
                  </span>
                ) : (
                  <span className="text-rose-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" /> Incorrect Choice. Keep Practicing!
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  setSelectedOption(null)
                  setIsSubmitted(false)
                }}
                className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Try Again
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              <strong className="text-white">Explanation:</strong> {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <span className="text-xs text-slate-400 font-medium">
            Over <strong className="text-white">2,500+ authentic MCQs</strong> available in full mock exams.
          </span>
          <Link
            href="/prep"
            className="w-full sm:w-auto px-6 py-3 bg-[#B8212E] hover:bg-[#961A25] text-white text-xs font-black rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-rose-900/30 transition-all hover:translate-x-0.5"
          >
            Attempt Full 84 Verbal / 50 Academic Test <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
