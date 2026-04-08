import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowUpRight, TrendingUp, ClipboardList, Database,
  PenLine, LayoutGrid, BookmarkCheck, Users, BookOpen, Lock,
} from 'lucide-react';
import { EXAM_OFFICER_ROUTES } from '@/constants/routes.constants';

interface PortalCard {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  iconBg: string;
  iconColor: string;
  path: string;
}

const PORTAL_CARDS: PortalCard[] = [
  { title: 'Result Upload Statistics',    description: 'View result uploaded by lecturers in specific departments',      icon: TrendingUp,    iconBg: '#EBF8FD', iconColor: '#20A8D8', path: EXAM_OFFICER_ROUTES.RESULT_MANAGEMENT.UPLOAD_STATS   },
  { title: 'Student Course Form',         description: 'Manage student course registration and enrollment',               icon: ClipboardList, iconBg: '#FFF8E7', iconColor: '#F0AD4E', path: EXAM_OFFICER_ROUTES.CURRICULUM.STUDENT_COURSE_FORM   },
  { title: 'Lecturer Marksheet',          description: 'View and manage uploaded result and submissions',                 icon: Database,      iconBg: '#EAFAF1', iconColor: '#4DBD74', path: EXAM_OFFICER_ROUTES.LECTURER_MARKSHEETS               },
  { title: 'Result Modification',         description: 'Exclusive to HOD - Release/Restrict student academic result',    icon: PenLine,       iconBg: '#FFF0F0', iconColor: '#F86C6B', path: EXAM_OFFICER_ROUTES.RESULT_MANAGEMENT.MODIFICATION    },
  { title: 'Generate Result Spreadsheet', description: 'Manage and download student result in spreadsheet format',       icon: LayoutGrid,    iconBg: '#F4F4F5', iconColor: '#6B7280', path: EXAM_OFFICER_ROUTES.RESULT_MANAGEMENT.SPREADSHEET     },
  { title: 'Student Transcript',          description: 'View and manage student academic records and transcripts',        icon: BookmarkCheck, iconBg: '#EBF8FD', iconColor: '#20A8D8', path: EXAM_OFFICER_ROUTES.RESULT_MANAGEMENT.TRANSCRIPT      },
  { title: 'Student List',               description: 'View, manage and download registered students',                   icon: Users,         iconBg: '#FFF8E7', iconColor: '#F0AD4E', path: EXAM_OFFICER_ROUTES.STUDENTS_RECORD                   },
  { title: 'Manage Course Curriculum',   description: 'Maintain and manage the curriculum for your department.',         icon: BookOpen,      iconBg: '#EAFAF1', iconColor: '#4DBD74', path: EXAM_OFFICER_ROUTES.CURRICULUM.MANAGE                 },
  { title: 'Blacklist Student',          description: "Restrict a student's access to the portal",                       icon: Lock,          iconBg: '#FFF0F0', iconColor: '#F86C6B', path: EXAM_OFFICER_ROUTES.STUDENTS_RECORD                   },
];

const ExamDashboardPage = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      {PORTAL_CARDS.map((card, i) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: i * 0.05 }}
          onClick={() => navigate(card.path)}
          className="group relative bg-white rounded-xl border border-gray-100 p-6 cursor-pointer hover:shadow-md hover:border-gray-200 transition-all duration-200"
        >
          <ArrowUpRight size={16} className="absolute top-4 right-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
          <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: card.iconBg }}>
            <card.icon size={22} style={{ color: card.iconColor }} />
          </div>
          <h3 className="font-bold text-base text-gray-800 mb-2 leading-snug">{card.title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed">{card.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default ExamDashboardPage;
