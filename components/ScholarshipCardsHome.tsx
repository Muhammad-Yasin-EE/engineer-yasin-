'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Sparkles, GraduationCap, Globe, MapPin, Award, MessageCircle } from 'lucide-react'

export default function ScholarshipCardsHome() {
  const cards = [
    {
      id: 'international',
      title: 'INTERNATIONAL SCHOLARSHIPS (STUDY ABROAD)',
      badge: '🌐 80+ FULLY FUNDED ABROAD',
      desc: 'Complete authentic details of Chevening UK, Fulbright USA, DAAD Germany EPOS, Turkiye Burslari, MEXT Japan, Erasmus Mundus, HEC Foreign nominations and women study grants.',
      cardBgUrl: '/images/card-paf-education.jpg',
      href: '/scholarship/international',
      icon: Globe,
      tagColor: 'bg-cyan-600 text-white'
    },
    {
      id: 'national',
      title: 'NATIONAL SCHOLARSHIPS (MERIT & UNIVERSITY AID)',
      badge: '🇵🇰 PAKISTANI UNIVERSITIES AID',
      desc: 'Explore comprehensive financial assistance, up to 100% merit tuition waivers at LUMS, NUST, IBA, UMT, UCP, FAST, religious minority grants and required hardship documents checklist.',
      cardBgUrl: '/images/card-tcc.jpg',
      href: '/scholarship/national',
      icon: MapPin,
      tagColor: 'bg-amber-600 text-white'
    },
    {
      id: 'intermediate',
      title: 'INTERMEDIATE & FSC SCHOLARSHIPS (COLLEGES)',
      badge: '🎓 MATRIC & FSC MERIT SCHEMES',
      desc: 'Dedicated educational scholarships, talent awards and fee waivers for Matric, FA, FSc, Intermediate students, Cadet Colleges and national pre-university merit programs.',
      cardBgUrl: '/images/card-scholarship-prep.jpg',
      href: '/scholarship/intermediate',
      icon: Award,
      tagColor: 'bg-emerald-600 text-white'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow flex flex-col gap-10 bg-white text-gray-800">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-extrabold text-gray-500 hover:text-[#B8212E] w-fit transition-colors uppercase tracking-wider">
        <ArrowLeft className="w-4 h-4" /> Back to Home Portal
      </Link>

      {/* ── HERO HEADER BANNER ─────────────────────────────────────────── */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-gray-200 min-h-[280px] sm:min-h-[340px] flex items-center justify-center">
        <div className="absolute inset-0 bg-[#0A192F]/85 z-10 mix-blend-multiply" />
        <Image 
          src="/images/public-service-header.jpg" 
          alt="National and International Scholarships Portal" 
          fill 
          priority 
          className="absolute inset-0 object-cover object-center" 
        />
        <div className="relative z-20 flex flex-col items-center text-center p-8 sm:p-14 text-white w-full max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[11px] font-black uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" /> OFFICIAL MONETIZED SCHOLARSHIP PORTAL 2026–2027
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 drop-shadow-lg text-white uppercase leading-none">
            SCHOLARSHIPS DIRECTORY
          </h1>
          <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium text-gray-200 drop-shadow-md">
            Choose your academic category below to view distinct verified scholarship cards, exact application deadlines, eligibility criteria, required documents, and official application portals.
          </p>
        </div>
      </div>

      {/* ── THREE MASTER SCHOLARSHIP CARDS (LIGHT COLOR & BRIGHT PICTURES) ── */}
      <div className="space-y-8 mt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b-2 border-gray-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 shrink-0 bg-[#0A192F] text-amber-400 rounded-2xl flex items-center justify-center shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A192F] uppercase tracking-wide">
                SELECT SCHOLARSHIP CATEGORY
              </h2>
              <p className="text-xs font-extrabold text-gray-500 uppercase tracking-widest">
                National, International &amp; Intermediate Scholarship Portals
              </p>
            </div>
          </div>
          <span className="px-3.5 py-1 bg-slate-100 border border-slate-200 rounded-xl text-xs font-black text-slate-700 uppercase self-start sm:self-auto">
            3 Main Portals
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => {
            const IconComponent = card.icon
            return (
              <div
                key={card.id}
                className="group border-2 border-gray-200 rounded-3xl hover:border-[#B8212E] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden bg-white shadow-xl hover:-translate-y-1.5"
              >
                {/* Top Bright Unobscured Image Section */}
                <div className="relative h-[240px] sm:h-[260px] w-full overflow-hidden bg-slate-100 border-b border-gray-200">
                  <Image 
                    src={card.cardBgUrl} 
                    alt={card.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 400px" 
                    className="object-cover absolute inset-0 z-0 group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 pointer-events-none" />
                  
                  {/* Floating Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md ${card.tagColor}`}>
                      {card.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md text-[#0A192F] flex items-center justify-center shadow-lg font-bold">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                
                {/* Light Colored Body Section */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow bg-white space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl font-black text-[#0A192F] uppercase tracking-tight group-hover:text-[#B8212E] transition-colors leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium line-clamp-4 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-150 flex flex-col gap-3">
                    <Link
                      href={card.href}
                      className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0A192F] font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-transform group-hover:scale-102 text-center"
                    >
                      EXPLORE SCHOLARSHIPS &amp; DEADLINES <ArrowRight className="w-4 h-4 text-[#0A192F]" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── COMMUNITY & MONETIZATION FOOTER BOX ───────────────────────── */}
      <div className="bg-[#0A192F] rounded-3xl p-8 sm:p-10 text-white text-center sm:text-left flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-gray-800 mt-4">
        <div className="space-y-2 max-w-2xl">
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-[10px] font-black uppercase tracking-widest">
            🟢 LIVE WHATSAPP JOB &amp; SCHOLARSHIP ALERT NETWORK
          </span>
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-2">
            STAY UPDATED WITH REAL-TIME ANNOUNCEMENTS
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">
            Join thousands of active candidates in our official verified student community to receive daily job circulars, foreign scholarship application guides, and HEC HAT practice mock tests!
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3.5 shrink-0 w-full sm:w-auto">
          <a
            href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#25D366] hover:bg-[#1EBE5B] text-[#0A192F] font-black rounded-2xl shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
          >
            <MessageCircle className="w-5 h-5 fill-current" /> JOIN WHATSAPP ALERT GROUP &rarr;
          </a>
        </div>
      </div>
    </div>
  )
}
