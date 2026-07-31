'use server'

import { checkAndDeductAICredits } from '@/lib/ai/credits'
import { advancedNLPCheck } from '@/lib/ai/nlp-rules'

const positiveFeedbacks = [
  "A solid and workable plan demonstrating good command over resources.",
  "Excellent utilization of constraints and logical step-by-step execution.",
  "Practical and grounded approach. Good leadership projection.",
  "The plan shows structural clarity and effective problem solving.",
  "A pragmatic strategy that would likely succeed on ground."
];

const negativeFeedbacks = [
  "The plan lacks structural clarity and misses key constraints.",
  "Execution logic is flawed and fails to utilize available resources efficiently.",
  "Too vague. Needs more specific actionable steps to be viable.",
  "The strategy is risky and ignores basic safety and operational rules.",
  "Needs significant improvement in resource allocation and logical sequencing."
];

const prosList = [
  "Clear step-by-step logic", "Good resource utilization", "Safety protocols observed",
  "Effective delegation implied", "Quick execution timeline", "Pragmatic approach",
  "Addressed the main obstacle", "Good use of available materials",
  "Used cantilever principles", "Understood bridging effectively"
];

const consList = [
  "Vague execution steps", "Ignored minor constraints", "Could be faster",
  "Lacks contingency planning", "Overcomplicated the first step",
  "Assumed ideal conditions", "Resource allocation not explicitly detailed"
];

function getRandomItems(arr: string[], count: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getRandomItem(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function evaluateGTOPlan(plan: string, objective: string, constraints: string[]) {
  const creditCheck = await checkAndDeductAICredits()
  if (!creditCheck.allowed) {
    if (creditCheck.reason === 'not_logged_in') return { error: 'Please sign in to continue.' }
    return { error: 'insufficient_credits', reason: creditCheck.reason }
  }

  try {
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800));

    const nlpCheck = advancedNLPCheck(plan, true);
    if (nlpCheck.fatalError || nlpCheck.isSpam) {
      return { 
        success: true, 
        data: {
          verdict: "Fail",
          score: 1,
          pros: ["None"],
          cons: ["Irrelevant text provided", "Failed to construct a genuine plan"],
          feedback: nlpCheck.fatalError || "Spam or copied prompt text detected. Please write your own plan."
        }
      }
    }

    const words = plan.trim().split(/\s+/);
    const wordCount = words.length;
    const lowerPlan = plan.toLowerCase();

    const hasStructure = [/\bfirst\b/, /\bthen\b/, /\bafter\b/, /\bnext\b/, /\bfinally\b/, /\bstep\b/, /\b1\b/, /\b2\b/, /\bbridge\b/, /\btie\b/, /\bcross\b/].some(regex => regex.test(lowerPlan));
    const hasResources = [/\brope\b/, /\bplank\b/, /\bdrum\b/, /\bwood\b/, /\bbamboo\b/, /\bmaterial\b/, /\bload\b/, /\bcantilever\b/, /\bfulcrum\b/, /\blash\b/].some(regex => regex.test(lowerPlan));
    
    let score = 4 - nlpCheck.scorePenalty;
    
    if (wordCount >= 30) score += 2;
    else score -= 2;

    if (hasStructure) score += 2;
    if (hasResources) score += 2;
    
    if (wordCount < 15) score -= 3;

    score = Math.max(1, Math.min(10, score));

    const verdict = score >= 6 ? "Pass" : "Fail";
    
    let feedback = "";
    if (verdict === "Pass") feedback = getRandomItem(positiveFeedbacks);
    else feedback = getRandomItem(negativeFeedbacks);

    const prosCount = verdict === "Pass" ? 2 : 1;
    const consCount = verdict === "Fail" ? 2 : 1;

    const pros = getRandomItems(prosList, prosCount);
    const cons = getRandomItems(consList, consCount);

    if (!hasResources && verdict === "Fail") {
      cons[0] = "Failed to explicitly mention use of available helping materials.";
    }
    if (!hasStructure) {
      cons.push("Execution sequence is poorly structured.");
    }

    // Add NLP cons (like individualistic penalty)
    nlpCheck.consToAdd.forEach(c => {
      if (!cons.includes(c)) cons.push(c);
    });

    const data = {
      verdict,
      score,
      pros,
      cons: cons.slice(0, 3), // Max 3 cons
      feedback
    };

    return { success: true, data }
  } catch (error: any) {
    console.error('GTO Evaluation Error:', error)
    return { error: 'Failed to evaluate GTO plan. Please try again.' }
  }
}
