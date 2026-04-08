import { apiClient } from '@/lib/api/client';
import { mockLogin } from '@/lib/api/demo/mockAuth';
import { DEMO_MODE } from '@/lib/env';
import type { ApiEnvelope, LoginRequestBody, LoginResponseData } from '@/lib/api/types';

export async function loginRequest(body: LoginRequestBody): Promise<LoginResponseData> {
  if (DEMO_MODE) {
    return mockLogin(body);
  }

  const { data } = await apiClient.post<ApiEnvelope<LoginResponseData>>(
    '/auth/login',
    body,
    { skipAuth: true },
  );
  return data.data;
}
