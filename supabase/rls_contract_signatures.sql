ALTER TABLE contract_signatures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User signatures access" ON contract_signatures
FOR SELECT USING (auth.uid() = user_id);
