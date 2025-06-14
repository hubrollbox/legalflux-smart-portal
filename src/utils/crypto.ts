
/**
 * All encryption/decryption must be handled via the edge function.
 * These helper functions route to the Supabase edge functions.
 */
export const encryptData = async (data: string): Promise<string> => {
  const res = await fetch('/functions/v1/encrypt-data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data }),
  });
  if (!res.ok) throw new Error('Falha ao encriptar dados.');
  const { cipherText } = await res.json();
  return cipherText;
};

export const decryptData = async (cipherText: string): Promise<string> => {
  const res = await fetch('/functions/v1/encrypt-data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cipherText, mode: 'decrypt' }),
  });
  if (!res.ok) throw new Error('Falha ao desencriptar dados.');
  const { data } = await res.json();
  return data;
};
