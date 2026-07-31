'use server'

import { checkAndDeductAICredits } from '@/lib/ai/credits'

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
  "Addressed the main obstacle", "Good use of available materials", "Followed prioritization"
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

export async function evaluateGPEPlan(scenario: string, priorities: string, plan: string) {
  const creditCheck = await checkAndDeductAICredits()
  if (!creditCheck.allowed) {
    if (creditCheck.reason === 'not_logged_in') return { error: 'Please sign in to continue.' }
    return { error: 'insufficient_credits', reason: creditCheck.reason }
  }

  try {
    await new Promise(resolve => setTimeout(resolve, 700 + Math.random() * 800));

    const words = plan.trim().split(/\s+/);
    const wordCount = words.length;
    const lowerPlan = plan.toLowerCase();
    const lowerPriorities = priorities.toLowerCase();

    // Priority Check: Life > Security > Property
    const hasLifePriority = ['life', 'save', 'hurt', 'injury', 'injured', 'hospital'].some(k => lowerPriorities.includes(k) || lowerPlan.includes(k));
    const hasStructure = ['first', 'then', 'after', 'next', 'finally', 'team', 'divide', 'group'].some(k => lowerPlan.includes(k));
    
    let score = 5;
    
    if (wordCount >= 40) score += 2;
    else if (wordCount < 20) score -= 2;

    if (hasStructure) score += 2;
    if (hasLifePriority) score += 1;

    score = Math.max(1, Math.min(10, score));

    const verdict = score >= 6 ? "Pass" : "Fail";
    
    let feedback = "";
    if (verdict === "Pass") feedback = getRandomItem(positiveFeedbacks);
    else feedback = getRandomItem(negativeFeedbacks);

    const prosCount = verdict === "Pass" ? 2 : 1;
    const consCount = verdict === "Fail" ? 2 : 1;

    const pros = getRandomItems(prosList, prosCount);
    const cons = getRandomItems(consList, consCount);

    if (!hasLifePriority && verdict === "Fail") {
      cons[0] = "Failed to prioritize human life (the most critical objective).";
    }

    const data = {
      verdict,
      score,
      pros,
      cons: cons.slice(0, 2),
      feedback
    };

    return { success: true, data }
  } catch (error: any) {
    console.error('GPE Evaluation Error:', error)
    return { error: 'Failed to evaluate GPE plan. Please try again.' }
  }
}
