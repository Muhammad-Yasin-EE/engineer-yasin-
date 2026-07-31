-- Add columns for storing submitted text and expert feedback in test_results
ALTER TABLE test_results
ADD COLUMN submitted_text TEXT,
ADD COLUMN is_reviewed BOOLEAN DEFAULT false,
ADD COLUMN expert_feedback TEXT;
