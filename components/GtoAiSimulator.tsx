'use client'

import { useState, useEffect } from 'react'
import { BrainCircuit, Flag, ShieldAlert, Sparkles } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

type GTOScenario = {
  id: string
  image_url: string
  constraints: string[]
  objective: string
  type: string
}

const fallbackGTOScenarios: GTOScenario[] = [
  {
    id: 'gto-1',
    image_url: '/images/gto/task-1.jpg',
    objective: 'Transport the 50kg ammunition box from Start Line to Finish Line without touching the red zones.',
    constraints: [
      'The red painted structures are completely out of bounds for candidates and materials.',
      'You cannot jump more than 4 feet.',
      'The ammunition box must not touch the ground.'
    ],
    type: 'FGT'
  },
  {
    id: 'gto-2',
    image_url: '/images/gto/task-2.jpg',
    objective: 'Cross the double ditch using the provided planks and ropes.',
    constraints: [
      'The central dividing wall is painted blue (only candidates can touch it, materials cannot).',
      'Planks cannot be tied together.',
      'Minimum of 3 candidates must cross together.'
    ],
    type: 'HGT'
  },
  {
    id: 'gto-3',
    image_url: '/images/gto/task-3.jpg',
    objective: 'Progressive Group Task (PGT): Lead your entire 10-man group across the chasm using the central blue drum.',
    constraints: [
      'The central drum is blue: Candidates can step on it, but planks/ropes cannot rest on it.',
      'No candidate can jump over a gap wider than 4 feet.',
      'All group members and material must cross the finish line.'
    ],
    type: 'PGT'
  },
  {
    id: 'gto-4',
    image_url: '/images/gto/task-4.jpg',
    objective: 'Half Group Task (HGT): Navigate the zigzag wooden structure over the red zone.',
    constraints: [
      'The entire ground beneath the zigzag is a red zone.',
      'You cannot tie two planks together to increase length.',
      'Only 4 members are available for this task.'
    ],
    type: 'HGT'
  },
  {
    id: 'gto-5',
    image_url: '/images/gto/task-5.jpg',
    objective: 'Command Task (CT): As the designated commander, lead your subordinates to retrieve the ammunition box over the red fence.',
    constraints: [
      'You cannot participate physically; you can only direct your subordinates.',
      'The red fence extends to infinity on both sides.',
      'You must cantilever the plank to reach the box.'
    ],
    type: 'CT'
  }
];

export default function GtoAiSimulator({ taskType }: { taskType?: string }) {
  const [scenarios, setScenarios] = useState<GTOScenario[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [plan, setPlan] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<{ verdict: string, score: number, pros: string[], cons: string[], feedback: string } | null>(null)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    async function loadScenarios() {
      try {
        const { data, error } = await supabase.from('gto_scenarios').select('*')
        let finalData = data;

        if (error || !data || data.length === 0) {
          finalData = fallbackGTOScenarios;
        }

        if (finalData && finalData.length > 0) {
          if (taskType) {
             finalData = finalData.filter((s: GTOScenario) => s.type === taskType || s.objective.includes(taskType))
             if (finalData.length === 0) finalData = fallbackGTOScenarios;
          }
          setScenarios(finalData.sort(() => 0.5 - Math.random()))
        }
      } catch (err) {
        let fData = fallbackGTOScenarios;
        if (taskType) {
           fData = fData.filter(s => s.type === taskType)
           if (fData.length === 0) fData = fallbackGTOScenarios;
        }
        setScenarios(fData.sort(() => 0.5 - Math.random()))
      } finally {
        setFetching(false)
      }
    }
    loadScenarios()
  }, [taskType])

  const handleEvaluate = async () => {
    if (plan.length < 30) {
      setError('Please describe your strategy in detail.')
      return
    }
    
    setError('')
    setLoading(true)
    setResult(null)

    try {
      const { evaluateGTOPlan } = await import('@/app/actions/ai-gto')
      const res = await evaluateGTOPlan(plan, scenarios[currentIdx].objective, scenarios[currentIdx].constraints)
      
      if (res.error) {
        setError(res.error)
      } else if (res.success && res.data) {
        setResult(res.data)
      }
    } catch(err) {
      setError('AI Evaluation action is missing. Please create ai-gto.ts')
    }
    
    setLoading(false)
  }

  const nextScenario = () => {
    if (scenarios.length > 0) {
      setCurrentIdx((prev) => (prev + 1) % scenarios.length)
    }
    setPlan('')
    setResult(null)
    setError('')
  }

  return (
    <div className="w-full mt-16 bg-[#0A192F] rounded-3xl p-6 md:p-10 border border-[#1A2E4C] shadow-2xl">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase flex items-center gap-3">
          <Flag className="w-8 h-8 text-amber-500" />
          Interactive {taskType ? taskType : 'GTO Task'} AI Simulator
        </h2>
        <p className="text-gray-400 mt-2 font-medium max-w-2xl">
          Analyze the obstacle course and write down your strategy. The AI GTO will evaluate your plan instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: Image & Constraints */}
        <div className="space-y-4">
          <div className="bg-slate-900 p-4 rounded-3xl border border-slate-800 shadow-sm flex flex-col items-center">
            <div className="relative w-full aspect-video bg-slate-950 rounded-2xl overflow-hidden mb-4 border border-slate-800">
              {fetching ? (
                <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-bold">Loading {taskType} Task...</div>
              ) : scenarios.length > 0 ? (
                <img src={scenarios[currentIdx].image_url} alt="GTO Scenario" className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-slate-500 flex-col gap-2 p-4 text-center">
                  <Flag className="w-12 h-12 text-slate-700" />
                  <span className="text-sm font-bold">No tasks found.</span>
                </div>
              )}
            </div>
            
            <button 
              onClick={nextScenario}
              disabled={fetching || scenarios.length === 0}
              className="px-6 py-2 bg-slate-800 text-white hover:bg-slate-700 disabled:opacity-50 text-sm font-bold uppercase tracking-wider rounded-xl transition-colors"
            >
              Load Alternative Scenario
            </button>
          </div>

          {scenarios.length > 0 && (
            <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-3xl p-6">
              <h3 className="font-black text-emerald-400 mb-2 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5" /> Task Briefing
              </h3>
              <p className="text-sm font-bold text-gray-300 mb-4">{scenarios[currentIdx].objective}</p>
              <h4 className="text-xs font-black uppercase text-emerald-500 mb-2">Rules & Constraints:</h4>
              <ul className="text-sm text-gray-400 space-y-2 list-disc pl-5 font-medium">
                {scenarios[currentIdx].constraints?.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right: Text Editor & Results */}
        <div className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-sm">
            <h3 className="font-black text-white mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
              Your Execution Plan
            </h3>
            <textarea
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              placeholder="I will first place the plank on the white drum..."
              className="w-full h-48 bg-slate-950 border border-slate-800 text-gray-200 text-sm rounded-2xl p-5 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-inner resize-none transition-all leading-relaxed"
              disabled={loading || scenarios.length === 0}
            />
            
            {error && <p className="text-xs font-bold text-[#B8212E] mt-3">⚠️ {error}</p>}
            
            <button
              onClick={handleEvaluate}
              disabled={loading || !plan.trim() || scenarios.length === 0}
              className="mt-4 w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white font-black rounded-2xl text-sm uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <><BrainCircuit className="w-5 h-5 animate-spin" /> Analyzing Strategy...</>
              ) : (
                <><Sparkles className="w-5 h-5" /> Evaluate My Plan</>
              )}
            </button>
          </div>

          {/* Results Panel */}
          {result && (
            <div className={`bg-slate-900 border-2 rounded-3xl p-6 shadow-xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 ${result.verdict.toLowerCase() === 'pass' ? 'border-emerald-500' : 'border-[#B8212E]'}`}>
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl ${result.verdict.toLowerCase() === 'pass' ? 'bg-emerald-500/10' : 'bg-[#B8212E]/10'}`} />
              
              <h3 className="font-black text-white text-xl flex items-center gap-2 mb-6">
                <ShieldAlert className={`w-6 h-6 ${result.verdict.toLowerCase() === 'pass' ? 'text-emerald-400' : 'text-[#B8212E]'}`} />
                AI GTO Feedback
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
                  <ul className="list-disc pl-4 text-sm font-medium text-emerald-400 space-y-1">
                    {result.pros?.map((pro, i) => <li key={i}>{pro}</li>)}
                  </ul>
                </div>
                <div className="bg-red-950/30 p-4 rounded-2xl border border-red-900/50">
                  <h4 className="text-xs font-black uppercase text-red-500 mb-2">Flaws (Cons)</h4>
                  <ul className="list-disc pl-4 text-sm font-medium text-red-400 space-y-1">
                    {result.cons?.map((con, i) => <li key={i}>{con}</li>)}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <p className="text-sm font-medium text-gray-300 leading-relaxed italic">
                  "{result.feedback}"
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
