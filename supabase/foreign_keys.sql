ALTER TABLE contracts
ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES auth.users(id);

ALTER TABLE documents
ADD CONSTRAINT fk_contract_id FOREIGN KEY (contract_id) REFERENCES contracts(id);
