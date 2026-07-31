'use server'

import { checkAndDeductAICredits } from '@/lib/ai/credits'

// Authentic sounding feedback templates
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
  "Addressed the main obstacle", "Good use of available materials"
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
  // 1. Check credits first
  const creditCheck = await checkAndDeductAICredits()
  if (!creditCheck.allowed) {
    if (creditCheck.reason === 'not_logged_in') return { error: 'Please sign in to continue.' }
    return { error: 'insufficient_credits', reason: creditCheck.reason }
  }

  try {
    // Artificial delay to mimic AI processing time
    await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 800));

    const words = plan.trim().split(/\s+/);
    const wordCount = words.length;
    const lowerPlan = plan.toLowerCase();

    // Heuristics
    const hasStructure = ['first', 'then', 'after', 'next', 'finally', 'step', '1', '2', 'bridge', 'tie', 'cross'].some(k => lowerPlan.includes(k));
    const hasResources = ['rope', 'plank', 'drum', 'wood', 'bamboo', 'material', 'load'].some(k => lowerPlan.includes(k));
    
    let score = 5;
    
    if (wordCount >= 30) score += 2;
    else score -= 2;

    if (hasStructure) score += 2;
    if (hasResources) score += 1;
    
    // Penalize if it's exceptionally short
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

    // Contextualize slightly
    if (!hasResources && verdict === "Fail") {
      cons[0] = "Failed to explicitly mention use of available helping materials.";
    }
    if (!hasStructure) {
      cons.push("Execution sequence is poorly structured.");
    }

    const data = {
      verdict,
      score,
      pros,
      cons: cons.slice(0, 2), // Keep to 2 max
      feedback
    };

    return { success: true, data }
  } catch (error: any) {
    console.error('GTO Evaluation Error:', error)
    return { error: 'Failed to evaluate GTO plan. Please try again.' }
  }
}
