'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Award, ExternalLink, Sparkles, MessageCircle, BookOpen } from 'lucide-react'

export default function IntermediateScholarshipsPage() {
  const [customItems, setCustomItems] = useState<any[]>([])
  const [deletedIds, setDeletedIds] = useState<string[]>([])

  useEffect(() => {
    fetch('/api/admin/portal-manager')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setCustomItems((data.customItems || []).filter((i: any) => i.type === 'scholarship' && i.category === 'intermediate'))
          setDeletedIds(data.deletedIds || [])
        }
      })
      .catch(err => console.error('Error fetching dynamic admin intermediate scholarships:', err))
  }, [])

  const previewScholarships: any[] = []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow flex flex-col gap-10 bg-white text-gray-800">
      <Link href="/scholarship" className="inline-flex items-center gap-2 text-xs font-extrabold text-gray-500 hover:text-[#B8212E] w-fit transition-colors uppercase tracking-wider">
        <ArrowLeft className="w-4 h-4" /> Back to Scholarship Categories
      </Link>

      {/* ── HERO BANNER WITH IMAGE ─────────────────────────────────────── */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-gray-200 min-h-[280px] sm:min-h-[350px] flex items-center justify-center">
        <div className="absolute inset-0 bg-[#0A192F]/90 z-10 mix-blend-multiply" />
        <Image 
          src="/images/card-scholarship-prep.jpg" 
          alt="12th/FSc & Colleges Scholarships Portal Pakistan" 
          fill 
          priority 
          className="absolute inset-0 object-cover object-center" 
        />
        <div className="relative z-20 flex flex-col items-center text-center p-8 sm:p-14 text-white w-full max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 text-[11px] font-black uppercase tracking-widest mb-4 shadow-sm">
            <Award className="w-3.5 h-3.5" /> 🎓 MATRIC, FSC, ICS &amp; CADET COLLEGES MERIT SCHEMES
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 drop-shadow-lg text-white uppercase leading-none">
            12TH/FSC & COLLEGES SCHOLARSHIPS
          </h1>
          <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium text-gray-200 drop-shadow-md leading-relaxed">
            Discover premier national scholarships, tuition fee waivers, and monthly stipends for Matric, FA, FSc, and pre-university honors students across Pakistan.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <a
              href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#25D366] hover:bg-[#1EBE5B] text-[#0A192F] font-black text-xs sm:text-sm uppercase rounded-xl shadow-lg inline-flex items-center gap-2 transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5 fill-current" /> Join WhatsApp Scholarship Alerts &rarr;
            </a>
            <Link
              href="/quizzes"
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-[#0A192F] font-black text-xs sm:text-sm uppercase rounded-xl shadow-lg inline-flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5" /> Attempt Cadet &amp; College Entry Mock Quizzes
            </Link>
          </div>
        </div>
      </div>

      {/* ── SCHOLARSHIP CARDS GRID ────────────────────────────────────── */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-gray-200 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black uppercase text-[#0A192F] tracking-tight">
              ACTIVE INTERMEDIATE &amp; FSC SCHOLARSHIP CARDS
            </h2>
            <p className="text-xs font-extrabold text-gray-500 uppercase tracking-widest">
              Updated National Pre-University Academic Grants &amp; Tuition Aid
            </p>
          </div>
          <span className="px-3 py-1 bg-slate-100 text-[#0A192F] font-black text-xs rounded-xl border border-slate-300 self-start sm:self-auto">
            Verified Student Schemes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            ...customItems.map(c => ({
              id: c.id,
              name: c.title,
              board: c.organization || 'Pre-University Board & Commission',
              desc: c.description || 'Verified talent scholarship and tuition fee waiver scheme.',
              deadline: c.closingDate || 'See Official Portal',
              applyUrl: c.applyUrl,
              image: c.imageUrl || '/images/inter-peef-talent.jpg'
            })),
            ...previewScholarships.filter(item => !deletedIds.includes(item.id))
          ].map((item) => (
            <div
              key={item.id}
              className="bg-white text-gray-800 rounded-3xl shadow-xl border-2 border-gray-200 hover:border-[#B8212E] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1.5 group"
            >
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden border-b border-gray-200">
                <Image src={item.image || '/images/card-scholarship-prep.jpg'} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-3 left-3 z-10">
                  <span className="text-xs font-black uppercase tracking-widest text-white bg-emerald-600 px-3 py-1 rounded-full shadow">
                    Pre-University Grant
                  </span>
                </div>
                <div className="absolute bottom-2 right-3 z-20">
                  <span className="text-[10px] font-mono text-white bg-black/70 px-2 py-0.5 rounded">
                    FILE: {item.image.split('/').pop()}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4 flex flex-col flex-grow justify-between">
                <div className="space-y-3">
                  <h3 className="text-lg font-black text-[#0A192F] uppercase tracking-tight leading-snug group-hover:text-[#B8212E] transition-colors">
                    {item.name}
                  </h3>
                  
                  <div className="text-xs text-slate-700 font-bold bg-slate-50 p-2.5 rounded-xl border border-gray-200">
                    🏫 <strong>Board / Authority:</strong> {item.board}
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    {item.desc}
                  </p>

                  <div className="text-[11px] text-slate-700 bg-amber-50 p-2.5 rounded-xl border-l-4 border-emerald-500 font-bold">
                    📅 Application Window: {item.deadline}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-200 flex flex-col gap-3">
                  <a
                    href={item.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#0A192F] hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all text-center group-hover:bg-[#B8212E]"
                  >
                    OFFICIAL APPLY PORTAL <ExternalLink className="w-4 h-4 text-amber-400" />
                  </a>
                  <Link
                    href="/quizzes"
                    className="text-center text-[11px] font-black text-slate-600 hover:text-[#B8212E] transition-colors"
                  >
                    Attempt Entry Test MCQs &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MONETIZED AD CALLOUT BANNER ───────────────────────────────── */}
      <div className="bg-[#0A192F] text-white rounded-3xl p-8 sm:p-10 text-center flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-slate-800 mt-4">
        <div className="space-y-2 max-w-2xl text-left">
          <span className="text-[11px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full">
            🚀 MAXIMIZE YOUR FSC &amp; COLLEGE SCHOLARSHIP AWARDS
          </span>
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-2">
            JOIN VIP WHATSAPP ALERT COMMUNITY
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">
            Receive verified notification alerts the day PEEF, Workers Welfare Board, and Government scholarship portals open for FSc and Intermediate students!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3.5 shrink-0 w-full md:w-auto">
          <a
            href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#25D366] hover:bg-[#1EBE5B] text-[#0A192F] font-black rounded-2xl shadow-xl transition-transform hover:scale-105 flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
          >
            <MessageCircle className="w-5 h-5 fill-current" /> JOIN WHATSAPP ALERT GROUP &rarr;
          </a>
        </div>
      </div>
    </div>
  )
}
