'use server'

import { checkAndDeductAICredits } from '@/lib/ai/credits'

// Authentic sounding feedback templates
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

// Helper to check for repeating spam
function isRepetitiveSpam(text: string): boolean {
  const words = text.toLowerCase().trim().split(/\s+/);
  if (words.length < 10) return false;
  
  const uniqueWords = new Set(words);
  const ratio = uniqueWords.size / words.length;
  // If less than 40% of the words are unique, it's likely copy-pasted spam
  return ratio < 0.4;
}

export async function evaluateTATStory(story: string, imageNumber: number) {
  // 1. Check credits first
  const creditCheck = await checkAndDeductAICredits()
  if (!creditCheck.allowed) {
    if (creditCheck.reason === 'not_logged_in') return { error: 'Please sign in to evaluate tests.' }
    return { error: 'insufficient_credits', reason: creditCheck.reason }
  }

  try {
    await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 1000));

    const words = story.trim().split(/\s+/);
    const wordCount = words.length;
    
    // 1. Spam / Copy-Paste Detection
    if (isRepetitiveSpam(story) || story.toLowerCase().includes("analyze the obstacle course")) {
      return { 
        success: true, 
        data: {
          verdict: "Fail",
          score: 1,
          heroAnalysis: "No protagonist found. Irrelevant or copied text detected.",
          plotAnalysis: "The narrative does not form a coherent story.",
          olqs: ["None"],
          feedback: "Spam or irrelevant text detected. Please write a genuine story based on the image."
        }
      }
    }

    const lowerStory = story.toLowerCase();
    
    // Use word boundaries \b to prevent "the" from matching "he"
    const hasHeroKeywords = [/\bhe\b/, /\bshe\b/, /\bthey\b/, /\bdecided\b/, /\bplanned\b/, /\bled\b/, /\bmanaged\b/, /\bhelped\b/, /\bfriend\b/]
      .some(regex => regex.test(lowerStory));
      
    const hasPositiveKeywords = [/\bsuccess\b/, /\bsolved\b/, /\bhappy\b/, /\bcompleted\b/, /\bachieved\b/, /\bsaved\b/, /\bbetter\b/, /\bresolved\b/, /\bagreed\b/, /\btogether\b/]
      .some(regex => regex.test(lowerStory));
      
    const hasNegativeKeywords = [/\bdied\b/, /\bkilled\b/, /\bdepressed\b/, /\bfailed\b/, /\blost\b/, /\bhopeless\b/, /\bsad\b/, /\baccident\b/, /\bmurder\b/, /\bsuicide\b/]
      .some(regex => regex.test(lowerStory));

    let score = 4;
    let verdict = "Borderline";
    
    // Scoring Logic
    if (wordCount >= 50 && wordCount <= 200) score += 2;
    else if (wordCount < 30) score -= 4;

    if (hasHeroKeywords) score += 2;
    if (hasPositiveKeywords) score += 2;
    if (hasNegativeKeywords) score -= 3;

    score = Math.max(1, Math.min(10, score));

    if (score >= 7) verdict = "Pass";
    else if (score <= 4) verdict = "Fail";

    // Dynamic Analysis
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

    return { success: true, data }
  } catch (error: any) {
    console.error('TAT Evaluation Error:', error)
    return { error: 'Failed to evaluate TAT story. Please try again.' }
  }
}
