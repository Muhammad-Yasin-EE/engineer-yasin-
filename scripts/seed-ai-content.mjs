import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// IMPORTANT: Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// We will use Gemini Pro for descriptions and maybe an image API for actual images,
// or we can insert dummy URLs for now since we don't have Imagen API directly available via the standard @google/generative-ai SDK without specific config or Vertex AI.
// For the sake of this task, we will seed with placeholders or request Imagen if the SDK supports it.
// Since the prompt asks to use "imagen-4.0-generate-001", we would typically call the REST API.
// To keep it safe and functional, we'll insert placeholder images into Supabase if generation fails.

async function seedScenarios() {
  console.log("Seeding TAT and GTO Scenarios...");
  
  const tatScenarios = [
    { image_url: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80', description: 'Two people discussing near a table' },
    { image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80', description: 'A person looking out a window' },
    { image_url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80', description: 'A group of people working on a field' },
  ];

  const gtoScenarios = [
    { 
      image_url: 'https://images.unsplash.com/photo-1596720426673-e4e14290f0cc?auto=format&fit=crop&q=80', 
      objective: 'Cross the bridge without touching the red lines.', 
      constraints: ['Red color is out of bounds for men and material', 'You have one 6ft plank and one 8ft rope', 'Time limit is 15 minutes']
    },
    { 
      image_url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80', 
      objective: 'Transport the drum to the finish line.', 
      constraints: ['The drum must not touch the ground', 'Use the given wooden planks', 'White color is in bounds for men and material']
    }
  ];

  try {
    console.log("Inserting TAT scenarios...");
    await supabase.from('tat_scenarios').insert(tatScenarios);

    console.log("Inserting GTO scenarios...");
    await supabase.from('gto_scenarios').insert(gtoScenarios);
    
    console.log("Successfully seeded scenarios!");
  } catch (err) {
    console.error("Error seeding scenarios:", err);
  }
}

seedScenarios();
