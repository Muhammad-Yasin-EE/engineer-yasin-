'use server'

import { checkAndDeductAICredits } from '@/lib/ai/credits'
import { advancedNLPCheck } from '@/lib/ai/nlp-rules'

const positiveFeedbacks = [
  "A very logical and energy-efficient sequence.",
  "Excellent stamina pacing and high-value obstacle targeting.",
  "Shows good physical planning and mental agility.",
  "A solid plan that maximizes points within the timeframe.",
  "Pragmatic approach to tackling Individual Obstacles."
];

const negativeFeedbacks = [
  "The sequence is haphazard and lacks stamina management.",
  "Poor planning. High-energy obstacles grouped too closely.",
  "Ignores point maximization strategy.",
  "The route requires too much backtracking, wasting time.",
  "Needs a more structured approach to balance speed and stamina."
];

const prosList = [
  "Good point maximization", "Effective stamina pacing", "Logical route progression",
  "Tackled high-value obstacles early", "Balanced energy expenditure", "Clear sequential flow"
];

const consList = [
  "Suboptimal route flow", "Poor stamina management", "Missed high-point opportunities early on",
  "Too much backtracking", "Clustered physically draining tasks", "Unrealistic time estimation"
];

function getRandomItems(arr: string[], count: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getRandomItem(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function evaluateIOPlan(obstacleOrder: string) {
  const creditCheck = await checkAndDeductAICredits()
  if (!creditCheck.allowed) {
    if (creditCheck.reason === 'not_logged_in') return { error: 'Please sign in to continue.' }
    return { error: 'insufficient_credits', reason: creditCheck.reason }
  }

  try {
    await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 600));

    const nlpCheck = advancedNLPCheck(obstacleOrder, false);
    if (nlpCheck.fatalError || nlpCheck.isSpam) {
      return { 
        success: true, 
        data: {
          verdict: "Fail",
          score: 1,
          pros: ["None"],
          cons: ["Irrelevant text provided"],
          feedback: nlpCheck.fatalError || "Spam or copied prompt text detected."
        }
      }
    }

    const words = obstacleOrder.trim().split(/\s+/);
    const wordCount = words.length;
    
    let score = 5 - nlpCheck.scorePenalty;
    
    if (wordCount >= 10) score += 2;
    else if (wordCount < 5) score -= 3;

    if (obstacleOrder.includes(',') || obstacleOrder.includes('-') || obstacleOrder.includes('>')) {
       score += 2;
    }

    score = Math.max(1, Math.min(10, score));

    const verdict = score >= 6 ? "Pass" : "Fail";
    
    let feedback = "";
    if (verdict === "Pass") feedback = getRandomItem(positiveFeedbacks);
    else feedback = getRandomItem(negativeFeedbacks);

    const prosCount = verdict === "Pass" ? 2 : 1;
    const consCount = verdict === "Fail" ? 2 : 1;

    const cons = getRandomItems(consList, consCount);
    nlpCheck.consToAdd.forEach(c => {
      if (!cons.includes(c)) cons.push(c);
    });

    const data = {
      verdict,
      score,
      pros: getRandomItems(prosList, prosCount),
      cons: cons.slice(0, 3),
      feedback
    };

    return { success: true, data }
  } catch (error: any) {
    console.error('IO Evaluation Error:', error)
    return { error: 'Failed to evaluate IO plan. Please try again.' }
  }
}
