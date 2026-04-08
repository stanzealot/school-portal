import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';
import { queryClient } from '@/lib/query-client';

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthActions {
  login: (user: User, accessToken: string, refreshToken?: string | null) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      login: (user, accessToken, refreshToken = null) =>
        set({
          user,
          token: accessToken,
          refreshToken: refreshToken ?? null,
          isAuthenticated: true,
          isLoading: false,
        }),

      logout: () => {
        queryClient.clear();
        set({ user: null, token: null, refreshToken: null, isAuthenticated: false });
      },

      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'kogi-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
