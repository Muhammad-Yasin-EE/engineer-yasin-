'use client'

import { useState } from 'react'
import { Calendar, ChevronRight, Target, Clock, BookOpen, BrainCircuit } from 'lucide-react'
import Link from 'next/link'

const exams = [
  { id: 'pma', name: 'PMA Long Course' },
  { id: 'gd-pilot', name: 'PAF GD Pilot' },
  { id: 'pn-cadet', name: 'Navy PN Cadet' },
  { id: 'afns', name: 'Army AFNS' }
]

export default function StudyPlannerPage() {
  const [selectedExam, setSelectedExam] = useState('')
  const [examDate, setExamDate] = useState('')
  const [planGenerated, setPlanGenerated] = useState(false)
  const [daysLeft, setDaysLeft] = useState(0)

  const handleGenerate = () => {
    if (!selectedExam || !examDate) return
    const targetDate = new Date(examDate)
    const today = new Date()
    const diffTime = targetDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    setDaysLeft(diffDays > 0 ? diffDays : 0)
    setPlanGenerated(true)
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-[#0A192F] pt-12 pb-24 px-4 text-center rounded-b-[3rem] shadow-lg">
        <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl mb-4">
          <Calendar className="w-8 h-8 text-amber-400" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4">Smart Study Planner</h1>
        <p className="text-gray-300 max-w-xl mx-auto font-medium">Generate a personalized, day-by-day study routine based on your exam date to maximize your chances of recommendation.</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-12 relative z-10">
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col sm:flex-row gap-6">
          <div className="flex-1 space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Select Target Exam</label>
            <select 
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl p-4 focus:outline-none focus:border-[#B8212E] focus:ring-1 focus:ring-[#B8212E]"
            >
              <option value="">-- Choose Exam --</option>
              {exams.map(ex => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
            </select>
          </div>
          
          <div className="flex-1 space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Expected Exam Date</label>
            <input 
              type="date" 
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl p-4 focus:outline-none focus:border-[#B8212E] focus:ring-1 focus:ring-[#B8212E]"
            />
          </div>
          
          <div className="flex items-end">
            <button
              onClick={handleGenerate}
              disabled={!selectedExam || !examDate}
              className="w-full sm:w-auto px-8 py-4 bg-[#B8212E] hover:bg-rose-700 disabled:bg-gray-300 text-white font-black rounded-xl uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2"
            >
              Generate Plan <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {planGenerated && (
          <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-gray-900 uppercase">Your Action Plan</h2>
              <div className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full font-black text-sm border border-amber-200">
                {daysLeft} Days Remaining
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border-t-4 border-emerald-500 shadow-sm hover:shadow-md transition-shadow">
                <Target className="w-8 h-8 text-emerald-500 mb-4" />
                <h3 className="font-black text-gray-900 text-lg mb-2">Phase 1: Foundation ({(daysLeft * 0.4).toFixed(0)} Days)</h3>
                <p className="text-sm text-gray-500 mb-4 font-medium">Focus heavily on basic concepts. Clear your doubts in Physics, English, and basic Mathematics.</p>
                <ul className="text-sm space-y-2 font-semibold text-gray-700">
                  <li>• Read Syllabus Books</li>
                  <li>• Clear fundamental formulas</li>
                  <li>• Practice Non-Verbal basics</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-3xl border-t-4 border-amber-500 shadow-sm hover:shadow-md transition-shadow">
                <BrainCircuit className="w-8 h-8 text-amber-500 mb-4" />
                <h3 className="font-black text-gray-900 text-lg mb-2">Phase 2: Core Practice ({(daysLeft * 0.4).toFixed(0)} Days)</h3>
                <p className="text-sm text-gray-500 mb-4 font-medium">Shift focus from books to active recall. Start solving timed quizzes to build speed.</p>
                <ul className="text-sm space-y-2 font-semibold text-gray-700">
                  <li>• Attempt 3 Quizzes daily</li>
                  <li>• Focus on Verbal Intelligence</li>
                  <li>• Review incorrect answers</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-3xl border-t-4 border-rose-500 shadow-sm hover:shadow-md transition-shadow">
                <Clock className="w-8 h-8 text-rose-500 mb-4" />
                <h3 className="font-black text-gray-900 text-lg mb-2">Phase 3: Final Mock ({(daysLeft * 0.2).toFixed(0)} Days)</h3>
                <p className="text-sm text-gray-500 mb-4 font-medium">Full simulation mode. Treat every practice session exactly like the real exam center.</p>
                <ul className="text-sm space-y-2 font-semibold text-gray-700">
                  <li>• Full Length Mock Tests</li>
                  <li>• Revision of weakest topics</li>
                  <li>• Relax and maintain sleep</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#0A192F] p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-white overflow-hidden relative">
              <div className="absolute right-0 top-0 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h3 className="text-xl font-black uppercase tracking-wide mb-2">Ready to start Phase 1?</h3>
                <p className="text-gray-300 text-sm font-medium">Jump straight into the Quiz Hub and begin your first mock test.</p>
              </div>
              <Link href="/quizzes" className="relative z-10 px-8 py-4 bg-white text-[#0A192F] hover:bg-gray-100 font-black rounded-xl uppercase tracking-widest shadow-lg transition-transform hover:scale-105 shrink-0">
                Go to Quizzes
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
