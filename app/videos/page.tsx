import Link from 'next/link'
import { ArrowLeft, PlayCircle, MessageCircle } from 'lucide-react'

export const dynamic = 'force-static'

export default function VideosPage() {
  return (
    <div className="bg-slate-50 min-h-[75vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-xl w-full bg-white rounded-3xl border-2 border-gray-150 shadow-2xl p-8 sm:p-12 text-center space-y-6">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-extrabold text-gray-500 hover:text-[#B8212E] mx-auto transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <div className="w-20 h-20 bg-rose-50 border-2 border-rose-200 text-[#B8212E] rounded-3xl flex items-center justify-center mx-auto shadow-md">
          <PlayCircle className="w-10 h-10 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-black uppercase tracking-widest text-[#B8212E]">
            🎥 Video Lectures &amp; Animated Tutorials
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0A192F] uppercase tracking-tight">
            Video Tutorials Coming Soon
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed max-w-md mx-auto">
            Our expert engineers and retired defense faculty are recording high-definition animated explanations for PMA Intelligence, WAT practice audio timers, and GTO mechanical structures. Stay tuned!
          </p>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <a
            href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-2xl bg-[#0A192F] hover:bg-[#112749] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle className="w-5 h-5 text-emerald-400 fill-current" /> Notify Me on WhatsApp &rarr;
          </a>
        </div>
      </div>
    </div>
  )
}
