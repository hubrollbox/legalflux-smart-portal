// Simple system log utility (mock)
export type LogLevel = 'info' | 'warn' | 'error';

export function logEvent(message: string, level: LogLevel = 'info', meta?: Record<string, unknown>) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta
  };
  // For now, log to console and localStorage (mock)
  console[level](entry);
  const logs = JSON.parse(localStorage.getItem('legalflux-system-logs') || '[]');
  logs.push(entry);
  localStorage.setItem('legalflux-system-logs', JSON.stringify(logs));
}

export function getLogs() {
  return JSON.parse(localStorage.getItem('legalflux-system-logs') || '[]');
}
