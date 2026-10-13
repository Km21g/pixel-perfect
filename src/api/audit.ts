import { apiClient, USE_MOCK } from "./client";
import { auditLogs } from "@/mocks/data";
import { mockDelay } from "./mock";
import type { AuditLog } from "@/types";
export async function getAuditLogs(): Promise<AuditLog[]> { return USE_MOCK ? mockDelay(auditLogs) : (await apiClient.get<AuditLog[]>("/audit-logs")).data; }