// standardize_official_tests.js
// Standardizes all quizzes to official Selection Center rules:
// - Verbal Intelligence: 84 MCQs in 30 Minutes (1800 Seconds)
// - Academic Tests: 50 MCQs in 25 Minutes (1500 Seconds)

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

let env = {};
if (fs.existsSync('.env.local')) {
  const envStr = fs.readFileSync('.env.local', 'utf8');
  for (const line of envStr.split('\n')) {
    if (line.includes('=')) {
      const [k, ...v] = line.split('=');
      env[k.trim()] = v.join('=').trim().replace(/['"]/g, '');
    }
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || env['SUPABASE_SERVICE_ROLE_KEY'] || env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase URL or Service Role Key in environment / .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function standardizeAllQuizzes() {
  console.log('===========================================================');
  console.log('🚀 STANDARDIZING ALL QUIZZES TO OFFICIAL SELECTION PATTERN');
  console.log('   • Verbal Intelligence : 84 MCQs | 30 Minutes');
  console.log('   • Academic Tests      : 50 MCQs | 25 Minutes');
  console.log('===========================================================\n');

  const { data: quizzes, error } = await supabase.from('quizzes').select('*');
  if (error) {
    console.error('❌ Error fetching quizzes:', error);
    return;
  }

  console.log(`📋 Found ${quizzes.length} total quizzes in Database.`);

  let updatedCount = 0;

  for (const q of quizzes) {
    const titleLower = (q.title || '').toLowerCase();
    const catLower = (q.category || '').toLowerCase();

    const isVerbal = 
      titleLower.includes('verbal') || 
      titleLower.includes('intelligence') || 
      titleLower.includes('non-verbal');

    const officialTime = isVerbal ? 30 * 60 : 25 * 60; // 30 mins vs 25 mins
    const officialQuestions = isVerbal ? 84 : 50;

    const updatedDescription = isVerbal
      ? `Official Selection Center Pattern: 84 MCQs timed test in 30 minutes.`
      : `Official Selection Center Pattern: 50 MCQs timed test in 25 minutes.`;

    const { error: updateErr } = await supabase
      .from('quizzes')
      .update({
        time_limit: officialTime,
        description: q.description && q.description.length > 50 ? q.description : updatedDescription
      })
      .eq('id', q.id);

    if (updateErr) {
      console.error(`⚠️ Failed to update quiz [${q.title}]:`, updateErr.message);
    } else {
      updatedCount++;
      console.log(`✅ [${isVerbal ? 'VERBAL (84Q/30M)' : 'ACADEMIC (50Q/25M)'}] ${q.title}`);
    }
  }

  console.log('\n===========================================================');
  console.log(`🎉 SUCCESS: ${updatedCount} Quizzes Standardized to Official Formats!`);
  console.log('===========================================================');
}

standardizeAllQuizzes();
