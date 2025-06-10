ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Template RLS" ON templates
FOR SELECT USING (auth.role() = 'admin');
