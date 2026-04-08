const trimSlash = (s: string) => s.replace(/\/+$/, '');

function readDemoMode(): boolean {
  const raw = import.meta.env.VITE_DEMO_MODE;
  if (raw == null || raw === '') return false;
  const v = String(raw).trim().toLowerCase();
  return v === 'true' || v === '1' || v === 'yes' || v === 'on';
}

/** When true, login and courses use local mocks (no real API). For static demo builds only. */
export const DEMO_MODE = readDemoMode();

export const API_BASE_URL =
  trimSlash(import.meta.env.VITE_API_BASE_URL ?? 'https://ksu.onrender.com/ksu');

/** Optional full `Authorization` header value for POST /auth/login if the gateway requires it. */
export const LOGIN_AUTHORIZATION_HEADER = import.meta.env
  .VITE_LOGIN_AUTHORIZATION_BEARER as string | undefined;
