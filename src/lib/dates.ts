import { differenceInCalendarDays, format, parseISO, startOfDay } from "date-fns";

export function formatDate(value: string | Date): string {
  const date = typeof value === "string" ? parseISO(value) : value;
  return Number.isNaN(date.getTime()) ? "—" : format(date, "dd MMM yyyy");
}

export function daysOverdue(dueDate: string, today = new Date()): number {
  const days = differenceInCalendarDays(startOfDay(today), startOfDay(parseISO(dueDate)));
  return Math.max(0, days);
}

export function daysUntilDue(dueDate: string, today = new Date()): number {
  return differenceInCalendarDays(startOfDay(parseISO(dueDate)), startOfDay(today));
}