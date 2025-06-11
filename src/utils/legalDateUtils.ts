// legalDateUtils.ts
// Utility for legal/business day calculations

/**
 * Checks if a date is a weekend.
 */
export function isWeekend(date: Date): boolean {
  return date.getDay() === 0 || date.getDay() === 6;
}

/**
 * Checks if a date is a holiday (Brazilian example, extend as needed).
 */
export function isHoliday(date: Date, holidays: Date[]): boolean {
  return holidays.some(h => h.getTime() === date.getTime());
}

/**
 * Adds N business days to a date, skipping weekends and holidays.
 */
export function addBusinessDays(start: Date, days: number, holidays: Date[] = []): Date {
  const result = new Date(start);
  let added = 0;
  while (added < days) {
    result.setDate(result.getDate() + 1);
    if (!isWeekend(result) && !isHoliday(result, holidays)) {
      added++;
    }
  }
  return result;
}
