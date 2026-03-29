import { getAccessToken } from "./auth";

const BASE_URL = process.env.API_URL_REQRES;

const PUBLIC_KEY = process.env.API_KEY_REQRES;

type ApiErrorResponse = {
  error?: string;
};

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": PUBLIC_KEY ?? '',
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const error: ApiErrorResponse = await res.json();
    throw new Error(error.error);
  }

  return res.json();
}
