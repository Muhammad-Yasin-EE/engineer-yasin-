'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { watSets, getWatSetById, WatWord } from '@/lib/data/watData'
import { ArrowLeft, Volume2, VolumeX, Pause, Play, RotateCcw, CheckCircle2, ShieldCheck, MessageCircle, Maximize2, Sun, Moon, Brain, Award, Clock } from 'lucide-react'

export default function WatTestExecutionPage() {
  const router = useRouter()
  const params = useParams()
  const testId = params.testId as string
  const testSet = getWatSetById(testId) || watSets[0]

  const [testState, setTestState] = useState<'intro' | 'active' | 'paused' | 'complete'>('intro')
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0)
  const [timerDuration, setTimerDuration] = useState<number>(10) // default 10 seconds
  const [timeLeft, setTimeLeft] = useState<number>(10)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [hasJoinedWhatsApp, setHasJoinedWhatsApp] = useState<boolean>(false)
  const [projectionTheme, setProjectionTheme] = useState<'dark' | 'white'>('dark')

  // Self-Audit checklist state for completion review
  const [auditChecklist, setAuditChecklist] = useState({
    attemptedAll: false,
    noPronouns: false,
    positiveMorale: false,
    actionOriented: false,
    cleanHandwriting: false
  })

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const currentWord: WatWord = testSet.words[currentWordIndex] || testSet.words[0]

  useEffect(() => {
    const joined = localStorage.getItem('wat_joined_group') === 'true'
    if (joined) setHasJoinedWhatsApp(true)
  }, [])

  // Sync timeLeft when timerDuration is changed by user on intro screen
  useEffect(() => {
    if (testState === 'intro') {
      setTimeLeft(timerDuration)
    }
  }, [timerDuration, testState])

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

  // ── Web Audio API 2: Loud Tactical Alert Buzzer (At 1 second remaining) ──
  const playAlarmBuzzer = () => {
    if (isMuted) return
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
      const now = audioCtx.currentTime

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

  useEffect(() => {
    if (testState === 'active') {
      playWordChangeChime()
    }
  }, [currentWordIndex, testState])

  useEffect(() => {
    if (testState === 'active') {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          // Trigger alarm when 1 second is left (e.g., 9th second on a 10s timer)
          if (prev === 2) {
            playAlarmBuzzer()
          }
          if (prev <= 1) {
            if (currentWordIndex < testSet.words.length - 1) {
              setCurrentWordIndex(idx => idx + 1)
              return timerDuration
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
  }, [testState, currentWordIndex, isMuted, testSet.words.length, timerDuration])

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
    setTimeLeft(timerDuration)
    setTestState('active')
  }

  const handleQuit = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(e => console.log(e))
    }
    if (timerRef.current) clearInterval(timerRef.current)
    setCurrentWordIndex(0)
    setTimeLeft(timerDuration)
    setTestState('intro')
  }

  const getWordFontSize = (w: string) => {
    if (!w) return 'text-4xl sm:text-7xl lg:text-9xl'
    if (w.length > 12) return 'text-3xl sm:text-6xl lg:text-8xl'
    if (w.length > 9) return 'text-4xl sm:text-7xl lg:text-9xl'
    if (w.length > 7) return 'text-5xl sm:text-7xl lg:text-9xl'
    return 'text-5xl sm:text-8xl lg:text-9xl'
  }

  // Calculate self-audit score percentage
  const calcScore = () => {
    const vals = Object.values(auditChecklist)
    const checked = vals.filter(Boolean).length
    return Math.round((checked / 5) * 100)
  }

  // ── INTRO SCREEN (ULTRA-CLEAN EXECUTIVE MINIMALIST DESIGN) ─────────────────
  if (testState === 'intro') {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-4 sm:p-8 selection:bg-[#B8212E] selection:text-white font-sans">
        <div className="max-w-2xl mx-auto w-full my-auto bg-[#0A192F] border border-[#1A2E4C] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden">
          
          {/* Subtle Top Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <Link href="/issb/wat" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> Exit to Directory
            </Link>
            <div className="flex items-center gap-2.5">
              <Image src="/logo.jpg" alt="Engineer Yasin" width={32} height={32} className="rounded-full border border-[#D4AF37] shadow" />
              <span className="text-xs font-black tracking-wider text-[#D4AF37] uppercase">Official WAT Hall</span>
            </div>
          </div>

          {/* Clean Title & Guidance */}
          <div className="text-center space-y-3">
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              {testSet.title}
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto font-medium leading-relaxed">
              {testSet.description} Prepared for high-pressure projector environments with sound alerts.
            </p>
          </div>

          {/* Configuration Box: Speed Selector & Theme */}
          <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-4">
            <div>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2 text-center">
                ⚡ Step 1: Select Slide Projection Speed
              </span>
              <div className="grid grid-cols-3 gap-2 text-xs font-black">
                {[
                  { duration: 15, label: 'Beginner (15s)', color: 'border-emerald-500 text-emerald-400 bg-emerald-500/10' },
                  { duration: 10, label: 'Standard (10s)', color: 'border-[#D4AF37] text-amber-300 bg-amber-500/10' },
                  { duration: 8, label: 'Stress Mode (8s)', color: 'border-rose-500 text-rose-400 bg-rose-500/10' },
                ].map((item) => (
                  <button
                    key={item.duration}
                    onClick={() => setTimerDuration(item.duration)}
                    className={`py-2.5 px-2 rounded-xl border transition-all truncate text-center ${timerDuration === item.duration ? `${item.color} shadow-lg ring-2 ring-white/20` : 'border-slate-800 text-slate-500 bg-slate-900 hover:text-slate-300'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-gray-300">
              <span className="flex items-center gap-1.5">
                {projectionTheme === 'dark' ? <Moon className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
                Projection Hall Theme:
              </span>
              <button
                onClick={() => setProjectionTheme(projectionTheme === 'dark' ? 'white' : 'dark')}
                className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 hover:border-[#D4AF37] text-xs font-black text-[#D4AF37] uppercase transition-colors"
              >
                {projectionTheme === 'dark' ? '🌙 Deep Dark Cinema' : '☀️ White Classroom Slide'}
              </button>
            </div>
          </div>

          {/* WhatsApp Verification Gate / Launch Button */}
          <div className="space-y-3 pt-2">
            {!hasJoinedWhatsApp ? (
              <div className="space-y-3 bg-[#112240] border border-emerald-500/40 p-5 rounded-2xl text-center">
                <span className="text-xs font-black text-emerald-300 uppercase tracking-wide block">
                  🟢 Step 2: Security Gate (One-Time Verification)
                </span>
                <p className="text-[11px] sm:text-xs text-gray-300 font-medium">
                  Join Engineer Yasin&apos;s official candidate WhatsApp community to unblock full-window simulation mode forever.
                </p>
                <button
                  onClick={handleWhatsAppJoin}
                  className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-xs sm:text-sm uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5 fill-current" /> Join Official WhatsApp Community ➔
                </button>
              </div>
            ) : (
              <button
                onClick={handleStartFullscreen}
                className="w-full py-5 rounded-2xl bg-[#B8212E] hover:bg-[#961a25] active:scale-95 text-white font-black text-sm sm:text-base uppercase tracking-widest shadow-2xl transition-all flex items-center justify-center gap-3 border border-rose-400/30"
              >
                🚀 Launch Full-Screen WAT Battery ({timerDuration}s Timer) ➔
              </button>
            )}
          </div>

        </div>
      </div>
    )
  }

  // ── COMPLETION REVIEW SCREEN (WITH SELF-AUDIT CALCULATOR) ─────────────────
  if (testState === 'complete') {
    const score = calcScore()
    return (
      <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8 font-sans selection:bg-[#B8212E] selection:text-white pb-24">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="bg-[#0A192F] border border-[#1A2E4C] rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-2xl">
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              🎉 Battery Completed: <span className="text-emerald-400">{testSet.title}</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto font-medium">
              You attempted 100 words in official sequential timing. Before submitting or closing your answer sheet, run this mandatory Self-Audit Checklist to compute your recommendation chance.
            </p>

            {/* Interactive Self-Audit Score Calculator */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-left my-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm sm:text-base font-black text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#D4AF37]" /> Interactive Officer Likelihood Calculator
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${score >= 80 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : score >= 40 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}>
                  Estimated Likelihood: {score}%
                </span>
              </div>

              <div className="space-y-2 text-xs font-bold">
                {[
                  { id: 'attemptedAll', text: 'I attempted 90+ words without leaving excessive blank gaps in my numbering sequence.' },
                  { id: 'noPronouns', text: 'I avoided personal pronouns (I, Me, My, Mine) in almost all of my constructed sentences.' },
                  { id: 'positiveMorale', text: 'I transformed negative stress words (Suicide, Death, Defeat, Dark) into positive constructive statements.' },
                  { id: 'actionOriented', text: 'I avoided childish moral preaching ("We should never lie", "Honesty is good") and showed real leadership.' },
                  { id: 'cleanHandwriting', text: 'My handwriting remained legible under the 10-second timer pressure.' },
                ].map((chk) => (
                  <label key={chk.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:bg-slate-800/40 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={auditChecklist[chk.id as keyof typeof auditChecklist]}
                      onChange={(e) => setAuditChecklist({ ...auditChecklist, [chk.id]: e.target.checked })}
                      className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 bg-slate-900 border-slate-700"
                    />
                    <span className="text-gray-200">{chk.text}</span>
                  </label>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-[#112240] border border-[#233554] text-xs font-medium text-gray-300">
                <strong className="text-white block mb-1">🎓 Engineer Yasin&apos;s Feedback:</strong>
                {score >= 80 
                  ? 'Excellent! Your subconscious orientation aligns closely with military officer leadership attributes. Continue daily timed battery drills to cement your reaction consistency.'
                  : 'Needs Improvement: Do not rush into generic sentences. Review our Solved WAT Notes to learn how to instantly pivot stress vocabulary into decisive leadership reactions.'}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={handleStartFullscreen}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 font-bold text-xs uppercase tracking-wider text-white rounded-xl transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Attempt Again
              </button>
              <Link
                href="/issb/wat"
                className="px-8 py-3 bg-[#B8212E] hover:bg-[#961a25] font-black text-xs uppercase tracking-wider text-white rounded-xl shadow-lg transition-colors flex items-center gap-2"
              >
                Return to Directory ➔
              </Link>
            </div>
          </div>

          {/* Complete 100 Words Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-base sm:text-lg font-bold text-white mb-4">
              Complete Vocabulary Review Pool ({testSet.words.length} Words)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
              {testSet.words.map((w, idx) => {
                let badgeColor = 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5'
                if (w.difficulty === 'moderate') badgeColor = 'text-amber-400 border-amber-500/20 bg-amber-500/5'
                if (w.difficulty === 'hard') badgeColor = 'text-rose-400 border-rose-500/20 bg-rose-500/5'
                
                return (
                  <div key={idx} className={`p-2.5 rounded-xl border text-center flex flex-col justify-between gap-1 ${badgeColor}`}>
                    <span className="text-[9px] opacity-75 font-extrabold">#{idx + 1} • {w.difficulty.toUpperCase()}</span>
                    <span className="text-xs font-black text-white truncate">{w.word}</span>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    )
  }

  // ── ACTIVE PROJECTION HALL (MINIMALIST CINEMA / WHITE SLIDE MODE) ─────────
  const isWhite = projectionTheme === 'white'

  return (
    <div className={`fixed inset-0 z-[99999] w-screen h-screen flex flex-col justify-between font-sans select-none overflow-hidden p-4 sm:p-8 transition-colors duration-300 ${isWhite ? 'bg-white text-gray-950' : 'bg-[#060D1A] text-white'}`}>
      
      {/* Top Header Watermark (Minimalist & Unintrusive) */}
      <header className={`w-full flex items-center justify-between pb-3 border-b px-2 ${isWhite ? 'border-gray-200' : 'border-[#1A2E4C]'}`}>
        <div className="flex items-center gap-3">
          <Image src="/logo.jpg" alt="Engineer Yasin Logo" width={44} height={44} className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-[#D4AF37] object-cover shadow-lg shrink-0" />
          <div>
            <span className="text-xs sm:text-lg font-black text-[#D4AF37] tracking-wider uppercase block leading-none">
              Engineer Yasin ISSB Prep
            </span>
            <span className={`text-[9px] sm:text-[11px] font-bold tracking-widest uppercase mt-0.5 block ${isWhite ? 'text-gray-600' : 'text-gray-300'}`}>
              Official Hall Projection • {timerDuration}s Timer
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-2 rounded-xl transition-colors border ${isWhite ? 'bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200' : 'bg-slate-800 border-slate-700 text-gray-200 hover:bg-slate-700'}`}
            title="Toggle Audio Beep"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-500" />}
          </button>
          
          <button
            onClick={() => setTestState(testState === 'paused' ? 'active' : 'paused')}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors uppercase tracking-wider border ${isWhite ? 'bg-gray-100 border-gray-300 text-gray-900 hover:bg-gray-200' : 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700'}`}
          >
            {testState === 'paused' ? <Play className="w-3.5 h-3.5 text-emerald-500 fill-current" /> : <Pause className="w-3.5 h-3.5 text-amber-500" />}
            <span className="hidden xs:inline">{testState === 'paused' ? 'Resume' : 'Pause'}</span>
          </button>

          <button
            onClick={handleQuit}
            className="px-4 py-1.5 rounded-xl bg-rose-600/20 border border-rose-500/40 text-rose-500 font-bold text-xs uppercase tracking-wider hover:bg-rose-600/30 transition-colors"
          >
            Exit
          </button>
        </div>
      </header>

      {/* Center Giant Word Screen */}
      <main className="flex-1 flex flex-col items-center justify-center w-full my-auto text-center px-4">
        <div className="space-y-4 w-full max-w-5xl">
          <div className="flex items-center justify-center gap-3">
            <span className={`px-4 py-1 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest border shadow-sm ${isWhite ? 'bg-gray-100 border-gray-300 text-gray-800' : 'bg-[#0A192F] border-[#D4AF37]/40 text-[#D4AF37]'}`}>
              Word {currentWordIndex + 1} of 100
            </span>
          </div>

          <div className={`py-20 sm:py-32 rounded-3xl w-full flex items-center justify-center min-h-[22rem] sm:min-h-[28rem] transition-all ${isWhite ? 'bg-gray-50 border-2 border-gray-300 shadow-inner' : 'bg-gradient-to-b from-[#0C1B33] to-[#081222] border-2 border-[#1E3660] shadow-[0_0_60px_rgba(0,0,0,0.8)]'}`}>
            {testState === 'paused' ? (
              <div className="space-y-3">
                <p className="text-2xl sm:text-4xl font-black text-amber-500 uppercase tracking-widest">⚠️ Projection Paused</p>
                <p className={`text-xs sm:text-sm font-medium ${isWhite ? 'text-gray-600' : 'text-gray-300'}`}>Click Resume in top right to continue from Word #{currentWordIndex + 1}</p>
              </div>
            ) : (
              <h2 className={`${getWordFontSize(currentWord.word)} font-black tracking-[0.06em] uppercase transition-all duration-200 break-words max-w-full px-4 ${isWhite ? 'text-gray-950 drop-shadow' : 'text-white drop-shadow-[0_4px_25px_rgba(255,255,255,0.25)]'}`}>
                {currentWord.word}
              </h2>
            )}
          </div>
        </div>
      </main>

      {/* Ultra-Clean Sleek Countdown Footer */}
      <footer className={`w-full pt-3 border-t px-2 ${isWhite ? 'border-gray-200' : 'border-[#1A2E4C]'}`}>
        <div className="flex items-center justify-between text-xs sm:text-sm font-black uppercase tracking-wider mb-2">
          <span className="flex items-center gap-1.5 text-emerald-500">
            ⏱️ Timer: <strong className={`font-extrabold px-2.5 py-0.5 rounded border ${isWhite ? 'bg-gray-200 border-gray-300 text-gray-900' : 'bg-slate-900 border-slate-700 text-white'}`}>{timeLeft}s</strong>
          </span>

          <span className={`px-3 py-0.5 rounded-full text-[11px] sm:text-xs font-black transition-all ${timeLeft <= 2 ? 'bg-rose-600 text-white animate-pulse shadow-lg shadow-rose-600/50' : isWhite ? 'text-gray-500' : 'text-amber-400'}`}>
            {timeLeft <= 2 ? '📢 SIREN ACTIVE: SWITCHING!' : '🔊 Audible chime at word change & 1s alarm'}
          </span>

          <span className={isWhite ? 'text-gray-700' : 'text-gray-300'}>
            Progress: <strong className="text-amber-500">{Math.round(((currentWordIndex + 1) / 100) * 100)}%</strong>
          </span>
        </div>

        {/* Thin Animated Time Bar */}
        <div className={`w-full h-2.5 rounded-full overflow-hidden p-0.5 ${isWhite ? 'bg-gray-200' : 'bg-slate-950 border border-slate-800'}`}>
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${timeLeft <= 2 ? 'bg-rose-600' : timeLeft <= 5 ? 'bg-amber-400' : 'bg-[#25D366]'}`}
            style={{ width: `${((timerDuration - timeLeft) / timerDuration) * 100}%` }}
          />
        </div>
      </footer>

    </div>
  )
}
