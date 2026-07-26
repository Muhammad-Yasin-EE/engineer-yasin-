'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { watSets, getWatSetById, WatWord } from '@/lib/data/watData'
import { ArrowLeft, Volume2, VolumeX, Pause, Play, RotateCcw, CheckCircle2, AlertCircle, ShieldCheck, MessageCircle, Maximize2, Sparkles, Brain } from 'lucide-react'

export default function WatTestExecutionPage() {
  const router = useRouter()
  const params = useParams()
  const testId = params.testId as string
  const testSet = getWatSetById(testId) || watSets[0]

  const [testState, setTestState] = useState<'intro' | 'active' | 'paused' | 'complete'>('intro')
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0)
  const [timeLeft, setTimeLeft] = useState<number>(10) // 10 seconds per word
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [hasJoinedWhatsApp, setHasJoinedWhatsApp] = useState<boolean>(false)
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const currentWord: WatWord = testSet.words[currentWordIndex] || testSet.words[0]

  useEffect(() => {
    const joined = localStorage.getItem('wat_joined_group') === 'true'
    if (joined) setHasJoinedWhatsApp(true)
  }, [])

  // ── Web Audio API 1: Slide Change Chime (Plays on every new word display) ──
  const playWordChangeChime = () => {
    if (isMuted) return
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
      const now = audioCtx.currentTime

      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()
      
      osc.type = 'triangle' // Resonant projection bell tone
      osc.frequency.setValueAtTime(1400, now)
      osc.frequency.exponentialRampToValueAtTime(1900, now + 0.12)
      
      gain.gain.setValueAtTime(0.85, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.38)
      
      osc.connect(gain)
      gain.connect(audioCtx.destination)
      osc.start(now)
      osc.stop(now + 0.4)
    } catch (err) {
      console.error('Audio chime error:', err)
    }
  }

  // ── Web Audio API 2: Loud Tactical 9th Second Alert Buzzer (Hoshiyar sound) ──
  const play9thSecondBuzzer = () => {
    if (isMuted) return
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
      const now = audioCtx.currentTime

      // Double square-wave tactical alert
      const osc1 = audioCtx.createOscillator()
      const gain1 = audioCtx.createGain()
      osc1.type = 'square'
      osc1.frequency.setValueAtTime(1000, now)
      osc1.frequency.exponentialRampToValueAtTime(1500, now + 0.14)
      gain1.gain.setValueAtTime(0.75, now)
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.15)
      osc1.connect(gain1)
      gain1.connect(audioCtx.destination)
      osc1.start(now)
      osc1.stop(now + 0.16)

      const osc2 = audioCtx.createOscillator()
      const gain2 = audioCtx.createGain()
      osc2.type = 'square'
      osc2.frequency.setValueAtTime(1600, now + 0.18)
      osc2.frequency.exponentialRampToValueAtTime(2300, now + 0.38)
      gain2.gain.setValueAtTime(0.85, now + 0.18)
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.4)
      osc2.connect(gain2)
      gain2.connect(audioCtx.destination)
      osc2.start(now + 0.18)
      osc2.stop(now + 0.42)
    } catch (err) {
      console.error('Audio synthesizer error:', err)
    }
  }

  // Play chime immediately whenever word switches in active state
  useEffect(() => {
    if (testState === 'active') {
      playWordChangeChime()
    }
  }, [currentWordIndex, testState])

  // Countdown timer logic
  useEffect(() => {
    if (testState === 'active') {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          // Play buzzer at 9th second (1s remaining)
          if (prev === 2) {
            play9thSecondBuzzer()
          }
          if (prev <= 1) {
            if (currentWordIndex < testSet.words.length - 1) {
              setCurrentWordIndex(idx => idx + 1)
              return 10
            } else {
              setTestState('complete')
              if (document.fullscreenElement) {
                document.exitFullscreen().catch(e => console.log(e))
              }
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

    // Enter full screen window projection mode
    try {
      const el = document.documentElement
      if (el.requestFullscreen) {
        el.requestFullscreen().catch(err => console.log('Fullscreen rejected by browser:', err))
      }
    } catch (e) {
      console.log('Fullscreen error:', e)
    }

    setCurrentWordIndex(0)
    setTimeLeft(10)
    setTestState('active')
  }

  const handleQuit = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(e => console.log(e))
    }
    if (timerRef.current) clearInterval(timerRef.current)
    setCurrentWordIndex(0)
    setTimeLeft(10)
    setTestState('intro')
  }

  // Smart Font Auto-Scaler for small 320px mobile screens
  const getWordFontSize = (w: string) => {
    if (!w) return 'text-4xl sm:text-7xl lg:text-9xl'
    if (w.length > 12) return 'text-3xl sm:text-6xl lg:text-8xl'
    if (w.length > 9) return 'text-4xl sm:text-7xl lg:text-9xl'
    if (w.length > 7) return 'text-5xl sm:text-7xl lg:text-9xl'
    return 'text-5xl sm:text-8xl lg:text-9xl'
  }

  // ── INTRO / 2-STEP GATE SCREEN ─────────────────────────────────────────────
  if (testState === 'intro') {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-4 sm:p-8 selection:bg-[#B8212E] selection:text-white font-sans">
        <div className="max-w-3xl mx-auto w-full my-auto space-y-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Background Ambient Glow (Disabled on small phones for 60 FPS performance) */}
          <div className="hidden sm:block absolute -right-20 -top-20 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="hidden sm:block absolute -left-20 -bottom-20 w-80 h-80 bg-[#B8212E]/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Header & Logo */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-6 relative z-10">
            <Link href="/issb/wat" className="inline-flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> All WAT Sets
            </Link>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <Image src="/logo.jpg" alt="Engineer Yasin Logo" width={36} height={36} className="rounded-full border border-[#D4AF37] object-cover shadow" />
              <div className="text-left">
                <span className="text-[11px] sm:text-xs font-black text-white uppercase tracking-wider block">Engineer Yasin</span>
                <span className="text-[9px] font-extrabold text-[#D4AF37] uppercase tracking-widest block">Official ISSB Prep</span>
              </div>
            </div>
          </div>

          {/* Title & Stats */}
          <div className="space-y-3 relative z-10">
            <span className="px-3 py-1 rounded-full bg-[#112240] text-[#D4AF37] border border-[#233554] text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1.5">
              <Maximize2 className="w-3 h-3 text-emerald-400" /> Full-Screen Cinema Mode
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {testSet.title}
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">
              {testSet.description} Attempted exactly as in official ISSB psychological test projector rooms.
            </p>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 py-2 relative z-10">
            <div className="bg-slate-950/80 border border-slate-800/90 p-3 sm:p-4 rounded-2xl text-center">
              <span className="text-xl sm:text-2xl font-black text-amber-400 block">100 Words</span>
              <span className="text-[10px] sm:text-[11px] text-gray-400 uppercase tracking-wider font-bold">Total Battery Count</span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800/90 p-3 sm:p-4 rounded-2xl text-center">
              <span className="text-xl sm:text-2xl font-black text-emerald-400 block">10 Seconds</span>
              <span className="text-[10px] sm:text-[11px] text-gray-400 uppercase tracking-wider font-bold">Slide Chime Beep</span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800/90 p-3 sm:p-4 rounded-2xl text-center">
              <span className="text-xl sm:text-2xl font-black text-rose-500 block">9th Sec Alarm</span>
              <span className="text-[10px] sm:text-[11px] text-gray-400 uppercase tracking-wider font-bold">Loud Alert Tone</span>
            </div>
          </div>

          {/* 2-Step Gate verification Box */}
          <div className="bg-[#112240] border-2 border-emerald-500/40 rounded-3xl p-5 sm:p-6 shadow-xl relative z-10 space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" /> Mandatory Candidate Verification
              </h3>
              {hasJoinedWhatsApp && (
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-extrabold text-[10px] uppercase tracking-wider">
                  ✔ Group Verified
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">
              To unlock full-window projection with audio alarms, candidates must join Engineer Yasin&apos;s official WhatsApp learning community first.
            </p>

            <div className="space-y-3">
              {!hasJoinedWhatsApp ? (
                <>
                  <button
                    onClick={handleWhatsAppJoin}
                    className="w-full py-4 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] active:scale-98 text-white font-black text-xs sm:text-sm uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-3 border border-emerald-400/30 animate-pulse"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" /> 🟢 Step 1: Join Official WhatsApp Group
                  </button>
                  <button
                    disabled
                    className="w-full py-4 rounded-2xl bg-slate-800 border border-slate-700 text-slate-500 font-extrabold text-xs uppercase tracking-wider cursor-not-allowed text-center block"
                  >
                    🔒 Step 2: Launch Full-Screen Test (Join Group First)
                  </button>
                </>
              ) : (
                <button
                  onClick={handleStartFullscreen}
                  className="w-full py-5 rounded-2xl bg-[#B8212E] hover:bg-[#961a25] active:scale-98 text-white font-black text-sm sm:text-base uppercase tracking-widest shadow-2xl transition-all flex items-center justify-center gap-3 border border-rose-400/30 hover:shadow-rose-900/40"
                >
                  🚀 Launch Full-Screen WAT Battery (100 Words) ➔
                </button>
              )}
            </div>
          </div>
          
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
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-3xl font-extrabold mx-auto shadow">
              ✓
            </div>
            <h1 className="text-2xl sm:text-5xl font-black text-white tracking-tight">
              🎉 Test Battery Complete!
            </h1>
            <p className="text-xs sm:text-base text-gray-300 max-w-2xl mx-auto font-medium">
              You have completed all 100 words of <strong className="text-amber-400">{testSet.title}</strong> in official projection time. Now match your written sheet against the vocabulary below to self-evaluate your psychological responses.
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
                Select Another Battery ➔
              </Link>
            </div>
          </div>

          {/* Golden Rules Review Banner */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-base sm:text-lg font-black text-[#D4AF37] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-[#D4AF37]" /> Officer&apos;s Self-Evaluation Checklist
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-medium text-gray-300">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="font-bold text-emerald-400 block mb-1">✓ Constructive Optimism</span>
                Turn negative words (e.g. Suicide, Hate, Death) into positive statements about morale, safety, or courage.
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="font-bold text-amber-400 block mb-1">🚫 Avoid Personal Pronouns</span>
                Avoid starting sentences with &quot;I&quot;, &quot;Me&quot;, or &quot;My&quot; as it signals egocentricity and narrow thinking.
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="font-bold text-rose-400 block mb-1">🚫 No Moral Preaching</span>
                Do not write proverbs or advisory sentences like &quot;We should be kind&quot; or &quot;Honesty is best&quot;.
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="font-bold text-blue-400 block mb-1">⚡ Action &amp; Leadership</span>
                Reflect officer qualities like determination, rapid decision-making, discipline, and patriotism under stress.
              </div>
            </div>
          </div>

          {/* Complete 100 Words Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-6">
              Complete Vocabulary List (100 Words)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5 sm:gap-3">
              {testSet.words.map((w, idx) => {
                let badgeColor = 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5'
                if (w.difficulty === 'moderate') badgeColor = 'text-amber-400 border-amber-500/20 bg-amber-500/5'
                if (w.difficulty === 'hard') badgeColor = 'text-rose-400 border-rose-500/20 bg-rose-500/5'
                
                return (
                  <div key={idx} className={`p-2.5 sm:p-3 rounded-2xl border text-center flex flex-col justify-between gap-1 sm:gap-1.5 ${badgeColor}`}>
                    <span className="text-[9px] sm:text-[10px] opacity-75 font-extrabold">#{idx + 1} • {w.difficulty.toUpperCase()}</span>
                    <span className="text-xs sm:text-sm font-black text-white truncate">{w.word}</span>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    )
  }

  // ── ACTIVE FULL-WINDOW REAL-TIME PROJECTION SCREEN ────────────────────────
  let diffBadge = { label: '🟢 Easy / Basic', bg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' }
  if (currentWord.difficulty === 'moderate') diffBadge = { label: '🟡 Moderate / Action', bg: 'bg-amber-500/10 text-amber-300 border-amber-500/30' }
  if (currentWord.difficulty === 'hard') diffBadge = { label: '🔴 Hard / Psychological Stress', bg: 'bg-rose-500/10 text-rose-300 border-rose-500/30' }

  return (
    <div className="fixed inset-0 z-[99999] w-screen h-screen bg-[#060D1A] text-white flex flex-col justify-between font-sans select-none overflow-hidden p-4 sm:p-8">
      
      {/* Top Header with Engineer Yasin Official Logo Watermark */}
      <header className="w-full flex items-center justify-between border-b border-[#1A2E4C] pb-4 px-2">
        <div className="flex items-center gap-3 sm:gap-4">
          <Image src="/logo.jpg" alt="Engineer Yasin Logo" width={48} height={48} className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 border-[#D4AF37] object-cover shadow-2xl shrink-0" />
          <div>
            <span className="text-base sm:text-2xl font-black text-[#D4AF37] tracking-wider uppercase block leading-tight drop-shadow-md">
              Engineer Yasin ISSB Prep
            </span>
            <span className="text-[10px] sm:text-xs text-gray-300 uppercase font-extrabold tracking-widest flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block"></span> Official Projector Room Battery
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 sm:p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-200 transition-colors border border-slate-700"
            title="Toggle Alarm Mute"
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
          </button>
          
          <button
            onClick={() => setTestState(testState === 'paused' ? 'active' : 'paused')}
            className="px-3 sm:px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors uppercase tracking-wider border border-slate-700"
          >
            {testState === 'paused' ? <Play className="w-4 h-4 text-emerald-400 fill-current" /> : <Pause className="w-4 h-4 text-amber-400" />}
            <span className="hidden xs:inline">{testState === 'paused' ? 'Resume' : 'Pause'}</span>
          </button>

          <button
            onClick={handleQuit}
            className="px-3.5 sm:px-5 py-2 rounded-xl bg-rose-600/20 border border-rose-500/40 text-rose-300 font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-rose-600/40 transition-colors"
          >
            Exit
          </button>
        </div>
      </header>

      {/* Center Cinema Projection Stage */}
      <main className="flex-1 flex flex-col items-center justify-center w-full my-auto text-center relative px-4">
        {/* Background Ambient Spotlight */}
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-slate-950/20 to-transparent pointer-events-none"></div>

        <div className="space-y-6 relative z-10 w-full max-w-5xl">
          {/* Word number and difficulty indicator */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="px-5 py-1.5 rounded-full bg-[#0A192F] border-2 border-[#D4AF37]/50 text-[#D4AF37] text-sm sm:text-lg font-black uppercase tracking-widest shadow-2xl">
              ⚡ Word {currentWordIndex + 1} of 100
            </span>
            <span className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold uppercase border-2 shadow-lg ${diffBadge.bg}`}>
              {diffBadge.label}
            </span>
          </div>

          {/* Giant Word Display Box */}
          <div className="py-16 sm:py-28 bg-gradient-to-b from-[#0C1B33] to-[#081222] border-2 border-[#1E3660] rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] px-6 w-full flex items-center justify-center min-h-[20rem] sm:min-h-[28rem] transition-all">
            {testState === 'paused' ? (
              <div className="space-y-4 text-center">
                <p className="text-3xl font-black text-amber-400 uppercase tracking-widest">⚠️ Projection Paused</p>
                <p className="text-sm text-gray-300">Click Resume in the top right corner to continue from Word #{currentWordIndex + 1}</p>
              </div>
            ) : (
              <h2 className={`${getWordFontSize(currentWord.word)} font-black tracking-[0.05em] sm:tracking-[0.08em] text-white drop-shadow-[0_4px_25px_rgba(255,255,255,0.25)] uppercase transition-all duration-200 break-words max-w-full px-2`}>
                {currentWord.word}
              </h2>
            )}
          </div>
        </div>
      </main>

      {/* Bottom Countdown Clock & Progress */}
      <footer className="w-full space-y-4 pt-4 border-t border-[#1A2E4C] px-2">
        <div className="flex items-center justify-between text-xs sm:text-base font-black uppercase tracking-wider text-gray-200">
          <span className="flex items-center gap-2 text-emerald-400">
            ⏱️ Timer: <strong className="text-white font-extrabold text-lg sm:text-xl bg-slate-900 px-3 py-0.5 rounded border border-slate-700">{timeLeft}s</strong>
          </span>
          
          <span className={`px-3 py-1 rounded-full text-xs sm:text-sm transition-all ${timeLeft <= 2 ? 'bg-rose-600 text-white animate-pulse font-black shadow-[0_0_20px_rgba(244,63,94,0.6)]' : 'text-amber-400 font-bold'}`}>
            {timeLeft <= 2 ? '📢 ALARM: WORD SWITCHING!' : '🔊 Chime plays as word changes & alarm at 9s'}
          </span>

          <span className="text-gray-300">
            Progress: <strong className="text-amber-400">{Math.round(((currentWordIndex + 1) / 100) * 100)}%</strong>
          </span>
        </div>

        {/* Smooth Animated Progress Bar */}
        <div className="w-full h-4 sm:h-5 bg-slate-950 border border-slate-800 rounded-full overflow-hidden shadow-inner p-0.5">
          <div 
            className={`h-full rounded-full transition-all duration-1000 shadow-lg ${timeLeft <= 2 ? 'bg-rose-500 animate-pulse shadow-rose-500/50' : timeLeft <= 5 ? 'bg-amber-400' : 'bg-gradient-to-r from-emerald-500 to-[#25D366]'}`}
            style={{ width: `${((10 - timeLeft) / 10) * 100}%` }}
          />
        </div>

        <p className="text-center text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-widest pt-0.5">
          Write sentences immediately on paper • Do not skip • Build constructive armed forces mentality
        </p>
      </footer>

    </div>
  )
}
