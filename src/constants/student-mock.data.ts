// ─── Student Profile ─────────────────────────────────────────────
export const MOCK_STUDENT = {
  fullName:      'Julius Adebo',
  programme:     'B.Sc. Computer Science',
  status:        'Active Student',
  matricNumber:  'CSC/2021/0458',
  faculty:       'Science and Technology',
  level:         '300 Level',
  semester:      'First Semester',
  email:         'j.adebo@student.edu',
  dateOfBirth:   '14th August, 2002',
  gender:        'Male',
  department:    'Computer Science',
  school:        'School of Engineering and Engineering Technology',
  stateOfOrigin: 'Kogi State',
  programme2:    'B.Eng. Computer Engineering',
  modeOfStudy:   'Full Time',
  avatar:        '/images/julius.jpg',
};

// ─── Announcements ───────────────────────────────────────────────
export const MOCK_ANNOUNCEMENTS = [
  {
    id: 1, day: '12', month: 'NOV',
    title:      'Hostel Balloting Opens for Returning Students',
    body:       'The portal for hostel balloting will be open for returning students. Ensure you have paid all outstanding school fees as it is a prerequisite for balloting. The balloting window will close exactly 48 hours after opening.',
    category:   'Important',
    department: 'Student Affairs Division',
    time:       '10:00 AM',
  },
  {
    id: 2, day: '08', month: 'NOV',
    title:      'Course Registration Deadline Extension',
    body:       'Please be informed that the deadline for normal course registration has been extended by one week. Late registration penalty applies after this new date. Please register now to avoid the extra charges.',
    category:   'Academic',
    department: 'Academic Planning Unit',
    time:       '08:30 AM',
  },
  {
    id: 3, day: '25', month: 'OCT',
    title:      'First Semester Resumption & Lectures',
    body:       'Welcome to the new academic session. Lectures commence immediately. Students are advised to be in their respective classes and ensure they sign the attendance registers.',
    category:   'General',
    department: 'Registry',
    time:       '09:00 AM',
  },
  {
    id: 4, day: '15', month: 'OCT',
    title:      'Matriculation Ceremony Date Announced',
    body:       'The matriculation ceremony for newly admitted students will hold at the university main auditorium. All freshmen are expected to have paid for and collected their academic gowns from their respective faculty offices.',
    category:   'Important',
    department: "Registrar's Office",
    time:       '02:15 PM',
  },
  {
    id: 5, day: '10', month: 'OCT',
    title:      'Payment Portal Maintenance Downtime',
    body:       'The university payment gateway will be undergoing scheduled maintenance this weekend. Students may experience difficulties making payments during this 12-hour window. Please plan accordingly.',
    category:   'General',
    department: 'ICT Directorate',
    time:       '11:00 AM',
  },
  {
    id: 6, day: '05', month: 'OCT',
    title:      'Library Hours Extended for Exam Period',
    body:       'The university library will be open until 10:00 PM during the examination period to provide students with more study time and access to learning resources.',
    category:   'General',
    department: 'Library Services',
    time:       '08:00 AM',
  },
  {
    id: 7, day: '01', month: 'OCT',
    title:      'Independence Day Celebration on Campus',
    body:       'Students and staff are invited to the Independence Day celebration on campus. There will be cultural displays, games, and refreshments. Attendance is encouraged.',
    category:   'General',
    department: 'Student Affairs Division',
    time:       '10:00 AM',
  },
];

// ─── Document types ──────────────────────────────────────────────
export type DocType =
  | 'new-student-screening'
  | 'admission-letter'
  | 'entrepreneurship-form'
  | 'screening-certificate'
  | 'id-card-form'
  | 'behavioral-form'
  | 'accommodation-slip'
  | 'exam-docket'
  | 'exit-form'
  | 'final-year-clearance';

export interface DocumentCard {
  type:        DocType;
  label:       string;
  description: string;
  iconColor:   string;
}

export const DOCUMENT_CARDS: DocumentCard[] = [
  { type: 'new-student-screening', label: 'New Student Screening Form',  description: 'Required for first-year clearance and physical registration process.',        iconColor: '#20A8D8' },
  { type: 'admission-letter',      label: 'Admission Letter',            description: 'Official document confirming your provisional admission.',                      iconColor: '#F86C6B' },
  { type: 'entrepreneurship-form', label: 'Entrepreneurship Form',       description: 'Registration form for the compulsory university skills program.',               iconColor: '#4DBD74' },
  { type: 'screening-certificate', label: 'Screening Certificate',       description: 'Official university proof of successful student admission screening.',          iconColor: '#272C33' },
  { type: 'id-card-form',          label: 'ID Card Form',                description: 'Submit your details to process your official university identity card.',        iconColor: '#F0AD4E' },
  { type: 'behavioral-form',       label: 'Behavioral Form',             description: 'Good conduct and non-cultism agreement form for all students.',                  iconColor: '#20A8D8' },
  { type: 'accommodation-slip',    label: 'Accommodation Slip',          description: 'Proof of successful hostel allocation and bed space assignment.',               iconColor: '#F86C6B' },
  { type: 'exam-docket',           label: 'Exam Docket',                 description: 'Compulsory pass required for entry into university examination halls.',         iconColor: '#4DBD74' },
  { type: 'exit-form',             label: 'Exit Form',                   description: 'Official form required when leaving the campus for breaks or holidays.',        iconColor: '#272C33' },
  { type: 'final-year-clearance',  label: 'Final Year Clearance Form',   description: 'Mandatory for graduating students before certificate collection.',              iconColor: '#F0AD4E' },
];

export const OTHER_DOCS_SIDEBAR: { label: string; type: DocType }[] = [
  { label: 'Admission Letter',          type: 'admission-letter'        },
  { label: 'Entrepreneurship Form',     type: 'entrepreneurship-form'   },
  { label: 'Screening Certificate',     type: 'screening-certificate'   },
  { label: 'ID Card Form',              type: 'id-card-form'            },
  { label: 'Behavioral Form',           type: 'behavioral-form'         },
  { label: 'Accommodation Slip',        type: 'accommodation-slip'      },
  { label: 'Exam Docket',              type: 'exam-docket'             },
  { label: 'Exit Form',                 type: 'exit-form'               },
  { label: 'Final Year Clearance Form', type: 'final-year-clearance'    },
];

// ─── Portal Instructions ─────────────────────────────────────────
export const PORTAL_INSTRUCTIONS = [
  { step: 1, text: 'Update your profile and biodata in the Settings menu.',                              bold: ''                },
  { step: 2, text: 'Proceed to Payments to clear all outstanding school fees.',                           bold: 'Payments'         },
  { step: 3, text: 'Register your courses for the current semester via Curriculum & Reg.',               bold: 'Curriculum & Reg' },
  { step: 4, text: 'Print your course forms and exam docket from the Documents section.',                bold: 'Documents'        },
];

// ─── Fee schedule for admission letter ───────────────────────────
export const FEE_SCHEDULE = [
  { sn:  1, description: 'Tuition Fee',            indigene: 72_025, nonIndegene: 87_025  },
  { sn:  2, description: 'Registration Fee',       indigene:  1_950, nonIndegene:  2_100  },
  { sn:  3, description: 'Departmental Fee',       indigene:    600, nonIndegene:    700  },
  { sn:  4, description: 'Caution',                indigene:  2_600, nonIndegene:  2_800  },
  { sn:  5, description: 'Sport',                  indigene:  2_360, nonIndegene:  3_000  },
  { sn:  6, description: 'Health Insurance',       indigene:    480, nonIndegene:    500  },
  { sn:  7, description: 'ID Card',                indigene:  1_920, nonIndegene:  2_100  },
  { sn:  8, description: 'Library Development',    indigene:  3_300, nonIndegene:  2_000  },
  { sn:  9, description: 'Examination',            indigene:  3_390, nonIndegene:  2_000  },
  { sn: 10, description: 'Student Handbook',       indigene:  2_600, nonIndegene:  2_800  },
  { sn: 11, description: 'Campus Maintenance',     indigene:  1_350, nonIndegene:  2_000  },
  { sn: 12, description: 'Matriculation',          indigene:  1_950, nonIndegene:  2_100  },
  { sn: 13, description: 'Screening',              indigene:    600, nonIndegene:    700  },
  { sn: 14, description: 'Medical Test',           indigene:    680, nonIndegene:    700  },
  { sn: 15, description: 'SUG Fees',               indigene:    680, nonIndegene:    700  },
  { sn: 16, description: 'Admission Letter',       indigene:  1_500, nonIndegene:  2_400  },
  { sn: 17, description: 'ICT Development',        indigene:  3_390, nonIndegene:  4_100  },
  { sn: 18, description: 'Stamp Duty',             indigene:     90, nonIndegene:    100  },
  { sn: 19, description: 'Result Verification',    indigene:  1_950, nonIndegene:  2_100  },
  { sn: 20, description: 'Convocation',            indigene:      0, nonIndegene:      0  },
  { sn: 21, description: 'Entrepreneurship',       indigene:  3_600, nonIndegene:  2_800  },
  { sn: 22, description: 'Laboratory / Studio Fee',indigene: 12_400, nonIndegene: 12_500  },
  { sn: 23, description: 'Insurance Fee',          indigene:  3_000, nonIndegene:  4_000  },
];
