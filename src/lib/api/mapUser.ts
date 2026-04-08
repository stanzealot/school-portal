import type { ApiUser } from '@/lib/api/types';
import type { User } from '@/types';

function cleanNamePart(s?: string) {
  if (!s || s === 'string') return '';
  return s;
}

export function mapApiUserToUser(u: ApiUser): User {
  const combined = [cleanNamePart(u.firstName), cleanNamePart(u.lastName)]
    .filter(Boolean)
    .join(' ')
    .trim();
  const name = combined || u.username || u.email;
  const roleFromApi = u.roles?.[0];
  const role: User['role'] =
    roleFromApi === 'student'      ? 'student'      :
    roleFromApi === 'admin'        ? 'admin'         :
    roleFromApi === 'exam_officer' ? 'exam_officer'  :
    'lecturer';

  return {
    id: u.id,
    name,
    email: u.email,
    role,
    username: u.username,
  };
}
