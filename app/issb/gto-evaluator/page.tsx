'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, BrainCircuit, Image as ImageIcon, Send, ShieldAlert, Sparkles, Flag } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

type GTOScenario = {
  id: string
  image_url: string
  constraints: string[]
  objective: string
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
    ]
  },
  {
    id: 'gto-2',
    image_url: '/images/gto/task-2.jpg',
    objective: 'Cross the double ditch using the provided planks and ropes.',
    constraints: [
      'The central dividing wall is painted blue (only candidates can touch it, materials cannot).',
      'Planks cannot be tied together.',
      'Minimum of 3 candidates must cross together.'
    ]
  }
];

export default function GTOEvaluatorPage() {
  const [scenarios, setScenarios] = useState<GTOScenario[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [plan, setPlan] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<{ feedback: string } | null>(null)
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
          setScenarios(finalData.sort(() => 0.5 - Math.random()))
        }
      } catch (err) {
        setScenarios(fallbackGTOScenarios.sort(() => 0.5 - Math.random()))
      } finally {
        setFetching(false)
      }
    }
    loadScenarios()
  }, [])

  const handleEvaluate = async () => {
    if (plan.length < 30) {
      setError('Please describe your strategy in detail.')
      return
    }
    
    setError('')
    setLoading(true)
    setResult(null)

    // For now we will mock the GTO AI Action as we don't have ai-gto.ts yet, or we can just send it to a generic endpoint if we had one.
    // Let's implement a simple fetch to our AI directly or we should create ai-gto.ts server action
    // But since we are directly doing it, let's just show a placeholder error if action is missing, or we can write the action too!
    // Since we don't have it imported, let's just simulate for now or I will create ai-gto.ts next.
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
    <div className="bg-slate-50 min-h-screen text-gray-800 flex flex-col pb-20">
      <div className="max-w-6xl mx-auto w-full px-4 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-8">
          <div>
            <Link href="/issb" className="inline-flex items-center gap-2 text-xs font-extrabold text-gray-500 hover:text-[#B8212E] transition-colors uppercase tracking-wider mb-2">
              <ArrowLeft className="w-4 h-4" /> Back to ISSB Hub
            </Link>
            <h1 className="text-2xl sm:text-4xl font-black text-[#0A192F] tracking-tight uppercase flex items-center gap-3">
              <Flag className="w-8 h-8 text-amber-500" />
              GTO Command Task AI
            </h1>
            <p className="text-gray-500 mt-2 font-medium max-w-2xl">
              Analyze the obstacle course and write down your strategy to lead your team across. The AI GTO will evaluate your plan.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left: Image & Constraints */}
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-3xl border border-gray-200 shadow-sm flex flex-col items-center">
              <div className="relative w-full aspect-video bg-gray-200 rounded-2xl overflow-hidden mb-4 border-2 border-dashed border-gray-300">
                {fetching ? (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold">Loading GTO Task...</div>
                ) : scenarios.length > 0 ? (
                  <img src={scenarios[currentIdx].image_url} alt="GTO Scenario" className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 flex-col gap-2 bg-slate-100 p-4 text-center">
                    <Flag className="w-12 h-12 text-slate-300" />
                    <span className="text-sm font-bold">No tasks found in database.</span>
                  </div>
                )}
              </div>
              
              <button 
                onClick={nextScenario}
                disabled={fetching || scenarios.length === 0}
                className="px-6 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50 text-sm font-bold uppercase tracking-wider rounded-xl transition-colors"
              >
                Next Task
              </button>
            </div>

            {scenarios.length > 0 && (
              <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6">
                <h3 className="font-black text-amber-900 mb-2 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5" /> Task Briefing
                </h3>
                <p className="text-sm font-bold text-amber-800 mb-4">{scenarios[currentIdx].objective}</p>
                <h4 className="text-xs font-black uppercase text-amber-700 mb-2">Rules & Constraints:</h4>
                <ul className="text-sm text-amber-800 space-y-2 list-disc pl-5 font-medium">
                  {scenarios[currentIdx].constraints?.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right: Text Editor & Results */}
          <div className="space-y-6">
            
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
              <h3 className="font-black text-gray-800 mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                Your Execution Plan
              </h3>
              <textarea
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                placeholder="I will first place the plank on the white drum..."
                className="w-full h-64 bg-slate-50 border border-gray-300 text-gray-800 text-sm rounded-2xl p-5 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-inner resize-none transition-all leading-relaxed"
                disabled={loading || scenarios.length === 0}
              />
              
              {error && <p className="text-xs font-bold text-[#B8212E] mt-3">⚠️ {error}</p>}
              
              <button
                onClick={handleEvaluate}
                disabled={loading || !plan.trim() || scenarios.length === 0}
                className="mt-4 w-full py-4 bg-[#0A192F] hover:bg-[#B8212E] disabled:bg-slate-300 text-white font-black rounded-2xl text-sm uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2"
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
              <div className="bg-white border-2 border-emerald-500 rounded-3xl p-6 shadow-xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
                
                <h3 className="font-black text-gray-900 text-xl flex items-center gap-2 mb-6">
                  <ShieldAlert className="w-6 h-6 text-emerald-600" />
                  GTO Feedback
                </h3>
                
                <div className="space-y-5">
                  <div className="mt-2 pt-2">
                    <p className="text-sm font-medium text-gray-800 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-gray-100 whitespace-pre-line">
                      {result.feedback}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </div>

      </div>
    </div>
  )
}
