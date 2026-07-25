'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { watSets, getWatSetById, WatWord } from '@/lib/data/watData'
import { ArrowLeft, Volume2, VolumeX, Pause, Play, RotateCcw, CheckCircle2, AlertCircle, ShieldAlert, Sparkles, BookOpen, Clock, Brain } from 'lucide-react'

export default function WatTestExecutionPage() {
  const router = useRouter()
  const params = useParams()
  const testId = params.testId as string
  const testSet = getWatSetById(testId) || watSets[0]

  const [testState, setTestState] = useState<'intro' | 'active' | 'paused' | 'complete'>('intro')
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0)
  const [timeLeft, setTimeLeft] = useState<number>(10) // 10 seconds per word
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const currentWord: WatWord = testSet.words[currentWordIndex] || testSet.words[0]

  // Web Audio API Loud Tactical Alert Siren (Hoshiyar Karne Wali Sound) at the 9th second
  const triggerAlarmBeep = () => {
    if (isMuted) return
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
      const now = audioCtx.currentTime

      // First loud piercing burst (1000Hz -> 1400Hz)
      const osc1 = audioCtx.createOscillator()
      const gain1 = audioCtx.createGain()
      osc1.type = 'square' // Square wave is much louder, crisper, and commanding than sine/sawtooth
      osc1.frequency.setValueAtTime(1000, now)
      osc1.frequency.exponentialRampToValueAtTime(1500, now + 0.15)
      gain1.gain.setValueAtTime(0.7, now)
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.15)
      osc1.connect(gain1)
      gain1.connect(audioCtx.destination)
      osc1.start(now)
      osc1.stop(now + 0.16)

      // Second commanding alarm chime (1500Hz -> 2200Hz) after short pause
      const osc2 = audioCtx.createOscillator()
      const gain2 = audioCtx.createGain()
      osc2.type = 'square'
      osc2.frequency.setValueAtTime(1500, now + 0.2)
      osc2.frequency.exponentialRampToValueAtTime(2200, now + 0.45)
      gain2.gain.setValueAtTime(0.8, now + 0.2)
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.45)
      osc2.connect(gain2)
      gain2.connect(audioCtx.destination)
      osc2.start(now + 0.2)
      osc2.stop(now + 0.46)

    } catch (err) {
      console.error('Audio synthesizer error:', err)
    }
  }

  useEffect(() => {
    if (testState === 'active') {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          // Trigger alert at 9th second (when transitioning from 2s to 1s)
          if (prev === 2) {
            triggerAlarmBeep()
          }
          if (prev <= 1) {
            // Move to next word or complete test
            if (currentWordIndex < testSet.words.length - 1) {
              setCurrentWordIndex(idx => idx + 1)
              return 10
            } else {
              setTestState('complete')
              return 0
            }
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [testState, currentWordIndex, isMuted, testSet.words.length])

  const handleStart = () => {
    setCurrentWordIndex(0)
    setTimeLeft(10)
    setTestState('active')
    // Play a gentle welcome click sound to initialize audio context
    triggerAlarmBeep()
  }

  const handleRestart = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setCurrentWordIndex(0)
    setTimeLeft(10)
    setTestState('intro')
  }

  // ── INTRO / READY SCREEN ──────────────────────────────────────────────────
  if (testState === 'intro') {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-4 sm:p-8 selection:bg-[#B8212E] selection:text-white">
        <div className="max-w-3xl mx-auto w-full my-auto space-y-8 bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-center justify-between border-b border-slate-800 pb-6">
            <Link href="/issb/wat" className="inline-flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> All WAT Sets
            </Link>
            <span className="text-[11px] uppercase tracking-widest font-black px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 rounded-full">
              Engineer Yasin ISSB Prep
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {testSet.title}
            </h1>
            <p className="text-sm text-gray-400 font-medium">
              {testSet.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2">
            <div className="bg-slate-950/70 border border-slate-800/80 p-4 rounded-2xl text-center">
              <span className="text-2xl font-black text-amber-400 block">100 Words</span>
              <span className="text-[11px] text-gray-400 uppercase tracking-wider font-bold">Total Battery Count</span>
            </div>
            <div className="bg-slate-950/70 border border-slate-800/80 p-4 rounded-2xl text-center">
              <span className="text-2xl font-black text-emerald-400 block">10 Seconds</span>
              <span className="text-[11px] text-gray-400 uppercase tracking-wider font-bold">Projection Per Word</span>
            </div>
            <div className="bg-slate-950/70 border border-slate-800/80 p-4 rounded-2xl text-center">
              <span className="text-2xl font-black text-rose-500 block">9th Sec Alarm</span>
              <span className="text-[11px] text-gray-400 uppercase tracking-wider font-bold">Audio Switch Alert</span>
            </div>
          </div>

          <div className="bg-[#112240] border border-[#233554] rounded-2xl p-5 text-xs text-gray-200 font-medium space-y-2">
            <p className="font-bold text-white uppercase text-xs flex items-center gap-1.5 text-[#D4AF37]">
              ⚠️ Important Instructions Before You Proceed:
            </p>
            <p>1. Take out your notebook or answer sheet and pen. Do NOT type answers on screen.</p>
            <p>2. You must construct a meaningful sentence immediately within the 10-second limit.</p>
            <p>3. At second 9, a loud audio buzzer will ring indicating the word is about to change.</p>
          </div>

          <button
            onClick={handleStart}
            className="w-full py-5 rounded-2xl bg-[#B8212E] hover:bg-[#961a25] active:scale-98 text-white font-black text-sm sm:text-base uppercase tracking-wider shadow-2xl transition-all flex items-center justify-center gap-3 border border-rose-400/20"
          >
            🚀 Begin Real-Time Battery (100 Words)
          </button>
        </div>
      </div>
    )
  }

  // ── COMPLETION REVIEW SCREEN ──────────────────────────────────────────────
  if (testState === 'complete') {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8 font-sans selection:bg-[#B8212E] selection:text-white pb-24">
        <div className="max-w-5xl mx-auto space-y-8">
          
          <div className="bg-gradient-to-r from-[#0A192F] via-[#112240] to-[#0A192F] border border-[#233554] rounded-3xl p-8 sm:p-12 text-center space-y-5 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-3xl font-extrabold mx-auto">
              ✓
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              🎉 Test Battery Complete!
            </h1>
            <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto font-medium">
              You have completed all 100 words of <strong className="text-amber-400">{testSet.title}</strong>. Now match your written sheet against the official vocabulary below to self-evaluate your psychological response profile.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={handleRestart}
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 font-bold text-xs uppercase tracking-wider text-white rounded-xl transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Attempt Again
              </button>
              <Link
                href="/issb/wat"
                className="px-8 py-3.5 bg-[#B8212E] hover:bg-[#961a25] font-black text-xs uppercase tracking-wider text-white rounded-xl shadow-lg transition-colors flex items-center gap-2"
              >
                Select Another Battery ➔
              </Link>
            </div>
          </div>

          {/* Golden Rules Review Banner */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg font-black text-[#D4AF37] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-[#D4AF37]" /> Officer&apos;s Self-Evaluation Checklist
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-medium text-gray-300">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="font-bold text-emerald-400 block mb-1">✓ Constructive Optimism</span>
                Turn negative words (e.g. Suicide, Hate, Death) into positive facts about courage or societal safety.
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="font-bold text-amber-400 block mb-1">🚫 Avoid Personal Pronouns</span>
                Avoid starting sentences with &quot;I&quot;, &quot;Me&quot;, or &quot;My&quot; as it signals egocentricity.
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="font-bold text-rose-400 block mb-1">🚫 No Moral Preaching</span>
                Do not write proverbs or advisory sentences like &quot;We should be kind&quot; or &quot;Honesty is best&quot;.
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="font-bold text-blue-400 block mb-1">⚡ Action &amp; Leadership</span>
                Reflect qualities like initiative, determination, teamwork, and quick decision-making under stress.
              </div>
            </div>
          </div>

          {/* Complete 100 Words Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6">
              Complete Vocabulary List (100 Words)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {testSet.words.map((w, idx) => {
                let badgeColor = 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5'
                if (w.difficulty === 'moderate') badgeColor = 'text-amber-400 border-amber-500/20 bg-amber-500/5'
                if (w.difficulty === 'hard') badgeColor = 'text-rose-400 border-rose-500/20 bg-rose-500/5'
                
                return (
                  <div key={idx} className={`p-3 rounded-2xl border text-center flex flex-col justify-between gap-1.5 ${badgeColor}`}>
                    <span className="text-[10px] opacity-75 font-extrabold">#{idx + 1} • {w.difficulty.toUpperCase()}</span>
                    <span className="text-sm font-black text-white truncate">{w.word}</span>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    )
  }

  // ── ACTIVE REAL-TIME PROJECTION SCREEN ────────────────────────────────────
  const percentage = ((10 - timeLeft) / 10) * 100
  let diffBadge = { label: '🟢 Easy / Basic', bg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' }
  if (currentWord.difficulty === 'moderate') diffBadge = { label: '🟡 Moderate / Action', bg: 'bg-amber-500/10 text-amber-300 border-amber-500/30' }
  if (currentWord.difficulty === 'hard') diffBadge = { label: '🔴 Hard / Psychological Stress', bg: 'bg-rose-500/10 text-rose-300 border-rose-500/30' }

  return (
    <div className="min-h-screen bg-[#0A192F] text-white flex flex-col justify-between font-sans selection:bg-[#B8212E] selection:text-white p-4 sm:p-8 select-none overflow-hidden">
      
      {/* Top Controller Bar */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between border border-[#233554] bg-[#112240]/80 backdrop-blur-md px-5 py-3.5 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <span className="text-xs sm:text-sm font-black text-[#D4AF37] tracking-wider uppercase flex items-center gap-1.5">
            🎖️ Engineer Yasin ISSB Prep
          </span>
          <span className="hidden sm:inline-block text-slate-500">|</span>
          <span className="hidden sm:inline-block text-xs font-semibold text-gray-300">
            {testSet.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-gray-200 transition-colors"
            title="Toggle Alarm Mute"
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
          </button>
          
          <button
            onClick={() => setTestState(testState === 'paused' ? 'active' : 'paused')}
            className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors uppercase tracking-wider"
          >
            {testState === 'paused' ? <Play className="w-4 h-4 text-emerald-400 fill-current" /> : <Pause className="w-4 h-4 text-amber-400" />}
            {testState === 'paused' ? 'Resume' : 'Pause'}
          </button>

          <button
            onClick={handleRestart}
            className="px-3.5 py-2 rounded-xl bg-rose-600/20 border border-rose-500/30 text-rose-300 font-bold text-xs uppercase tracking-wider hover:bg-rose-600/30 transition-colors"
          >
            Quit
          </button>
        </div>
      </header>

      {/* Center Word Stage */}
      <main className="flex-1 flex flex-col items-center justify-center my-auto max-w-5xl mx-auto w-full text-center relative px-4">
        {/* Ambient Glow behind Word */}
        <div className="absolute inset-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl mx-auto my-auto pointer-events-none"></div>

        <div className="space-y-6 relative z-10 w-full">
          {/* Word number and difficulty indicator */}
          <div className="flex items-center justify-center gap-3">
            <span className="px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-amber-400 text-xs sm:text-sm font-black uppercase tracking-widest shadow-inner">
              ⚡ Word {currentWordIndex + 1} of 100
            </span>
            <span className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase border ${diffBadge.bg}`}>
              {diffBadge.label}
            </span>
          </div>

          {/* Giant Word Projection */}
          <div className="py-12 sm:py-20 bg-gradient-to-b from-[#112240] to-slate-900 border-2 border-[#233554] rounded-3xl shadow-2xl px-6 w-full flex items-center justify-center min-h-[18rem] sm:min-h-[24rem]">
            {testState === 'paused' ? (
              <div className="space-y-3 text-center">
                <p className="text-2xl font-black text-amber-400 uppercase">Test Paused</p>
                <p className="text-sm text-gray-400">Click Resume in the top bar to continue from word {currentWordIndex + 1}</p>
              </div>
            ) : (
              <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-wider text-white drop-shadow-lg uppercase transition-all duration-300">
                {currentWord.word}
              </h2>
            )}
          </div>
        </div>
      </main>

      {/* Bottom Progress & Timer Bar */}
      <footer className="max-w-6xl mx-auto w-full space-y-4 pt-6">
        <div className="flex items-center justify-between text-xs sm:text-sm font-black uppercase tracking-wider text-gray-300 px-2">
          <span className="flex items-center gap-1.5 text-emerald-400">
            ⏱️ Time Remaining: <strong className="text-white font-extrabold text-base">{timeLeft}s</strong>
          </span>
          <span className="text-rose-400 animate-pulse">
            📢 Audio Alarm rings at 9th Second
          </span>
          <span>
            Progress: {Math.round(((currentWordIndex + 1) / 100) * 100)}%
          </span>
        </div>

        {/* Visual Animated Bar */}
        <div className="w-full h-4 bg-slate-900 border border-slate-800 rounded-full overflow-hidden shadow-inner p-0.5">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${timeLeft <= 2 ? 'bg-rose-500 animate-pulse' : timeLeft <= 5 ? 'bg-amber-400' : 'bg-[#D4AF37]'}`}
            style={{ width: `${((10 - timeLeft) / 10) * 100}%` }}
          />
        </div>

        <p className="text-center text-[11px] text-gray-500 font-bold uppercase tracking-widest pt-1">
          Write immediately on paper • Do not skip • Maintain optimistic tone
        </p>
      </footer>

    </div>
  )
}
