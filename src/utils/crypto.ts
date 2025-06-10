import { AES, enc } from 'crypto-js';

export const encryptData = (data: string): string => {
  if (!process.env.CRYPTO_SECRET) {
    throw new Error('CRYPTO_SECRET is not defined in environment variables');
  }
  return AES.encrypt(data, process.env.CRYPTO_SECRET).toString();
};

export const decryptData = (cipherText: string): string => {
  if (!process.env.CRYPTO_SECRET) {
    throw new Error('CRYPTO_SECRET is not defined in environment variables');
  }
  const bytes = AES.decrypt(cipherText, process.env.CRYPTO_SECRET);
  return bytes.toString(enc.Utf8);
};
