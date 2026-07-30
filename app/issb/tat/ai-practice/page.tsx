'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Clock, BookOpen, BrainCircuit, CheckCircle2, AlertTriangle, PenTool } from 'lucide-react'
import { evaluateTATStory } from '@/app/actions/ai-tat'

type TestState = 'INTRO' | 'VIEWING' | 'WRITING' | 'EVALUATING' | 'RESULT'

export default function TATPracticePage() {
  const [testState, setTestState] = useState<TestState>('INTRO')
  const [imageNumber, setImageNumber] = useState<number>(1)
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [story, setStory] = useState('')
  const [evaluation, setEvaluation] = useState<any>(null)
  const [error, setError] = useState('')

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const handleStart = () => {
    // Pick random image 1-9
    const randomImg = Math.floor(Math.random() * 9) + 1
    setImageNumber(randomImg)
    setTestState('VIEWING')
    setTimeLeft(30) // 30 seconds
  }

  useEffect(() => {
    if (testState === 'VIEWING' || testState === 'WRITING') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!)
            handleTimeUp()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [testState])

  const handleTimeUp = () => {
    if (testState === 'VIEWING') {
      setTestState('WRITING')
      setTimeLeft(210) // 3.5 minutes
    } else if (testState === 'WRITING') {
      handleSubmitStory(story)
    }
  }

  const handleSubmitStory = async (submittedStory: string) => {
    if (!submittedStory.trim()) {
      setError('You must write a story to be evaluated.')
      return
    }
    
    if (timerRef.current) clearInterval(timerRef.current)
    
    setTestState('EVALUATING')
    setError('')
    
    const res = await evaluateTATStory(submittedStory, imageNumber)
    
    if (res.error) {
      setError(res.error)
      setTestState('WRITING')
    } else if (res.success) {
      setEvaluation(res.data)
      setTestState('RESULT')
    }
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  if (testState === 'INTRO') {
    return (
      <div className="min-h-screen bg-slate-50 py-10 px-4 font-sans flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
          <Link href="/issb/tat" className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#B8212E] transition-colors uppercase tracking-wider mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to TAT Hub
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-[#B8212E] flex items-center justify-center shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">AI TAT Simulator</h1>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Picture Story Writing</p>
            </div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl mb-8">
            <h3 className="font-black text-amber-900 flex items-center gap-2 mb-3 uppercase text-sm">
              <AlertTriangle className="w-4 h-4" /> Official Testing Rules
            </h3>
            <ul className="space-y-3 text-sm font-medium text-amber-800">
              <li>1. A random ambiguous picture will be shown for exactly <strong>30 seconds</strong>.</li>
              <li>2. Observe the characters, setting, and mood carefully.</li>
              <li>3. The picture will shrink, and you get <strong>3.5 minutes</strong> to write a story.</li>
              <li>4. Your story MUST answer: What led to this? What is happening? What is the outcome?</li>
              <li>5. The AI Psychologist will evaluate your Hero and projected OLQs instantly.</li>
            </ul>
          </div>

          <button 
            onClick={handleStart}
            className="w-full py-4 bg-[#0A192F] hover:bg-[#112644] text-white rounded-xl font-black uppercase text-sm tracking-widest shadow-md transition-all active:scale-95"
          >
            Start Simulator ➔
          </button>
        </div>
      </div>
    )
  }

  if (testState === 'VIEWING') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="max-w-4xl w-full space-y-6">
          <div className="flex justify-between items-center bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-xl">
            <h2 className="text-lg md:text-xl font-black text-white uppercase flex items-center gap-2 tracking-wide">
              <BookOpen className="w-5 h-5 text-amber-500" /> Observation Phase
            </h2>
            <div className="flex items-center gap-2 px-5 py-2 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400 font-black text-2xl tracking-widest">
              <Clock className="w-6 h-6 animate-pulse" /> {formatTime(timeLeft)}
            </div>
          </div>
          
          <div className="relative w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800 animate-in zoom-in-95 duration-500">
             <Image src={`/images/tat/scene-${imageNumber}.jpg`} alt="TAT Scene" fill className="object-contain" priority />
          </div>
          
          <p className="text-center text-slate-400 font-bold uppercase tracking-widest text-sm animate-pulse">Focus on the image. Identify the hero, situation, and background.</p>
        </div>
      </div>
    )
  }

  if (testState === 'WRITING') {
    return (
      <div className="min-h-screen bg-slate-50 py-6 px-4 flex flex-col font-sans">
        <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col md:flex-row gap-6">
          
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-widest text-gray-500">Time Remaining</span>
                <div className={`px-3 py-1 rounded-lg font-black tracking-widest ${timeLeft < 60 ? 'bg-rose-100 text-rose-700 animate-pulse' : 'bg-slate-100 text-slate-700'}`}>
                  {formatTime(timeLeft)}
                </div>
              </div>
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-gray-200 opacity-60 hover:opacity-100 transition-opacity bg-slate-900">
                <Image src={`/images/tat/scene-${imageNumber}.jpg`} alt="TAT Scene Ref" fill className="object-contain" />
              </div>
            </div>
            
            <div className="bg-blue-50 p-5 rounded-3xl border border-blue-100 flex-1">
              <h3 className="font-black text-blue-900 text-sm uppercase mb-4 flex items-center gap-2 tracking-wide">
                <PenTool className="w-4 h-4" /> Story Guidelines
              </h3>
              <ul className="space-y-3 text-sm font-bold text-blue-800/80">
                <li>• Who are the characters?</li>
                <li>• What led up to this situation?</li>
                <li>• What are they thinking/feeling?</li>
                <li>• What is the final logical outcome?</li>
              </ul>
            </div>
          </div>

          <div className="w-full md:w-2/3 bg-white rounded-3xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
               <span className="font-black text-gray-800 uppercase tracking-tight">Write Your Story</span>
               <button 
                  onClick={() => handleSubmitStory(story)}
                  className="px-4 py-1.5 bg-[#B8212E] hover:bg-[#961a25] text-white text-xs font-black uppercase tracking-widest rounded-lg shadow-sm transition-colors"
               >
                 Submit Early
               </button>
            </div>
            
            {error && (
              <div className="bg-rose-50 text-rose-600 p-3 text-sm font-bold border-b border-rose-100 text-center">
                {error}
              </div>
            )}

            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Start your story here..."
              className="flex-1 w-full p-6 focus:outline-none resize-none font-medium text-gray-800 leading-relaxed placeholder-gray-300 text-base md:text-lg"
              autoFocus
            />
          </div>
        </div>
      </div>
    )
  }

  if (testState === 'EVALUATING') {
    return (
      <div className="min-h-screen bg-slate-50 py-10 px-4 flex items-center justify-center font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-xl border border-gray-200 text-center flex flex-col items-center">
          <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center shadow-inner mb-6 relative">
            <BrainCircuit className="w-12 h-12 text-amber-600 animate-pulse" />
            <div className="absolute inset-0 border-4 border-amber-400 rounded-full animate-ping opacity-20"></div>
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-3">AI is Evaluating</h2>
          <p className="text-gray-500 font-medium text-sm leading-relaxed">Analyzing hero projection, emotional tone, and officer-like qualities based on ISSB standards...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link href="/issb/tat" className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#B8212E] transition-colors uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4" /> Back to TAT Hub
        </Link>
        
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-200 animate-in slide-in-from-bottom-8 duration-500">
          <div className="bg-slate-900 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shadow-inner">
                <CheckCircle2 className={`w-8 h-8 ${evaluation?.verdict === 'Pass' ? 'text-emerald-400' : evaluation?.verdict === 'Borderline' ? 'text-amber-400' : 'text-rose-400'}`} />
              </div>
              <div>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-1">Psychologist Verdict</span>
                <h2 className={`text-3xl font-black uppercase tracking-tight ${evaluation?.verdict === 'Pass' ? 'text-emerald-400' : evaluation?.verdict === 'Borderline' ? 'text-amber-400' : 'text-rose-400'}`}>
                  {evaluation?.verdict || 'Unknown'}
                </h2>
              </div>
            </div>
            
            <div className="text-center sm:text-right bg-black/20 px-6 py-3 rounded-2xl border border-white/10">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-1">Score</span>
              <div className="text-4xl font-black text-white">{evaluation?.score}<span className="text-xl text-slate-500">/10</span></div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm relative">
               <div className="absolute top-4 right-4 w-16 h-12 rounded-lg overflow-hidden opacity-50 bg-slate-900">
                  <Image src={`/images/tat/scene-${imageNumber}.jpg`} alt="ref" fill className="object-contain" />
               </div>
               <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">Your Story</h3>
               <p className="text-sm font-medium text-gray-800 italic leading-relaxed whitespace-pre-wrap pr-20">"{story}"</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <h3 className="text-xs font-black text-[#B8212E] uppercase tracking-widest mb-3 flex items-center gap-2">
                    Hero Analysis
                  </h3>
                  <p className="text-sm font-bold text-gray-700 leading-relaxed">{evaluation?.heroAnalysis}</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <h3 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    Plot & Outcome
                  </h3>
                  <p className="text-sm font-bold text-gray-700 leading-relaxed">{evaluation?.plotAnalysis}</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <h3 className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                    Projected OLQs
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {evaluation?.olqs?.map((olq: string, idx: number) => (
                      <span key={idx} className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-black uppercase tracking-wider rounded-lg shadow-sm">
                        {olq}
                      </span>
                    ))}
                    {(!evaluation?.olqs || evaluation.olqs.length === 0) && (
                       <span className="text-sm text-gray-400 italic font-medium">No clear OLQs detected.</span>
                    )}
                  </div>
                </div>
                <div className="bg-amber-50 rounded-2xl border border-amber-200 shadow-sm p-5">
                  <h3 className="text-xs font-black text-amber-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4" /> Psychologist Feedback
                  </h3>
                  <p className="text-sm font-bold text-amber-900 leading-relaxed">
                    {evaluation?.feedback}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100 flex justify-center">
              <button 
                onClick={() => {
                  setStory('')
                  setEvaluation(null)
                  setTestState('INTRO')
                }}
                className="px-8 py-4 bg-[#0A192F] hover:bg-[#112644] text-white font-black uppercase text-sm tracking-widest rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-2"
              >
                Try Another Picture ↺
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
