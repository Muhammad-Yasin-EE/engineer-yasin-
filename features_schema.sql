-- Table for Flashcards
CREATE TABLE flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL, -- e.g., 'GK', 'English', 'ISSB'
  front_text TEXT NOT NULL,
  back_text TEXT NOT NULL,
  difficulty TEXT DEFAULT 'Medium',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for TAT Scenarios (Thematic Apperception Test)
CREATE TABLE tat_scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  description TEXT, -- Internal use to know what the image is
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for GTO Command Tasks
CREATE TABLE gto_scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  constraints JSONB, -- Array of strings e.g. ["Red lines are out of bounds", "Use the 6ft plank"]
  objective TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE tat_scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE gto_scenarios ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access for flashcards" ON flashcards FOR SELECT USING (true);
CREATE POLICY "Allow public read access for tat_scenarios" ON tat_scenarios FOR SELECT USING (true);
CREATE POLICY "Allow public read access for gto_scenarios" ON gto_scenarios FOR SELECT USING (true);
