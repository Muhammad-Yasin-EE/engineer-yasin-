'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Trophy, TrendingUp, AlertCircle, History, Target, Shield, BookOpen, Clock, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);

      const [resultsRes, profileRes] = await Promise.all([
        supabase
          .from('test_results')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('profiles')
          .select('ai_credits, is_admin, premium_plan')
          .eq('id', user.id)
          .single()
      ]);

      if (resultsRes.data) {
        setResults(resultsRes.data);
      }
      if (profileRes.data) {
        setProfile(profileRes.data);
      }
      setLoading(false);
    }
    loadData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-emerald-600 font-bold flex items-center gap-2">
          <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          Loading Secure Dashboard...
        </div>
      </div>
    );
  }

  // Calculate stats
  const totalTests = results.length;
  const avgScore = totalTests > 0 ? (results.reduce((acc, curr) => acc + curr.score, 0) / totalTests).toFixed(1) : 0;
  const passCount = results.filter(r => r.verdict === 'Pass').length;
  
  // Prepare data for Radar Chart (OLQs)
  // We will mock this based on test types since OLQs are derived
  const olqData = [
    { subject: 'Leadership', A: results.filter(r => r.test_type === 'GTO').reduce((acc, curr) => acc + curr.score, 0) / (results.filter(r => r.test_type === 'GTO').length || 1) * 10 },
    { subject: 'Intellect', A: results.filter(r => r.test_type === 'TAT' || r.test_type === 'IO').reduce((acc, curr) => acc + curr.score, 0) / (results.filter(r => r.test_type === 'TAT' || r.test_type === 'IO').length || 1) * 10 },
    { subject: 'Teamwork', A: results.filter(r => r.test_type === 'SNAKE_RACE' || r.test_type === 'GPE').reduce((acc, curr) => acc + curr.score, 0) / (results.filter(r => r.test_type === 'SNAKE_RACE' || r.test_type === 'GPE').length || 1) * 10 },
    { subject: 'Courage', A: results.filter(r => r.test_type === 'IO').reduce((acc, curr) => acc + curr.score, 0) / (results.filter(r => r.test_type === 'IO').length || 1) * 10 },
    { subject: 'Planning', A: results.filter(r => r.test_type === 'GPE' || r.test_type === 'GTO').reduce((acc, curr) => acc + curr.score, 0) / (results.filter(r => r.test_type === 'GPE' || r.test_type === 'GTO').length || 1) * 10 },
  ];

  // Prepare data for Line Chart (Progress)
  const progressData = [...results].reverse().map((r, i) => ({
    name: `Test ${i + 1}`,
    score: r.score,
    type: r.test_type
  }));

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* Header Banner */}
      <div className="bg-[#0A192F] text-white py-12 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#D4AF37] text-[10px] font-extrabold uppercase tracking-widest mb-3">
              <Shield className="w-3.5 h-3.5" /> Candidate Portal
            </span>
            <h1 className="text-3xl md:text-4xl font-black mb-1">Performance Dashboard</h1>
            <p className="text-slate-400 text-sm font-medium">Welcome back, {user?.email?.split('@')[0]}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center min-w-[100px]">
              <div className="text-3xl font-black text-amber-500">
                {profile?.is_admin || (profile?.premium_plan && profile.premium_plan !== 'free') ? '∞' : (profile?.ai_credits || 0)}
              </div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mt-1">Remaining Credits</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center min-w-[100px]">
              <div className="text-3xl font-black text-emerald-400">{totalTests}</div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mt-1">Credits Used (Tests)</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center min-w-[100px]">
              <div className="text-3xl font-black text-blue-400">{avgScore}</div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mt-1">Avg Score</div>
            </div>
          </div>
        </div>
      </div>

      {totalTests === 0 ? (
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-200 mb-4">
            <BookOpen className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">No Test Data Yet</h2>
          <p className="text-slate-500 max-w-md mx-auto mb-6">You haven't taken any AI evaluations yet. Head over to the ISSB section to start practicing and building your profile.</p>
          <button onClick={() => router.push('/issb')} className="bg-[#B8212E] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#961a25] transition-colors">Start Practicing</button>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            
            {/* Radar Chart: Officer Like Qualities */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Target className="w-5 h-5 text-indigo-600" />
                    OLQs Profile
                  </h3>
                  <p className="text-xs text-slate-500">Estimated Officer Like Qualities based on tests</p>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={olqData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="Candidate" dataKey="A" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.4} />
                    <Tooltip cursor={{strokeDasharray: '3 3'}} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Line Chart: Progress */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                    Score Progress
                  </h3>
                  <p className="text-xs text-slate-500">Your score trajectory over time</p>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 10]} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Test History List */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <History className="w-5 h-5 text-slate-500" />
                Recent Evaluation History
              </h3>
            </div>
            <div className="divide-y divide-slate-100">
              {results.slice(0, 10).map((result) => (
                <div key={result.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-slate-800">{result.test_type} Evaluation</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${result.verdict === 'Pass' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                        {result.verdict}
                      </span>
                    </div>
                    {result.expert_feedback ? (
                      <div className="mt-1 flex items-start gap-1.5">
                        <span className="shrink-0 bg-[#B8212E] text-white text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded shadow-sm mt-0.5">Expert</span>
                        <p className="text-sm text-slate-800 font-medium line-clamp-2 md:line-clamp-1 border-l-2 border-[#B8212E] pl-2">{result.expert_feedback}</p>
                      </div>
                    ) : (
                      <div className="mt-1 flex items-start gap-1.5">
                        <span className="shrink-0 bg-slate-200 text-slate-500 text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded shadow-sm mt-0.5">AI</span>
                        <p className="text-sm text-slate-500 line-clamp-2 md:line-clamp-1">{result.feedback}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-6 shrink-0">
                    <div className="text-right">
                      <div className="text-sm font-bold text-slate-900">{result.score} / 10</div>
                      <div className="text-xs text-slate-400">{new Date(result.created_at).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
