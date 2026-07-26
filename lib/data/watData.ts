export interface WatWord {
  id: number;
  word: string;
  difficulty: 'easy' | 'moderate' | 'hard';
}

export interface WatSet {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  words: WatWord[];
}

// Complete Word Pool compiled from handwritten registers, 2021 presentation slides, and standard exercises
const easyWordsPool = [
  "Work", "Atom", "Country", "Step", "Company", "Love", "Duty", "Girl", "Eat", "Decide",
  "Give", "Enjoy", "Careful", "Success", "Trust", "Solve", "Story", "Break", "Friend", "Garden",
  "Help", "Home", "Good", "Mother", "Peace", "Smile", "Study", "Honor", "Happy", "Clean",
  "Cool", "Courage", "Kind", "Leader", "Memory", "Music", "Nature", "Note", "Open", "Quiet",
  "Save", "Succeed", "Value", "Welcome", "Young", "Zeal", "Admire", "Aid", "Balance", "Beauty",
  "Brave", "Calm", "Cheer", "Childhood", "Civil", "Climbing", "Comfort", "Confident", "Courtesy", "Creative",
  "Decent", "Delight", "Devote", "Dignity", "Discipline", "Earn", "Educate", "Efficiency", "Elect", "Embrace",
  "Encourage", "Energy", "Equality", "Excellence", "Fact", "Fair", "Faith", "Famous", "Father", "Favor",
  "Flow", "Flower", "Fluid", "Focus", "Fond", "Form", "Fortunate", "Freedom", "Friendly", "Future",
  "Gain", "Gamble", "Gate", "Gather", "Gem", "General", "Genius", "Gentle", "Gift", "Give",
  "Glad", "Glory", "Glow", "Goal", "Gold", "Grace", "Grade", "Grateful", "Great", "Green",
  "Greet", "Group", "Grow", "Guidance", "Guide", "Habit", "Hand", "Happy", "Harmony", "Harvest",
  "Health", "Heart", "Heaven", "Height", "Hero", "Heroic", "High", "Hike", "History", "Holding",
  "Holy", "Homeland", "Honest", "Honesty", "Hope", "Horizon", "Horse", "Humble", "Ideal", "Ideas",
  "Identity", "Immense", "Improve", "Income", "Independent", "Information", "Initiative", "Innocent", "Insight", "Inspire",
  "Instrument", "Intention", "Invest", "Invite", "Involve", "Iron", "Jewel", "Join", "Joint", "Joke",
  "Journey", "Joy", "Judge", "Justice", "Keystat", "Kid", "Kindness", "Kingdom", "Knowledge", "Labor",
  "Language", "Lead", "Leader", "Leadership", "Learn", "Lecture", "Liberty", "Library", "Light", "Logic",
  "Loyal", "Loyalty", "Luck", "Magnetic", "Magnific", "Maintain", "Major", "Maker", "Manage", "Manner",
  "Master", "Medal", "Meet", "Melody", "Mentor", "Mercy", "Merit", "Modern", "Modesty", "Moral",
  "Morale", "Morning", "Motherland", "Motivation", "Move", "Mutual", "Nation", "Natural", "Neat", "Neighbor",
  "Network", "New", "Noble", "Normal", "Observe", "Occupy", "Offer", "Officer", "Official", "Old",
  "Opinion", "Opportunity", "Optimize", "Order", "Organize", "Original", "Outcome", "Overcome", "Pacify", "Palace",
  "Patience", "Patriot", "Patriotic", "Pattern", "Peaceful", "Peak", "Perfect", "Perform", "Persistence", "Pioneer",
  "Plan", "Polite", "Positive", "Power", "Praise", "Pray", "Prayer", "Precaution", "Precious", "Prefer",
  "Presence", "Present", "Prestige", "Progress", "Protect", "Proud", "Punctuality", "Pure", "Purpose", "Quality"
];

const moderateWordsPool = [
  "Command", "Attack", "PUBG", "Viral", "Dark web", "Mobile", "Snapchat", "Instagram", "Soldier", "Rifle",
  "Danger", "Challenge", "Defend", "Force", "Guard", "Patrol", "Target", "Strategy", "Trophy", "Uniform",
  "Mission", "Radar", "Cyber", "Engine", "Pilot", "Vessel", "Armor", "Rocket", "Shield", "E-Gaming",
  "Smart phone", "Electronic media", "Reboot", "Facebook", "Media", "Chat room", "Club", "Selfie", "WhatsApp", "Google",
  "Artificial intelligence", "Chrome", "Action", "Active", "Agency", "Alert", "Apprehend", "Army", "Arrest", "Assemble",
  "Assembly", "Authority", "Battle", "Block", "Bomb", "Branch", "Bridge", "Briefcase", "Budget", "Cabinet",
  "Camp", "Campaign", "Capital", "Captain", "Carrier", "Channel", "Charge", "City", "Civilian", "Combat",
  "Commando", "Complex", "Configure", "Conflict", "Conquer", "Control", "Courier", "Curiosity", "Cycle", "Damage",
  "Daring", "Dash", "Data", "Decision", "Defense", "Defiant", "Deploy", "Deployment", "Design", "Destination",
  "Destroy", "Detect", "Determine", "Device", "Direct", "Directive", "Discover", "Drive", "Drop", "Eagle",
  "Economy", "Education", "Efficiency", "Element", "Encounter", "Engagement", "Engineer", "Enter", "Execute", "Expedite",
  "Experience", "Factory", "Failure", "Fight", "Filter", "Firing", "Fleet", "Flight", "Float", "Follow",
  "Foreign", "Format", "Formation", "Fort", "Found", "Function", "Gravity", "Gun", "Hammer", "Harsh",
  "Hazard", "Hit", "Hunt", "Impact", "Impose", "Inspection", "Instruct", "Intercept", "Intervene", "Investigate",
  "Jump", "Kick", "Knife", "Laser", "Launch", "Length", "Lethal", "Limit", "Load", "Logistics",
  "Machine", "Marine", "Matter", "Maximum", "Mechanical", "Message", "Messenger", "Military", "Modify", "Monitor",
  "Motion", "Mountain", "Naval", "Navigate", "Navy", "Neutral", "Objective", "Obstacle", "Occupy", "Operation",
  "Opposition", "Orbit", "Orderly", "Ordinant", "Output", "Paratroop", "Passage", "Patroling", "Persuade", "Planet",
  "Police", "Policy", "Project", "Propound", "Pursuit", "Question", "Quick", "Radar", "Raid", "Rapid",
  "Reaction", "Record", "Recruit", "Reform", "Regiment", "Region", "Regulate", "Reinforce", "Rescue", "Research"
];

const hardWordsPool = [
  "Suicide", "Naked", "Lust", "Divorce", "Betray", "Intimacy", "Scam", "Greed", "Inferiority", "Prejudice",
  "Crime", "Murder", "Hate", "Revenge", "Hostile", "Enemy", "Devil", "Upset", "Weep", "Blunder",
  "Abuse", "Affair", "Anxious", "Arrogant", "Beg", "Bitter", "Blind", "Blood", "Broken", "Burden",
  "Cheap", "Cheat", "Confuse", "Coward", "Crack", "Crazy", "Crisis", "Critical", "Cruel", "Crush",
  "Cry", "Curse", "Dark", "Dead", "Death", "Deit", "Delay", "Deceive", "Defeat", "Deny",
  "Deprive", "Despair", "Desperate", "Destroy", "Disaster", "Disease", "Dislike", "Dismiss", "Distain", "Ditch",
  "Dodge", "Doubt", "Dull", "Dump", "Emergency", "Empty", "End", "Envious", "Evil", "Exclude", "Exhaust",
  "Exile", "Fake", "Fatal", "Fate", "Fatigue", "Fear", "Fever", "Flood", "Fool", "Forbid", "Forceful",
  "Foul", "Fraud", "Furious", "Fury", "Ghost", "Grief", "Guilty", "Handicap", "Harassment", "Hard",
  "Hazardous", "Hesitate", "Homeless", "Horrible", "Hungress", "Ignorance", "Ignore", "Illegal", "Impossible", "Injury",
  "Insecure", "Insult", "Irritate", "Isolation", "Jealous", "Kidnap", "Kill", "Late", "Liar", "Lie",
  "Loneliness", "Lonely", "Loss", "Lost", "Mad", "Miserable", "Misfortune", "Mistaking", "Monster", "Mourn",
  "Neglect", "Nervous", "Noise", "Obstruct", "Offence", "Oppose", "Outrage", "Panic", "Paralysis", "Penalty",
  "Poison", "Poor", "Prejudiced", "Prison", "Problem", "Punishment", "Rampage", "Raw", "Refusal", "Regret",
  "Reject", "Renounced", "Retreat", "Revenant", "Risk", "Rivalry", "Robber", "Ruin", "Sad", "Scream",
  "Shame", "Shock", "Sick", "Sin", "Sickness", "Slaughter", "Slip", "Smoke", "Sorrow", "Steal",
  "Sting", "Strike", "Stupid", "Submit", "Suffer", "Surrender", "Suspicion", "Sweat", "Sword", "Taboo",
  "Tear", "Temper", "Terror", "Thief", "Threat", "Tomb", "Torn", "Torture", "Tragedy", "Trapped",
  "Trash", "Treason", "Trembling", "Trouble", "Ugly", "Unable", "Uncertain", "Unconscious", "Unemployment", "Unfair",
  "Unhappy", "Unreliable", "Unrest", "Vanity", "Victim", "Violation", "Violence", "Virus", "Vulnerable", "Wastage",
  "Weak", "Weapon", "Widow", "Wild", "Wound", "Wrath", "Wreck", "Wrong", "Yield", "Zero"
];

// Generate 15 distinct sets of exactly 100 words each (50 Easy, 30 Moderate, 20 Hard)
export const watSets: WatSet[] = Array.from({ length: 15 }, (_, setIdx) => {
  const setNum = setIdx + 1;
  const setWords: WatWord[] = [];

  // Pick 50 Easy words round-robin
  for (let i = 0; i < 50; i++) {
    const wordIdx = (setIdx * 50 + i) % easyWordsPool.length;
    setWords.push({
      id: i + 1,
      word: easyWordsPool[wordIdx],
      difficulty: 'easy'
    });
  }

  // Pick 30 Moderate words round-robin
  for (let i = 0; i < 30; i++) {
    const wordIdx = (setIdx * 30 + i) % moderateWordsPool.length;
    setWords.push({
      id: 50 + i + 1,
      word: moderateWordsPool[wordIdx],
      difficulty: 'moderate'
    });
  }

  // Pick 20 Hard words round-robin
  for (let i = 0; i < 20; i++) {
    const wordIdx = (setIdx * 20 + i) % hardWordsPool.length;
    setWords.push({
      id: 80 + i + 1,
      word: hardWordsPool[wordIdx],
      difficulty: 'hard'
    });
  }

  return {
    id: `set-${setNum}`,
    title: `WAT Test ${setNum < 10 ? '0' + setNum : setNum}`,
    subtitle: `Official Armed Forces Psychological Test`,
    description: `Standard ISSB Word Association Test containing 100 official stimulus words for regular candidate practice under simulated testing center conditions.`,
    words: setWords
  };
});

export function getWatSetById(id: string): WatSet | undefined {
  return watSets.find(s => s.id === id || s.id === `set-${id}`);
}
