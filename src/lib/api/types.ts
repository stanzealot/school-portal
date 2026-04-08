/** POST /auth/login */
export interface LoginRequestBody {
  username: string;
  password: string;
}

export interface ApiUser {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  groupIds?: number[];
  roles?: string[];
}

export interface LoginResponseData {
  access_token: string;
  refresh_token: string;
  user: ApiUser;
}

export interface ApiEnvelope<T> {
  data: T;
  status: string;
}

/** GET /courses nested payload */
export interface CoursesListPayload {
  success?: boolean;
  data: unknown[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CoursesApiEnvelope {
  data: CoursesListPayload;
  status: string;
}
