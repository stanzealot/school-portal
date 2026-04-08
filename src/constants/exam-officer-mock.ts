// ─── Curriculum course ────────────────────────────────────────
export interface CurriculumCourse {
  id: string;
  courseCode: string;
  courseTitle: string;
  unit: number;
  status: 'Core' | 'Elective';
  semester: 'First' | 'Second';
  level: string;
}

export const LEVELS   = ['ND1', 'ND2', 'HND1', 'HND2'] as const;
export const STATUSES = ['Core', 'Elective'] as const;
export const EXAM_SEMESTERS = ['First', 'Second'] as const;
export const EXAM_PAGE_SIZE = 7;

export const MOCK_CURRICULUM: CurriculumCourse[] = [
  { id: '1',  courseCode: 'ACC111', courseTitle: 'Principles of Accounting 1',  unit: 3, status: 'Core',     semester: 'First',  level: 'ND1'  },
  { id: '2',  courseCode: 'ACC112', courseTitle: 'Principles of Accounting 2',  unit: 4, status: 'Elective', semester: 'Second', level: 'ND1'  },
  { id: '3',  courseCode: 'ACC113', courseTitle: 'Principles of Marketing',      unit: 3, status: 'Core',     semester: 'Second', level: 'ND1'  },
  { id: '4',  courseCode: 'ACC114', courseTitle: 'Business Law Fundamentals',    unit: 2, status: 'Core',     semester: 'First',  level: 'ND1'  },
  { id: '5',  courseCode: 'ACC115', courseTitle: 'Introduction to Finance',      unit: 4, status: 'Elective', semester: 'Second', level: 'ND1'  },
  { id: '6',  courseCode: 'ACC116', courseTitle: 'Human Resource Management',    unit: 3, status: 'Core',     semester: 'First',  level: 'ND1'  },
  { id: '7',  courseCode: 'ACC117', courseTitle: 'Data Analysis for Business',   unit: 3, status: 'Core',     semester: 'First',  level: 'ND1'  },
  { id: '8',  courseCode: 'ACC121', courseTitle: 'Intermediate Accounting',      unit: 3, status: 'Core',     semester: 'First',  level: 'ND2'  },
  { id: '9',  courseCode: 'ACC122', courseTitle: 'Cost Accounting',              unit: 4, status: 'Core',     semester: 'Second', level: 'ND2'  },
  { id: '10', courseCode: 'ACC123', courseTitle: 'Taxation Fundamentals',        unit: 3, status: 'Elective', semester: 'First',  level: 'ND2'  },
  { id: '11', courseCode: 'BAM111', courseTitle: 'Business Mathematics',         unit: 2, status: 'Core',     semester: 'First',  level: 'ND1'  },
  { id: '12', courseCode: 'BAM112', courseTitle: 'Principles of Economics',      unit: 3, status: 'Core',     semester: 'Second', level: 'ND1'  },
  { id: '13', courseCode: 'BAM211', courseTitle: 'Entrepreneurship',             unit: 2, status: 'Core',     semester: 'First',  level: 'HND1' },
  { id: '14', courseCode: 'BAM212', courseTitle: 'Business Policy & Strategy',   unit: 3, status: 'Elective', semester: 'Second', level: 'HND1' },
  { id: '15', courseCode: 'GNS101', courseTitle: 'Use of English I',             unit: 2, status: 'Core',     semester: 'First',  level: 'ND1'  },
  { id: '16', courseCode: 'GNS102', courseTitle: 'Use of English II',            unit: 2, status: 'Core',     semester: 'Second', level: 'ND1'  },
  { id: '17', courseCode: 'GNS201', courseTitle: 'Communication Skills',         unit: 2, status: 'Core',     semester: 'First',  level: 'ND2'  },
  { id: '18', courseCode: 'MGT301', courseTitle: 'Management Principles',        unit: 3, status: 'Core',     semester: 'Second', level: 'HND1' },
  { id: '19', courseCode: 'MGT302', courseTitle: 'Organizational Behaviour',     unit: 3, status: 'Elective', semester: 'First',  level: 'HND1' },
  { id: '20', courseCode: 'MGT401', courseTitle: 'Strategic Management',         unit: 4, status: 'Core',     semester: 'First',  level: 'HND2' },
];

// ─── Student record ───────────────────────────────────────────
export interface StudentRecord {
  id: string;
  matricNumber: string;
  fullName: string;
  department: string;
  level: string;
  session: string;
  status: 'Active' | 'Inactive' | 'Blacklisted';
}

const STUDENT_NAMES = [
  'Abubakar Musa','Fatima Ibrahim','Chukwuemeka Obi','Ngozi Adeyemi','Suleiman Yusuf',
  'Amina Bello','Tunde Akinola','Chioma Eze','Mohammed Aliyu','Blessing Okonkwo',
  'Emmanuel Okafor','Zainab Abdullahi','Seun Adebayo','Ifeoma Nwachukwu','Yakubu Tanko',
  'Hauwa Sule','Kingsley Nwosu','Adaeze Obi','Ibrahim Garba','Precious Uchenna',
];

export const MOCK_STUDENTS: StudentRecord[] = STUDENT_NAMES.map((name, i) => ({
  id: String(i + 1),
  matricNumber: `KSP/ND1/${String(2025 + (i % 3))}/${String(i + 1).padStart(4, '0')}`,
  fullName: name,
  department: ['Accounting', 'Business Administration', 'Marketing', 'Economics'][i % 4],
  level: ['ND1', 'ND2', 'HND1', 'HND2'][i % 4],
  session: '2025/2026',
  status: i % 7 === 6 ? 'Blacklisted' : i % 5 === 4 ? 'Inactive' : 'Active',
}));

// ─── Result upload stats ──────────────────────────────────────
export interface UploadStat {
  id: string;
  lecturerName: string;
  courseCode: string;
  courseTitle: string;
  department: string;
  session: string;
  semester: 'First' | 'Second';
  uploadedAt: string;
  status: 'Uploaded' | 'Pending' | 'Rejected';
}

export const MOCK_UPLOAD_STATS: UploadStat[] = [
  { id:'1',  lecturerName:'Dr. Aminu Bello',    courseCode:'ACC111', courseTitle:'Principles of Accounting 1', department:'Accounting',              session:'2025/2026', semester:'First',  uploadedAt:'2026-01-15', status:'Uploaded' },
  { id:'2',  lecturerName:'Prof. Ngozi Obi',    courseCode:'ACC112', courseTitle:'Principles of Accounting 2', department:'Accounting',              session:'2025/2026', semester:'Second', uploadedAt:'2026-01-18', status:'Uploaded' },
  { id:'3',  lecturerName:'Mr. Tunde Akin',     courseCode:'BAM111', courseTitle:'Business Mathematics',       department:'Business Administration', session:'2025/2026', semester:'First',  uploadedAt:'',           status:'Pending'  },
  { id:'4',  lecturerName:'Mrs. Chioma Eze',    courseCode:'GNS101', courseTitle:'Use of English I',           department:'General Studies',         session:'2025/2026', semester:'First',  uploadedAt:'2026-01-20', status:'Uploaded' },
  { id:'5',  lecturerName:'Dr. Sule Ibrahim',   courseCode:'MGT301', courseTitle:'Management Principles',     department:'Management',              session:'2025/2026', semester:'Second', uploadedAt:'',           status:'Pending'  },
  { id:'6',  lecturerName:'Prof. Yemi Adebayo', courseCode:'ACC113', courseTitle:'Principles of Marketing',   department:'Accounting',              session:'2025/2026', semester:'Second', uploadedAt:'2026-01-22', status:'Rejected' },
  { id:'7',  lecturerName:'Dr. Fatima Garba',   courseCode:'BAM112', courseTitle:'Principles of Economics',   department:'Business Administration', session:'2025/2026', semester:'Second', uploadedAt:'2026-01-23', status:'Uploaded' },
];

export const EXAM_DEPARTMENTS = ['Accounting', 'Business Administration', 'Marketing', 'Economics', 'General Studies', 'Management'];
export const EXAM_SESSIONS    = ['2025/2026', '2024/2025', '2023/2024'];
