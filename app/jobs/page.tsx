import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Target, Sparkles, MessageCircle, Globe } from 'lucide-react'

export const dynamic = 'force-static'

export default function JobsPage() {
  const commissions = [
    { id: 'fpsc', name: 'Federal Public Service Commission', shortName: 'FPSC Islamabad', desc: 'Federal Civil Services, Executive & Ministry Competitions', cardBgUrl: '/images/card-fpsc.jpg', href: '/prep/public-service/fpsc', officialUrl: 'https://www.fpsc.gov.pk' },
    { id: 'ppsc', name: 'Punjab Public Service Commission', shortName: 'PPSC Punjab', desc: 'PMS Punjab, Provincial Administration & Departmental Posts', cardBgUrl: '/images/card-ppsc.jpg', href: '/prep/public-service/ppsc', officialUrl: 'https://www.ppsc.gop.pk' },
    { id: 'spsc', name: 'Sindh Public Service Commission', shortName: 'SPSC Sindh', desc: 'Combined Competitive Examination & Provincial Civil Services', cardBgUrl: '/images/card-spsc.jpg', href: '/prep/public-service/spsc', officialUrl: 'https://spsc.gov.pk' },
    { id: 'kppsc', name: 'Khyber Pakhtunkhwa PSC', shortName: 'KPPSC Peshawar', desc: 'PMS KP, Civil Executive Cadre & Administrative Services', cardBgUrl: '/images/card-kppsc.jpg', href: '/prep/public-service/kppsc', officialUrl: 'https://www.kppsc.gov.pk' },
    { id: 'bpsc', name: 'Balochistan Public Service Commission', shortName: 'BPSC Quetta', desc: 'PMS Balochistan, Section Officers & Assistant Commissioners', cardBgUrl: '/images/card-bpsc.jpg', href: '/bpsc', officialUrl: 'http://www.bpsc.gob.pk' },
    { id: 'ajkpsc', name: 'Azad Jammu & Kashmir PSC', shortName: 'AJKPSC Muzaffarabad', desc: 'AJK State Civil Service & Regional Administrative Exams', cardBgUrl: '/images/card-ajkpsc.jpg', href: '/prep/public-service/ajkpsc', officialUrl: 'https://www.ajkpsc.gov.pk' },
    { id: 'gbpsc', name: 'Gilgit-Baltistan PSC', shortName: 'GBPSC Gilgit', desc: 'Gilgit-Baltistan Executive Services & Tehsildar Competitions', cardBgUrl: '/images/card-gbpsc.jpg', href: '/prep/public-service/gbpsc', officialUrl: 'https://gb.gov.pk' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow flex flex-col gap-10 bg-white text-gray-800">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-extrabold text-gray-500 hover:text-[#B8212E] w-fit transition-colors uppercase tracking-wider">
        <ArrowLeft className="w-4 h-4" /> Back to Portal Home
      </Link>

      {/* Header with Background Image */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-gray-200 min-h-[280px] sm:min-h-[340px] flex items-center justify-center">
        <div className="absolute inset-0 bg-[#0A192F]/85 z-10 mix-blend-multiply" />
        <Image 
          src="/images/public-service-header.jpg" 
          alt="Public Service Commission Portal" 
          fill 
          priority 
          className="absolute inset-0 object-cover object-center" 
        />
        <div className="relative z-20 flex flex-col items-center text-center p-8 sm:p-14 text-white w-full max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[11px] font-black uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" /> 🇵🇰 Provincial &amp; Federal Public Service Portal
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 drop-shadow-lg text-white uppercase leading-none">
            Public Service Commissions
          </h1>
          <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium text-gray-200 drop-shadow-md">
            Browse official examination syllabi, previous solved papers, and interactive online mock quizzes for all provincial and federal Public Service Commissions across Pakistan.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#1faf53] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 transition-transform hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 fill-current" /> Daily Job Alert WhatsApp Group &rarr;
            </a>
          </div>
        </div>
      </div>

      {/* Public Service Commissions Section */}
      <div className="space-y-8 mt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b-2 border-gray-150 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 shrink-0 bg-[#0A192F] text-amber-400 rounded-2xl flex items-center justify-center shadow-md">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A192F] uppercase tracking-wide">
                All Public Service Commissions
              </h2>
              <p className="text-xs font-extrabold text-gray-500 uppercase tracking-widest">
                Select Your Respective Provincial or Federal Commission
              </p>
            </div>
          </div>
          <span className="px-3.5 py-1 bg-slate-100 border border-slate-200 rounded-xl text-xs font-black text-slate-700 uppercase self-start sm:self-auto">
            7 Official Commissions
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {commissions.map((item) => (
            <div
              key={item.id}
              className="group border-2 border-gray-200 rounded-3xl hover:border-[#B8212E] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full min-h-[260px] relative overflow-hidden bg-slate-900 shadow-lg hover:-translate-y-1"
            >
              <Image 
                src={item.cardBgUrl} 
                alt={item.name} 
                fill 
                sizes="(max-width: 768px) 100vw, 400px" 
                className="object-cover absolute inset-0 z-0 group-hover:scale-110 transition-transform duration-700 opacity-85" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/60 to-transparent z-10" />

              <div className="relative z-20 p-6 flex flex-col h-full justify-between gap-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#B8212E]/90 text-white text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-sm border border-white/10">
                    PSC Commission
                  </span>
                  <a
                    href={item.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-xl bg-white/20 hover:bg-white/40 text-white text-[10px] font-black uppercase tracking-wider backdrop-blur-md transition-colors flex items-center gap-1"
                    title="Visit Official Website"
                  >
                    <Globe className="w-3 h-3" /> Portal
                  </a>
                </div>

                <div>
                  <h3 className="font-black text-lg sm:text-xl text-white group-hover:text-amber-300 transition-colors drop-shadow-md leading-tight mb-1">
                    {item.shortName}
                  </h3>
                  <p className="text-xs text-gray-200 font-semibold drop-shadow-sm line-clamp-2">
                    {item.desc}
                  </p>

                  <div className="mt-5 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-black uppercase tracking-wider text-amber-400 group-hover:text-white transition-colors">
                    <Link href={item.href} className="flex items-center gap-1 hover:underline w-full justify-between">
                      <span>Explore Quizzes</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Guidance Banner */}
      <div className="bg-[#0A192F] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border-2 border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 mt-8 relative overflow-hidden">
        <div className="space-y-2 max-w-2xl text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            Looking for General Practice Mocks?
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">
            Our digital testing center provides automatic evaluation and real-time scorecards for General Knowledge, Pakistan Affairs, Everyday Science, and Analytical Ability.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
          <Link
            href="/quizzes"
            className="py-4 px-8 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl shadow-xl transition-transform hover:scale-105 text-xs sm:text-sm uppercase tracking-wider text-center"
          >
            Attempt Online Quizzes &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
