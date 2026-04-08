import {
  LayoutDashboard,
  BookOpenCheck,
  Users,
  BarChart3,
  FileSpreadsheet,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { EXAM_OFFICER_ROUTES } from './routes.constants';

// Each top-level item; children = collapsible sub-items
export interface ExamNavItem {
  label: string;
  path?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children?: { label: string; path: string }[];
}

export const EXAM_OFFICER_NAV: ExamNavItem[] = [
  {
    label: 'Home',
    path:  EXAM_OFFICER_ROUTES.DASHBOARD,
    icon:  LayoutDashboard,
  },
  {
    label: 'Curriculum',
    icon:  BookOpenCheck,
    children: [
      { label: 'Manage curriculum',   path: EXAM_OFFICER_ROUTES.CURRICULUM.MANAGE              },
      { label: 'Student course form', path: EXAM_OFFICER_ROUTES.CURRICULUM.STUDENT_COURSE_FORM },
      { label: 'Student carryover',   path: EXAM_OFFICER_ROUTES.CURRICULUM.STUDENT_CARRYOVER   },
    ],
  },
  {
    label: 'Students Record',
    path:  EXAM_OFFICER_ROUTES.STUDENTS_RECORD,
    icon:  Users,
  },
  {
    label: 'Result Management',
    icon:  BarChart3,
    children: [
      { label: 'Upload Statistics',       path: EXAM_OFFICER_ROUTES.RESULT_MANAGEMENT.UPLOAD_STATS  },
      { label: 'Result Modification',     path: EXAM_OFFICER_ROUTES.RESULT_MANAGEMENT.MODIFICATION  },
      { label: 'Result Spreadsheet',      path: EXAM_OFFICER_ROUTES.RESULT_MANAGEMENT.SPREADSHEET   },
      { label: 'Student Transcript',      path: EXAM_OFFICER_ROUTES.RESULT_MANAGEMENT.TRANSCRIPT    },
    ],
  },
  {
    label: 'Lecturer Marksheets',
    path:  EXAM_OFFICER_ROUTES.LECTURER_MARKSHEETS,
    icon:  FileSpreadsheet,
  },
  {
    label: 'Settings',
    path:  EXAM_OFFICER_ROUTES.SETTINGS,
    icon:  Settings,
  },
];

export const EXAM_OFFICER_SUPPORT: ExamNavItem = {
  label: 'Support',
  path:  '#',
  icon:  HelpCircle,
};
