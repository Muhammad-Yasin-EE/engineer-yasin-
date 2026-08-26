'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { 
  Search, Menu, X, ChevronDown, User, LogOut, Shield, Award, 
  BookOpen, Sparkles, LogIn, Briefcase, GraduationCap, FileText, Lock
} from 'lucide-react'

export default function Navbar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  
  const [session, setSession] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Search state
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Active Dropdown
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession()
      setSession(currentSession)
      
      if (currentSession?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', currentSession.user.id)
          .single()
        setIsAdmin(profile?.is_admin || false)
      }
    }
    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      if (newSession?.user) {
        supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', newSession.user.id)
          .single()
          .then(({ data }) => setIsAdmin(data?.is_admin || false))
      } else {
        setIsAdmin(false)
      }
    })

    const handleOutsideClick = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      subscription.unsubscribe()
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [supabase])

  // Search debounce
  useEffect(() => {
    const timer = setTimeout(async () => {
      const query = searchQuery.trim()
      if (query.length < 2) {
        setSuggestions([])
        return
      }
      setLoadingSuggestions(true)
      try {
        const { data } = await supabase
          .from('quizzes')
          .select('id, title, category')
          .ilike('title', `%${query}%`)
          .limit(5)
        setSuggestions(data || [])
      } catch (err) {
        console.error('Search error:', err)
      } finally {
        setLoadingSuggestions(false)
      }
    }, 250)
    return () => clearTimeout(timer)
  }, [searchQuery, supabase])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuggestions(false)
    if (searchQuery.trim()) {
      router.push(`/quizzes?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <nav className="sticky top-0 z-50 glass-nav border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center border border-slate-200 shadow-sm group-hover:border-[#B8212E] transition-all bg-white">
              <img src="/logo.jpg" alt="Engineer Yasin Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-base sm:text-lg tracking-tight text-slate-900 leading-none">
                Engineer <span className="text-[#B8212E]">Yasin</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-extrabold mt-0.5">
                Official Portal
              </span>
            </div>
          </Link>

          {/* Search Input (Desktop) */}
          <div ref={suggestionsRef} className="hidden md:block flex-grow max-w-xs lg:max-w-sm relative">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search PMA, GD Pilot, PN Cadet, Tests..."
                value={searchQuery}
                onFocus={() => setShowSuggestions(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-full py-2 pl-4 pr-10 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#B8212E] focus:ring-2 focus:ring-[#B8212E]/10 transition-all"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#B8212E] transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Autocomplete Dropdown */}
            {showSuggestions && searchQuery.trim().length >= 2 && (
              <div className="absolute left-0 right-0 mt-2 bg-white border border-slate-200 shadow-2xl rounded-2xl py-2 z-50 text-xs animate-fadeIn overflow-hidden">
                {loadingSuggestions ? (
                  <div className="px-4 py-2 text-slate-400 font-medium">Searching selection test bank...</div>
                ) : suggestions.length === 0 ? (
                  <div className="px-4 py-2 text-slate-400 font-medium">No tests found for "{searchQuery}"</div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {suggestions.map((item) => (
                      <Link
                        key={item.id}
                        href={`/prep/quiz/${item.id}`}
                        onClick={() => setShowSuggestions(false)}
                        className="block px-4 py-2.5 hover:bg-rose-50 text-slate-700 hover:text-[#B8212E] font-bold transition-colors"
                      >
                        <span className="inline-block text-[9px] uppercase tracking-wider font-extrabold text-[#B8212E] mr-2 bg-rose-100/60 px-1.5 py-0.5 rounded">
                          {item.category || 'Test'}
                        </span>
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-bold text-slate-700">
            <Link href="/" className="px-3 py-2 rounded-lg hover:text-[#B8212E] hover:bg-slate-100/60 transition-colors">
              Home
            </Link>

            {/* Forces Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('forces')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-[#B8212E] hover:bg-slate-100/60 transition-colors cursor-pointer">
                <span>Forces Prep</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>
              {activeDropdown === 'forces' && (
                <div className="absolute top-full left-0 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-fadeIn">
                  <Link href="/prep/army" className="block px-4 py-2 hover:bg-rose-50 hover:text-[#B8212E] transition-colors">
                    Pak Army (PMA, TCC, LCC)
                  </Link>
                  <Link href="/prep/navy" className="block px-4 py-2 hover:bg-rose-50 hover:text-[#B8212E] transition-colors">
                    Pak Navy (PN Cadet, SSC)
                  </Link>
                  <Link href="/prep/paf" className="block px-4 py-2 hover:bg-rose-50 hover:text-[#B8212E] transition-colors">
                    Pak Air Force (GD Pilot, Aero)
                  </Link>
                  <div className="border-t border-slate-100 my-1" />
                  <Link href="/prep" className="block px-4 py-2 text-[#B8212E] font-black hover:bg-rose-50 transition-colors">
                    All Selection Tests →
                  </Link>
                </div>
              )}
            </div>

            {/* ISSB Master Suite Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('issb')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-[#B8212E] hover:bg-slate-100/60 transition-colors cursor-pointer">
                <span>ISSB Suite</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>
              {activeDropdown === 'issb' && (
                <div className="absolute top-full left-0 w-60 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-fadeIn">
                  <Link href="/issb" className="block px-4 py-2 hover:bg-rose-50 hover:text-[#B8212E] transition-colors">
                    ISSB Information & Guide
                  </Link>
                  <Link href="/issb/ai-interview" className="block px-4 py-2 hover:bg-rose-50 hover:text-[#B8212E] transition-colors">
                    AI Mock Interview Simulator
                  </Link>
                  <Link href="/issb/tat" className="block px-4 py-2 hover:bg-rose-50 hover:text-[#B8212E] transition-colors">
                    TAT Picture Story Writing
                  </Link>
                  <Link href="/issb/coaching" className="block px-4 py-2 text-[#B8212E] font-black hover:bg-rose-50 transition-colors">
                    ISSB Coaching Batches →
                  </Link>
                </div>
              )}
            </div>

            <Link href="/scholarships" className="px-3 py-2 rounded-lg hover:text-[#B8212E] hover:bg-slate-100/60 transition-colors">
              Scholarships
            </Link>

            <Link href="/ebooks" className="px-3 py-2 rounded-lg hover:text-[#B8212E] hover:bg-slate-100/60 transition-colors">
              E-Books
            </Link>

            <Link href="/jobs" className="px-3 py-2 rounded-lg hover:text-[#B8212E] hover:bg-slate-100/60 transition-colors">
              Jobs & Updates
            </Link>

            {isAdmin && (
              <Link href="/admin" className="px-3 py-2 rounded-lg text-amber-600 font-extrabold hover:bg-amber-50 transition-colors">
                Admin
              </Link>
            )}
          </div>

          {/* Right User Auth Controls */}
          <div className="flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-full border border-slate-300 hover:border-[#B8212E] text-xs font-bold text-slate-700 hover:text-[#B8212E] transition-all flex items-center gap-1.5 bg-white shadow-xs"
                >
                  <User className="w-3.5 h-3.5" /> Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="p-2 rounded-full border border-slate-300 text-slate-500 hover:text-rose-600 hover:border-rose-300 transition-all bg-white cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-5 py-2 bg-[#B8212E] hover:bg-[#961A25] text-white text-xs font-black rounded-full uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" /> Sign In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-[#B8212E] bg-white cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-6 space-y-4 shadow-2xl animate-fadeIn max-h-[85vh] overflow-y-auto">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Search tests, branches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border border-slate-200 rounded-xl py-2.5 pl-4 pr-10 text-xs font-semibold text-slate-800"
            />
            <button type="submit" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="w-4 h-4" />
            </button>
          </form>

          <div className="flex flex-col gap-1 text-sm font-bold text-slate-700 divide-y divide-slate-100">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="py-2.5 hover:text-[#B8212E]">
              Home
            </Link>
            <Link href="/prep/army" onClick={() => setMobileMenuOpen(false)} className="py-2.5 hover:text-[#B8212E] flex justify-between items-center">
              <span>Pak Army (PMA, TCC, LCC)</span>
              <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-extrabold">Active</span>
            </Link>
            <Link href="/prep/navy" onClick={() => setMobileMenuOpen(false)} className="py-2.5 hover:text-[#B8212E]">
              Pak Navy (PN Cadet, SSC)
            </Link>
            <Link href="/prep/paf" onClick={() => setMobileMenuOpen(false)} className="py-2.5 hover:text-[#B8212E]">
              Pak Air Force (GD Pilot, Aero)
            </Link>
            <Link href="/issb" onClick={() => setMobileMenuOpen(false)} className="py-2.5 hover:text-[#B8212E]">
              ISSB Preparation Suite
            </Link>
            <Link href="/scholarships" onClick={() => setMobileMenuOpen(false)} className="py-2.5 hover:text-[#B8212E]">
              Scholarships & Cadet Colleges
            </Link>
            <Link href="/ebooks" onClick={() => setMobileMenuOpen(false)} className="py-2.5 hover:text-[#B8212E]">
              E-Books & Solved Notes
            </Link>
            <Link href="/jobs" onClick={() => setMobileMenuOpen(false)} className="py-2.5 hover:text-[#B8212E]">
              Public Service Jobs (BPSC, FPSC)
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
