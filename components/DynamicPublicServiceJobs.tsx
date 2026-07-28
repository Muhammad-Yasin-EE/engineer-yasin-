'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ExternalLink, Briefcase, Sparkles, Calendar } from 'lucide-react'

interface DynamicPublicServiceJobsProps {
  commissionSlug: string // 'bpsc', 'fpsc', 'ppsc', 'spsc', 'kppsc', 'ajkpsc', 'gbpsc'
}

export default function DynamicPublicServiceJobs({ commissionSlug }: DynamicPublicServiceJobsProps) {
  const [jobs, setJobs] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/admin/portal-manager')
      .then(res => res.json())
      .then(data => {
        if (data && data.customItems) {
          const matchingJobs = data.customItems.filter(
            (i: any) => i.type === 'job' && (i.category.toLowerCase() === commissionSlug.toLowerCase() || i.category.toLowerCase() === 'all')
          )
          setJobs(matchingJobs)
        }
      })
      .catch(err => console.error('Error loading dynamic PSC jobs:', err))
  }, [commissionSlug])

  if (jobs.length === 0) return null

  return (
    <div className="space-y-6 my-8 p-6 sm:p-8 bg-slate-50 border-2 border-slate-200 rounded-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-gray-200 pb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/20 text-cyan-800 border border-cyan-300 text-[10px] font-black uppercase tracking-widest mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" /> ⚡ ACTIVE ADMIN VERIFIED JOB POSTINGS
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#0A192F] uppercase tracking-tight">
            LATEST RECRUITMENT CIRCULARS ({commissionSlug.toUpperCase()})
          </h3>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Verified online apply portals, age limit rules and syllabus attachments uploaded via Admin Manager
          </p>
        </div>
        <span className="px-3.5 py-1.5 bg-[#0A192F] text-amber-400 rounded-xl text-xs font-black uppercase tracking-wider self-start sm:self-auto shadow">
          {jobs.length} Active Posts
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((item) => (
          <div
            key={item.id}
            className="bg-white text-gray-800 rounded-2xl shadow-xl border-2 border-gray-200 hover:border-[#B8212E] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="relative h-44 w-full bg-slate-100 overflow-hidden border-b border-gray-200">
              <Image src={item.imageUrl || `/images/card-${commissionSlug}.jpg`} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-2 left-2 z-10">
                <span className="text-[10px] font-black uppercase tracking-widest text-white bg-[#0A192F]/90 px-3 py-1 rounded-full shadow border border-white/20">
                  {item.category.toUpperCase()} OFFICIAL POST
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4 flex flex-col flex-grow justify-between">
              <div className="space-y-3">
                <h4 className="text-lg font-black text-[#0A192F] uppercase tracking-tight leading-snug group-hover:text-[#B8212E] transition-colors">
                  {item.title}
                </h4>

                <div className="text-xs font-extrabold text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-300">
                  💎 {item.badgeOrFunding}
                </div>

                <p className="text-xs text-gray-600 font-medium leading-relaxed">
                  {item.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-gray-150">
                  <div className="bg-slate-50 p-2 rounded-xl">
                    <span className="text-gray-500 block">Opening:</span>
                    <strong className="text-slate-900 font-extrabold block mt-0.5">{item.openingDate || 'Active'}</strong>
                  </div>
                  <div className="bg-rose-50 p-2 rounded-xl border border-rose-200">
                    <span className="text-rose-600 block">Deadline:</span>
                    <strong className="text-rose-800 font-extrabold block mt-0.5">{item.closingDate || 'See Portal'}</strong>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-200">
                <a
                  href={item.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#0A192F] hover:bg-slate-800 text-amber-400 font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all text-center group-hover:bg-[#B8212E] group-hover:text-white"
                >
                  OFFICIAL APPLY PORTAL &amp; AD <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
