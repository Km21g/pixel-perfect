import { apiClient, USE_MOCK } from "./client";
import { mockDelay } from "./mock";
import { issues, items, renewals } from "@/mocks/data";
import type { Issue, ReportSummary } from "@/types";

export async function getSummary(): Promise<ReportSummary> {
  if (!USE_MOCK) return (await apiClient.get<ReportSummary>("/reports/summary")).data;
  const overdue = issues.filter((row) => row.status === "OVERDUE").length;
  const dueSoon = issues.filter((row) => row.status === "ACTIVE" && (new Date(row.dueDate).getTime() - Date.now()) / 86_400_000 <= 3).length;
  return mockDelay({ totalItems: items.reduce((sum, item) => sum + item.totalQty, 0), activeIssues: issues.filter((row) => row.outstandingQty > 0).length, overdueIssues: overdue, dueSoonIssues: dueSoon, availableItems: items.reduce((sum, item) => sum + item.availableQty, 0), pendingRenewals: renewals.filter((row) => row.status === "PENDING").length });
}
export async function getOverdueIssues(): Promise<Issue[]> { return USE_MOCK ? mockDelay(issues.filter((row) => row.status === "OVERDUE")) : (await apiClient.get<Issue[]>("/reports/overdue")).data; }
export async function getUpcomingDue(): Promise<Issue[]> { return USE_MOCK ? mockDelay(issues.filter((row) => row.status === "ACTIVE" && (new Date(row.dueDate).getTime() - Date.now()) / 86_400_000 <= 3)) : (await apiClient.get<Issue[]>("/reports/upcoming-due")).data; }