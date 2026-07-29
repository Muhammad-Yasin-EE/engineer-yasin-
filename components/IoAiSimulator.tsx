'use client'

import { useState } from 'react'
import { BrainCircuit, Activity, ShieldAlert, Sparkles, Move } from 'lucide-react'

export default function IoAiSimulator() {
  const [plan, setPlan] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<{ verdict: string, score: number, pros: string[], cons: string[], feedback: string } | null>(null)

  const handleEvaluate = async () => {
    if (plan.length < 10) {
      setError('Please provide your obstacle sequence.')
      return
    }
    
    setError('')
    setLoading(true)
    setResult(null)

    try {
      const { evaluateIOPlan } = await import('@/app/actions/ai-io')
      const res = await evaluateIOPlan(plan)
      
      if (res.error) {
        setError(res.error)
      } else if (res.success && res.data) {
        setResult(res.data)
      }
    } catch(err) {
      setError('AI Evaluation failed.')
    }
    
    setLoading(false)
  }

  return (
    <div className="w-full mt-16 bg-[#0A192F] rounded-3xl p-6 md:p-10 border border-[#1A2E4C] shadow-2xl">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase flex items-center gap-3">
          <Activity className="w-8 h-8 text-amber-500" />
          Interactive Route Optimizer AI
        </h2>
        <p className="text-gray-400 mt-2 font-medium max-w-2xl">
          Write down the sequence you will attempt the 10 obstacles in to maximize your 55 marks in 3 minutes. The AI will evaluate your pacing logic.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-3xl p-6">
            <h3 className="font-black text-emerald-400 mb-2 flex items-center gap-2">
              <Move className="w-5 h-5" /> Strategy Tips
            </h3>
            <ul className="text-sm text-gray-300 space-y-3 list-disc pl-5 font-medium leading-relaxed">
              <li>Do you start with high marks (Tarzan Swing, Tiger Leap) while fresh?</li>
              <li>Do you start with low marks (Long Jump) as a warmup?</li>
              <li>How do you group obstacles to minimize running distance between them?</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-sm">
            <h3 className="font-black text-white mb-2 uppercase tracking-wider text-sm">Your Obstacle Sequence</h3>
            <textarea
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              placeholder="e.g. 1. Tiger Leap (10), 2. Tarzan Swing (9), 3. Boxing Ring (8)..."
              className="w-full h-32 bg-slate-950 border border-slate-800 text-gray-200 text-sm rounded-2xl p-5 focus:outline-none focus:border-amber-500 shadow-inner resize-none transition-all"
            />
            
            {error && <p className="text-xs font-bold text-[#B8212E] mt-3">⚠️ {error}</p>}
            
            <button
              onClick={handleEvaluate}
              disabled={loading || !plan.trim()}
              className="mt-4 w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white font-black rounded-2xl text-sm uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <><BrainCircuit className="w-5 h-5 animate-spin" /> Analyzing Strategy...</>
              ) : (
                <><Sparkles className="w-5 h-5" /> Evaluate My Sequence</>
              )}
            </button>
          </div>

          {result && (
            <div className={`bg-slate-900 border-2 rounded-3xl p-6 shadow-xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 ${result.verdict.toLowerCase() === 'pass' ? 'border-emerald-500' : 'border-[#B8212E]'}`}>
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl ${result.verdict.toLowerCase() === 'pass' ? 'bg-emerald-500/10' : 'bg-[#B8212E]/10'}`} />
              <h3 className="font-black text-white text-xl flex items-center gap-2 mb-6">
                <ShieldAlert className={`w-6 h-6 ${result.verdict.toLowerCase() === 'pass' ? 'text-emerald-400' : 'text-[#B8212E]'}`} />
                GTO Assessment
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-black uppercase text-gray-500 mb-1">Verdict</span>
                  <span className={`text-xl font-black uppercase ${result.verdict.toLowerCase() === 'pass' ? 'text-emerald-500' : 'text-[#B8212E]'}`}>{result.verdict}</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-black uppercase text-gray-500 mb-1">Score</span>
                  <span className="text-xl font-black text-white">{result.score}/10</span>
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div className="bg-emerald-950/30 p-4 rounded-2xl border border-emerald-900/50">
                  <h4 className="text-xs font-black uppercase text-emerald-500 mb-2">Strengths (Pros)</h4>
                  <ul className="list-disc pl-4 text-sm font-medium text-emerald-400 space-y-1">{result.pros?.map((pro, i) => <li key={i}>{pro}</li>)}</ul>
                </div>
                <div className="bg-red-950/30 p-4 rounded-2xl border border-red-900/50">
                  <h4 className="text-xs font-black uppercase text-red-500 mb-2">Flaws (Cons)</h4>
                  <ul className="list-disc pl-4 text-sm font-medium text-red-400 space-y-1">{result.cons?.map((con, i) => <li key={i}>{con}</li>)}</ul>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-800">
                <p className="text-sm font-medium text-gray-300 leading-relaxed italic">"{result.feedback}"</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
