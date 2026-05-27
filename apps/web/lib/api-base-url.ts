import { env } from "~/env.js";

export function getApiBaseUrl() {
  const apiUrl = env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/trpc";
  return apiUrl.replace(/\/trpc\/?$/, "");
}
