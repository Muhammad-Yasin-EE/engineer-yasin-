export interface NLPCheckResult {
  isSpam: boolean;
  scorePenalty: number;
  fatalError: string | null;
  consToAdd: string[];
}

export function advancedNLPCheck(text: string, isGroupTask: boolean = false): NLPCheckResult {
  const result: NLPCheckResult = {
    isSpam: false,
    scorePenalty: 0,
    fatalError: null,
    consToAdd: []
  };

  const lowerText = text.toLowerCase().trim();
  const words = lowerText.split(/\s+/);
  if (words.length === 0) return result;

  // 1. Gibberish / Repetition Spam
  if (words.length >= 10) {
    const uniqueWords = new Set(words);
    const ratio = uniqueWords.size / words.length;
    if (ratio < 0.4) {
      result.isSpam = true;
      result.fatalError = "Spam or highly repetitive text detected.";
      return result;
    }
  }

  // 2. Prompt Copying
  if (lowerText.includes("analyze the obstacle") || lowerText.includes("write down your strategy")) {
    result.isSpam = true;
    result.fatalError = "Prompt text copying detected. Please write your own original plan.";
    return result;
  }

  // 3. Punctuation & Run-on Sentence Check
  if (words.length > 25) {
    const hasPunctuation = /[.,;\-!]/g.test(text);
    if (!hasPunctuation) {
      result.scorePenalty += 4;
      result.consToAdd.push("Severe run-on sentence. Lacks basic punctuation and clarity.");
    }
  }

  // 4. Questions Check
  const questionCount = (text.match(/\?/g) || []).length;
  const hasDoubtPhrases = [/\bis this okay\b/, /\bwhy should i\b/, /\bcan i\b/, /\bwhat if\b/].some(regex => regex.test(lowerText));
  
  if (questionCount > 0 || hasDoubtPhrases) {
    result.scorePenalty += 3;
    result.consToAdd.push("Plan contains questions or doubts instead of decisive action.");
  }

  // 5. Red Flags / Disrespect / Nonsense
  const redFlags = [
    /\bsir\b/, /\brecomendation\b/, /\brecommendation\b/, /\bjoke\b/, /\bhaha\b/, /\blol\b/, 
    /\bidk\b/, /\bdont know\b/, /\bstupid\b/, /\bfuck\b/, /\bshit\b/, 
    /\bhead\b/, /\bhits?\b/, /\bkill\b/
  ];
  if (redFlags.some(regex => regex.test(lowerText))) {
    result.fatalError = "Inappropriate, informal, or nonsensical language detected.";
    return result; 
  }

  // 6. Selfish vs Team Ratio
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
