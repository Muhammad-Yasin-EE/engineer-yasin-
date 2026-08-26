import React from 'react'
import { Star, ShieldCheck, Award, Quote } from 'lucide-react'

const TESTIMONIALS = [
  {
    name: "Cadet Daniyal Ahmed",
    branch: "Pakistan Army",
    course: "PMA 153 Long Course (Recommended)",
    stars: 5,
    review: "The 84 Verbal Intelligence questions with the exact 30-minute timer gave me the real feel of the AS&RC computer room. I cleared both Verbal and Academic tests in my first attempt!",
    center: "AS&RC Lahore"
  },
  {
    name: "Pilot Officer Hamza Tariq",
    branch: "Pakistan Air Force",
    course: "156 GD Pilot (Recommended)",
    stars: 5,
    review: "Spatial reasoning and rapid non-verbal physics tests on this platform were unmatched. The ISSB psychological guidance helped me write positive TAT stories seamlessly.",
    center: "I&SC Rawalpindi"
  },
  {
    name: "Sub Lieutenant Usman Ali",
    branch: "Pakistan Navy",
    course: "PN Cadet 2024-B (Recommended)",
    stars: 5,
    review: "The authentic past papers and strict anti-cheat test simulation made all the difference. Highly recommended for every serious Armed Forces aspirant across Pakistan.",
    center: "PN SRC Karachi"
  }
]

export default function TestimonialsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" /> Proven Track Record
        </div>
        <h2 className="text-2xl sm:text-4xl font-black uppercase text-slate-900 tracking-tight">
          Recommended Candidates Success Stories
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Hear from candidates who prepared with our mock testing suite and earned their recommendation letters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1"
          >
            <Quote className="w-10 h-10 text-slate-100 absolute top-6 right-6 -z-0" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-1">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium italic">
                "{t.review}"
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-sm text-slate-900">{t.name}</h4>
                <p className="text-[11px] text-[#B8212E] font-bold">{t.course}</p>
                <p className="text-[10px] text-slate-400 font-medium">{t.center}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
