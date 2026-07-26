'use client'

import React, { useState } from 'react'
import { Calendar, Shield, Target, Users, Award, CheckCircle2, Clock, MapPin, Sparkles, Brain, Compass, BookOpen, AlertCircle, MessageCircle } from 'lucide-react'

export default function IssbTimelineExplorer() {
  const [activeDay, setActiveDay] = useState<number>(0)

  const days = [
    {
      day: 'Day 1',
      title: 'Arrival & Psychological Screening Battery',
      center: 'Kohat • Gujranwala • Malir • Quetta',
      icon: Brain,
      color: 'from-blue-900 via-[#0C1B33] to-slate-950 border-blue-500/30 text-blue-400',
      tabColor: 'bg-blue-600 text-white shadow-blue-500/30',
      summary: 'The crucial first 24 hours that determine your foundational intelligence & subconscious compatibility.',
      schedule: [
        { time: '14:00 - 15:30', event: 'Reception & Bio-Data Verification', desc: 'Filling out the Personal Information Form (PIF). Remember: Never lie or exaggerate hobbies; Deputy President tests every line.' },
        { time: '16:00 - 17:30', event: 'Intelligence Tests & Verbal Screening', desc: 'Non-verbal spatial pattern reasoning and numerical analogy tests under tight time discipline.' },
        { time: '18:00 - 20:30', event: 'Psychologist Assessment Battery', desc: 'WAT (100 Words • 10s Timer), TAT Picture Stories, Sentence Completion in Urdu/English, & Self-Description (SD).' }
      ],
      yasinTip: 'Never leave gaps in your WAT numbering. If you miss a word on the projector at the 9th second alarm, immediately skip that line and focus on the next word!'
    },
    {
      day: 'Day 2',
      title: 'Group Testing Officer (GTO) Indoor & Outdoor - Phase I',
      center: 'Outdoor GTO Ground & Briefing Room',
      icon: Users,
      color: 'from-emerald-950 via-slate-900 to-slate-950 border-emerald-500/30 text-emerald-400',
      tabColor: 'bg-emerald-600 text-white shadow-emerald-500/30',
      summary: 'Evaluating natural teamwork, loud vocal stamina, social influence, and physical courage under obstacle stress.',
      schedule: [
        { time: '07:30 - 09:00', event: 'Group Discussion (GD) & Planning Exercise (GPE)', desc: 'Two national topic discussions followed by a tactical ground model solution. Speak clearly, do not interrupt others aggressively.' },
        { time: '09:30 - 11:30', event: 'Progressive Group Task (PGT) & Half Group Task (HGT)', desc: 'Carrying heavy wooden planks and drums across obstacles using the three sacred rules: Rule of Colour, Rule of Rigidity, Rule of Distance.' },
        { time: '11:45 - 12:30', event: 'Group Obstacle Race (Snake Race)', desc: 'Carrying the heavy python tent across walls and nets while shouting your team war cry with high morale.' }
      ],
      yasinTip: 'In PGT and HGT, never stand idle with your hands on your hips! Even if another candidate holds the rope, offer ideas, secure the knot, and volunteer to test the bridge first.'
    },
    {
      day: 'Day 3',
      title: 'Command Tasks, Individual Obstacles & DP Interview',
      center: 'Command Arena & Deputy President Office',
      icon: Target,
      color: 'from-amber-950 via-slate-900 to-slate-950 border-amber-500/30 text-amber-400',
      tabColor: 'bg-[#D4AF37] text-slate-950 font-black shadow-amber-500/30',
      summary: 'Testing your independent leadership command under time pressure and facing the comprehensive psychological interview.',
      schedule: [
        { time: '07:30 - 09:30', event: 'Individual Obstacles (IO) Course', desc: 'Attempting 9 timed physical obstacles in 2 minutes: Tiger Leap, Ditch Jump, Tarzan Swing, Zig-Zag Balance, & High Tea.' },
        { time: '10:00 - 12:00', event: 'Command Task (CT)', desc: 'You are appointed Commander. You brief subordinates, assign roles, and solve an intricate structural obstacle without touching materials.' },
        { time: '14:00 - 17:00', event: 'Deputy President Comprehensive Interview', desc: '1-on-1 interview assessing family background, military knowledge, current affairs, PIF verification, and emotional maturity.' }
      ],
      yasinTip: 'When leading your Command Task, give a crystal-clear operational brief to your squad before starting. Call them by chest numbers with mutual respect!'
    },
    {
      day: 'Day 4',
      title: 'Final Group Task (FGT), Conference & Departure',
      center: 'Assessor Conference Board',
      icon: Award,
      color: 'from-purple-950 via-slate-900 to-slate-950 border-purple-500/30 text-purple-400',
      tabColor: 'bg-purple-600 text-white shadow-purple-500/30',
      summary: 'The culmination of all evaluations where Psychologist, GTO, and Deputy President unify your recommendation grading.',
      schedule: [
        { time: '08:00 - 09:00', event: 'Final Group Task (FGT)', desc: 'A quick closing team exercise uniting all candidates to confirm consistency in endurance and cooperation.' },
        { time: '10:00 - 13:00', event: 'Board Conference & Final Briefing', desc: 'Assessors meet to review your dossier across all three evaluation axes. Candidates pack bags, settle clearances, and depart for home.' },
        { time: 'Afternoon', event: 'Official Result Dispatch', desc: 'Recommendation letters are issued and forwarded to GHQ / Naval Headquarters / Air Headquarters for medical examinations.' }
      ],
      yasinTip: 'On departure day, maintain immaculate appearance and respect towards selection staff right until you exit the center gates. Discipline is a permanent lifestyle!'
    }
  ]

  const current = days[activeDay]
  const Icon = current.icon

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8 text-left relative overflow-hidden">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-5 gap-4">
        <div>
          <span className="px-3.5 py-1 rounded-full bg-[#0A192F] text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-black uppercase tracking-widest inline-flex items-center gap-1.5 shadow-md mb-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Interactive Selection Roadmap
          </span>
          <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight">
            4-Days ISSB Complete Testing Timeline
          </h3>
        </div>
        <span className="text-xs text-gray-400 font-extrabold uppercase bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 shrink-0">
          📍 Kohat • Gujranwala • Malir • Quetta
        </span>
      </div>

      {/* Day Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {days.map((d, idx) => (
          <button
            key={d.day}
            onClick={() => setActiveDay(idx)}
            className={`py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all flex flex-col sm:flex-row items-center justify-center gap-2 text-center border ${activeDay === idx ? `${d.tabColor} shadow-lg border-transparent scale-102` : 'bg-slate-950 text-gray-400 border-slate-800 hover:text-white hover:border-slate-700'}`}
          >
            <span>{d.day}:</span>
            <span className="truncate max-w-[140px] text-[11px] font-bold opacity-90">{d.title.split(' ')[0]} {d.title.split(' ')[1]}</span>
          </button>
        ))}
      </div>

      {/* Active Day Showcase Card */}
      <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-br border shadow-xl space-y-6 ${current.color}`}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-950 text-white flex items-center justify-center border border-white/10 shadow-lg shrink-0">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest block text-[#D4AF37]">
                {current.day} Schedule • {current.center}
              </span>
              <h4 className="text-lg sm:text-2xl font-black text-white leading-snug">
                {current.title}
              </h4>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-medium">
          {current.summary}
        </p>

        {/* Schedule List */}
        <div className="space-y-3 pt-2">
          {current.schedule.map((ev, idx) => (
            <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-[#D4AF37]/40 transition-colors">
              <div className="shrink-0 flex items-center gap-2 text-xs font-black text-emerald-400 bg-slate-900 py-1.5 px-3 rounded-xl border border-slate-800 w-fit">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> {ev.time}
              </div>
              <div className="space-y-1 min-w-0">
                <h5 className="text-sm font-extrabold text-white leading-snug">
                  {ev.event}
                </h5>
                <p className="text-xs text-gray-400 font-medium leading-relaxed">
                  {ev.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Engineer Yasin Advisory Box */}
        <div className="p-5 rounded-2xl bg-[#0A192F] border-2 border-[#D4AF37]/50 flex items-start gap-4 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37] text-slate-950 flex items-center justify-center font-black shrink-0 shadow">
            🎓
          </div>
          <div className="space-y-1">
            <span className="text-xs font-black text-[#D4AF37] uppercase tracking-wider block">
              Engineer Yasin&apos;s Gold Secret for {current.day}
            </span>
            <p className="text-xs sm:text-sm text-gray-200 font-medium leading-relaxed">
              {current.yasinTip}
            </p>
          </div>
        </div>

      </div>

    </div>
  )
}
