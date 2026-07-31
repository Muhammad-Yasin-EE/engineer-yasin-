'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react'

export function FreemiumModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  if (!mounted) return null

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Assalam o Alaikum! I want to purchase the Premium ISSB AI Plan to unlock unlimited evaluations.")
    window.open(`https://wa.me/923098158572?text=${message}`, '_blank')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-[#0A192F] to-[#112240] p-8 text-center text-white relative border-b border-white/10">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-20 h-20 bg-gradient-to-tr from-[#B8212E] to-rose-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-[0_0_30px_rgba(184,33,46,0.5)]">
                <Lock className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-black mb-2 tracking-tight">Free Limit Reached!</h2>
              <p className="text-sm text-blue-100/80 font-medium leading-relaxed max-w-[280px] mx-auto">
                You have exhausted your 5 free AI evaluations. Upgrade to Premium to unlock unlimited, advanced analytics.
              </p>
            </div>

            {/* Pricing Options */}
            <div className="p-6 space-y-4">
              <div className="p-4 rounded-2xl border-2 border-amber-100 bg-amber-50/50 hover:bg-amber-50 hover:border-amber-200 transition-colors cursor-pointer group">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-[#0A192F] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Weekly Pass
                  </h3>
                  <span className="font-black text-[#B8212E]">Rs. 550</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">7 Days of Unlimited AI Evaluations</p>
                <ul className="text-[11px] text-gray-600 space-y-1 font-semibold">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" /> All Psychologist Tests (TAT, WAT, SCT)</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" /> GTO Tasks Evaluator (Planning & Execution)</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" /> Deputy President Interview Simulator</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl border-2 border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50 hover:border-emerald-200 transition-colors cursor-pointer group relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">RECOMMENDED</div>
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-[#0A192F] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    Monthly Pro
                  </h3>
                  <span className="font-black text-[#B8212E]">Rs. 1600</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">30 Days of Unlimited Everything</p>
                <ul className="text-[11px] text-gray-600 space-y-1 font-semibold">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" /> All Weekly Pass Features (TAT, WAT, SCT, GTO, Deputy)</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" /> Priority Support & Future Beta Tests Access</li>
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="p-8 pt-2">
              <button 
                onClick={handleWhatsAppClick}
                className="group relative w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:-translate-y-0.5 overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-[150%] skew-x-[-20deg] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
                <MessageCircle className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Contact via WhatsApp to Unlock</span>
              </button>
              <p className="text-[10px] text-center text-gray-400 mt-4 px-4 font-medium leading-relaxed">
                Send us a message and we will activate your premium dashboard instantly.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
