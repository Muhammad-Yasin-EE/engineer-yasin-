'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import SocialFloatingBar from './SocialFloatingBar'
import WhatsappPopup from './WhatsappPopup'

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
      <SocialFloatingBar />
      <WhatsappPopup />
    </>
  )
}
