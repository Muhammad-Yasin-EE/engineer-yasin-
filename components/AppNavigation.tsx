'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import { MessageCircle, Send } from 'lucide-react'

export function AppHeader() {
  const pathname = usePathname()
  const isFullscreen = pathname === '/issb/ai-interview' || pathname === '/flashcards'

  if (isFullscreen) return null

  return <Navbar />
}

export function AppFooter() {
  const pathname = usePathname()
  const isFullscreen = pathname === '/issb/ai-interview' || pathname === '/flashcards'

  if (isFullscreen) return null

  return (
    <>
      <Footer />

      {/* Modern Unified WhatsApp & Community Floating Button (Bottom Right) */}
      <aside 
        aria-label="Community & Support Help"
        className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group"
      >
        <a
          href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-4 py-3 rounded-full shadow-2xl hover:shadow-emerald-600/30 hover:scale-105 transition-all duration-300 border-2 border-white"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span className="hidden sm:inline">Join WhatsApp Group</span>
        </a>
      </aside>
    </>
  )
}
