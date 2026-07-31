import { createClient } from '@/lib/supabase/server'

export async function saveTestResult(
  userId: string,
  testType: string,
  score: number,
  verdict: string,
  feedback: string,
  olqs?: string[],
  submittedText?: string
) {
  try {
    const supabase = await createClient()
    const { error } = await supabase.from('test_results').insert({
      user_id: userId,
      test_type: testType,
      score,
      verdict,
      feedback,
      olqs: olqs ? JSON.stringify(olqs) : null,
      submitted_text: submittedText || null
    })
    
    if (error) {
      console.error(`Error saving ${testType} result:`, error)
    }
  } catch (error) {
    console.error('Failed to log test result', error)
  }
}

export async function getPsychometricConsistency(userId: string, currentTestType: string): Promise<{ penalty: number, reason: string | null }> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('test_results')
      .select('score, verdict, olqs, test_type')
      .eq('user_id', userId)
      .neq('test_type', currentTestType)
      .order('created_at', { ascending: false })
      .limit(3);

    if (!data || data.length === 0) return { penalty: 0, reason: null };

    // Check if the user historically failed bad tests but is suddenly acting perfectly
    const pastScores = data.map(d => d.score);
    const avgPast = pastScores.reduce((a,b) => a+b, 0) / pastScores.length;

    // Consistency logic:
    // If they average 2/10 in past 3 tests, but score 10/10 in this one, they might be faking/cheating
    return { 
      penalty: avgPast < 4 ? 2 : 0, 
      reason: avgPast < 4 ? "Consistency Warning: Your current approach strongly contradicts your past psychological profile." : null
    };

  } catch (e) {
    return { penalty: 0, reason: null };
  }
}
