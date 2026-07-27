'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { MessageCircle, X, Sparkles, Users, Bell } from 'lucide-react'

export default function WhatsappPopup() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const whatsappUrl = 'https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0'

  // Check if current route is ANY test or practice module
  const isTestOrPractice = 
    pathname?.startsWith('/prep/quiz') || 
    pathname?.includes('/wat') ||
    pathname?.includes('/sct-') ||
    pathname?.includes('/srt') ||
    pathname?.includes('/gd-topics') ||
    pathname?.includes('/ranks')

  useEffect(() => {
    // Immediately suppress popup during any test or assessment module
    if (isTestOrPractice) {
      setIsOpen(false)
      return
    }

    // Check session status
    const hasShownTwice = sessionStorage.getItem('wp_popup_shown_twice') === 'true'
    const hasClickedJoin = sessionStorage.getItem('wp_popup_joined') === 'true'

    if (hasShownTwice) {
      // Already showed the 2nd time after the 3-minute post-join interval in this session
      return
    }

    if (hasClickedJoin) {
      // User clicked join; schedule exact 3-minute (180,000 ms) one-time reminder
      const threeMinuteTimer = setTimeout(() => {
        if (!isTestOrPractice && sessionStorage.getItem('wp_popup_shown_twice') !== 'true') {
          setIsOpen(true)
          sessionStorage.setItem('wp_popup_shown_twice', 'true')
        }
      }, 180000) // Exactly 3 minutes later

      return () => clearTimeout(threeMinuteTimer)
    } else {
      // Initial appearance after 45 seconds on standard non-test pages
      const initialTimer = setTimeout(() => {
        if (!isTestOrPractice && sessionStorage.getItem('wp_popup_joined') !== 'true' && sessionStorage.getItem('wp_popup_shown_twice') !== 'true') {
          setIsOpen(true)
        }
      }, 45000)

      return () => clearTimeout(initialTimer)
    }
  }, [pathname, isTestOrPractice])

  // Absolutely suppress rendering on test pages even if state was previously open
  if (isTestOrPractice || !isOpen) {
    return null
  }

  const handleJoinClick = () => {
    sessionStorage.setItem('wp_popup_joined', 'true')
    setIsOpen(false)
    // When clicked, the useEffect will re-evaluate and set the exact 3-minute timer for the one final appearance in this session
  }

  const handleDismiss = () => {
    const hasClickedJoin = sessionStorage.getItem('wp_popup_joined') === 'true'
    if (hasClickedJoin) {
      // If they dismissed the reminder after joining, never show again in this session
      sessionStorage.setItem('wp_popup_shown_twice', 'true')
    } else {
      // Treat dismissal as acknowledged for now, transition to 3-minute reminder
      sessionStorage.setItem('wp_popup_joined', 'true')
    }
    setIsOpen(false)
  }

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-200 overflow-hidden text-center flex flex-col items-center gap-5 transform scale-100 transition-all">
        
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-rose-100 text-gray-500 hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer"
          title="Close message"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Animated Accent Background Circles */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* WhatsApp Icon Badge */}
        <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-[#25D366] to-emerald-700 flex items-center justify-center text-white shadow-lg animate-bounce-subtle">
          <MessageCircle className="w-9 h-9 fill-current" />
        </div>

        <div className="relative z-10 space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-extrabold text-[11px] uppercase tracking-wider border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" /> Live Community Alert
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight">
            Join Engineer Yasin Official Group!
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed pt-1">
            Don&apos;t miss out! Get instant updates on <strong>FREE Past Papers, ISSB Guidance, Solved Notes, and Preparation Tools</strong> directly on your WhatsApp!
          </p>
        </div>

        {/* Feature Tags */}
        <div className="relative z-10 grid grid-cols-2 gap-2 w-full text-left text-[11px] font-bold text-gray-700 bg-gray-50 p-3 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" /> Free Test Series
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-blue-500 shrink-0" /> ISSB Discussion
          </div>
          <div className="flex items-center gap-1.5">
            <Bell className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Daily MCQ Notes
          </div>
          <div className="flex items-center gap-1.5">
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366] shrink-0" /> Direct Support
          </div>
        </div>

        {/* Buttons */}
        <div className="relative z-10 flex flex-col gap-2.5 w-full pt-1">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleJoinClick}
            className="w-full py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-sm shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider active:scale-[0.98]"
          >
            <MessageCircle className="w-5 h-5 fill-current shrink-0" /> Join WhatsApp Group Now
          </a>

          <button
            onClick={handleDismiss}
            className="w-full py-2.5 px-4 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 font-extrabold text-xs transition-colors uppercase tracking-wider"
          >
            Maybe Later / Close ✕
          </button>
        </div>

      </div>
    </div>
  )
}
