import { apiClient, USE_MOCK } from "./client";
import { assertMock, mockDelay } from "./mock";
import { items } from "@/mocks/data";
import type { InventoryItem } from "@/types";

export async function getItems(): Promise<InventoryItem[]> { return USE_MOCK ? mockDelay(items) : (await apiClient.get<InventoryItem[]>("/items")).data; }
export async function getItem(id: string): Promise<InventoryItem | undefined> { return USE_MOCK ? mockDelay(items.find((row) => row.id === id)) : (await apiClient.get<InventoryItem>(`/items/${encodeURIComponent(id)}`)).data; }
export async function createItem(input: Partial<InventoryItem>): Promise<InventoryItem> { return USE_MOCK ? mockDelay({ ...input, id: `it-${Date.now()}` } as InventoryItem) : (await apiClient.post<InventoryItem>("/items", input)).data; }
export async function updateItem(id: string, input: Partial<InventoryItem>): Promise<InventoryItem> {
  if (!USE_MOCK) return (await apiClient.put<InventoryItem>(`/items/${encodeURIComponent(id)}`, input)).data;
  const item = items.find((row) => row.id === id);
  assertMock(Boolean(item), "ITEM_NOT_FOUND", "The selected inventory item no longer exists.");
  return mockDelay(Object.assign(item as InventoryItem, input));
}