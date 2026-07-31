'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { X, Check, Save } from 'lucide-react'

export default function UserEvaluationsPanel({ userId, onClose }: { userId: string, onClose: () => void }) {
  const supabase = createClient()
  const [tests, setTests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [expertFeedback, setExpertFeedback] = useState('')

  useEffect(() => {
    fetchTests()
  }, [userId])

  const fetchTests = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('test_results')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      if (error) throw error
      setTests(data || [])
    } catch (err) {
      console.error('Error fetching tests:', err)
    } finally {
      setLoading(false)
    }
  }

  const saveFeedback = async (testId: string) => {
    try {
      const { error } = await supabase
        .from('test_results')
        .update({ 
          expert_feedback: expertFeedback, 
          is_reviewed: true 
        })
        .eq('id', testId)

      if (error) throw error
      
      setTests(tests.map(t => t.id === testId ? { ...t, expert_feedback: expertFeedback, is_reviewed: true } : t))
      setEditingId(null)
      alert('Feedback saved successfully!')
    } catch (err: any) {
      alert('Failed to save feedback: ' + err.message)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Candidate Evaluations</h2>
          <button onClick={onClose} className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 flex-grow">
          {loading ? (
            <div className="text-center py-10 text-gray-500 text-sm font-medium">Loading tests...</div>
          ) : tests.length === 0 ? (
            <div className="text-center py-10 text-gray-500 text-sm font-medium">This candidate has not taken any tests yet.</div>
          ) : (
            tests.map(test => (
              <div key={test.id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-slate-50 p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="bg-[#0A192F] text-amber-300 font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                      {test.test_type}
                    </span>
                    <span className="text-xs font-bold text-gray-600">
                      Score: {test.score}/10
                    </span>
                    {test.is_reviewed && (
                      <span className="bg-emerald-100 text-emerald-700 font-bold text-[10px] uppercase px-2 py-1 rounded-full flex items-center gap-1">
                        <Check className="w-3 h-3" /> Reviewed
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {new Date(test.created_at).toLocaleString()}
                  </span>
                </div>
                
                <div className="p-5 space-y-4">
                  {test.submitted_text ? (
                    <div>
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Candidate's Submission</h4>
                      <p className="text-sm text-gray-800 bg-gray-50 p-4 rounded-lg border border-gray-100 whitespace-pre-wrap leading-relaxed font-medium">
                        {test.submitted_text}
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 italic">No text was recorded for this test (Legacy submission).</p>
                  )}

                  <div>
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">AI Automated Feedback</h4>
                    <p className="text-xs text-gray-600 leading-relaxed border-l-2 border-amber-200 pl-3">
                      {test.feedback}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="text-[10px] font-black text-[#B8212E] uppercase tracking-widest mb-3">Expert Manual Review</h4>
                    
                    {editingId === test.id ? (
                      <div className="space-y-3">
                        <textarea
                          className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#B8212E]/20 focus:border-[#B8212E] min-h-[120px] transition-all resize-none shadow-inner"
                          value={expertFeedback}
                          onChange={(e) => setExpertFeedback(e.target.value)}
                          placeholder="Type your expert psychological evaluation here..."
                        />
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => saveFeedback(test.id)}
                            className="bg-[#B8212E] hover:bg-rose-700 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-all"
                          >
                            <Save className="w-4 h-4" /> Save Review
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {test.expert_feedback ? (
                          <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl">
                            <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed font-medium">
                              {test.expert_feedback}
                            </p>
                          </div>
                        ) : (
                          <p className="text-xs text-gray-500 italic">No expert review has been provided yet.</p>
                        )}
                        <button
                          onClick={() => {
                            setEditingId(test.id)
                            setExpertFeedback(test.expert_feedback || '')
                          }}
                          className="text-[#B8212E] hover:text-rose-700 text-xs font-bold uppercase tracking-wider hover:underline"
                        >
                          {test.expert_feedback ? 'Edit Review' : 'Add Expert Review'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
