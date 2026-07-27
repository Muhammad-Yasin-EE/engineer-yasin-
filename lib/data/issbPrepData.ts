// Complete Official ISSB Testing Repository Data (SCT English, SCT Urdu, SRT, GD & Lecturating Topics, and Military Ranks)
// Compiled from Engineer Yasin's authentic past papers and preparation guides.

export interface SctSet {
  id: string
  title: string
  timeLimitMinutes: number
  sentences: string[]
}

export interface SrtItem {
  id: number
  situation: string
  solvedAnswer?: string
  category: 'solved' | 'past-experience' | 'female' | 'practice'
}

export interface GdTopic {
  id: number
  topic: string
  category: 'National / Political' | 'Social / General' | 'International / Strategic' | 'Abstract / Philosophical'
}

export interface RankComparison {
  navy: string
  army: string
  airForce: string
  stars?: string
}

// ── 1. ENGLISH SENTENCE COMPLETION TEST (SCT) ──────────────────────────────
export const sctEnglishSets: SctSet[] = [
  {
    id: "sct-eng-01",
    title: "SCT English Set 01 (Official Practice)",
    timeLimitMinutes: 6,
    sentences: [
      "I always feel _______",
      "He is about to _______",
      "It is always good to _______",
      "When he was in school _______",
      "My mother is mostly _______",
      "The best time of my life _______",
      "He is struggling to _______",
      "His father wants that he _______",
      "When he was young _______",
      "I am interested in _______",
      "His friends are _______",
      "On his failure _______",
      "During the war _______",
      "Because he is weak _______",
      "By nature he is _______",
      "In case of war _______",
      "By chance he _______",
      "The question is _______",
      "He realized that he must _______",
      "When he failed he tried to _______",
      "For the time being he is _______",
      "His success made him _______",
      "He is sick because _______",
      "In my view he _______",
      "The only trouble is _______",
      "The result proved that he was _______"
    ]
  },
  {
    id: "sct-eng-02",
    title: "SCT English Set 02 (Psychology Assessment)",
    timeLimitMinutes: 6,
    sentences: [
      "In this hospital _______",
      "On seeing the blood he _______",
      "He came to know that _______",
      "If I was in his place _______",
      "I think I can _______",
      "He is able to _______",
      "To achieve his purpose he _______",
      "Under the most trying circumstances _______",
      "He dislikes to _______",
      "In the end he _______",
      "The difference between _______",
      "To become a leader _______",
      "He indicated that _______",
      "In a fit of rage he _______",
      "In his opinion _______",
      "He always hated to _______",
      "There is a risk of _______",
      "To look smart she _______",
      "Rejection made him _______",
      "The reason of his success _______",
      "The guard hesitated to _______",
      "He was under pressure _______",
      "The fact is _______",
      "To avoid failure he _______",
      "His memory is _______",
      "When I met her first time _______"
    ]
  },
  {
    id: "sct-eng-03",
    title: "SCT English Set 03 (Past Experiences)",
    timeLimitMinutes: 6,
    sentences: [
      "I am not afraid of _______",
      "I am surprised _______",
      "To become rich _______",
      "Hardship _______",
      "He is upset _______",
      "He tried _______",
      "Our press _______",
      "He needs _______",
      "My ambition _______",
      "My father _______",
      "A brother _______",
      "After great effort _______",
      "In simple words _______",
      "In my house _______",
      "Most parents _______",
      "He does not dare _______",
      "During vacation _______",
      "If he fails _______",
      "My disappointment _______",
      "Pakistan needs _______",
      "Friend in difficulties _______",
      "On seeing this way _______",
      "If I had a gun _______",
      "It is very strange _______",
      "Television is _______",
      "When sitting alone _______"
    ]
  },
  {
    id: "sct-eng-04",
    title: "SCT English Set 04 (Advanced Reflex Test)",
    timeLimitMinutes: 6,
    sentences: [
      "I cannot _______",
      "I request _______",
      "Marriage brings _______",
      "My friends _______",
      "My homework _______",
      "She smiled _______",
      "My principle _______",
      "When she saw me _______",
      "Lead _______",
      "Myself _______",
      "The rich man _______",
      "Always _______",
      "On the road _______",
      "Leader is _______",
      "My hero _______",
      "Begging is _______",
      "Health and riches _______",
      "Pakistan Army is _______",
      "His health _______",
      "When he saw beautiful _______",
      "The new generation _______",
      "He finally _______",
      "When he was happy _______",
      "A large portion of his time _______",
      "Best time of his life _______",
      "On seeing the dead _______"
    ]
  }
];

// ── 2. URDU SENTENCE COMPLETION TEST (SCT URDU) ─────────────────────────────
export const sctUrduSets: SctSet[] = [
  {
    id: "sct-urdu-01",
    title: "SCT Urdu Set 01 (Officer Leadership & Positive Resilience)",
    timeLimitMinutes: 6,
    sentences: [
      "میں نے ایک پورا دن _______",
      "اس نے میرے _______",
      "وہ ابھی تک _______",
      "چاند نکلنے کے بعد _______",
      "ایک فوجی اکثر _______",
      "ان کے درمیان ہر روز _______",
      "اس تکرار سے تنگ آکر _______",
      "رشتہ داروں کے ساتھ _______",
      "میرے اسکول میں _______",
      "سیر کو جاتے جاتے _______",
      "کالج میں داخل ہوتے ہی _______",
      "صبح کے وقت _______",
      "تنہائی کے لمحات میں _______",
      "موجودہ دور میں _______",
      "ایسے حالات ہوں تو _______",
      "گھر بتائے _______",
      "زندگی کی دوڑ میں _______",
      "کاروبار جمانے کے بہانے _______",
      "راہ چلتے لوگوں پر _______",
      "جب ڈر لگے تو _______",
      "کام کرتے کرتے _______",
      "وہ اپنی امی سے _______",
      "اس نے پریشانی کی _______",
      "جب وہ اداس _______",
      "میرے بس میں ہو تو _______",
      "وطن کی عظمت کے لیے _______"
    ]
  },
  {
    id: "sct-urdu-02",
    title: "SCT Urdu Set 02 (Decision Making & Steadfastness)",
    timeLimitMinutes: 6,
    sentences: [
      "جلدی میں اگر _______",
      "پوری کوشش کے باوجود _______",
      "موت کی سزا _______",
      "معافی مانگ کر _______",
      "ہزاروں خواہشات _______",
      "لیڈر بننے کے لیے _______",
      "روشن مستقبل کی خاطر _______",
      "ایٹم بم بنا کر _______",
      "زندگی کے علم _______",
      "دشمن کے ساتھ دوستی _______",
      "انتظار کرتے کرتے _______",
      "مشکل اوقات میں _______",
      "ملاقات کے لیے _______",
      "طاقت آزمانے کے لیے _______",
      "ڈاکٹر کو دیکھ کر _______",
      "کامیاب نہ ہونے پر _______",
      "بعض اوقات انسان _______",
      "خوشی کے لمحوں میں _______",
      "عورتوں کو چاہیے کہ _______",
      "اگر میں افسر ہوتا تو _______",
      "اس کی عادت ہے کہ _______",
      "بارش کے موسم میں _______",
      "ہر روز رات کے وقت _______",
      "مسلمان قوم _______",
      "نظر انداز کرنا _______",
      "اعتماد پیدا کرنے کے لیے _______"
    ]
  },
  {
    id: "sct-urdu-03",
    title: "SCT Urdu Set 03 (Moral Courage & Emotional Control)",
    timeLimitMinutes: 6,
    sentences: [
      "دھوکہ دینے کے لیے _______",
      "تعاون کی خاطر _______",
      "آج کل کے لڑکے _______",
      "معاشی حالت _______",
      "گیڈر کی زندگی _______",
      "تنہا رہ کر _______",
      "بہادر قومیں _______",
      "آسان کام کو _______",
      "موقع کو غنیمت جان کر _______",
      "زیادہ نرم رویہ _______",
      "اس کے استاد نے _______",
      "تنہائی سے تنگ آکر _______",
      "اس کی نرم دلی سے فائدہ اٹھا کر _______",
      "سچ بولتے بولتے _______",
      "آج کل بچے _______",
      "رحم حاصل _______",
      "باپ کے رویہ _______",
      "اس نے بڑے _______",
      "میری مشکل کا _______",
      "وہ چاہتا ہے کہ _______",
      "اپنی عزت بچانے کی خاطر _______",
      "وہ روزہ دار ہے لیکن کبھی _______",
      "لڑکوں کو استاد نے _______",
      "خوشی کے مارے اس نے _______",
      "میری ناکامی کی وجہ _______",
      "راستے میں چلتے ہوئے _______"
    ]
  },
  {
    id: "sct-urdu-04",
    title: "SCT Urdu Set 04 (National Responsibility & Dedication)",
    timeLimitMinutes: 6,
    sentences: [
      "شرم کے مارے _______",
      "اپنے جرم کا خیال آتے ہی _______",
      "کام کرتے وقت _______",
      "صفائی کی خاطر _______",
      "میری ماں نے _______",
      "بچپن میں اس نے _______",
      "اپنی بات منوانے کے لیے _______",
      "جونہی بارش شروع ہوئی _______",
      "رات کی تاریکی میں _______",
      "زندگی بھر اس نے _______",
      "میرے گھر والے _______",
      "اس کا جواب سن کر _______",
      "ناکامی کے بعد _______",
      "دشمن کو دیکھ کر _______",
      "اپنے دوست کے ساتھ _______",
      "افسر بننے کے لیے _______",
      "وہ بوڑھا ہو گیا لیکن _______",
      "غصے کے مارے _______",
      "ایسے حالات میں _______",
      "اس کی امید کے خلاف _______",
      "تنگدستی غالب آئی تو _______",
      "اس نے گھبرا کر _______",
      "مکان بنانے کے لیے اس نے _______",
      "ایک دن اس نے غلطی سے _______",
      "جب زور نہ چلا تو _______",
      "شام کے وقت _______"
    ]
  }
];

// ── 3. SITUATIONAL REACTION TEST (SRT) ──────────────────────────────────────
export const srtGuidelines = {
  title: "Important Points for Situation Reaction Test (SRT) at ISSB",
  points: [
    "Be brief and to the point. Give wholesome responses which cover all necessary aspects in concise language.",
    "Think as if it is actually happening in your daily life. Do not give artificial or purely bookish responses.",
    "Think of simple and obvious actions. Do not complicate the scenario for nothing.",
    "Do NOT be heroic / Tarzan / Batman / Rambo / Sultan Rahi. Be realistic and sensible as a modern military officer.",
    "Do not show wishful behavior. Be sharp, quick, show presence of mind, and utilize available ground resources.",
    "Respond directly to the situation; NEVER change the plot of the story.",
    "Act, don't react. E.g., instead of merely saying 'I will call the police and leave it to them', steer the situation to its logical conclusion.",
    "Avoid skipping questions! Skipping situations shows a lack of mental stamina and inability to handle stressful workloads.",
    "Avoid vague expressions like 'I will solve the problem' or 'I will inquire about the issue'—state the specific practical action you will take."
  ]
};

export const srtSituations: SrtItem[] = [
  // Solved Examples from Official Notes
  {
    id: 1,
    category: 'solved',
    situation: "While travelling in a train, he came to know that someone has picked his pocket. He...",
    solvedAnswer: "Alerts fellow passengers, carries out a quick coordinated check, and lodges an official report with railway railway security upon reaching the station."
  },
  {
    id: 2,
    category: 'solved',
    situation: "Due to financial difficulties, his parents find it difficult to give him further education. He...",
    solvedAnswer: "Takes up a respectful part-time job or tutoring during evenings, provides financial relief to his parents, and diligently maintains excellent academic competence."
  },
  {
    id: 3,
    category: 'solved',
    situation: "While he is waiting for a bus, a serious accident took place immediately in front of him. He...",
    solvedAnswer: "Quickly notes vehicle numbers, dials emergency services, renders first aid to injured victims, aids hospitalization, and informs their family relatives."
  },
  {
    id: 4,
    category: 'solved',
    situation: "He went on a mountain expedition which was a failure and one of his companions was seriously hurt in the attempt. He...",
    solvedAnswer: "Administers proper emergency care, analyzes logistical flaws, undergoes sustained tactical mountain climbing training, and successfully triumphs in the subsequent expedition."
  },
  {
    id: 5,
    category: 'solved',
    situation: "While travelling in a train, he found that his train ticket is lost. He...",
    solvedAnswer: "Thoroughly checks his pockets and luggage once more; upon not finding it, honestly informs the ticket examiner, explains the genuine facts, and complies with standard protocol."
  },
  {
    id: 6,
    category: 'solved',
    situation: "He is passing by a lake and notices a young boy drowning in deep water who does not know swimming. He...",
    solvedAnswer: "Immediately jumps into the water with a floating aid, raises an alarm, rescues the boy to the shore, performs CPR first aid, and arranges safe medical attention."
  },
  {
    id: 7,
    category: 'solved',
    situation: "He is passing by a railway line and notices that the iron fish plates have been removed. Only 15 minutes are left for the train to reach and the station is 1.5 km away. He...",
    solvedAnswer: "Runs immediately toward the approaching train direction waving a red cloth/signal to halt the driver safely, alerts the station master via mobile or staff, and prevents the catastrophe."
  },
  {
    id: 8,
    category: 'solved',
    situation: "He wants to join the Pakistan Army whereas his respectable father wants him to become a software engineer. He...",
    solvedAnswer: "Respectfully sits with his father, explains his patriotic passion and career honors in the Armed Forces, addresses all parental concerns with maturity, and happily earns their blessing."
  },
  {
    id: 9,
    category: 'solved',
    situation: "He is going to attend a critical official meeting and is already running late. Suddenly the road is blocked due to a major traffic jam. He...",
    solvedAnswer: "Inform his superior via quick phone call about the unforeseen bottleneck, secures his transport, takes an alternative fastest transit route, and successfully reaches the meeting."
  },
  {
    id: 10,
    category: 'solved',
    situation: "In a train journey at mid-night, suspicious sounds disturb your sleep. On waking up, you find someone trying to steal luggage through the open window. He...",
    solvedAnswer: "Immediately wakes up without panic, seizes the intruder firmly, raises an alarm to alert passengers, pulls the emergency brake cord, and hands the offender over to police."
  },
  // Past ISSB Experiences & High-Frequency SRTs
  { id: 11, category: 'past-experience', situation: "Your elder brother is unfortunately falling into immoral activities and bad company. What will you do?" },
  { id: 12, category: 'past-experience', situation: "You are going for a decisive career job interview; on your way you encounter an injured citizen lying bleeding on the roadside. What will you do?" },
  { id: 13, category: 'past-experience', situation: "You are working in an organization and a senior colleague persistently irritates and taunts you. Later you become a higher manager in another company and he is posted directly under you. How will you treat him?" },
  { id: 14, category: 'past-experience', situation: "You study with your friend in a university library where free stationery is provided. While leaving every day, your friend quietly steals two official pens in his pocket. What will you do?" },
  { id: 15, category: 'past-experience', situation: "You planned an excursion picnic with lifetime friends after years. Your father strictly refuses permission. Your friends suggest lying to your father that you are going for group study at a friend's house. What will you do?" },
  { id: 16, category: 'past-experience', situation: "A poor working woman has a critical medical emergency requiring 10 lac rupees. Her hard-working husband only possesses 4 lac rupees and is your close neighbor. What should be done?" },
  { id: 17, category: 'past-experience', situation: "You have been preparing in an ISSB coaching academy, knowingly that ISSB does not encourage tutoring. During indoor tests, the GTO specifically asks you in public if you attended an academy. What will be your exact answer?" },
  { id: 18, category: 'past-experience', situation: "You are a college cricket team member and have consistently gotten out at zero for 7 matches in a stretch. It is highly likely you will lose your team selection. What will you do?" },
  { id: 19, category: 'past-experience', situation: "In a gathering of lifetime intimate friends, they insist that you consume illicit drinks with them. You politely refuse, but they get angry and say if you refuse this comradeship test, they will break friendship forever. What will you do?" },
  { id: 20, category: 'past-experience', situation: "You have to go for vital operational patrolling duty in the field. Your designated driver develops high fever. You are not officially permitted to drive the security vehicle yourself and no backup driver is instantly available." },
  { id: 21, category: 'past-experience', situation: "You have to accomplish a high-priority operational task for Headquarters within two days. Suddenly you suffer a painful leg injury in an accident, yet your commander expects task fulfillment. What will you do?" },
  { id: 22, category: 'past-experience', situation: "Your younger brother is highly addicted to online gaming (PUBG) and fails to perform in school. When someone tells him to stop, he becomes deeply aggressive and angry. How will you reform him?" },
  { id: 23, category: 'past-experience', situation: "During annual exams, your supervisor teacher asks you to let another favored student copy your paper, threatening to grade you poorly if you refuse. What will be your stance?" },
  { id: 24, category: 'past-experience', situation: "While studying late night for final term exams, you observe four masked armed intruders entering your neighbor's house whispering 'let's finish in 15 minutes'. What is your immediate action?" },
  { id: 25, category: 'past-experience', situation: "You are driving your vehicle on a remote high-speed provincial motorway when suddenly your mechanical brakes fail completely. What steps will you execute instantly?" },
  { id: 26, category: 'past-experience', situation: "A capable student always stands first in class, but during midterms fell sick and cheated to secure top marks. You as a class prefect discover authentic evidence. What should be done?" },
  { id: 27, category: 'past-experience', situation: "You are praying Friday prayers in a random grand mosque where the speaker commences an intense provocative speech against another religious sect. What will be your conduct?" },
  { id: 28, category: 'past-experience', situation: "Your neighbors shouted for help during a late-night house robbery. You ran fiercely to rescue them and trapped the fleeing robber, only to discover under the mask that he is your own cousin/brother. What will you do?" },
  // Female Candidate Specific Situations & Guidelines
  { id: 29, category: 'female', situation: "It is the last wish of your deceased father that your sister's marriage takes place on the fixed date. However, the family faces severe unforeseen financial deficits. You will..." },
  { id: 30, category: 'female', situation: "While returning from late evening university laboratory work, you notice four suspicious roadside loafers attempting to harass a lonely girl walking ahead of you. You will..." },
  { id: 31, category: 'female', situation: "While travelling solo in your car on an intercity highway, armed bandits block the track and demand your valuables and vehicle keys at gunpoint. What is your reaction?" },
  { id: 32, category: 'female', situation: "You are actively serving in an Armed Forces commissioned role while your husband holds a bank managerial job in another city. Your frequent operational transfers cause family friction and he insists you resign your uniform. What will you do?" },
  { id: 33, category: 'female', situation: "Your superior officers at workplace are repeatedly issuing contradicting operational directives, causing staff confusion and unfair blame falling on your department. How will you resolve this?" },
  { id: 34, category: 'female', situation: "You achieved a highly competitive, prestigious job after immense struggles. However, your senior boss lacks ethical boundaries and repeatedly makes you uncomfortable during closed-door briefings. What will be your decisive course of action?" }
];

// ── 4. GROUP DISCUSSION (GD) & LECTURATE TOPICS (92 TOPICS) ─────────────────
export const gdAndLecturateTopics: GdTopic[] = [
  { id: 1, topic: "Kya Muslim mumalik k masail ka hal sirf Jihad hai?", category: "International / Strategic" },
  { id: 2, topic: "Kya humara media sirf gham aur sensation ki baatain nashr krta hai?", category: "Social / General" },
  { id: 3, topic: "Pakistan ko IMF ki madad leni chahye ya khud-inhesari apnaani chahye?", category: "National / Political" },
  { id: 4, topic: "Social Media k Nojawan nasal pe asraat (Fawaid aur Nuqsanat).", category: "Social / General" },
  { id: 5, topic: "Kya humain terrorism aur khof ki waja se safar krna chor dena chahye?", category: "National / Political" },
  { id: 6, topic: "Pakistan atomic power hone k bawjud maashi taur pe kamzor kyun hai?", category: "National / Political" },
  { id: 7, topic: "CPEC (China Pakistan Economic Corridor) Project k fawaid aur nuqsanat.", category: "International / Strategic" },
  { id: 8, topic: "Afghan Taliban Mujahideen hain ya regional security ke liye challenge?", category: "International / Strategic" },
  { id: 9, topic: "Hamare mulk main Rishwat (Bribery) ki wajoohat aur unka puka hal.", category: "Social / General" },
  { id: 10, topic: "Hamare mulk main Corruption ki wajoohat aur unka institutional hal.", category: "National / Political" },
  { id: 11, topic: "Kya Pakistan ko India main rehne wale Sikhon aur minorities ki madad krni chahye?", category: "International / Strategic" },
  { id: 12, topic: "Jeet zaroori hai, chahe uski qeemat kuch bhi ho? (Winning at all costs)", category: "Abstract / Philosophical" },
  { id: 13, topic: "Universities main daakhle k liey FSc marks ko tarjeeh deni chahye ya entry test ko?", category: "Social / General" },
  { id: 14, topic: "Pakistan se firqawariyat (Sectarianism) ko kese khatm kia ja sakta hai?", category: "National / Political" },
  { id: 15, topic: "Jang se bachna chahte ho to jung ki tayari kro! (Si vis pacem, para bellum)", category: "International / Strategic" },
  { id: 16, topic: "Pakistan main wasail (Resources) ki kami hai ya honest leadership ki?", category: "National / Political" },
  { id: 17, topic: "Kalabagh Dam kyun mukamal nahi ho paa raha? National consensus vs politics.", category: "National / Political" },
  { id: 18, topic: "Police k mehkmy (Police Department) ko kese behtr banaya ja skta hai?", category: "National / Political" },
  { id: 19, topic: "Makhloot taleemi nizam (Co-Education) k fawaid aur nuqsanat.", category: "Social / General" },
  { id: 20, topic: "Curriculum me youth character building aur health education honi chahye ya nahi?", category: "Social / General" },
  { id: 21, topic: "Mobile phone aaj k daur me zaroorat hai ya majboori?", category: "Social / General" },
  { id: 22, topic: "Kya madaris e deenia ko mainstream academic board ke sath jorhna chahye?", category: "National / Political" },
  { id: 23, topic: "National security k liye kinetic military operations sahi hain ya dialogue?", category: "National / Political" },
  { id: 24, topic: "Jamhooriyat (Democracy) behtr hai ya shariyat ka qanoon?", category: "National / Political" },
  { id: 25, topic: "Kia media thrilling aur breaking news dene ki koshish me haqeeqat bhol jata hai?", category: "Social / General" },
  { id: 26, topic: "Co-education personality grooming ke liye behtr hai ya separate institutions?", category: "Social / General" },
  { id: 27, topic: "Kia Armed Forces k operations border defense k sath internal stability la rhe hain?", category: "National / Political" },
  { id: 28, topic: "Kia Pakistan taraki (Progress) ki rah par gamzan hai ya ruka hua hai?", category: "National / Political" },
  { id: 29, topic: "Governance ke liye system behtar hey ya leadership ka character?", category: "Abstract / Philosophical" },
  { id: 30, topic: "Pak-Afghan talukat kese permanent peace aur trade k liye behtr bnaye ja sakte hain?", category: "International / Strategic" },
  { id: 31, topic: "Regional conflicts me foreign intervention peace lati hai ya instability?", category: "International / Strategic" },
  { id: 32, topic: "Pakistan IMF k structural loan k baghair apna running expense chal sakta hai?", category: "National / Political" },
  { id: 33, topic: "Courts ghareebon ko timely insaaf (Justice) de rahe hain ya system sluggish hai?", category: "National / Political" },
  { id: 34, topic: "Jang ki halat main pre-emptive deterrence doctrine kitna zaroori hai?", category: "International / Strategic" },
  { id: 35, topic: "Kia hum bajaye iklaaqi baaton ke amali taur pe imandar qoum hain?", category: "Social / General" },
  { id: 36, topic: "State challenging elements k sath muzakiraat hone chahyen ya decisive operation?", category: "National / Political" },
  { id: 37, topic: "Bachon ko academy/tuition parhana lazmi ban chuka hai ya school kafi hai?", category: "Social / General" },
  { id: 38, topic: "Basant aur cultural festivals ko strict civic regulations ke sath hona chahye ya nahi?", category: "Social / General" },
  { id: 39, topic: "Pakistan ka adalti nizam (Judicial System) reforms chahta hai ya enforcement?", category: "National / Political" },
  { id: 40, topic: "Duniya bhar main Islamophobia aur extremism ka muqabla intelligent media se kese ho?", category: "International / Strategic" },
  { id: 41, topic: "Kya school aur colleges main cellphone completely allow hona chahye ya ban?", category: "Social / General" },
  { id: 42, topic: "Kya nai artificial intelligence aur technology se muashre main bigaar paida ho raha hai?", category: "Social / General" },
  { id: 43, topic: "Kya ghareeb banda aaj kal k inflation k dour main honest mahnat se uper ja sakta hai?", category: "Social / General" },
  { id: 44, topic: "Kya jamhooriat (Democracy) Pakistan k tamam institutional masail ka hal hai?", category: "National / Political" },
  { id: 45, topic: "Kya Islamic taleem k sath sath comparative global philosophy ko bhi parhna chahye?", category: "Abstract / Philosophical" },
  { id: 46, topic: "Kya Auraton ka professional fields me aala taleem hasil krna mulk ke liye faida-mand hai?", category: "Social / General" },
  { id: 47, topic: "Kya bijli aur energy crisis ki zimedar hukoomat hai ya awaami chori/wasting?", category: "National / Political" },
  { id: 48, topic: "Kya computer gaming outdoor sports se logon ko door kar ke physical stamina gira raha hai?", category: "Social / General" },
  { id: 49, topic: "Kya youth platforms nojwano ki creative salahiyaton ko ujagar karny k liye acha shola hain?", category: "Social / General" },
  { id: 50, topic: "Kya masla e Kashmir (Kashmir Dispute) ka hal UN diplomacy hai ya decisive jung?", category: "International / Strategic" },
  { id: 51, topic: "Kya mushkil k waqt jaan ya izzat bachane k liye jhoot ka sahara lia ja sakta hai?", category: "Abstract / Philosophical" },
  { id: 52, topic: "Kya humara muashra hamsayeon (Neighbors) k huqooq puray kr raha hai?", category: "Social / General" },
  { id: 53, topic: "Kya foreign dramas (like Turkish historical series) humare culture ki ikasi karty hain?", category: "Social / General" },
  { id: 54, topic: "Pakistan ka sab se bara masla kya hai? (Education, Economy, Justice, or Corruption)", category: "National / Political" },
  { id: 55, topic: "Achi aur sakoon wali zindagi guzarny k liye sab se zaroori cheez kya hai?", category: "Abstract / Philosophical" },
  { id: 56, topic: "Zindagi ka bharpoor maza lena chahye ya future k liye sacrifices krni chahye?", category: "Abstract / Philosophical" },
  { id: 57, topic: "Jang aur muhabat main kya waqaii sab kuch jaiz hai? (All is fair in love and war)", category: "Abstract / Philosophical" },
  { id: 58, topic: "Kya larkian academic consistency aur managerial roles me larkon se ziada behtar hoti hain?", category: "Social / General" },
  { id: 59, topic: "Kya chalaki aur hoshyari se har kam nikala ja sakta hai ya imandari jeet-ti hai?", category: "Abstract / Philosophical" },
  { id: 60, topic: "Zameen, zan aur daulat (Land, Women, Wealth): kya shuru se hi taqat ka sareshma rahe hain?", category: "Abstract / Philosophical" },
  { id: 61, topic: "Makhloot nizam-e-taleem faidamand academic competition hai ya sirf western fashion?", category: "Social / General" },
  { id: 62, topic: "Hostel ki self-reliant zindagi behtr hoti hai ya ghar ki comfort zone?", category: "Social / General" },
  { id: 63, topic: "Geo-strategic Importance of Pakistan's location in South & Central Asia.", category: "International / Strategic" },
  { id: 64, topic: "Mehngai (Inflation) kaise khatam ki ja sakti hai? Productivity vs Import controls.", category: "National / Political" },
  { id: 65, topic: "Kya astrology / stars humari real operational life par asar andaaz hoty hain?", category: "Abstract / Philosophical" },
  { id: 66, topic: "Traffic discipline aur public transport safety ko rigorous laws se kese nafiz kiya jaye?", category: "Social / General" },
  { id: 67, topic: "Auraton k liye national sports aur outdoor athletics participation kitni jaiz aur zaroori hai?", category: "Social / General" },
  { id: 68, topic: "Madrasay ka nisab (Syllabus) kia hona chahye taakhe modern professional graduate banay?", category: "National / Political" },
  { id: 69, topic: "Hijab aur cultural modest dressing se professional woman ka confidence barhta hai ya nahi?", category: "Social / General" },
  { id: 70, topic: "Kya humain aala taleem k liey mulk se bahir (Brain Drain) jana chahye ya watan me rehna chahye?", category: "National / Political" },
  { id: 71, topic: "Kya acha libas aur outwardly presentation achi shakhsiyat ki pehchan hai?", category: "Abstract / Philosophical" },
  { id: 72, topic: "Modern relationships vs Traditional family commitment in youth mental health.", category: "Social / General" },
  { id: 73, topic: "Kya shaadi (Marriage) aik muasharti jaal hai ya stabilizing social obligation?", category: "Abstract / Philosophical" },
  { id: 74, topic: "Pakistan main international sports aur domestic athletics ka golden era kese wapis aa sakta hai?", category: "Social / General" },
  { id: 75, topic: "Kya humare mulk main aala taleem aik profitable commercial business ban chuki hai?", category: "Social / General" },
  { id: 76, topic: "Kya Islamic banking humare mulk main genuine Riba-free financial model nafiz kar rahi hai?", category: "National / Political" },
  { id: 77, topic: "Kya mulazmat pasha (working) khwateen ko workplace me mard ki ajaara dari ka samna karna parta hai?", category: "Social / General" },
  { id: 78, topic: "Kya commercial muqabla e husn (Beauty Pageants) ka ineqaad aurat ki tazleel hai?", category: "Social / General" },
  { id: 79, topic: "National achievement symbols waqaii youth ke liye mashal-e-rah (beacons of hope) hote hain?", category: "Social / General" },
  { id: 80, topic: "Kya bachon par sakhti aur punishment unki creative zehni salahiyaton ko maand krti hai?", category: "Social / General" },
  { id: 81, topic: "Agar aap institution k principal / chief hote to kya fundamental islehaat nafiz karte?", category: "Abstract / Philosophical" },
  { id: 82, topic: "Kya taleem ka mayar buland krne k liey practical technological lab integration zaroori hai?", category: "Social / General" },
  { id: 83, topic: "Khwateen behtr financial organizers aur planners hain ya mard?", category: "Social / General" },
  { id: 84, topic: "Kya mobile phone aur internet ka be-ja istemaal ikhlaaqi buraiyon ka baais hai?", category: "Social / General" },
  { id: 85, topic: "Kya asool (Rules) torne k liey hi bnaye jate hain ya organizational integrity ke liye?", category: "Abstract / Philosophical" },
  { id: 86, topic: "Kya nojawano ko apna career khud muntakhib krna chahye ya waliden ki marzi se?", category: "Social / General" },
  { id: 87, topic: "Pakistan aur Saudi Arabia / Middle East k strategic taluqaat mazeed behtr kese ho sakte hain?", category: "International / Strategic" },
  { id: 88, topic: "Kya aadmi apni sohbat (company of friends) se pehchana jata hai? Discuss.", category: "Abstract / Philosophical" },
  { id: 89, topic: "Does hard work beat talent when talent doesn't work hard? Discuss with examples.", category: "Abstract / Philosophical" },
  { id: 90, topic: "Musalman angrezon aur developed nations k muqable science ijadaat main kyun peeche hain?", category: "International / Strategic" },
  { id: 91, topic: "Kya qatal ka badla qatal (Capital Punishment) strict deterence ke liye hona chahye?", category: "National / Political" },
  { id: 92, topic: "Kya ghairat k naam pe qatal (Honor Killing) kisi bhi qanooni ya religious standard me jaiz hai?", category: "Social / General" }
];

// ── 5. ARMED FORCES EQUIVALENT RANKS (ARMY, NAVY, AIR FORCE) ────────────────
export const militaryEquivalentRanks: RankComparison[] = [
  { navy: "Midshipman", army: "2nd Lieutenant (Gentleman Cadet)", airForce: "Pilot Officer", stars: "Commissioned Officer Entry" },
  { navy: "Sub Lieutenant", army: "Lieutenant", airForce: "Flying Officer", stars: "Two Stars / 1 Strip" },
  { navy: "Lieutenant (BN)", army: "Captain", airForce: "Flight Lieutenant", stars: "Three Stars / 2 Strips" },
  { navy: "Lieutenant Commander", army: "Major", airForce: "Squadron Leader", stars: "Crescent & Star" },
  { navy: "Commander", army: "Lieutenant Colonel", airForce: "Wing Commander", stars: "Crescent & Star with 1 Star" },
  { navy: "Captain (PN)", army: "Colonel", airForce: "Group Captain", stars: "Crescent & Star with 2 Stars" },
  { navy: "Commodore", army: "Brigadier", airForce: "Air Commodore", stars: "One Star Officer (Crescent, Star & 3 Stars)" },
  { navy: "Rear Admiral", army: "Major General", airForce: "Air Vice Marshal", stars: "Two Star Officer (★★)" },
  { navy: "Vice Admiral", army: "Lieutenant General", airForce: "Air Marshal", stars: "Three Star Officer (★★★)" },
  { navy: "Admiral (CN)", army: "General (COAS/CJCSC)", airForce: "Air Chief Marshal (CAS)", stars: "Four Star Officer (★★★★)" }
];
