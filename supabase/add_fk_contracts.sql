ALTER TABLE contracts 
ADD CONSTRAINT fk_user 
FOREIGN KEY (user_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;
