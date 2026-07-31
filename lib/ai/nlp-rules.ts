export interface NLPCheckResult {
  isSpam: boolean;
  scorePenalty: number;
  fatalError: string | null;
  consToAdd: string[];
  traitsAdjustment: {
    practicalIntelligence: number;
    speedOfDecision: number;
    integrity: number;
  };
}

const CLICHES = [
  "worked hard day and night",
  "passed with flying colors",
  "overcame all obstacles easily",
  "everyone was very happy",
  "he was a brave boy",
  "served the nation"
];

function calculateSimilarity(str1: string, str2: string) {
  // Simple substring overlap check for zero-copy
  const words1 = str1.split(/\s+/);
  const words2 = new Set(str2.split(/\s+/));
  let matchCount = 0;
  for (const w of words1) {
    if (w.length > 4 && words2.has(w)) matchCount++;
  }
  return matchCount / Math.max(words1.length, 1);
}

export function advancedNLPCheck(
  text: string, 
  isGroupTask: boolean = false,
  promptText?: string,
  timeTakenMs?: number
): NLPCheckResult {
  const result: NLPCheckResult = {
    isSpam: false,
    scorePenalty: 0,
    fatalError: null,
    consToAdd: [],
    traitsAdjustment: {
      practicalIntelligence: 0,
      speedOfDecision: 0,
      integrity: 0
    }
  };

  const lowerText = text.toLowerCase().trim();
  const words = lowerText.split(/\s+/);
  if (words.length === 0) return result;

  // 1. Prompt Copying (Zero-Copy Check)
  if (promptText) {
    const lowerPrompt = promptText.toLowerCase().trim();
    const similarity = calculateSimilarity(lowerText, lowerPrompt);
    // If more than 60% of significant words in answer are from the prompt
    if (similarity > 0.6) {
      result.isSpam = true;
      result.fatalError = "Prompt copying detected. You have simply restated the problem. An officer provides solutions, not repetitions.";
      result.traitsAdjustment.integrity = -5; // Severe penalty for cheating
      return result;
    }
  }

  // 2. Actionable Intent Verification (The "Doing" Check)
  // Look for action verbs tied to the candidate/team
  const actionPattern = /\b(i|we)\b\s+(will|can|could|should|must|plan to|suggest|decide to|first|then)?\s*(tie|place|put|move|jump|cross|bridge|make|use|take|carry|ask|tell|help)\b/i;
  if (!actionPattern.test(lowerText) && words.length > 15) {
    result.scorePenalty += 3;
    result.consToAdd.push("Lacks actionable intent. The response is too descriptive and lacks clear decision-making (e.g., 'I will place...').");
    result.traitsAdjustment.practicalIntelligence = -2;
  }

  // 3. Known-Plagiarism Vault (Anti-Ratta System)
  const hasCliche = CLICHES.some(cliche => lowerText.includes(cliche));
  if (hasCliche) {
    result.scorePenalty += 2;
    result.consToAdd.push("Contains heavily memorized or clichéd bookish phrases. Lacks originality.");
    result.traitsAdjustment.integrity = -2;
  }

  // 4. Cognitive Load Tracking (Time & Hesitation)
  if (timeTakenMs) {
    const minutes = timeTakenMs / 60000;
    if (minutes > 8) {
      result.scorePenalty += 2;
      result.consToAdd.push(`Slow decision making. Taking ${minutes.toFixed(1)} minutes shows hesitation.`);
      result.traitsAdjustment.speedOfDecision = -3;
    } else if (minutes < 1 && words.length > 50) {
      // Unnaturally fast typing (probably copy-pasted from outside)
      result.isSpam = true;
      result.fatalError = "Unnatural typing speed detected. External copy-pasting is not allowed.";
      result.traitsAdjustment.integrity = -5;
      return result;
    } else if (minutes <= 3 && words.length >= 30) {
      result.traitsAdjustment.speedOfDecision = 2; // Bonus for fast, decisive thought
    }
  }

  // 5. Gibberish / Repetition Spam (Keyword Stuffing Defense)
  if (words.length >= 10) {
    const uniqueWords = new Set(words);
    const ratio = uniqueWords.size / words.length;
    if (ratio < 0.4) {
      result.isSpam = true;
      result.fatalError = "Spam, keyword stuffing, or highly repetitive text detected.";
      result.traitsAdjustment.integrity = -4;
      return result;
    }
  }

  // 6. Punctuation & Run-on Sentence Check
  if (words.length > 25) {
    const hasPunctuation = /[.,;\-!]/g.test(text);
    if (!hasPunctuation) {
      result.scorePenalty += 2;
      result.consToAdd.push("Run-on sentence. Lacks basic punctuation and clarity.");
    }
  }

  // 7. Questions Check
  const questionCount = (text.match(/\?/g) || []).length;
  const hasDoubtPhrases = [/\bis this okay\b/, /\bwhy should i\b/, /\bcan i\b/, /\bwhat if\b/].some(regex => regex.test(lowerText));
  
  if (questionCount > 0 || hasDoubtPhrases) {
    result.scorePenalty += 3;
    result.consToAdd.push("Plan contains questions or doubts instead of decisive action.");
    result.traitsAdjustment.speedOfDecision = -2;
  }

  // 8. Red Flags / Disrespect / Nonsense
  const redFlags = [
    /\bsir\b/, /\brecomendation\b/, /\brecommendation\b/, /\bjoke\b/, /\bhaha\b/, /\blol\b/, 
    /\bidk\b/, /\bdont know\b/, /\bstupid\b/, /\bfuck\b/, /\bshit\b/, 
    /\bhead\b/, /\bhits?\b/, /\bkill\b/
  ];
  if (redFlags.some(regex => regex.test(lowerText))) {
    result.fatalError = "Inappropriate, informal, or nonsensical language detected.";
    return result; 
  }

  // 9. Selfish vs Team Ratio
  if (isGroupTask) {
    const selfishCount = (lowerText.match(/\bi\b/g) || []).length + (lowerText.match(/\bme\b/g) || []).length + (lowerText.match(/\bmy\b/g) || []).length;
    const teamCount = (lowerText.match(/\bwe\b/g) || []).length + (lowerText.match(/\bus\b/g) || []).length + (lowerText.match(/\bour\b/g) || []).length + (lowerText.match(/\bteam\b/g) || []).length;
    
    if (selfishCount > 3 && selfishCount > teamCount * 2) {
      result.scorePenalty += 2;
      result.consToAdd.push("Highly individualistic approach. Needs more focus on the team ('We' instead of 'I').");
    }
  }

  return result;
}
