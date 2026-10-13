import type { Asset, AuditLog, InventoryItem, Issue, Policy, RenewalRequest, ReturnRecord, StorageLocation, Student, User } from "@/types";

export const users: User[] = [
  { id: "u-admin", name: "Dr. Mira Sen", email: "mira.sen@northstar.edu", role: "admin", isActive: true, lastLoginAt: "2026-10-13T08:45:00Z" },
  { id: "u-coord-1", name: "Alex Morgan", email: "alex.morgan@northstar.edu", role: "coordinator", isActive: true, lastLoginAt: "2026-10-13T09:12:00Z" },
  { id: "u-coord-2", name: "Samira Patel", email: "samira.patel@northstar.edu", role: "coordinator", isActive: true, lastLoginAt: "2026-10-12T14:28:00Z" },
  { id: "u-student-1", name: "Jordan Lee", email: "jordan.lee@northstar.edu", role: "student", enrolmentNo: "CS24-018", isActive: true },
  { id: "u-student-2", name: "Avery Chen", email: "avery.chen@northstar.edu", role: "student", enrolmentNo: "CS24-027", isActive: true },
  { id: "u-student-3", name: "Taylor Brooks", email: "taylor.brooks@northstar.edu", role: "student", enrolmentNo: "EE23-041", isActive: true },
];

export const locations: StorageLocation[] = [
  { id: "loc-01", department: "Computer Science", laboratory: "Systems Lab", room: "B-214", cupboard: "Cabinet 03" },
  { id: "loc-02", department: "Computer Science", laboratory: "Networks Lab", room: "B-219", cupboard: "Rack 02" },
  { id: "loc-03", department: "Electrical Engineering", laboratory: "Embedded Lab", room: "C-108", cupboard: "Drawer 04" },
];

export const items: InventoryItem[] = [
  { id: "it-01", code: "ITM-001", name: "ThinkPad X1 Carbon", category: "Computing", description: "14-inch development laptop", makeModel: "Lenovo Gen 11", trackingType: "INDIVIDUAL", totalQty: 8, availableQty: 4, issuedQty: 3, damagedQty: 1, lostQty: 0, maintenanceQty: 0, locationId: "loc-01" },
  { id: "it-02", code: "ITM-002", name: "Arduino Uno R4", category: "Development boards", description: "Microcontroller prototyping board", makeModel: "Arduino Uno R4 WiFi", trackingType: "INDIVIDUAL", totalQty: 12, availableQty: 9, issuedQty: 3, damagedQty: 0, lostQty: 0, maintenanceQty: 0, locationId: "loc-03" },
  { id: "it-03", code: "ITM-003", name: "USB-C Hub", category: "Peripherals", description: "7-port USB-C adapter", makeModel: "Anker 341", trackingType: "QUANTITY", totalQty: 24, availableQty: 17, issuedQty: 5, damagedQty: 1, lostQty: 1, maintenanceQty: 0, locationId: "loc-01" },
  { id: "it-04", code: "ITM-004", name: "Cat6 Ethernet Cable", category: "Networking", description: "2m network patch cable", makeModel: "Belden Cat6 2m", trackingType: "QUANTITY", totalQty: 40, availableQty: 31, issuedQty: 7, damagedQty: 2, lostQty: 0, maintenanceQty: 0, locationId: "loc-02" },
  { id: "it-05", code: "ITM-005", name: "Raspberry Pi 5", category: "Development boards", description: "Single-board computer", makeModel: "Raspberry Pi 5 8GB", trackingType: "INDIVIDUAL", totalQty: 10, availableQty: 5, issuedQty: 4, damagedQty: 0, lostQty: 0, maintenanceQty: 1, locationId: "loc-03" },
  { id: "it-06", code: "ITM-006", name: "Logic Analyzer", category: "Test equipment", description: "16-channel USB logic analyzer", makeModel: "Saleae Logic 8", trackingType: "INDIVIDUAL", totalQty: 6, availableQty: 3, issuedQty: 2, damagedQty: 0, lostQty: 0, maintenanceQty: 1, locationId: "loc-03" },
  { id: "it-07", code: "ITM-007", name: "HDMI Adapter", category: "Peripherals", description: "USB-C to HDMI adapter", makeModel: "Apple USB-C AV", trackingType: "QUANTITY", totalQty: 18, availableQty: 13, issuedQty: 4, damagedQty: 1, lostQty: 0, maintenanceQty: 0, locationId: "loc-01" },
  { id: "it-08", code: "ITM-008", name: "Digital Multimeter", category: "Test equipment", description: "True RMS bench multimeter", makeModel: "Fluke 117", trackingType: "INDIVIDUAL", totalQty: 7, availableQty: 4, issuedQty: 2, damagedQty: 0, lostQty: 0, maintenanceQty: 1, locationId: "loc-03" },
  { id: "it-09", code: "ITM-009", name: "USB-A to USB-C Cable", category: "Cables", description: "1m braided charging cable", makeModel: "Belkin BoostCharge", trackingType: "QUANTITY", totalQty: 32, availableQty: 25, issuedQty: 6, damagedQty: 1, lostQty: 0, maintenanceQty: 0, locationId: "loc-02" },
  { id: "it-10", code: "ITM-010", name: "ESP32 DevKit", category: "Development boards", description: "Wi-Fi and Bluetooth module", makeModel: "Espressif ESP32-WROOM", trackingType: "INDIVIDUAL", totalQty: 15, availableQty: 11, issuedQty: 4, damagedQty: 0, lostQty: 0, maintenanceQty: 0, locationId: "loc-03" },
];

export const assets: Asset[] = Array.from({ length: 15 }, (_, i) => {
  const item = items[i % items.length];
  const states: Asset["status"][] = ["AVAILABLE", "ISSUED", "AVAILABLE", "UNAVAILABLE"];
  const status = states[i % states.length] ?? "AVAILABLE";
  return { id: `as-${String(i + 1).padStart(3, "0")}`, itemId: item?.id ?? "it-01", assetId: `AST-${String(2301 + i)}`, serialNo: `NS-${String(88031 + i)}`, locationId: item?.locationId ?? "loc-01", condition: status === "UNAVAILABLE" ? "MAINTENANCE" : "GOOD", status };
});

export const students: Student[] = Array.from({ length: 12 }, (_, i) => {
  const first = ["Jordan", "Avery", "Taylor", "Morgan", "Casey", "Riley", "Jamie", "Drew", "Quinn", "Skyler", "Reese", "Cameron"][i] ?? "Student";
  const last = ["Lee", "Chen", "Brooks", "Shah", "Reed", "Kim", "Rivera", "Park", "Singh", "Diaz", "Morgan", "Patel"][i] ?? "User";
  return { id: `st-${String(i + 1).padStart(2, "0")}`, name: `${first} ${last}`, enrolmentNo: `${i % 2 === 0 ? "CS" : "EE"}${24 - Math.floor(i / 6)}-${String(18 + i).padStart(3, "0")}`, programme: i % 2 === 0 ? "BSc Computer Science" : "BEng Electrical Engineering", semester: 3 + (i % 4), email: `${first.toLowerCase()}.${last.toLowerCase()}@northstar.edu`, phone: `+1 (555) 018-${String(20 + i).padStart(2, "0")}` };
});

export const issues: Issue[] = [
  { id: "IS-2401", studentId: "st-01", itemId: "it-01", assetId: "AST-2302", quantity: 1, outstandingQty: 1, purpose: "Capstone project", issueDate: "2026-09-12", dueDate: "2026-10-05", issuedBy: "Alex Morgan", status: "OVERDUE", renewalCount: 0 },
  { id: "IS-2402", studentId: "st-02", itemId: "it-03", quantity: 2, outstandingQty: 2, purpose: "Machine learning lab", issueDate: "2026-10-01", dueDate: "2026-10-16", issuedBy: "Samira Patel", status: "OVERDUE", renewalCount: 0 },
  { id: "IS-2403", studentId: "st-03", itemId: "it-06", assetId: "AST-2306", quantity: 1, outstandingQty: 1, purpose: "Signal analysis coursework", issueDate: "2026-10-02", dueDate: "2026-10-17", issuedBy: "Alex Morgan", status: "OVERDUE", renewalCount: 0 },
  { id: "IS-2404", studentId: "st-04", itemId: "it-05", assetId: "AST-2305", quantity: 1, outstandingQty: 1, purpose: "IoT prototype", issueDate: "2026-10-06", dueDate: "2026-10-21", issuedBy: "Samira Patel", status: "ACTIVE", renewalCount: 0 },
  { id: "IS-2405", studentId: "st-05", itemId: "it-02", assetId: "AST-2308", quantity: 1, outstandingQty: 1, purpose: "Embedded systems lab", issueDate: "2026-10-08", dueDate: "2026-10-23", issuedBy: "Alex Morgan", status: "ACTIVE", renewalCount: 0 },
  { id: "IS-2406", studentId: "st-06", itemId: "it-04", quantity: 3, outstandingQty: 3, purpose: "Network installation project", issueDate: "2026-10-10", dueDate: "2026-10-25", issuedBy: "Samira Patel", status: "ACTIVE", renewalCount: 0 },
  { id: "IS-2407", studentId: "st-07", itemId: "it-01", assetId: "AST-2309", quantity: 1, outstandingQty: 1, purpose: "Software engineering project", issueDate: "2026-10-11", dueDate: "2026-10-26", issuedBy: "Alex Morgan", status: "ACTIVE", renewalCount: 0 },
  { id: "IS-2408", studentId: "st-08", itemId: "it-09", quantity: 2, outstandingQty: 1, purpose: "Hardware workshop", issueDate: "2026-10-09", dueDate: "2026-10-24", issuedBy: "Samira Patel", status: "PARTIALLY_RETURNED", renewalCount: 0 },
  { id: "IS-2409", studentId: "st-09", itemId: "it-08", assetId: "AST-2311", quantity: 1, outstandingQty: 1, purpose: "Circuits lab assessment", issueDate: "2026-10-12", dueDate: "2026-10-27", issuedBy: "Alex Morgan", status: "ACTIVE", renewalCount: 0 },
  { id: "IS-2410", studentId: "st-10", itemId: "it-10", assetId: "AST-2310", quantity: 1, outstandingQty: 0, purpose: "Wireless systems lab", issueDate: "2026-09-15", dueDate: "2026-09-30", issuedBy: "Samira Patel", status: "RETURNED", renewalCount: 0 },
];

export const returns: ReturnRecord[] = [{ id: "RT-301", issueId: "IS-2408", returnDate: "2026-10-12", quantityReturned: 1, conditionOnReturn: "GOOD", receivedBy: "Alex Morgan", remarks: "One cable returned" }];
export const renewals: RenewalRequest[] = [
  { id: "RN-021", issueId: "IS-2404", requestDate: "2026-10-12", status: "PENDING", remarks: "Project testing requires additional time" },
  { id: "RN-022", issueId: "IS-2405", requestDate: "2026-10-13", status: "PENDING", remarks: "Final prototype demonstration next week" },
  { id: "RN-023", issueId: "IS-2407", requestDate: "2026-10-13", status: "PENDING", remarks: "Awaiting component delivery" },
];
export const policy: Policy = { maxItemsPerStudent: 5, maxRenewals: 2, loanDays: 15 };
export const auditLogs: AuditLog[] = [
  { id: "AU-501", action: "Issue created", entityType: "Issue", entityId: "IS-2409", details: "Digital Multimeter issued to EE24-026", performedBy: "Alex Morgan", timestamp: "2026-10-13T09:10:00Z" },
  { id: "AU-500", action: "Return recorded", entityType: "Return", entityId: "RT-301", details: "1 USB-A to USB-C Cable returned in good condition", performedBy: "Alex Morgan", timestamp: "2026-10-12T16:42:00Z" },
  { id: "AU-499", action: "Renewal requested", entityType: "Renewal", entityId: "RN-023", details: "Extension request submitted", performedBy: "Taylor Brooks", timestamp: "2026-10-13T08:22:00Z" },
  { id: "AU-498", action: "Condition updated", entityType: "Asset", entityId: "AST-2304", details: "Marked unavailable for maintenance", performedBy: "Samira Patel", timestamp: "2026-10-12T14:30:00Z" },
];