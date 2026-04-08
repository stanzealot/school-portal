import { apiClient } from '@/lib/api/client';
import type { ApiEnvelope, LoginRequestBody, LoginResponseData } from '@/lib/api/types';

export async function loginRequest(body: LoginRequestBody) {
  const { data } = await apiClient.post<ApiEnvelope<LoginResponseData>>(
    '/auth/login',
    body,
    { skipAuth: true },
  );
  return data.data;
}
