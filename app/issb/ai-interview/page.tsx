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
    <div className="bg-slate-50 min-h-screen text-gray-800 flex flex-col">
      <div className="max-w-4xl mx-auto w-full px-4 py-8 flex flex-col h-screen">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4 shrink-0">
          <div>
            <Link href="/issb" className="inline-flex items-center gap-2 text-xs font-extrabold text-gray-500 hover:text-[#B8212E] transition-colors uppercase tracking-wider mb-2">
              <ArrowLeft className="w-4 h-4" /> Back to ISSB Hub
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0A192F] tracking-tight uppercase flex items-center gap-3">
              <BrainCircuit className="w-8 h-8 text-[#B8212E]" />
              AI Virtual Psychologist
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-[#0A192F] text-amber-400 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
            <ShieldAlert className="w-4 h-4" />
            Strict Mode Active
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
          
          <div className="bg-blue-50/50 p-4 border-b border-gray-100 text-center">
            <p className="text-xs font-semibold text-slate-500">
              This AI simulates a tough ISSB Psychologist interview. Try to answer confidently without breaking under pressure. When done, type <strong>"EVALUATE ME"</strong> for your final score.
            </p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'model' && (
                  <div className="w-10 h-10 rounded-full bg-[#0A192F] text-white flex items-center justify-center shrink-0 shadow-md">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                )}
                
                <div className={`max-w-[75%] rounded-2xl p-4 shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#B8212E] text-white rounded-tr-none' 
                    : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
                }`}>
                  <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>

                {msg.role === 'user' && (
                  <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 shadow-sm border border-white">
                    <UserRound className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-4 justify-start">
                <div className="w-10 h-10 rounded-full bg-[#0A192F] text-white flex items-center justify-center shrink-0 shadow-md">
                  <BrainCircuit className="w-5 h-5 animate-pulse" />
                </div>
                <div className="bg-slate-100 rounded-2xl rounded-tl-none p-4 flex gap-1.5 items-center">
                  <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-75"></span>
                  <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-150"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-gray-50 border-t border-gray-200 shrink-0">
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
