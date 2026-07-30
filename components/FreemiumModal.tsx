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
            <div className="bg-gradient-to-br from-[#0A192F] to-[#112240] p-6 text-center text-white relative">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-16 h-16 bg-[#B8212E] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#B8212E]/30">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-black mb-2 tracking-tight">Free Limit Reached!</h2>
              <p className="text-sm text-blue-100 font-medium leading-relaxed">
                You have exhausted your 3 free AI evaluations. Upgrade to Premium to continue your preparation.
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
                <ul className="text-xs text-gray-600 space-y-1">
                  <li className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-green-500" /> Unlimited TAT Evaluator</li>
                  <li className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-green-500" /> Unlimited AI Psychologist</li>
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
                <ul className="text-xs text-gray-600 space-y-1">
                  <li className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-green-500" /> All Weekly Pass Features</li>
                  <li className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-green-500" /> Priority Support & Mentorship</li>
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="p-6 pt-0">
              <button 
                onClick={handleWhatsAppClick}
                className="w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5" />
                Contact via WhatsApp to Unlock
              </button>
              <p className="text-[10px] text-center text-gray-400 mt-4 px-4">
                Send us a message with a screenshot of your payment, and we will activate your premium plan instantly.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
