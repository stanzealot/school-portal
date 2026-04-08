import { useMutation } from '@tanstack/react-query';
import { loginRequest } from '@/lib/api/auth';
import type { LoginRequestBody } from '@/lib/api/types';

export function useLogin() {
  return useMutation({
    mutationFn: (body: LoginRequestBody) => loginRequest(body),
  });
}
