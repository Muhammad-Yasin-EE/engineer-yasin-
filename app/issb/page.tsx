"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

import {
  ArrowRight, Brain, Users, UserCheck, ChevronRight,
  CheckCircle2, AlertCircle, Lightbulb, Shield, Target, Clock, BookOpen,
  GraduationCap, Sparkles, MessageCircle, Phone, Lock, ShieldAlert, X, Check
} from 'lucide-react';

// ─── Dimension Data ──────────────────────────────────────────────────────────
const dimensions = [
  {
    id: 'psychology',
    title: 'Psychology',
    subtitle: 'Psychological Assessment',
    icon: Brain,
    color: 'violet',
    bannerUrl: '/images/issb-psychology.jpg',
    tagline: 'Uncover your inner self through structured mental evaluations.',
    overview:
      'The Psychological dimension assesses your intellectual faculties, emotional stability, personality make-up, social adaptability, and potential for officer-like behaviour. A trained ISSB psychologist studies your written responses across multiple tests conducted over Day 1 of the selection process.',
    tests: [
      {
        name: 'Intelligence Test',
        desc: 'Evaluates mental alertness, reasoning ability, and clarity of thought. Includes verbal and non-verbal reasoning, number series, analogies, and figure matrices.',
        tips: ['Practice speed and accuracy equally.', 'Never skip a question – attempt all within time.'],
      },
      {
        name: 'Word Association Test (WAT)',
        desc: 'You are shown 100 stimulus words (1 per minute) and must form a meaningful sentence for each. Your responses reveal your thought patterns, values, and subconscious outlook.',
        tips: ['Write positive, action-oriented sentences.', 'Avoid negativity, violence, or pessimism.', 'First instinct is usually the best — do not over-think.'],
      },
      {
        name: 'Sentence Completion Test (SCT)',
        desc: 'Complete 75 unfinished sentences in English and Urdu within a time limit. This test measures your attitudes towards family, society, and authority.',
        tips: ['Be consistent across all completions.', 'Show leadership, responsibility, and positivity.'],
      },
      {
        name: 'Picture Story Writing (TAT)',
        desc: 'Write short stories inspired by ambiguous images shown for 30 seconds each. The stories reveal your aspirations, fears, and personality traits.',
        tips: ['Build stories with a clear problem → action → positive resolution arc.', 'Include a hero with leadership qualities.'],
      },
      {
        name: 'Bio-Data Form (PBOR/Officer)',
        desc: 'A detailed personal information form filled on Day 1. Every assessor (Psychologist, GTO, Deputy President) will cross-check your bio-data during their evaluation.',
        tips: ['Fill it with complete honesty.', 'Memorise what you write – contradictions are a major red flag.'],
      },
    ],
    keyQualities: ['Emotional Stability', 'Positive Outlook', 'Leadership Potential', 'Social Responsibility', 'Integrity'],
  },
  {
    id: 'gto',
    title: 'GTO',
    subtitle: 'Group Testing Officer Tasks',
    icon: Users,
    color: 'emerald',
    bannerUrl: '/images/issb-gto.jpg',
    tagline: 'Demonstrate leadership and teamwork under real pressure.',
    overview:
      'The Group Testing Officer (GTO) dimension is the practical, outdoor assessment that evaluates how you perform within a team under physical and mental pressure. It tests leadership, initiative, communication, resourcefulness, and team spirit across a series of indoor and outdoor tasks spanning Days 2 and 3.',
    tests: [
      {
        name: 'Group Discussion (GD)',
        desc: 'A leaderless discussion among 8–12 candidates on a given topic (usually national or social issues). The GTO observes your communication skills, ability to listen, and participation quality.',
        tips: ['Speak confidently and clearly.', 'Do not dominate – encourage quiet members.', 'Bring discussions to a consensus.'],
      },
      {
        name: 'Group Planning Exercise (GPE / Military Planning)',
        desc: 'Candidates are given a model or map and a scenario involving multiple problems that must be solved using available resources. You present your plan individually, then as a group.',
        tips: ['Use a systematic SMEAC approach.', 'Prioritise life-saving tasks first.', 'Allocate resources logically.'],
      },
      {
        name: 'Progressive Group Task (PGT)',
        desc: 'The entire group must cross a series of 4 progressively harder obstacles using limited helping materials (planks, ropes, drums) without touching the ground.',
        tips: ['Contribute ideas proactively.', 'Help teammates physically when needed.', 'Stay calm and focused when plans fail.'],
      },
      {
        name: 'Half Group Task (HGT)',
        desc: 'Similar to PGT but with half the original group, increasing individual visibility and responsibility.',
        tips: ['Every member is visible — take initiative.', 'Lead naturally, not forcefully.'],
      },
      {
        name: 'Command Task',
        desc: 'Each candidate is assigned as the "Commander" and must select 2–3 helpers to complete an obstacle. This is your dedicated leadership moment.',
        tips: ['Brief your team clearly before starting.', 'Adapt when your initial plan doesn\'t work.', 'Thank your team at the end.'],
      },
      {
        name: 'Individual Obstacles (IO)',
        desc: '9 individual physical obstacles completed within a time limit. Tests physical fitness, courage, and determination.',
        tips: ['Train physically before ISSB.', 'Attempt all obstacles — partial marks count.', 'Maintain composure even if you fall.'],
      },
      {
        name: 'Snake Race / Final Group Task (FGT)',
        desc: 'A final team competition that also serves as a social icebreaker observed by the GTO.',
        tips: ['Cheer your team loudly.', 'Never let go of the "snake" (tent-pole).'],
      },
    ],
    keyQualities: ['Team Work', 'Physical Stamina', 'Initiative', 'Practical Intelligence', 'Command Presence'],
  },
  {
    id: 'deputy',
    title: 'Deputy President',
    subtitle: 'Personal Interview',
    icon: UserCheck,
    color: 'amber',
    bannerUrl: '/images/issb-deputy.jpg',
    tagline: 'Present your authentic self clearly and confidently.',
    overview:
      'The Deputy President is usually a senior serving or retired officer of Colonel/Brigadier rank (or equivalent in Navy/PAF) who conducts a formal 30–45 minute one-on-one personal interview. He assesses your general awareness, clarity of goals, moral integrity, handling of pressure, and overall suitability as a future commissioned officer.',
    tests: [
      {
        name: 'Personal & Family Background',
        desc: 'Questions regarding your parents, siblings, upbringing, education history, friendships, and daily habits. Assessor looks for a stable social foundation.',
        tips: ['Answer honestly — do not fabricate family status.', 'Show respect and gratitude for your upbringing.'],
      },
      {
        name: 'General Knowledge & Current Affairs',
        desc: 'Questions on Pakistan affairs, geopolitics, Islamic studies, science, and recent news events. Tests your general curiosity and intellectual depth.',
        tips: ['Read daily newspapers (DAWN / The News) regularly.', 'Know key geographical and military facts about Pakistan.'],
      },
      {
        name: 'Situational & Pressure Questions',
        desc: 'Hypothetical dilemmas or moral scenarios designed to see how you react under stressful or challenging circumstances.',
        tips: ['Stay calm and logical.', 'Always choose the ethical and legal path.', 'Do not contradict your previous statements.'],
      },
      {
        name: 'Motivation for Armed Forces',
        desc: 'Exploring why you want to join the military rather than a civilian profession, your alternative career plans, and your understanding of military service life.',
        tips: ['Express genuine dedication to national service.', 'Have realistic expectations of military rigor.'],
      },
    ],
    keyQualities: ['General Awareness', 'Moral Integrity', 'Communication Skills', 'Stress Tolerance', 'Confidence'],
  },
];

const overviewCards = [
  {
    id: 'psychology',
    title: 'Psychologist',
    subtitle: 'Psychological Assessment',
    cardBgUrl: '/images/issb-psychology.jpg',
    tagline: 'Uncovers the subconscious of the candidate through carefully designed psychological tests and assessments.',
    href: '#psychology',
    btnBg: 'bg-[#009beb] hover:bg-[#0089d4]',
    btnText: 'Learn More'
  },
  {
    id: 'gto',
    title: 'GTO',
    subtitle: 'Group Testing Officer Tasks',
    cardBgUrl: '/images/issb-gto.jpg',
    tagline: 'Observes candidates\' behaviour in group settings through various situational tests and group activities.',
    href: '#gto',
    btnBg: 'bg-[#00bda6] hover:bg-[#00a894]',
    btnText: 'Learn More'
  },
  {
    id: 'deputy',
    title: 'Deputy President',
    subtitle: 'Personal Interview',
    cardBgUrl: '/images/issb-deputy.jpg',
    tagline: 'Analyzes candidates\' intellect, emotional pattern and social behaviour through comprehensive interviews.',
    href: '#deputy',
    btnBg: 'bg-[#00afd1] hover:bg-[#009bb8]',
    btnText: 'Learn More'
  },
  {
    id: 'coaching',
    title: 'ISSB Training',
    subtitle: 'Professional Coaching Program',
    cardBgUrl: '/images/real-forces-illustration.jpg',
    tagline: 'Want training or coaching of GTO, Psych, Deputy, or complete ISSB? Unlock our expert mentoring programs.',
    href: '#coaching-tab',
    btnBg: 'bg-[#B8212E] hover:bg-[#A31C28]',
    btnText: 'Explore Coaching'
  }
];

// ─── Coaching Programs Data ────────────────────────────────────────────────
interface CoachingProgram {
  id: string
  title: string
  subtitle: string
  price: string
  tagline: string
  image: string
  icon: React.ComponentType<any>
  details: string[]
  badge?: string
  whatsappText: string
}

const COACHING_PROGRAMS: CoachingProgram[] = [
  {
    id: 'psychology',
    title: 'Psychology Coaching',
    subtitle: 'Written & Mental Assessment Guidance',
    price: 'Rs. 2,500',
    tagline: 'Get expert evaluation and feedback on your psychological tests.',
    image: '/images/issb-psychology.jpg',
    icon: Brain,
    details: [
      'Personal evaluation of WAT (Word Association Test) response sheet',
      'Urdu & English SCT (Sentence Completion) review and optimization',
      'Creative guidance for TAT (Picture Stories) writing',
      'Exclusive intelligence mock exams with performance reports'
    ],
    whatsappText: 'Hello Sir, I want to get details and enroll in the ISSB Psychology Coaching program. Please guide me immediately on registration.'
  },
  {
    id: 'gto',
    title: 'GTO Tasks Coaching',
    subtitle: 'Outdoor & Indoor Team Tasks Mastery',
    price: 'Rs. 3,500',
    tagline: 'Learn obstacle-crossing tricks and military mapping strategies.',
    image: '/images/issb-gto.jpg',
    icon: Users,
    details: [
      'Military Planning / GPE (Group Planning Exercise) scenario training',
      'Obstacle crossing logic (plank, rope, drum placement guidelines)',
      'Leadership behavior coaching for Command Tasks',
      'Team consensus strategies for Group Discussions (GD)'
    ],
    whatsappText: 'Hello Sir, I want to get details and enroll in the ISSB GTO Coaching program. Please guide me on the next batch timings.'
  },
  {
    id: 'deputy',
    title: 'Deputy President Interview Prep',
    subtitle: '1-on-1 Mock Interviews & Evaluation',
    price: 'Rs. 2,000',
    tagline: 'Simulate the actual ISSB interview with expert retired officers.',
    image: '/images/issb-deputy.jpg',
    icon: UserCheck,
    details: [
      'Two mock interviews simulating the actual Board environment',
      'Bio-Data form review and identification of red flags',
      'Coaching for situational judgment & pressure handling questions',
      'Comprehensive feedback on body language and confidence level'
    ],
    whatsappText: 'Hello Sir, I want to get details and enroll in the ISSB Deputy President Interview Prep. Please guide me.'
  },
  {
    id: 'complete',
    title: 'Complete ISSB Premium Prep',
    subtitle: 'All-in-One Elite Board Coaching',
    price: 'Rs. 7,500',
    badge: 'Highly Recommended',
    tagline: 'Full preparation plan covering all three ISSB assessment dimensions.',
    image: '/images/real-forces-illustration.jpg',
    icon: GraduationCap,
    details: [
      'Full coverage of GTO Tasks, Psychological Tests, and DP Interview',
      'Expert review of filled Bio-Data forms',
      'Mock interview + detailed psychological evaluation report',
      'Lifetime membership with free query support and past papers updates'
    ],
    whatsappText: 'Hello Sir, I want to enroll in the Complete ISSB Premium Coaching program. Please share the pricing and registration details.'
  }
];

// ─── Color Helpers ────────────────────────────────────────────────────────────
const colorMap: Record<string, { bg: string; border: string; text: string; badge: string; iconBg: string }> = {
  violet: {
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    text: 'text-violet-700',
    badge: 'bg-violet-100 text-violet-700',
    iconBg: 'bg-violet-100',
  },
  emerald: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    badge: 'bg-emerald-100 text-emerald-700',
    iconBg: 'bg-emerald-100',
  },
  amber: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
    badge: 'bg-amber-100 text-amber-700',
    iconBg: 'bg-amber-100',
  },
};

export default function ISSBPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'info' | 'free' | 'coaching'>('info');
  const [selectedProgram, setSelectedProgram] = useState<CoachingProgram | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }
    checkUser();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-white text-gray-800 font-medium">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
        <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
        <p className="mb-6">You need to log in or sign up to view the ISSB content and access the cards.</p>
        <div className="flex gap-4 justify-center">
          <Link href="/login" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-bold">Log In</Link>
          <Link href="/signup" className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-bold">Sign Up</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-800 pb-24 font-sans">
      {/* ── Hero Banner ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[320px] sm:min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/issb-header.jpg"
          alt="ISSB Pakistan Inter Services Selection Board"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/85 via-[#0A192F]/75 to-[#0A192F]/95 z-10" />
        <div className="relative z-20 text-center px-4 py-14 sm:py-20 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#D4AF37] text-[11px] font-extrabold uppercase tracking-widest mb-4">
            <Shield className="w-3.5 h-3.5" />
            Pakistan Armed Forces
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight mb-4 drop-shadow-xl">
            ISSB Preparation Hub
          </h1>
          <p className="text-sm sm:text-base text-gray-200 max-w-2xl mx-auto font-medium leading-relaxed">
            Complete preparation suite for the <span className="text-[#D4AF37] font-bold">Inter Services Selection Board</span>. Read general guides, practice free solved notes, or unlock elite personal coaching.
          </p>
        </div>
      </section>

      {/* ── Tabs Navigation Bar ───────────────────────────────────────────── */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 py-3 overflow-x-auto no-scrollbar">
            
            <button
              onClick={() => setActiveTab('info')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-extrabold text-xs sm:text-sm transition-all duration-200 uppercase tracking-wider cursor-pointer whitespace-nowrap ${
                activeTab === 'info'
                  ? 'bg-[#0A192F] text-[#D4AF37] shadow-md scale-[1.02]'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#D4AF37]" />
              1. Information & Guide
            </button>

            <button
              onClick={() => setActiveTab('free')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-extrabold text-xs sm:text-sm transition-all duration-200 uppercase tracking-wider cursor-pointer whitespace-nowrap ${
                activeTab === 'free'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 scale-[1.02]'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              2. Free ISSB Prep
            </button>

            <button
              onClick={() => setActiveTab('coaching')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-extrabold text-xs sm:text-sm transition-all duration-200 uppercase tracking-wider cursor-pointer whitespace-nowrap ${
                activeTab === 'coaching'
                  ? 'bg-[#B8212E] text-white shadow-md shadow-[#B8212E]/20 scale-[1.02]'
                  : 'bg-rose-50 text-[#B8212E] hover:bg-rose-100'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              3. ISSB Coaching (Paid)
            </button>

          </div>
        </div>
      </div>

      {/* ── TAB 1: INFORMATION & GUIDE ─────────────────────────────────────── */}
      {activeTab === 'info' && (
        <div className="animate-fade-in">
          {/* ── Overview Cards ───────────────────────────────────────────────── */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">ISSB Dimensions &amp; Overview</h2>
              <p className="text-gray-500 text-sm max-w-xl mx-auto">
                Understand the three core testing dimensions or explore our dedicated coaching and free materials.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {overviewCards.map((card) => {
                return (
                  <a
                    key={card.id}
                    href={card.id === 'coaching' ? '#coaching' : card.href}
                    onClick={(e) => {
                      if (card.id === 'coaching') {
                        e.preventDefault();
                        setActiveTab('coaching');
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }
                    }}
                    className="group rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full z-20 shadow-sm cursor-pointer"
                  >
                    {/* Top Image Section */}
                    {card.id === 'coaching' ? (
                      <div className="relative h-48 w-full flex overflow-hidden border-b border-gray-100">
                        <div className="relative w-1/3 h-full">
                          <Image src="/images/issb-psychology.jpg" alt="Psychology" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="relative w-1/3 h-full border-l-2 border-white">
                          <Image src="/images/issb-gto.jpg" alt="GTO" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="relative w-1/3 h-full border-l-2 border-white">
                          <Image src="/images/issb-deputy.jpg" alt="Deputy" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                        <div className="absolute bottom-3 left-4 right-4 z-20">
                          <h3 className="text-lg font-extrabold text-white tracking-wide">{card.title}</h3>
                        </div>
                      </div>
                    ) : (
                      <div className="relative h-48 w-full overflow-hidden border-b border-gray-100">
                        <Image
                          src={card.cardBgUrl}
                          alt={card.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 300px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                        <div className="absolute bottom-3 left-4 right-4 z-20">
                          <h3 className="text-lg font-extrabold text-white tracking-wide">{card.title}</h3>
                        </div>
                      </div>
                    )}
                    {/* Bottom Content Section */}
                    <div className="p-5 flex flex-col justify-between flex-grow space-y-5 bg-white">
                      <div className="space-y-2">
                        <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">
                          {card.subtitle}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium min-h-[60px]">
                          {card.tagline}
                        </p>
                      </div>
                      <div className="pt-2">
                        <div className={`w-full py-2.5 rounded-lg text-white font-bold text-center text-xs tracking-wider transition-colors uppercase ${card.btnBg}`}>
                          {card.btnText}
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>

          {/* ── Quick Facts Banner ───────────────────────────────────────────── */}
          <section className="bg-[#0A192F] py-10 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { icon: Clock, label: '4–5 Days', desc: 'Duration at ISSB' },
                { icon: Target, label: '3 Dimensions', desc: 'Psych · GTO · Interview' },
                { icon: Users, label: '8–12 Candidates', desc: 'Per group batch' },
                { icon: BookOpen, label: '100% Honest', desc: 'Key to success' }
              ].map((fact) => {
                const FIcon = fact.icon;
                return (
                  <div key={fact.label} className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <FIcon className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <div className="text-xl font-extrabold text-white">{fact.label}</div>
                    <div className="text-xs text-gray-400 font-semibold">{fact.desc}</div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── Dimension Sections ───────────────────────────────────────────── */}
          {dimensions.map((dim, idx) => {
            const clr = colorMap[dim.color];
            const Icon = dim.icon;
            const isEven = idx % 2 === 0;

            return (
              <section key={dim.id} id={dim.id} className={`py-16 scroll-mt-20 ${isEven ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div className={`order-2 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${clr.badge} text-[11px] font-extrabold uppercase tracking-wider mb-4`}>
                        <Icon className="w-3.5 h-3.5" />
                        Dimension {idx + 1}
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
                        {dim.title}
                        <span className="block text-base font-semibold text-gray-500 mt-1">{dim.subtitle}</span>
                      </h2>
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-6">{dim.overview}</p>
                      <div>
                        <p className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-3">Key Qualities Assessed</p>
                        <div className="flex flex-wrap gap-2">
                          {dim.keyQualities.map((q) => (
                            <span key={q} className={`px-3 py-1 rounded-full text-xs font-bold ${clr.badge}`}>{q}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className={`order-1 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] border border-gray-200">
                        <Image src={dim.bannerUrl} alt={dim.title} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${clr.iconBg} ${clr.text} text-xs font-extrabold`}>
                            <Icon className="w-3.5 h-3.5" />
                            {dim.subtitle}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-extrabold text-gray-800 mb-6 flex items-center gap-2">
                      <ChevronRight className={`w-5 h-5 ${clr.text}`} />
                      {dim.id === 'gto' ? 'Tasks & Exercises' : dim.id === 'deputy' ? 'Interview Topics' : 'Tests & Assessments'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {dim.tests.map((test) => (
                        <div key={test.name} className={`rounded-xl border ${clr.border} bg-white p-5 hover:shadow-md transition-shadow flex flex-col gap-3`}>
                          <h4 className={`font-extrabold text-sm ${clr.text}`}>{test.name}</h4>
                          <p className="text-xs text-gray-500 leading-relaxed flex-grow">{test.desc}</p>
                          <div className={`rounded-lg ${clr.bg} p-3 space-y-1.5`}>
                            <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                              <Lightbulb className="w-3 h-3" /> Tips
                            </p>
                            {test.tips.map((tip) => (
                              <div key={tip} className="flex items-start gap-1.5">
                                <CheckCircle2 className={`w-3 h-3 ${clr.text} shrink-0 mt-0.5`} />
                                <span className="text-[11px] text-gray-600 font-semibold leading-snug">{tip}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            );
          })}

          {/* ── General Tips Banner ──────────────────────────────────────────── */}
          <section className="bg-[#0A192F] py-14 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  🎯 Golden Rules for ISSB
                </h2>
                <p className="text-gray-400 text-sm">Essential advice that applies across all three dimensions</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: CheckCircle2, color: 'text-emerald-400', tip: 'Be Authentic', desc: 'Assessors are trained to spot coached or artificial behaviour. Your natural personality is your strongest asset.' },
                  { icon: CheckCircle2, color: 'text-emerald-400', tip: 'Stay Consistent', desc: 'Your answers in the psych tests, GTO tasks, and interview must align with each other and with your bio-data.' },
                  { icon: AlertCircle, color: 'text-amber-400', tip: 'Avoid Bragging', desc: 'Confidence is valued; arrogance is penalised. Lead by action, not by claiming you are the best.' },
                  { icon: CheckCircle2, color: 'text-emerald-400', tip: 'Be a Team Player', desc: 'Support quieter members during group tasks. Earning the respect of peers is observed and rewarded.' },
                  { icon: CheckCircle2, color: 'text-emerald-400', tip: 'Prepare Physically', desc: 'GTO outdoor tasks require real fitness. Start a regular PT routine at least 2 months before your ISSB date.' },
                  { icon: CheckCircle2, color: 'text-emerald-400', tip: 'Read the News', desc: 'Stay current on national and international affairs. The DP interview frequently touches on current events.' },
                ].map((rule) => {
                  const RIcon = rule.icon;
                  return (
                    <div key={rule.tip} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                      <RIcon className={`w-5 h-5 ${rule.color} shrink-0 mt-0.5`} />
                      <div>
                        <p className="text-white font-bold text-sm">{rule.tip}</p>
                        <p className="text-gray-400 text-xs leading-relaxed mt-0.5">{rule.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ── TAB 2: FREE ISSB PREP MATERIAL ──────────────────────────────────── */}
      {activeTab === 'free' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-widest mb-3 border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Free Candidate Portal
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Free ISSB Preparation Material
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
              Access high-yield practice sheets, solved Word Association Tests (WAT), picture story formats, and intelligence mock tests provided completely free by Engineer Yasin! More materials and PDFs are continually uploaded here.
            </p>
          </div>

          {/* ── ENGINEER YASIN ISSB PREP (REAL-TIME WAT MODULE BANNER) ───────── */}
          <div className="mb-12 relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0A192F] via-[#112240] to-[#0A192F] text-white p-8 sm:p-12 border border-[#1d335a] shadow-2xl">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-500/20 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div className="space-y-4 max-w-2xl">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-black uppercase tracking-widest">
                  🎖️ Engineer Yasin ISSB Prep • Real-Time Module
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  Real-Time WAT Practice Battery
                </h3>
                <p className="text-sm text-gray-300 font-medium leading-relaxed">
                  Experience authentic projector hall conditions! Attempt <strong className="text-amber-400">15 Complete Sets (1,500 Words)</strong> with automatic 10-second projections, Easy ➔ Hard difficulty sorting, and a sharp audio alarm at the 9th second.
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-[11px] font-extrabold text-slate-200">
                  <span className="px-2.5 py-1 bg-white/10 rounded-lg border border-white/15">⚡ 10s Timer Per Word</span>
                  <span className="px-2.5 py-1 bg-white/10 rounded-lg border border-white/15">📢 9th Sec Audio Alert</span>
                  <span className="px-2.5 py-1 bg-white/10 rounded-lg border border-white/15">🧠 1,500 Curated Words</span>
                </div>
              </div>
              <Link
                href="/issb/wat"
                className="px-8 py-5 bg-[#B8212E] hover:bg-[#961a25] active:scale-95 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-2xl transition-all shrink-0 flex items-center justify-center gap-2 border border-rose-400/20 hover:shadow-rose-900/40"
              >
                🚀 Start WAT Practice Now ➔
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              // ── Psychology Assessment Battery ──
              { title: "Word Association Test (WAT)", category: "Psychology Test", desc: "Attempt all 15 real-time practice sets (1,500 words) with 10s automatic projection & 9th-second audio alarm.", icon: Brain, isReady: true, href: "/issb/wat" },
              { title: "Sentence Completion Test (Urdu)", category: "Psychology Test", desc: "Official incomplete Urdu stimulus sentences to train positive subconscious thought patterns and courage.", icon: Brain, isReady: false },
              { title: "Sentence Completion Test (Eng)", category: "Psychology Test", desc: "Structured incomplete English phrases for testing optimism and emotional resilience under pressure.", icon: Brain, isReady: false },
              { title: "Picture Story Writing (TAT)", category: "Psychology Test", desc: "Thematic Apperception Test picture prompts for developing constructive hero-oriented action narratives.", icon: BookOpen, isReady: false },
              { title: "Pointer Story Writing", category: "Psychology Test", desc: "Merit-Demerit assessment and open-ended scenario writing to evaluate candidates' moral resolution.", icon: BookOpen, isReady: false },
              { title: "Self-Description (SD) & Peer Rating", category: "Psychology Test", desc: "Comprehensive templates for parent, teacher, friend, enemy, and personal self-evaluation profiles.", icon: UserCheck, isReady: false },
              
              // ── GTO Outdoor & Indoor Tasks ──
              { title: "Group Discussion (GD) Topics", category: "GTO Indoor Task", desc: "Current national, social, and global analytical discussion topics for leaderless group assessments.", icon: Users, isReady: false },
              { title: "Group Planning Exercise (GPE)", category: "GTO Indoor Task", desc: "Tactical military ground maps with practical problem prioritization and resource management solutions.", icon: Target, isReady: false },
              { title: "Progressive Group Task (PGT)", category: "GTO Outdoor Task", desc: "Complete ground rule guide (Colour, Rigidity, Distance rules) with helping material bridging tactics.", icon: Users, isReady: false },
              { title: "Half Group Task (HGT)", category: "GTO Outdoor Task", desc: "Sub-group execution strategies where fewer candidates allow GTO to observe individual initiative closely.", icon: Users, isReady: false },
              { title: "Command Task (CT)", category: "GTO Outdoor Task", desc: "Commander leadership execution, subordinate management, and briefing techniques under strict time limits.", icon: Award, isReady: false },
              { title: "Individual Obstacles (IO) Course", category: "GTO Outdoor Task", desc: "Techniques and stamina pacing for ditch jump, zigzag, tarzan swing, high tea, balance, and tiger leap.", icon: Target, isReady: false },
              { title: "Group Obstacle Race (Snake Race)", category: "GTO Outdoor Task", desc: "High-energy teamwork race strategies, war cries, and penalization rule adherence with the python tent.", icon: Users, isReady: false },
              { title: "Final Group Task (FGT)", category: "GTO Outdoor Task", desc: "Last collaborative test combining all squad members to assess sustained stamina and mutual cooperation.", icon: Users, isReady: false },
              
              // ── Deputy President & Bio-Data ──
              { title: "Personal Information Form (PIF)", category: "DP Assessment", desc: "Flawless bio-data sheet preparation to ensure zero contradictions with psychologist and GTO testing records.", icon: UserCheck, isReady: false },
              { title: "Deputy President (DP) Interview", category: "DP Assessment", desc: "Real interview questions on military knowledge, current affairs, family background, and stress handling.", icon: Award, isReady: false }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white border border-gray-200 hover:border-emerald-500 rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between group h-full">
                  <div>
                    <div className="flex items-center justify-between gap-1.5 mb-3 sm:mb-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-black text-[9px] sm:text-[10px] uppercase tracking-wider truncate max-w-[130px] sm:max-w-none">
                        {item.category}
                      </span>
                      {item.isReady ? (
                        <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                          ⚡ ACTIVE
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold text-gray-400 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full shrink-0">
                          SOON
                        </span>
                      )}
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-50/80 text-emerald-700 flex items-center justify-center mb-3 sm:mb-4 border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-sm sm:text-base lg:text-lg font-black text-gray-900 group-hover:text-emerald-700 transition-colors mb-1.5 sm:mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed mb-4 sm:mb-6 font-medium line-clamp-3">
                      {item.desc}
                    </p>
                  </div>
                  
                  {item.isReady ? (
                    <Link
                      href={item.href || '#'}
                      className="w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl bg-[#B8212E] hover:bg-[#961a25] active:scale-95 text-white font-black text-[11px] sm:text-xs flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-150 uppercase tracking-wider shadow-md hover:shadow-rose-900/30 shrink-0"
                    >
                      🚀 Start Practice Now ➔
                    </Link>
                  ) : (
                    <div className="w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl bg-slate-100 border border-slate-200 text-slate-400 font-extrabold text-[10px] sm:text-[11px] flex items-center justify-center gap-1.5 uppercase tracking-wider cursor-not-allowed select-none shrink-0">
                      ⏳ Prep Module Coming Soon
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Callout box for more materials */}
          <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-[#0A192F] text-white text-center shadow-xl relative overflow-hidden border border-[#112240]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
              <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-extrabold">Continual Resource Library</span>
              <h3 className="text-2xl sm:text-3xl font-black">Want Specific Free Notes or Past Papers?</h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-medium">
                We are continually updating this tab with free candidate booklets. Join our official community or text Engineer Yasin directly on WhatsApp with your study demands!
              </p>
              <div className="pt-2">
                <a
                  href="https://chat.whatsapp.com/IzPd4vwXbrjGhAkanhYvTp?s=cl&p=a&ilr=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current shrink-0" /> Join Official WhatsApp Group
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── TAB 3: ISSB COACHING (PAID SECTION) ────────────────────────────── */}
      {activeTab === 'coaching' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-widest mb-3 border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Elite Mentorship Batches
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              ISSB Training & <span className="text-[#D4AF37]">Coaching</span> Programs
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
              Step up your preparation with individual or comprehensive coaching bundles. Learn directly from military selection specialists and retired assessors to guarantee your recommendation!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {COACHING_PROGRAMS.map((program) => {
              const Icon = program.icon;
              return (
                <div 
                  key={program.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-200 flex flex-col justify-between hover:shadow-2xl hover:border-[#B8212E]/40 transition-all duration-300 group"
                >
                  {/* Image Section */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image 
                      src={program.image} 
                      alt={program.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <span className="bg-[#0A192F]/90 text-white font-black text-[11px] px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md border border-white/20">
                        {program.id === 'complete' ? 'VIP Bundle' : 'Specialized Module'}
                      </span>
                      {program.badge && (
                        <span className="bg-gradient-to-r from-[#D4AF37] to-amber-500 text-gray-950 font-black text-[11px] px-3 py-1 rounded-full uppercase tracking-wider shadow-md animate-pulse">
                          {program.badge}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-4 left-5 right-5 z-20 flex items-end justify-between text-white">
                      <div>
                        <span className="text-xs text-[#D4AF37] font-extrabold uppercase tracking-wider block mb-0.5">
                          {program.subtitle}
                        </span>
                        <h3 className="text-2xl font-black tracking-tight drop-shadow-md">
                          {program.title}
                        </h3>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[10px] text-gray-300 uppercase block font-extrabold">Fee</span>
                        <span className="text-xl sm:text-2xl font-black text-white bg-[#B8212E] px-3 py-1 rounded-xl shadow-lg inline-block">
                          {program.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow space-y-6 bg-white">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium italic mb-5 border-l-4 border-[#B8212E] pl-3 bg-gray-50 py-2 rounded-r-lg">
                        &ldquo;{program.tagline}&rdquo;
                      </p>
                      
                      <div className="space-y-3">
                        <h4 className="text-xs font-black text-gray-800 uppercase tracking-widest flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          What You Will Master:
                        </h4>
                        <ul className="space-y-2.5">
                          {program.details.map((item, index) => (
                            <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#B8212E] shrink-0 mt-2"></span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-3">
                      <button
                        onClick={() => setSelectedProgram(program)}
                        className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#B8212E] hover:bg-[#961a25] text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-xl transition-all uppercase tracking-wider cursor-pointer active:scale-95"
                      >
                        <Lock className="w-4 h-4 shrink-0" />
                        Enroll &amp; Unlock Access
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Lock Access Modal */}
          {selectedProgram && (
            <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
              <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transform scale-100 transition-all duration-300">
                
                {/* Header Lock Banner */}
                <div className="bg-[#B8212E] px-6 sm:px-8 py-7 text-white relative">
                  <button 
                    onClick={() => setSelectedProgram(null)}
                    className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 p-1.5 rounded-full transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md shrink-0 border border-white/20">
                      <Lock className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] uppercase font-extrabold tracking-widest text-white/70 block">Coaching Program Locked</span>
                      <h3 className="text-xl sm:text-2xl font-black">{selectedProgram.title}</h3>
                    </div>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6 sm:p-8 space-y-6 text-left">
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                      Enrollment in coaching batches is strictly managed directly by Engineer Yasin administration to maintain elite training quality and limited group slots.
                    </p>
                  </div>

                  <div className="space-y-3.5">
                    <h4 className="text-xs sm:text-sm font-black text-gray-800 uppercase tracking-wider">Contact Administration to Enroll:</h4>
                    
                    {/* WhatsApp Option */}
                    <a 
                      href={`https://wa.me/923116826552?text=${encodeURIComponent(selectedProgram.whatsappText)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-4 bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-200 rounded-2xl transition-all group/contact"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-md">
                          <MessageCircle className="w-6 h-6 fill-current" />
                        </div>
                        <div>
                          <p className="text-[10px] text-emerald-700 font-extrabold uppercase tracking-wider">Fastest Response</p>
                          <p className="text-sm sm:text-base font-black text-gray-900">Message on WhatsApp</p>
                        </div>
                      </div>
                      <span className="bg-emerald-500 text-white text-[10px] sm:text-xs font-black px-3.5 py-2 rounded-xl uppercase tracking-wider group-hover/contact:scale-105 transition-transform shadow-sm">
                        CHAT NOW ➔
                      </span>
                    </a>

                    {/* Phone Call Option */}
                    <a 
                      href="tel:+923098158572"
                      className="flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-2xl transition-all group/contact"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-md">
                          <Phone className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[10px] text-blue-700 font-extrabold uppercase tracking-wider">Direct Voice Support</p>
                          <p className="text-sm sm:text-base font-black text-gray-900">Call Support Centre</p>
                        </div>
                      </div>
                      <span className="bg-blue-600 text-white text-[10px] sm:text-xs font-black px-3.5 py-2 rounded-xl uppercase tracking-wider group-hover/contact:scale-105 transition-transform shadow-sm">
                        CALL NOW 📞
                      </span>
                    </a>
                  </div>

                  <button
                    onClick={() => setSelectedProgram(null)}
                    className="w-full py-3 text-xs font-bold text-gray-400 hover:text-gray-600 text-center uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Close &amp; Return Back
                  </button>
                </div>

              </div>
            </div>
          )}
        </section>
      )}

      {/* ── CTA Footer Banner ────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 pt-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">Ready to Start Your Initial Tests &amp; Mocks?</h2>
        <p className="text-gray-500 text-sm max-w-xl mx-auto mb-8 font-medium">Head over to our Armed Forces preparation hub to attempt online mock intelligence tests, verbal reasoning batteries, and academic quizzes.</p>
        <Link href="/prep/armed-forces" className="inline-flex items-center gap-2 px-8 py-4 bg-[#B8212E] hover:bg-[#961a25] text-white font-black rounded-2xl shadow-xl text-sm transition-all hover:-translate-y-0.5 uppercase tracking-wider active:scale-95">
          Go to Armed Forces Prep Hub
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
