'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Plus, Trash2, Upload, ExternalLink, ShieldAlert, Sparkles, GraduationCap, Briefcase, Check, RefreshCw } from 'lucide-react'

interface PortalItem {
  id: string
  type: 'scholarship' | 'job'
  category: string
  title: string
  organization?: string
  badgeOrFunding: string
  description?: string
  openingDate?: string
  closingDate?: string
  eligibility?: string
  applyUrl: string
  imageUrl: string
  createdAt?: string
}

interface PortalContentManagerProps {
  defaultType: 'scholarship' | 'job'
}

export default function PortalContentManager({ defaultType }: PortalContentManagerProps) {
  const [items, setItems] = useState<PortalItem[]>([])
  const [deletedIds, setDeletedIds] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  // Form states
  const [type, setType] = useState<'scholarship' | 'job'>(defaultType)
  const [category, setCategory] = useState<string>(defaultType === 'scholarship' ? 'international' : 'bpsc')
  const [title, setTitle] = useState('')
  const [organization, setOrganization] = useState('')
  const [badgeOrFunding, setBadgeOrFunding] = useState('')
  const [description, setDescription] = useState('')
  const [openingDate, setOpeningDate] = useState('')
  const [closingDate, setClosingDate] = useState('')
  const [eligibility, setEligibility] = useState('')
  const [applyUrl, setApplyUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('/images/card-fpsc.jpg')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const scholarshipCategories = [
    { value: 'international', label: '🌐 Global International Scholarships' },
    { value: 'national', label: '🇵🇰 National Pakistani Universities & Minorities' },
    { value: 'intermediate', label: '🎓 Intermediate, FSc & Matric Talent Aid' },
    { value: 'hec', label: '🏛️ HEC Foreign Nomination Portals' },
    { value: 'women', label: '👩 Women-Only International Fellowships' },
    { value: 'germany', label: '🇩🇪 Germany DAAD EPOS Courses' }
  ]

  const jobCategories = [
    { value: 'bpsc', label: '🇵🇰 BPSC Balochistan Public Service Commission' },
    { value: 'fpsc', label: '🇵🇰 FPSC Federal Public Service Commission' },
    { value: 'ppsc', label: '🇵🇰 PPSC Punjab Public Service Commission' },
    { value: 'spsc', label: '🇵🇰 SPSC Sindh Public Service Commission' },
    { value: 'kppsc', label: '🇵🇰 KPPSC Khyber Pakhtunkhwa PSC' },
    { value: 'ajkpsc', label: '🇵🇰 AJKPSC Azad Jammu & Kashmir PSC' },
    { value: 'gbpsc', label: '🇵🇰 GBPSC Gilgit-Baltistan PSC' }
  ]

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/portal-manager')
      const data = await res.json()
      if (data && data.customItems) {
        setItems(data.customItems.filter((i: PortalItem) => i.type === defaultType))
        setDeletedIds(data.deletedIds || [])
      }
    } catch (err) {
      console.error('Error fetching portal content:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setType(defaultType)
    setCategory(defaultType === 'scholarship' ? 'international' : 'bpsc')
    fetchData()
  }, [defaultType])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setSelectedFile(file)
    setError(null)
    setUploading(true)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('prefix', type === 'scholarship' ? 'scholarship-upload' : 'job-upload')

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setImageUrl(data.url)
      setSuccessMsg(`Image uploaded successfully: ${data.filename}`)
      setTimeout(() => setSuccessMsg(null), 4000)
    } catch (err: any) {
      setError('Image Upload Failed: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMsg(null)

    if (!title.trim() || !badgeOrFunding.trim() || !applyUrl.trim()) {
      setError('Please provide at least Title, Badge/Funding Info, and Apply URL.')
      return
    }

    setSubmitting(true)
    try {
      const payload: Omit<PortalItem, 'id'> = {
        type,
        category,
        title: title.trim(),
        organization: organization.trim() || (type === 'job' ? category.toUpperCase() : 'HEC / Verified Sponsor'),
        badgeOrFunding: badgeOrFunding.trim(),
        description: description.trim() || 'Complete official authentic details, eligibility instructions and verification requirements.',
        openingDate: openingDate.trim() || 'Active Open Window',
        closingDate: closingDate.trim() || 'Check Official Portal',
        eligibility: eligibility.trim() || 'Pakistani citizens and verified candidates fulfilling advertised educational merit.',
        applyUrl: applyUrl.trim(),
        imageUrl: imageUrl || '/images/card-fpsc.jpg'
      }

      const res = await fetch('/api/admin/portal-manager', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json()
      if (data.error) throw new Error(data.error)

      setSuccessMsg('🎉 Successfully published new card to live website & Google AdSense indexing!')
      setTitle('')
      setOrganization('')
      setBadgeOrFunding('')
      setDescription('')
      setOpeningDate('')
      setClosingDate('')
      setEligibility('')
      setApplyUrl('')
      setSelectedFile(null)
      fetchData()
      setTimeout(() => setSuccessMsg(null), 5000)
    } catch (err: any) {
      setError('Error publishing item: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Permanently remove "${title}" from the live website?`)) return
    try {
      const res = await fetch(`/api/admin/portal-manager?id=${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setItems(prev => prev.filter(i => i.id !== id))
      setSuccessMsg(`Card deleted successfully from live portal!`)
      setTimeout(() => setSuccessMsg(null), 4000)
    } catch (err: any) {
      alert('Failed to delete item: ' + err.message)
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* ── HEADER BANNER ─────────────────────────────────────────────── */}
      <div className="bg-[#0A192F] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/40">
            <Sparkles className="w-4 h-4" /> Live Web Portal &amp; Google AdSense Control Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white flex items-center gap-2.5">
            {defaultType === 'scholarship' ? <GraduationCap className="w-8 h-8 text-amber-400" /> : <Briefcase className="w-8 h-8 text-cyan-400" />}
            {defaultType === 'scholarship' ? 'Scholarship Cards & Picture Manager' : 'Public Service Commission Jobs Manager'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
            Directly create, edit, or delete verified cards. Upload official pictures in simple clicks. Changes immediately appear live on your website with 100/100 page loading speed for high RPM earning!
          </p>
        </div>
        <button
          onClick={fetchData}
          className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs uppercase tracking-wider rounded-xl border border-slate-600 inline-flex items-center gap-2 shrink-0 transition-transform hover:scale-105"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh Portal Data
        </button>
      </div>

      {error && (
        <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-xl text-rose-800 text-xs font-bold flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" /> {error}
        </div>
      )}

      {successMsg && (
        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-xl text-emerald-800 text-xs font-black flex items-center gap-2 animate-bounce">
          <Check className="w-5 h-5 text-emerald-600 shrink-0" /> {successMsg}
        </div>
      )}

      {/* ── CREATE NEW PORTAL ITEM & PICTURE UPLOADER FORM ────────────── */}
      <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <h3 className="text-lg sm:text-xl font-black text-[#0A192F] uppercase tracking-tight flex items-center gap-2 border-b border-gray-200 pb-3">
          <Plus className="w-5 h-5 text-amber-500" /> ADD NEW {defaultType === 'scholarship' ? 'SCHOLARSHIP' : 'PUBLIC SERVICE JOB'} CARD TO WEBSITE
        </h3>

        <form onSubmit={handleCreateItem} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Category Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-[#0A192F] uppercase">
                1. Select Target Category Portal <span className="text-rose-600">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border-2 border-gray-300 rounded-xl p-3.5 text-xs font-black text-[#0A192F] focus:border-[#0A192F] focus:outline-none uppercase shadow-inner"
              >
                {(defaultType === 'scholarship' ? scholarshipCategories : jobCategories).map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            {/* Title Input */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-[#0A192F] uppercase">
                2. Card Title (All Capital Recommended) <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={defaultType === 'scholarship' ? "e.g., HARVARD UNIVERSITY FULL MERIT FELLOWSHIP 2026" : "e.g., BPSC TEHSILDAR & SECTION OFFICER COMPETITION 2026"}
                className="w-full bg-slate-50 border-2 border-gray-300 rounded-xl p-3.5 text-xs font-black text-[#0A192F] focus:border-[#0A192F] focus:outline-none uppercase shadow-inner placeholder:text-gray-400 placeholder:font-medium"
              />
            </div>

            {/* Badge / Funding Tag */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-[#0A192F] uppercase">
                3. {defaultType === 'scholarship' ? 'Funding Tag / Amount' : 'Job Pay Scale & Cadre Badge'} <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                value={badgeOrFunding}
                onChange={(e) => setBadgeOrFunding(e.target.value)}
                placeholder={defaultType === 'scholarship' ? "✅ FULLY FUNDED ($45,000 / YEAR STIPEND + TUITION)" : "✅ BPS-17 PERMANENT GAZETTED OFFICER POSTS"}
                className="w-full bg-slate-50 border-2 border-gray-300 rounded-xl p-3.5 text-xs font-extrabold text-emerald-800 focus:border-emerald-600 focus:outline-none uppercase shadow-inner placeholder:text-gray-400 placeholder:font-medium"
              />
            </div>

            {/* Official Apply URL */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-[#0A192F] uppercase">
                4. Official Apply Portal URL (Where button clicks go) <span className="text-rose-600">*</span>
              </label>
              <input
                type="url"
                value={applyUrl}
                onChange={(e) => setApplyUrl(e.target.value)}
                placeholder="https://www.official-university-or-commission-portal.gov.pk/apply"
                className="w-full bg-slate-50 border-2 border-gray-300 rounded-xl p-3.5 text-xs font-bold text-blue-700 focus:border-blue-700 focus:outline-none shadow-inner placeholder:text-gray-400 placeholder:font-medium"
              />
            </div>

            {/* Opening Date */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-[#0A192F] uppercase">
                5. Opening Date / Advertisement Date
              </label>
              <input
                type="text"
                value={openingDate}
                onChange={(e) => setOpeningDate(e.target.value)}
                placeholder="e.g., 10 August 2026 or Immediately Active"
                className="w-full bg-slate-50 border-2 border-gray-300 rounded-xl p-3.5 text-xs font-bold text-slate-800 focus:border-slate-800 focus:outline-none shadow-inner"
              />
            </div>

            {/* Closing Deadline */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-rose-700 uppercase">
                6. Closing Application Deadline
              </label>
              <input
                type="text"
                value={closingDate}
                onChange={(e) => setClosingDate(e.target.value)}
                placeholder="e.g., 30 September 2026 (Strict 5:00 PM CST)"
                className="w-full bg-slate-50 border-2 border-rose-300 rounded-xl p-3.5 text-xs font-extrabold text-rose-700 focus:border-rose-600 focus:outline-none shadow-inner"
              />
            </div>

            {/* Description / Requirements */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-xs font-black text-[#0A192F] uppercase">
                7. Complete Authentic Details &amp; Required Documents (AdSense Value Content)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Detail the exact required academic qualifications, IBCC attestation rules, age limits, syllabus subjects, and fee submission procedure..."
                className="w-full bg-slate-50 border-2 border-gray-300 rounded-xl p-3.5 text-xs font-medium text-gray-800 focus:border-[#0A192F] focus:outline-none shadow-inner"
              />
            </div>

            {/* ── PICTURE UPLOADER BOX ────────────────────────────────────── */}
            <div className="space-y-3 md:col-span-2 bg-slate-100 p-6 rounded-2xl border-2 border-dashed border-slate-300">
              <label className="block text-xs font-black text-[#0A192F] uppercase flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#B8212E]" /> 8. Direct Official Picture / Logo Uploader (Optional - Defaults to Verified Photo)
              </label>
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-36 h-24 rounded-2xl overflow-hidden border-2 border-gray-300 bg-white shrink-0 shadow-md">
                  <Image src={imageUrl || '/images/card-fpsc.jpg'} alt="Preview" fill className="object-cover" />
                </div>
                
                <div className="space-y-2 flex-grow">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                    className="block w-full text-xs text-slate-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-[#0A192F] file:text-amber-400 hover:file:bg-slate-800 cursor-pointer"
                  />
                  <p className="text-[11px] font-bold text-gray-500">
                    {uploading ? '⏳ Uploading picture and optimizing...' : `Selected Image URL: ${imageUrl}`}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    ✨ Selecting any photo here instantly copies it to your server &amp; connects it to this new card!
                  </p>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-gray-200 flex justify-end">
            <button
              type="submit"
              disabled={submitting || uploading}
              className="px-8 py-4 bg-[#0A192F] hover:bg-slate-800 text-amber-400 font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl shadow-xl transition-all hover:scale-105 inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> {submitting ? 'PUBLISHING...' : `PUBLISH NEW ${defaultType.toUpperCase()} CARD LIVE NOW`}
            </button>
          </div>
        </form>
      </div>

      {/* ── EXISTING LIVE CUSTOM ITEMS TABLE ───────────────────────────── */}
      <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <h3 className="text-lg sm:text-xl font-black text-[#0A192F] uppercase tracking-tight">
            LIVE CUSTOM MANAGED {defaultType === 'scholarship' ? 'SCHOLARSHIPS' : 'JOBS'} ({items.length})
          </h3>
          <span className="text-xs font-bold text-gray-500 uppercase">
            Showing dynamically added cards
          </span>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-xs font-extrabold uppercase bg-slate-50 rounded-2xl border border-gray-200">
            No custom {defaultType} cards added yet via admin panel. Use the form above to add your first one!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="border-2 border-gray-200 rounded-2xl overflow-hidden bg-white shadow-lg flex flex-col justify-between hover:border-[#B8212E] transition-all">
                <div>
                  <div className="relative h-40 w-full bg-slate-100 border-b border-gray-200">
                    <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                    <div className="absolute top-2 left-2 z-10">
                      <span className="text-[10px] font-black uppercase tracking-wider text-white bg-[#0A192F]/90 px-2.5 py-1 rounded-full">
                        {item.category.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <h4 className="text-base font-black text-[#0A192F] uppercase leading-tight line-clamp-2">{item.title}</h4>
                    <p className="text-[11px] font-extrabold text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-300">{item.badgeOrFunding}</p>
                    <p className="text-[11px] text-gray-600 line-clamp-2 font-medium">{item.description}</p>
                    <div className="text-[11px] text-gray-600 bg-slate-50 p-2 rounded-lg">
                      Deadline: <strong className="text-rose-700">{item.closingDate}</strong>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-gray-200 flex items-center justify-between gap-2">
                  <a
                    href={item.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-black text-blue-600 hover:underline inline-flex items-center gap-1"
                  >
                    Test Apply Link <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    className="p-2 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-lg transition-transform hover:scale-110 flex items-center gap-1 text-[10px] uppercase shadow"
                    title="Delete this card"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete Card
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
