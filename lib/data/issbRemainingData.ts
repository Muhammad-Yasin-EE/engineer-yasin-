// ─────────────────────────────────────────────────────────────────────────────
// OFFICIAL ISSB COMPREHENSIVE PREPARATION REPOSITORY (ALL REMAINING MODULES)
// Authentic standards researched from Inter Services Selection Board protocols,
// Pakistan Military Academy (PMA), PAF GD(P), PN Cadet testing manuals.
// ─────────────────────────────────────────────────────────────────────────────

// ── 1. PICTURE STORY WRITING (TAT - THEMATIC APPERCEPTION TEST) ──────────────
export interface TatScene {
  id: number
  title: string
  theme: string
  description: string
  imageUrl?: string
  idealOfficerQualities: string[]
  sampleStory: {
    background: string
    currentAction: string
    positiveOutcome: string
  }
}

export const tatScenarios: TatScene[] = [
  {
    id: 1,
    title: "Youth Scaling High Building Wall During Emergency Rescue",
    theme: "Courage & Quick-Action Civic Rescue",
    description: "A brave young candidate scaling an external building wall and structural pipe to reach an endangered resident trapped on an upper window terrace.",
    imageUrl: "/images/tat/scene-1.jpg",
    idealOfficerQualities: ["Courage", "Calculated Risk", "Physical Agility", "Selfless Service"],
    sampleStory: {
      background: "Hamza, an energetic college athlete and civil defense volunteer, was walking past a residential apartment block when an electrical short circuit ignited the stairwell, trapping an elderly resident on the second-floor terrace.",
      currentAction: "Without panicking or waiting passively, Hamza assessed structural anchor points, utilized the exterior masonry projections and rain-pipe to scale the exterior wall safely, forced open the bolted window latch, and cleared an emergency ventilation airway.",
      positiveOutcome: "His bold physical agility and calculated bravery allowed the trapped resident to breathe safely until Rescue 1122 fire ladders arrived, earning Hamza the Provincial Civil Valor Commendation."
    }
  },
  {
    id: 2,
    title: "Seated Military Officer Contemplating Tactical Resolution",
    theme: "Emotional Calmness & Analytical Composure",
    description: "An armed forces officer sitting quietly with hands supporting forehead in composed mental focus before finalizing a complex strategic operational command.",
    imageUrl: "/images/tat/scene-2.jpg",
    idealOfficerQualities: ["Composure", "Analytical Clarity", "Emotional Resilience", "Strategic Foresight"],
    sampleStory: {
      background: "Major Tariq, commanding a remote field battalion, faced sudden unexpected communication interference due to extreme mountain blizzard conditions just hours before a critical supply drop.",
      currentAction: "Instead of succumbing to impulsive anxiety, Major Tariq withdrew to his command table in composed silence to systematically evaluate backup secondary radio relay frequencies, alternate solar battery allocations, and ground signaling protocols.",
      positiveOutcome: "His serene analytical focus produced a foolproof optical light-beacon contingency plan, ensuring 100% precision in airborne supply recovery and keeping garrison morale exceptionally high."
    }
  },
  {
    id: 3,
    title: "Young Cadet Grooming Before High-Stakes Appearance",
    theme: "Discipline, Professional Pride & Self-Confidence",
    description: "A confident, smartly dressed young gentleman checking his attire and posture in front of an oval vanity mirror prior to a decisive leadership assessment.",
    imageUrl: "/images/tat/scene-3.jpg",
    idealOfficerQualities: ["Self-Respect", "Military Grooming", "Confidence", "Punctuality"],
    sampleStory: {
      background: "Bilal, a disciplined candidate preparing for his final ISSB Deputy President Interview, understood that outer personal grooming reflects inner clarity, self-respect, and strict organizational standards.",
      currentAction: "On the morning of his examination, he woke up early for rigorous physical calisthenics, meticulously pressed his formal blazer, polished his leather oxford shoes, and inspected his confident, upright posture in the mirror with optimistic composure.",
      positiveOutcome: "His crisp military grooming and composed smile set an immediate commanding first impression during the interview, leading to an exemplary recommendation for presidential commission."
    }
  },
  {
    id: 4,
    title: "Courageous Citizen Intercepting Fleeing Street Snatcher",
    theme: "Civic Vigilance & Active Law Enforcement Support",
    description: "A vigilant pedestrian actively running to intercept an armed chain robber fleeing through a bustling market street while coordinating with law enforcement.",
    imageUrl: "/images/tat/scene-4.jpg",
    idealOfficerQualities: ["Social Vigilance", "Bravery", "Initiative", "Community Safety"],
    sampleStory: {
      background: "While returning from university library through Anarkali square, sports captain Usman noticed a fleeing street robber who had just snatched a female family's purse, causing panic among bystanders.",
      currentAction: "Demonstrating swift presence of mind, Usman shouted loud clear instructions to clear the rickshaw pathway, anticipated the suspect's blind turn, sprinted diagonally to intercept the robber with an athletic tackle, and disarmed the perpetrator safely.",
      positiveOutcome: "His bold community intervention recovered the family's valuables completely unharmed and secured the suspect until patrol officers arrived, inspiring neighborhood shopkeepers to form a vigilant citizen watch club."
    }
  }
]

// ── 2. POINTER STORY & MERITS/DEMERITS ───────────────────────────────────────
export const pointerStoryPrompts = [
  "While inspecting the border perimeter checkpost during a stormy midnight, Lieutenant Umar suddenly detected an unscheduled radar signature moving through the ravine...",
  "As Aslam stepped onto the stage to present his university's innovative robotics project to an international delegation, the main power supply collapsed...",
  "During a high-altitude mountaineering expedition in Gilgit-Baltistan, a sudden blizzard broke the primary radio antenna connecting team leader Bilal to base camp...",
  "Returning home from college library after sundown, Maryam noticed smoke billowing out from an unguarded biochemical storage facility next to a residential block..."
]

export const meritsDemeritsGuide = {
  overview: "The Merit & Demerit assessment evaluates your self-awareness and emotional integrity. Never write destructive flaws that clash with basic military ethics (such as dishonesty, cowardice, short temper, or procrastination). Instead, choose genuine areas of growth that show aspiration.",
  recommendedMerits: [
    "Resilient discipline and regular early morning physical fitness habits.",
    "Strong emotional stability and calm decision-making during high-pressure crises.",
    "Helpful collaborative spirit with high regard for team success over individual glory.",
    "Deep curiosity for strategic geo-politics, military technology, and scientific innovation.",
    "Respect for organizational hierarchy, punctuality, and unwavering loyalty to assigned tasks."
  ],
  acceptableDemerits: [
    "Tend to be overly critical of my own output, continually seeking perfection in minor task details.",
    "Occasionally spend excessive leisure hours reading military technical journals and analytical literature.",
    "Sometimes take on additional tasks from struggling peers, which demands tighter personal time scheduling.",
    "Prefer straightforward communication, which can initially appear direct in casual social gatherings.",
    "Constantly pushing personal athletic limits, requiring mindful attention to required physical recovery intervals."
  ]
}

// ── 3. SELF-DESCRIPTION (SD) WRITING TEMPLATES ──────────────────────────────
export const selfDescriptionTemplates = [
  {
    category: "1. Parents' Perspective (What do your parents think about you?)",
    sample: "My parents view me as an obedient, deeply dependable, and responsible family member. They appreciate my self-driven commitment to academics and regular fitness discipline without needing reminder. They trust my emotional maturity during difficult financial or medical family decisions, though they occasionally advise me to maintain a healthier work-rest balance when preparing for competitive examinations."
  },
  {
    category: "2. Teachers' Perspective (What do your teachers think about you?)",
    sample: "My teachers and academic professors regard me as an articulate, intellectually curious, and punctual student. They consistently entrust me with classroom leadership roles, lab project coordination, and campus sports representation due to my cooperative attitude. They value my ability to accept constructive feedback with grace and apply academic solutions to practical campus problems."
  },
  {
    category: "3. Friends' & Peers' Perspective (What do your friends think about you?)",
    sample: "My friends look up to me as a trustworthy confidant, energizing motivator, and reliable companion during challenging situations. They appreciate my calm demeanor during competitive sports and group project deadlines. They know I never abandon team commitments, though they sometimes note that I prefer productive discussions and training sessions over idle socializing."
  },
  {
    category: "4. Enemies' / Rivals' Perspective (What do your rivals think about you?)",
    sample: "Individuals who compete against me in athletic tournaments or academic debates view me as a formidable, disciplined, and principled competitor. They recognize that I adhere strictly to rules of fair play without succumbing to emotional taunts. They respect my resilience in turning strategic losses into lessons, knowing I treat opposition with dignitary sportsmanship rather than personal malice."
  },
  {
    category: "5. Personal Evaluation & Goal in Life (What do you think about yourself?)",
    sample: "I evaluate myself as an adaptable, spiritually grounded, and enthusiastic aspirant dedicated to lifelong learning and national service. My primary life goal is to earn a commissioned rank in the Pakistan Armed Forces, serving my homeland with professional distinction, ethical integrity, and courageous leadership while continuously developing my tactical and strategic engineering capabilities."
  }
]

// ── 4. GTO TASKS & RULES REPOSITORY ─────────────────────────────────────────
export const gtoGroundRules = [
  {
    title: "1. The Colour Rule",
    badge: "Most Critical Protocol",
    color: "emerald",
    details: [
      "WHITE ZONE: Safe for both candidates and all helping materials (planks, ballis, ropes). Both can stand or rest freely.",
      "BLUE / GREEN ZONE: Safe ONLY for candidates. Helping materials must NOT touch blue or green surfaces at any time!",
      "RED ZONE: Complete Out of Bounds! Neither candidates nor any helping material may touch red painted timber, metal, or ground."
    ]
  },
  {
    title: "2. The Rigidity Rule",
    badge: "Structural Physics",
    color: "blue",
    details: [
      "Two rigid helping materials (such as two wooden planks or a plank plus a bamboo balli) CANNOT be tied directly together in mid-air to extend length.",
      "They must be securely rested upon, wedged, or lashed to a stable ground structure, white post, or support frame within the testing arena."
    ]
  },
  {
    title: "3. The Infinity Rule",
    badge: "Boundary Restriction",
    color: "purple",
    details: [
      "The starting line and finish line of an obstacle course are considered to extend outward into infinity in both left and right directions.",
      "Candidates cannot circumvent or walk around the obstacle field; the only valid route is straight across the obstacle zone using rules."
    ]
  },
  {
    title: "4. The Distance (4-Feet) Rule",
    badge: "Safety & Logic",
    color: "amber",
    details: [
      "No candidate is permitted to jump over any gap or distance across out-of-bounds red territory that exceeds 4 feet (approx. 1.2 meters).",
      "For any gap greater than 4 feet, candidates must intelligently construct a cantilever, mechanical bridge, or pivot using provided helping timber."
    ]
  }
]

export const individualObstaclesList = [
  { no: 1, name: "Ditch Jump (Long Jump)", marks: 1, technique: "Run with steady velocity, leap from edge with dominant foot, swing arms forward, and land cleanly on double feet with bent knees." },
  { no: 2, name: "Zig-Zag Wooden Balance", marks: 2, technique: "Maintain upright posture, extend arms horizontally for dynamic equilibrium, and look straight at table end rather than down at your feet." },
  { no: 3, name: "High Tea / Wooden Wall (5 Feet)", marks: 3, technique: "Approach at medium speed, plant one foot on wall mid-section, hoist chest upward using triceps press, and roll vault smoothly over the top ledge." },
  { no: 4, name: "Drum & Box Leap", marks: 4, technique: "Step firmly onto lower preparatory barrel, spring immediately onto tall wooden platform without breaking momentum, and execute a controlled drop." },
  { no: 5, name: "Tarzan Swing (Single Ditch)", marks: 5, technique: "Grasp thick hanging manila rope high with both palms, step backward to build tension, leap forward off ramp, and release cleanly over the sand pit edge." },
  { no: 6, name: "Double Ditch & Timber Vault", marks: 6, technique: "Clear the initial shallow trench with a sprint stride, plant hands firmly on center dividing post, and kick legs horizontally over second trench." },
  { no: 7, name: "Balancing Bridge & Ramp", marks: 7, technique: "Walk smoothly up inclined plank without rushing; maintain rhythmic breathing across horizontal beam before controlled jogging down exit slope." },
  { no: 8, name: "Tiger Leap / Burma Loop (9 Feet)", marks: 8, technique: "Ascend wooden scaffolding ladder rapidly, leap outward to grab hanging suspended rope loop with forearms/elbow lock, and slide down under control." },
  { no: 9, name: "Vertical Rope Climbing (12 Feet)", marks: 9, technique: "Use essential J-hook foot lock (securing rope between feet); pull upward with leg extension rather than relying exclusively on arm biceps strength." },
  { no: 10, name: "Tarzan Swing & High Rope Jump", marks: 10, technique: "Ascend elevated launching tower, grip heavy swing rope high, swing across deep obstacle excavation, and drop precisely within designated touchdown perimeter." }
]

// ── 5. DEPUTY PRESIDENT (DP) INTERVIEW REPOSITORY ───────────────────────────
export const dpInterviewQuestions = {
  personalAndFamily: [
    { q: "Introduce yourself briefly, covering your educational career and major extracurricular accomplishments.", focus: "Confidence, clear articulation, concise summary without arrogance." },
    { q: "Why did you decide to join the Pakistan Armed Forces rather than pursuing a lucrative civilian engineering or administrative career?", focus: "Genuine patriotism, desire for structured disciplined life, national defense commitment." },
    { q: "What is your father's profession and monthly household income? How do you manage family financial budgeting?", focus: "Absolute truthfulness, economic awareness, appreciation for parental sacrifice." },
    { q: "Who is your favorite personality or historical military commander, and what three specific qualities do you emulate from them?", focus: "Value alignment (e.g., Khalid ibn al-Walid, Quaid-e-Azam, Rashid Minhas Shaheed)." },
    { q: "Describe a significant personal failure or setbacks you faced in your life. How did you emotionally bounce back?", focus: "Resilience, emotional composure, ownership of responsibility without blaming others." }
  ],
  militaryAndDefenseGK: [
    { q: "Name all eleven recipients of Nishan-e-Haider in Pakistan's military history in chronological sequence of their martyrdom.", focus: "Core military heritage and respect for supreme valor." },
    { q: "What is the difference between ballistic ballistic missiles (e.g., Shaheen, Ghauri) and cruise missiles (e.g., Babur)?", focus: "Basic technical awareness of strategic defense aerospace propulsion." },
    { q: "What are the primary air superiority fighter aircraft deployed by Pakistan Air Force (e.g., JF-17 Thunder Block-III, J-10C Vigilant Dragon)?", focus: "Modern tactical aerospace defense modernization." },
    { q: "Detail the organizational commissioning structure of an Army Infantry Division from Platoon up to Corps level.", focus: "Command hierarchy orientation and leadership scope." },
    { q: "Discuss the strategic maritime security role of Pakistan Navy in guarding Gwadar Port and international Indian Ocean trade lanes.", focus: "Geopolitical maritime awareness and coastal defense." }
  ],
  currentAffairsAndGeoStrategy: [
    { q: "What is the total length of Pakistan's international land boundaries with Afghanistan (Durand Line), China, India, and Iran?", focus: "Exact border metrics (Durand Line ~2,670 km, India ~3,323 km, Iran ~909 km, China ~599 km)." },
    { q: "How does the China-Pakistan Economic Corridor (CPEC) enhance regional transit integration and national socioeconomic stability?", focus: "Balanced understanding of economic geo-strategy, energy connectivity, and trade logistics." },
    { q: "What are the primary functions of global and regional diplomatic organizations like United Nations, Shanghai Cooperation Organisation (SCO), and OIC?", focus: "International multilateral diplomacy and collective peace resolution." },
    { q: "What are the major ecological and water resource conservation challenges currently confronting the Indus Basin Irrigation System?", focus: "National resource sustainability, dam reservoir projects, and climate resilience." }
  ],
  stressAndRapidFireMath: [
    { q: "If we reject your application today due to high competition in this batch, what is your alternate future action plan?", focus: "Unshakeable emotional optimism, composure under direct pressure, continued civic contribution." },
    { q: "Rapid Math: What is 25% of 640? Calculate 15 multiplied by 16 in your head immediately.", focus: "Mental calculations under interview pressure (Answers: 160 and 240)." },
    { q: "Why did you obtain relatively lower marks in a specific subject during your Intermediate or College examination?", focus: "Accepting personal accountability without inventing superficial excuses; explaining corrective efforts." },
    { q: "In a team command task, if your senior supervisor gives an order that conflicts with field safety guidelines, how do you handle it?", focus: "Respectful assertive communication, military chain-of-command discipline, tactical caution." }
  ]
}
