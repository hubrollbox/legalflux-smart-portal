import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export const setCache = async (key: string, value: unknown, ttl: number = 3600) => {
  await redis.set(key, JSON.stringify(value), 'EX', ttl);
};

export const getCache = async (key: string) => {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
};

export default redis;
