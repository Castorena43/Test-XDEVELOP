import { useAuthStore } from "@/features/auth/store/auth.store";

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

function isExpired(expiresAt: number | null) {
  if (!expiresAt) return true;
  return Date.now() > (expiresAt);
}

async function refreshFromClient(): Promise<string | null> {
  try {
    const res = await fetch("/api/auth/refresh", {
      method: "POST",
    });

    if (!res.ok) throw new Error("verify failed");

    const data = await res.json();

    useAuthStore
      .getState()
      .setAccessToken({accessToken:data.token, expiresAt:data.expiresAt});

    return data.accessToken;
  } catch {
    return null;
  }
}

export async function fetchWithAuth<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const { expiresAt, logout } = useAuthStore.getState();

  if (isExpired(expiresAt)) {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = refreshFromClient();
    }

    const newToken = await refreshPromise;

    isRefreshing = false;
    refreshPromise = null;
    if (!newToken) {
      logout();
    }
  }

  // 2) Request con token vigente
  const token = useAuthStore.getState().accessToken;

  let res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }

  return res.json();

}