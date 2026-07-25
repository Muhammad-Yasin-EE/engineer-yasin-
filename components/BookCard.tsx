'use client'

import React, { useState } from 'react'
import AuthGateButton from '@/components/AuthGateButton'
import { Book, GraduationCap, Briefcase, Download, Hammer, PlayCircle, MessageCircle, X } from 'lucide-react'

interface BookCardProps {
  id: string
  title: string
  author: string // Stores provider, author, or company
  category: string
  type: 'free' | 'premium'
  price: number
  cover_url: string | null
  resource_type?: 'book' | 'scholarship' | 'job' | 'software' | 'service' | 'course' | 'apk'
}

export default function BookCard({ id, title, author, category, type, price, cover_url, resource_type = 'book' }: BookCardProps) {
  const [showSoftwareModal, setShowSoftwareModal] = useState(false)
  const [hasClickedJoin, setHasClickedJoin] = useState(false)

  const hasCover = cover_url && !cover_url.includes('placeholder') && !cover_url.includes('covers/')
  
  const getGradientClass = (titleStr: string) => {
    const len = titleStr.length
    if (len % 3 === 0) return 'from-red-900 to-red-950 text-red-100'
    if (len % 3 === 1) return 'from-gray-900 to-gray-950 text-gray-100'
    return 'from-[#7f1d1d] to-[#450a0a] text-red-100'
  }

  // Get matching icon based on resource type
  const getResourceIcon = () => {
    switch (resource_type) {
      case 'scholarship': return <GraduationCap className="w-4 h-4 text-emerald-600" />
      case 'job': return <Briefcase className="w-4 h-4 text-blue-600" />
      case 'software': return <Download className="w-4 h-4 text-violet-600" />
      case 'service': return <Hammer className="w-4 h-4 text-amber-600" />
      case 'course': return <PlayCircle className="w-4 h-4 text-teal-600" />
      default: return <Book className="w-4 h-4 text-[#B8212E]" />
    }
  }

  // Button text based on type
  const getActionButtonText = () => {
    switch (resource_type) {
      case 'scholarship': return 'Apply Scholarship'
      case 'job': return 'Apply Job'
      case 'software': return type === 'free' ? 'Download Software' : 'Get Software'
      case 'service': return 'Order Service'
      case 'course': return type === 'free' ? 'Start Course' : 'Enroll Course'
      default: return 'View Book'
    }
  }

  return (
    <div className="group relative bg-white border border-gray-200 rounded-none overflow-hidden hover:border-[#B8212E]/40 hover:shadow-[0_10px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      
      {/* Cover Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50 flex items-center justify-center border-b border-gray-100">
        
        {/* Resource Type Tag Badge */}
        <span className={`absolute top-2.5 left-2.5 z-10 px-2.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white rounded shadow-sm ${
          resource_type === 'scholarship' ? 'bg-emerald-500' :
          resource_type === 'job' ? 'bg-blue-500' :
          resource_type === 'apk' ? 'bg-green-600' :
          resource_type === 'software' ? 'bg-violet-500' :
          resource_type === 'service' ? 'bg-amber-500' :
          resource_type === 'course' ? 'bg-teal-500' : 'bg-[#B8212E]'
        }`}>
          {resource_type}
        </span>

        {/* Paid / Free badge */}
        {resource_type !== 'scholarship' && resource_type !== 'job' && (
          <span className="absolute top-2.5 right-2.5 z-10 text-[8px] font-bold px-1.5 py-0.5 tracking-wider rounded-none bg-white text-gray-800 border border-gray-200 shadow-sm">
            {type === 'free' ? 'FREE' : 'PREMIUM'}
          </span>
        )}

        {/* Visual Render */}
        {hasCover ? (
          cover_url.includes('logo.clearbit.com') || cover_url.includes('google.com/s2/favicons') || cover_url.includes('ui-avatars.com') || cover_url.includes('icon.horse') ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-50/80 p-8">
              <div 
                id={`img-wrap-${id}`}
                className="w-28 h-28 bg-white rounded-3xl shadow-sm border border-gray-150 flex items-center justify-center p-5 transform group-hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={cover_url}
                  alt={title}
                  loading="lazy"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.src.includes('ui-avatars.com')) {
                      const cleanTitle = encodeURIComponent(title.substring(0, 15));
                      img.src = `https://ui-avatars.com/api/?name=${cleanTitle}&background=random&color=fff&size=256&font-size=0.4&bold=true`;
                    }
                  }}
                />
              </div>
            </div>
          ) : (
            <img
              src={cover_url}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                const img = e.currentTarget;
                if (!img.src.includes('ui-avatars.com')) {
                  const cleanTitle = encodeURIComponent(title.substring(0, 15));
                  img.src = `https://ui-avatars.com/api/?name=${cleanTitle}&background=random&color=fff&size=256&font-size=0.4&bold=true`;
                }
              }}
            />
          )
        ) : (
          <div className={`w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br ${getGradientClass(title)} select-none`}>
            <div className="flex items-center justify-between opacity-80">
              {getResourceIcon()}
              <span className="text-[10px] uppercase tracking-widest font-mono font-bold">Portal Reference</span>
            </div>
            
            <div className="my-auto py-2">
              <h3 className="font-serif text-lg font-bold tracking-tight leading-snug line-clamp-3 mb-1">
                {title}
              </h3>
              <p className="text-xs font-sans opacity-80 line-clamp-1 italic">
                {author}
              </p>
            </div>
            
            <div className="border-t border-white/20 pt-2 flex items-center justify-between text-[10px] font-mono opacity-80">
              <span className="truncate max-w-[120px]">{category}</span>
              <span>Yasin Edition</span>
            </div>
          </div>
        )}
      </div>

      {/* Content Meta Container */}
      <div className="p-5 flex-grow flex flex-col justify-between bg-white">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5 font-semibold">
            <span className="text-[#B8212E] uppercase font-bold text-[10px] tracking-wider truncate max-w-[150px]">
              {category}
            </span>
          </div>
          <h4 className="font-bold text-gray-900 group-hover:text-[#B8212E] transition-colors line-clamp-2 text-sm sm:text-base mb-1.5">
            {title}
          </h4>
          <p className="text-xs text-gray-500 mb-3 truncate">
            {resource_type === 'job' ? 'Company: ' : resource_type === 'scholarship' ? 'Host: ' : 'Author: '}
            <span className="font-bold text-gray-700">{author}</span>
          </p>
        </div>

        {/* Price layout */}
        {resource_type !== 'scholarship' && resource_type !== 'job' && (
          <div className="mb-4">
            {type === 'free' ? (
              <span className="text-sm sm:text-base font-extrabold text-emerald-600">
                Rs. 0 (Free)
              </span>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-extrabold text-[#B8212E]">
                  Rs. {price > 0 ? price.toFixed(0) : 'Free'}
                </span>
                {price > 0 && (
                  <span className="text-xs text-gray-400 line-through font-medium">
                    Rs. {(price * 1.4).toFixed(0)}
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        {resource_type === 'software' || resource_type === 'apk' ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowSoftwareModal(true);
            }}
            className="mt-auto w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-extrabold bg-[#B8212E] hover:bg-[#961a25] text-white transition-all duration-200 shadow-sm cursor-pointer active:scale-95"
          >
            <Download className="w-3.5 h-3.5" /> {getActionButtonText()}
          </button>
        ) : (
          <AuthGateButton
            href={`/items/${id}`}
            label={getActionButtonText()}
            className="mt-auto w-full inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-bold border border-[#B8212E] text-[#B8212E] group-hover:bg-[#B8212E] group-hover:text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-wait"
          >
            {getActionButtonText()}
          </AuthGateButton>
        )}
      </div>

      {/* 2-Step WhatsApp Download Verification Modal for Software */}
      {showSoftwareModal && (
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={(e) => { if (e.target === e.currentTarget) setShowSoftwareModal(false) }}
        >
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-emerald-100 overflow-hidden text-center flex flex-col items-center gap-5">
            <button
              onClick={() => setShowSoftwareModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Icon */}
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500/20 flex items-center justify-center text-emerald-600 shadow-inner">
              <MessageCircle className="w-9 h-9 fill-current" />
            </div>

            <div className="space-y-1.5">
              <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-[10px] uppercase tracking-wider border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Direct WhatsApp Delivery
              </span>
              <h3 className="text-lg sm:text-xl font-black text-gray-900 leading-tight">
                Download {title}
              </h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                To receive instant software files, license updates, and usage guides, please follow this simple 2-step process:
              </p>
            </div>

            {/* Steps Container */}
            <div className="w-full flex flex-col gap-3 pt-1 text-left">
              
              {/* Step 1 Box */}
              <div className={`p-4 rounded-2xl border-2 transition-all duration-300 ${hasClickedJoin ? 'bg-emerald-50/60 border-emerald-300' : 'bg-white border-emerald-500 shadow-md'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                    Step 1: Join Community Group
                  </span>
                  {hasClickedJoin ? (
                    <span className="text-[11px] font-extrabold text-emerald-600">✔ Joined</span>
                  ) : (
                    <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">Required First</span>
                  )}
                </div>
                <a
                  href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setHasClickedJoin(true)}
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-xs sm:text-sm shadow transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider text-center"
                >
                  <MessageCircle className="w-4 h-4 fill-current shrink-0" /> 1. Join WhatsApp Group
                </a>
              </div>

              {/* Step 2 Box */}
              <div className={`p-4 rounded-2xl border transition-all duration-300 ${!hasClickedJoin ? 'bg-gray-50 border-gray-200 opacity-65' : 'bg-white border-emerald-600 shadow-lg'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-gray-800 uppercase tracking-wider">
                    Step 2: Request Software
                  </span>
                  {hasClickedJoin && (
                    <span className="text-[11px] font-extrabold text-emerald-600 animate-pulse">🔓 Unlocked</span>
                  )}
                </div>
                {hasClickedJoin ? (
                  <a
                    href={`https://wa.me/923116826552?text=${encodeURIComponent(`Assalam o Alikum Engineer Yasin! Mujhe "${title}" software chahiye.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShowSoftwareModal(false)}
                    className="w-full py-3 px-4 rounded-xl bg-[#075E54] hover:bg-[#064e46] text-white font-black text-xs sm:text-sm shadow-md hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider text-center"
                  >
                    📥 2. Send Request on WhatsApp ➔
                  </a>
                ) : (
                  <button
                    disabled
                    onClick={() => alert("Please click Step 1 button to join the WhatsApp group first!")}
                    className="w-full py-3 px-4 rounded-xl bg-gray-200 text-gray-500 font-bold text-xs flex items-center justify-center gap-1.5 cursor-not-allowed uppercase tracking-wider"
                  >
                    🔒 Click Step 1 Above to Unlock
                  </button>
                )}
              </div>

            </div>

            <p className="text-[10px] font-semibold text-gray-400 italic">
              *Once you click Step 2, you will be redirected to Engineer Yasin directly with your requested software name!
            </p>
          </div>
        </div>
      )}

    </div>
  )
}
