import { memo, createContext, useContext, useState, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ErrorBoundary } from 'react-error-boundary';
import type { FallbackProps } from 'react-error-boundary';

import { ExamOfficerSidebar, ExamOfficerMobileSidebar, EXAM_SIDEBAR_WIDTH } from './ExamOfficerSidebar';
import { Header, HEADER_HEIGHT_DESKTOP, HEADER_HEIGHT_MOBILE } from './Header';
import ErrorFallback from '@/components/shared/ErrorFallback';
import { EXAM_OFFICER_ROUTES } from '@/constants/routes.constants';

// ── Context: child pages inject header actions ─────────────────
interface ExamHeaderCtx { setActions: (node: React.ReactNode) => void }
export const ExamHeaderContext = createContext<ExamHeaderCtx>({ setActions: () => {} });
export const useExamHeader = () => useContext(ExamHeaderContext);

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.18 } },
};
const ErrorAdapter = (props: FallbackProps) => <ErrorFallback {...props} />;

const HEADER_MAP: Record<string, { title: string; subtitle: string }> = {
  [EXAM_OFFICER_ROUTES.DASHBOARD]:                           { title: "Exam Officer's Portal",      subtitle: 'Manage all your academic operations efficiently'              },
  [EXAM_OFFICER_ROUTES.CURRICULUM.MANAGE]:                   { title: 'Curriculum',                 subtitle: 'Manage the academic curriculum structure, including courses, levels, and program requirements.' },
  [EXAM_OFFICER_ROUTES.CURRICULUM.STUDENT_COURSE_FORM]:      { title: 'Student Course Form',        subtitle: 'Manage student course registration and enrollment'            },
  [EXAM_OFFICER_ROUTES.CURRICULUM.STUDENT_CARRYOVER]:        { title: 'Student Carryover',          subtitle: 'Manage student carryover courses'                            },
  [EXAM_OFFICER_ROUTES.STUDENTS_RECORD]:                     { title: 'Students Record',            subtitle: 'View and manage all student records'                        },
  [EXAM_OFFICER_ROUTES.RESULT_MANAGEMENT.UPLOAD_STATS]:      { title: 'Result Upload Statistics',   subtitle: 'View result uploaded by lecturers in specific departments'   },
  [EXAM_OFFICER_ROUTES.RESULT_MANAGEMENT.MODIFICATION]:      { title: 'Result Modification',        subtitle: 'Exclusive to HOD – Release/Restrict student academic result'  },
  [EXAM_OFFICER_ROUTES.RESULT_MANAGEMENT.SPREADSHEET]:       { title: 'Generate Result Spreadsheet',subtitle: 'Manage and download student result in spreadsheet format'     },
  [EXAM_OFFICER_ROUTES.RESULT_MANAGEMENT.TRANSCRIPT]:        { title: 'Student Transcript',         subtitle: 'View and manage student academic records and transcripts'     },
  [EXAM_OFFICER_ROUTES.LECTURER_MARKSHEETS]:                 { title: 'Lecturer Marksheets',        subtitle: 'View and manage uploaded result and submissions'              },
  [EXAM_OFFICER_ROUTES.SETTINGS]:                            { title: 'Settings',                   subtitle: 'Manage your account settings and preferences'                },
};

export const ExamOfficerLayout = memo(() => {
  const location = useLocation();
  const { title, subtitle } = HEADER_MAP[location.pathname] ?? { title: "Exam Officer's Portal", subtitle: '' };
  const [headerActions, setHeaderActions] = useState<React.ReactNode>(null);
  const setActions = useCallback((node: React.ReactNode) => setHeaderActions(node), []);

  return (
    <ExamHeaderContext.Provider value={{ setActions }}>
      <div className="min-h-screen bg-gray-50 flex">
        <ExamOfficerSidebar />
        <ExamOfficerMobileSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <style>{`
            .exam-main { padding-top: ${HEADER_HEIGHT_MOBILE + 32}px; }
            @media (min-width: 768px) {
              .exam-area  { margin-left: ${EXAM_SIDEBAR_WIDTH}px; }
              .dashboard-header { left: ${EXAM_SIDEBAR_WIDTH}px !important; }
              .exam-main  { padding-top: ${HEADER_HEIGHT_DESKTOP + 32}px; }
            }
          `}</style>
          <div className="exam-area flex flex-col min-h-screen">
            <Header title={title} subtitle={subtitle} actions={headerActions} />
            <main className="exam-main flex-1 px-4 md:px-6 lg:px-8 py-6">
              <ErrorBoundary FallbackComponent={ErrorAdapter}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={location.pathname}
                    variants={pageVariants} initial="initial" animate="animate" exit="exit"
                    className="w-full max-w-[1100px] mx-auto"
                  >
                    <Outlet />
                  </motion.div>
                </AnimatePresence>
              </ErrorBoundary>
            </main>
          </div>
        </div>
      </div>
    </ExamHeaderContext.Provider>
  );
});
ExamOfficerLayout.displayName = 'ExamOfficerLayout';
export default ExamOfficerLayout;
