// ─── Course Registration Mock Data ──────────────────────────────

export interface RegisteredCourse {
  sn: number;
  courseCode: string;
  courseTitle: string;
  unit: number;
  status: 'C' | 'E';
}

export interface OLevelResult {
  id: string;
  subject: string;
  grade: string;
}

// Current semester registered courses
export const MOCK_REGISTERED_COURSES: RegisteredCourse[] = [
  { sn: 1, courseCode: 'ACC111', courseTitle: 'Principles of Accounting 1',     unit: 3, status: 'C' },
  { sn: 2, courseCode: 'ACC112', courseTitle: 'Principles of Accounting 2',     unit: 3, status: 'C' },
  { sn: 3, courseCode: 'ACC113', courseTitle: 'Intermediate Accounting 1',      unit: 3, status: 'C' },
  { sn: 4, courseCode: 'ACC114', courseTitle: 'Managerial Accounting',          unit: 2, status: 'C' },
  { sn: 5, courseCode: 'ACC115', courseTitle: 'Cost Accounting',                unit: 3, status: 'C' },
  { sn: 6, courseCode: 'ACC116', courseTitle: 'Taxation Principles',            unit: 2, status: 'C' },
  { sn: 7, courseCode: 'ACC117', courseTitle: 'Advanced Financial Reporting',   unit: 3, status: 'C' },
];

// Available courses to pick from (shown in registration drawer Step 2)
export const MOCK_AVAILABLE_COURSES: RegisteredCourse[] = [
  { sn: 1, courseCode: 'ACC111', courseTitle: 'Principles of Accounting 1',     unit: 3, status: 'C' },
  { sn: 2, courseCode: 'ACC112', courseTitle: 'Principles of Accounting 2',     unit: 3, status: 'C' },
  { sn: 3, courseCode: 'BUS101', courseTitle: 'Introduction to Business',       unit: 3, status: 'C' },
  { sn: 4, courseCode: 'ECO201', courseTitle: 'Microeconomics',                 unit: 3, status: 'C' },
  { sn: 5, courseCode: 'ECO202', courseTitle: 'Macroeconomics',                 unit: 2, status: 'C' },
  { sn: 6, courseCode: 'FIN301', courseTitle: 'Corporate Finance',              unit: 3, status: 'C' },
  { sn: 7, courseCode: 'MKT305', courseTitle: 'Principles of Marketing',        unit: 3, status: 'C' },
];

// Previous semester data (for Previous Registration view)
export const MOCK_PREVIOUS_COURSES: RegisteredCourse[] = [
  { sn: 1, courseCode: 'ACC111', courseTitle: 'Principles of Accounting 1',     unit: 3, status: 'C' },
  { sn: 2, courseCode: 'ACC112', courseTitle: 'Principles of Accounting 2',     unit: 3, status: 'C' },
  { sn: 3, courseCode: 'ACC113', courseTitle: 'Intermediate Accounting 1',      unit: 3, status: 'C' },
  { sn: 4, courseCode: 'ACC114', courseTitle: 'Managerial Accounting',          unit: 2, status: 'C' },
  { sn: 5, courseCode: 'ACC115', courseTitle: 'Cost Accounting',                unit: 3, status: 'C' },
  { sn: 6, courseCode: 'ACC116', courseTitle: 'Taxation Principles',            unit: 2, status: 'C' },
  { sn: 7, courseCode: 'ACC117', courseTitle: 'Advanced Financial Reporting',   unit: 3, status: 'C' },
];

// O-Level mock data
export const MOCK_OLEVEL_RESULTS: OLevelResult[] = [
  { id: '1', subject: 'Mathematics',    grade: 'C1' },
  { id: '2', subject: 'Science',        grade: 'C2' },
  { id: '3', subject: 'History',        grade: 'C3' },
  { id: '4', subject: 'Literature',     grade: 'C4' },
  { id: '5', subject: 'Art',            grade: 'C5' },
  { id: '6', subject: 'Physics',        grade: 'C6' },
  { id: '7', subject: 'Chemistry',      grade: 'C7' },
  { id: '8', subject: 'Biology',        grade: 'C8' },
];

export const OLEVEL_SUBJECTS = [
  'Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology',
  'Further Mathematics', 'Economics', 'History', 'Geography', 'Literature',
  'Government', 'Commerce', 'Accounting', 'Agricultural Science', 'Art',
  'Music', 'Technical Drawing', 'Computer Studies', 'Science', 'Yoruba',
  'Igbo', 'Hausa', 'French', 'Arabic', 'Christian Religious Studies',
  'Islamic Religious Studies', 'Physical Education', 'Home Economics',
];

export const OLEVEL_GRADES = ['A1', 'B2', 'B3', 'C4', 'C5', 'C6', 'D7', 'E8', 'F9'];

export const SESSIONS  = ['2024/2025', '2023/2024', '2022/2023', '2021/2022'];
export const SEMESTERS = ['First', 'Second'];
export const LEVELS    = ['HND', 'ND', '100 Level', '200 Level', '300 Level', '400 Level'];
export const EXAM_TYPES = ['WAEC', 'NECO', 'GCE', 'NABTEB'];
export const SITTINGS   = ['First', 'Second'];

// Signature fields for course form
export const SIGNATURE_FIELDS = [
  'Student Signature',
  'Head of Department',
  'Dean of Faculty',
  'Bursar',
  'Registrar',
];
