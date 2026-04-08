export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',

  // Student portal
  STUDENT: {
    HOME:                    '/student/home',
    DOCUMENTS:               '/student/documents',
    ANNOUNCEMENTS:           '/student/announcements',
    COURSE_REG:              '/student/course-reg',
    COURSE_REG_PREVIOUS:     '/student/course-reg/previous',
    HOSTEL:                  '/student/hostel',
    HOSTEL_PAYMENT:          '/student/hostel/payment',
    PAYMENTS:                '/student/payments',
    PAYMENTS_SCHOOL_FEES:    '/student/payments/school-fees',
    PAYMENTS_DEPARTMENTAL:   '/student/payments/departmental',
    PAYMENTS_OTHER:          '/student/payments/other',
    RESULTS:                 '/student/results',
    CALENDAR:                '/student/calendar',
    TIMETABLE:               '/student/timetable',
    SETTINGS:                '/student/settings',
  },

  // Lecturer portal
  LECTURER: {
    DASHBOARD:        '/lecturer/dashboard',
    COURSE_ALLOCATION:'/lecturer/course-allocation',
    EXAM_ATTENDANCE:  '/lecturer/exam-attendance',
    UPLOAD_RESULT:    '/lecturer/upload-result',
    VIEW_RESULTS:     '/lecturer/view-results',
    ACADEMIC_CALENDAR:'/lecturer/academic-calendar',
    SETTINGS:         '/lecturer/settings',
  },
} as const;

// Exam Officer portal
export const EXAM_OFFICER_ROUTES = {
  DASHBOARD: '/exam-officer/dashboard',

  CURRICULUM: {
    ROOT:                '/exam-officer/curriculum',
    MANAGE:              '/exam-officer/curriculum/manage',
    STUDENT_COURSE_FORM: '/exam-officer/curriculum/student-course-form',
    STUDENT_CARRYOVER:   '/exam-officer/curriculum/student-carryover',
  },

  STUDENTS_RECORD: '/exam-officer/students-record',

  RESULT_MANAGEMENT: {
    ROOT:        '/exam-officer/result-management',
    UPLOAD_STATS:'/exam-officer/result-management/upload-stats',
    MODIFICATION:'/exam-officer/result-management/modification',
    SPREADSHEET: '/exam-officer/result-management/spreadsheet',
    TRANSCRIPT:  '/exam-officer/result-management/transcript',
  },

  LECTURER_MARKSHEETS: '/exam-officer/lecturer-marksheets',
  SETTINGS:            '/exam-officer/settings',
} as const;
