import React from 'react'
import Link from 'next/link'
import { MapPin, Phone, Mail, Globe, ArrowLeft, CheckCircle, ShieldCheck, Award, Compass, ExternalLink, FileText } from 'lucide-react'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return [
    { branch: 'army' },
    { branch: 'navy' },
    { branch: 'paf' }
  ]
}

interface CenterInfo {
  city: string
  address: string
  phone: string
  email: string
}

const centersDatabase: Record<string, {
  title: string
  shortTitle: string
  abbrev: string
  badge: string
  themeColor: string
  ringColor: string
  webUrl: string
  desc: string
  centers: CenterInfo[]
}> = {
  army: {
    title: "Pakistan Army Selection & Recruitment Centers (AS&RC)",
    shortTitle: "Pak Army (AS&RC)",
    abbrev: "AS&RC",
    badge: "⚔️ PAK ARMY OFFICIAL REGION DIRECTORY",
    themeColor: "bg-emerald-600 hover:bg-emerald-500 text-white",
    ringColor: "border-emerald-500/30 bg-emerald-50 text-emerald-900",
    webUrl: "https://www.joinpakarmy.gov.pk",
    desc: "Complete directory of official Army Selection & Recruitment Centers across all provinces of Pakistan for preliminary physical, medical, and initial computer-based intelligence testing.",
    centers: [
      { city: "Rawalpindi", address: "Army Selection and Recruitment Center (AS&RC), Roomi Road, near Ordnance Club, Rawalpindi Cantt.", phone: "051-9271393", email: "asrc_rwp@joinpakarmy.gov.pk" },
      { city: "Lahore", address: "AS&RC, Fortress Stadium Road, near Polo Ground, Lahore Cantt.", phone: "042-99220320", email: "asrc_lhr@joinpakarmy.gov.pk" },
      { city: "Karachi", address: "AS&RC, Shahrah-e-Faisal, opposite Drig Road Railway Station, Karachi.", phone: "021-99244671", email: "asrc_khi@joinpakarmy.gov.pk" },
      { city: "Peshawar", address: "AS&RC, Khyber Road, opposite Railway Station, Peshawar Cantt.", phone: "091-9211747", email: "asrc_psr@joinpakarmy.gov.pk" },
      { city: "Quetta", address: "AS&RC, Zarghoon Road, near Railway Station, Quetta Cantt.", phone: "081-9201506", email: "asrc_qta@joinpakarmy.gov.pk" },
      { city: "Multan", address: "AS&RC, Tipu Road, near Sher Shah Road, Multan Cantt.", phone: "061-9200424", email: "asrc_mtn@joinpakarmy.gov.pk" },
      { city: "Hyderabad", address: "AS&RC, Cantt Board Office Road, Hyderabad Cantt.", phone: "022-9200133", email: "asrc_hyd@joinpakarmy.gov.pk" },
      { city: "Faisalabad", address: "AS&RC, Civil Lines, near Taj Mahal Hotel, Faisalabad.", phone: "041-9200363", email: "asrc_fsd@joinpakarmy.gov.pk" },
      { city: "Muzaffarabad (AJK)", address: "AS&RC, Near Old Civil Secretariat, Muzaffarabad Cantt.", phone: "05822-920593", email: "asrc_mzd@joinpakarmy.gov.pk" },
      { city: "Gilgit (GB)", address: "AS&RC, Chinar Bagh, Judicial Road, Gilgit.", phone: "05811-920535", email: "asrc_glg@joinpakarmy.gov.pk" },
      { city: "Pano Aqil", address: "AS&RC, Pano Aqil Cantt Main Gate, Sukkur Highway.", phone: "071-5805599", email: "asrc_pno@joinpakarmy.gov.pk" },
      { city: "Khuzdar", address: "AS&RC, Near Cantt Checkpost, Khuzdar, Balochistan.", phone: "0848-412319", email: "asrc_khz@joinpakarmy.gov.pk" },
      { city: "D.I. Khan", address: "AS&RC, Cantt Road, near Mission Hospital, Dera Ismail Khan.", phone: "0966-9280145", email: "asrc_dik@joinpakarmy.gov.pk" }
    ]
  },
  navy: {
    title: "Pakistan Navy Recruitment & Selection Centers (PNSC)",
    shortTitle: "Pak Navy (PNSC)",
    abbrev: "PNSC",
    badge: "⚓ PAK NAVY OFFICIAL RECRUITMENT HUBS",
    themeColor: "bg-indigo-600 hover:bg-indigo-500 text-white",
    ringColor: "border-indigo-500/30 bg-indigo-50 text-indigo-900",
    webUrl: "https://www.joinpaknavy.gov.pk",
    desc: "Official nationwide directory of Pakistan Navy Recruitment & Selection Centers for PN Cadet, Short Service Commission (SSC), Sailors, and civilian inductions.",
    centers: [
      { city: "Karachi", address: "Pakistan Navy Recruitment & Selection Centre, 9-Liaquat Barracks, Rafiqui Shaheed Road, Karachi.", phone: "021-48506704 / 021-99201469", email: "pnsrc_karachi@navy.gov.pk" },
      { city: "Rawalpindi / Islamabad", address: "PN Recruitment & Selection Centre, House No 102, Gali No 1, Westridge-III, Rawalpindi.", phone: "051-5154378 / 051-9262311", email: "pnsrc_rawalpindi@navy.gov.pk" },
      { city: "Lahore", address: "PN Recruitment & Selection Centre, 92-A, Model Town, Lahore.", phone: "042-99232230", email: "pnsrc_lahore@navy.gov.pk" },
      { city: "Peshawar", address: "PN Recruitment & Selection Centre, Warsak Road, opposite Army Public School, Peshawar Cantt.", phone: "091-9212316", email: "pnsrc_peshawar@navy.gov.pk" },
      { city: "Quetta", address: "PN Recruitment & Selection Centre, Model Town, M.A. Jinnah Road, Quetta.", phone: "081-9201249 / 081-9203112", email: "pnsrc_quetta@navy.gov.pk" },
      { city: "Multan", address: "PN Recruitment & Selection Centre, 217-Sher Shah Road, Multan Cantt.", phone: "061-9201183", email: "pnsrc_multan@navy.gov.pk" },
      { city: "Sukkur", address: "PN Recruitment & Selection Centre, Near Army Public School, Barrage Colony, Sukkur.", phone: "071-9310480", email: "pnsrc_sukkur@navy.gov.pk" },
      { city: "Shaheed Benazirabad", address: "PN Recruitment & Selection Centre, Near Quaid-e-Awam University, Nawabshah.", phone: "0244-9370123", email: "pnsrc_sba@navy.gov.pk" },
      { city: "Swat", address: "PN Recruitment & Selection Centre, Near Makan Bagh, Saidu Sharif, Swat.", phone: "0946-9240411", email: "pnsrc_swat@navy.gov.pk" },
      { city: "Muzaffarabad (AJK)", address: "PN Recruitment & Selection Centre, House No B-49, Upper Chhatar, Muzaffarabad.", phone: "05822-920912", email: "pnsrc_mzd@navy.gov.pk" },
      { city: "Gwadar", address: "PN Recruitment & Selection Centre, Near Marine Drive, Gwadar Port, Balochistan.", phone: "086-4210452", email: "pnsrc_gwadar@navy.gov.pk" },
      { city: "Gilgit (GB)", address: "PN Recruitment & Selection Centre, Near NLI Headquarters, Jutial, Gilgit.", phone: "05811-920349", email: "pnsrc_gilgit@navy.gov.pk" }
    ]
  },
  paf: {
    title: "Pakistan Air Force Information & Selection Centers (PISC)",
    shortTitle: "PAF (PISC)",
    abbrev: "PISC",
    badge: "✈️ PAF OFFICIAL INFORMATION CENTERS",
    themeColor: "bg-sky-600 hover:bg-sky-500 text-white",
    ringColor: "border-sky-500/30 bg-sky-50 text-sky-900",
    webUrl: "https://www.joinpaf.gov.pk",
    desc: "Complete regional contact list for PAF Information & Selection Centers (PISC) governing GD Pilot, Aeronautical Engineering, Airmen, and Civilian initial assessments.",
    centers: [
      { city: "Rawalpindi / Islamabad", address: "PAF Information & Selection Centre, The Mall, near AFIC, Rawalpindi.", phone: "051-9271183", email: "pisc_rwp@paf.gov.pk" },
      { city: "Lahore", address: "PAF Information & Selection Centre, 14-Abbott Road, near Lakshmi Chowk, Lahore.", phone: "042-99201083", email: "pisc_lhr@paf.gov.pk" },
      { city: "Karachi", address: "PAF Information & Selection Centre, Main Shahrah-e-Faisal, near PAF Base Faisal, Karachi.", phone: "021-99240999", email: "pisc_khi@paf.gov.pk" },
      { city: "Peshawar", address: "PAF Information & Selection Centre, 9-The Mall, near PAF Base Bacha Khan, Peshawar Cantt.", phone: "091-9210829", email: "pisc_psr@paf.gov.pk" },
      { city: "Quetta", address: "PAF Information & Selection Centre, M.A Jinnah Road, near PAF Base Samungli, Quetta.", phone: "081-9201753", email: "pisc_qta@paf.gov.pk" },
      { city: "Faisalabad", address: "PAF Information & Selection Centre, Main University Road, near Agriculture University Gate 2, Faisalabad.", phone: "041-9200779", email: "pisc_fsd@paf.gov.pk" },
      { city: "Multan", address: "PAF Information & Selection Centre, Sher Shah Road, near PAF Base Mian Muhammad, Multan Cantt.", phone: "061-9201183 / 061-9200179", email: "pisc_mtn@paf.gov.pk" },
      { city: "Mianwali", address: "PAF Information & Selection Centre, Near PAF Base Mianwali Gate, Mianwali.", phone: "0459-242940", email: "pisc_mwi@paf.gov.pk" },
      { city: "Sukkur", address: "PAF Information & Selection Centre, Opposite Circuit House, Barrage Road, Sukkur.", phone: "071-9310409", email: "pisc_skr@paf.gov.pk" },
      { city: "Hyderabad", address: "PAF Information & Selection Centre, Near Police Headquarters, Shahrah-e-Resham, Hyderabad.", phone: "022-9200389", email: "pisc_hyd@paf.gov.pk" },
      { city: "Muzaffarabad (AJK)", address: "PAF Information & Selection Centre, Near Old Civil Secretariat, Muzaffarabad.", phone: "05822-920620", email: "pisc_mzd@paf.gov.pk" },
      { city: "Gilgit (GB)", address: "PAF Information & Selection Centre, Chinar Bagh, near Civil Hospital, Gilgit.", phone: "05811-920512", email: "pisc_glg@paf.gov.pk" }
    ]
  }
}

export default async function CentersBranchPage({ params }: { params: Promise<{ branch: string }> }) {
  const { branch } = await params
  const data = centersDatabase[branch.toLowerCase()]

  if (!data) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Breadcrumb & Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 sm:px-6 rounded-2xl border border-gray-200 shadow-sm">
          <Link href="/" className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-gray-600 hover:text-[#B8212E] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home Portal
          </Link>

          {/* Branch Selector Pill Tabs */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {[
              { id: 'army', label: '⚔️ Pak Army Centers' },
              { id: 'navy', label: '⚓ Pak Navy Centers' },
              { id: 'paf', label: '✈️ PAF Centers' },
            ].map((tab) => (
              <Link
                key={tab.id}
                href={`/centers/${tab.id}`}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  branch.toLowerCase() === tab.id
                    ? 'bg-[#0A192F] text-amber-400 shadow-md scale-102'
                    : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Hero Header Card */}
        <div className="bg-[#0A192F] text-white rounded-3xl p-8 sm:p-14 border-2 border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-black uppercase tracking-widest">
              {data.badge}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase text-white leading-[1.15]">
              {data.title}
            </h1>
            <p className="text-sm sm:text-base text-gray-300 font-medium leading-relaxed max-w-2xl">
              {data.desc}
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <a
                href={data.webUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-3.5 rounded-2xl ${data.themeColor} font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg flex items-center gap-2 transition-transform hover:scale-102`}
              >
                <Globe className="w-4 h-4" /> Visit Official Registration Portal &rarr;
              </a>
              <Link
                href="/quizzes"
                className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-black text-xs sm:text-sm uppercase tracking-wider transition-colors"
              >
                Attempt Online Intelligence Mocks &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Centers Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
              <h2 className="text-2xl font-black text-[#0A192F] uppercase tracking-tight">
                Verified Regional Centers Directory ({data.centers.length} Centers)
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                Official contact telephone numbers, email addresses, and location landmarks across all provinces.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.centers.map((center, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 border-2 border-gray-150 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-5 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0A192F] group-hover:bg-[#B8212E] transition-colors" />
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs uppercase tracking-wider border border-amber-300">
                      <MapPin className="w-3.5 h-3.5 text-amber-700" /> {center.city}
                    </span>
                    <span className="text-[11px] font-extrabold text-gray-400 uppercase">
                      {data.abbrev}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-black text-[#0A192F] tracking-tight group-hover:text-[#B8212E] transition-colors mb-2">
                    {center.city} Selection Hub
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                    {center.address}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-2.5 bg-slate-50 -mx-6 -mb-6 p-5 rounded-b-3xl">
                  <div className="flex items-center gap-2.5 text-xs font-bold text-[#0A192F]">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <span>{center.phone}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-medium text-gray-600 truncate">
                    <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <a href={`mailto:${center.email}`} className="hover:text-indigo-600 underline truncate">
                      {center.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Required Documents Checklist Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-gray-200 shadow-xl space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black text-[#B8212E] uppercase tracking-widest block">
              📋 Mandatory Registration Guidance
            </span>
            <h2 className="text-2xl font-black text-[#0A192F] uppercase tracking-tight">
              Documents Required When Visiting Selection Centers
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-medium">
              Candidates visiting physical selection centers ({data.abbrev}) for initial manual registration or preliminary test appearances must carry the following original documents:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {[
              "Original Matriculation / SSC Detailed Marksheet (DMC) & Certificate.",
              "Original Intermediate / FSc Marksheet & Passing Certificate or Hope Certificate.",
              "Computerized National Identity Card (CNIC) or Smart Form-B issued by NADRA.",
              "Father's / Guardian's Computerized National Identity Card (CNIC) copy.",
              "6 latest passport-size photographs attested (front and back).",
              "Original Domicile and State Subject Certificate (for AJK/GB candidates).",
              "Rs. 300 to 500/- registration and processing bank challan or cash receipt as applicable.",
              "Complete medical fitness certificate or eye glasses prescription (if wearing spectacles)."
            ].map((doc, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold text-[#0A192F]">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{doc}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
