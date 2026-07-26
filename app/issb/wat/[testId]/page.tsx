'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { watSets, getWatSetById, WatWord } from '@/lib/data/watData'
import { ArrowLeft, MessageCircle, RotateCcw, ShieldCheck, CheckCircle2 } from 'lucide-react'

export default function WatTestExecutionPage() {
  const router = useRouter()
  const params = useParams()
  const testId = params.testId as string
  const testSet = getWatSetById(testId) || watSets[0]

  const [testState, setTestState] = useState<'intro' | 'active' | 'complete'>('intro')
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0)
  const [hasJoinedWhatsApp, setHasJoinedWhatsApp] = useState<boolean>(false)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const currentWord: WatWord = testSet.words[currentWordIndex] || testSet.words[0]

  useEffect(() => {
    const joined = localStorage.getItem('wat_joined_group') === 'true'
    if (joined) setHasJoinedWhatsApp(true)
  }, [])

  // ── Authentic Air Horn / Hooter Sound (Plays on every word change) ──
  const playAirHorn = useCallback(() => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
      const now = audioCtx.currentTime

      // Air horn / Hooter triad frequencies (F#4, Bb4, C#5) with sawtooth/square blend
      const freqs = [370, 466, 554, 372]
      
      freqs.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator()
        const gain = audioCtx.createGain()

        osc.type = idx % 2 === 0 ? 'sawtooth' : 'square'
        
        // Slight frequency drop at tail to emulate acoustic horn release
        osc.frequency.setValueAtTime(freq, now)
        osc.frequency.linearRampToValueAtTime(freq - 3, now + 0.6)

        // Envelope: immediate brassy punch, sustain, then sharp fade
        gain.gain.setValueAtTime(0.25, now)
        gain.gain.setValueAtTime(0.25, now + 0.45)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6)

        osc.connect(gain)
        gain.connect(audioCtx.destination)

        osc.start(now)
        osc.stop(now + 0.62)
      })
    } catch (err) {
      console.error('Air horn synthesizer error:', err)
    }
  }, [])

  // Play Air Horn immediately when entering active state or switching words
  useEffect(() => {
    if (testState === 'active') {
      playAirHorn()
    }
  }, [currentWordIndex, testState, playAirHorn])

  // 10-Second Automatic Word Switching (No visible clocks or timers in active mode)
  useEffect(() => {
    if (testState === 'active') {
      timerRef.current = setInterval(() => {
        setCurrentWordIndex((prevIdx) => {
          if (prevIdx < testSet.words.length - 1) {
            return prevIdx + 1
          } else {
            // Reached final word
            setTestState('complete')
            if (document.fullscreenElement) {
              document.exitFullscreen().catch(e => console.log(e))
            }
            return prevIdx
          }
        })
      }, 10000) // Exactly 10 seconds per slide
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [testState, testSet.words.length])

  // Listen for browser full screen exit (e.g. pressing Escape key) to return gracefully
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && testState === 'active') {
        // If user pressed ESC, stop timer and return to intro or completion
        if (timerRef.current) clearInterval(timerRef.current)
        setTestState('intro')
        setCurrentWordIndex(0)
      }
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [testState])

  const handleWhatsAppJoin = () => {
    window.open('https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0', '_blank')
    setHasJoinedWhatsApp(true)
    localStorage.setItem('wat_joined_group', 'true')
  }

  const handleStartFullscreen = () => {
    if (!hasJoinedWhatsApp) {
      handleWhatsAppJoin()
      return
    }

    try {
      const el = document.documentElement
      if (el.requestFullscreen) {
        el.requestFullscreen().catch(err => console.log('Fullscreen rejected by browser:', err))
      }
    } catch (e) {
      console.log('Fullscreen error:', e)
    }

    setCurrentWordIndex(0)
    setTestState('active')
  }

  // ── INTRO SCREEN (CLEAN, OFFICIAL ACADEMY STYLE) ───────────────────────────
  if (testState === 'intro') {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-4 sm:p-8 font-sans selection:bg-[#B8212E] selection:text-white">
        <div className="max-w-2xl mx-auto w-full my-auto bg-[#0A192F] border border-[#1A2E4C] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 relative">
          
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <Link href="/issb/wat" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> Return to WAT Directory
            </Link>
            <div className="flex items-center gap-2.5">
              <Image src="/logo.jpg" alt="Engineer Yasin" width={36} height={36} className="rounded-full border border-white/40 object-cover shadow" />
              <span className="text-xs font-black tracking-wider text-white uppercase">Official WAT Projection</span>
            </div>
          </div>

          <div className="text-center space-y-3">
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase">
              {testSet.title}
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto font-medium leading-relaxed">
              {testSet.description} Simulated in strict physical projection room conditions with automatic 10-second slide transition and Air Horn hooter sound.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-3 text-center text-xs font-bold text-gray-300">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="block text-emerald-400 font-black text-lg">100 Words</span>
                <span className="text-[11px] text-gray-400 uppercase">Total Battery</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="block text-amber-400 font-black text-lg">10 Seconds</span>
                <span className="text-[11px] text-gray-400 uppercase">Per Stimulus Word</span>
              </div>
            </div>
            <p className="text-[11px] text-gray-400 pt-1">
              📢 An authentic Air Horn sound plays as every new word appears on screen. Keep your pen ready!
            </p>
          </div>

          {/* Mandatory WhatsApp Gate & Start Button */}
          <div className="space-y-3 pt-2">
            {!hasJoinedWhatsApp ? (
              <div className="space-y-3 bg-[#112240] border border-emerald-500/40 p-5 rounded-2xl text-center">
                <span className="text-xs font-black text-emerald-300 uppercase tracking-wide block">
                  🟢 Step 1: Candidate Group Verification
                </span>
                <p className="text-[11px] sm:text-xs text-gray-300 font-medium">
                  Join Engineer Yasin&apos;s official WhatsApp learning community once to unlock full-window projection simulation forever.
                </p>
                <button
                  onClick={handleWhatsAppJoin}
                  className="w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-xs sm:text-sm uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2 animate-pulse"
                >
                  <MessageCircle className="w-5 h-5 fill-current" /> Join Official WhatsApp Community ➔
                </button>
              </div>
            ) : (
              <button
                onClick={handleStartFullscreen}
                className="w-full py-5 rounded-2xl bg-[#B8212E] hover:bg-[#961a25] active:scale-95 text-white font-black text-sm sm:text-base uppercase tracking-widest shadow-2xl transition-all flex items-center justify-center gap-3 border border-rose-400/30"
              >
                🚀 Launch Full-Screen WAT Battery (100 Words) ➔
              </button>
            )}
          </div>

        </div>
      </div>
    )
  }

  // ── COMPLETION REVIEW SCREEN ──────────────────────────────────────────────
  if (testState === 'complete') {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8 font-sans selection:bg-[#B8212E] selection:text-white pb-24">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="bg-[#0A192F] border border-[#1A2E4C] rounded-3xl p-8 sm:p-12 text-center space-y-5 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-3xl font-extrabold mx-auto shadow">
              ✓
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
              Battery Completed: <span className="text-emerald-400">{testSet.title}</span>
            </h1>
            <p className="text-xs sm:text-base text-gray-300 max-w-xl mx-auto font-medium">
              You attempted all 100 stimulus words in continuous 10-second projector intervals. Review your written answer sheet against the vocabulary sequence below.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={handleStartFullscreen}
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 font-bold text-xs uppercase tracking-wider text-white rounded-xl transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Attempt Again
              </button>
              <Link
                href="/issb/wat"
                className="px-8 py-3.5 bg-[#B8212E] hover:bg-[#961a25] font-black text-xs uppercase tracking-wider text-white rounded-xl shadow-lg transition-colors flex items-center gap-2"
              >
                Return to Directory ➔
              </Link>
            </div>
          </div>

          {/* Complete 100 Words Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-base sm:text-lg font-bold text-white mb-6 uppercase tracking-wider">
              Complete Stimulus Pool ({testSet.words.length} Words)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
              {testSet.words.map((w, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-slate-800 bg-slate-950 text-center flex flex-col justify-between gap-1">
                  <span className="text-[10px] text-gray-400 font-extrabold">#{idx + 1}</span>
                  <span className="text-xs font-black text-white truncate uppercase">{w.word}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    )
  }

  // ── ACTIVE FULLSCREEN TESTING MODE (PURE ACADEMY PROJECTOR STYLE) ─────────
  // No timers, no progress bars, no exit buttons, no difficulty labels!
  // Just pure black background, crisp white frame with ornamental corners, logo top-right, word dead center!
  return (
    <div className="fixed inset-0 z-[999999] w-screen h-screen bg-black text-white flex items-center justify-center p-3 sm:p-6 lg:p-8 select-none overflow-hidden font-sans">
      
      {/* Outer White Frame Box Covering Full Screen */}
      <div className="w-full h-full border-[3px] sm:border-[5px] border-white relative flex items-center justify-center p-4">
        
        {/* Decorative Traditional Corner Ornamentations (Top-Left, Top-Right, Bottom-Left, Bottom-Right) */}
        <div className="absolute top-2 left-2 w-8 h-8 sm:w-12 sm:h-12 border-t-4 border-l-4 border-white pointer-events-none" />
        <div className="absolute top-2 right-2 w-8 h-8 sm:w-12 sm:h-12 border-t-4 border-r-4 border-white pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-8 h-8 sm:w-12 sm:h-12 border-b-4 border-l-4 border-white pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-8 h-8 sm:w-12 sm:h-12 border-b-4 border-r-4 border-white pointer-events-none" />

        {/* Small Academy Logo on Top-Right Corner (Exactly as requested) */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-8 lg:top-8 lg:right-12 flex flex-col items-center gap-1 opacity-95">
          <div className="p-0.5 rounded-full border-2 border-white bg-black">
            <Image 
              src="/logo.jpg" 
              alt="Engineer Yasin Logo" 
              width={64} 
              height={64} 
              className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full object-cover" 
            />
          </div>
          <span className="text-[8px] sm:text-[10px] lg:text-[11px] font-black tracking-widest text-white uppercase mt-0.5 text-center leading-none">
            Engineer Yasin<br />Official Prep
          </span>
        </div>

        {/* Giant Single Word Dead Center in Crisp White */}
        <div className="w-full px-4 text-center my-auto flex items-center justify-center">
          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black tracking-normal text-white uppercase leading-none drop-shadow-md py-6">
            {currentWord.word}
          </h1>
        </div>

      </div>

    </div>
  )
}
