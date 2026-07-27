'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { watSets, getWatSetById, WatWord } from '@/lib/data/watData'
import { ArrowLeft, MessageCircle, RotateCcw } from 'lucide-react'

export default function WatTestExecutionPage() {
  const router = useRouter()
  const params = useParams()
  const testId = params.testId as string
  const testSet = getWatSetById(testId) || watSets[0]

  const [testState, setTestState] = useState<'intro' | 'countdown' | 'active' | 'complete'>('intro')
  const [countdownNum, setCountdownNum] = useState<number>(3)
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0)
  const [hasJoinedWhatsApp, setHasJoinedWhatsApp] = useState<boolean>(false)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null)
  const alarmTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const currentWord: WatWord = testSet.words[currentWordIndex] || testSet.words[0]

  useEffect(() => {
    const joined = localStorage.getItem('wat_joined_group') === 'true'
    if (joined) setHasJoinedWhatsApp(true)
  }, [])

  // ── Mechanical Clock "Tik Tik" Sound (Plays during 3 -> 2 -> 1 Countdown) ──
  const playTickSound = useCallback(() => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
      const now = audioCtx.currentTime
      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()
      
      // Sharp mechanical stopwatch clock click ("Tik")
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
      console.error('Tick sound error:', err)
    }
  }, [])

  // ── Official Recorded Air Horn Sound ONLY (Plays for exactly 2 full seconds before shutting off at word switch) ──
  const playAirHorn = useCallback(() => {
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch(e => {
          console.log('MPEG audio playback notice:', e)
        })

        // Automatically cut off after exactly 2,800ms (2.8 seconds) so it plays fully from 8s to 10.8s transition!
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
          }
        }, 2800) // Exactly 2.8 seconds duration!
      }
    } catch (err) {
      console.error('Air horn playing error:', err)
    }
  }, [])

  // ── 3 -> 2 -> 1 Countdown Before First Word (With Sharp Tik Tik Clock Audio) ──
  useEffect(() => {
    if (testState === 'countdown') {
      // Play tick instantly when "3" appears
      playTickSound()

      countdownTimerRef.current = setInterval(() => {
        setCountdownNum((prev) => {
          if (prev > 1) {
            playTickSound() // Play tick for "2" and "1"
            return prev - 1
          } else {
            if (countdownTimerRef.current) clearInterval(countdownTimerRef.current)
            // As countdown ends (at 1 -> 0), transition to active and play your official recorded Air Horn for Word #1!
            setTestState('active')
            setCurrentWordIndex(0)
            return 0
          }
        })
      }, 1000)
    } else {
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current)
    }

    return () => {
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current)
    }
  }, [testState, playTickSound])

  // 10-Second Automatic Word Switching & Air Horn 2 seconds before slide change
  useEffect(() => {
    if (testState === 'active') {
      // When Word #1 (index 0) first appears right after countdown, sound starting horn!
      if (currentWordIndex === 0) {
        playAirHorn()
      }

      // Schedule the Air Horn to blast exactly 2 seconds BEFORE word transitions (at the 8th second)
      if (currentWordIndex < testSet.words.length - 1) {
        alarmTimeoutRef.current = setTimeout(() => {
          playAirHorn()
        }, 8000) // 8000ms = exactly 2 seconds before the 10000ms switch
      }

      // Schedule exact slide transition at 10000ms
      timerRef.current = setTimeout(() => {
        if (currentWordIndex < testSet.words.length - 1) {
          setCurrentWordIndex(prev => prev + 1)
        } else {
          setTestState('complete')
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(e => console.log(e))
          }
        }
      }, 10000) // Exactly 10 seconds per stimulus word
    } else {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (alarmTimeoutRef.current) clearTimeout(alarmTimeoutRef.current)
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (alarmTimeoutRef.current) clearTimeout(alarmTimeoutRef.current)
    }
  }, [testState, currentWordIndex, testSet.words.length, playAirHorn])

  // Listen for Escape key to exit cleanly
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && (testState === 'active' || testState === 'countdown')) {
        if (timerRef.current) clearTimeout(timerRef.current)
        if (countdownTimerRef.current) clearInterval(countdownTimerRef.current)
        if (alarmTimeoutRef.current) clearTimeout(alarmTimeoutRef.current)
        setTestState('intro')
        setCurrentWordIndex(0)
        setCountdownNum(3)
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

    // Preload audio on user gesture
    if (audioRef.current) {
      audioRef.current.load()
    }

    try {
      const el = document.documentElement
      if (el.requestFullscreen) {
        el.requestFullscreen().catch(err => console.log('Fullscreen rejected by browser:', err))
      }
    } catch (e) {
      console.log('Fullscreen error:', e)
    }

    setCountdownNum(3)
    setTestState('countdown')
  }

  // Adaptive Font Sizing to ensure long words NEVER overflow the projection box
  const getAdaptiveFontSize = (w?: string) => {
    const len = w?.length || 0
    if (len >= 15) return 'text-3xl sm:text-5xl md:text-6xl lg:text-7xl'
    if (len >= 12) return 'text-4xl sm:text-6xl md:text-7xl lg:text-8xl'
    if (len >= 9)  return 'text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem]'
    return 'text-6xl sm:text-8xl md:text-9xl lg:text-[10rem]'
  }

  // ── INTRO SCREEN (OFFICIAL MILITARY INSTRUCTIONS, NO LOGO IN CARD) ────────
  if (testState === 'intro') {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-4 sm:p-8 font-sans selection:bg-[#B8212E] selection:text-white">
        
        {/* Hidden Audio Element pointing to your uploaded MPEG file */}
        <audio ref={audioRef} src="/air-horn-issb.mpeg" preload="auto" />

        <div className="max-w-3xl mx-auto w-full my-auto bg-[#0A192F] border border-[#1A2E4C] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 relative">
          
          {/* Top Bar - Simple & Official */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <Link href="/issb/wat" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider">
              <ArrowLeft className="w-4 h-4" /> Return to Test Hub
            </Link>
            <span className="px-3 py-1 bg-slate-900 border border-slate-800 text-emerald-400 font-extrabold text-[11px] rounded-full uppercase tracking-wider">
              Official Selection Standard
            </span>
          </div>

          <div className="space-y-2 border-b border-slate-800 pb-6">
            <span className="text-xs font-black uppercase tracking-widest text-[#D4AF37] block">
              Inter Services Selection Board (ISSB)
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase">
              {testSet.title}
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 font-medium">
              Psychological Assessment • Word Association Test
            </p>
          </div>

          {/* Official Instructions Section */}
          <div className="space-y-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-inner">
            <h2 className="text-sm sm:text-base font-black text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
              📋 Official Candidate Instructions (Read Carefully)
            </h2>
            
            <ul className="space-y-3 text-xs sm:text-sm text-gray-200 font-medium leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold shrink-0">1.</span>
                <span>A sequence of exactly <strong>100 stimulus words</strong> will be projected on the screen continuously.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold shrink-0">2.</span>
                <span>Before the first word appears, a brief <strong>3-second countdown</strong> will commence to prepare you.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold shrink-0">3.</span>
                <span>Each word will be displayed for exactly <strong>10 seconds</strong>. An authentic military buzzer will sound exactly <strong>2 seconds before</strong> each slide transition.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold shrink-0">4.</span>
                <span>As soon as a word appears, write down the <strong>first spontaneous sentence</strong> that comes to mind on your answer sheet against the corresponding serial number.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold shrink-0">5.</span>
                <span>Ensure your handwriting remains clean, legible, and clear throughout all 100 serials.</span>
              </li>
            </ul>
          </div>

          {/* Mandatory WhatsApp Gate & Start Button */}
          <div className="space-y-4 pt-2">
            {!hasJoinedWhatsApp ? (
              <div className="space-y-3 bg-[#112240] border border-emerald-500/40 p-6 rounded-2xl text-center">
                <span className="text-xs sm:text-sm font-black text-emerald-300 uppercase tracking-wide block">
                  🟢 Step 1: Candidate Verification Required
                </span>
                <p className="text-xs text-gray-300 font-medium">
                  Join Engineer Yasin&apos;s official WhatsApp learning community once to unlock full-screen simulated military testing.
                </p>
                <button
                  onClick={handleWhatsAppJoin}
                  className="w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-xs sm:text-sm uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2 animate-pulse"
                >
                  <MessageCircle className="w-5 h-5 fill-current" /> Join Official WhatsApp Group ➔
                </button>
              </div>
            ) : (
              <button
                onClick={handleStartFullscreen}
                className="w-full py-5 rounded-2xl bg-[#B8212E] hover:bg-[#961a25] active:scale-95 text-white font-black text-base sm:text-lg uppercase tracking-widest shadow-2xl transition-all flex items-center justify-center gap-3 border border-rose-400/30"
              >
                ⚡ Start Test
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
        <audio ref={audioRef} src="/air-horn-issb.mpeg" preload="auto" />
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="bg-[#0A192F] border border-[#1A2E4C] rounded-3xl p-8 sm:p-12 text-center space-y-5 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-3xl font-extrabold mx-auto shadow">
              ✓
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
              Test Completed: <span className="text-emerald-400">{testSet.title}</span>
            </h1>
            <p className="text-xs sm:text-base text-gray-300 max-w-xl mx-auto font-medium">
              You have attempted all 100 stimulus words under standard timed projection intervals. Review your written answer sheet against the word pool below.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={handleStartFullscreen}
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 font-bold text-xs sm:text-sm uppercase tracking-wider text-white rounded-xl transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Attempt Again
              </button>
              <Link
                href="/issb/wat"
                className="px-8 py-3.5 bg-[#B8212E] hover:bg-[#961a25] font-black text-xs sm:text-sm uppercase tracking-wider text-white rounded-xl shadow-lg transition-colors flex items-center gap-2"
              >
                Return to Test Hub ➔
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

  // ── COUNTDOWN SCREEN (3 -> 2 -> 1 IN PURE PROJECTOR HALL STYLE) ───────────
  if (testState === 'countdown') {
    return (
      <div className="fixed inset-0 z-[999999] w-screen h-screen bg-black text-white flex items-center justify-center p-3 sm:p-6 lg:p-8 select-none overflow-hidden font-sans">
        
        {/* Outer White Frame Box Covering Full Screen */}
        <div className="w-full h-full border-[3px] sm:border-[5px] border-white relative flex flex-col items-center justify-center p-4 sm:p-8">
          
          {/* Decorative Traditional Corner Ornamentations */}
          <div className="absolute top-2 left-2 w-8 h-8 sm:w-12 sm:h-12 border-t-4 border-l-4 border-white pointer-events-none" />
          <div className="absolute top-2 right-2 w-8 h-8 sm:w-12 sm:h-12 border-t-4 border-r-4 border-white pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-8 h-8 sm:w-12 sm:h-12 border-b-4 border-l-4 border-white pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-8 h-8 sm:w-12 sm:h-12 border-b-4 border-r-4 border-white pointer-events-none" />

          {/* Small Academy Logo on Top-Right Corner ONLY */}
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

          <span className="text-xs sm:text-base font-black tracking-widest uppercase text-emerald-400 mb-4">
            Get Ready • Test Starting In
          </span>

          {/* Giant Countdown Number */}
          <div className="text-8xl sm:text-[12rem] lg:text-[14rem] font-black text-white leading-none animate-pulse">
            {countdownNum}
          </div>

        </div>
      </div>
    )
  }

  // ── ACTIVE FULLSCREEN TESTING MODE (PURE ACADEMY PROJECTOR STYLE) ─────────
  // Black backdrop, white border with corners, top-right logo only, adaptive centered text + real audio horn!
  return (
    <div className="fixed inset-0 z-[999999] w-screen h-screen bg-black text-white flex items-center justify-center p-3 sm:p-6 lg:p-8 select-none overflow-hidden font-sans">
      
      {/* Audio element for real recorded air horn playback */}
      <audio ref={audioRef} src="/air-horn-issb.mpeg" preload="auto" />

      {/* Outer White Frame Box Covering Full Screen */}
      <div className="w-full h-full border-[3px] sm:border-[5px] border-white relative flex items-center justify-center p-4 sm:p-8">
        
        {/* Decorative Traditional Corner Ornamentations */}
        <div className="absolute top-2 left-2 w-8 h-8 sm:w-12 sm:h-12 border-t-4 border-l-4 border-white pointer-events-none" />
        <div className="absolute top-2 right-2 w-8 h-8 sm:w-12 sm:h-12 border-t-4 border-r-4 border-white pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-8 h-8 sm:w-12 sm:h-12 border-b-4 border-l-4 border-white pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-8 h-8 sm:w-12 sm:h-12 border-b-4 border-r-4 border-white pointer-events-none" />

        {/* Small Academy Logo on Top-Right Corner ONLY */}
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

        {/* Giant Single Word Dead Center - Adaptive font sizing to prevent boundary overflow */}
        <div className="w-full max-w-full px-4 sm:px-12 md:px-20 flex items-center justify-center my-auto overflow-hidden">
          <h1 className={`${getAdaptiveFontSize(currentWord.word)} font-black tracking-normal text-white uppercase leading-none drop-shadow-md py-6 text-center break-words max-w-full`}>
            {currentWord.word}
          </h1>
        </div>

      </div>

    </div>
  )
}
