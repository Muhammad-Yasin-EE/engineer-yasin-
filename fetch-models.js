const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

async function listModels() {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
  const data = await res.json();
  console.log(JSON.stringify(data.models.map(m => m.name), null, 2));
}

listModels();
