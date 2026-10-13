import { apiClient, USE_MOCK } from "./client";
import { assertMock, mockDelay } from "./mock";
import { issues, renewals } from "@/mocks/data";
import type { RenewalRequest, RenewalStatus } from "@/types";
export async function getRenewals(): Promise<RenewalRequest[]> { return USE_MOCK ? mockDelay(renewals) : (await apiClient.get<RenewalRequest[]>("/renewals")).data; }
export async function requestRenewal(issueId: string, remarks: string): Promise<RenewalRequest> {
  if (!USE_MOCK) return (await apiClient.post<RenewalRequest>("/renewals", { issueId, remarks })).data;
  const issue = issues.find((entry) => entry.id === issueId);
  assertMock(Boolean(issue), "ISSUE_NOT_FOUND", "The selected issue could not be found.");
  const row: RenewalRequest = { id: `RN-${Date.now()}`, issueId, requestDate: new Date().toISOString().slice(0, 10), status: "PENDING", remarks: remarks.trim() };
  renewals.unshift(row);
  return mockDelay(row);
}
export async function reviewRenewal(id: string, status: Extract<RenewalStatus, "APPROVED" | "REJECTED">, remarks?: string): Promise<RenewalRequest> {
  if (!USE_MOCK) return (await apiClient.patch<RenewalRequest>(`/renewals/${encodeURIComponent(id)}`, { status, remarks })).data;
  const row = renewals.find((entry) => entry.id === id);
  assertMock(Boolean(row), "RENEWAL_NOT_FOUND", "The selected request could not be found.");
  assertMock(row?.status === "PENDING", "RENEWAL_ALREADY_REVIEWED", "This renewal request has already been reviewed.");
  return mockDelay(Object.assign(row as RenewalRequest, { status, approvedBy: "Alex Morgan", remarks }));
}