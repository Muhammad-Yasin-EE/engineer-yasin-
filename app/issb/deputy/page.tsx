"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AuthGateButton from '@/components/AuthGateButton';
import { ArrowLeft, Award, UserCheck } from 'lucide-react';

export default function DeputyHubPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24 selection:bg-[#B8212E] selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 max-w-4xl">
          <Link href="/issb" className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Return to ISSB Hub
          </Link>
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-emerald-600 block">
            Day 3 & 4 Assessment
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight uppercase">
            Deputy <span className="text-[#B8212E]">President</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium leading-relaxed max-w-3xl">
            The Deputy President Interview is the final one-on-one psychological oral examination. Assessors test your emotional maturity, truthfulness, defense awareness, and stress resistance through cross-questioning based on your Bio-Data.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { title: "Personal Information Form (PIF)", category: "DP Assessment", desc: "Flawless bio-data sheet preparation to ensure absolute zero contradictions with Psychologist and GTO observation records.", icon: UserCheck, isReady: true, href: "/issb/pif", bg: "bg-emerald-50/60 border-emerald-200/80 hover:border-emerald-500", tag: "bg-emerald-100 text-emerald-800", iconStyle: "bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600" },
            { title: "Deputy President (DP) Interview", category: "DP Assessment", desc: "Real interactive question banks on family bio-data, defense technology, border lengths, current affairs, and stress handling.", icon: Award, isReady: true, href: "/issb/dp-interview", bg: "bg-indigo-50/60 border-indigo-200/80 hover:border-indigo-500", tag: "bg-indigo-100 text-indigo-800", iconStyle: "bg-indigo-100 text-indigo-700 group-hover:bg-indigo-600" }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className={`border rounded-3xl p-5 lg:p-6 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between group h-full ${item.bg || 'bg-white border-gray-200 hover:border-emerald-500'}`}>
                <div>
                  <div className="flex items-center justify-between gap-1.5 mb-4">
                    <span className={`px-2.5 py-1 rounded font-black text-[10px] uppercase tracking-wider truncate ${item.tag || 'bg-slate-100 text-slate-700'}`}>
                      {item.category}
                    </span>
                    {item.isReady ? (
                      <span className="text-[10px] font-black text-emerald-700 bg-white/90 border border-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0 shadow-sm">
                        ⚡ ACTIVE
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold text-gray-400 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full shrink-0">
                        SOON
                      </span>
                    )}
                  </div>
                  
                  {/* @ts-ignore */}
                  {item.image && (
                    <div className="relative w-full h-40 sm:h-44 rounded-2xl overflow-hidden mb-4 border border-white/80 shadow-sm bg-slate-950 group-hover:scale-[1.02] transition-transform duration-300">
                      <Image
                        // @ts-ignore
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  
                  {/* @ts-ignore */}
                  {!item.image && (
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border border-white/60 shadow-sm transition-colors duration-200 ${item.iconStyle || 'bg-emerald-50/80 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white'}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  )}

                  <h3 className="text-base lg:text-lg font-black text-gray-900 group-hover:text-black transition-colors mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-6 font-medium line-clamp-3">
                    {item.desc}
                  </p>
                </div>
                
                {item.isReady ? (
                  <AuthGateButton
                    href={item.href || '#'}
                    className="w-full py-3 px-4 rounded-2xl bg-[#B8212E] hover:bg-[#961a25] active:scale-95 text-white font-black text-xs flex items-center justify-center gap-2 transition-all duration-150 uppercase tracking-wider shadow-md hover:shadow-rose-900/30 shrink-0"
                  >
                    🚀 Start Practice Now ➔
                  </AuthGateButton>
                ) : (
                  <div className="w-full py-3 px-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-400 font-extrabold text-[11px] flex items-center justify-center gap-1.5 uppercase tracking-wider cursor-not-allowed select-none shrink-0">
                    ⏳ Prep Module Coming Soon
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
