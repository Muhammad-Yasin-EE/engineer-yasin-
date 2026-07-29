import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const flashcards = [
  // General Knowledge (GK)
  { category: "GK", front_text: "When did Pakistan conduct its first nuclear test?", back_text: "28 May 1998 (Youm-e-Takbeer)", difficulty: "Medium" },
  { category: "GK", front_text: "Who was the first Commander-in-Chief of Pakistan Army?", back_text: "General Sir Frank Messervy", difficulty: "Medium" },
  { category: "GK", front_text: "What is the capital of Australia?", back_text: "Canberra", difficulty: "Easy" },
  { category: "GK", front_text: "Which planet is known as the Red Planet?", back_text: "Mars", difficulty: "Easy" },
  { category: "GK", front_text: "Who wrote the national anthem of Pakistan?", back_text: "Hafeez Jalandhari", difficulty: "Easy" },
  { category: "GK", front_text: "What is the highest military award of Pakistan?", back_text: "Nishan-e-Haider", difficulty: "Easy" },
  { category: "GK", front_text: "Which is the longest river in Pakistan?", back_text: "Indus River", difficulty: "Easy" },
  { category: "GK", front_text: "Who was the first Governor-General of Pakistan?", back_text: "Quaid-e-Azam Muhammad Ali Jinnah", difficulty: "Easy" },
  { category: "GK", front_text: "What is the largest province of Pakistan by area?", back_text: "Balochistan", difficulty: "Easy" },
  { category: "GK", front_text: "When was the Constitution of Pakistan passed?", back_text: "1973", difficulty: "Medium" },
  
  // English
  { category: "English", front_text: "Synonym of 'Abundant'", back_text: "Plentiful, Copious, Ample", difficulty: "Easy" },
  { category: "English", front_text: "Meaning of 'Eloquent'", back_text: "Fluent or persuasive in speaking or writing.", difficulty: "Medium" },
  { category: "English", front_text: "Meaning of 'Meticulous'", back_text: "Showing great attention to detail; very careful and precise.", difficulty: "Medium" },
  { category: "English", front_text: "Synonym of 'Tenacious'", back_text: "Persistent, Resolute, Determined", difficulty: "Hard" },
  { category: "English", front_text: "Antonym of 'Optimistic'", back_text: "Pessimistic", difficulty: "Easy" },
  { category: "English", front_text: "Meaning of 'Lethargic'", back_text: "Sluggish and apathetic.", difficulty: "Medium" },
  { category: "English", front_text: "Synonym of 'Inevitable'", back_text: "Unavoidable, Certain", difficulty: "Medium" },
  { category: "English", front_text: "Meaning of 'Candid'", back_text: "Truthful and straightforward; frank.", difficulty: "Medium" },
  { category: "English", front_text: "Antonym of 'Diligent'", back_text: "Lazy, Careless", difficulty: "Medium" },
  { category: "English", front_text: "Synonym of 'Versatile'", back_text: "Adaptable, Flexible, Multitalented", difficulty: "Medium" },
  
  // ISSB (Psychological/Leadership tips)
  { category: "ISSB", front_text: "What is the most important OLQ (Officer Like Quality)?", back_text: "Integrity and Sense of Responsibility", difficulty: "Medium" },
  { category: "ISSB", front_text: "How many seconds do you get per picture in TAT?", back_text: "30 seconds to view, 3.5 minutes to write.", difficulty: "Medium" },
  { category: "ISSB", front_text: "What is the recommended format for a TAT story?", back_text: "What led to the situation, what is happening now, and the final outcome.", difficulty: "Medium" },
  { category: "ISSB", front_text: "How much time is given per word in WAT?", back_text: "10 seconds", difficulty: "Easy" },
  { category: "ISSB", front_text: "What is the key rule for Command Task?", back_text: "Act as a leader, brief your team, and adapt when the plan fails.", difficulty: "Hard" },
  { category: "ISSB", front_text: "What is expected in Group Planning Exercise (GPE)?", back_text: "Team consensus and prioritizing life-saving actions.", difficulty: "Hard" },
  { category: "ISSB", front_text: "Should you write negative sentences in WAT?", back_text: "No, always try to form positive, action-oriented sentences.", difficulty: "Medium" },
  { category: "ISSB", front_text: "What does Half Group Task (HGT) evaluate?", back_text: "Individual initiative and mechanical sense since the group is smaller.", difficulty: "Medium" },
  { category: "ISSB", front_text: "What is the 'Colour Rule' in GTO?", back_text: "White = In bounds for all. Red = Out of bounds for all. Blue = In bounds for men, out of bounds for material.", difficulty: "Medium" },
  { category: "ISSB", front_text: "How should you respond to stress questions by Deputy President?", back_text: "Stay calm, do not contradict yourself, and maintain moral integrity.", difficulty: "Hard" }
];

async function seedFlashcards() {
  console.log("Seeding Flashcards locally...");
  
  try {
    console.log(`Inserting ${flashcards.length} flashcards into Supabase...`);
    
    const { data, error } = await supabase
      .from('flashcards')
      .insert(flashcards);
      
    if (error) throw error;
    console.log("Successfully seeded flashcards!");
  } catch (error) {
    console.error("Error seeding flashcards:", error);
  }
}

seedFlashcards();
