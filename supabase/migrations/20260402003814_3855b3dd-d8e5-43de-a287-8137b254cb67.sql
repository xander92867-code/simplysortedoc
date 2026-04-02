
CREATE TABLE public.reservations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  notes TEXT,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  stripe_session_id TEXT,
  status TEXT NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert reservations"
  ON public.reservations
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read reservations by stripe session"
  ON public.reservations
  FOR SELECT
  USING (true);
