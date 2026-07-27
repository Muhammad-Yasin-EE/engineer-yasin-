'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { sctUrduSets, SctSet } from '@/lib/data/issbPrepData'
import { ArrowLeft, MessageCircle, Play, RotateCcw, Clock } from 'lucide-react'

export default function SctUrduPage() {
  const [selectedSet, setSelectedSet] = useState<SctSet>(sctUrduSets[0])
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
    const joined = localStorage.getItem('sct_urdu_joined') === 'true'
    if (joined) setHasJoinedWhatsApp(true)
  }, [])

  // ── Mechanical Clock "Tik Tik" Sound ──
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
    } catch (err) { console.error(err) }
  }, [])

  // ── Official Air Horn Sound (Exactly 2.8 seconds duration) ──
  const playAirHorn = useCallback(() => {
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch(e => console.log(e))
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
          }
        }, 2800) // Exactly 2.8s duration!
      }
    } catch (err) { console.error(err) }
  }, [])

  // ── Countdown Timer ──
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

  // ── Active Slide Switching & Audio Alarm ──
  useEffect(() => {
    if (testState === 'active') {
      if (currentIndex === 0) playAirHorn()
      if (currentIndex < selectedSet.sentences.length - 1) {
        alarmTimeoutRef.current = setTimeout(() => playAirHorn(), 10000)
      }
      timerRef.current = setTimeout(() => {
        if (currentIndex < selectedSet.sentences.length - 1) {
          setCurrentIndex(prev => prev + 1)
        } else {
          setTestState('complete')
          if (document.fullscreenElement) document.exitFullscreen().catch(e => console.log(e))
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
    localStorage.setItem('sct_urdu_joined', 'true')
  }

  const launchFullscreenTest = (set: SctSet) => {
    setSelectedSet(set)
    setTestState('intro')
  }

  const startNow = () => {
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
          <div className="space-y-4 max-w-4xl">
            <Link href="/issb" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider">
              <ArrowLeft className="w-4 h-4" /> Return to ISSB Portal
            </Link>
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#D4AF37] block">
              Official ISSB Psychological Selection Battery
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Sentence Completion <span className="text-emerald-400">Test (SCT Urdu)</span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-300 font-medium leading-relaxed max-w-3xl">
              Attempt official Urdu incomplete sentences (جملوں کی تکمیل) under actual hall timing. Evaluate your emotional balance, confidence, and positive psychological attitude.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-wider text-gray-300">
            <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-amber-400">⏱️ 6 Minutes / 26 Sentences</span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400">📢 2.8s Air Horn Buzzer</span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white">🇵🇰 Urdu Nastaleeq Presentation</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {sctUrduSets.map((set) => (
              <div key={set.id} className="bg-[#0A192F] border border-[#1A2E4C] hover:border-emerald-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl transition-all flex flex-col justify-between group">
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-black uppercase tracking-widest rounded-full">
                      SCT Urdu Module
                    </span>
                    <span className="text-xs text-gray-400 font-extrabold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> 6 Minutes
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-emerald-300 transition-colors">
                    {set.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed" dir="rtl">
                    مثبت سوچ، اعلیٰ ظرفی، حب الوطنی اور قائدانہ اصولوں کو ظاہر کرنے کے لیے سرکاری نامکمل جملے حل کریں۔
                  </p>
                </div>

                <button
                  onClick={() => launchFullscreenTest(set)}
                  className="w-full py-4 bg-[#B8212E] hover:bg-[#961a25] active:scale-95 text-white font-black text-xs sm:text-sm uppercase tracking-widest rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 border border-rose-400/20"
                >
                  <Play className="w-4 h-4 fill-current" /> Launch Urdu Simulator ➔
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── INTRO SCREEN ──────────────────────────────────────────────────────────
  if (testState === 'intro') {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-4 sm:p-8">
        <audio ref={audioRef} src="/air-horn-issb.mpeg" preload="auto" />
        <div className="max-w-3xl mx-auto w-full my-auto bg-[#0A192F] border border-[#1A2E4C] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <button onClick={() => setTestState('hub')} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white uppercase">
              <ArrowLeft className="w-4 h-4" /> Back to Urdu Hub
            </button>
            <span className="px-3 py-1 bg-slate-900 border border-slate-800 text-emerald-400 font-extrabold text-[11px] rounded-full uppercase">Official Urdu Criteria</span>
          </div>
          <div className="space-y-2 border-b border-slate-800 pb-6 text-right" dir="rtl">
            <span className="text-xs font-black text-[#D4AF37] block">انٹر سروسز سلیکشن بورڈ (آئی ایس ایس بی)</span>
            <h1 className="text-2xl sm:text-4xl font-black text-white">{selectedSet.title}</h1>
          </div>
          <div className="space-y-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-inner text-right" dir="rtl">
            <h2 className="text-sm sm:text-base font-black text-[#D4AF37]">📋 امیداروں کے لیے ضروری ہدایات</h2>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-200 font-medium">
              <li>۱. سکرین پر یکے بعد دیگرے <strong>نامکمل اردو جملے</strong> ظاہر کیے جائیں گے۔</li>
              <li>۲. ہر جملہ 12 سیکنڈ کے لیے ظاہر ہوگا۔ سلائیڈ تبدیل ہونے سے 2 سیکنڈ پہلے <strong>2.8 سیکنڈ کا ملٹری بگل / ہوٹر</strong> بجے گا۔</li>
              <li>۳. جملے دیکھتے ہی سب سے پہلا مثبت اور با معنی فقرہ اپنی جوابی کاپی میں تحریر کریں۔</li>
            </ul>
          </div>
          <div className="pt-2">
            {!hasJoinedWhatsApp ? (
              <div className="space-y-3 bg-[#112240] border border-emerald-500/40 p-6 rounded-2xl text-center">
                <span className="text-xs font-black text-emerald-300 uppercase block">🟢 Step 1: Candidate Verification Required</span>
                <button onClick={handleWhatsAppJoin} className="w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-xs sm:text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 animate-pulse">
                  <MessageCircle className="w-5 h-5 fill-current" /> Join Official WhatsApp Group ➔
                </button>
              </div>
            ) : (
              <button onClick={startNow} className="w-full py-5 rounded-2xl bg-[#B8212E] hover:bg-[#961a25] text-white font-black text-base sm:text-lg uppercase tracking-widest shadow-2xl flex items-center justify-center gap-3">
                ⚡ Start Urdu Test
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── COMPLETE SCREEN ───────────────────────────────────────────────────────
  if (testState === 'complete') {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8 pb-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-[#0A192F] border border-[#1A2E4C] rounded-3xl p-8 text-center space-y-5 shadow-2xl">
            <h1 className="text-2xl sm:text-4xl font-black text-emerald-400">Urdu Test Completed</h1>
            <button onClick={() => setTestState('hub')} className="px-8 py-3.5 bg-[#B8212E] font-black rounded-xl text-white uppercase text-sm">Return to Hub ➔</button>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl" dir="rtl">
            <h3 className="text-base font-bold text-white mb-6">مکمل اردو جملے ({selectedSet.sentences.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedSet.sentences.map((s, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-800 bg-slate-950 flex items-center gap-3 text-right">
                  <span className="text-xs text-[#D4AF37] font-black">#{idx + 1}</span>
                  <span className="text-base sm:text-lg font-bold text-white font-serif">{s}</span>
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
      <div className="fixed inset-0 z-[999999] w-screen h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="w-full h-full border-[5px] border-white relative flex flex-col items-center justify-center p-8">
          <span className="text-sm font-black tracking-widest uppercase text-emerald-400 mb-4">Urdu Test Starting In</span>
          <div className="text-8xl sm:text-[14rem] font-black text-white animate-pulse">{countdownNum}</div>
        </div>
      </div>
    )
  }

  // ── ACTIVE FULLSCREEN TESTING MODE ────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-[999999] w-screen h-screen bg-black text-white flex items-center justify-center p-4">
      <audio ref={audioRef} src="/air-horn-issb.mpeg" preload="auto" />
      <div className="w-full h-full border-[5px] border-white relative flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="text-xs sm:text-sm font-black text-[#D4AF37] uppercase absolute top-6 left-6">
          Serial #{currentIndex + 1} of {selectedSet.sentences.length}
        </div>
        <div className="w-full max-w-5xl px-4 flex items-center justify-center my-auto" dir="rtl">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white font-serif leading-loose text-center py-6">
            {currentSentence}
          </h1>
        </div>
      </div>
    </div>
  )
}
