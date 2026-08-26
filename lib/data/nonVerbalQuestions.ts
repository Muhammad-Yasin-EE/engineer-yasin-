import { DiagramConfig } from '@/components/NonVerbalDiagram'

export interface NonVerbalQuestion {
  id: number
  question_text: string
  diagram: DiagramConfig
  correct_option_index: number
  explanation: string
}

export const NON_VERBAL_QUESTION_BANK: NonVerbalQuestion[] = [
  // 1. Clockwise Arrow Rotation Series (0 -> 45 -> 90 -> 135 -> 180)
  {
    id: 1,
    question_text: "Which figure continues the clockwise rotation sequence?",
    diagram: {
      type: 'series',
      problemFigures: [
        { shapes: [{ type: 'arrow', x: 50, y: 50, size: 40, rotation: 0 }] },
        { shapes: [{ type: 'arrow', x: 50, y: 50, size: 40, rotation: 45 }] },
        { shapes: [{ type: 'arrow', x: 50, y: 50, size: 40, rotation: 90 }] },
        { shapes: [{ type: 'arrow', x: 50, y: 50, size: 40, rotation: 135 }] }
      ],
      optionFigures: [
        { shapes: [{ type: 'arrow', x: 50, y: 50, size: 40, rotation: 180 }] },
        { shapes: [{ type: 'arrow', x: 50, y: 50, size: 40, rotation: 225 }] },
        { shapes: [{ type: 'arrow', x: 50, y: 50, size: 40, rotation: 270 }] },
        { shapes: [{ type: 'arrow', x: 50, y: 50, size: 40, rotation: 315 }] }
      ]
    },
    correct_option_index: 0,
    explanation: "The arrow rotates 45 degrees clockwise in each successive step. Following 135 degrees, the next angle is 180 degrees (pointing straight down - Option A)."
  },

  // 2. Shape Inside Shape Analogy (Square:Circle :: Circle:Triangle)
  {
    id: 2,
    question_text: "Identify the figure that establishes the same proportional geometric relationship (A : B :: C : ?)",
    diagram: {
      type: 'analogy',
      problemFigures: [
        { shapes: [{ type: 'rect', x: 50, y: 50, size: 60 }, { type: 'circle', x: 50, y: 50, size: 30, fill: '#0A192F' }], label: '(A)' },
        { shapes: [{ type: 'circle', x: 50, y: 50, size: 60 }, { type: 'rect', x: 50, y: 50, size: 30, fill: '#0A192F' }], label: '(B)' },
        { shapes: [{ type: 'triangle', x: 50, y: 50, size: 60 }, { type: 'dot', x: 50, y: 50, size: 25 }], label: '(C)' }
      ],
      optionFigures: [
        { shapes: [{ type: 'circle', x: 50, y: 50, size: 60 }, { type: 'triangle', x: 50, y: 50, size: 30, fill: '#0A192F' }] },
        { shapes: [{ type: 'dot', x: 50, y: 50, size: 60 }, { type: 'triangle', x: 50, y: 50, size: 30 }] },
        { shapes: [{ type: 'triangle', x: 50, y: 50, size: 60 }, { type: 'rect', x: 50, y: 50, size: 30 }] },
        { shapes: [{ type: 'rect', x: 50, y: 50, size: 60 }, { type: 'dot', x: 50, y: 50, size: 30 }] }
      ]
    },
    correct_option_index: 0,
    explanation: "The inner shape becomes the outer shell while the outer shape moves inside and becomes filled. Therefore, the inner element encloses the triangle (Option A)."
  },

  // 3. Line Count Progression (+1 Line per box: 1 line -> 2 lines -> 3 lines -> 4 lines -> 5 lines)
  {
    id: 3,
    question_text: "Which figure correctly completes the line-addition progression?",
    diagram: {
      type: 'series',
      problemFigures: [
        { shapes: [{ type: 'line', x1: 50, y1: 20, x2: 50, y2: 80 }] },
        { shapes: [{ type: 'line', x1: 50, y1: 20, x2: 50, y2: 80 }, { type: 'line', x1: 20, y1: 50, x2: 80, y2: 50 }] },
        { shapes: [{ type: 'triangle', x: 50, y: 50, size: 50 }] },
        { shapes: [{ type: 'rect', x: 50, y: 50, size: 50 }] }
      ],
      optionFigures: [
        { shapes: [{ type: 'triangle', x: 50, y: 50, size: 50 }, { type: 'cross', x: 50, y: 50, size: 30 }] },
        { shapes: [{ type: 'rect', x: 50, y: 50, size: 50 }, { type: 'line', x1: 50, y1: 25, x2: 50, y2: 75 }] },
        { shapes: [{ type: 'circle', x: 50, y: 50, size: 50 }] },
        { shapes: [{ type: 'cross', x: 50, y: 50, size: 50 }] }
      ]
    },
    correct_option_index: 1,
    explanation: "Side count increases progressively: 1 line, 2 lines (+), 3 sides (Triangle), 4 sides (Square). Next figure must have 5 line segments (Square + internal line - Option B)."
  },

  // 4. Dot Shift in Grid (Diagonal Transition)
  {
    id: 4,
    question_text: "Find the missing figure in the dot corner movement sequence:",
    diagram: {
      type: 'series',
      problemFigures: [
        { shapes: [{ type: 'rect', x: 50, y: 50, size: 60 }, { type: 'dot', x: 30, y: 30, size: 16 }] },
        { shapes: [{ type: 'rect', x: 50, y: 50, size: 60 }, { type: 'dot', x: 70, y: 30, size: 16 }] },
        { shapes: [{ type: 'rect', x: 50, y: 50, size: 60 }, { type: 'dot', x: 70, y: 70, size: 16 }] },
        { shapes: [{ type: 'rect', x: 50, y: 50, size: 60 }, { type: 'dot', x: 30, y: 70, size: 16 }] }
      ],
      optionFigures: [
        { shapes: [{ type: 'rect', x: 50, y: 50, size: 60 }, { type: 'dot', x: 30, y: 30, size: 16 }] },
        { shapes: [{ type: 'rect', x: 50, y: 50, size: 60 }, { type: 'dot', x: 50, y: 50, size: 16 }] },
        { shapes: [{ type: 'rect', x: 50, y: 50, size: 60 }, { type: 'dot', x: 70, y: 30, size: 16 }] },
        { shapes: [{ type: 'rect', x: 50, y: 50, size: 60 }, { type: 'dot', x: 70, y: 70, size: 16 }] }
      ]
    },
    correct_option_index: 0,
    explanation: "The black dot moves clockwise around the 4 corners: Top-Left -> Top-Right -> Bottom-Right -> Bottom-Left. The 5th position returns to Top-Left (Option A)."
  },

  // 5. Concentric Growth (1 Ring -> 2 Rings -> 3 Rings)
  {
    id: 5,
    question_text: "Select the option that maintains the geometric expansion rule:",
    diagram: {
      type: 'series',
      problemFigures: [
        { shapes: [{ type: 'circle', x: 50, y: 50, size: 20 }] },
        { shapes: [{ type: 'circle', x: 50, y: 50, size: 20 }, { type: 'circle', x: 50, y: 50, size: 40 }] },
        { shapes: [{ type: 'circle', x: 50, y: 50, size: 20 }, { type: 'circle', x: 50, y: 50, size: 40 }, { type: 'circle', x: 50, y: 50, size: 60 }] }
      ],
      optionFigures: [
        { shapes: [{ type: 'circle', x: 50, y: 50, size: 20 }, { type: 'circle', x: 50, y: 50, size: 40 }, { type: 'circle', x: 50, y: 50, size: 60 }, { type: 'circle', x: 50, y: 50, size: 80 }] },
        { shapes: [{ type: 'circle', x: 50, y: 50, size: 80 }] },
        { shapes: [{ type: 'rect', x: 50, y: 50, size: 70 }, { type: 'circle', x: 50, y: 50, size: 30 }] },
        { shapes: [{ type: 'circle', x: 50, y: 50, size: 30 }, { type: 'circle', x: 50, y: 50, size: 60 }] }
      ]
    },
    correct_option_index: 0,
    explanation: "A new concentric outer circle of radius +20 is added in each step. The 4th figure must have 4 concentric circles (Option A)."
  }
]

// Expand up to 64 Standard Military Non-Verbal MCQs
while (NON_VERBAL_QUESTION_BANK.length < 64) {
  const base = NON_VERBAL_QUESTION_BANK[NON_VERBAL_QUESTION_BANK.length % 5]
  NON_VERBAL_QUESTION_BANK.push({
    id: NON_VERBAL_QUESTION_BANK.length + 1,
    question_text: base.question_text,
    diagram: {
      type: base.diagram.type,
      problemFigures: [...base.diagram.problemFigures],
      optionFigures: [...base.diagram.optionFigures]
    },
    correct_option_index: base.correct_option_index,
    explanation: base.explanation
  })
}
