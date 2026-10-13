import { apiClient, USE_MOCK } from "./client";
import { assertMock, mockDelay } from "./mock";
import { issues, items, returns } from "@/mocks/data";
import type { ReturnRecord } from "@/types";

export async function getReturns(): Promise<ReturnRecord[]> { return USE_MOCK ? mockDelay(returns) : (await apiClient.get<ReturnRecord[]>("/returns")).data; }
export async function recordReturn(input: Pick<ReturnRecord, "issueId" | "quantityReturned" | "conditionOnReturn" | "receivedBy"> & Partial<Pick<ReturnRecord, "remarks">>): Promise<ReturnRecord> {
  if (!USE_MOCK) return (await apiClient.post<ReturnRecord>("/returns", input)).data;
  const issue = issues.find((row) => row.id === input.issueId);
  assertMock(Boolean(issue), "ISSUE_NOT_FOUND", "The selected issue could not be found.");
  assertMock(input.quantityReturned > 0 && input.quantityReturned <= (issue?.outstandingQty ?? 0), "INVALID_RETURN_QUANTITY", "Return quantity must be within the outstanding amount.");
  const row: ReturnRecord = { id: `RT-${Date.now()}`, issueId: input.issueId, returnDate: new Date().toISOString().slice(0, 10), quantityReturned: input.quantityReturned, conditionOnReturn: input.conditionOnReturn, receivedBy: input.receivedBy, remarks: input.remarks };
  returns.unshift(row);
  if (issue) {
    issue.outstandingQty -= input.quantityReturned;
    issue.status = issue.outstandingQty === 0 ? "RETURNED" : "PARTIALLY_RETURNED";
    const item = items.find((entry) => entry.id === issue.itemId);
    if (item) { item.issuedQty = Math.max(0, item.issuedQty - input.quantityReturned); if (input.conditionOnReturn === "GOOD") item.availableQty += input.quantityReturned; else if (input.conditionOnReturn === "DAMAGED") item.damagedQty += input.quantityReturned; else if (input.conditionOnReturn === "LOST") item.lostQty += input.quantityReturned; else item.maintenanceQty += input.quantityReturned; }
  }
  return mockDelay(row);
}