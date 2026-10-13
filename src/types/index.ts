export type Role = "admin" | "coordinator" | "student";
export type TrackingType = "INDIVIDUAL" | "QUANTITY";
export type ItemCondition = "GOOD" | "DAMAGED" | "LOST" | "MAINTENANCE";
export type AssetStatus = "AVAILABLE" | "ISSUED" | "UNAVAILABLE";
export type IssueStatus = "ACTIVE" | "PARTIALLY_RETURNED" | "RETURNED" | "OVERDUE";
export type RenewalStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  enrolmentNo?: string;
  isActive: boolean;
  lastLoginAt?: string;
}
export interface StorageLocation { id: string; department: string; laboratory: string; room: string; cupboard?: string; notes?: string }
export interface InventoryItem {
  id: string; code: string; name: string; category: string; description: string; makeModel: string;
  trackingType: TrackingType; totalQty: number; availableQty: number; issuedQty: number; damagedQty: number;
  lostQty: number; maintenanceQty: number; locationId: string;
}
export interface Asset {
  id: string; itemId: string; assetId: string; serialNo?: string; locationId: string;
  condition: ItemCondition; status: AssetStatus;
}
export interface Student { id: string; name: string; enrolmentNo: string; programme: string; semester: number; email: string; phone: string }
export interface Issue {
  id: string; studentId: string; itemId: string; assetId?: string; quantity: number; outstandingQty: number;
  purpose: string; issueDate: string; dueDate: string; issuedBy: string; status: IssueStatus; renewalCount: number;
}
export interface ReturnRecord { id: string; issueId: string; returnDate: string; quantityReturned: number; conditionOnReturn: ItemCondition; receivedBy: string; remarks?: string }
export interface RenewalRequest { id: string; issueId: string; requestDate: string; status: RenewalStatus; revisedDueDate?: string; approvedBy?: string; remarks?: string }
export interface Policy { maxItemsPerStudent: number; maxRenewals: number; loanDays: number }
export interface AuditLog { id: string; action: string; entityType: string; entityId: string; details: string; performedBy: string; timestamp: string }
export interface ApiError { error: string; message: string; details?: Record<string, string> }
export interface ReportSummary { totalItems: number; activeIssues: number; overdueIssues: number; dueSoonIssues: number; availableItems: number; pendingRenewals: number }