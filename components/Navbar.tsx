'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState, useRef } from 'react'
import { useCart } from '@/lib/context/CartContext'
import { createClient } from '@/lib/supabase/client'
import { 
  BookOpen, ShoppingCart, User, ShieldAlert, LogOut, Search, Menu, X, 
  ChevronDown, FileText, Clock, Newspaper, Sparkles, BookMarked, Globe, Award
} from 'lucide-react'

export default function Navbar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { cart } = useCart()
  const supabase = createClient()
  
  const [session, setSession] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [customPages, setCustomPages] = useState<any[]>([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Search Autocomplete Suggestion States
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Dropdown States
  const [activeDropdown, setActiveDropdown] = useState<'prep' | 'resources' | 'books' | 'blog' | 'army' | 'navy' | 'paf' | 'issb' | null>(null)

  useEffect(() => {
    // 1. Fetch Auth Session & Admin Level Checks
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
    
    // 2. Fetch Dynamic informational pages
    const fetchCustomPages = async () => {
      const { data } = await supabase
        .from('custom_pages')
        .select('slug, title')
        .order('title', { ascending: true })
      setCustomPages(data || [])
    }

    // Ensure clean light mode
    document.documentElement.classList.remove('dark')
    localStorage.removeItem('theme')

    checkAuth()
    fetchCustomPages()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session?.user) {
        supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', session.user.id)
          .single()
          .then(({ data }) => setIsAdmin(data?.is_admin || false))
      } else {
        setIsAdmin(false)
      }
    })

    // Outside clicks listener for suggestions
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
  }, [])

  // Instant Search Autocomplete Suggestion Fetcher (with basic debounce)
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      const query = searchQuery.trim()
      if (query.length < 2) {
        setSuggestions([])
        return
      }

      setLoadingSuggestions(true)
      try {
        const { data } = await supabase
          .from('items')
          .select('id, title, resource_type')
          .ilike('title', `%${query}%`)
          .limit(5)
        setSuggestions(data || [])
      } catch (err) {
        console.error('Fetch autocomplete suggestions error:', err)
      } finally {
        setLoadingSuggestions(false)
      }
    }, 300) // 300ms debounce delay to optimize database calls

    return () => clearTimeout(delayDebounce)
  }, [searchQuery])

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
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-150 text-[#222222] shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-md overflow-hidden flex items-center justify-center border border-gray-200 shadow-sm group-hover:border-[#B8212E] transition-all bg-white">
                <img src="/logo.jpg" alt="Engineer Yasin Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-gray-900 uppercase">
                Eng <span className="text-[#B8212E]">Yasin</span>
              </span>
            </Link>
          </div>

          {/* Search bar with Autocomplete Suggestions */}
          <div ref={suggestionsRef} className="hidden md:block flex-grow max-w-xs relative">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onFocus={() => setShowSuggestions(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowSuggestions(true)
                }}
                className="w-full bg-gray-50 border border-gray-200 rounded-md py-1.5 pl-4 pr-10 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#B8212E] focus:ring-1 focus:ring-[#B8212E]/20 transition-all font-semibold"
              />
              <button type="submit" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#B8212E] transition-colors">
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Suggestions Overlay Dropdown */}
            {showSuggestions && searchQuery.trim().length >= 2 && (
              <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 shadow-xl rounded-none py-2 z-50 text-xs animate-scale-in">
                {loadingSuggestions ? (
                  <div className="px-4 py-2 text-gray-400 font-semibold">Searching database...</div>
                ) : suggestions.length === 0 ? (
                  <div className="px-4 py-2 text-gray-400 font-semibold">No results match query</div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {suggestions.map((item) => (
                      <Link
                        key={item.id}
                        href={`/items/${item.id}`}
                        onClick={() => {
                          setShowSuggestions(false)
                          setSearchQuery(item.title)
                        }}
                        className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-[#B8212E] font-bold truncate transition-colors"
                      >
                        <span className="inline-block text-[8px] uppercase tracking-wider font-extrabold text-[#B8212E] mr-1.5 border border-[#B8212E]/20 px-1 rounded-sm bg-[#B8212E]/5">
                          {item.resource_type}
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
          <div className="hidden lg:flex items-center gap-3.5 xl:gap-5 text-xs font-black">
            <Link href="/" prefetch={false} className="text-gray-700 hover:text-[#B8212E] transition-colors uppercase tracking-wider">
              Home
            </Link>

            {/* Direct Links without dropdowns as requested */}
            <Link href="/army" prefetch={false} className="text-gray-700 hover:text-[#B8212E] transition-colors uppercase tracking-wider">
              Join Army
            </Link>
            <Link href="/navy" prefetch={false} className="text-gray-700 hover:text-[#B8212E] transition-colors uppercase tracking-wider">
              Join Navy
            </Link>
            <Link href="/paf" prefetch={false} className="text-gray-700 hover:text-[#B8212E] transition-colors uppercase tracking-wider">
              Join PAF
            </Link>

            {/* ISSB Dropdown */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setActiveDropdown('issb')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href="/issb" prefetch={false} className="text-gray-700 hover:text-[#B8212E] flex items-center gap-0.5 uppercase tracking-wider transition-colors font-extrabold">
                ISSB
                <ChevronDown className="w-3 h-3" />
              </Link>
              {activeDropdown === 'issb' && (
                <div className="absolute left-0 mt-0 w-60 bg-white border border-gray-150 shadow-xl py-2 z-50 animate-scale-in">
                  <Link href="/issb" prefetch={false} className="block px-4 py-2 hover:bg-rose-50 hover:text-[#B8212E] font-bold transition-colors">ISSB Information</Link>
                  <Link href="/issb" prefetch={false} className="block px-4 py-2 hover:bg-rose-50 hover:text-[#B8212E] font-bold transition-colors">Free ISSB Prep</Link>
                  <Link href="/issb/coaching" prefetch={false} className="block px-4 py-2 hover:bg-rose-50 hover:text-[#B8212E] font-bold transition-colors">ISSB Coaching &amp; Training</Link>
                </div>
              )}
            </div>

            <Link href="/scholarships" prefetch={false} className="text-gray-700 hover:text-[#B8212E] transition-colors uppercase tracking-wider">
              Scholarships
            </Link>
            <Link href="/quizzes" prefetch={false} className="text-gray-700 hover:text-[#B8212E] transition-colors uppercase tracking-wider">
              Quizzes
            </Link>
            <Link href="/ebooks" prefetch={false} className="text-gray-700 hover:text-[#B8212E] transition-colors uppercase tracking-wider">
              E-Books
            </Link>
            <Link href="/videos" prefetch={false} className="text-gray-700 hover:text-[#B8212E] transition-colors uppercase tracking-wider">
              Videos
            </Link>
            <Link href="/jobs" prefetch={false} className="text-gray-700 hover:text-[#B8212E] transition-colors uppercase tracking-wider">
              Jobs
            </Link>

            {/* Blogs Dropdown */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setActiveDropdown('blog')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href="/blog" prefetch={false} className="text-gray-700 hover:text-[#B8212E] flex items-center gap-0.5 uppercase tracking-wider transition-colors">
                Blogs
                <ChevronDown className="w-3 h-3" />
              </Link>
              {activeDropdown === 'blog' && (
                <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-150 shadow-xl py-2 z-50 animate-scale-in">
                  <Link href="/blog" prefetch={false} className="block px-4 py-2 hover:bg-gray-50 hover:text-[#B8212E] transition-colors">Latest Forces Blogs</Link>
                  {customPages.map(page => (
                    <Link
                      key={page.slug}
                      href={`/p/${page.slug}`}
                      prefetch={false}
                      className="block px-4 py-2 hover:bg-gray-50 hover:text-[#B8212E] transition-colors"
                    >
                      {page.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {isAdmin && (
              <Link href="/admin" className="flex items-center gap-1 text-xs font-black text-amber-600 hover:text-amber-500 uppercase tracking-wider transition-colors">
                <ShieldAlert className="w-3.5 h-3.5" />
                Admin
              </Link>
            )}

          </div>

          {/* User Controls and Widgets (Right) */}
          <div className="flex items-center gap-3">
            
            {/* Cart Widget */}
            <Link href="/cart" className="relative p-2 rounded-md border border-gray-200 text-gray-500 hover:text-[#B8212E] hover:border-[#B8212E]/30 transition-all flex items-center bg-white">
              <ShoppingCart className="w-4 h-4" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B8212E] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Auth Button */}
            {session ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/account"
                  className="hidden sm:flex items-center gap-1 px-4.5 py-1.5 rounded-md border border-gray-200 hover:border-[#B8212E] text-xs font-bold text-gray-600 hover:text-[#B8212E] shadow-sm transition-all bg-white"
                >
                  <User className="w-3.5 h-3.5" />
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="p-2 rounded-md border border-gray-200 text-gray-500 hover:text-[#B8212E] hover:border-[#B8212E]/30 transition-all cursor-pointer bg-white"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:flex px-4.5 py-1.5 bg-[#B8212E] hover:bg-[#A31C28] text-white text-xs font-bold rounded-md shadow-sm transition-all items-center gap-1 uppercase tracking-wider"
              >
                <User className="w-3.5 h-3.5" />
                Sign In
              </Link>
            )}

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md border border-gray-200 text-gray-500 hover:text-[#B8212E] focus:outline-none bg-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-150 bg-white px-4 pt-4 pb-6 space-y-4 shadow-inner">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Search website..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-md py-2.5 pl-4 pr-10 text-sm text-gray-800 focus:outline-none focus:border-[#B8212E] font-semibold"
            />
            <button type="submit" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Quick settings row at the top of the menu */}
          <div className="flex items-center justify-between gap-3 border-b border-gray-150 pb-4">
            {session ? (
              <div className="flex gap-2 w-full justify-between">
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  prefetch={false}
                  className="px-4 py-2 rounded-md border border-gray-200 text-xs font-bold text-gray-700 bg-white text-center flex-grow"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleSignOut()
                    setMobileMenuOpen(false)
                  }}
                  className="px-4 py-2 rounded-md border border-gray-200 text-xs font-bold text-gray-500 cursor-pointer bg-white text-center flex-grow"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                prefetch={false}
                className="px-6 py-2 bg-[#B8212E] text-white text-xs font-bold rounded-md uppercase tracking-wider text-center w-full"
              >
                Sign In
              </Link>
            )}
          </div>

          <div className="flex flex-col gap-2 text-xs font-black text-gray-700 uppercase tracking-wide">
            <div className="text-[9px] uppercase tracking-wider text-gray-400 font-extrabold pb-0.5 border-b border-gray-100 mb-1">Navigation</div>

            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#B8212E] py-2 border-b border-gray-100 block font-black">
              Home
            </Link>
            
            <Link href="/army" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#B8212E] py-2 border-b border-gray-100 block font-black">
              Join Army
            </Link>

            <Link href="/navy" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#B8212E] py-2 border-b border-gray-100 block font-black">
              Join Navy
            </Link>

            <Link href="/paf" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#B8212E] py-2 border-b border-gray-100 block font-black">
              Join PAF
            </Link>

            <details className="group border-b border-gray-100 pb-2">
              <summary className="flex items-center justify-between py-1.5 cursor-pointer text-gray-700 hover:text-[#B8212E] select-none list-none [&::-webkit-details-marker]:hidden font-black">
                <span>ISSB</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#B8212E] group-open:rotate-180 transition-transform" />
              </summary>
              <div className="pl-4 flex flex-col gap-2 mt-1 pb-1 font-bold text-gray-500 capitalize">
                <Link href="/issb" onClick={() => setMobileMenuOpen(false)}>ISSB Information</Link>
                <Link href="/issb" onClick={() => setMobileMenuOpen(false)}>Free ISSB Prep</Link>
                <Link href="/issb/coaching" onClick={() => setMobileMenuOpen(false)}>ISSB Coaching &amp; Training</Link>
              </div>
            </details>

            <Link href="/scholarships" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#B8212E] py-2 border-b border-gray-100 block">
              Scholarships
            </Link>
            <Link href="/quizzes" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#B8212E] py-2 border-b border-gray-100 block">
              Quizzes
            </Link>
            <Link href="/ebooks" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#B8212E] py-2 border-b border-gray-100 block">
              E-Books
            </Link>
            <Link href="/videos" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#B8212E] py-2 border-b border-gray-100 block">
              Videos
            </Link>
            <Link href="/jobs" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#B8212E] py-2 border-b border-gray-100 block">
              Jobs
            </Link>
            <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#B8212E] py-2 block">
              Blogs
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
