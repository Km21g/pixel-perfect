import { apiClient, USE_MOCK } from "./client";
import { students } from "@/mocks/data";
import type { Student } from "@/types";
export async function getStudents(): Promise<Student[]> { return USE_MOCK ? students : (await apiClient.get<Student[]>("/students")).data; }
export async function createStudent(input: Partial<Student>): Promise<Student> { return USE_MOCK ? { ...input, id: `st-${Date.now()}` } as Student : (await apiClient.post<Student>("/students", input)).data; }
export async function updateStudent(id: string, input: Partial<Student>): Promise<Student> { return USE_MOCK ? Object.assign(students.find((student) => student.id === id) ?? {}, input) as Student : (await apiClient.put<Student>(`/students/${encodeURIComponent(id)}`, input)).data; }