import type { AttendanceCourse } from '@/constants/mock.data';

/**
 * Maps API course objects (unknown shape) into the table row model.
 */
export function mapApiCourseToAttendance(raw: Record<string, unknown>): AttendanceCourse {
  const semesterRaw = raw.semester ?? raw.semesterId;
  let semester: 'First' | 'Second' = 'First';
  if (semesterRaw === 2 || semesterRaw === '2' || semesterRaw === 'Second') {
    semester = 'Second';
  }

  return {
    courseCode: String(raw.courseCode ?? raw.code ?? ''),
    courseTitle: String(raw.courseTitle ?? raw.title ?? raw.name ?? '—'),
    unit: Number(raw.unit ?? raw.units ?? 0),
    department: String(raw.department ?? raw.dept ?? '—'),
    session: String(raw.session ?? raw.sessionLabel ?? raw.sessionYear ?? ''),
    level: String(raw.level ?? '—'),
    semester,
    studentCount: Number(raw.studentCount ?? raw.noOfStudents ?? raw.students ?? 0),
  };
}
