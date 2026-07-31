"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AuthGateButton from '@/components/AuthGateButton';
import { ArrowLeft, Users, Target, Award } from 'lucide-react';

export default function GTOHubPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24 selection:bg-[#B8212E] selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 max-w-4xl">
          <Link href="/issb" className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Return to ISSB Hub
          </Link>
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-emerald-600 block">
            Days 2 & 3 Assessment
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight uppercase">
            Group Testing <span className="text-[#B8212E]">Officer</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium leading-relaxed max-w-3xl">
            The GTO tasks evaluate your leadership, mechanical aptitude, unselfishness, and ability to work dynamically within a team under physical and mental constraints.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { title: "Group Discussion (GD) Topics", category: "GTO Indoor Task", desc: "Exhaustive searchable repository of 92 official leaderless GD and 3-minute lecturate topics from recent ISSB batches.", icon: Users, isReady: true, href: "/issb/gd-topics", bg: "bg-cyan-50/60 border-cyan-200/80 hover:border-cyan-500", tag: "bg-cyan-100 text-cyan-800", iconStyle: "bg-cyan-100 text-cyan-700 group-hover:bg-cyan-600", image: "/images/gd-ai.jpg" },
            { title: "Group Planning Exercise (GPE)", category: "GTO Indoor Task", desc: "Tactical military ground maps with practical 4-step crisis prioritization and operational resource delegation models.", icon: Target, isReady: true, href: "/issb/gpe", bg: "bg-orange-50/60 border-orange-200/80 hover:border-orange-500", tag: "bg-orange-100 text-orange-800", iconStyle: "bg-orange-100 text-orange-700 group-hover:bg-orange-600", image: "/images/gto/gpe.jpg" },
            { title: "Progressive Group Task (PGT)", category: "GTO Outdoor Task", desc: "Complete GTO Ground Rules guide (Colour, Rigidity, Infinity, Distance rules) with helping timber bridging tactics.", icon: Users, isReady: true, href: "/issb/pgt", bg: "bg-emerald-50/60 border-emerald-200/80 hover:border-emerald-500", tag: "bg-emerald-100 text-emerald-800", iconStyle: "bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600", image: "/images/gto/pgt.jpg" },
            { title: "Half Group Task (HGT Strategy)", category: "GTO Outdoor Task", desc: "Sub-group execution strategies where smaller squad strength allows GTO to evaluate individual initiative and mechanical sense.", icon: Users, isReady: true, href: "/issb/hgt", bg: "bg-blue-50/60 border-blue-200/80 hover:border-blue-500", tag: "bg-blue-100 text-blue-800", iconStyle: "bg-blue-100 text-blue-700 group-hover:bg-blue-600", image: "/images/gto/hgt.jpg" },
            { title: "Command Task (CT Leadership)", category: "GTO Outdoor Task", desc: "Commander leadership execution, subordinate briefing protocols, active supervision, and handling GTO stress alterations.", icon: Award, isReady: true, href: "/issb/ct", bg: "bg-amber-50/60 border-amber-200/80 hover:border-amber-500", tag: "bg-amber-100 text-amber-900", iconStyle: "bg-amber-100 text-amber-700 group-hover:bg-amber-600", image: "/images/gto/ct.jpg" },
            { title: "Individual Obstacles (IO) Course", category: "GTO Outdoor Task", desc: "Biomechanical techniques and stamina pacing for all 10 obstacles (55 marks) including ditch jump, tarzan swing, and tiger leap.", icon: Target, isReady: true, href: "/issb/obstacles", bg: "bg-violet-50/60 border-violet-200/80 hover:border-violet-500", tag: "bg-violet-100 text-violet-800", iconStyle: "bg-violet-100 text-violet-700 group-hover:bg-violet-600", image: "/images/gto/obstacles.jpg" },
            { title: "Group Obstacle Race (Snake Race)", category: "GTO Outdoor Task", desc: "High-energy teamwork race strategies, vigorous military war cries, python tent contact rules, and peer supporting protocol.", icon: Users, isReady: true, href: "/issb/snake-race", bg: "bg-rose-50/60 border-rose-200/80 hover:border-rose-500", tag: "bg-rose-100 text-rose-800", iconStyle: "bg-rose-100 text-rose-700 group-hover:bg-rose-600", image: "/images/gto/snake_race.jpg" },
            { title: "Final Group Task (FGT)", category: "GTO Outdoor Task", desc: "Closing collaborative field test combining all squad members to verify sustained physical resilience and unselfish cooperation.", icon: Users, isReady: true, href: "/issb/fgt", bg: "bg-teal-50/60 border-teal-200/80 hover:border-teal-500", tag: "bg-teal-100 text-teal-800", iconStyle: "bg-teal-100 text-teal-700 group-hover:bg-teal-600", image: "/images/gto/fgt.jpg" }
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
                  
                  {item.image && (
                    <div className="relative w-full h-40 sm:h-44 rounded-2xl overflow-hidden mb-4 border border-white/80 shadow-sm bg-slate-950 group-hover:scale-[1.02] transition-transform duration-300">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  
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
