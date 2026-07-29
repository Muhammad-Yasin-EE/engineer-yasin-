'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, RefreshCw, Layers } from 'lucide-react'
import Link from 'next/link'

const FLASHCARDS_DATA = [
  { id: 1, type: 'Vocabulary', question: 'Abundant', answer: 'Existing or available in large quantities; plentiful.' },
  { id: 2, type: 'General Knowledge', question: 'What is the capital of Australia?', answer: 'Canberra' },
  { id: 3, type: 'Vocabulary', question: 'Eloquent', answer: 'Fluent or persuasive in speaking or writing.' },
  { id: 4, type: 'General Knowledge', question: 'Who wrote the national anthem of Pakistan?', answer: 'Hafeez Jalandhari' },
  { id: 5, type: 'Physics', question: 'What is the SI unit of Force?', answer: 'Newton (N)' },
  { id: 6, type: 'Vocabulary', question: 'Meticulous', answer: 'Showing great attention to detail; very careful and precise.' },
  { id: 7, type: 'General Knowledge', question: 'Which planet is known as the Red Planet?', answer: 'Mars' },
  { id: 8, type: 'Mathematics', question: 'What is the derivative of sin(x)?', answer: 'cos(x)' },
  { id: 9, type: 'Vocabulary', question: 'Tenacious', answer: 'Tending to keep a firm hold of something; clinging or adhering closely.' },
  { id: 10, type: 'Physics', question: 'What is the speed of light?', answer: '299,792,458 m/s' },
]

export default function FlashcardsPage() {
  const [cards, setCards] = useState(FLASHCARDS_DATA)
  const [swiped, setSwiped] = useState<{ id: number, dir: 'left' | 'right' }[]>([])
  
  // 1 means facing front, -1 means facing back
  const [flipped, setFlipped] = useState(false)

  const activeCardIndex = cards.length - 1
  const activeCard = cards[activeCardIndex]

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 100
    if (info.offset.x > swipeThreshold) {
      handleSwipe('right')
    } else if (info.offset.x < -swipeThreshold) {
      handleSwipe('left')
    }
  }

  const handleSwipe = (direction: 'left' | 'right') => {
    if (!activeCard) return
    setSwiped(prev => [...prev, { id: activeCard.id, dir: direction }])
    setCards(prev => prev.slice(0, -1))
    setFlipped(false)
  }

  const resetCards = () => {
    setCards(FLASHCARDS_DATA)
    setSwiped([])
    setFlipped(false)
  }

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col overflow-hidden fixed inset-0">
      
      {/* Header */}
      <div className="p-4 sm:p-6 flex items-center justify-between border-b border-gray-200 bg-white z-10 shrink-0 shadow-sm">
        <Link href="/prep" className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#B8212E] transition-colors uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <h1 className="text-lg sm:text-xl font-black text-[#0A192F] uppercase tracking-widest flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-500" />
          Speed Review
        </h1>
        <div className="text-xs font-bold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
          {cards.length} left
        </div>
      </div>

      {/* Main Board */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative">
        <div className="w-full max-w-sm h-[400px] sm:h-[480px] relative">
          
          <AnimatePresence>
            {cards.length > 0 ? (
              cards.map((card, idx) => {
                const isActive = idx === activeCardIndex
                return (
                  <motion.div
                    key={card.id}
                    className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing origin-bottom"
                    style={{
                      zIndex: idx,
                    }}
                    initial={{ scale: 0.95, opacity: 0, y: -20 }}
                    animate={{ 
                      scale: isActive ? 1 : 1 - (activeCardIndex - idx) * 0.05, 
                      opacity: isActive ? 1 : 1 - (activeCardIndex - idx) * 0.2,
                      y: isActive ? 0 : (activeCardIndex - idx) * 10
                    }}
                    exit={{ x: swiped[swiped.length - 1]?.dir === 'right' ? 300 : -300, opacity: 0, rotate: swiped[swiped.length - 1]?.dir === 'right' ? 15 : -15 }}
                    transition={{ duration: 0.3 }}
                    drag={isActive ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={isActive ? handleDragEnd : undefined}
                    onClick={() => isActive && setFlipped(!flipped)}
                  >
                    <div className="w-full h-full preserve-3d transition-transform duration-500 relative" style={{ transform: flipped && isActive ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                      
                      {/* FRONT OF CARD */}
                      <div className="absolute inset-0 backface-hidden bg-white border-2 border-gray-200 rounded-[2rem] shadow-xl p-8 flex flex-col items-center justify-center text-center gap-4">
                        <span className="absolute top-6 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-widest text-amber-500 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                          {card.type}
                        </span>
                        
                        <h2 className="text-3xl font-black text-gray-900 leading-tight">
                          {card.question}
                        </h2>
                        
                        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          Tap to flip
                        </p>
                      </div>

                      {/* BACK OF CARD */}
                      <div className="absolute inset-0 backface-hidden bg-[#0A192F] border-2 border-[#0A192F] rounded-[2rem] shadow-xl p-8 flex flex-col items-center justify-center text-center gap-4" style={{ transform: 'rotateY(180deg)' }}>
                        <h2 className="text-2xl font-bold text-white leading-relaxed">
                          {card.answer}
                        </h2>
                        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
                          Swipe Right = I Know It <br/> Swipe Left = Needs Review
                        </p>
                      </div>

                    </div>
                  </motion.div>
                )
              })
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-white border-2 border-dashed border-gray-300 rounded-[2rem]">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                  <Layers className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-2 uppercase">Deck Completed!</h2>
                <p className="text-gray-500 text-sm font-medium mb-8">
                  You knew {swiped.filter(s => s.dir === 'right').length} out of {FLASHCARDS_DATA.length} concepts.
                </p>
                <button 
                  onClick={resetCards}
                  className="px-8 py-4 bg-[#B8212E] text-white font-black rounded-xl uppercase tracking-widest flex items-center gap-2 shadow-lg hover:bg-rose-700 transition-colors"
                >
                  <RefreshCw className="w-5 h-5" /> Start Again
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Swipe Indicators */}
        {cards.length > 0 && (
          <div className="flex w-full max-w-sm justify-between mt-10 px-4">
            <button 
              onClick={() => handleSwipe('left')}
              className="w-16 h-16 rounded-full bg-white border-2 border-rose-200 text-rose-500 shadow-md flex items-center justify-center hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <span className="font-black text-xl">✗</span>
            </button>
            <button 
              onClick={() => handleSwipe('right')}
              className="w-16 h-16 rounded-full bg-white border-2 border-emerald-200 text-emerald-500 shadow-md flex items-center justify-center hover:bg-emerald-50 transition-colors cursor-pointer"
            >
              <span className="font-black text-xl">✓</span>
            </button>
          </div>
        )}

      </div>

      <style>{`
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
      `}</style>
    </div>
  )
}
