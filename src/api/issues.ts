import { apiClient, USE_MOCK } from "./client";
import { apiError, assertMock, mockDelay } from "./mock";
import { issues, items, students } from "@/mocks/data";
import type { Issue } from "@/types";

export async function getIssues(): Promise<Issue[]> { return USE_MOCK ? mockDelay(issues) : (await apiClient.get<Issue[]>("/issues")).data; }
export async function getIssue(id: string): Promise<Issue> {
  if (!USE_MOCK) return (await apiClient.get<Issue>(`/issues/${encodeURIComponent(id)}`)).data;
  const issue = issues.find((row) => row.id === id);
  assertMock(Boolean(issue), "ISSUE_NOT_FOUND", "The selected issue could not be found.");
  return mockDelay(issue as Issue);
}
export async function createIssue(input: Pick<Issue, "studentId" | "itemId" | "quantity" | "purpose">): Promise<Issue> {
  if (!USE_MOCK) return (await apiClient.post<Issue>("/issues", input)).data;
  const item = items.find((row) => row.id === input.itemId);
  assertMock(Boolean(item), "ITEM_NOT_FOUND", "The selected inventory item could not be found.");
  const student = students.find((row) => row.id === input.studentId);
  assertMock(Boolean(student), "STUDENT_NOT_FOUND", "The selected student could not be found.");
  assertMock(Number.isInteger(input.quantity) && input.quantity > 0, "INVALID_QUANTITY", "Quantity must be a positive whole number.");
  assertMock((item?.availableQty ?? 0) >= input.quantity, "INSUFFICIENT_STOCK", `${input.quantity} ${item?.name ?? "items"} requested, but only ${item?.availableQty ?? 0} are currently available.`);
  const issue: Issue = { id: `IS-${Date.now()}`, studentId: input.studentId, itemId: input.itemId, quantity: input.quantity, outstandingQty: input.quantity, purpose: input.purpose.trim(), issueDate: new Date().toISOString().slice(0, 10), dueDate: "", issuedBy: "Alex Morgan", status: "ACTIVE", renewalCount: 0 };
  issues.unshift(issue);
  item!.availableQty -= input.quantity;
  item!.issuedQty += input.quantity;
  return mockDelay(issue);
}
export async function adjustStock(itemId: string, adjustment: number, reason: string): Promise<void> {
  if (!USE_MOCK) { await apiClient.post("/stock-adjustments", { itemId, adjustment, reason }); return; }
  const item = items.find((row) => row.id === itemId);
  assertMock(Boolean(item), "ITEM_NOT_FOUND", "The selected inventory item could not be found.");
  assertMock(Number.isInteger(adjustment) && (item?.availableQty ?? 0) + adjustment >= 0, "INVALID_ADJUSTMENT", "The adjustment cannot make available stock negative.");
  assertMock(reason.trim().length > 0, "REASON_REQUIRED", "A reason is required for stock adjustments.");
  item!.availableQty += adjustment;
  item!.totalQty += adjustment;
  await mockDelay(undefined);
}