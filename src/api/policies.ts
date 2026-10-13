import { apiClient, USE_MOCK } from "./client";
import { mockDelay } from "./mock";
import { policy } from "@/mocks/data";
import type { Policy } from "@/types";
export async function getPolicy(): Promise<Policy> { return USE_MOCK ? mockDelay(policy) : (await apiClient.get<Policy>("/policies")).data; }
export async function updatePolicy(input: Policy): Promise<Policy> { return USE_MOCK ? mockDelay(Object.assign(policy, input)) : (await apiClient.put<Policy>("/policies", input)).data; }