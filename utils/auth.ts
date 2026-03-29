
export function getAccessToken() {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(/accessToken=([^;]+)/);
  return match ? match[1] : null;
}