'use client'

import React from 'react'

export interface DiagramConfig {
  type: 'series' | 'analogy' | 'odd_one_out' | 'matrix'
  problemFigures: Array<{
    shapes: Array<{
      type: 'circle' | 'rect' | 'triangle' | 'line' | 'cross' | 'star' | 'arrow' | 'dot'
      x?: number
      y?: number
      size?: number
      rotation?: number
      fill?: string
      stroke?: string
      strokeWidth?: number
      x1?: number
      y1?: number
      x2?: number
      y2?: number
    }>
    label?: string
  }>
  optionFigures: Array<{
    shapes: Array<{
      type: 'circle' | 'rect' | 'triangle' | 'line' | 'cross' | 'star' | 'arrow' | 'dot'
      x?: number
      y?: number
      size?: number
      rotation?: number
      fill?: string
      stroke?: string
      strokeWidth?: number
      x1?: number
      y1?: number
      x2?: number
      y2?: number
    }>
    label?: string
  }>
}

function RenderShape({ shape }: { shape: any }) {
  const { type, x = 50, y = 50, size = 30, rotation = 0, fill = 'none', stroke = '#0A192F', strokeWidth = 3, x1 = 20, y1 = 20, x2 = 80, y2 = 80 } = shape

  const transform = rotation ? `rotate(${rotation} ${x} ${y})` : undefined

  switch (type) {
    case 'circle':
      return <circle cx={x} cy={y} r={size / 2} fill={fill} stroke={stroke} strokeWidth={strokeWidth} transform={transform} />
    case 'rect':
      return (
        <rect
          x={x - size / 2}
          y={y - size / 2}
          width={size}
          height={size}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          transform={transform}
        />
      )
    case 'triangle':
      const p1 = `${x},${y - size / 2}`
      const p2 = `${x - size / 2},${y + size / 2}`
      const p3 = `${x + size / 2},${y + size / 2}`
      return <polygon points={`${p1} ${p2} ${p3}`} fill={fill} stroke={stroke} strokeWidth={strokeWidth} transform={transform} />
    case 'line':
      return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" transform={transform} />
    case 'cross':
      return (
        <g transform={transform}>
          <line x1={x - size / 2} y1={y} x2={x + size / 2} y2={y} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
          <line x1={x} y1={y - size / 2} x2={x} y2={y + size / 2} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
        </g>
      )
    case 'arrow':
      return (
        <g transform={transform}>
          <line x1={x} y1={y + size / 2} x2={x} y2={y - size / 2} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
          <polyline
            points={`${x - size / 3},${y - size / 4} ${x},${y - size / 2} ${x + size / 3},${y - size / 4}`}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )
    case 'dot':
      return <circle cx={x} cy={y} r={size / 4 || 4} fill={stroke} />
    default:
      return null
  }
}

export function SingleFigureBox({ shapes, label, isOption = false, isSelected = false }: { shapes: any[]; label?: string; isOption?: boolean; isSelected?: boolean }) {
  return (
    <div className={`flex flex-col items-center gap-1.5 ${isOption ? 'w-full' : ''}`}>
      <div
        className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl bg-white border-2 flex items-center justify-center p-1.5 shadow-sm transition-all relative ${
          isSelected
            ? 'border-[#B8212E] ring-2 ring-[#B8212E]/40 bg-rose-50/30'
            : 'border-slate-300 hover:border-slate-400'
        }`}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {shapes.map((s, idx) => (
            <RenderShape key={idx} shape={s} />
          ))}
        </svg>
      </div>
      {label && (
        <span className={`text-[11px] font-black uppercase ${isSelected ? 'text-[#B8212E]' : 'text-slate-500'}`}>
          {label}
        </span>
      )}
    </div>
  )
}

export default function NonVerbalDiagram({
  config,
  selectedOption,
  onSelectOption,
  isInteractive = true
}: {
  config: DiagramConfig
  selectedOption?: number
  onSelectOption?: (index: number) => void
  isInteractive?: boolean
}) {
  return (
    <div className="w-full space-y-6 bg-slate-900/60 p-4 sm:p-6 rounded-3xl border border-slate-700/80">
      
      {/* 1. Problem Figures Container */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-black tracking-widest text-[#D4AF37] bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
            {config.type === 'series' ? 'Pattern Series (Find ?)' : config.type === 'analogy' ? 'Analogy (A : B :: C : ?)' : config.type === 'matrix' ? '3x3 Matrix Puzzle' : 'Odd One Out (Find Different)'}
          </span>
          <span className="text-[10px] text-slate-400 font-bold uppercase">Problem Figures</span>
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto py-3 bg-slate-800/80 rounded-2xl border border-slate-700/60 px-2 sm:px-4">
          {config.problemFigures.map((fig, idx) => (
            <React.Fragment key={idx}>
              <SingleFigureBox shapes={fig.shapes} label={fig.label || `(${idx + 1})`} />
              {idx < config.problemFigures.length - 1 && (
                <span className="text-slate-600 font-black text-sm select-none">→</span>
              )}
            </React.Fragment>
          ))}
          {/* Missing Box Placeholder */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl bg-slate-800 border-2 border-dashed border-amber-400/80 flex items-center justify-center shadow-inner">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 animate-pulse">?</span>
            </div>
            <span className="text-[11px] font-black text-amber-400 uppercase">Answer</span>
          </div>
        </div>
      </div>

      {/* 2. Answer Figures Grid (A, B, C, D, E) */}
      <div className="space-y-2 pt-2 border-t border-slate-700/60">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
          Choose Correct Answer Figure:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {config.optionFigures.map((opt, idx) => {
            const isChosen = selectedOption === idx
            return (
              <button
                key={idx}
                type="button"
                onClick={() => isInteractive && onSelectOption && onSelectOption(idx)}
                className={`p-2.5 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 cursor-pointer ${
                  isChosen
                    ? 'bg-[#B8212E]/20 border-[#B8212E] ring-2 ring-[#B8212E]/60 shadow-lg'
                    : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 hover:border-slate-500'
                }`}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl p-1 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {opt.shapes.map((s, sIdx) => (
                      <RenderShape key={sIdx} shape={s} />
                    ))}
                  </svg>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black ${isChosen ? 'bg-[#B8212E] text-white' : 'bg-slate-700 text-slate-300'}`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className={`text-xs font-bold ${isChosen ? 'text-white' : 'text-slate-400'}`}>
                    Option {String.fromCharCode(65 + idx)}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

    </div>
  )
}
