'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Play, Square, Clock, ShieldAlert, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';
import { evaluateTATStory } from '@/app/actions/ai-tat';

const TEST_DURATION_MS = 4 * 60 * 1000; // 4 minutes per story
const TOTAL_PICTURES = 5; // A short mock test with 5 TAT pictures for now

// We can reuse some pictures from the existing TAT data or use placeholders
const MOCK_PICTURES = [
  '/images/tat/tat1.jpg', // Make sure these exist or will fallback to generic
  '/images/tat/tat2.jpg',
  '/images/tat/tat3.jpg',
  '/images/tat/tat4.jpg',
  '/images/tat/tat5.jpg'
];

export default function MockExamPage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [currentPicIndex, setCurrentPicIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION_MS);
  const [story, setStory] = useState('');
  const [allStories, setAllStories] = useState<string[]>([]);
  const [allTimes, setAllTimes] = useState<number[]>([]);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Fullscreen management on start
  const handleStart = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch (e) {
      console.log('Fullscreen failed', e);
    }
    setHasStarted(true);
    startTimer();
  };

  const startTimer = () => {
    setTimeLeft(TEST_DURATION_MS);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1000) {
          handleTimeUp();
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);
  };

  const handleTimeUp = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    setAllStories(prev => {
      const updated = [...prev];
      updated[currentPicIndex] = story;
      return updated;
    });

    setAllTimes(prev => {
      const updated = [...prev];
      updated[currentPicIndex] = TEST_DURATION_MS - timeLeft;
      return updated;
    });

    if (currentPicIndex < TOTAL_PICTURES - 1) {
      setStory('');
      setCurrentPicIndex(prev => prev + 1);
      startTimer();
    } else {
      finishTest();
    }
  };

  const finishTest = async () => {
    setIsFinished(true);
    setIsEvaluating(true);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(console.error);
    }
    
    // Evaluate all stories
    const currentStories = [...allStories];
    currentStories[currentPicIndex] = story; // ensure last story is saved
    
    const currentTimes = [...allTimes];
    currentTimes[currentPicIndex] = TEST_DURATION_MS - timeLeft;
    
    const evalResults = [];
    for (let i = 0; i < currentStories.length; i++) {
      const s = currentStories[i];
      const timeTaken = currentTimes[i] || TEST_DURATION_MS;
      if (s.trim().length > 10) {
        const res = await evaluateTATStory(s, i + 1, timeTaken);
        if (res.success) {
          evalResults.push(res.data);
        } else {
          evalResults.push({ error: true, msg: res.error });
        }
      } else {
        evalResults.push({ verdict: 'Fail', score: 0, feedback: 'Did not write enough.' });
      }
    }
    
    setResults(evalResults);
    setIsEvaluating(false);
  };

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // RENDER: Not Started
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-[#0A192F] flex flex-col items-center justify-center p-4">
        <div className="max-w-xl bg-white rounded-3xl p-8 shadow-2xl text-center border border-slate-200">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 text-rose-600 mb-6">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">Real ISSB Mock Test</h1>
          <div className="text-slate-600 space-y-3 mb-8 text-sm font-medium text-left">
            <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Fullscreen mode will be activated.</p>
            <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> You will see {TOTAL_PICTURES} TAT pictures.</p>
            <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Exactly 4 minutes per picture. Auto-transitions.</p>
            <p className="flex items-center gap-2 text-rose-600"><AlertCircle className="w-4 h-4"/> Do not refresh or exit. You cannot pause.</p>
          </div>
          <button 
            onClick={handleStart}
            className="w-full bg-[#B8212E] hover:bg-[#961a25] text-white font-black text-lg py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
          >
            <Play className="w-6 h-6 fill-current" /> START MOCK EXAM
          </button>
        </div>
      </div>
    );
  }

  // RENDER: Finished
  if (isFinished) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-black text-slate-900">Mock Exam Completed</h1>
            <p className="text-slate-500 font-medium">Your results have been automatically evaluated by the Advanced AI.</p>
          </div>

          {isEvaluating ? (
            <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-200 text-center animate-pulse">
              <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-lg font-bold text-slate-600">AI is evaluating your stories...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {results.map((res, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-slate-800">Picture {idx + 1}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${res.verdict === 'Pass' ? 'bg-emerald-100 text-emerald-700' : res.verdict === 'Borderline' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                      {res.verdict || 'Error'} ({res.score}/10)
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 bg-slate-50 p-4 rounded-xl italic mb-4">"{allStories[idx] || story}"</p>
                  <div className="text-sm font-medium text-slate-700">
                    <strong className="text-slate-900">Feedback:</strong> {res.feedback}
                  </div>
                </div>
              ))}
              <div className="text-center pt-8">
                <button onClick={() => router.push('/dashboard')} className="bg-[#0A192F] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#112240]">
                  View Full Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // RENDER: Active Exam
  return (
    <div className="min-h-screen bg-[#050B14] text-white flex flex-col">
      {/* Top Bar */}
      <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#0A192F]">
        <div className="flex items-center gap-2 font-bold">
          <span className="text-slate-400">Picture</span>
          <span className="text-emerald-400 text-xl">{currentPicIndex + 1} / {TOTAL_PICTURES}</span>
        </div>
        <div className={`flex items-center gap-2 font-black text-2xl ${timeLeft <= 60000 ? 'text-rose-500 animate-pulse' : 'text-white'}`}>
          <Clock className="w-6 h-6" /> {formatTime(timeLeft)}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row p-6 gap-6 max-w-[1600px] mx-auto w-full">
        {/* Left: Picture */}
        <div className="flex-1 flex flex-col">
          <div className="bg-slate-900 rounded-2xl border border-white/10 flex-1 relative overflow-hidden min-h-[300px] lg:min-h-0 flex items-center justify-center">
            {/* Fallback to generic image if mock picture doesn't exist */}
            <Image 
              src={`/images/issb-psychology.jpg`} 
              alt="TAT Mock Picture"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Right: Text Area */}
        <div className="flex-1 flex flex-col gap-4 lg:max-w-2xl">
          <div className="flex justify-between items-end">
            <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Your Story</label>
            <span className="text-xs text-slate-500">{story.split(/\s+/).filter(w => w).length} words</span>
          </div>
          <textarea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Write your story here... (Do not pause, timer is running)"
            className="flex-1 w-full bg-slate-900/50 border border-white/20 rounded-2xl p-6 text-slate-200 text-lg leading-relaxed focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none"
            spellCheck="false"
          />
          <button 
            onClick={handleTimeUp}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            Submit & Next <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
