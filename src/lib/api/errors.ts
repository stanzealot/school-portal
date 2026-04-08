import { isAxiosError } from 'axios';

function pickMessage(data: unknown): string | null {
  if (data == null) return null;
  if (typeof data === 'string' && data.trim()) return data;
  if (typeof data === 'object' && data !== null) {
    const o = data as Record<string, unknown>;
    if (typeof o.message === 'string') return o.message;
    if (typeof o.error === 'string') return o.error;
    if (typeof o.status === 'string' && o.status !== 'success') {
      const m = o.message;
      if (typeof m === 'string') return m;
    }
  }
  return null;
}

/**
 * Safe, user-facing message for API failures (no raw JSON dumps).
 */
export function getApiErrorMessage(error: unknown, fallback = 'Something went wrong. Please try again.'): string {
  if (isAxiosError(error)) {
    const status = error.response?.status;
    const url = error.config?.url ?? '';
    if (status === 401 || status === 403) {
      if (url.includes('/auth/login')) {
        return 'Invalid username or password.';
      }
      return 'Session expired. Please sign in again.';
    }
    const fromBody = pickMessage(error.response?.data);
    if (fromBody) return fromBody;
    if (error.code === 'ECONNABORTED') {
      return 'Request timed out. Check your connection and try again.';
    }
    if (error.message === 'Network Error') {
      return 'Network error. Check your connection and try again.';
    }
    if (status && status >= 500) {
      return 'Server error. Please try again later.';
    }
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}
