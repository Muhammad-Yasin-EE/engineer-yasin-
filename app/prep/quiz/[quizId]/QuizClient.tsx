'use client'

import React, { useEffect, useState, useRef, use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { 
  ArrowLeft, Loader2, Award, CheckCircle2, XCircle, ChevronRight, ChevronLeft, 
  RotateCcw, AlertTriangle, Clock, User, ShieldAlert, CheckSquare, Shield, X, MessageCircle, Download 
} from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import confetti from 'canvas-confetti'

// ── Official Pakistan Armed Forces Selection & Recruitment Standards ───────
const OFFICIAL_VERBAL_TIME_MINUTES = 30     // 30 Minutes for Verbal Intelligence
const OFFICIAL_VERBAL_MAX_QUESTIONS = 84    // 84 MCQs for Verbal Intelligence
const OFFICIAL_ACADEMIC_TIME_MINUTES = 25   // 25 Minutes for Academic Tests
const OFFICIAL_ACADEMIC_MAX_QUESTIONS = 50  // 50 MCQs for Academic Tests

const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"

export default function QuizClient({ params }: { params: Promise<{ quizId: string }> }) {
  const router = useRouter()
  const { quizId } = use(params)
  const supabase = createClient()

  // Data States
  const [quiz, setQuiz] = useState<any>(null)
  const [questions, setQuestions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // System States
  const [studentName, setStudentName] = useState('')
  const [examStarted, setExamStarted] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false)
  const [examState, setExamState] = useState<'intro' | 'active' | 'completed'>('intro')
  
  // Dynamic Limits (Official Selection Center format: 84 Verbal / 50 Academic)
  const [limitMinutes, setLimitMinutes] = useState(OFFICIAL_ACADEMIC_TIME_MINUTES)
  const [maxQCount, setMaxQCount] = useState(OFFICIAL_ACADEMIC_MAX_QUESTIONS)
  
  // Timer & Anti-Cheat
  const [timeLeft, setTimeLeft] = useState(OFFICIAL_ACADEMIC_TIME_MINUTES * 60)
  const [autoSubmittedDueToCheat, setAutoSubmittedDueToCheat] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Exam States
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({}) // { questionIndex: selectedOptionIndex }
  const [finalScore, setFinalScore] = useState(0)
  
  // Certificate Ref
  const certificateRef = useRef<HTMLDivElement>(null)
  const [downloadingCert, setDownloadingCert] = useState(false)

  // 1. Fetch Quiz Data & Apply Official Limits
  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        let currentQuiz: any = null
        try {
          const { data: quizData } = await supabase
            .from('quizzes')
            .select('*')
            .eq('id', quizId)
            .single()
          currentQuiz = quizData
        } catch (e) {
          console.warn('Quiz DB query fallback triggered:', e)
        }

        if (!currentQuiz) {
          currentQuiz = {
            id: quizId,
            title: quizId.replace(/-/g, ' ').toUpperCase() || 'ARMED FORCES SCREENING MOCK TEST',
            category: quizId.includes('paf') ? 'Pak Air Force' : quizId.includes('navy') ? 'Pak Navy' : 'Pak Army',
            description: 'Official interactive timed screening examination with automated evaluation and answer explanations.'
          }
        }
        setQuiz(currentQuiz)

        // ── Check if Test is Verbal Intelligence or Academic ────────────────
        let limitMin = OFFICIAL_ACADEMIC_TIME_MINUTES   // 25 Mins default
        let maxQ = OFFICIAL_ACADEMIC_MAX_QUESTIONS       // 50 MCQs default

        if (currentQuiz) {
          const titleLower = (currentQuiz.title || '').toLowerCase()
          const catLower = (currentQuiz.category || '').toLowerCase()

          const isVerbal = 
            titleLower.includes('verbal') || 
            titleLower.includes('intelligence') ||
            titleLower.includes('non-verbal')

          const isAcademic = 
            titleLower.includes('academic') || 
            titleLower.includes('physics') || 
            titleLower.includes('math') || 
            titleLower.includes('english') || 
            titleLower.includes('chemistry') || 
            titleLower.includes('biology') || 
            titleLower.includes('computer') ||
            titleLower.includes('general knowledge') ||
            catLower.includes('mdcat') ||
            catLower.includes('nums')

          if (isVerbal) {
            // 🔴 Official AS&RC / PAF / Navy Standard: 84 Questions in 30 Minutes
            limitMin = OFFICIAL_VERBAL_TIME_MINUTES  // 30
            maxQ = OFFICIAL_VERBAL_MAX_QUESTIONS     // 84
          } else if (isAcademic) {
            // 🔴 Official Selection Standard: 50 Questions in 25 Minutes
            limitMin = OFFICIAL_ACADEMIC_TIME_MINUTES // 25
            maxQ = OFFICIAL_ACADEMIC_MAX_QUESTIONS    // 50
          } else {
            limitMin = OFFICIAL_ACADEMIC_TIME_MINUTES
            maxQ = OFFICIAL_ACADEMIC_MAX_QUESTIONS
          }
        }

        setLimitMinutes(limitMin)
        setMaxQCount(maxQ)
        setTimeLeft(limitMin * 60)

        let fetchedQuestions: any[] = []
        try {
          const { data: questionsData } = await supabase
            .from('quiz_questions')
            .select('*')
            .eq('quiz_id', quizId)
          fetchedQuestions = questionsData || []
        } catch (e) {
          console.warn('Questions DB query fallback triggered:', e)
        }
        
        // If no questions in DB, provide official structured mock questions bank
        if (fetchedQuestions.length === 0) {
          fetchedQuestions = [
            { id: 1, question_text: "Which number comes next in the sequence? 2, 6, 12, 20, 30, ...", options: ["40", "42", "44", "38"], correct_option_index: 1, explanation: "Differences are +4, +6, +8, +10. Next difference is +12, so 30 + 12 = 42." },
            { id: 2, question_text: "If TOWN is coded as 1234 and BIRD is coded as 5678, what is DOWN coded as?", options: ["8234", "5234", "8243", "5324"], correct_option_index: 0, explanation: "D = 8, O = 2, W = 3, N = 4. Therefore DOWN is 8234." },
            { id: 3, question_text: "A candidate completes 80% of a 150-mark test correctly. How many marks did the candidate score?", options: ["110", "120", "125", "115"], correct_option_index: 1, explanation: "(80 / 100) * 150 = 120 marks." },
            { id: 4, question_text: "Choose the word that is most nearly OPPOSITE in meaning to 'COURAGEOUS':", options: ["Bold", "Timid", "Valiant", "Heroic"], correct_option_index: 1, explanation: "Timid means fearful or easily frightened, opposite of courageous." },
            { id: 5, question_text: "If 5 workers can build a defensive trench in 12 days, how many days will 6 workers take at the same pace?", options: ["10 days", "9 days", "8 days", "11 days"], correct_option_index: 0, explanation: "Total man-days = 5 * 12 = 60. For 6 workers: 60 / 6 = 10 days." },
            { id: 6, question_text: "Which of the following represents the highest operational military rank among the choices?", options: ["Lieutenant Colonel", "Brigadier", "Major General", "Colonel"], correct_option_index: 2, explanation: "Major General is a two-star general officer, higher than Lieutenant Colonel, Colonel, or Brigadier." },
            { id: 7, question_text: "A train running at 72 km/h crosses a pole in 15 seconds. What is the length of the train?", options: ["300 meters", "250 meters", "350 meters", "200 meters"], correct_option_index: 0, explanation: "72 km/h = 20 m/s. Length = Speed * Time = 20 * 15 = 300 meters." },
            { id: 8, question_text: "Identify the odd word out among the following instruments:", options: ["Barometer", "Thermometer", "Diameter", "Hygrometer"], correct_option_index: 2, explanation: "Diameter is a geometric measurement of a circle, while all others are physical measuring instruments." },
            { id: 9, question_text: "Who was the first recipient of Nishan-e-Haider in Pakistan Armed Forces?", options: ["Major Raja Aziz Bhatti", "Captain Muhammad Sarwar", "Major Muhammad Akram", "Pilot Officer Rashid Minhas"], correct_option_index: 1, explanation: "Captain Muhammad Sarwar Shaheed (1948 Kashmir War) was the first recipient of Nishan-e-Haider." },
            { id: 10, question_text: "If 'A' is taller than 'B' but shorter than 'C', and 'D' is taller than 'C', who is the tallest among them?", options: ["C", "A", "B", "D"], correct_option_index: 3, explanation: "Descending order of height is D > C > A > B. Thus, D is the tallest." },
            { id: 11, question_text: "Which of the following atmospheric layers is closest to the Earth's surface where weather phenomena occur?", options: ["Stratosphere", "Troposphere", "Mesosphere", "Thermosphere"], correct_option_index: 1, explanation: "The Troposphere is the lowest layer of Earth's atmosphere." },
            { id: 12, question_text: "What is the capital city of Azad Jammu & Kashmir?", options: ["Gilgit", "Mirpur", "Muzaffarabad", "Rawalakot"], correct_option_index: 2, explanation: "Muzaffarabad is the capital of Azad Jammu and Kashmir." }
          ]
        }

        // Shuffle and limit questions to exact official max count (84 for Verbal, 50 for Academic)
        fetchedQuestions = fetchedQuestions.sort(() => 0.5 - Math.random()).slice(0, maxQ)

        // Shuffle options dynamically
        fetchedQuestions = fetchedQuestions.map(q => {
          const originalOptions = q.options || []
          const originalCorrect = q.correct_option_index
          
          let optionsWithIndices = originalOptions.map((opt: string, i: number) => ({ text: opt, originalIndex: i }))
          optionsWithIndices.sort(() => 0.5 - Math.random())
          
          const newCorrectIndex = optionsWithIndices.findIndex(opt => opt.originalIndex === originalCorrect)
          
          return {
            ...q,
            options: optionsWithIndices.map(opt => opt.text),
            correct_option_index: newCorrectIndex
          }
        })

        setQuestions(fetchedQuestions)
      } catch (err) {
        console.error('Fetch quiz questions error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchQuizDetails()
  }, [quizId, supabase])

  // 2. Timer & Anti-Cheat Logic
  useEffect(() => {
    if (examState !== 'active') return

    // Timer Interval
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          submitExam()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Anti-Cheat: Visibility Change (Tab Switch Detection)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setAutoSubmittedDueToCheat(true)
        submitExam()
      }
    }

    // Anti-Cheat: Window Blur
    const handleWindowBlur = () => {
      setAutoSubmittedDueToCheat(true)
      submitExam()
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("blur", handleWindowBlur)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("blur", handleWindowBlur)
    }
  }, [examState])

  const submitExam = async () => {
    setExamState('completed')
    if (timerRef.current) clearInterval(timerRef.current)
    
    // Calculate Score
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

    // Trigger Confetti if passed with high marks
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
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [800, 560]
      })
      pdf.addImage(imgData, 'PNG', 0, 0, 800, 560)
      pdf.save(`${studentName.replace(/ /g, '_')}_Official_Selection_Certificate.pdf`)
    } catch (err) {
      console.error('Certificate Generation Error:', err)
    } finally {
      setDownloadingCert(false)
    }
  }

  const startExam = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!studentName.trim()) return
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setShowAuthModal(true)
      return
    }

    setShowWhatsAppModal(true)
  }

  const launchExam = () => {
    setShowWhatsAppModal(false)
    setExamState('active')
    setExamStarted(true)
  }

  const handleOptionSelect = (optionIdx: number) => {
    if (examState !== 'active') return
    setAnswers(prev => ({ ...prev, [currentIndex]: optionIdx }))
  }

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setAnswers({})
    setFinalScore(0)
    setExamState('intro')
    setExamStarted(false)
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
    if (percentage < 50) return { title: 'Needs Improvement / Hard Work Required', color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-900/20', icon: <XCircle className="w-8 h-8" /> }
    if (percentage < 70) return { title: 'Good Effort, but you can do better', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20', icon: <AlertTriangle className="w-8 h-8" /> }
    if (percentage < 85) return { title: `Congratulations ${studentName}, Test Cleared!`, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20', icon: <CheckCircle2 className="w-8 h-8" /> }
    return { title: `Outstanding Performance ${studentName}! Ready for Selection Center.`, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/20', icon: <Award className="w-8 h-8" /> }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-3 text-xs text-gray-500 dark:text-gray-400 w-full overflow-hidden">
        <Loader2 className="w-8 h-8 animate-spin text-[#B8212E]" />
        <span>Loading official selection test environment...</span>
      </div>
    )
  }

  if (!quiz || questions.length === 0) {
    return (
      <div className="max-w-md w-full mx-auto py-24 px-4 text-center space-y-4 text-xs font-bold text-gray-500 dark:text-gray-400 overflow-hidden">
        <XCircle className="w-12 h-12 mx-auto text-rose-500" />
        <h3 className="dark:text-white">Quiz Not Ready</h3>
        <p className="font-semibold text-gray-400 break-words">There are no questions uploaded for this quiz yet.</p>
        <Link href="/prep" className="inline-block px-5 py-2.5 bg-[#B8212E] text-white rounded-full uppercase tracking-wider text-[10px]">
          Back to Prep Hub
        </Link>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]
  const hasAnsweredCurrent = answers[currentIndex] !== undefined

  return (
    <div className="fixed inset-0 z-[999] bg-white dark:bg-gray-900 overflow-y-auto w-full h-full">
      <div className="max-w-3xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-16 flex-grow text-[#222222] dark:text-gray-100 space-y-6 min-h-screen box-border">
      
      {/* Show Back Button ONLY if exam hasn't started */}
      {!examStarted && (
        <div className="w-full">
          <Link href="/prep" className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-[#B8212E] dark:hover:text-[#B8212E] transition-colors">
            <ArrowLeft className="w-4 h-4 shrink-0" /> Back to Prep Hub
          </Link>
        </div>
      )}

      {/* STATE 1: INTRO RULES SCREEN */}
      {examState === 'intro' && (
        <div className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 sm:p-8 rounded-2xl shadow-sm space-y-6 sm:space-y-8 max-w-xl mx-auto overflow-hidden">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#B8212E]/10 dark:bg-[#B8212E]/20 text-[#B8212E] dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shrink-0">
              <ShieldAlert className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight break-words">Official Selection Center Pattern</h1>
            <p className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 break-words">{quiz.title}</p>
          </div>

          <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 sm:p-5 rounded-xl space-y-3 sm:space-y-4 text-[11px] sm:text-xs font-semibold text-gray-600 dark:text-gray-300 overflow-hidden">
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500 shrink-0" />
              <p className="break-words">
                Strict Time Limit of <strong className="text-gray-900 dark:text-white">{limitMinutes} Minutes</strong> ({questions.length} Questions). The test will auto-submit when the official time expires.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 shrink-0" />
              <p className="break-words"><strong>Anti-Cheat Enabled:</strong> If you open a new tab, switch apps, or minimize the window, your exam will immediately Auto-Submit with 0 warnings.</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckSquare className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 shrink-0" />
              <p className="break-words"><strong>Navigation:</strong> You can skip questions and revisit them anytime before final submission using the Question Grid.</p>
            </div>
          </div>

          <form onSubmit={startExam} className="w-full space-y-4">
            <div className="space-y-2 w-full">
              <label className="block text-[9px] sm:text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 tracking-wider">Candidate Full Name</label>
              <div className="relative w-full">
                <User className="w-4 h-4 text-gray-400 dark:text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 shrink-0" />
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter your full name as per CNIC / B-Form..."
                  className="w-full pl-9 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#B8212E] focus:border-[#B8212E]"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={!studentName.trim()}
              className="w-full py-3 sm:py-3.5 bg-[#B8212E] hover:bg-[#D62636] disabled:opacity-50 text-white font-black rounded-lg text-xs sm:text-sm shadow-md transition-all uppercase tracking-widest break-words cursor-pointer disabled:cursor-not-allowed"
            >
              Start Official Exam ({questions.length} MCQs | {limitMinutes} Mins)
            </button>
          </form>
        </div>
      )}

      {/* STATE 2: ACTIVE EXAM */}
      {examState === 'active' && (
        <div className="w-full space-y-4 sm:space-y-6 overflow-hidden">
          {/* Header Bar */}
          <div className="w-full bg-gray-900 dark:bg-gray-800 text-white p-3 sm:p-4 rounded-xl flex items-center justify-between sticky top-2 sm:top-4 z-50 shadow-lg overflow-hidden border border-transparent dark:border-gray-700">
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink min-w-0">
              <div className="bg-white/20 p-1.5 sm:p-2 rounded-lg shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1 truncate">
                <p className="text-[8px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-wider truncate">Candidate</p>
                <p className="text-[10px] sm:text-xs font-bold truncate text-white">{studentName}</p>
              </div>
            </div>

            <div className="flex flex-col items-end shrink-0 pl-2">
              <p className="text-[8px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3 h-3 shrink-0" /> Time Remaining
              </p>
              <p className={`text-lg sm:text-xl font-mono font-black ${timeLeft < 60 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
                {formatTime(timeLeft)}
              </p>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="w-full flex justify-between items-center text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 px-1">
            <span className="truncate pr-2 break-words">Test: <strong className="text-gray-800 dark:text-gray-200">{quiz.title}</strong></span>
            <span className="font-mono bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 font-bold shrink-0 whitespace-nowrap rounded">
              Question {currentIndex + 1} of {questions.length}
            </span>
          </div>
          <div className="w-full h-1.5 sm:h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#B8212E] transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Box */}
          <div className="w-full p-5 sm:p-8 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl shadow-sm min-h-[120px] sm:min-h-[160px] flex items-center overflow-hidden">
            <h3 className="font-extrabold text-gray-900 dark:text-white text-base sm:text-xl leading-relaxed w-full break-words">
              {currentQuestion.question_text}
            </h3>
          </div>

          {/* Options Grid */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 overflow-hidden">
            {currentQuestion.options.map((option: string, idx: number) => {
              const isSelectedOption = answers[currentIndex] === idx
              const optionClass = isSelectedOption
                ? 'bg-red-50 dark:bg-[#B8212E]/10 border-[#B8212E] text-red-900 dark:text-red-100 ring-1 ring-[#B8212E]'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  className={`w-full p-3.5 sm:p-5 border-2 rounded-xl text-left font-bold text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer overflow-hidden break-words ${optionClass}`}
                >
                  <span className="leading-relaxed break-words">{option}</span>
                  {isSelectedOption && <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#B8212E] shrink-0" />}
                </button>
              )
            })}
          </div>

          {/* Action Buttons Row */}
          <div className="w-full flex justify-between items-center pt-4 sm:pt-6 border-t border-gray-100 dark:border-gray-800 overflow-hidden">
            <button
              onClick={handleBack}
              disabled={currentIndex === 0}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 disabled:hover:bg-gray-100 dark:disabled:hover:bg-gray-800 text-gray-800 dark:text-gray-200 font-bold rounded-xl text-[10px] sm:text-sm flex items-center gap-1 sm:gap-2 transition-all uppercase tracking-wider shrink-0 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              Back
            </button>

            {currentIndex + 1 < questions.length ? (
              <button
                onClick={handleNext}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-900 dark:bg-white hover:bg-black dark:hover:bg-gray-200 text-white dark:text-gray-900 font-bold rounded-xl text-[10px] sm:text-sm shadow-md flex items-center gap-1 sm:gap-2 transition-all uppercase tracking-wider shrink-0 cursor-pointer"
              >
                {hasAnsweredCurrent ? 'Next' : 'Skip'}
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              </button>
            ) : (
              <button
                onClick={submitExam}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-[#B8212E] hover:bg-[#D62636] text-white font-black rounded-xl text-[10px] sm:text-sm shadow-md flex items-center gap-1 sm:gap-2 transition-all uppercase tracking-wider animate-pulse shrink-0 cursor-pointer"
              >
                Submit Test
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              </button>
            )}
          </div>

          {/* Question Navigator Grid */}
          <div className="w-full pt-6 sm:pt-8 space-y-2 sm:space-y-3 overflow-hidden">
            <h4 className="text-[9px] sm:text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Question Navigator ({questions.length} Items)</h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 max-h-56 overflow-y-auto p-1">
              {questions.map((_, idx) => {
                const isAnswered = answers[idx] !== undefined
                const isCurrent = idx === currentIndex
                
                let btnClass = 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 bg-white dark:bg-gray-800'
                
                if (isAnswered) {
                  btnClass = 'bg-[#B8212E] border-[#B8212E] text-white shadow-sm'
                }
                if (isCurrent) {
                  btnClass = 'ring-2 ring-offset-1 ring-gray-900 dark:ring-gray-300 border-gray-900 dark:border-white text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 font-black'
                }

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-7 h-7 sm:w-9 sm:h-9 border rounded-md sm:rounded-lg text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center shrink-0 cursor-pointer ${btnClass}`}
                  >
                    {idx + 1}
                  </button>
                )
              })}
            </div>
            <p className="text-[9px] sm:text-[10px] text-gray-400 dark:text-gray-500 font-semibold italic break-words">Red = Attempted, Gray = Unanswered</p>
          </div>
        </div>
      )}

      {/* STATE 3: COMPLETED RESULT */}
      {examState === 'completed' && (() => {
        const grade = getGradeDetails()
        const percentage = questions.length > 0 ? (finalScore / questions.length) * 100 : 0

        return (
          <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl animate-scale-in">
            {/* Top Color Banner */}
            <div className={`w-full p-6 sm:p-10 text-center space-y-3 sm:space-y-4 ${grade.bg}`}>
              <div className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm shrink-0 ${grade.color}`}>
                {grade.icon}
              </div>
              <h2 className={`text-xl sm:text-3xl font-black break-words ${grade.color}`}>{grade.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 font-bold text-xs sm:text-sm break-words">Candidate: <span className="text-gray-900 dark:text-white">{studentName}</span></p>
            </div>

            <div className="w-full p-6 sm:p-10 space-y-6 sm:space-y-8 overflow-hidden">
              {/* Anti-Cheat Warning */}
              {autoSubmittedDueToCheat && (
                <div className="w-full p-3 sm:p-4 bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-500 text-rose-700 dark:text-rose-400 text-xs sm:text-sm font-bold flex items-start gap-2 sm:gap-3 overflow-hidden">
                  <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5" />
                  <p className="break-words"><strong>Exam Violation Detected:</strong> You switched tabs or minimized the browser during the exam. The system automatically submitted your quiz as per Selection Center rules.</p>
                </div>
              )}

              {/* Time Expired Warning */}
              {timeLeft <= 0 && !autoSubmittedDueToCheat && (
                <div className="w-full p-3 sm:p-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 text-amber-700 dark:text-amber-400 text-xs sm:text-sm font-bold flex items-start gap-2 sm:gap-3 overflow-hidden">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5" />
                  <p className="break-words"><strong>Time Expired:</strong> Your official {limitMinutes} minutes were completed, so the test was automatically submitted.</p>
                </div>
              )}

              <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 sm:p-5 rounded-xl text-center space-y-1 col-span-2 sm:col-span-1 overflow-hidden">
                  <span className="block text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-gray-400 dark:text-gray-500 break-words">Total Score</span>
                  <span className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">{finalScore}<span className="text-sm sm:text-lg text-gray-400 dark:text-gray-500">/{questions.length}</span></span>
                </div>
                <div className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 sm:p-5 rounded-xl text-center space-y-1 overflow-hidden">
                  <span className="block text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-gray-400 dark:text-gray-500 break-words">Percentage</span>
                  <span className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">{percentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 sm:p-5 rounded-xl text-center space-y-1 overflow-hidden">
                  <span className="block text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-gray-400 dark:text-gray-500 break-words">Time Taken</span>
                  <span className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">{formatTime((limitMinutes * 60) - Math.max(0, timeLeft))}</span>
                </div>
              </div>

              <div className="w-full flex flex-col sm:flex-row justify-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800 overflow-hidden">
                {percentage >= 30 && !autoSubmittedDueToCheat && (
                  <button
                    onClick={downloadCertificate}
                    disabled={downloadingCert}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-black rounded-xl text-xs sm:text-sm shadow-md cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider transition-all shrink-0 break-words"
                  >
                    {downloadingCert ? <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin shrink-0" /> : <Download className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />}
                    Get Verified Certificate
                  </button>
                )}
                <button
                  onClick={handleRestart}
                  className="px-6 py-3 border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold rounded-xl text-xs sm:text-sm cursor-pointer flex items-center justify-center gap-2 transition-all shrink-0 break-words"
                >
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  Retake Test
                </button>
              </div>
            </div>
          </div>
        )
      })()}

      </div>
    </div>
  )
}
