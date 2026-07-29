'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Send, BrainCircuit, UserRound, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { chatWithDpInterview } from '@/app/actions/ai-dp-interview'

// Type definitions for PIF
interface PIFData {
  name: string
  age: string
  height: string
  weight: string
  address: string
  fatherDetails: string
  fatherIncome: string
  motherDetails: string
  siblings: string
  educationMatric: string
  educationFsc: string
  sportsAndHobbies: string
  merits: string
  demerits: string
}

export default function DPMockInterviewPage() {
  // State 1: PIF Form
  const [isPifFilled, setIsPifFilled] = useState(false)
  const [pifData, setPifData] = useState<PIFData>({
    name: '', age: '', height: '', weight: '', address: '',
    fatherDetails: '', fatherIncome: '', motherDetails: '', siblings: '',
    educationMatric: '', educationFsc: '', sportsAndHobbies: '', merits: '', demerits: ''
  })

  // State 2: Interview Chat
  const [messages, setMessages] = useState<{ role: 'user' | 'model', content: string }[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [questionCount, setQuestionCount] = useState(0)
  const [evaluation, setEvaluation] = useState<any>(null)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handlePifSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsPifFilled(true)
    
    // Initial greeting from AI
    setMessages([
      { role: 'model', content: `Good morning, ${pifData.name}. I have your Personal Information Form right here. Please take a seat, relax, and introduce yourself.` }
    ])
    setQuestionCount(1)
  }

  const handleSend = async () => {
    if (!input.trim() || loading || evaluation) return
    
    const userMessage = input.trim()
    setInput('')
    setError('')
    
    const newMessages = [...messages, { role: 'user' as const, content: userMessage }]
    setMessages(newMessages)
    setLoading(true)

    const res = await chatWithDpInterview(messages, userMessage, pifData, questionCount)
    
    if (res.error) {
      setError(res.error)
      // Revert user message on error
      setMessages(messages)
      setInput(userMessage)
    } else if (res.success) {
      if (res.text === 'INTERVIEW_COMPLETE' || res.text === 'INTERVIEW_COMPLETE_ERROR') {
         setEvaluation(res.evaluationData || { error: true })
      } else {
         setMessages([...newMessages, { role: 'model', content: res.text }])
         setQuestionCount(prev => prev + 1)
      }
    }
    
    setLoading(false)
  }

  if (!isPifFilled) {
    return (
      <div className="min-h-screen bg-slate-50 py-10 px-4 font-sans text-gray-900">
        <div className="max-w-3xl mx-auto">
          <Link href="/issb/dp-interview" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to DP Hub
          </Link>
          
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-[#0A192F] p-8 sm:p-10 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
               <FileText className="w-10 h-10 text-amber-400 mb-4" />
               <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">Official Bio-Data Form (PIF)</h1>
               <p className="text-sm text-gray-300 mt-2 font-medium max-w-lg leading-relaxed">
                 The Deputy President must review your file before the interview. Ensure all details are 100% accurate as you will be cross-questioned heavily on them.
               </p>
            </div>
            
            <form onSubmit={handlePifSubmit} className="p-8 sm:p-10 space-y-8">
               
               <div className="space-y-4">
                 <h3 className="text-sm font-black uppercase text-amber-600 tracking-widest border-b border-gray-100 pb-2">1. Basic Details</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <input required type="text" placeholder="Full Name" className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm w-full focus:ring-2 focus:ring-amber-500 outline-none" value={pifData.name} onChange={e => setPifData({...pifData, name: e.target.value})} />
                   <input required type="text" placeholder="Age (e.g., 19 Years 4 Months)" className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm w-full focus:ring-2 focus:ring-amber-500 outline-none" value={pifData.age} onChange={e => setPifData({...pifData, age: e.target.value})} />
                   <input required type="text" placeholder="Height (e.g., 5' 9\")" className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm w-full focus:ring-2 focus:ring-amber-500 outline-none" value={pifData.height} onChange={e => setPifData({...pifData, height: e.target.value})} />
                   <input required type="text" placeholder="Weight (e.g., 68 KG)" className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm w-full focus:ring-2 focus:ring-amber-500 outline-none" value={pifData.weight} onChange={e => setPifData({...pifData, weight: e.target.value})} />
                   <input required type="text" placeholder="Present Address / District" className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm w-full focus:ring-2 focus:ring-amber-500 outline-none sm:col-span-2" value={pifData.address} onChange={e => setPifData({...pifData, address: e.target.value})} />
                 </div>
               </div>

               <div className="space-y-4">
                 <h3 className="text-sm font-black uppercase text-amber-600 tracking-widest border-b border-gray-100 pb-2">2. Family Profile</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <input required type="text" placeholder="Father's Profession/Rank & Education" className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm w-full focus:ring-2 focus:ring-amber-500 outline-none" value={pifData.fatherDetails} onChange={e => setPifData({...pifData, fatherDetails: e.target.value})} />
                   <input required type="text" placeholder="Father's Monthly Income" className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm w-full focus:ring-2 focus:ring-amber-500 outline-none" value={pifData.fatherIncome} onChange={e => setPifData({...pifData, fatherIncome: e.target.value})} />
                   <input required type="text" placeholder="Mother's Profession (e.g., Housewife)" className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm w-full focus:ring-2 focus:ring-amber-500 outline-none sm:col-span-2" value={pifData.motherDetails} onChange={e => setPifData({...pifData, motherDetails: e.target.value})} />
                   <textarea required placeholder="Siblings Order (e.g., I have 2 elder brothers, 1 younger sister. I am number 3)" className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm w-full h-24 resize-none focus:ring-2 focus:ring-amber-500 outline-none sm:col-span-2" value={pifData.siblings} onChange={e => setPifData({...pifData, siblings: e.target.value})} />
                 </div>
               </div>

               <div className="space-y-4">
                 <h3 className="text-sm font-black uppercase text-amber-600 tracking-widest border-b border-gray-100 pb-2">3. Academics & Interests</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <input required type="text" placeholder="Matric/O-Level Percentage" className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm w-full focus:ring-2 focus:ring-amber-500 outline-none" value={pifData.educationMatric} onChange={e => setPifData({...pifData, educationMatric: e.target.value})} />
                   <input required type="text" placeholder="FSc/A-Level Percentage" className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm w-full focus:ring-2 focus:ring-amber-500 outline-none" value={pifData.educationFsc} onChange={e => setPifData({...pifData, educationFsc: e.target.value})} />
                   <input required type="text" placeholder="Sports & Hobbies" className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm w-full focus:ring-2 focus:ring-amber-500 outline-none sm:col-span-2" value={pifData.sportsAndHobbies} onChange={e => setPifData({...pifData, sportsAndHobbies: e.target.value})} />
                 </div>
               </div>

               <div className="space-y-4">
                 <h3 className="text-sm font-black uppercase text-amber-600 tracking-widest border-b border-gray-100 pb-2">4. Self Appraisal</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <input required type="text" placeholder="Write 2 Merits" className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm w-full focus:ring-2 focus:ring-amber-500 outline-none" value={pifData.merits} onChange={e => setPifData({...pifData, merits: e.target.value})} />
                   <input required type="text" placeholder="Write 2 Demerits" className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm w-full focus:ring-2 focus:ring-amber-500 outline-none" value={pifData.demerits} onChange={e => setPifData({...pifData, demerits: e.target.value})} />
                 </div>
               </div>

               <button type="submit" className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm uppercase tracking-widest rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
                 Submit File & Enter DP Room ➔
               </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // Interview Interface
  return (
    <div className="bg-slate-50 h-[100dvh] text-gray-800 flex flex-col font-sans">
      <div className="max-w-4xl mx-auto w-full flex flex-col flex-1 overflow-hidden sm:px-4 sm:py-6">
        {/* Brand Header */}
        <div className="bg-white px-4 py-3 flex items-center justify-between shrink-0 z-10 shadow-sm border-b border-gray-200 sm:rounded-t-3xl">
          <div className="flex items-center gap-3">
            <Link href="/issb/dp-interview" className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </Link>
            <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center shrink-0 shadow-sm border border-amber-200">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-black text-sm uppercase tracking-wider leading-none mb-1 text-gray-900">Deputy President</span>
              <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest leading-none flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Recording Active
              </span>
            </div>
          </div>
          <div className="text-xs font-black uppercase text-amber-500 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg">
            Question {questionCount}/15
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-slate-50 sm:bg-white sm:border sm:border-gray-200 sm:border-t-0 sm:rounded-b-2xl sm:shadow-sm overflow-hidden flex flex-col relative">
          
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 scrollbar-hide">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 sm:gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'model' && (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm border border-amber-200">
                    <BrainCircuit className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                )}
                
                <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#0A192F] text-white rounded-br-sm border border-[#1A2E4C]' 
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
                }`}>
                  <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center shrink-0 shadow-sm border border-white">
                    <UserRound className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                )}
              </div>
            ))}
            
            {loading && (
              <div className="flex gap-3 sm:gap-4 justify-start">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <BrainCircuit className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-pulse" />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-4 flex gap-1.5 items-center">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce delay-75"></span>
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce delay-150"></span>
                </div>
              </div>
            )}

            {/* Evaluation Result */}
            {evaluation && (
              <div className="mt-8 border-2 border-emerald-500 rounded-3xl bg-emerald-50 p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 shadow-xl">
                <h3 className="text-xl font-black text-emerald-800 uppercase flex items-center gap-2 mb-6">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  Final Deputy President Assessment
                </h3>
                
                {evaluation.error ? (
                   <p className="text-rose-600 font-bold">The AI encountered an error generating the final report. Please try again.</p>
                ) : (
                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-2xl border border-emerald-200 flex flex-col items-center text-center">
                        <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Verdict</span>
                        <span className={`text-2xl font-black uppercase ${evaluation.evaluation?.toLowerCase() === 'pass' ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {evaluation.evaluation}
                        </span>
                      </div>
                      <div className="bg-white p-4 rounded-2xl border border-emerald-200 flex flex-col items-center text-center">
                        <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Score</span>
                        <span className="text-2xl font-black text-emerald-800">{evaluation.score}/10</span>
                      </div>
                    </div>
                    <div className="bg-white border border-emerald-200 rounded-2xl p-5 space-y-3">
                      <div>
                        <span className="text-xs font-black text-emerald-600 uppercase block mb-1">Confidence</span>
                        <p className="text-sm text-gray-700 font-medium">{evaluation.confidence}</p>
                      </div>
                      <div>
                        <span className="text-xs font-black text-emerald-600 uppercase block mb-1">Truthfulness</span>
                        <p className="text-sm text-gray-700 font-medium">{evaluation.truthfulness}</p>
                      </div>
                      <div>
                        <span className="text-xs font-black text-emerald-600 uppercase block mb-1">Logic & Justification</span>
                        <p className="text-sm text-gray-700 font-medium">{evaluation.logic}</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-emerald-200/60">
                      <p className="text-sm font-bold text-gray-800 italic leading-relaxed">
                        "{evaluation.finalRemarks}"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 sm:p-4 bg-white border-t border-gray-200 shrink-0">
            {error && (
              <div className="mb-3 text-xs font-bold text-[#B8212E] text-center bg-rose-50 py-2 rounded-lg border border-rose-200">
                ⚠️ {error}
              </div>
            )}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex gap-3 relative"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={evaluation ? "Interview Complete" : "Speak to the Deputy President..."}
                className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm rounded-xl py-4 pl-4 pr-14 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:bg-white transition-all shadow-inner disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={loading || !!evaluation}
              />
              <button
                type="submit"
                disabled={loading || !input.trim() || !!evaluation}
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-amber-500 hover:bg-amber-400 disabled:bg-gray-300 disabled:text-gray-500 text-slate-900 w-12 h-12 rounded-lg flex items-center justify-center transition-all shadow-sm"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}
