import { DiagramConfig, DiagramShape } from '@/components/NonVerbalDiagram'

// Deterministic Hash Function for strings
function stringHash(str: string): number {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i)
  }
  return Math.abs(hash >>> 0)
}

// Deterministic Pseudo-Random Generator
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

// Deterministic Array Shuffle with Correct Option Tracking
function shuffleWithCorrectIndex<T>(items: T[], correctIdx: number, seed: number): { shuffled: T[]; newCorrectIdx: number } {
  const indexed = items.map((item, idx) => ({ item, isCorrect: idx === correctIdx }))
  
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(pseudoRandom(seed + i * 31) * (i + 1))
    const temp = indexed[i]
    indexed[i] = indexed[j]
    indexed[j] = temp
  }

  const shuffled = indexed.map(x => x.item)
  const newCorrectIdx = indexed.findIndex(x => x.isCorrect)
  return { shuffled, newCorrectIdx }
}

// ═════════════════════════════════════════════════════════════════════════════
// 1. COMPLETE MULTI-CONCEPT NON-VERBAL INTELLIGENCE ENGINE (64 MCQs / Test)
// ═════════════════════════════════════════════════════════════════════════════
export function getUniqueNonVerbalQuestions(
  testNumber: number, 
  count: number = 64, 
  courseKey: string = 'general'
): Array<{
  id: number
  question_text: string
  diagram: DiagramConfig
  correct_option_index: number
  explanation: string
}> {
  const questions: Array<{
    id: number
    question_text: string
    diagram: DiagramConfig
    correct_option_index: number
    explanation: string
  }> = []

  const courseSalt = stringHash(courseKey)
  const seedBase = (testNumber - 1) * count

  for (let i = 0; i < count; i++) {
    const qIndex = seedBase + i + 1
    const qSeed = (courseSalt * 37) + (testNumber * 10000) + (i * 149) + 23
    const conceptType = i % 16

    switch (conceptType) {
      // ───────────────────────────────────────────────────────────────────────
      // 1. 3x3 MATRIX GRID (Shape & Dot Logic across Rows & Columns)
      // ───────────────────────────────────────────────────────────────────────
      case 0: {
        const shapeRow1: DiagramShape['type'] = (qSeed % 2 === 0) ? 'circle' : 'rect'
        const shapeRow2: DiagramShape['type'] = 'triangle'
        const shapeRow3: DiagramShape['type'] = 'diamond'

        const matrixGrid = [
          [
            { shapes: [{ type: shapeRow1, x: 50, y: 50, size: 40 }, { type: 'dot' as const, x: 50, y: 50, size: 8 }] },
            { shapes: [{ type: shapeRow1, x: 50, y: 50, size: 40 }, { type: 'dot' as const, x: 40, y: 50, size: 8 }, { type: 'dot' as const, x: 60, y: 50, size: 8 }] },
            { shapes: [{ type: shapeRow1, x: 50, y: 50, size: 40 }, { type: 'dot' as const, x: 35, y: 50, size: 8 }, { type: 'dot' as const, x: 50, y: 50, size: 8 }, { type: 'dot' as const, x: 65, y: 50, size: 8 }] },
          ],
          [
            { shapes: [{ type: shapeRow2, x: 50, y: 50, size: 40 }, { type: 'dot' as const, x: 50, y: 50, size: 8 }] },
            { shapes: [{ type: shapeRow2, x: 50, y: 50, size: 40 }, { type: 'dot' as const, x: 40, y: 50, size: 8 }, { type: 'dot' as const, x: 60, y: 50, size: 8 }] },
            { shapes: [{ type: shapeRow2, x: 50, y: 50, size: 40 }, { type: 'dot' as const, x: 35, y: 50, size: 8 }, { type: 'dot' as const, x: 50, y: 50, size: 8 }, { type: 'dot' as const, x: 65, y: 50, size: 8 }] },
          ],
          [
            { shapes: [{ type: shapeRow3, x: 50, y: 50, size: 40 }, { type: 'dot' as const, x: 50, y: 50, size: 8 }] },
            { shapes: [{ type: shapeRow3, x: 50, y: 50, size: 40 }, { type: 'dot' as const, x: 40, y: 50, size: 8 }, { type: 'dot' as const, x: 60, y: 50, size: 8 }] },
            { shapes: [{ type: shapeRow3, x: 50, y: 50, size: 40 }, { type: 'dot' as const, x: 35, y: 50, size: 8 }, { type: 'dot' as const, x: 50, y: 50, size: 8 }, { type: 'dot' as const, x: 65, y: 50, size: 8 }], isMissing: true },
          ]
        ]

        const correctAns = { shapes: [{ type: shapeRow3, x: 50, y: 50, size: 40 }, { type: 'dot' as const, x: 35, y: 50, size: 8 }, { type: 'dot' as const, x: 50, y: 50, size: 8 }, { type: 'dot' as const, x: 65, y: 50, size: 8 }] }
        const rawOpts = [
          correctAns,
          { shapes: [{ type: shapeRow3, x: 50, y: 50, size: 40 }, { type: 'dot' as const, x: 50, y: 50, size: 8 }] },
          { shapes: [{ type: shapeRow2, x: 50, y: 50, size: 40 }, { type: 'dot' as const, x: 50, y: 50, size: 8 }] },
          { shapes: [{ type: shapeRow1, x: 50, y: 50, size: 40 }] }
        ]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOpts, 0, qSeed)

        questions.push({
          id: qIndex,
          question_text: `3x3 MATRIX REASONING: Examine row and column patterns to discover the missing 9th figure:`,
          diagram: {
            type: 'matrix',
            matrixGrid: matrixGrid,
            optionFigures: shuffled
          },
          correct_option_index: newCorrectIdx,
          explanation: `Rows dictate shape type while columns add internal dots (1 → 2 → 3). The 9th cell requires a Diamond with 3 dots (Option ${String.fromCharCode(65 + newCorrectIdx)}).`
        })
        break
      }

      // ───────────────────────────────────────────────────────────────────────
      // 2. CLASSIFICATION / ODD ONE OUT (5-Card Selection)
      // ───────────────────────────────────────────────────────────────────────
      case 1: {
        const oddRule = (qSeed % 3)
        let raw5Opts: any[] = []
        let exp = ''

        if (oddRule === 0) {
          raw5Opts = [
            { shapes: [{ type: 'semicircle' as const, x: 50, y: 50, size: 50 }], label: '(A)' }, // Odd (Open/Curved)
            { shapes: [{ type: 'triangle' as const, x: 50, y: 50, size: 50 }], label: '(B)' },
            { shapes: [{ type: 'rect' as const, x: 50, y: 50, size: 50 }], label: '(C)' },
            { shapes: [{ type: 'pentagon' as const, x: 50, y: 50, size: 50 }], label: '(D)' },
            { shapes: [{ type: 'hexagon' as const, x: 50, y: 50, size: 50 }], label: '(E)' }
          ]
          exp = `Figures B, C, D, E are all closed straight-line polygons. Option A is an open curved arc.`
        } else if (oddRule === 1) {
          raw5Opts = [
            { shapes: [{ type: 'triangle' as const, x: 50, y: 50, size: 50 }], label: '(A)' }, // Odd (3 sides)
            { shapes: [{ type: 'rect' as const, x: 50, y: 50, size: 50 }], label: '(B)' },
            { shapes: [{ type: 'diamond' as const, x: 50, y: 50, size: 50 }], label: '(C)' },
            { shapes: [{ type: 'hexagon' as const, x: 50, y: 50, size: 50 }], label: '(D)' },
            { shapes: [{ type: 'plus' as const, x: 50, y: 50, size: 50 }], label: '(E)' }
          ]
          exp = `All other shapes have an even number of vertices (4, 4, 6, 4). Option A (Triangle) has an odd count of 3.`
        } else {
          raw5Opts = [
            { shapes: [{ type: 'rect' as const, x: 50, y: 50, size: 50 }], label: '(A)' }, // Odd (No dot)
            { shapes: [{ type: 'triangle' as const, x: 50, y: 50, size: 50 }, { type: 'dot' as const, x: 50, y: 50, size: 10 }], label: '(B)' },
            { shapes: [{ type: 'circle' as const, x: 50, y: 50, size: 50 }, { type: 'dot' as const, x: 50, y: 50, size: 10 }], label: '(C)' },
            { shapes: [{ type: 'diamond' as const, x: 50, y: 50, size: 50 }, { type: 'dot' as const, x: 50, y: 50, size: 10 }], label: '(D)' },
            { shapes: [{ type: 'pentagon' as const, x: 50, y: 50, size: 50 }, { type: 'dot' as const, x: 50, y: 50, size: 10 }], label: '(E)' }
          ]
          exp = `Every shape contains an internal target dot except Option A.`
        }

        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(raw5Opts, 0, qSeed)

        questions.push({
          id: qIndex,
          question_text: `CLASSIFICATION: Choose the figure that does NOT belong to the group (Odd One Out):`,
          diagram: {
            type: 'odd_one_out',
            optionFigures: shuffled
          },
          correct_option_index: newCorrectIdx,
          explanation: `${exp} Therefore, Option ${String.fromCharCode(65 + newCorrectIdx)} is the odd figure.`
        })
        break
      }

      // ───────────────────────────────────────────────────────────────────────
      // 3. CLOCK DIALS & ANGULAR TIME PROGRESSIONS
      // ───────────────────────────────────────────────────────────────────────
      case 2: {
        const startH = (qSeed % 5) + 1
        const hStep = 2
        const h1 = startH
        const h2 = (h1 + hStep)
        const h3 = (h2 + hStep)
        const correctH = (h3 + hStep)

        const rawOpts = [
          { shapes: [{ type: 'clock_face' as const, x: 50, y: 50, size: 60, hours: correctH, minutes: 0 }] },
          { shapes: [{ type: 'clock_face' as const, x: 50, y: 50, size: 60, hours: (correctH + 3) % 12, minutes: 0 }] },
          { shapes: [{ type: 'clock_face' as const, x: 50, y: 50, size: 60, hours: (correctH + 5) % 12, minutes: 0 }] },
          { shapes: [{ type: 'circle' as const, x: 50, y: 50, size: 50 }] }
        ]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOpts, 0, qSeed)

        questions.push({
          id: qIndex,
          question_text: `CLOCK DIAL LOGIC: Analyze the +${hStep} hour progressive rotation of the clock hand to find the next dial:`,
          diagram: {
            type: 'series',
            problemFigures: [
              { shapes: [{ type: 'clock_face', x: 50, y: 50, size: 60, hours: h1, minutes: 0 }], label: `(${h1}:00)` },
              { shapes: [{ type: 'clock_face', x: 50, y: 50, size: 60, hours: h2, minutes: 0 }], label: `(${h2}:00)` },
              { shapes: [{ type: 'clock_face', x: 50, y: 50, size: 60, hours: h3, minutes: 0 }], label: `(${h3}:00)` },
            ],
            optionFigures: shuffled
          },
          correct_option_index: newCorrectIdx,
          explanation: `The hour hand advances by +${hStep} hours per stage (${h1}:00 → ${h2}:00 → ${h3}:00 → ${correctH}:00), identifying Option ${String.fromCharCode(65 + newCorrectIdx)}.`
        })
        break
      }

      // ───────────────────────────────────────────────────────────────────────
      // 4. PAPER FOLDING & SYMMETRICAL HOLE PUNCHING
      // ───────────────────────────────────────────────────────────────────────
      case 3: {
        const rawOpts = [
          { shapes: [{ type: 'rect' as const, x: 50, y: 50, size: 55 }, { type: 'dot' as const, x: 35, y: 35, size: 8 }, { type: 'dot' as const, x: 65, y: 35, size: 8 }, { type: 'dot' as const, x: 35, y: 65, size: 8 }, { type: 'dot' as const, x: 65, y: 65, size: 8 }] },
          { shapes: [{ type: 'rect' as const, x: 50, y: 50, size: 55 }, { type: 'dot' as const, x: 50, y: 50, size: 8 }] },
          { shapes: [{ type: 'rect' as const, x: 50, y: 50, size: 55 }, { type: 'dot' as const, x: 35, y: 35, size: 8 }, { type: 'dot' as const, x: 65, y: 65, size: 8 }] },
          { shapes: [{ type: 'circle' as const, x: 50, y: 50, size: 50 }] }
        ]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOpts, 0, qSeed)

        questions.push({
          id: qIndex,
          question_text: `PAPER FOLDING: A square paper is folded into quarters and punched with a single hole. When unfolded, which pattern appears?`,
          diagram: {
            type: 'folding',
            problemFigures: [
              { shapes: [{ type: 'rect', x: 50, y: 50, size: 55 }], label: 'Square' },
              { shapes: [{ type: 'triangle', x: 50, y: 50, size: 55 }], label: 'Folded' },
              { shapes: [{ type: 'triangle', x: 50, y: 50, size: 55 }, { type: 'dot', x: 50, y: 60, size: 8 }], label: 'Punched' }
            ],
            optionFigures: shuffled
          },
          correct_option_index: newCorrectIdx,
          explanation: `Unfolding diagonally across both axes creates 4 symmetrical holes in all 4 quadrant corners (Option ${String.fromCharCode(65 + newCorrectIdx)}).`
        })
        break
      }

      // ───────────────────────────────────────────────────────────────────────
      // 5. DOT SITUATION LOGIC (Geometric Region Intersections)
      // ───────────────────────────────────────────────────────────────────────
      case 4: {
        const rawOpts = [
          { shapes: [{ type: 'overlapping_regions' as const, x: 50, y: 50, size: 50, x1: 45, y1: 50 }] },
          { shapes: [{ type: 'rect' as const, x: 50, y: 50, size: 50 }, { type: 'dot' as const, x: 50, y: 50, size: 10 }] },
          { shapes: [{ type: 'circle' as const, x: 50, y: 50, size: 50 }] },
          { shapes: [{ type: 'triangle' as const, x: 50, y: 50, size: 50 }] }
        ]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOpts, 0, qSeed)

        questions.push({
          id: qIndex,
          question_text: `DOT SITUATION: In the problem figure, a dot is placed in the region common to the Circle and Triangle only. Select the option satisfying the identical overlap:`,
          diagram: {
            type: 'dot_situation',
            problemFigures: [
              { shapes: [{ type: 'overlapping_regions', x: 50, y: 50, size: 50, x1: 45, y1: 50 }], label: 'Problem' }
            ],
            optionFigures: shuffled
          },
          correct_option_index: newCorrectIdx,
          explanation: `The dot lies in the intersection of Circle and Triangle (outside Rectangle). Option ${String.fromCharCode(65 + newCorrectIdx)} is the only valid figure.`
        })
        break
      }

      // ───────────────────────────────────────────────────────────────────────
      // 6. LATERAL MIRROR IMAGE REFLECTION
      // ───────────────────────────────────────────────────────────────────────
      case 5: {
        const baseShape = (qSeed % 2 === 0) ? 'arrow' : 'pinwheel'
        const rawOpts = [
          { shapes: [{ type: baseShape as any, x: 50, y: 50, size: 50, rotation: 180 }] },
          { shapes: [{ type: baseShape as any, x: 50, y: 50, size: 50, rotation: 0 }] },
          { shapes: [{ type: baseShape as any, x: 50, y: 50, size: 50, rotation: 90 }] },
          { shapes: [{ type: 'rect' as const, x: 50, y: 50, size: 40 }] }
        ]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOpts, 0, qSeed)

        questions.push({
          id: qIndex,
          question_text: `MIRROR REFLECTION: Identify the exact lateral mirror reflection of the given figure across the vertical plane ( | ):`,
          diagram: {
            type: 'mirror',
            problemFigures: [
              { shapes: [{ type: baseShape as any, x: 50, y: 50, size: 50, rotation: 0 }], label: 'Object' },
              { shapes: [{ type: 'line', x1: 50, y1: 10, x2: 50, y2: 90, stroke: '#B8212E', strokeWidth: 2 }], label: 'Mirror Plane' }
            ],
            optionFigures: shuffled
          },
          correct_option_index: newCorrectIdx,
          explanation: `A vertical mirror reflection laterally reverses left and right orientations. Option ${String.fromCharCode(65 + newCorrectIdx)} is the exact true reflection.`
        })
        break
      }

      // ───────────────────────────────────────────────────────────────────────
      // 7. UNFOLDED 3D CUBE NET LOGIC
      // ───────────────────────────────────────────────────────────────────────
      case 6: {
        const rawOpts = [
          { shapes: [{ type: 'circle' as const, x: 50, y: 50, size: 50 }] },
          { shapes: [{ type: 'star' as const, x: 50, y: 50, size: 50 }] },
          { shapes: [{ type: 'plus' as const, x: 50, y: 50, size: 50 }] },
          { shapes: [{ type: 'dot' as const, x: 50, y: 50, size: 30 }] }
        ]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOpts, 0, qSeed)

        questions.push({
          id: qIndex,
          question_text: `CUBE LOGIC: When the unfolded cross net is folded into a 3D cube, which face lies OPPOSITE to the shaded base?`,
          diagram: {
            type: 'series',
            problemFigures: [
              { shapes: [{ type: 'cube_net', x: 50, y: 50, size: 70, fill: '#B8212E', text: '★' }], label: 'Unfolded Net' }
            ],
            optionFigures: shuffled
          },
          correct_option_index: newCorrectIdx,
          explanation: `In an unfolded cube cross net, alternate squares along the same line fold into opposite parallel faces (Option ${String.fromCharCode(65 + newCorrectIdx)}).`
        })
        break
      }

      // ───────────────────────────────────────────────────────────────────────
      // 8. PROPORTIONAL GEOMETRIC ANALOGIES (A : B :: C : ?)
      // ───────────────────────────────────────────────────────────────────────
      case 7: {
        const rawOpts = [
          { shapes: [{ type: 'star' as const, x: 50, y: 50, size: 60 }, { type: 'triangle' as const, x: 50, y: 50, size: 30, fill: '#0A192F' }] },
          { shapes: [{ type: 'triangle' as const, x: 50, y: 50, size: 60 }, { type: 'star' as const, x: 50, y: 50, size: 30 }] },
          { shapes: [{ type: 'circle' as const, x: 50, y: 50, size: 50 }] },
          { shapes: [{ type: 'rect' as const, x: 50, y: 50, size: 50 }] }
        ]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOpts, 0, qSeed)

        questions.push({
          id: qIndex,
          question_text: `GEOMETRIC ANALOGY: Select the figure that satisfies the proportional relationship (A : B :: C : ?):`,
          diagram: {
            type: 'analogy',
            problemFigures: [
              { shapes: [{ type: 'rect', x: 50, y: 50, size: 60 }, { type: 'circle', x: 50, y: 50, size: 30, fill: '#0A192F' }], label: '(A)' },
              { shapes: [{ type: 'circle', x: 50, y: 50, size: 60 }, { type: 'rect', x: 50, y: 50, size: 30, fill: '#0A192F' }], label: '(B)' },
              { shapes: [{ type: 'triangle', x: 50, y: 50, size: 60 }, { type: 'star', x: 50, y: 50, size: 30, fill: '#0A192F' }], label: '(C)' },
            ],
            optionFigures: shuffled
          },
          correct_option_index: newCorrectIdx,
          explanation: `In pair (A : B), inner and outer figures swap positions with inverted shading. Applying this to (C) yields Option ${String.fromCharCode(65 + newCorrectIdx)}.`
        })
        break
      }

      // ───────────────────────────────────────────────────────────────────────
      // 9. PIE QUADRANT SHADING SWEEPS
      // ───────────────────────────────────────────────────────────────────────
      case 8: {
        const isClockwise = (qSeed % 2) === 0
        const step = isClockwise ? 1 : 3
        const q1 = (qSeed) % 4
        const q2 = (q1 + step) % 4
        const q3 = (q2 + step) % 4
        const correctQuad = (q3 + step) % 4

        const rawOpts = [
          { shapes: [{ type: 'pie_quadrant' as const, x: 50, y: 50, size: 50, quadrant: correctQuad }] },
          { shapes: [{ type: 'pie_quadrant' as const, x: 50, y: 50, size: 50, quadrant: (correctQuad + 1) % 4 }] },
          { shapes: [{ type: 'pie_quadrant' as const, x: 50, y: 50, size: 50, quadrant: (correctQuad + 2) % 4 }] },
          { shapes: [{ type: 'pie_quadrant' as const, x: 50, y: 50, size: 50, quadrant: (correctQuad + 3) % 4 }] },
        ]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOpts, 0, qSeed)

        questions.push({
          id: qIndex,
          question_text: `QUADRANT SWEEP: Analyze the 90° ${isClockwise ? 'clockwise' : 'anti-clockwise'} sector shading sequence to find the next state:`,
          diagram: {
            type: 'series',
            problemFigures: [
              { shapes: [{ type: 'pie_quadrant', x: 50, y: 50, size: 50, quadrant: q1 }] },
              { shapes: [{ type: 'pie_quadrant', x: 50, y: 50, size: 50, quadrant: q2 }] },
              { shapes: [{ type: 'pie_quadrant', x: 50, y: 50, size: 50, quadrant: q3 }] },
            ],
            optionFigures: shuffled
          },
          correct_option_index: newCorrectIdx,
          explanation: `The shaded quadrant rotates ${isClockwise ? 'clockwise' : 'anti-clockwise'} by 90° at each step, pointing to Option ${String.fromCharCode(65 + newCorrectIdx)}.`
        })
        break
      }

      // ───────────────────────────────────────────────────────────────────────
      // 10. CONCENTRIC TARGET RINGS LINEAR ADDITION
      // ───────────────────────────────────────────────────────────────────────
      case 9: {
        const startR = (qSeed % 2) + 1
        const c1 = startR
        const c2 = c1 + 1
        const c3 = c2 + 1
        const correctCount = c3 + 1

        const rawOpts = [
          { shapes: [{ type: 'target_rings' as const, x: 50, y: 50, size: 60, val: correctCount }] },
          { shapes: [{ type: 'target_rings' as const, x: 50, y: 50, size: 60, val: 1 }] },
          { shapes: [{ type: 'target_rings' as const, x: 50, y: 50, size: 60, val: 2 }] },
          { shapes: [{ type: 'circle' as const, x: 50, y: 50, size: 50 }] }
        ]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOpts, 0, qSeed)

        questions.push({
          id: qIndex,
          question_text: `CONCENTRIC SHELLS: Which figure continues the progressive boundary ring expansion?`,
          diagram: {
            type: 'series',
            problemFigures: [
              { shapes: [{ type: 'target_rings', x: 50, y: 50, size: 60, val: c1 }] },
              { shapes: [{ type: 'target_rings', x: 50, y: 50, size: 60, val: c2 }] },
              { shapes: [{ type: 'target_rings', x: 50, y: 50, size: 60, val: c3 }] },
            ],
            optionFigures: shuffled
          },
          correct_option_index: newCorrectIdx,
          explanation: `Each consecutive box adds exactly 1 outer boundary ring. The next figure must have ${correctCount} rings (Option ${String.fromCharCode(65 + newCorrectIdx)}).`
        })
        break
      }

      // ───────────────────────────────────────────────────────────────────────
      // 11. DICE / DOMINO POINT FACE MATHEMATICS
      // ───────────────────────────────────────────────────────────────────────
      case 10: {
        const v1 = (qSeed % 3) + 1
        const v2 = v1 + 1
        const v3 = v2 + 1
        const correctVal = v3 + 1

        const rawOpts = [
          { shapes: [{ type: 'dice_face' as const, x: 50, y: 50, size: 50, val: correctVal }] },
          { shapes: [{ type: 'dice_face' as const, x: 50, y: 50, size: 50, val: (correctVal === 6 ? 1 : correctVal + 1) }] },
          { shapes: [{ type: 'dice_face' as const, x: 50, y: 50, size: 50, val: (correctVal === 1 ? 5 : correctVal - 1) }] },
          { shapes: [{ type: 'rect' as const, x: 50, y: 50, size: 50 }] }
        ]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOpts, 0, qSeed)

        questions.push({
          id: qIndex,
          question_text: `DOMINO VALUE LOGIC: Determine the missing face following the point addition progression:`,
          diagram: {
            type: 'series',
            problemFigures: [
              { shapes: [{ type: 'dice_face', x: 50, y: 50, size: 50, val: v1 }] },
              { shapes: [{ type: 'dice_face', x: 50, y: 50, size: 50, val: v2 }] },
              { shapes: [{ type: 'dice_face', x: 50, y: 50, size: 50, val: v3 }] },
            ],
            optionFigures: shuffled
          },
          correct_option_index: newCorrectIdx,
          explanation: `Point count increases by +1 each stage (${v1} → ${v2} → ${v3} → ${correctVal}). Option ${String.fromCharCode(65 + newCorrectIdx)} has ${correctVal} points.`
        })
        break
      }

      // ───────────────────────────────────────────────────────────────────────
      // 12. MILITARY CHEVRON RANK STRIPE PROGRESSION
      // ───────────────────────────────────────────────────────────────────────
      case 11: {
        const startC = (qSeed % 2) + 1
        const p1 = startC
        const p2 = p1 + 1
        const p3 = p2 + 1
        const correctCount = p3 + 1

        const makeChevrons = (c: number) => {
          const list: DiagramShape[] = []
          for (let idx = 0; idx < c; idx++) {
            list.push({ type: 'chevron', x: 50, y: 35 + idx * 12, size: 40 })
          }
          return list
        }

        const rawOpts = [
          { shapes: makeChevrons(correctCount) },
          { shapes: makeChevrons(1) },
          { shapes: [{ type: 'star' as const, x: 50, y: 50, size: 40 }] },
          { shapes: [{ type: 'cross' as const, x: 50, y: 50, size: 40 }] }
        ]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOpts, 0, qSeed)

        questions.push({
          id: qIndex,
          question_text: `CHEVRON RANK PROGRESSION: Identify the figure that follows the ascending chevron stripe sequence:`,
          diagram: {
            type: 'series',
            problemFigures: [
              { shapes: makeChevrons(p1) },
              { shapes: makeChevrons(p2) },
              { shapes: makeChevrons(p3) },
            ],
            optionFigures: shuffled
          },
          correct_option_index: newCorrectIdx,
          explanation: `Each box increments by +1 chevron stripe. Figure 4 requires ${correctCount} chevrons (Option ${String.fromCharCode(65 + newCorrectIdx)}).`
        })
        break
      }

      // ───────────────────────────────────────────────────────────────────────
      // 13. DIVIDED BOX STRIPE PARTITIONS
      // ───────────────────────────────────────────────────────────────────────
      case 12: {
        const rawOpts = [
          { shapes: [{ type: 'divided_box' as const, x: 50, y: 50, size: 55, stripes: 4 }] },
          { shapes: [{ type: 'divided_box' as const, x: 50, y: 50, size: 55, stripes: 1 }] },
          { shapes: [{ type: 'rect' as const, x: 50, y: 50, size: 50 }] },
          { shapes: [{ type: 'circle' as const, x: 50, y: 50, size: 50 }] }
        ]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOpts, 0, qSeed)

        questions.push({
          id: qIndex,
          question_text: `CROSSHATCH PARTITION: Which figure correctly completes the internal box partitioning sequence?`,
          diagram: {
            type: 'series',
            problemFigures: [
              { shapes: [{ type: 'divided_box', x: 50, y: 50, size: 55, stripes: 1 }] },
              { shapes: [{ type: 'divided_box', x: 50, y: 50, size: 55, stripes: 2 }] },
              { shapes: [{ type: 'divided_box', x: 50, y: 50, size: 55, stripes: 3 }] },
            ],
            optionFigures: shuffled
          },
          correct_option_index: newCorrectIdx,
          explanation: `The box adds internal division lines progressively (1 vertical → 2 orthogonal → 3 diagonal → 4 quad-intersecting). Option ${String.fromCharCode(65 + newCorrectIdx)} has 4 divisions.`
        })
        break
      }

      // ───────────────────────────────────────────────────────────────────────
      // 14. POLYGON SIDE INCREMENTS (3 -> 4 -> 5 -> 6 sides)
      // ───────────────────────────────────────────────────────────────────────
      case 13: {
        const rawOpts = [
          { shapes: [{ type: 'hexagon' as const, x: 50, y: 50, size: 55 }] },
          { shapes: [{ type: 'circle' as const, x: 50, y: 50, size: 50 }] },
          { shapes: [{ type: 'star' as const, x: 50, y: 50, size: 50 }] },
          { shapes: [{ type: 'triangle' as const, x: 50, y: 50, size: 50 }] }
        ]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOpts, 0, qSeed)

        questions.push({
          id: qIndex,
          question_text: `POLYGON SIDES: Which regular polygon correctly continues the side-count progression?`,
          diagram: {
            type: 'series',
            problemFigures: [
              { shapes: [{ type: 'triangle', x: 50, y: 50, size: 50 }] },
              { shapes: [{ type: 'rect', x: 50, y: 50, size: 50 }] },
              { shapes: [{ type: 'pentagon', x: 50, y: 50, size: 55 }] },
            ],
            optionFigures: shuffled
          },
          correct_option_index: newCorrectIdx,
          explanation: `Number of polygon edges increases by +1 each time (Triangle 3 → Square 4 → Pentagon 5 → Hexagon 6). Option ${String.fromCharCode(65 + newCorrectIdx)} is the 6-sided hexagon.`
        })
        break
      }

      // ───────────────────────────────────────────────────────────────────────
      // 15. HOURGLASS FLIP & TILTS
      // ───────────────────────────────────────────────────────────────────────
      case 14: {
        const h1 = 0
        const h2 = 45
        const h3 = 90
        const correctH = 135

        const rawOpts = [
          { shapes: [{ type: 'hourglass' as const, x: 50, y: 50, size: 50, rotation: correctH }] },
          { shapes: [{ type: 'hourglass' as const, x: 50, y: 50, size: 50, rotation: (correctH + 90) % 360 }] },
          { shapes: [{ type: 'rect' as const, x: 50, y: 50, size: 40 }] },
          { shapes: [{ type: 'circle' as const, x: 50, y: 50, size: 40 }] }
        ]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOpts, 0, qSeed)

        questions.push({
          id: qIndex,
          question_text: `HOURGLASS TILT: Select the figure that satisfies the progressive 45° angular tilt:`,
          diagram: {
            type: 'series',
            problemFigures: [
              { shapes: [{ type: 'hourglass', x: 50, y: 50, size: 50, rotation: h1 }] },
              { shapes: [{ type: 'hourglass', x: 50, y: 50, size: 50, rotation: h2 }] },
              { shapes: [{ type: 'hourglass', x: 50, y: 50, size: 50, rotation: h3 }] },
            ],
            optionFigures: shuffled
          },
          correct_option_index: newCorrectIdx,
          explanation: `The hourglass shape tilts clockwise by 45° in each step, leading directly to Option ${String.fromCharCode(65 + newCorrectIdx)}.`
        })
        break
      }

      // ───────────────────────────────────────────────────────────────────────
      // 16. PINWHEEL / PROPELLER ROTATION
      // ───────────────────────────────────────────────────────────────────────
      default: {
        const r1 = 0
        const r2 = 45
        const r3 = 90
        const correctRot = 135

        const rawOpts = [
          { shapes: [{ type: 'pinwheel' as const, x: 50, y: 50, size: 50, rotation: correctRot }] },
          { shapes: [{ type: 'pinwheel' as const, x: 50, y: 50, size: 50, rotation: (correctRot + 90) % 360 }] },
          { shapes: [{ type: 'pinwheel' as const, x: 50, y: 50, size: 50, rotation: (correctRot + 180) % 360 }] },
          { shapes: [{ type: 'circle' as const, x: 50, y: 50, size: 50 }] }
        ]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOpts, 0, qSeed)

        questions.push({
          id: qIndex,
          question_text: `PINWHEEL ROTATION: Which propeller figure correctly completes the 45° rotation series?`,
          diagram: {
            type: 'series',
            problemFigures: [
              { shapes: [{ type: 'pinwheel', x: 50, y: 50, size: 50, rotation: r1 }] },
              { shapes: [{ type: 'pinwheel', x: 50, y: 50, size: 50, rotation: r2 }] },
              { shapes: [{ type: 'pinwheel', x: 50, y: 50, size: 50, rotation: r3 }] },
            ],
            optionFigures: shuffled
          },
          correct_option_index: newCorrectIdx,
          explanation: `The vanes rotate clockwise by 45° per frame, leading to Option ${String.fromCharCode(65 + newCorrectIdx)}.`
        })
        break
      }
    }
  }

  return questions
}

// ═════════════════════════════════════════════════════════════════════════════
// 2. UNIQUE VERBAL INTELLIGENCE GENERATOR (84 MCQs / Test)
// ═════════════════════════════════════════════════════════════════════════════
export function getUniqueVerbalQuestions(
  testNumber: number, 
  count: number = 84,
  courseKey: string = 'general'
): Array<{
  id: number
  question_text: string
  options: string[]
  correct_option_index: number
  explanation: string
}> {
  const questions: Array<{
    id: number
    question_text: string
    options: string[]
    correct_option_index: number
    explanation: string
  }> = []

  const courseSalt = stringHash(courseKey)
  const seedBase = (testNumber - 1) * count

  for (let i = 0; i < count; i++) {
    const qIndex = seedBase + i + 1
    const categoryMod = i % 12
    const questionSeed = (courseSalt * 43) + (testNumber * 1000) + (i * 17)

    switch (categoryMod) {
      case 0: {
        const start = 2 + ((questionSeed % 7) * 3) + ((i % 5) * 4)
        const diff = ((questionSeed + i) % 6) + 3
        const n1 = start
        const n2 = n1 + diff
        const n3 = n2 + diff
        const n4 = n3 + diff
        const n5 = n4 + diff

        const rawOptions = [`${n5}`, `${n5 + 2}`, `${n5 - 3}`, `${n5 + diff}`]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOptions, 0, questionSeed)

        questions.push({
          id: qIndex,
          question_text: `Which number continues the sequence? ${n1}, ${n2}, ${n3}, ${n4}, ...`,
          options: shuffled,
          correct_option_index: newCorrectIdx,
          explanation: `Each successive term increases by +${diff}. Therefore: ${n4} + ${diff} = ${n5}.`
        })
        break
      }

      case 1: {
        const factor = (i % 3) + 2
        const base = (questionSeed % 4) + 2
        const v1 = base
        const v2 = v1 * factor
        const v3 = v2 * factor
        const v4 = v3 * factor

        const rawOptions = [`${v4}`, `${v4 - factor}`, `${v4 + factor * 2}`, `${v3 * (factor + 1)}`]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOptions, 0, questionSeed)

        questions.push({
          id: qIndex,
          question_text: `Find the next number in the geometric series: ${v1}, ${v2}, ${v3}, ...`,
          options: shuffled,
          correct_option_index: newCorrectIdx,
          explanation: `Each number is multiplied by ${factor}. Thus, ${v3} × ${factor} = ${v4}.`
        })
        break
      }

      case 2: {
        const cipherPairs = [
          { original: 'ARMY', code: 'BSNZ', target: 'NAVY', targetCode: 'OBWZ', wrong: ['PBXA', 'MCUX', 'NAWZ'], rule: '+1 to each letter' },
          { original: 'PILOT', code: 'QJMPU', target: 'RADAR', targetCode: 'SBEBS', wrong: ['RCEBS', 'TCFCT', 'SACAS'], rule: '+1 to each letter' },
          { original: 'BRAVE', code: 'DTBXG', target: 'HONOR', targetCode: 'JQPQT', wrong: ['IPQPS', 'KRQSU', 'GMPNQ'], rule: '+2 to each letter' },
          { original: 'TANK', code: 'UCPM', target: 'GUNS', targetCode: 'HWOU', wrong: ['IVPV', 'FTMR', 'HVOT'], rule: '+1, +2 pattern' },
          { original: 'DEFENCE', code: 'EDGFOED', target: 'VALIANT', targetCode: 'WBMMBOU', wrong: ['XBNNBPU', 'UBKHZMS', 'VAKIANU'], rule: '+1 shift' }
        ]
        const c = cipherPairs[(questionSeed + i) % cipherPairs.length]
        const rawOptions = [c.targetCode, c.wrong[0], c.wrong[1], c.wrong[2]]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOptions, 0, questionSeed)

        questions.push({
          id: qIndex,
          question_text: `If '${c.original}' is written as '${c.code}' in a military code, how will '${c.target}' be written?`,
          options: shuffled,
          correct_option_index: newCorrectIdx,
          explanation: `The cipher rule is ${c.rule}. Applying this to '${c.target}' gives '${c.targetCode}'.`
        })
        break
      }

      case 3: {
        const directions = [
          { text: "A cadet marches 10 meters North, turns right and walks 5 meters, then turns right again and walks 10 meters. In which direction is the cadet from the starting point?", ans: "East", wrong: ["North", "South", "West"] },
          { text: "A surveillance drone flies 15 km West, turns South and flies 8 km, then turns East and flies 15 km. How far and in which direction is it from the base?", ans: "8 km South", wrong: ["8 km North", "15 km East", "23 km South-West"] },
          { text: "If North becomes East and West becomes North, what will South become?", ans: "West", wrong: ["North", "East", "South-East"] },
          { text: "A soldier facing East turns 90° clockwise, then 180° anti-clockwise. Which direction is the soldier now facing?", ans: "North", wrong: ["South", "West", "South-East"] }
        ]
        const d = directions[(questionSeed + i) % directions.length]
        const rawOptions = [d.ans, d.wrong[0], d.wrong[1], d.wrong[2]]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOptions, 0, questionSeed)

        questions.push({
          id: qIndex,
          question_text: d.text,
          options: shuffled,
          correct_option_index: newCorrectIdx,
          explanation: `Following the exact coordinates path confirms the direction is '${d.ans}'.`
        })
        break
      }

      case 4: {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        const startDayIdx = (questionSeed + i) % 7
        const targetDate = 15 + ((i % 5) * 3)
        const targetDayIdx = (startDayIdx + (targetDate - 1)) % 7
        
        const ansDay = days[targetDayIdx]
        const wrongDays = days.filter(d => d !== ansDay).slice(0, 3)
        const rawOptions = [ansDay, wrongDays[0], wrongDays[1], wrongDays[2]]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOptions, 0, questionSeed)

        questions.push({
          id: qIndex,
          question_text: `If the 1st day of a month falls on a ${days[startDayIdx]}, which day of the week will the ${targetDate}th of the same month be?`,
          options: shuffled,
          correct_option_index: newCorrectIdx,
          explanation: `Number of days elapsed = ${targetDate} - 1 = ${targetDate - 1} days. Counting ${(targetDate - 1) % 7} days forward from ${days[startDayIdx]} lands on ${ansDay}.`
        })
        break
      }

      case 5: {
        const speedKmh = 54 + ((i % 6) * 18)
        const speedMs = (speedKmh * 5) / 18
        const timeSec = 12 + ((i % 4) * 4)
        const dist = speedMs * timeSec

        const rawOptions = [`${dist} meters`, `${dist + 60} meters`, `${dist - 40} meters`, `${dist + 100} meters`]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOptions, 0, questionSeed)

        questions.push({
          id: qIndex,
          question_text: `A military train traveling at ${speedKmh} km/h crosses a signal post in ${timeSec} seconds. What is the length of the train?`,
          options: shuffled,
          correct_option_index: newCorrectIdx,
          explanation: `Speed = ${speedKmh} × (5/18) = ${speedMs} m/s. Length = Speed × Time = ${speedMs} × ${timeSec} = ${dist} meters.`
        })
        break
      }

      case 6: {
        const totalMarks = 120 + ((i % 6) * 20)
        const percentage = 65 + ((i % 5) * 5)
        const scored = Math.round((percentage / 100) * totalMarks)

        const rawOptions = [`${scored} marks`, `${scored - 8} marks`, `${scored + 12} marks`, `${scored + 24} marks`]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOptions, 0, questionSeed)

        questions.push({
          id: qIndex,
          question_text: `A candidate secured ${percentage}% marks in the initial selection test out of a total of ${totalMarks} marks. How many marks did the candidate score?`,
          options: shuffled,
          correct_option_index: newCorrectIdx,
          explanation: `Marks scored = (${percentage} ÷ 100) × ${totalMarks} = ${scored} marks.`
        })
        break
      }

      case 7: {
        const rankPuzzles = [
          { q: "Which rank in the Pakistan Army is equivalent to a 'Squadron Leader' in the PAF?", a: "Major", w: ["Captain", "Lieutenant Colonel", "Brigadier"], exp: "Squadron Leader (PAF), Major (Army), and Lieutenant Commander (Navy) are equivalent OF-3 ranks." },
          { q: "Which rank in the Pakistan Navy corresponds directly to an Army 'Brigadier'?", a: "Commodore", w: ["Captain", "Rear Admiral", "Commander"], exp: "Brigadier (Army), Air Commodore (PAF), and Commodore (Navy) are equivalent 1-star ranks." },
          { q: "What is the highest operational 4-star rank in the Pakistan Air Force?", a: "Air Chief Marshal", w: ["Air Marshal", "Air Vice Marshal", "Air Commodore"], exp: "Air Chief Marshal is the 4-star rank held by the Chief of the Air Staff." },
          { q: "In the Pakistan Army, which rank is immediately senior to 'Major'?", a: "Lieutenant Colonel", w: ["Captain", "Colonel", "Brigadier"], exp: "Ascending order: Captain → Major → Lieutenant Colonel → Colonel." }
        ]
        const r = rankPuzzles[(questionSeed + i) % rankPuzzles.length]
        const rawOptions = [r.a, r.w[0], r.w[1], r.w[2]]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOptions, 0, questionSeed)

        questions.push({
          id: qIndex,
          question_text: r.q,
          options: shuffled,
          correct_option_index: newCorrectIdx,
          explanation: r.exp
        })
        break
      }

      case 8: {
        const relations = [
          { q: "Pointing to a photograph, a cadet said: 'He is the son of the only son of my grandfather.' How is the person in the photo related to the cadet?", a: "Brother", w: ["Father", "Uncle", "Cousin"], exp: "The only son of grandfather is father; the son of father is the cadet's brother." },
          { q: "A is B's brother. C is A's father. D is C's father. How is A related to D?", a: "Grandson", w: ["Son", "Grandfather", "Brother"], exp: "D is the grandfather of A, so A is the grandson of D." },
          { q: "Introducing a lady, Ali said: 'Her mother is the only daughter of my mother-in-law.' How is the lady related to Ali?", a: "Daughter", w: ["Sister", "Niece", "Wife"], exp: "The only daughter of mother-in-law is Ali's wife; her daughter is Ali's daughter." }
        ]
        const rel = relations[(questionSeed + i) % relations.length]
        const rawOptions = [rel.a, rel.w[0], rel.w[1], rel.w[2]]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOptions, 0, questionSeed)

        questions.push({
          id: qIndex,
          question_text: rel.q,
          options: shuffled,
          correct_option_index: newCorrectIdx,
          explanation: rel.exp
        })
        break
      }

      case 9: {
        const oddSets = [
          { items: ["Submarine", "Frigate", "Destroyer", "Helicopter"], odd: "Helicopter", exp: "Helicopter is an aircraft; the others are naval warships." },
          { items: ["Mirage", "Thunder JF-17", "F-16", "Al-Khalid"], odd: "Al-Khalid", exp: "Al-Khalid is a main battle tank; the others are combat aircraft." },
          { items: ["Thermometer", "Barometer", "Hygrometer", "Speedometer"], odd: "Speedometer", exp: "Speedometer measures speed; others measure atmospheric variables." },
          { items: ["Peshawar", "Quetta", "Lahore", "Kakul"], odd: "Kakul", exp: "Kakul is an academy town; others are provincial capitals." }
        ]
        const os = oddSets[(questionSeed + i) % oddSets.length]
        const wrongChoices = os.items.filter(item => item !== os.odd)
        const rawOptions = [os.odd, wrongChoices[0], wrongChoices[1], wrongChoices[2]]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOptions, 0, questionSeed)

        questions.push({
          id: qIndex,
          question_text: "Identify the word that does NOT belong to the group:",
          options: shuffled,
          correct_option_index: newCorrectIdx,
          explanation: os.exp
        })
        break
      }

      case 10: {
        const analogies = [
          { q: "SOLDIER is to REGIMENT as PILOT is to:", a: "SQUADRON", w: ["AIRCRAFT", "AIRPORT", "FLIGHT"], exp: "Soldiers belong to a regiment; pilots belong to a squadron." },
          { q: "RADAR is to DETECTION as COMPASS is to:", a: "NAVIGATION", w: ["DIRECTION", "ALTITUDE", "PRESSURE"], exp: "Radar is used for detection; compass for navigation." },
          { q: "DOCTOR is to STETHOSCOPE as SOLDIER is to:", a: "RIFLE", w: ["UNIFORM", "BARRACKS", "BULLET"], exp: "Stethoscope is a doctor's tool; rifle is a soldier's primary weapon." }
        ]
        const ana = analogies[(questionSeed + i) % analogies.length]
        const rawOptions = [ana.a, ana.w[0], ana.w[1], ana.w[2]]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOptions, 0, questionSeed)

        questions.push({
          id: qIndex,
          question_text: ana.q,
          options: shuffled,
          correct_option_index: newCorrectIdx,
          explanation: ana.exp
        })
        break
      }

      default: {
        const vocabBank = [
          { q: "FORTITUDE", ant: "Cowardice", w: ["Courage", "Resilience", "Stamina"], exp: "Fortitude means mental strength in facing adversity; cowardice is the antonym." },
          { q: "VIGILANT", ant: "Negligent", w: ["Alert", "Watchful", "Attentive"], exp: "Vigilant means watchful; negligent means careless." },
          { q: "INTREPID", ant: "Fearful", w: ["Brave", "Dauntless", "Heroic"], exp: "Intrepid means fearless; fearful is the opposite." },
          { q: "STEADFAST", ant: "Fickle", w: ["Loyal", "Firm", "Resolute"], exp: "Steadfast means loyal and unwavering; fickle means changeable." }
        ]
        const v = vocabBank[(questionSeed + i) % vocabBank.length]
        const rawOptions = [v.ant, v.w[0], v.w[1], v.w[2]]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOptions, 0, questionSeed)

        questions.push({
          id: qIndex,
          question_text: `Choose the word that is most nearly OPPOSITE in meaning to '${v.q}':`,
          options: shuffled,
          correct_option_index: newCorrectIdx,
          explanation: v.exp
        })
        break
      }
    }
  }

  return questions
}

// ═════════════════════════════════════════════════════════════════════════════
// 3. UNIQUE ACADEMIC SCREENING GENERATOR (50 MCQs / Test)
// ═════════════════════════════════════════════════════════════════════════════
export function getUniqueAcademicQuestions(
  testNumber: number, 
  count: number = 50,
  courseKey: string = 'general'
): Array<{
  id: number
  question_text: string
  options: string[]
  correct_option_index: number
  explanation: string
}> {
  const questions: Array<{
    id: number
    question_text: string
    options: string[]
    correct_option_index: number
    explanation: string
  }> = []

  const courseSalt = stringHash(courseKey)
  const seedBase = (testNumber - 1) * count

  for (let i = 0; i < count; i++) {
    const qIndex = seedBase + i + 1
    const subjectMod = i % 5
    const questionSeed = (courseSalt * 53) + (testNumber * 3000) + (i * 29)

    if (subjectMod === 0) {
      const physicsPool = [
        { q: `What is the standard value of acceleration due to gravity (g) at Earth's surface?`, a: `9.8 m/s²`, w: [`8.9 m/s²`, `10.8 m/s²`, `9.2 m/s²`], exp: `Standard gravitational acceleration g ≈ 9.8 m/s² (or 9.81 m/s²).` },
        { q: `According to Newton's Second Law of Motion, the rate of change of momentum is proportional to:`, a: `Net Applied Force`, w: [`Applied Torque`, `Kinetic Energy`, `Velocity`], exp: `Newton's 2nd Law states F = dp/dt = ma.` },
        { q: `The dimensional formula for Work and Kinetic Energy is:`, a: `[ML²T⁻²]`, w: [`[MLT⁻²]`, `[ML²T⁻¹]`, `[M⁻¹L²T⁻²]`], exp: `Work = Force × Distance = [MLT⁻²][L] = [ML²T⁻²].` },
        { q: `Which electromagnetic radiation has the highest energy and shortest wavelength?`, a: `Gamma Rays`, w: [`X-Rays`, `Ultraviolet`, `Radio Waves`], exp: `Gamma rays carry the highest frequency and energy in the EM spectrum.` },
        { q: `The SI unit of Electrical Capacitance is:`, a: `Farad`, w: [`Henry`, `Weber`, `Tesla`], exp: `Capacitance C = Q/V is measured in Farads (F).` }
      ]
      const item = physicsPool[(questionSeed + i) % physicsPool.length]
      const rawOptions = [item.a, item.w[0], item.w[1], item.w[2]]
      const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOptions, 0, questionSeed)

      questions.push({
        id: qIndex,
        question_text: item.q,
        options: shuffled,
        correct_option_index: newCorrectIdx,
        explanation: item.exp
      })
    } else if (subjectMod === 1) {
      const mathPool = [
        { q: `The derivative of sin(x) with respect to x is:`, a: `cos(x)`, w: [`-cos(x)`, `tan(x)`, `-sin(x)`], exp: `d/dx[sin(x)] = cos(x).` },
        { q: `If the determinant of a square matrix A is zero (|A| = 0), the matrix is termed:`, a: `Singular Matrix`, w: [`Non-Singular Matrix`, `Identity Matrix`, `Diagonal Matrix`], exp: `A matrix whose determinant is 0 has no inverse and is called a singular matrix.` },
        { q: `The fundamental identity sin²(θ) + cos²(θ) is identically equal to:`, a: `1`, w: [`0`, `tan(θ)`, `2`], exp: `This is the fundamental Pythagorean identity of trigonometry.` },
        { q: `The slope of any horizontal line parallel to the X-axis is:`, a: `0`, w: [`1`, `Undefined (∞)`, `-1`], exp: `Horizontal lines have zero vertical change (Δy = 0), so slope m = 0.` },
        { q: `The solution set of the algebraic equation x² - 25 = 0 is:`, a: `{±5}`, w: [`{5}`, `{±10}`, `{±25}`], exp: `x² = 25 ⇒ x = ±√25 = ±5.` }
      ]
      const item = mathPool[(questionSeed + i) % mathPool.length]
      const rawOptions = [item.a, item.w[0], item.w[1], item.w[2]]
      const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOptions, 0, questionSeed)

      questions.push({
        id: qIndex,
        question_text: item.q,
        options: shuffled,
        correct_option_index: newCorrectIdx,
        explanation: item.exp
      })
    } else if (subjectMod === 2) {
      const engPool = [
        { q: `Complete the sentence: The officer was congratulated ______ his outstanding valor.`, a: `on`, w: [`for`, `with`, `at`], exp: `The appropriate preposition after 'congratulate' is 'on'.` },
        { q: `Choose the correct passive voice: 'The cadets raised the national flag.'`, a: `The national flag was raised by the cadets.`, w: [`The national flag is raised by the cadets.`, `The national flag had been raised.`, `The cadets were raising the flag.`], exp: `Past simple active ('raised') becomes 'was raised' in the passive voice.` },
        { q: `Select the correct synonym for 'METICULOUS':`, a: `Extremely careful and precise`, w: [`Careless`, `Aggressive`, `Sluggish`], exp: `Meticulous means showing great attention to detail; very careful and precise.` },
        { q: `Complete with the correct preposition: 'She has been serving here ______ 2021.'`, a: `since`, w: [`for`, `from`, `during`], exp: `'Since' is used to denote a specific starting point in past time (2021).` },
        { q: `Identify the correctly spelled military rank:`, a: `Lieutenant`, w: [`Leutenant`, `Lieutenent`, `Leftenant`], exp: `'Lieutenant' is the correct standard spelling.` }
      ]
      const item = engPool[(questionSeed + i) % engPool.length]
      const rawOptions = [item.a, item.w[0], item.w[1], item.w[2]]
      const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOptions, 0, questionSeed)

      questions.push({
        id: qIndex,
        question_text: item.q,
        options: shuffled,
        correct_option_index: newCorrectIdx,
        explanation: item.exp
      })
    } else if (subjectMod === 3) {
      const chemPool = [
        { q: `The pH value of pure neutral water at 25°C is:`, a: `7.0`, w: [`5.5`, `8.5`, `0.0`], exp: `Pure neutral water has equal concentrations of H+ and OH- ions, yielding pH = 7.0.` },
        { q: `Avogadro's constant (particles per mole) is approximately equal to:`, a: `6.022 × 10²³`, w: [`6.022 × 10²²`, `3.00 × 10⁸`, `1.602 × 10⁻¹⁹`], exp: `Avogadro's number NA ≈ 6.022 × 10²³ mol⁻¹.` },
        { q: `Which of the following is chemically classified as an inert (noble) gas?`, a: `Helium`, w: [`Nitrogen`, `Oxygen`, `Chlorine`], exp: `Helium (He) has a fully stable valence shell and is chemically unreactive.` },
        { q: `The typical oxidation number of Oxygen in standard water (H₂O) is:`, a: `-2`, w: [`+2`, `-1`, `0`], exp: `Oxygen gains two electrons from hydrogen atoms, exhibiting an oxidation state of -2.` }
      ]
      const item = chemPool[(questionSeed + i) % chemPool.length]
      const rawOptions = [item.a, item.w[0], item.w[1], item.w[2]]
      const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOptions, 0, questionSeed)

      questions.push({
        id: qIndex,
        question_text: item.q,
        options: shuffled,
        correct_option_index: newCorrectIdx,
        explanation: item.exp
      })
    } else {
      const gkPool = [
        { q: `The highest military decoration of the Islamic Republic of Pakistan is:`, a: `Nishan-e-Haider`, w: [`Hilal-e-Jurat`, `Sitara-e-Jurat`, `Tamgha-e-Basalat`], exp: `Nishan-e-Haider is Pakistan's highest military gallantry award.` },
        { q: `In which year did Pakistan conduct its historic nuclear tests (Youm-e-Takbeer)?`, a: `1998`, w: [`1974`, `1988`, `2002`], exp: `Pakistan became a declared nuclear power following tests in Chagai on May 28, 1998.` },
        { q: `The Pakistan Military Academy (PMA) is situated at:`, a: `Kakul, Abbottabad`, w: [`Risalpur`, `Rawalpindi`, `Nowshera`], exp: `PMA Kakul was established in October 1947 in Abbottabad.` },
        { q: `The PAF College of Aeronautical Engineering (CAE) is located at:`, a: `Risalpur`, w: [`Kamra`, `Chaklala`, `Sargodha`], exp: `CAE is part of the Pakistan Air Force Academy at Risalpur.` },
        { q: `What is the height of Mount K2 (Godwin-Austen), Pakistan's highest peak?`, a: `8,611 meters`, w: [`8,126 meters`, `8,047 meters`, `8,848 meters`], exp: `K2 is the world's 2nd highest peak at 8,611 meters (28,251 ft).` }
      ]
      const item = gkPool[(questionSeed + i) % gkPool.length]
      const rawOptions = [item.a, item.w[0], item.w[1], item.w[2]]
      const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOptions, 0, questionSeed)

      questions.push({
        id: qIndex,
        question_text: item.q,
        options: shuffled,
        correct_option_index: newCorrectIdx,
        explanation: item.exp
      })
    }
  }

  return questions
}
