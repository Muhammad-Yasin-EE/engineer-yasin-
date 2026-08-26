'use client'

import React, { useEffect, useState, useRef, use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { 
  ArrowLeft, Loader2, Award, CheckCircle2, XCircle, ChevronRight, ChevronLeft, 
  RotateCcw, AlertTriangle, Clock, User, ShieldAlert, CheckSquare, Shield, X, 
  LogIn, UserPlus, Lock, Download, AlertOctagon, Sparkles, Flame 
} from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import confetti from 'canvas-confetti'
import NonVerbalDiagram from '@/components/NonVerbalDiagram'
import { 
  getUniqueVerbalQuestions, 
  getUniqueNonVerbalQuestions, 
  getUniqueAcademicQuestions 
} from '@/lib/data/uniqueQuestionEngine'

// ── Official Pakistan Armed Forces Selection Standards ───────────────────────
const OFFICIAL_VERBAL_TIME_MINUTES = 30     // 30 Minutes for Verbal Intelligence
const OFFICIAL_VERBAL_MAX_QUESTIONS = 84    // 84 MCQs for Verbal Intelligence
const OFFICIAL_NON_VERBAL_TIME_MINUTES = 30 // 30 Minutes for Non-Verbal Intelligence
const OFFICIAL_NON_VERBAL_MAX_QUESTIONS = 64 // 64 MCQs for Non-Verbal Intelligence
const OFFICIAL_ACADEMIC_TIME_MINUTES = 25   // 25 Minutes for Academic Tests
const OFFICIAL_ACADEMIC_MAX_QUESTIONS = 50  // 50 MCQs for Academic Tests

export default function QuizClient({ params }: { params: Promise<{ quizId: string }> }) {
  const router = useRouter()
  const { quizId } = use(params)
  const supabase = createClient()

  // User & Auth States
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [studentName, setStudentName] = useState('')

  // Data States
  const [quiz, setQuiz] = useState<any>(null)
  const [questions, setQuestions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isNonVerbal, setIsNonVerbal] = useState(false)

  // Exam States
  const [examStarted, setExamStarted] = useState(false)
  const [examState, setExamState] = useState<'intro' | 'active' | 'completed'>('intro')
  
  // Dynamic Limits
  const [limitMinutes, setLimitMinutes] = useState(OFFICIAL_ACADEMIC_TIME_MINUTES)
  const [maxQCount, setMaxQCount] = useState(OFFICIAL_ACADEMIC_MAX_QUESTIONS)
  
  // Timer & Anti-Cheat with 2-Strike Grace System
  const [timeLeft, setTimeLeft] = useState(OFFICIAL_ACADEMIC_TIME_MINUTES * 60)
  const [cheatStrikes, setCheatStrikes] = useState(0)
  const [showStrikeWarning, setShowStrikeWarning] = useState(false)
  const [autoSubmittedDueToCheat, setAutoSubmittedDueToCheat] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Progress & Scores
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [finalScore, setFinalScore] = useState(0)
  
  // Certificate
  const certificateRef = useRef<HTMLDivElement>(null)
  const [downloadingCert, setDownloadingCert] = useState(false)

  // 1. Initial Load & Non-Repeating Partition Engine
  useEffect(() => {
    const initQuiz = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setCurrentUser(user)
          const fullName = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || ''
          setStudentName(fullName)
        }

        // Parse test number & course from quizId (e.g. pma-long-course-non-verbal-test-5)
        const match = quizId.match(/^(.*?)-(non-verbal|verbal|academic)-test-(\d+)$/i)
        
        let dynamicCourseTitle = ''
        let dynamicTestType: 'non-verbal' | 'verbal' | 'academic' = 'verbal'
        let dynamicTestNumber = 1

        if (match) {
          dynamicCourseTitle = match[1].replace(/-/g, ' ').toUpperCase()
          dynamicTestType = match[2].toLowerCase() as any
          dynamicTestNumber = parseInt(match[3], 10) || 1
        } else {
          // Fallback parsing
          const numMatch = quizId.match(/(\d+)$/)
          if (numMatch) dynamicTestNumber = parseInt(numMatch[1], 10) || 1
          if (quizId.includes('non-verbal')) dynamicTestType = 'non-verbal'
          else if (quizId.includes('verbal')) dynamicTestType = 'verbal'
          else dynamicTestType = 'academic'
        }

        const isNV = dynamicTestType === 'non-verbal' || quizId.includes('non-verbal')
        const isVerbal = !isNV && (dynamicTestType === 'verbal' || quizId.includes('verbal'))
        const isAcademic = !isNV && !isVerbal

        setIsNonVerbal(isNV)

        let limitMin = OFFICIAL_ACADEMIC_TIME_MINUTES
        let maxQ = OFFICIAL_ACADEMIC_MAX_QUESTIONS

        if (isNV) {
          limitMin = OFFICIAL_NON_VERBAL_TIME_MINUTES
          maxQ = OFFICIAL_NON_VERBAL_MAX_QUESTIONS
        } else if (isVerbal) {
          limitMin = OFFICIAL_VERBAL_TIME_MINUTES
          maxQ = OFFICIAL_VERBAL_MAX_QUESTIONS
        }

        setLimitMinutes(limitMin)
        setMaxQCount(maxQ)
        setTimeLeft(limitMin * 60)

        // Clean Quiz Metadata
        const branchCategory = quizId.includes('paf') 
          ? 'Pakistan Air Force' 
          : quizId.includes('navy') || quizId.includes('pn-') || quizId.includes('sailor')
          ? 'Pakistan Navy' 
          : 'Pakistan Army'

        const cleanTitle = match
          ? `${dynamicCourseTitle} ${isNV ? 'NON-VERBAL' : isVerbal ? 'VERBAL' : 'ACADEMIC'} TEST ${dynamicTestNumber}`
          : quizId.replace(/-/g, ' ').toUpperCase()

        const currentQuiz = {
          id: quizId,
          title: cleanTitle,
          category: isNV ? 'Non-Verbal Intelligence' : branchCategory,
          description: `Official ${maxQ} questions timed screening test according to AS&RC / Selection Center pattern.`
        }
        setQuiz(currentQuiz)

        // ═════════════════════════════════════════════════════════════════════
        // ZERO REPETITION GUARANTEE:
        // Every test (1 to 20) receives its own dedicated non-overlapping set
        // ═════════════════════════════════════════════════════════════════════
        let fetchedQuestions: any[] = []

        if (isNV) {
          fetchedQuestions = getUniqueNonVerbalQuestions(dynamicTestNumber, maxQ, quizId)
        } else if (isVerbal) {
          fetchedQuestions = getUniqueVerbalQuestions(dynamicTestNumber, maxQ, quizId)
        } else {
          fetchedQuestions = getUniqueAcademicQuestions(dynamicTestNumber, maxQ, quizId)
        }

        setQuestions(fetchedQuestions)
      } catch (err) {
        console.error('Initialization error:', err)
      } finally {
        setLoading(false)
      }
    }
    initQuiz()
  }, [quizId, supabase])

  // 2. Timer & 2-Strike Anti-Cheat System
  useEffect(() => {
    if (examState !== 'active') return

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          submitExam()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    const handleViolation = () => {
      setCheatStrikes(prev => {
        const nextStrike = prev + 1
        if (nextStrike >= 2) {
          setAutoSubmittedDueToCheat(true)
          submitExam()
        } else {
          setShowStrikeWarning(true)
        }
        return nextStrike
      })
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleViolation()
      }
    }

    const handleWindowBlur = () => {
      handleViolation()
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("blur", handleWindowBlur)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("blur", handleWindowBlur)
    }
  }, [examState])

  const startExam = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setShowAuthModal(true)
      return
    }

    if (!studentName.trim()) return

    setExamState('active')
    setExamStarted(true)
  }

  const submitExam = async () => {
    setExamState('completed')
    setShowStrikeWarning(false)
    if (timerRef.current) clearInterval(timerRef.current)
    
    let calculatedScore = 0
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correct_option_index) {
        calculatedScore += 1
      }
    })
    setFinalScore(calculatedScore)
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user && quiz) {
        const timeTaken = (limitMinutes * 60) - Math.max(0, timeLeft)
        const percentage = questions.length > 0 ? Math.round((calculatedScore / questions.length) * 100) : 0
        
        await supabase.from('user_scores').insert({
          user_id: user.id,
          quiz_id: quiz.id,
          score: calculatedScore,
          percentage: percentage,
          time_taken_seconds: timeTaken
        })
      }
    } catch (err) {
      console.error('Failed to save score:', err)
    }

    const percentage = questions.length > 0 ? Math.round((calculatedScore / questions.length) * 100) : 0
    if (percentage >= 80 && !autoSubmittedDueToCheat) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#B8212E', '#D4AF37', '#10B981']
      })
    }
  }

  const downloadCertificate = async () => {
    if (!certificateRef.current) return
    setDownloadingCert(true)
    try {
      const canvas = await html2canvas(certificateRef.current, { scale: 2 })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [800, 560] })
      pdf.addImage(imgData, 'PNG', 0, 0, 800, 560)
      pdf.save(`${studentName.replace(/ /g, '_')}_Official_Certificate.pdf`)
    } catch (err) {
      console.error('Certificate Error:', err)
    } finally {
      setDownloadingCert(false)
    }
  }

  const handleOptionSelect = (optionIdx: number) => {
    if (examState !== 'active') return
    setAnswers(prev => ({ ...prev, [currentIndex]: optionIdx }))
  }

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) setCurrentIndex(prev => prev + 1)
  }

  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1)
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setAnswers({})
    setFinalScore(0)
    setExamState('intro')
    setExamStarted(false)
    setCheatStrikes(0)
    setShowStrikeWarning(false)
    setTimeLeft(limitMinutes * 60)
    setAutoSubmittedDueToCheat(false)
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const getGradeDetails = () => {
    const percentage = questions.length > 0 ? (finalScore / questions.length) * 100 : 0
    if (percentage < 50) return { title: 'Needs Improvement / Practice Required', color: 'text-rose-600', bg: 'bg-rose-50', icon: <XCircle className="w-10 h-10" /> }
    if (percentage < 70) return { title: 'Good Effort! Keep Working Hard', color: 'text-amber-600', bg: 'bg-amber-50', icon: <AlertTriangle className="w-10 h-10" /> }
    if (percentage < 85) return { title: `Congratulations ${studentName}, Test Cleared!`, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <CheckCircle2 className="w-10 h-10" /> }
    return { title: `Outstanding Performance ${studentName}! Selection Ready.`, color: 'text-indigo-600', bg: 'bg-indigo-50', icon: <Award className="w-10 h-10" /> }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-3 text-xs text-slate-500 w-full">
        <Loader2 className="w-8 h-8 animate-spin text-[#B8212E]" />
        <span>Loading official selection test environment...</span>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]
  const hasAnsweredCurrent = answers[currentIndex] !== undefined

  return (
    <div className="fixed inset-0 z-[999] bg-slate-900 overflow-y-auto w-full h-full flex flex-col justify-between">
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 flex-grow">
      
      {!examStarted && (
        <Link href="/prep" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Prep Hub
        </Link>
      )}

      {/* STATE 1: INTRO SCREEN & AUTH GATE */}
      {examState === 'intro' && (
        <div className="w-full bg-white border border-slate-200 p-6 sm:p-10 rounded-3xl shadow-2xl space-y-6 max-w-xl mx-auto">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-rose-50 text-[#B8212E] rounded-2xl flex items-center justify-center mx-auto mb-3 border border-rose-200">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black uppercase text-slate-900 tracking-tight">Official Selection Center Pattern</h1>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">{quiz.title}</p>
          </div>

          {/* User Auth Status Banner */}
          {!currentUser ? (
            <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-2xl space-y-3 text-center">
              <div className="flex items-center justify-center gap-2 text-amber-900 font-bold text-sm">
                <Lock className="w-4 h-4 shrink-0" />
                <span>Account Required to Attempt Test</span>
              </div>
              <p className="text-xs text-amber-800 font-medium leading-relaxed">
                Please sign in or create a free account to take official timed tests, track your performance, and get verified certificates.
              </p>
              <div className="flex items-center justify-center gap-3 pt-1">
                <Link
                  href={`/login?return_to=/prep/quiz/${quizId}`}
                  className="px-5 py-2.5 bg-[#B8212E] hover:bg-[#961A25] text-white text-xs font-bold rounded-xl uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-all"
                >
                  <LogIn className="w-3.5 h-3.5" /> Sign In
                </Link>
                <Link
                  href={`/signup?return_to=/prep/quiz/${quizId}`}
                  className="px-5 py-2.5 bg-white border-2 border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-bold rounded-xl uppercase tracking-wider flex items-center gap-1.5 transition-all"
                >
                  <UserPlus className="w-3.5 h-3.5" /> Sign Up Free
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-300 p-3.5 rounded-2xl flex items-center justify-between text-xs font-bold text-emerald-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Logged in as: <strong>{currentUser.email}</strong></span>
              </div>
              <span className="bg-emerald-200 px-2 py-0.5 rounded text-[10px] uppercase font-black">Verified</span>
            </div>
          )}

          {/* Test Regulations */}
          <div className="bg-slate-50 border border-slate-200 p-4 sm:p-5 rounded-2xl space-y-3 text-xs font-semibold text-slate-600">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-indigo-600 shrink-0" />
              <p>Strict Time Limit of <strong className="text-slate-900">{limitMinutes} Minutes</strong> ({questions.length} Questions). The test will auto-submit when time expires.</p>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              <p><strong>Anti-Cheat Enabled:</strong> Tab switching or minimizing window is monitored. Max 1 grace warning allowed before auto-submit.</p>
            </div>
          </div>

          <form onSubmit={startExam} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-[10px] uppercase font-bold text-slate-500">Candidate Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter your full name as per CNIC / B-Form..."
                  className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#B8212E] focus:bg-white"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={!studentName.trim()}
              className="w-full py-4 bg-[#B8212E] hover:bg-[#961A25] disabled:opacity-50 text-white font-black rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-rose-900/30 transition-all cursor-pointer"
            >
              Start Official Exam ({questions.length} MCQs | {limitMinutes} Mins)
            </button>
          </form>
        </div>
      )}

      {/* STATE 2: ACTIVE EXAM */}
      {examState === 'active' && currentQuestion && (
        <div className="space-y-5">
          {/* Top Sticky Test Bar */}
          <div className="bg-slate-800 text-white p-4 rounded-2xl flex items-center justify-between sticky top-4 z-50 shadow-2xl border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="bg-slate-700 p-2 rounded-xl"><User className="w-4 h-4 text-amber-300" /></div>
              <div>
                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Candidate</p>
                <p className="text-xs font-bold text-white truncate max-w-[140px] sm:max-w-none">{studentName}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider flex items-center gap-1 justify-end">
                <Clock className="w-3 h-3 text-rose-400" /> Time Remaining
              </p>
              <p className={`text-xl sm:text-2xl font-mono font-black ${timeLeft < 60 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
                {formatTime(timeLeft)}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span className="truncate pr-2">Test: <strong className="text-white">{quiz.title}</strong></span>
            <span className="font-mono bg-slate-800 px-3 py-1 rounded-lg text-amber-300 shrink-0">
              Question {currentIndex + 1} of {questions.length}
            </span>
          </div>

          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-[#B8212E] transition-all duration-300" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
          </div>

          {/* DYNAMIC QUESTION RENDERER */}
          {currentQuestion.diagram ? (
            // Non-Verbal Vector Diagram Question
            <div className="space-y-4">
              <div className="p-4 bg-slate-800/90 border border-slate-700 rounded-2xl">
                <p className="text-sm sm:text-base font-bold text-white">
                  <span className="text-[#D4AF37] font-black mr-2">Q{currentIndex + 1}:</span>
                  {currentQuestion.question_text}
                </p>
              </div>
              <NonVerbalDiagram
                config={currentQuestion.diagram}
                selectedOption={answers[currentIndex]}
                onSelectOption={(optIdx) => handleOptionSelect(optIdx)}
              />
            </div>
          ) : (
            // Standard Text Multiple Choice Question
            <div className="space-y-5">
              <div className="p-6 sm:p-8 bg-slate-800/90 border border-slate-700 rounded-3xl min-h-[140px] flex items-center shadow-xl">
                <h3 className="font-extrabold text-base sm:text-xl text-white leading-relaxed">
                  <span className="text-[#D4AF37] font-black mr-2">Q{currentIndex + 1}:</span>
                  {currentQuestion.question_text}
                </h3>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentQuestion.options?.map((option: string, idx: number) => {
                  const isSelected = answers[currentIndex] === idx
                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(idx)}
                      className={`p-4 sm:p-5 border-2 rounded-2xl text-left font-bold text-xs sm:text-sm flex items-center justify-between cursor-pointer transition-all duration-200 ${
                        isSelected 
                          ? 'bg-[#B8212E]/20 border-[#B8212E] text-white ring-2 ring-[#B8212E]/50' 
                          : 'bg-slate-800/60 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:border-slate-500'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-md bg-slate-700 text-slate-300 text-xs flex items-center justify-center font-black shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </span>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-rose-400 shrink-0" />}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Next/Back Controls */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-800">
            <button
              onClick={handleBack}
              disabled={currentIndex === 0}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              Back
            </button>
            {currentIndex + 1 < questions.length ? (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-white text-slate-900 hover:bg-slate-200 rounded-xl font-black text-xs uppercase tracking-wider cursor-pointer shadow-lg"
              >
                {hasAnsweredCurrent ? 'Next Question →' : 'Skip →'}
              </button>
            ) : (
              <button
                onClick={submitExam}
                className="px-6 py-3 bg-[#B8212E] hover:bg-[#961A25] text-white rounded-xl font-black text-xs uppercase tracking-wider animate-pulse cursor-pointer shadow-lg shadow-rose-900/40"
              >
                Submit Official Test ✓
              </button>
            )}
          </div>

          {/* Touch-Friendly Question Navigator */}
          <div className="pt-6 space-y-3">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Question Navigator ({questions.length} Items)
            </h4>
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-2 bg-slate-800/50 rounded-2xl border border-slate-700/60">
              {questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                    answers[idx] !== undefined 
                      ? 'bg-[#B8212E] text-white shadow-sm' 
                      : idx === currentIndex 
                        ? 'ring-2 ring-amber-400 bg-slate-700 text-white font-black' 
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STATE 3: COMPLETED RESULT */}
      {examState === 'completed' && (() => {
        const grade = getGradeDetails()
        const percentage = questions.length > 0 ? (finalScore / questions.length) * 100 : 0
        return (
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl max-w-2xl mx-auto text-slate-900">
            <div className={`p-8 text-center space-y-3 ${grade.bg}`}>
              <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-md border border-slate-100">
                {grade.icon}
              </div>
              <h2 className={`text-2xl sm:text-3xl font-black ${grade.color}`}>{grade.title}</h2>
              <p className="text-sm font-bold text-slate-700">Candidate: {studentName}</p>
            </div>

            <div className="p-8 space-y-6">
              {autoSubmittedDueToCheat && (
                <div className="p-4 bg-rose-50 border-l-4 border-rose-500 text-rose-800 text-xs font-bold rounded-r-xl flex items-start gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>Exam terminated: 2 tab violations detected as per Selection Center rules.</span>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-200/60">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Total Score</span>
                  <span className="text-2xl font-black text-slate-900">{finalScore}/{questions.length}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-200/60">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Percentage</span>
                  <span className="text-2xl font-black text-slate-900">{percentage.toFixed(1)}%</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-200/60">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Time Taken</span>
                  <span className="text-2xl font-black text-slate-900">{formatTime((limitMinutes * 60) - Math.max(0, timeLeft))}</span>
                </div>
              </div>

              {/* Verified Certificate Template */}
              <div ref={certificateRef} className="p-6 bg-gradient-to-br from-slate-900 to-[#0A192F] text-white rounded-2xl border border-slate-800 space-y-4 text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 text-[10px] font-black uppercase tracking-widest border border-amber-400/20">
                  <Award className="w-3 h-3" /> Official Selection Verification
                </div>
                <h3 className="text-lg font-black tracking-tight text-white">{quiz.title}</h3>
                <p className="text-xs text-slate-300">
                  This certifies that <strong>{studentName}</strong> achieved a score of <strong>{finalScore}/{questions.length} ({percentage.toFixed(1)}%)</strong> under official timed conditions.
                </p>
                <div className="text-[10px] text-slate-400 font-mono">
                  Verified by Engineer Yasin • ID: {quizId.toUpperCase()}-{Math.floor(1000 + Math.random() * 9000)}
                </div>
              </div>

              {/* Detailed Review Section */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h4 className="font-black text-sm uppercase text-slate-800">
                  Question Review &amp; Explanations ({questions.length} Items)
                </h4>
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {questions.slice(0, 10).map((q, idx) => {
                    const isCorrect = answers[idx] === q.correct_option_index
                    return (
                      <div key={idx} className={`p-4 rounded-xl border ${isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'} space-y-1.5 text-xs`}>
                        <div className="flex items-center justify-between font-bold">
                          <span className="text-slate-800">Q{idx + 1}: {q.question_text}</span>
                          <span className={isCorrect ? 'text-emerald-700' : 'text-rose-700'}>
                            {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                          <strong>Explanation:</strong> {q.explanation}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                {percentage >= 30 && !autoSubmittedDueToCheat && (
                  <button
                    onClick={downloadCertificate}
                    disabled={downloadingCert}
                    className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-xl text-xs uppercase tracking-wider shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    {downloadingCert ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                    Download Verified Certificate
                  </button>
                )}
                <button
                  onClick={handleRestart}
                  className="px-6 py-3.5 border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Retake Test
                </button>
              </div>
            </div>
          </div>
        )
      })()}

      {/* ANTI-CHEAT STRIKE 1 GRACE WARNING MODAL */}
      {showStrikeWarning && (
        <div className="fixed inset-0 z-[1001] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border-2 border-rose-500 rounded-3xl max-w-md w-full p-6 sm:p-8 text-center space-y-4 shadow-2xl text-slate-900">
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto">
              <AlertOctagon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-rose-700 uppercase tracking-tight">
              Tab Switch Warning (Strike 1 of 2)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              You switched tabs or minimized the browser window during the active exam. As per Selection Center rules, <strong>one more strike will immediately auto-submit and fail your test</strong>.
            </p>
            <button
              onClick={() => setShowStrikeWarning(false)}
              className="w-full py-3.5 bg-slate-900 hover:bg-black text-white font-black rounded-xl text-xs uppercase tracking-wider cursor-pointer shadow-lg"
            >
              I Understand, Return to Test
            </button>
          </div>
        </div>
      )}

      {/* POPUP AUTH MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-center space-y-5 shadow-2xl relative text-slate-900">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <div className="w-14 h-14 bg-rose-50 text-[#B8212E] rounded-2xl flex items-center justify-center mx-auto border border-rose-200">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-slate-900">Sign In Required</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              You must be logged in to attempt this selection mock test, save your scores, and generate your certificate.
            </p>
            <div className="flex flex-col gap-2.5 pt-2">
              <Link
                href={`/login?return_to=/prep/quiz/${quizId}`}
                className="w-full py-3.5 bg-[#B8212E] hover:bg-[#961A25] text-white font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
              >
                <LogIn className="w-4 h-4" /> Sign In to Continue
              </Link>
              <Link
                href={`/signup?return_to=/prep/quiz/${quizId}`}
                className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" /> Create Free Account
              </Link>
            </div>
          </div>
        </div>
      )}

      </div>
    </div>
  )
}
