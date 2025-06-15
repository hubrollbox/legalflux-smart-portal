
-- 1. Enable Row Level Security on available_integrations
ALTER TABLE public.available_integrations ENABLE ROW LEVEL SECURITY;

-- 2. Allow anyone authenticated to SELECT (list available integrations)
CREATE POLICY "Allow read to all authenticated users"
  ON public.available_integrations
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- 3. Restrict INSERT, UPDATE, DELETE to admins only
CREATE POLICY "Allow only admins to insert integrations"
  ON public.available_integrations
  FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Allow only admins to update integrations"
  ON public.available_integrations
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Allow only admins to delete integrations"
  ON public.available_integrations
  FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));
