import axios, { type AxiosError } from "axios";
import { toast } from "sonner";
import type { ApiError } from "@/types";

export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const status = error.response?.status;
    if (status === 401 && typeof window !== "undefined" && window.location.pathname !== "/login") {
      window.location.assign("/login");
    }
    if (status === 403) toast.error("You are not authorised to do this");
    if (error.response?.data?.message) return Promise.reject(new Error(error.response.data.message));
    return Promise.reject(error);
  },
);