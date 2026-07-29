-- SQL statements to seed TAT Scenarios, GTO Scenarios, and Flashcards
-- Copy and paste all of this into your Supabase SQL Editor and hit RUN!

-- 1. TAT Scenarios
INSERT INTO tat_scenarios (image_url, description) VALUES
('https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80', 'Two people discussing near a table'),
('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80', 'A person looking out a window'),
('https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80', 'A group of people working on a field');

-- 2. GTO Scenarios
INSERT INTO gto_scenarios (image_url, objective, constraints) VALUES
('https://images.unsplash.com/photo-1596720426673-e4e14290f0cc?auto=format&fit=crop&q=80', 'Cross the bridge without touching the red lines.', '["Red color is out of bounds for men and material", "You have one 6ft plank and one 8ft rope", "Time limit is 15 minutes"]'::jsonb),
('https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80', 'Transport the drum to the finish line.', '["The drum must not touch the ground", "Use the given wooden planks", "White color is in bounds for men and material"]'::jsonb);

-- 3. Flashcards (GK)
INSERT INTO flashcards (category, front_text, back_text, difficulty) VALUES
('GK', 'When did Pakistan conduct its first nuclear test?', '28 May 1998 (Youm-e-Takbeer)', 'Medium'),
('GK', 'Who was the first Commander-in-Chief of Pakistan Army?', 'General Sir Frank Messervy', 'Medium'),
('GK', 'What is the capital of Australia?', 'Canberra', 'Easy'),
('GK', 'Which planet is known as the Red Planet?', 'Mars', 'Easy'),
('GK', 'Who wrote the national anthem of Pakistan?', 'Hafeez Jalandhari', 'Easy'),
('GK', 'What is the highest military award of Pakistan?', 'Nishan-e-Haider', 'Easy'),
('GK', 'Which is the longest river in Pakistan?', 'Indus River', 'Easy'),
('GK', 'Who was the first Governor-General of Pakistan?', 'Quaid-e-Azam Muhammad Ali Jinnah', 'Easy'),
('GK', 'What is the largest province of Pakistan by area?', 'Balochistan', 'Easy'),
('GK', 'When was the Constitution of Pakistan passed?', '1973', 'Medium');

-- 4. Flashcards (English)
INSERT INTO flashcards (category, front_text, back_text, difficulty) VALUES
('English', 'Synonym of ''Abundant''', 'Plentiful, Copious, Ample', 'Easy'),
('English', 'Meaning of ''Eloquent''', 'Fluent or persuasive in speaking or writing.', 'Medium'),
('English', 'Meaning of ''Meticulous''', 'Showing great attention to detail; very careful and precise.', 'Medium'),
('English', 'Synonym of ''Tenacious''', 'Persistent, Resolute, Determined', 'Hard'),
('English', 'Antonym of ''Optimistic''', 'Pessimistic', 'Easy'),
('English', 'Meaning of ''Lethargic''', 'Sluggish and apathetic.', 'Medium'),
('English', 'Synonym of ''Inevitable''', 'Unavoidable, Certain', 'Medium'),
('English', 'Meaning of ''Candid''', 'Truthful and straightforward; frank.', 'Medium'),
('English', 'Antonym of ''Diligent''', 'Lazy, Careless', 'Medium'),
('English', 'Synonym of ''Versatile''', 'Adaptable, Flexible, Multitalented', 'Medium');

-- 5. Flashcards (ISSB)
INSERT INTO flashcards (category, front_text, back_text, difficulty) VALUES
('ISSB', 'What is the most important OLQ (Officer Like Quality)?', 'Integrity and Sense of Responsibility', 'Medium'),
('ISSB', 'How many seconds do you get per picture in TAT?', '30 seconds to view, 3.5 minutes to write.', 'Medium'),
('ISSB', 'What is the recommended format for a TAT story?', 'What led to the situation, what is happening now, and the final outcome.', 'Medium'),
('ISSB', 'How much time is given per word in WAT?', '10 seconds', 'Easy'),
('ISSB', 'What is the key rule for Command Task?', 'Act as a leader, brief your team, and adapt when the plan fails.', 'Hard'),
('ISSB', 'What is expected in Group Planning Exercise (GPE)?', 'Team consensus and prioritizing life-saving actions.', 'Hard'),
('ISSB', 'Should you write negative sentences in WAT?', 'No, always try to form positive, action-oriented sentences.', 'Medium'),
('ISSB', 'What does Half Group Task (HGT) evaluate?', 'Individual initiative and mechanical sense since the group is smaller.', 'Medium'),
('ISSB', 'What is the ''Colour Rule'' in GTO?', 'White = In bounds for all. Red = Out of bounds for all. Blue = In bounds for men, out of bounds for material.', 'Medium'),
('ISSB', 'How should you respond to stress questions by Deputy President?', 'Stay calm, do not contradict yourself, and maintain moral integrity.', 'Hard');
