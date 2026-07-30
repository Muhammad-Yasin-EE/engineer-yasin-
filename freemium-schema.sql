-- RUN THIS SCRIPT IN SUPABASE SQL EDITOR

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS ai_credits INTEGER DEFAULT 3,
ADD COLUMN IF NOT EXISTS premium_plan TEXT DEFAULT 'free',
ADD COLUMN IF NOT EXISTS premium_expiry TIMESTAMP WITH TIME ZONE;

-- Add a comment to the table to explain the columns
COMMENT ON COLUMN public.profiles.ai_credits IS 'Number of free AI evaluations remaining for the user';
COMMENT ON COLUMN public.profiles.premium_plan IS 'User plan: free, weekly, monthly';
COMMENT ON COLUMN public.profiles.premium_expiry IS 'Date when the premium plan expires. Null means not premium or lifetime.';

-- Let's also update the handle_new_user trigger to explicitly set default credits just in case
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, is_admin, ai_credits, premium_plan)
  VALUES (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    CASE 
      WHEN new.email = 'engineeryasin2029@gmail.com' OR new.email = 'yasinofficial03098158572@gmail.com' OR new.email = 'engineeryasinlab@gmail.com' THEN true 
      ELSE false 
    END,
    3, -- Give 3 free credits
    'free'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
