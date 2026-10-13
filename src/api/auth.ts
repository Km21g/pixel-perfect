import { apiClient, USE_MOCK } from "./client";
import { mockDelay, assertMock, apiError } from "./mock";
import { users } from "@/mocks/data";
import type { Role, User } from "@/types";

export interface LoginCredentials { email: string; password: string }
export async function login(credentials: LoginCredentials): Promise<User> {
  if (!credentials.email.trim() || credentials.password.length < 8) {
    throw apiError("VALIDATION_ERROR", "Enter a valid email and a password of at least 8 characters.");
  }
  if (!USE_MOCK) return (await apiClient.post<User>("/auth/login", credentials)).data;
  const user = users.find((entry) => entry.email.toLowerCase() === credentials.email.trim().toLowerCase() && entry.isActive);
  assertMock(Boolean(user), "INVALID_CREDENTIALS", "The demo account was not found or is inactive.");
  return mockDelay(user as User);
}
export async function loginAsRole(role: Role): Promise<User> {
  if (!USE_MOCK) throw apiError("DEMO_DISABLED", "Demo sign-in is only available in mock mode.");
  const user = users.find((entry) => entry.role === role && entry.isActive);
  assertMock(Boolean(user), "USER_NOT_FOUND", "No active demo account is available for that role.");
  return mockDelay(user as User);
}
export async function logout(): Promise<void> {
  if (USE_MOCK) return mockDelay(undefined);
  await apiClient.post("/auth/logout");
}
export async function getMe(): Promise<User | null> {
  if (USE_MOCK) return mockDelay(null);
  try { return (await apiClient.get<User>("/auth/me")).data; }
  catch (error) { if (error instanceof Error && error.message.includes("401")) return null; throw error; }
}