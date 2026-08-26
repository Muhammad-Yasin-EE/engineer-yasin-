import { DiagramConfig } from '@/components/NonVerbalDiagram'

// Deterministic Pseudo-Random Generator
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

// Deterministic Array Shuffle with Correct Option Tracking
function shuffleWithCorrectIndex<T>(items: T[], correctIdx: number, seed: number): { shuffled: T[]; newCorrectIdx: number } {
  const indexed = items.map((item, idx) => ({ item, isCorrect: idx === correctIdx }))
  
  // Fisher-Yates shuffle with deterministic seed
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
// 1. COMPREHENSIVE UNIQUE VERBAL INTELLIGENCE GENERATOR (84 MCQs / Test)
// ═════════════════════════════════════════════════════════════════════════════
export function getUniqueVerbalQuestions(testNumber: number, count: number = 84): Array<{
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

  const seedBase = (testNumber - 1) * count

  for (let i = 0; i < count; i++) {
    const qIndex = seedBase + i + 1
    const categoryMod = i % 12
    const questionSeed = testNumber * 1000 + i * 17

    switch (categoryMod) {
      // 1. Arithmetic Difference Progression
      case 0: {
        const start = 2 + (testNumber * 2) + (i % 5) * 3
        const diff = (i % 6) + 4
        const n1 = start
        const n2 = n1 + diff
        const n3 = n2 + diff
        const n4 = n3 + diff
        const n5 = n4 + diff // Correct answer
        
        const rawOptions = [`${n5}`, `${n5 + 2}`, `${n5 - 3}`, `${n5 + diff}`]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOptions, 0, questionSeed)

        questions.push({
          id: qIndex,
          question_text: `Which number comes next in the progression? ${n1}, ${n2}, ${n3}, ${n4}, ...`,
          options: shuffled,
          correct_option_index: newCorrectIdx,
          explanation: `In this sequence, each successive term increases by +${diff}. Therefore: ${n4} + ${diff} = ${n5}.`
        })
        break
      }

      // 2. Exponential & Multiplicative Sequence
      case 1: {
        const factor = (i % 3) + 2 // 2, 3, or 4
        const base = (testNumber % 4) + 2
        const v1 = base
        const v2 = v1 * factor
        const v3 = v2 * factor
        const v4 = v3 * factor // Correct
        
        const rawOptions = [`${v4}`, `${v4 - factor}`, `${v4 + factor * 2}`, `${v3 * (factor + 1)}`]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOptions, 0, questionSeed)

        questions.push({
          id: qIndex,
          question_text: `Find the missing term in the geometric series: ${v1}, ${v2}, ${v3}, ...`,
          options: shuffled,
          correct_option_index: newCorrectIdx,
          explanation: `Each number is multiplied by ${factor}. Thus, ${v3} × ${factor} = ${v4}.`
        })
        break
      }

      // 3. Concrete Military Coding & Decoding
      case 2: {
        const cipherPairs = [
          { original: 'ARMY', code: 'BSNZ', target: 'NAVY', targetCode: 'OBWZ', wrong: ['PBXA', 'MCUX', 'NAWZ'], rule: '+1 to each letter' },
          { original: 'PILOT', code: 'QJMPU', target: 'RADAR', targetCode: 'SBEBS', wrong: ['RCEBS', 'TCFCT', 'SACAS'], rule: '+1 to each letter' },
          { original: 'BRAVE', code: 'DTBXG', target: 'HONOR', targetCode: 'JQPQT', wrong: ['IPQPS', 'KRQSU', 'GMPNQ'], rule: '+2 to each letter' },
          { original: 'TANK', code: 'UCPM', target: 'GUNS', targetCode: 'HWOU', wrong: ['IVPV', 'FTMR', 'HVOT'], rule: '+1, +2, +1, +2 pattern' },
          { original: 'DEFENCE', code: 'EDGFOED', target: 'VALIANT', targetCode: 'WBMMBOU', wrong: ['XBNNBPU', 'UBKHZMS', 'VAKIANU'], rule: '+1 shift' }
        ]
        const c = cipherPairs[(testNumber * 3 + i) % cipherPairs.length]
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

      // 4. Direction Sense Logic
      case 3: {
        const directions = [
          { text: "A cadet marches 10 meters North, turns right and walks 5 meters, then turns right again and walks 10 meters. In which direction is the cadet from the starting point?", ans: "East", wrong: ["North", "South", "West"] },
          { text: "A surveillance drone flies 15 km West, turns South and flies 8 km, then turns East and flies 15 km. How far and in which direction is it from the base?", ans: "8 km South", wrong: ["8 km North", "15 km East", "23 km South-West"] },
          { text: "If North becomes East and West becomes North, what will South become?", ans: "West", wrong: ["North", "East", "South-East"] },
          { text: "A soldier facing East turns 90° clockwise, then 180° anti-clockwise. Which direction is the soldier now facing?", ans: "North", wrong: ["South", "West", "South-East"] }
        ]
        const d = directions[(testNumber + i) % directions.length]
        const rawOptions = [d.ans, d.wrong[0], d.wrong[1], d.wrong[2]]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOptions, 0, questionSeed)

        questions.push({
          id: qIndex,
          question_text: d.text,
          options: shuffled,
          correct_option_index: newCorrectIdx,
          explanation: `Tracing the exact movement path coordinates confirms the answer is '${d.ans}'.`
        })
        break
      }

      // 5. Calendar & Day Calculation Logic
      case 4: {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        const startDayIdx = (testNumber + i) % 7
        const targetDate = 15 + ((i % 5) * 3) // e.g. 15, 18, 21, 24, 27
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
          explanation: `Number of days elapsed = ${targetDate} - 1 = ${targetDate - 1} days. ${targetDate - 1} ÷ 7 leaves a remainder of ${(targetDate - 1) % 7}. Counting ${(targetDate - 1) % 7} days ahead from ${days[startDayIdx]} gives ${ansDay}.`
        })
        break
      }

      // 6. Realistic Speed, Distance & Convoy Math
      case 5: {
        const speedKmh = 54 + ((i % 6) * 18) // 54, 72, 90, 108, 126 km/h
        const speedMs = (speedKmh * 5) / 18   // Exact integers: 15, 20, 25, 30, 35 m/s
        const timeSec = 12 + ((i % 4) * 4)   // 12, 16, 20, 24 s
        const dist = speedMs * timeSec

        const rawOptions = [`${dist} meters`, `${dist + 60} meters`, `${dist - 40} meters`, `${dist + 100} meters`]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOptions, 0, questionSeed)

        questions.push({
          id: qIndex,
          question_text: `A military train running at ${speedKmh} km/h passes an observation signal in ${timeSec} seconds. What is the length of the train?`,
          options: shuffled,
          correct_option_index: newCorrectIdx,
          explanation: `Speed in m/s = ${speedKmh} × (5/18) = ${speedMs} m/s. Length = Speed × Time = ${speedMs} m/s × ${timeSec} s = ${dist} meters.`
        })
        break
      }

      // 7. Percentage & Examination Marks Logic
      case 6: {
        const totalMarks = 120 + ((i % 6) * 20) // 120, 140, 160, 180, 200
        const percentage = 65 + ((i % 5) * 5)   // 65%, 70%, 75%, 80%, 85%
        const scored = Math.round((percentage / 100) * totalMarks)

        const rawOptions = [`${scored} marks`, `${scored - 8} marks`, `${scored + 12} marks`, `${scored + 24} marks`]
        const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOptions, 0, questionSeed)

        questions.push({
          id: qIndex,
          question_text: `A candidate secured ${percentage}% marks in the initial academic examination out of a maximum of ${totalMarks} marks. How many marks did the candidate achieve?`,
          options: shuffled,
          correct_option_index: newCorrectIdx,
          explanation: `Marks obtained = (${percentage} ÷ 100) × ${totalMarks} = ${scored} marks.`
        })
        break
      }

      // 8. Military Rank Hierarchy & Operational Roles
      case 7: {
        const rankPuzzles = [
          { q: "Which rank in the Pakistan Army is equivalent to a 'Squadron Leader' in the Pakistan Air Force?", a: "Major", w: ["Captain", "Lieutenant Colonel", "Brigadier"], exp: "Squadron Leader (PAF), Major (Army), and Lieutenant Commander (Navy) are all equivalent OF-3 level ranks." },
          { q: "Which rank in the Pakistan Navy corresponds directly to an Army 'Brigadier'?", a: "Commodore", w: ["Captain", "Rear Admiral", "Commander"], exp: "Brigadier (Army), Air Commodore (PAF), and Commodore (Navy) are equivalent 1-star senior ranks." },
          { q: "What is the highest commissioned rank in the Pakistan Air Force?", a: "Air Chief Marshal", w: ["Air Marshal", "Air Vice Marshal", "Air Commodore"], exp: "Air Chief Marshal is the 4-star rank held by the Chief of the Air Staff." },
          { q: "In the Pakistan Army, which rank is immediately senior to 'Major'?", a: "Lieutenant Colonel", w: ["Captain", "Colonel", "Brigadier"], exp: "The ascending order is Captain → Major → Lieutenant Colonel → Colonel." }
        ]
        const r = rankPuzzles[(testNumber * 2 + i) % rankPuzzles.length]
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

      // 9. Blood Relation Logic
      case 8: {
        const relations = [
          { q: "Pointing to a photograph, a cadet said: 'He is the son of the only son of my grandfather.' How is the person in the photo related to the cadet?", a: "Brother", w: ["Father", "Uncle", "Cousin"], exp: "The only son of the grandfather is the cadet's father. The son of the father is the cadet's brother (or the cadet himself)." },
          { q: "A is B's brother. C is A's father. D is C's father. How is A related to D?", a: "Grandson", w: ["Son", "Grandfather", "Brother"], exp: "D is the grandfather of A, so A is the grandson of D." },
          { q: "Introducing a lady, Ali said: 'Her mother is the only daughter of my mother-in-law.' How is the lady related to Ali?", a: "Daughter", w: ["Sister", "Niece", "Wife"], exp: "The only daughter of Ali's mother-in-law is Ali's wife. The lady is her daughter, therefore Ali's daughter." }
        ]
        const rel = relations[(testNumber + i) % relations.length]
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

      // 10. Semantic Classification (Odd One Out)
      case 9: {
        const oddSets = [
          { items: ["Submarine", "Frigate", "Destroyer", "Helicopter"], odd: "Helicopter", exp: "Helicopter is an aircraft; the others are naval warships/vessels." },
          { items: ["Mirage", "Thunder JF-17", "F-16", "Al-Khalid"], odd: "Al-Khalid", exp: "Al-Khalid is a main battle tank; the others are combat fighter jets." },
          { items: ["Thermometer", "Barometer", "Hygrometer", "Speedometer"], odd: "Speedometer", exp: "Speedometer measures vehicle speed; the others measure atmospheric/weather variables." },
          { items: ["Peshawar", "Quetta", "Lahore", "Kakul"], odd: "Kakul", exp: "Kakul is an academy cantonment town; the others are provincial capital cities." }
        ]
        const os = oddSets[(testNumber + i) % oddSets.length]
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

      // 11. Word Analogies
      case 10: {
        const analogies = [
          { q: "SOLDIER is to REGIMENT as PILOT is to:", a: "SQUADRON", w: ["AIRCRAFT", "AIRPORT", "FLIGHT"], exp: "A soldier belongs to an army regiment; an air force pilot belongs to a squadron." },
          { q: "RADAR is to DETECTION as COMPASS is to:", a: "NAVIGATION", w: ["DIRECTION", "ALTITUDE", "PRESSURE"], exp: "Radar functions for detection; a compass functions for navigation." },
          { q: "DOCTOR is to STETHOSCOPE as SOLDIER is to:", a: "RIFLE", w: ["UNIFORM", "BARRACKS", "BULLET"], exp: "A stethoscope is a doctor's primary tool; a rifle is a soldier's primary weapon." }
        ]
        const ana = analogies[(testNumber + i) % analogies.length]
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

      // 12. Military Vocabulary & Antonyms
      default: {
        const vocabBank = [
          { q: "FORTITUDE", ant: "Cowardice", w: ["Courage", "Resilience", "Stamina"], exp: "Fortitude means mental and emotional strength in facing difficulty; cowardice is the direct antonym." },
          { q: "VIGILANT", ant: "Negligent", w: ["Alert", "Watchful", "Attentive"], exp: "Vigilant means keenly watchful; negligent means careless or heedless." },
          { q: "INTREPID", ant: "Fearful", w: ["Brave", "Dauntless", "Heroic"], exp: "Intrepid means completely fearless; fearful is its exact opposite." },
          { q: "STEADFAST", ant: "Fickle", w: ["Loyal", "Firm", "Resolute"], exp: "Steadfast means dutifully firm and unwavering; fickle means changeable and disloyal." }
        ]
        const v = vocabBank[(testNumber * 2 + i) % vocabBank.length]
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
// 2. COMPREHENSIVE UNIQUE NON-VERBAL DIAGRAM GENERATOR (64 MCQs / Test)
// ═════════════════════════════════════════════════════════════════════════════
export function getUniqueNonVerbalQuestions(testNumber: number, count: number = 64): Array<{
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

  const seedBase = (testNumber - 1) * count

  for (let i = 0; i < count; i++) {
    const qIndex = seedBase + i + 1
    const typeMod = i % 4
    const questionSeed = testNumber * 2000 + i * 23

    // 1. Clockwise/Anti-Clockwise Rotational Series
    if (typeMod === 0) {
      const stepAngle = (i % 2 === 0) ? 45 : 90
      const startAngle = ((testNumber * 30) + (i * 15)) % 360
      const a1 = startAngle
      const a2 = (a1 + stepAngle) % 360
      const a3 = (a2 + stepAngle) % 360
      const a4 = (a3 + stepAngle) % 360
      const correctAngle = (a4 + stepAngle) % 360

      const shapeType = (i % 3 === 0) ? 'arrow' : (i % 3 === 1) ? 'line' : 'cross'

      const rawOptionFigures = [
        { shapes: [{ type: shapeType as any, x: 50, y: 50, size: 40, rotation: correctAngle }] },
        { shapes: [{ type: shapeType as any, x: 50, y: 50, size: 40, rotation: (correctAngle + 90) % 360 }] },
        { shapes: [{ type: shapeType as any, x: 50, y: 50, size: 40, rotation: (correctAngle + 180) % 360 }] },
        { shapes: [{ type: shapeType as any, x: 50, y: 50, size: 40, rotation: (correctAngle + 270) % 360 }] },
      ]

      const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOptionFigures, 0, questionSeed)

      questions.push({
        id: qIndex,
        question_text: `Identify the figure that correctly continues the ${stepAngle}° rotation sequence:`,
        diagram: {
          type: 'series',
          problemFigures: [
            { shapes: [{ type: shapeType as any, x: 50, y: 50, size: 40, rotation: a1 }] },
            { shapes: [{ type: shapeType as any, x: 50, y: 50, size: 40, rotation: a2 }] },
            { shapes: [{ type: shapeType as any, x: 50, y: 50, size: 40, rotation: a3 }] },
            { shapes: [{ type: shapeType as any, x: 50, y: 50, size: 40, rotation: a4 }] },
          ],
          optionFigures: shuffled
        },
        correct_option_index: newCorrectIdx,
        explanation: `The element rotates clockwise by exactly ${stepAngle}° at every step. Adding ${stepAngle}° to figure 4 gives Option ${String.fromCharCode(65 + newCorrectIdx)}.`
      })
    }

    // 2. Element Inversion & Nesting Analogy (A : B :: C : ?)
    else if (typeMod === 1) {
      const outerShape = (i % 2 === 0) ? 'rect' : 'circle'
      const innerShape = (i % 2 === 0) ? 'circle' : 'triangle'
      const targetOuter = (i % 2 === 0) ? 'triangle' : 'rect'

      const rawOptionFigures = [
        { shapes: [{ type: 'circle' as any, x: 50, y: 50, size: 60 }, { type: targetOuter as any, x: 50, y: 50, size: 30, fill: '#0A192F' }] }, // Correct
        { shapes: [{ type: targetOuter as any, x: 50, y: 50, size: 60 }, { type: 'cross' as any, x: 50, y: 50, size: 30 }] },
        { shapes: [{ type: 'rect' as any, x: 50, y: 50, size: 50 }] },
        { shapes: [{ type: 'dot' as any, x: 50, y: 50, size: 60 }] }
      ]

      const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOptionFigures, 0, questionSeed)

      questions.push({
        id: qIndex,
        question_text: `Select the figure that satisfies the geometric proportional relationship (A : B :: C : ?):`,
        diagram: {
          type: 'analogy',
          problemFigures: [
            { shapes: [{ type: outerShape as any, x: 50, y: 50, size: 60 }, { type: innerShape as any, x: 50, y: 50, size: 30, fill: '#0A192F' }], label: '(A)' },
            { shapes: [{ type: innerShape as any, x: 50, y: 50, size: 60 }, { type: outerShape as any, x: 50, y: 50, size: 30, fill: '#0A192F' }], label: '(B)' },
            { shapes: [{ type: targetOuter as any, x: 50, y: 50, size: 60 }, { type: 'dot' as any, x: 50, y: 50, size: 24 }], label: '(C)' }
          ],
          optionFigures: shuffled
        },
        correct_option_index: newCorrectIdx,
        explanation: `In pair (A : B), the inner and outer shapes interchange positions and the new inner figure becomes shaded. Applying this to (C) yields Option ${String.fromCharCode(65 + newCorrectIdx)}.`
      })
    }

    // 3. Progressive Line Count Addition
    else if (typeMod === 2) {
      const rawOptionFigures = [
        { shapes: [{ type: 'rect' as any, x: 50, y: 50, size: 50 }, { type: 'line', x1: 25, y1: 25, x2: 75, y2: 75 }] }, // Correct 5 lines
        { shapes: [{ type: 'circle' as any, x: 50, y: 50, size: 50 }] },
        { shapes: [{ type: 'cross' as any, x: 50, y: 50, size: 40 }] },
        { shapes: [{ type: 'dot' as any, x: 50, y: 50, size: 30 }] }
      ]

      const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOptionFigures, 0, questionSeed)

      questions.push({
        id: qIndex,
        question_text: `Which figure correctly continues the line-segment addition progression?`,
        diagram: {
          type: 'series',
          problemFigures: [
            { shapes: [{ type: 'line', x1: 50, y1: 20, x2: 50, y2: 80 }] },
            { shapes: [{ type: 'line', x1: 50, y1: 20, x2: 50, y2: 80 }, { type: 'line', x1: 20, y1: 50, x2: 80, y2: 50 }] },
            { shapes: [{ type: 'triangle', x: 50, y: 50, size: 50 }] },
            { shapes: [{ type: 'rect', x: 50, y: 50, size: 50 }] }
          ],
          optionFigures: shuffled
        },
        correct_option_index: newCorrectIdx,
        explanation: `The line count increases systematically (1 line → 2 lines → 3 sides → 4 sides → 5 segments). Option ${String.fromCharCode(65 + newCorrectIdx)} contains 5 segments.`
      })
    }

    // 4. Dot Coordinate Cyclic Shift
    else {
      const corners = [
        { x: 30, y: 30 },
        { x: 70, y: 30 },
        { x: 70, y: 70 },
        { x: 30, y: 70 }
      ]
      const offset = (testNumber + i) % 4
      const p1 = corners[offset % 4]
      const p2 = corners[(offset + 1) % 4]
      const p3 = corners[(offset + 2) % 4]
      const p4 = corners[(offset + 3) % 4]
      const correctPos = corners[(offset + 4) % 4]

      const rawOptionFigures = [
        { shapes: [{ type: 'rect' as any, x: 50, y: 50, size: 60 }, { type: 'dot', x: correctPos.x, y: correctPos.y, size: 16 }] }, // Correct
        { shapes: [{ type: 'rect' as any, x: 50, y: 50, size: 60 }, { type: 'dot', x: 50, y: 50, size: 16 }] },
        { shapes: [{ type: 'rect' as any, x: 50, y: 50, size: 60 }, { type: 'dot', x: corners[(offset + 1) % 4].x, y: corners[(offset + 1) % 4].y, size: 16 }] },
        { shapes: [{ type: 'rect' as any, x: 50, y: 50, size: 60 }, { type: 'dot', x: corners[(offset + 2) % 4].x, y: corners[(offset + 2) % 4].y, size: 16 }] }
      ]

      const { shuffled, newCorrectIdx } = shuffleWithCorrectIndex(rawOptionFigures, 0, questionSeed)

      questions.push({
        id: qIndex,
        question_text: `Analyze the cyclic corner shift of the internal dot and determine the next figure:`,
        diagram: {
          type: 'series',
          problemFigures: [
            { shapes: [{ type: 'rect', x: 50, y: 50, size: 60 }, { type: 'dot', x: p1.x, y: p1.y, size: 16 }] },
            { shapes: [{ type: 'rect', x: 50, y: 50, size: 60 }, { type: 'dot', x: p2.x, y: p2.y, size: 16 }] },
            { shapes: [{ type: 'rect', x: 50, y: 50, size: 60 }, { type: 'dot', x: p3.x, y: p3.y, size: 16 }] },
            { shapes: [{ type: 'rect', x: 50, y: 50, size: 60 }, { type: 'dot', x: p4.x, y: p4.y, size: 16 }] },
          ],
          optionFigures: shuffled
        },
        correct_option_index: newCorrectIdx,
        explanation: `The dot traverses clockwise around the 4 frame corners. Following step 4, it completes the loop and returns to position (Option ${String.fromCharCode(65 + newCorrectIdx)}).`
      })
    }
  }

  return questions
}

// ═════════════════════════════════════════════════════════════════════════════
// 3. COMPREHENSIVE UNIQUE ACADEMIC SCREENING GENERATOR (50 MCQs / Test)
// ═════════════════════════════════════════════════════════════════════════════
export function getUniqueAcademicQuestions(testNumber: number, count: number = 50): Array<{
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

  const seedBase = (testNumber - 1) * count

  for (let i = 0; i < count; i++) {
    const qIndex = seedBase + i + 1
    const subjectMod = i % 5
    const questionSeed = testNumber * 3000 + i * 29

    // 1. Physics (Mechanics, Electricity, Nuclear, Waves, Modern)
    if (subjectMod === 0) {
      const physicsPool = [
        { q: `What is the standard value of acceleration due to gravity (g) at Earth's surface?`, a: `9.8 m/s²`, w: [`8.9 m/s²`, `10.8 m/s²`, `9.2 m/s²`], exp: `Standard gravitational acceleration g ≈ 9.8 m/s² (or 9.81 m/s²).` },
        { q: `According to Newton's Second Law of Motion, the rate of change of momentum is proportional to:`, a: `Net Applied Force`, w: [`Applied Torque`, `Kinetic Energy`, `Velocity`], exp: `Newton's 2nd Law states F = dp/dt = ma.` },
        { q: `The dimensional formula for Work and Kinetic Energy is:`, a: `[ML²T⁻²]`, w: [`[MLT⁻²]`, `[ML²T⁻¹]`, `[M⁻¹L²T⁻²]`], exp: `Work = Force × Distance = [MLT⁻²][L] = [ML²T⁻²].` },
        { q: `Which electromagnetic radiation has the highest energy and shortest wavelength?`, a: `Gamma Rays`, w: [`X-Rays`, `Ultraviolet`, `Radio Waves`], exp: `Gamma rays carry the highest frequency and energy in the EM spectrum.` },
        { q: `The SI unit of Electrical Capacitance is:`, a: `Farad`, w: [`Henry`, `Weber`, `Tesla`], exp: `Capacitance C = Q/V is measured in Farads (F).` }
      ]
      const item = physicsPool[(testNumber + i) % physicsPool.length]
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

    // 2. Mathematics (Calculus, Trigonometry, Matrices, Vectors)
    else if (subjectMod === 1) {
      const mathPool = [
        { q: `The derivative of sin(x) with respect to x is:`, a: `cos(x)`, w: [`-cos(x)`, `tan(x)`, `-sin(x)`], exp: `d/dx[sin(x)] = cos(x).` },
        { q: `If the determinant of a square matrix A is zero (|A| = 0), the matrix is termed:`, a: `Singular Matrix`, w: [`Non-Singular Matrix`, `Identity Matrix`, `Diagonal Matrix`], exp: `A matrix whose determinant is 0 has no inverse and is called a singular matrix.` },
        { q: `The fundamental identity sin²(θ) + cos²(θ) is identically equal to:`, a: `1`, w: [`0`, `tan(θ)`, `2`], exp: `This is the fundamental Pythagorean identity of trigonometry.` },
        { q: `The slope of any horizontal line parallel to the X-axis is:`, a: `0`, w: [`1`, `Undefined (∞)`, `-1`], exp: `Horizontal lines have zero vertical change (Δy = 0), so slope m = 0.` },
        { q: `The solution set of the algebraic equation x² - 25 = 0 is:`, a: `{±5}`, w: [`{5}`, `{±10}`, `{±25}`], exp: `x² = 25 ⇒ x = ±√25 = ±5.` }
      ]
      const item = mathPool[(testNumber + i) % mathPool.length]
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

    // 3. English Grammar (Prepositions, Active/Passive, Vocabulary)
    else if (subjectMod === 2) {
      const engPool = [
        { q: `Complete the sentence: The officer was congratulated ______ his outstanding valor.`, a: `on`, w: [`for`, `with`, `at`], exp: `The appropriate preposition after 'congratulate' is 'on'.` },
        { q: `Choose the correct passive voice: 'The cadets raised the national flag.'`, a: `The national flag was raised by the cadets.`, w: [`The national flag is raised by the cadets.`, `The national flag had been raised.`, `The cadets were raising the flag.`], exp: `Past simple active ('raised') becomes 'was raised' in the passive voice.` },
        { q: `Select the correct synonym for 'METICULOUS':`, a: `Extremely careful and precise`, w: [`Careless`, `Aggressive`, `Sluggish`], exp: `Meticulous means showing great attention to detail; very careful and precise.` },
        { q: `Complete with the correct preposition: 'She has been serving here ______ 2021.'`, a: `since`, w: [`for`, `from`, `during`], exp: `'Since' is used to denote a specific starting point in past time (2021).` },
        { q: `Identify the correctly spelled military rank:`, a: `Lieutenant`, w: [`Leutenant`, `Lieutenent`, `Leftenant`], exp: `'Lieutenant' is the correct standard spelling.` }
      ]
      const item = engPool[(testNumber + i) % engPool.length]
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

    // 4. Chemistry & General Science
    else if (subjectMod === 3) {
      const chemPool = [
        { q: `The pH value of pure neutral water at 25°C is:`, a: `7.0`, w: [`5.5`, `8.5`, `0.0`], exp: `Pure neutral water has equal concentrations of H+ and OH- ions, yielding pH = 7.0.` },
        { q: `Avogadro's constant (particles per mole) is approximately equal to:`, a: `6.022 × 10²³`, w: [`6.022 × 10²²`, `3.00 × 10⁸`, `1.602 × 10⁻¹⁹`], exp: `Avogadro's number NA ≈ 6.022 × 10²³ mol⁻¹.` },
        { q: `Which of the following is chemically classified as an inert (noble) gas?`, a: `Helium`, w: [`Nitrogen`, `Oxygen`, `Chlorine`], exp: `Helium (He) has a fully stable valence shell and is chemically unreactive.` },
        { q: `The typical oxidation number of Oxygen in standard water (H₂O) is:`, a: `-2`, w: [`+2`, `-1`, `0`], exp: `Oxygen gains two electrons from hydrogen atoms, exhibiting an oxidation state of -2.` }
      ]
      const item = chemPool[(testNumber + i) % chemPool.length]
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

    // 5. Pakistan Affairs, Defence & General Knowledge
    else {
      const gkPool = [
        { q: `The highest military decoration of the Islamic Republic of Pakistan is:`, a: `Nishan-e-Haider`, w: [`Hilal-e-Jurat`, `Sitara-e-Jurat`, `Tamgha-e-Basalat`], exp: `Nishan-e-Haider is Pakistan's highest military gallantry award.` },
        { q: `In which year did Pakistan conduct its historic nuclear tests (Youm-e-Takbeer)?`, a: `1998`, w: [`1974`, `1988`, `2002`], exp: `Pakistan became a declared nuclear power following tests in Chagai on May 28, 1998.` },
        { q: `The Pakistan Military Academy (PMA) is situated at:`, a: `Kakul, Abbottabad`, w: [`Risalpur`, `Rawalpindi`, `Nowshera`], exp: `PMA Kakul was established in October 1947 in Abbottabad.` },
        { q: `The PAF College of Aeronautical Engineering (CAE) is located at:`, a: `Risalpur`, w: [`Kamra`, `Chaklala`, `Sargodha`], exp: `CAE is part of the Pakistan Air Force Academy at Risalpur.` },
        { q: `What is the height of Mount K2 (Godwin-Austen), Pakistan's highest peak?`, a: `8,611 meters`, w: [`8,126 meters`, `8,047 meters`, `8,848 meters`], exp: `K2 is the world's 2nd highest peak at 8,611 meters (28,251 ft).` }
      ]
      const item = gkPool[(testNumber + i) % gkPool.length]
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
