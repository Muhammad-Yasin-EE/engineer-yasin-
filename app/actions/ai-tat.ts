'use server'

import { checkAndDeductAICredits } from '@/lib/ai/credits'
import { advancedNLPCheck } from '@/lib/ai/nlp-rules'
import { saveTestResult, getPsychometricConsistency } from '@/lib/ai/logger'

const positiveFeedbacks = [
  "A pragmatic and well-structured approach highlighting functional leadership.",
  "Demonstrates strong situational awareness and a constructive outcome.",
  "Good projection of responsibility with a practical, action-oriented mindset.",
  "The protagonist shows commendable initiative and a realistic problem-solving attitude.",
  "Story flows logically with a balanced emotional tone and positive conclusion."
];

const borderlineFeedbacks = [
  "The narrative lacks a bit of depth in the action phase. Try to be more specific.",
  "A decent attempt, but the conflict resolution felt slightly rushed.",
  "Shows potential, but you need to elaborate more on the protagonist's active steps.",
  "The outcome is positive, but the buildup is slightly vague.",
  "Consider focusing more on the 'how' rather than just the 'what' in the story."
];

const negativeFeedbacks = [
  "The story lacks a clear, constructive outcome or central hero figure.",
  "The tone leans slightly pessimistic. Focus on practical solutions.",
  "Too short or lacking in coherent structure (past, present, future).",
  "The protagonist appears passive rather than taking initiative.",
  "Avoid unrealistic scenarios; focus on practical and logical problem solving."
];

const olqsList = [
  "Initiative", "Problem Solving", "Responsibility", "Social Adaptability", 
  "Practical Intelligence", "Determination", "Courage", "Cooperation",
  "Self Confidence", "Speed of Decision"
];

function getRandomItems(arr: string[], count: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getRandomItem(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function evaluateTATStory(story: string, imageNumber: number, timeTakenMs?: number) {
  const creditCheck = await checkAndDeductAICredits()
  if (!creditCheck.allowed) {
    if (creditCheck.reason === 'not_logged_in') return { error: 'Please sign in to evaluate tests.' }
    return { error: 'insufficient_credits', reason: creditCheck.reason }
  }

  try {
    await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 1000));

    // Advanced NLP Checks
    const nlpCheck = advancedNLPCheck(story, false, undefined, timeTakenMs);
    if (nlpCheck.fatalError || nlpCheck.isSpam) {
      return { 
        success: true, 
        data: {
          verdict: "Fail",
          score: 1,
          heroAnalysis: "No protagonist found due to irrelevant or nonsensical text.",
          plotAnalysis: "The narrative does not form a coherent story.",
          olqs: ["None"],
          feedback: nlpCheck.fatalError || "Spam or irrelevant text detected. Please write a genuine story based on the image."
        }
      }
    }

    const words = story.trim().split(/\s+/);
    const wordCount = words.length;
    const lowerStory = story.toLowerCase();
    
    const hasHeroKeywords = [/\bhe\b/, /\bshe\b/, /\bthey\b/, /\bdecided\b/, /\bplanned\b/, /\bled\b/, /\bmanaged\b/, /\bhelped\b/, /\bfriend\b/]
      .some(regex => regex.test(lowerStory));
      
    const hasPositiveKeywords = [/\bsuccess\b/, /\bsolved\b/, /\bhappy\b/, /\bcompleted\b/, /\bachieved\b/, /\bsaved\b/, /\bbetter\b/, /\bresolved\b/, /\bagreed\b/, /\btogether\b/]
      .some(regex => regex.test(lowerStory));
      
    const hasNegativeKeywords = [/\bdied\b/, /\bkilled\b/, /\bdepressed\b/, /\bfailed\b/, /\blost\b/, /\bhopeless\b/, /\bsad\b/, /\baccident\b/, /\bmurder\b/, /\bsuicide\b/]
      .some(regex => regex.test(lowerStory));

    let score = 4 - nlpCheck.scorePenalty;
    let verdict = "Borderline";
    
    if (wordCount >= 50 && wordCount <= 200) score += 2;
    else if (wordCount < 30) score -= 4;

    if (hasHeroKeywords) score += 2;
    if (hasPositiveKeywords) score += 2;
    if (hasNegativeKeywords) score -= 3;

    // Apply Psychometric Traits Adjustment
    score += nlpCheck.traitsAdjustment.practicalIntelligence;
    score += nlpCheck.traitsAdjustment.speedOfDecision;
    score += nlpCheck.traitsAdjustment.integrity;

    let consistencyPenalty = 0;
    let consistencyReason = null;
    if (creditCheck.userId) {
      const consistency = await getPsychometricConsistency(creditCheck.userId, 'TAT');
      consistencyPenalty = consistency.penalty;
      consistencyReason = consistency.reason;
    }
    score -= consistencyPenalty;

    score = Math.max(1, Math.min(10, score));

    if (score >= 7) verdict = "Pass";
    else if (score <= 4) verdict = "Fail";

    const heroAnalysis = score >= 6 
      ? "The protagonist is clearly identified and takes charge of the situation proactively."
      : (hasHeroKeywords ? "A central figure is present but their actions could be more decisive." : "The narrative lacks a strong, active central protagonist.");
      
    const plotAnalysis = score >= 6
      ? "The sequence of events is logical, moving smoothly from a realistic conflict to a constructive outcome."
      : (wordCount < 40 ? "The plot is underdeveloped and lacks sufficient detail to form a complete narrative arc." : "The story structure is somewhat disjointed or lacks a clear practical resolution.");

    let feedback = "";
    if (verdict === "Pass") feedback = getRandomItem(positiveFeedbacks);
    else if (verdict === "Fail") feedback = getRandomItem(negativeFeedbacks);
    else feedback = getRandomItem(borderlineFeedbacks);

    if (consistencyReason) {
      feedback += ` ${consistencyReason}`;
    }

    const olqCount = verdict === "Pass" ? 3 : (verdict === "Fail" ? 1 : 2);
    const assignedOlqs = getRandomItems(olqsList, olqCount);

    const data = {
      verdict,
      score,
      heroAnalysis,
      plotAnalysis,
      olqs: assignedOlqs,
      feedback
    };

    if (creditCheck.userId) {
      await saveTestResult(creditCheck.userId, 'TAT', score, verdict, feedback, assignedOlqs, story);
    }

    return { success: true, data }
  } catch (error: any) {
    console.error('TAT Evaluation Error:', error)
    return { error: 'Failed to evaluate TAT story. Please try again.' }
  }
}
