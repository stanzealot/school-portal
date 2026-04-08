/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  /** When "true", use mock auth and courses (demo builds only). */
  readonly VITE_DEMO_MODE?: string;
  /** Optional Bearer token value for POST /auth/login if required by the gateway */
  readonly VITE_LOGIN_AUTHORIZATION_BEARER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
