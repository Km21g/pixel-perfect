import { apiClient, USE_MOCK } from "./client";
import { locations } from "@/mocks/data";
import type { StorageLocation } from "@/types";
export async function getLocations(): Promise<StorageLocation[]> { return USE_MOCK ? locations : (await apiClient.get<StorageLocation[]>("/locations")).data; }
export async function createLocation(input: Partial<StorageLocation>): Promise<StorageLocation> { return USE_MOCK ? { ...input, id: `loc-${Date.now()}` } as StorageLocation : (await apiClient.post<StorageLocation>("/locations", input)).data; }
export async function updateLocation(id: string, input: Partial<StorageLocation>): Promise<StorageLocation> { return USE_MOCK ? Object.assign(locations.find((location) => location.id === id) ?? {}, input) as StorageLocation : (await apiClient.put<StorageLocation>(`/locations/${encodeURIComponent(id)}`, input)).data; }