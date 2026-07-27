import Link from 'next/link'
import { ArrowLeft, GraduationCap, MessageCircle } from 'lucide-react'

export const dynamic = 'force-static'

export default function CollegesPage() {
  return (
    <div className="bg-slate-50 min-h-[75vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-xl w-full bg-white rounded-3xl border-2 border-gray-150 shadow-2xl p-8 sm:p-12 text-center space-y-6">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-extrabold text-gray-500 hover:text-[#B8212E] mx-auto transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <div className="w-20 h-20 bg-amber-50 border-2 border-amber-200 text-amber-600 rounded-3xl flex items-center justify-center mx-auto shadow-md">
          <GraduationCap className="w-10 h-10 animate-bounce" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-black uppercase tracking-widest text-amber-600">
            🏛️ Cadet Colleges Entry Test Preparation 2026
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0A192F] uppercase tracking-tight">
            Colleges Portal Opening Soon
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed max-w-md mx-auto">
            Dedicated online testing suites for Cadet College Hasan Abdal, Kohat, Petaro, Razmak, and Military College Jhelum (MCJ) are currently under final curation by our assessment faculty.
          </p>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <a
            href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-2xl bg-[#0A192F] hover:bg-[#112749] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366] fill-current" /> Stay Updated in WhatsApp Group &rarr;
          </a>
        </div>
      </div>
    </div>
  )
}
