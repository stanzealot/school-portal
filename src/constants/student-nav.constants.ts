import {
  Home,
  FileText,
  BookOpen,
  BedDouble,
  CreditCard,
  BarChart2,
  CalendarDays,
  Clock,
  Settings,
} from 'lucide-react';
import { ROUTES } from './routes.constants';
import type { NavItem } from '@/types';

export const STUDENT_NAV_ITEMS: NavItem[] = [
  { label: 'Home',                 path: ROUTES.STUDENT.HOME,      icon: Home         },
  { label: 'Documents',            path: ROUTES.STUDENT.DOCUMENTS, icon: FileText     },
  { label: 'Course Reg & Olevel',  path: ROUTES.STUDENT.COURSE_REG,icon: BookOpen     },
  { label: 'Hostel Accommodation', path: ROUTES.STUDENT.HOSTEL,    icon: BedDouble    },
  { label: 'Payments',             path: ROUTES.STUDENT.PAYMENTS,  icon: CreditCard   },
  { label: 'My Results',           path: ROUTES.STUDENT.RESULTS,   icon: BarChart2    },
  { label: 'Academic Calendar',    path: ROUTES.STUDENT.CALENDAR,  icon: CalendarDays },
  { label: 'Time Table',           path: ROUTES.STUDENT.TIMETABLE, icon: Clock        },
  { label: 'Settings',             path: ROUTES.STUDENT.SETTINGS,  icon: Settings     },
];
