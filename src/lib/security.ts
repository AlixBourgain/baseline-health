export function isSameOrigin(request: Request) {
  const requestUrl = new URL(request.url);
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const fetchSite = request.headers.get("sec-fetch-site");

  if (fetchSite && !["same-origin", "none"].includes(fetchSite)) return false;
  const candidate = origin ?? referer;
  if (!candidate) return false;

  try {
    return new URL(candidate).origin === requestUrl.origin;
  } catch {
    return false;
  }
}

export async function sha256Hex(data: ArrayBuffer) {
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
