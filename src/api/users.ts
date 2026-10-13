import { apiClient, USE_MOCK } from "./client";
import { users } from "@/mocks/data";
import { mockDelay } from "./mock";
import type { User } from "@/types";
export async function getUsers(): Promise<User[]> { return USE_MOCK ? mockDelay(users) : (await apiClient.get<User[]>("/users")).data; }
export async function createUser(input: Partial<User>): Promise<User> { return USE_MOCK ? mockDelay({ ...input, id: `u-${Date.now()}` } as User) : (await apiClient.post<User>("/users", input)).data; }
export async function updateUser(id: string, input: Partial<User>): Promise<User> { return USE_MOCK ? mockDelay(Object.assign(users.find((user) => user.id === id) ?? {}, input) as User) : (await apiClient.put<User>(`/users/${encodeURIComponent(id)}`, input)).data; }
export async function setUserActive(id: string, isActive: boolean): Promise<User> { return USE_MOCK ? mockDelay(Object.assign(users.find((user) => user.id === id) ?? {}, { isActive }) as User) : (await apiClient.patch<User>(`/users/${encodeURIComponent(id)}/status`, { isActive })).data; }
export async function resetUserPassword(id: string): Promise<void> { if (USE_MOCK) return mockDelay(undefined); await apiClient.post(`/users/${encodeURIComponent(id)}/reset-password`); }
export async function getAdminOverview(): Promise<Record<string, number>> { return USE_MOCK ? mockDelay({ users: users.length, activeAccounts: users.filter((user) => user.isActive).length }) : (await apiClient.get<Record<string, number>>("/admin/overview")).data; }