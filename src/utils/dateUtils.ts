
import { TIME_ZONE } from '@/types';

export function getCurrentDateInTimezone(): Date {
  return new Date(new Date().toLocaleString("en-US", { timeZone: TIME_ZONE }));
}

export function parseISODate(dateString: string): Date {
  return new Date(dateString + 'T00:00:00');
}

export function isDateInRange(date: Date, startDate: string, endDate: string): boolean {
  const start = parseISODate(startDate);
  const end = parseISODate(endDate);
  return date >= start && date <= end;
}

export function formatDate(dateString: string): string {
  const date = parseISODate(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

export function formatDateLong(dateString: string): string {
  const date = parseISODate(dateString);
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}
