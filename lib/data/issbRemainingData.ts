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
    title: "Officer Overseeing Bridge Construction Over Flooded Canal",
    theme: "Crisis Management & Civic Leadership",
    description: "An young officer standing near a collapsing embankment while civilian workers look confused under heavy rain.",
    idealOfficerQualities: ["Initiative", "Practical Sense", "Emotional Stability", "Team Organization"],
    sampleStory: {
      background: "Captain Ahmed, an engineering graduate on leave in his rural hometown, noticed heavy monsoon rains threatening the main access bridge linking three villages.",
      currentAction: "He quickly assembled local youth and volunteer civil defense teams, organizing human chains to deploy sandbags and reinforced timber supports while coordinating with district authorities for emergency heavy machinery.",
      positiveOutcome: "Due to his rapid foresight and structured organizational leadership, the bridge withstood the flood crest, safeguarding over 5,000 residents and establishing a permanent community disaster response committee."
    }
  },
  {
    id: 2,
    title: "Two Students Studying Near a Technical Blueprint",
    theme: "Intellectual Collaboration & Academic Excellence",
    description: "Two young men late at night leaning over an electrical schematic with diagnostic instruments on a work table.",
    idealOfficerQualities: ["Determination", "Cooperative Spirit", "Focus", "Technical Competence"],
    sampleStory: {
      background: "Bilal and Usman, final-year avionics cadets, were preparing their autonomous drone tracking navigation payload for the National Aerospace Competition.",
      currentAction: "When a persistent radar telemetry signal interference occurred just hours before final calibration, they systematically divided debugging responsibilities—Bilal isolating RF frequency noise while Usman re-calibrated sensor logic algorithms.",
      positiveOutcome: "Their methodical teamwork eliminated the signal drift, enabling their prototype to secure first position in target tracking precision and earning an official university research grant."
    }
  },
  {
    id: 3,
    title: "A Youth Administering First Aid Near a Highway Accident",
    theme: "Presence of Mind & Altruism Under Stress",
    description: "A figure kneeling beside a motorcyclist on a dark rural road while another person flags down an approaching vehicle.",
    idealOfficerQualities: ["Courage", "Decision Making", "Calmness Under Pressure", "Social Responsibility"],
    sampleStory: {
      background: "While driving back from a sports training camp, Hamza witnessed a transport truck graze a local motorcyclist on a dimly lit junction.",
      currentAction: "Without panicking, Hamza immediately positioned his hazard-lighted car to shield the casualty from traffic, applied a tourniquet to arrest hemorrhage using his emergency med-kit, and directed a bystander to call Rescue 1122 with exact GPS coordinate references.",
      positiveOutcome: "The casualty arrived at the trauma center within the critical golden hour making a full physical recovery, prompting Hamza to initiate weekend road-safety & first-aid awareness seminars at his college."
    }
  },
  {
    id: 4,
    title: "Young Athlete Motivating Tired Squad at Dawn Track",
    theme: "Stamina, Camaraderie, & Peer Leadership",
    description: "An athletic runner looking back with an encouraging gesture at group members lagging behind on a hilly trail.",
    idealOfficerQualities: ["Physical Fitness", "Comradeship", "Optimism", "Inspirational Leadership"],
    sampleStory: {
      background: "During an intensive pre-selection cross-country endurance marathon, college athletic captain Tariq noticed his team trailing due to heat exhaustion on the final steep gradient.",
      currentAction: "Rather than seeking individual medal victory, Tariq moderated his pace to regroup the squad, redistributed heavy supply hydration packs, and led steady rhythmic breathing drills while encouraging teammates by name.",
      positiveOutcome: "Inspired by his self-effacing camaraderie, the entire squad surged forward in unison to complete the formation run well within qualifying timelines, claiming the regional team cohesion trophy."
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
