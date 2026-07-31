'use server'

import { checkAndDeductAICredits } from '@/lib/ai/credits'
import { advancedNLPCheck } from '@/lib/ai/nlp-rules'

const positiveFeedbacks = [
  "Excellent display of teamwork and high-energy leadership.",
  "Great coordination while adhering strictly to the race rules.",
  "A highly motivated approach that ensures no team member is left behind.",
  "Demonstrates strong group cohesion and quick obstacle clearance.",
  "A practical and team-oriented response to the scenario."
];

const negativeFeedbacks = [
  "Lacks emphasis on teamwork and coordination.",
  "Fails to explicitly mention adherence to the 'touching the snake' rule.",
  "Too individualistic. Snake race is about the group, not the individual.",
  "Vague strategy that doesn't address the specific obstacle scenario.",
  "Needs to show more motivation and physical leadership."
];

const prosList = [
  "Strong team cohesion", "High physical energy", "Rule adherence (Snake touch)",
  "Motivating leadership", "Quick decision making", "Supportive attitude"
];

const consList = [
  "Individualistic approach", "Ignored the snake rule", "Lacks motivational energy",
  "Vague execution steps", "Left slow members behind", "Assumed ideal conditions"
];

function getRandomItems(arr: string[], count: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getRandomItem(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function evaluateSnakeRacePlan(scenario: string, plan: string) {
  const creditCheck = await checkAndDeductAICredits()
  if (!creditCheck.allowed) {
    if (creditCheck.reason === 'not_logged_in') return { error: 'Please sign in to continue.' }
    return { error: 'insufficient_credits', reason: creditCheck.reason }
  }

  try {
    await new Promise(resolve => setTimeout(resolve, 700 + Math.random() * 700));

    const nlpCheck = advancedNLPCheck(plan, true);
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

    const words = plan.trim().split(/\s+/);
    const wordCount = words.length;
    const lowerPlan = plan.toLowerCase();
    
    let score = 4 - nlpCheck.scorePenalty;
    
    const hasTeamwork = [/\bteam\b/, /\btogether\b/, /\bhelp\b/, /\bpush\b/, /\bpull\b/, /\bmotivate\b/, /\bshout\b/, /\bcheer\b/, /\bgroup\b/].some(regex => regex.test(lowerPlan));
    const hasSnakeRule = [/\bsnake\b/, /\bhold\b/, /\btouch\b/, /\bcarry\b/].some(regex => regex.test(lowerPlan));

    if (wordCount >= 20) score += 2;
    else if (wordCount < 10) score -= 2;

    if (hasTeamwork) score += 2;
    if (hasSnakeRule) score += 2;

    score = Math.max(1, Math.min(10, score));

    const verdict = score >= 6 ? "Pass" : "Fail";
    
    let feedback = "";
    if (verdict === "Pass") feedback = getRandomItem(positiveFeedbacks);
    else feedback = getRandomItem(negativeFeedbacks);

    const prosCount = verdict === "Pass" ? 2 : 1;
    const consCount = verdict === "Fail" ? 2 : 1;

    const cons = getRandomItems(consList, consCount);
    
    if (!hasSnakeRule && verdict === "Fail") {
        cons[0] = "Forgot to explicitly state holding/carrying the snake.";
    }

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
    console.error('Snake Race Evaluation Error:', error)
    return { error: 'Failed to evaluate Snake Race plan. Please try again.' }
  }
}
