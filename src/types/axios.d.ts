import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    /** Do not attach stored access token (e.g. login request). */
    skipAuth?: boolean;
  }
}
