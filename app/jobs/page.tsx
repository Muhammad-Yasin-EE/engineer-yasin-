import Link from 'next/link'
import { ArrowLeft, Briefcase, MessageCircle } from 'lucide-react'

export const dynamic = 'force-static'

export default function JobsPage() {
  return (
    <div className="bg-slate-50 min-h-[75vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-xl w-full bg-white rounded-3xl border-2 border-gray-150 shadow-2xl p-8 sm:p-12 text-center space-y-6">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-extrabold text-gray-500 hover:text-[#B8212E] mx-auto transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <div className="w-20 h-20 bg-emerald-50 border-2 border-emerald-200 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-md">
          <Briefcase className="w-10 h-10 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-black uppercase tracking-widest text-emerald-600">
            🇵🇰 Official Defense &amp; Civil Career Ads
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0A192F] uppercase tracking-tight">
            Job Announcements Updating
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed max-w-md mx-auto">
            We are curating authentic registration deadlines and intake advertisements for Pak Army, Navy, PAF, and Federal Public Service Commissions. No expired ads are listed here!
          </p>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <a
            href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#1faf53] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-102"
          >
            <MessageCircle className="w-5 h-5 fill-current" /> Join Group For Daily Job Alerts
          </a>
        </div>
      </div>
    </div>
  )
}
