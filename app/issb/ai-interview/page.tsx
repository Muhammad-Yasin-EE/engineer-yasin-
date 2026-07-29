'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Send, BrainCircuit, UserRound, ShieldAlert } from 'lucide-react'
import Link from 'next/link'
import { chatWithISSBPsychologist } from '@/app/actions/ai-interview'

export default function AIInterviewPage() {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', content: string }[]>([
    { role: 'model', content: 'Welcome to the ISSB Psychological Assessment Assessment. I am the virtual psychologist. Please enter your name and a brief introduction to begin your interview.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return
    
    const userMessage = input.trim()
    setInput('')
    setError('')
    
    const newMessages = [...messages, { role: 'user' as const, content: userMessage }]
    setMessages(newMessages)
    setLoading(true)

    const res = await chatWithISSBPsychologist(messages, userMessage)
    
    if (res.error) {
      setError(res.error)
      // Revert the last user message if there's an error so they can try again
      setMessages(messages)
      setInput(userMessage)
    } else if (res.success && res.text) {
      setMessages([...newMessages, { role: 'model', content: res.text }])
    }
    
    setLoading(false)
  }

  return (
    <div className="bg-slate-50 h-[100dvh] text-gray-800 flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex flex-col flex-1 overflow-hidden bg-white sm:bg-transparent sm:px-4 sm:py-6">
        
        {/* Header */}
        <div className="bg-white px-4 py-3 sm:py-4 flex items-center justify-between border-b border-gray-200 shrink-0 z-10 shadow-sm sm:rounded-t-3xl">
          <div>
            <Link href="/issb" className="inline-flex items-center gap-2 text-xs font-extrabold text-gray-500 hover:text-[#B8212E] transition-colors uppercase tracking-wider mb-1">
              <ArrowLeft className="w-4 h-4" /> Back to ISSB Hub
            </Link>
            <h1 className="text-xl sm:text-3xl font-black text-[#0A192F] tracking-tight uppercase flex items-center gap-2">
              <BrainCircuit className="w-6 h-6 text-[#B8212E]" />
              Virtual Psychologist
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-[#0A192F] text-amber-400 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
            <ShieldAlert className="w-4 h-4" />
            Strict Mode
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-slate-50 sm:bg-white sm:border sm:border-gray-200 sm:border-t-0 sm:rounded-b-3xl sm:shadow-sm overflow-hidden flex flex-col">
          
          <div className="bg-blue-50 p-3 sm:p-4 text-center mx-4 mt-4 rounded-xl shadow-sm border border-blue-100">
            <p className="text-xs font-semibold text-slate-500">
              This AI simulates a tough ISSB Psychologist interview. Try to answer confidently without breaking under pressure. When done, type <strong>"EVALUATE ME"</strong> for your final score.
            </p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-2 sm:gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'model' && (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0A192F] text-white flex items-center justify-center shrink-0 shadow-md">
                    <BrainCircuit className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                )}
                
                <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3 sm:p-4 shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#B8212E] text-white rounded-tr-none' 
                    : 'bg-white sm:bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
                }`}>
                  <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 shadow-sm border border-white">
                    <UserRound className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 sm:gap-4 justify-start">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0A192F] text-white flex items-center justify-center shrink-0 shadow-md">
                  <BrainCircuit className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                </div>
                <div className="bg-white sm:bg-slate-100 border border-slate-200 rounded-2xl rounded-tl-none p-3 sm:p-4 flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-400 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-400 animate-bounce delay-75"></span>
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-400 animate-bounce delay-150"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-2 sm:p-4 bg-slate-100 sm:bg-gray-50 border-t border-gray-200 shrink-0">
            {error && (
              <div className="mb-3 text-xs font-bold text-[#B8212E] text-center">
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
                placeholder="Type your response to the psychologist..."
                className="flex-1 bg-white border border-gray-300 text-gray-800 text-sm rounded-2xl py-3.5 pl-5 pr-14 focus:outline-none focus:border-[#B8212E] focus:ring-1 focus:ring-[#B8212E] shadow-inner transition-all"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="absolute right-2 top-2 bottom-2 bg-[#0A192F] hover:bg-[#B8212E] disabled:bg-slate-300 text-white w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}
