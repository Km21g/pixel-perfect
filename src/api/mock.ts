import type { ApiError } from "@/types";

export async function mockDelay<T>(value: T): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return value;
}

export function apiError(error: string, message: string, details?: Record<string, string>): ApiError {
  return details ? { error, message, details } : { error, message };
}

export function assertMock(condition: boolean, error: string, message: string): void {
  if (!condition) throw apiError(error, message);
}