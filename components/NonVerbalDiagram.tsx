'use client'

import React from 'react'

export interface DiagramShape {
  type: 
    | 'circle' | 'rect' | 'triangle' | 'line' | 'cross' | 'star' | 'arrow' | 'dot'
    | 'pentagon' | 'hexagon' | 'diamond' | 'semicircle' | 'hourglass' | 'pinwheel' 
    | 'pie_quadrant' | 'target_rings' | 'dice_face' | 'chevron' | 'plus' | 't_bar'
    | 'divided_box'
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
  val?: number
  quadrant?: number
  stripes?: number
}

export interface DiagramConfig {
  type: 'series' | 'analogy' | 'odd_one_out' | 'matrix'
  problemFigures: Array<{
    shapes: DiagramShape[]
    label?: string
  }>
  optionFigures: Array<{
    shapes: DiagramShape[]
    label?: string
  }>
}

function RenderShape({ shape }: { shape: DiagramShape }) {
  const {
    type,
    x = 50,
    y = 50,
    size = 30,
    rotation = 0,
    fill = 'none',
    stroke = '#0A192F',
    strokeWidth = 3,
    x1 = 20,
    y1 = 20,
    x2 = 80,
    y2 = 80,
    val = 1,
    quadrant = 0,
    stripes = 1
  } = shape

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

    case 'triangle': {
      const p1 = `${x},${y - size / 2}`
      const p2 = `${x - size / 2},${y + size / 2}`
      const p3 = `${x + size / 2},${y + size / 2}`
      return <polygon points={`${p1} ${p2} ${p3}`} fill={fill} stroke={stroke} strokeWidth={strokeWidth} transform={transform} />
    }

    case 'diamond': {
      const d1 = `${x},${y - size / 2}`
      const d2 = `${x + size / 2},${y}`
      const d3 = `${x},${y + size / 2}`
      const d4 = `${x - size / 2},${y}`
      return <polygon points={`${d1} ${d2} ${d3} ${d4}`} fill={fill} stroke={stroke} strokeWidth={strokeWidth} transform={transform} />
    }

    case 'pentagon': {
      const pts = []
      for (let i = 0; i < 5; i++) {
        const angle = (i * 72 - 90) * (Math.PI / 180)
        const r = size / 2
        pts.push(`${x + r * Math.cos(angle)},${y + r * Math.sin(angle)}`)
      }
      return <polygon points={pts.join(' ')} fill={fill} stroke={stroke} strokeWidth={strokeWidth} transform={transform} />
    }

    case 'hexagon': {
      const pts = []
      for (let i = 0; i < 6; i++) {
        const angle = (i * 60 - 90) * (Math.PI / 180)
        const r = size / 2
        pts.push(`${x + r * Math.cos(angle)},${y + r * Math.sin(angle)}`)
      }
      return <polygon points={pts.join(' ')} fill={fill} stroke={stroke} strokeWidth={strokeWidth} transform={transform} />
    }

    case 'star': {
      const pts = []
      for (let i = 0; i < 10; i++) {
        const angle = (i * 36 - 90) * (Math.PI / 180)
        const r = i % 2 === 0 ? size / 2 : size / 4
        pts.push(`${x + r * Math.cos(angle)},${y + r * Math.sin(angle)}`)
      }
      return <polygon points={pts.join(' ')} fill={fill} stroke={stroke} strokeWidth={strokeWidth} transform={transform} />
    }

    case 'semicircle': {
      const r = size / 2
      const pathData = `M ${x - r} ${y} A ${r} ${r} 0 0 1 ${x + r} ${y} Z`
      return <path d={pathData} fill={fill} stroke={stroke} strokeWidth={strokeWidth} transform={transform} />
    }

    case 'hourglass': {
      const h = size / 2
      const p1 = `${x - h},${y - h}`
      const p2 = `${x + h},${y - h}`
      const p3 = `${x - h},${y + h}`
      const p4 = `${x + h},${y + h}`
      return (
        <g transform={transform}>
          <polygon points={`${p1} ${p2} ${p4} ${p3}`} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
        </g>
      )
    }

    case 'pinwheel': {
      const r = size / 2
      return (
        <g transform={transform}>
          <circle cx={x} cy={y} r={4} fill={stroke} />
          <path d={`M ${x} ${y} L ${x} ${y - r} A ${r} ${r} 0 0 1 ${x + r} ${y} Z`} fill={fill === 'none' ? '#B8212E' : fill} stroke={stroke} strokeWidth={1} />
          <path d={`M ${x} ${y} L ${x} ${y + r} A ${r} ${r} 0 0 1 ${x - r} ${y} Z`} fill={fill === 'none' ? '#B8212E' : fill} stroke={stroke} strokeWidth={1} />
        </g>
      )
    }

    case 'pie_quadrant': {
      const r = size / 2
      // Draw 4 quadrant circle
      return (
        <g transform={transform}>
          <circle cx={x} cy={y} r={r} fill="none" stroke={stroke} strokeWidth={strokeWidth} />
          <line x1={x - r} y1={y} x2={x + r} y2={y} stroke={stroke} strokeWidth={strokeWidth / 1.5} />
          <line x1={x} y1={y - r} x2={x} y2={y + r} stroke={stroke} strokeWidth={strokeWidth / 1.5} />
          {/* Shaded Quadrant */}
          {quadrant === 1 && <path d={`M ${x} ${y} L ${x + r} ${y} A ${r} ${r} 0 0 1 ${x} ${y + r} Z`} fill="#B8212E" />}
          {quadrant === 2 && <path d={`M ${x} ${y} L ${x} ${y + r} A ${r} ${r} 0 0 1 ${x - r} ${y} Z`} fill="#B8212E" />}
          {quadrant === 3 && <path d={`M ${x} ${y} L ${x - r} ${y} A ${r} ${r} 0 0 1 ${x} ${y - r} Z`} fill="#B8212E" />}
          {quadrant === 0 && <path d={`M ${x} ${y} L ${x} ${y - r} A ${r} ${r} 0 0 1 ${x + r} ${y} Z`} fill="#B8212E" />}
        </g>
      )
    }

    case 'target_rings': {
      const count = Math.min(4, Math.max(1, val))
      return (
        <g transform={transform}>
          {Array.from({ length: count }).map((_, idx) => (
            <circle
              key={idx}
              cx={x}
              cy={y}
              r={(size / 2) * ((idx + 1) / count)}
              fill="none"
              stroke={stroke}
              strokeWidth={strokeWidth}
            />
          ))}
          <circle cx={x} cy={y} r={3} fill="#B8212E" />
        </g>
      )
    }

    case 'dice_face': {
      const h = size / 2
      const dots: Array<{ cx: number; cy: number }> = []
      if (val === 1) dots.push({ cx: x, cy: y })
      else if (val === 2) dots.push({ cx: x - h / 2, cy: y - h / 2 }, { cx: x + h / 2, cy: y + h / 2 })
      else if (val === 3) dots.push({ cx: x - h / 2, cy: y - h / 2 }, { cx: x, cy: y }, { cx: x + h / 2, cy: y + h / 2 })
      else if (val === 4) dots.push({ cx: x - h / 2, cy: y - h / 2 }, { cx: x + h / 2, cy: y - h / 2 }, { cx: x - h / 2, cy: y + h / 2 }, { cx: x + h / 2, cy: y + h / 2 })
      else if (val === 5) dots.push({ cx: x - h / 2, cy: y - h / 2 }, { cx: x + h / 2, cy: y - h / 2 }, { cx: x, cy: y }, { cx: x - h / 2, cy: y + h / 2 }, { cx: x + h / 2, cy: y + h / 2 })
      else if (val === 6) dots.push({ cx: x - h / 2, cy: y - h / 2 }, { cx: x + h / 2, cy: y - h / 2 }, { cx: x - h / 2, cy: y }, { cx: x + h / 2, cy: y }, { cx: x - h / 2, cy: y + h / 2 }, { cx: x + h / 2, cy: y + h / 2 })

      return (
        <g transform={transform}>
          <rect x={x - h} y={y - h} width={size} height={size} rx={6} fill="none" stroke={stroke} strokeWidth={strokeWidth} />
          {dots.map((d, i) => (
            <circle key={i} cx={d.cx} cy={d.cy} r={3.5} fill="#B8212E" />
          ))}
        </g>
      )
    }

    case 'chevron': {
      const h = size / 2
      return (
        <g transform={transform}>
          <polyline
            points={`${x - h},${y - h / 2} ${x},${y + h / 2} ${x + h},${y - h / 2}`}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth + 2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )
    }

    case 'plus':
      return (
        <g transform={transform}>
          <line x1={x - size / 2} y1={y} x2={x + size / 2} y2={y} stroke={stroke} strokeWidth={strokeWidth + 1} strokeLinecap="round" />
          <line x1={x} y1={y - size / 2} x2={x} y2={y + size / 2} stroke={stroke} strokeWidth={strokeWidth + 1} strokeLinecap="round" />
        </g>
      )

    case 't_bar':
      return (
        <g transform={transform}>
          <line x1={x - size / 2} y1={y - size / 2} x2={x + size / 2} y2={y - size / 2} stroke={stroke} strokeWidth={strokeWidth + 1} strokeLinecap="round" />
          <line x1={x} y1={y - size / 2} x2={x} y2={y + size / 2} stroke={stroke} strokeWidth={strokeWidth + 1} strokeLinecap="round" />
        </g>
      )

    case 'divided_box': {
      const h = size / 2
      return (
        <g transform={transform}>
          <rect x={x - h} y={y - h} width={size} height={size} fill="none" stroke={stroke} strokeWidth={strokeWidth} />
          {stripes >= 1 && <line x1={x} y1={y - h} x2={x} y2={y + h} stroke={stroke} strokeWidth={strokeWidth} />}
          {stripes >= 2 && <line x1={x - h} y1={y} x2={x + h} y2={y} stroke={stroke} strokeWidth={strokeWidth} />}
          {stripes >= 3 && <line x1={x - h} y1={y - h} x2={x + h} y2={y + h} stroke={stroke} strokeWidth={strokeWidth} />}
          {stripes >= 4 && <line x1={x + h} y1={y - h} x2={x - h} y2={y + h} stroke={stroke} strokeWidth={strokeWidth} />}
        </g>
      )
    }

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
      return <circle cx={x} cy={y} r={size / 4 || 4} fill={fill === 'none' ? stroke : fill} />

    default:
      return null
  }
}

export function SingleFigureBox({ shapes, label, isOption = false, isSelected = false }: { shapes: DiagramShape[]; label?: string; isOption?: boolean; isSelected?: boolean }) {
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
        <span className={`text-[11px] font-black uppercase ${isSelected ? 'text-[#B8212E]' : 'text-slate-400'}`}>
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
    <div className="w-full space-y-6 bg-slate-900/80 p-4 sm:p-6 rounded-3xl border border-slate-700/80">
      
      {/* 1. Problem Figures Container */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-black tracking-widest text-[#D4AF37] bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            {config.type === 'series' ? 'Pattern Series (Identify Next Figure)' : config.type === 'analogy' ? 'Figure Analogy (A : B :: C : ?)' : config.type === 'matrix' ? 'Matrix Rule Completion' : 'Odd Figure Out'}
          </span>
          <span className="text-[10px] text-slate-400 font-bold uppercase">Problem Sequence</span>
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto py-4 bg-slate-800/90 rounded-2xl border border-slate-700/60 px-2 sm:px-4">
          {config.problemFigures.map((fig, idx) => (
            <React.Fragment key={idx}>
              <SingleFigureBox shapes={fig.shapes} label={fig.label || `(${idx + 1})`} />
              {idx < config.problemFigures.length - 1 && (
                <span className="text-slate-500 font-black text-sm sm:text-base select-none">→</span>
              )}
            </React.Fragment>
          ))}
          
          {/* Missing Box Placeholder */}
          <div className="text-slate-500 font-black text-sm sm:text-base select-none">→</div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl border-2 border-dashed border-amber-400/60 bg-amber-400/5 flex items-center justify-center text-amber-400 font-black text-2xl animate-pulse">
              ?
            </div>
            <span className="text-[11px] font-black uppercase text-amber-400">Answer</span>
          </div>
        </div>
      </div>

      {/* 2. Multiple Choice Options (A, B, C, D) */}
      <div className="space-y-2 pt-2 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Select the Correct Figure from Options Below:
          </span>
          <span className="text-[10px] font-black text-[#D4AF37] uppercase">Click Option to Choose</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {config.optionFigures.map((opt, idx) => {
            const isSelected = selectedOption === idx
            return (
              <button
                key={idx}
                type="button"
                disabled={!isInteractive}
                onClick={() => onSelectOption && onSelectOption(idx)}
                className={`p-3 rounded-2xl flex flex-col items-center gap-2 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#B8212E]/20 border-2 border-[#B8212E] shadow-lg shadow-rose-950/40 ring-2 ring-[#B8212E]/40'
                    : 'bg-slate-800/60 border-2 border-slate-700/80 hover:bg-slate-800 hover:border-slate-500'
                }`}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl flex items-center justify-center p-1 border border-slate-200">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {opt.shapes.map((s, sIdx) => (
                      <RenderShape key={sIdx} shape={s} />
                    ))}
                  </svg>
                </div>
                <span className={`text-xs font-black px-3 py-0.5 rounded-md ${isSelected ? 'bg-[#B8212E] text-white' : 'bg-slate-700 text-slate-300'}`}>
                  Option {String.fromCharCode(65 + idx)}
                </span>
              </button>
            )
          })}
        </div>
      </div>

    </div>
  )
}
