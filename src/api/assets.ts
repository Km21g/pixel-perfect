import { apiClient, USE_MOCK } from "./client";
import { mockDelay } from "./mock";
import { assets } from "@/mocks/data";
import type { Asset } from "@/types";
export async function getAssets(): Promise<Asset[]> { return USE_MOCK ? mockDelay(assets) : (await apiClient.get<Asset[]>("/assets")).data; }
export async function createAsset(input: Partial<Asset>): Promise<Asset> { return USE_MOCK ? mockDelay({ ...input, id: `as-${Date.now()}` } as Asset) : (await apiClient.post<Asset>("/assets", input)).data; }
export async function updateAsset(id: string, input: Partial<Asset>): Promise<Asset> { return USE_MOCK ? mockDelay(Object.assign(assets.find((asset) => asset.id === id) ?? {}, input) as Asset) : (await apiClient.put<Asset>(`/assets/${encodeURIComponent(id)}`, input)).data; }