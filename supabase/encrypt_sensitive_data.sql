-- Adicionar coluna para armazenar dados criptografados
ALTER TABLE contract_parties
ADD COLUMN email_encrypted BYTEA;

-- Atualizar dados existentes com criptografia
UPDATE contract_parties
SET email_encrypted = pgp_sym_encrypt(email, 'encryption_key');

-- Remover coluna de texto plano
ALTER TABLE contract_parties
DROP COLUMN email;
