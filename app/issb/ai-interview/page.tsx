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
        {/* Premium Dark Header */}
        <div className="bg-[#0A192F]/95 backdrop-blur-md px-3 py-3 flex items-center gap-3 shrink-0 z-10 shadow-lg border-b border-white/10 text-white">
          <Link href="/issb" className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-gray-300 hover:text-white" />
          </Link>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#B8212E] to-rose-700 flex items-center justify-center shrink-0 shadow-inner border border-white/20">
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-black text-sm uppercase tracking-wider leading-none mb-1 text-gray-100">Virtual Assessor</span>
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest leading-none flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active
            </span>
          </div>
        </div>

        {/* Chat Area - Premium Dark Mode */}
        <div className="flex-1 bg-gradient-to-b from-[#0A192F] to-[#112240] sm:border sm:border-white/10 sm:border-t-0 sm:rounded-b-2xl sm:shadow-2xl overflow-hidden flex flex-col relative">
          
          <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6 scrollbar-hide">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-2 sm:gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'model' && (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center shrink-0 shadow-md">
                    <BrainCircuit className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
                  </div>
                )}
                
                <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3 sm:p-4 shadow-lg ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-br from-[#B8212E] to-rose-700 text-white rounded-br-sm border border-rose-600' 
                    : 'bg-white/10 backdrop-blur-md text-gray-100 border border-white/10 rounded-bl-sm'
                }`}>
                  <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center shrink-0 shadow-md">
                    <UserRound className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 sm:gap-4 justify-start">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center shrink-0 shadow-md">
                  <BrainCircuit className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 animate-pulse" />
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl rounded-tl-none p-3 sm:p-4 flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-bounce delay-75"></span>
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-bounce delay-150"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 sm:p-4 bg-[#0A192F]/80 backdrop-blur-md border-t border-white/10 shrink-0">
            {error && (
              <div className="mb-3 text-xs font-bold text-rose-400 text-center bg-rose-900/20 py-2 rounded-lg border border-rose-500/20">
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
                placeholder="Type your response..."
                className="flex-1 bg-white/5 border border-white/10 text-white placeholder-gray-400 text-sm rounded-xl py-3.5 pl-4 pr-14 focus:outline-none focus:border-[#B8212E] focus:ring-1 focus:ring-[#B8212E] focus:bg-white/10 transition-all shadow-inner"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#B8212E] hover:bg-rose-600 disabled:bg-white/10 disabled:text-gray-500 text-white w-10 h-10 rounded-lg flex items-center justify-center transition-all shadow-md"
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
