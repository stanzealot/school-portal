import { MOCK_ATTENDANCE_COURSES } from '@/constants/mock.data';
import type { CoursesListPayload } from '@/lib/api/types';

export function mockFetchCourses(params: {
  sessionId: number;
  semester: number;
  page: number;
  limit: number;
}): CoursesListPayload {
  const { sessionId, semester, page, limit } = params;

  const filtered = MOCK_ATTENDANCE_COURSES.filter((c) => {
    const m = c.session.match(/^(\d{4})/);
    const courseYear = m ? parseInt(m[1], 10) : 0;
    if (courseYear !== sessionId) return false;
    const semNum = c.semester === 'Second' ? 2 : 1;
    return semNum === semester;
  });

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / limit) || 1);
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * limit;
  const slice = filtered.slice(start, start + limit);

  const data = slice.map((c) => ({
    courseCode: c.courseCode,
    courseTitle: c.courseTitle,
    unit: c.unit,
    department: c.department,
    session: c.session,
    level: c.level,
    semester: c.semester === 'Second' ? 2 : 1,
    studentCount: c.studentCount,
  }));

  return {
    success: true,
    data,
    pagination: {
      total,
      page: safePage,
      limit,
      totalPages,
    },
  };
}
