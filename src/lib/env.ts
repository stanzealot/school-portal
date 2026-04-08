const trimSlash = (s: string) => s.replace(/\/+$/, '');

export const API_BASE_URL =
  trimSlash(import.meta.env.VITE_API_BASE_URL ?? 'https://ksu.onrender.com/ksu');

/** Optional full `Authorization` header value for POST /auth/login if the gateway requires it. */
export const LOGIN_AUTHORIZATION_HEADER = import.meta.env
  .VITE_LOGIN_AUTHORIZATION_BEARER as string | undefined;
