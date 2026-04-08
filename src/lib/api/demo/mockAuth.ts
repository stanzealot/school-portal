import type { ApiUser, LoginRequestBody, LoginResponseData } from '@/lib/api/types';

export const DEMO_LOGIN_PASSWORD = 'demo';

const DEMO_USERS: Record<
  string,
  ApiUser & { firstName: string; lastName: string; roles: NonNullable<ApiUser['roles']> }
> = {
  student: {
    id: 'demo-student-1',
    username: 'student',
    email: 'student.demo@portal.edu',
    firstName: 'Ada',
    lastName: 'Student',
    roles: ['student'],
  },
  lecturer: {
    id: 'demo-lecturer-1',
    username: 'lecturer',
    email: 'lecturer.demo@portal.edu',
    firstName: 'Sam',
    lastName: 'Lecturer',
    roles: ['lecturer'],
  },
  exam_officer: {
    id: 'demo-exam-officer-1',
    username: 'exam_officer',
    email: 'exams.demo@portal.edu',
    firstName: 'Eve',
    lastName: 'Officer',
    roles: ['exam_officer'],
  },
};

export async function mockLogin(body: LoginRequestBody): Promise<LoginResponseData> {
  const key = body.username.trim().toLowerCase();
  const user = DEMO_USERS[key];
  if (!user || body.password !== DEMO_LOGIN_PASSWORD) {
    throw new Error('Invalid username or password.');
  }

  return {
    access_token: 'demo-access-token',
    refresh_token: 'demo-refresh-token',
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
    },
  };
}
