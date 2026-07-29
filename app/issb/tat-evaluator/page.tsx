'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, BrainCircuit, Image as ImageIcon, Send, ShieldAlert, Sparkles, UserRoundCheck } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { evaluateTATStory } from '@/app/actions/ai-tat'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

type TATScenario = {
  id: string
  image_url: string
}

export default function TATEvaluatorPage() {
  const [scenarios, setScenarios] = useState<TATScenario[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [story, setStory] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<{ scores: any, feedback: string } | null>(null)
  const [fetchingImages, setFetchingImages] = useState(true)

  useEffect(() => {
    async function loadScenarios() {
      const { data } = await supabase.from('tat_scenarios').select('*')
      if (data && data.length > 0) {
        // shuffle
        setScenarios(data.sort(() => 0.5 - Math.random()))
      }
      setFetchingImages(false)
    }
    loadScenarios()
  }, [])

  const handleEvaluate = async () => {
    if (story.length < 50) {
      setError('Please write a detailed story of at least 50 characters.')
      return
    }
    
    setError('')
    setLoading(true)
    setResult(null)

    const res = await evaluateTATStory(story)
    
    if (res.error) {
      setError(res.error)
    } else if (res.success && res.data) {
      setResult(res.data)
    }
    
    setLoading(false)
  }

  const nextImage = () => {
    if (scenarios.length > 0) {
      setCurrentIdx((prev) => (prev + 1) % scenarios.length)
    }
    setStory('')
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
              <ImageIcon className="w-8 h-8 text-amber-500" />
              TAT Story AI Evaluator
            </h1>
            <p className="text-gray-500 mt-2 font-medium max-w-2xl">
              Write a complete story based on the picture. Our AI Psychologist will evaluate your Officer Like Qualities (OLQs) and provide instant feedback.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left: Image Viewer */}
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-3xl border border-gray-200 shadow-sm flex flex-col items-center">
              <div className="relative w-full aspect-video bg-gray-200 rounded-2xl overflow-hidden mb-4 border-2 border-dashed border-gray-300">
                {fetchingImages ? (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold">Loading Image...</div>
                ) : scenarios.length > 0 ? (
                  <img src={scenarios[currentIdx].image_url} alt="TAT Scenario" className="w-full h-full object-cover grayscale-[30%] blur-[1px] mix-blend-multiply opacity-90" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 flex-col gap-2 bg-slate-100 p-4 text-center">
                    <ImageIcon className="w-12 h-12 text-slate-300" />
                    <span className="text-sm font-bold">No images found in database.</span>
                  </div>
                )}
              </div>
              
              <button 
                onClick={nextImage}
                disabled={fetchingImages || scenarios.length === 0}
                className="px-6 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50 text-sm font-bold uppercase tracking-wider rounded-xl transition-colors"
              >
                Show Next Picture
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6">
              <h3 className="font-black text-blue-900 mb-2 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5" /> Instructions
              </h3>
              <ul className="text-sm text-blue-800 space-y-2 list-disc pl-5 font-medium">
                <li>What led up to the event shown?</li>
                <li>What is happening at the moment?</li>
                <li>What are the characters feeling and thinking?</li>
                <li>What will be the outcome of the story?</li>
              </ul>
            </div>
          </div>

          {/* Right: Text Editor & Results */}
          <div className="space-y-6">
            
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
              <h3 className="font-black text-gray-800 mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                Your Story
              </h3>
              <textarea
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="Once upon a time..."
                className="w-full h-64 bg-slate-50 border border-gray-300 text-gray-800 text-sm rounded-2xl p-5 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-inner resize-none transition-all leading-relaxed"
                disabled={loading}
              />
              
              {error && <p className="text-xs font-bold text-[#B8212E] mt-3">⚠️ {error}</p>}
              
              <button
                onClick={handleEvaluate}
                disabled={loading || !story.trim()}
                className="mt-4 w-full py-4 bg-[#0A192F] hover:bg-[#B8212E] disabled:bg-slate-300 text-white font-black rounded-2xl text-sm uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><BrainCircuit className="w-5 h-5 animate-spin" /> Evaluating with AI...</>
                ) : (
                  <><Sparkles className="w-5 h-5" /> Evaluate My Story</>
                )}
              </button>
            </div>

            {/* Results Panel */}
            {result && (
              <div className="bg-white border-2 border-emerald-500 rounded-3xl p-6 shadow-xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
                
                <h3 className="font-black text-gray-900 text-xl flex items-center gap-2 mb-6">
                  <UserRoundCheck className="w-6 h-6 text-emerald-600" />
                  Psychological Evaluation
                </h3>
                
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-xs font-black uppercase tracking-wider mb-1">
                      <span className="text-gray-600">Leadership & Initiative</span>
                      <span className={result.scores.leadership >= 7 ? 'text-emerald-600' : 'text-amber-600'}>{result.scores.leadership}/10</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${result.scores.leadership >= 7 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${result.scores.leadership * 10}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-black uppercase tracking-wider mb-1">
                      <span className="text-gray-600">Confidence & Decisiveness</span>
                      <span className={result.scores.confidence >= 7 ? 'text-emerald-600' : 'text-amber-600'}>{result.scores.confidence}/10</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${result.scores.confidence >= 7 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${result.scores.confidence * 10}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-black uppercase tracking-wider mb-1">
                      <span className="text-gray-600">Positivity & Outcome</span>
                      <span className={result.scores.positivity >= 7 ? 'text-emerald-600' : 'text-amber-600'}>{result.scores.positivity}/10</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${result.scores.positivity >= 7 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${result.scores.positivity * 10}%` }} />
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h4 className="text-xs font-black uppercase tracking-wider text-gray-500 mb-2">Psychologist's Remark</h4>
                    <p className="text-sm font-medium text-gray-800 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-gray-100">
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
