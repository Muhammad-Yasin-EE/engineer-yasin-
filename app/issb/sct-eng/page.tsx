'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { sctEnglishSets, SctSet } from '@/lib/data/issbPrepData'
import { ArrowLeft, MessageCircle, Play, RotateCcw, Shield, CheckCircle, Clock } from 'lucide-react'

export default function SctEnglishPage() {
  const [selectedSet, setSelectedSet] = useState<SctSet>(sctEnglishSets[0])
  const [testState, setTestState] = useState<'hub' | 'intro' | 'countdown' | 'active' | 'complete'>('hub')
  const [countdownNum, setCountdownNum] = useState<number>(3)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [hasJoinedWhatsApp, setHasJoinedWhatsApp] = useState<boolean>(false)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null)
  const alarmTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const currentSentence = selectedSet.sentences[currentIndex] || selectedSet.sentences[0]

  useEffect(() => {
    const joined = localStorage.getItem('sct_joined_group') === 'true'
    if (joined) setHasJoinedWhatsApp(true)
  }, [])

  // ── Mechanical Clock "Tik Tik" Sound during 3-2-1 Countdown ──
  const playTickSound = useCallback(() => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
      const now = audioCtx.currentTime
      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()
      
      osc.type = 'sine'
      osc.frequency.setValueAtTime(1600, now)
      osc.frequency.exponentialRampToValueAtTime(350, now + 0.025)
      
      gain.gain.setValueAtTime(0.35, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.028)
      
      osc.connect(gain)
      gain.connect(audioCtx.destination)
      
      osc.start(now)
      osc.stop(now + 0.03)
    } catch (err) {
      console.error(err)
    }
  }, [])

  // ── Official Recorded Air Horn Sound ONLY (Plays for exactly 2.8 seconds as required) ──
  const playAirHorn = useCallback(() => {
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch(e => console.log(e))

        // Exactly 2,800ms (2.8 seconds) audio playback duration!
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
          }
        }, 2800)
      }
    } catch (err) {
      console.error(err)
    }
  }, [])

  // ── 3 -> 2 -> 1 Countdown Timer ──
  useEffect(() => {
    if (testState === 'countdown') {
      playTickSound()
      countdownTimerRef.current = setInterval(() => {
        setCountdownNum(prev => {
          if (prev > 1) {
            playTickSound()
            return prev - 1
          } else {
            if (countdownTimerRef.current) clearInterval(countdownTimerRef.current)
            setTestState('active')
            setCurrentIndex(0)
            return 0
          }
        })
      }, 1000)
    } else {
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current)
    }
    return () => { if (countdownTimerRef.current) clearInterval(countdownTimerRef.current) }
  }, [testState, playTickSound])

  // ── Active Slide Switching & 2.8s Audio Hooter 2s before switch ──
  useEffect(() => {
    if (testState === 'active') {
      if (currentIndex === 0) {
        playAirHorn()
      }

      // Schedule horn 2 seconds before the 12-second sentence transition (at 10,000ms)
      if (currentIndex < selectedSet.sentences.length - 1) {
        alarmTimeoutRef.current = setTimeout(() => {
          playAirHorn()
        }, 10000)
      }

      // Transition every 12 seconds per sentence
      timerRef.current = setTimeout(() => {
        if (currentIndex < selectedSet.sentences.length - 1) {
          setCurrentIndex(prev => prev + 1)
        } else {
          setTestState('complete')
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(e => console.log(e))
          }
        }
      }, 12000)
    } else {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (alarmTimeoutRef.current) clearTimeout(alarmTimeoutRef.current)
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (alarmTimeoutRef.current) clearTimeout(alarmTimeoutRef.current)
    }
  }, [testState, currentIndex, selectedSet.sentences.length, playAirHorn])

  // Listen for Escape key to exit cleanly
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && (testState === 'active' || testState === 'countdown')) {
        if (timerRef.current) clearTimeout(timerRef.current)
        if (countdownTimerRef.current) clearInterval(countdownTimerRef.current)
        if (alarmTimeoutRef.current) clearTimeout(alarmTimeoutRef.current)
        setTestState('hub')
        setCurrentIndex(0)
        setCountdownNum(3)
      }
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [testState])

  const handleWhatsAppJoin = () => {
    window.open('https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0', '_blank')
    setHasJoinedWhatsApp(true)
    localStorage.setItem('sct_joined_group', 'true')
  }

  const startTestSet = (set: SctSet) => {
    setSelectedSet(set)
    setTestState('intro')
  }

  const launchFullscreenTest = () => {
    if (!hasJoinedWhatsApp) {
      handleWhatsAppJoin()
      return
    }
    if (audioRef.current) audioRef.current.load()
    try {
      const el = document.documentElement
      if (el.requestFullscreen) el.requestFullscreen().catch(err => console.log(err))
    } catch (e) { console.log(e) }

    setCountdownNum(3)
    setTestState('countdown')
  }

  // ── HUB SCREEN ────────────────────────────────────────────────────────────
  if (testState === 'hub') {
    return (
      <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-[#B8212E] selection:text-white pb-24">
        <audio ref={audioRef} src="/air-horn-issb.mpeg" preload="auto" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-10">
          
          {/* Header */}
          <div className="space-y-4 max-w-4xl">
            <Link href="/issb" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider">
              <ArrowLeft className="w-4 h-4" /> Return to ISSB Portal
            </Link>
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#D4AF37] block">
              Official ISSB Psychological Selection Tests
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight uppercase">
              Sentence Completion <span className="text-emerald-400">Test (SCT English)</span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-300 font-medium leading-relaxed max-w-3xl">
              Complete short stimulus sentences to reflect your optimism, emotional equilibrium, leadership reflexes, and social cooperation. Attempt all official sets under official timed projector format.
            </p>
          </div>

          {/* Criteria Pills */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-wider text-gray-300">
            <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 flex items-center gap-1.5 shadow-sm">
              ⏱️ 6 Minutes / 26 Sentences
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 flex items-center gap-1.5 shadow-sm">
              📢 2.8s Air Horn Buzzer
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white flex items-center gap-1.5 shadow-sm">
              🛡️ Official Military Standard
            </span>
          </div>

          {/* Test Sets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {sctEnglishSets.map((set) => (
              <div key={set.id} className="bg-[#0A192F] border border-[#1A2E4C] hover:border-emerald-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl transition-all flex flex-col justify-between group">
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-black uppercase tracking-widest rounded-full">
                      Psychological Assessment
                    </span>
                    <span className="text-xs text-gray-400 font-extrabold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> 6 Minutes
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-emerald-300 transition-colors uppercase">
                    {set.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">
                    Contains 26 official sentence starters including interpersonal leadership, stress reflexes, familial bonds, and national duty.
                  </p>
                </div>

                <button
                  onClick={() => startTestSet(set)}
                  className="w-full py-4 bg-[#B8212E] hover:bg-[#961a25] active:scale-95 text-white font-black text-xs sm:text-sm uppercase tracking-widest rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 border border-rose-400/20"
                >
                  <Play className="w-4 h-4 fill-current" /> Start Test ➔
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    )
  }

  // ── INTRO / INSTRUCTIONS SCREEN ───────────────────────────────────────────
  if (testState === 'intro') {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-4 sm:p-8 font-sans">
        <audio ref={audioRef} src="/air-horn-issb.mpeg" preload="auto" />
        <div className="max-w-3xl mx-auto w-full my-auto bg-[#0A192F] border border-[#1A2E4C] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <button onClick={() => setTestState('hub')} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider">
              <ArrowLeft className="w-4 h-4" /> Back to SCT Sets
            </button>
            <span className="px-3 py-1 bg-slate-900 border border-slate-800 text-emerald-400 font-extrabold text-[11px] rounded-full uppercase">
              Official Selection Standard
            </span>
          </div>

          <div className="space-y-2 border-b border-slate-800 pb-6">
            <span className="text-xs font-black uppercase tracking-widest text-[#D4AF37] block">Inter Services Selection Board (ISSB)</span>
            <h1 className="text-2xl sm:text-4xl font-black text-white uppercase">{selectedSet.title}</h1>
          </div>

          <div className="space-y-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-inner">
            <h2 className="text-sm sm:text-base font-black text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
              📋 Official Candidate Instructions
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-200 font-medium leading-relaxed">
              <li className="flex items-start gap-2.5"><span className="text-emerald-400 font-bold">1.</span><span>A sequence of <strong>26 incomplete sentence starters</strong> will be projected on screen.</span></li>
              <li className="flex items-start gap-2.5"><span className="text-emerald-400 font-bold">2.</span><span>A preparatory <strong>3-second countdown</strong> will commence before the first sentence appears.</span></li>
              <li className="flex items-start gap-2.5"><span className="text-emerald-400 font-bold">3.</span><span>Each starter remains on screen for 12 seconds. An authentic military buzzer will sound for exactly <strong>2.8 seconds</strong> prior to transitioning to the next serial.</span></li>
              <li className="flex items-start gap-2.5"><span className="text-emerald-400 font-bold">4.</span><span>Write a constructive, spontaneous completion sentence on your answer sheet against the corresponding number.</span></li>
            </ul>
          </div>

          <div className="space-y-4 pt-2">
            {!hasJoinedWhatsApp ? (
              <div className="space-y-3 bg-[#112240] border border-emerald-500/40 p-6 rounded-2xl text-center">
                <span className="text-xs font-black text-emerald-300 uppercase block">🟢 Candidate Verification Required</span>
                <p className="text-xs text-gray-300">Join Engineer Yasin&apos;s official community once to unlock timed testing.</p>
                <button onClick={handleWhatsAppJoin} className="w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-xs sm:text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 animate-pulse">
                  <MessageCircle className="w-5 h-5 fill-current" /> Join Official WhatsApp Group ➔
                </button>
              </div>
            ) : (
              <button onClick={launchFullscreenTest} className="w-full py-5 rounded-2xl bg-[#B8212E] hover:bg-[#961a25] text-white font-black text-base sm:text-lg uppercase tracking-widest shadow-2xl flex items-center justify-center gap-3">
                ⚡ Start Test
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── COMPLETION SCREEN ─────────────────────────────────────────────────────
  if (testState === 'complete') {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8 font-sans pb-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-[#0A192F] border border-[#1A2E4C] rounded-3xl p-8 sm:p-12 text-center space-y-5 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-3xl font-extrabold mx-auto shadow">✓</div>
            <h1 className="text-2xl sm:text-4xl font-black uppercase text-white">Test Completed: <span className="text-emerald-400">{selectedSet.title}</span></h1>
            <p className="text-xs sm:text-base text-gray-300 max-w-xl mx-auto">You have attempted all sentence starters under timed projection. Review your completed responses for constructive tone and responsibility.</p>
            <div className="flex justify-center gap-4 pt-4">
              <button onClick={() => setTestState('hub')} className="px-8 py-3.5 bg-[#B8212E] hover:bg-[#961a25] font-black text-xs sm:text-sm uppercase rounded-xl shadow-lg text-white">Return to SCT Hub ➔</button>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-base font-bold text-white mb-6 uppercase tracking-wider">Complete Sentence Starters Pool ({selectedSet.sentences.length} Items)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedSet.sentences.map((s, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-800 bg-slate-950 flex items-center gap-3">
                  <span className="text-xs text-[#D4AF37] font-black min-w-[28px]">#{idx + 1}</span>
                  <span className="text-xs sm:text-sm font-bold text-white">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── COUNTDOWN SCREEN ──────────────────────────────────────────────────────
  if (testState === 'countdown') {
    return (
      <div className="fixed inset-0 z-[999999] w-screen h-screen bg-black text-white flex items-center justify-center p-4 select-none overflow-hidden font-sans">
        <div className="w-full h-full border-[5px] border-white relative flex flex-col items-center justify-center p-8">
          <div className="absolute top-4 right-6 flex flex-col items-center gap-1 opacity-95">
            <Image src="/logo.jpg" alt="Logo" width={64} height={64} className="w-14 h-14 rounded-full border-2 border-white object-cover" />
            <span className="text-[9px] font-black text-white uppercase mt-0.5 text-center leading-none">Engineer Yasin<br />Official Prep</span>
          </div>
          <span className="text-sm font-black tracking-widest uppercase text-emerald-400 mb-4">Get Ready • SCT Test Starting In</span>
          <div className="text-8xl sm:text-[14rem] font-black text-white animate-pulse">{countdownNum}</div>
        </div>
      </div>
    )
  }

  // ── ACTIVE FULLSCREEN TESTING MODE ────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-[999999] w-screen h-screen bg-black text-white flex items-center justify-center p-4 select-none overflow-hidden font-sans">
      <audio ref={audioRef} src="/air-horn-issb.mpeg" preload="auto" />
      <div className="w-full h-full border-[5px] border-white relative flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="absolute top-4 right-6 flex flex-col items-center gap-1 opacity-95">
          <Image src="/logo.jpg" alt="Logo" width={64} height={64} className="w-14 h-14 rounded-full border-2 border-white object-cover" />
          <span className="text-[9px] font-black text-white uppercase mt-0.5 text-center leading-none">Engineer Yasin<br />Official Prep</span>
        </div>
        <div className="text-xs sm:text-sm font-black text-[#D4AF37] uppercase tracking-widest absolute top-6 left-6">
          Serial #{currentIndex + 1} of {selectedSet.sentences.length}
        </div>
        <div className="w-full max-w-5xl px-4 flex items-center justify-center my-auto">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white uppercase text-center leading-snug drop-shadow-md py-6">
            {currentSentence}
          </h1>
        </div>
      </div>
    </div>
  )
}
