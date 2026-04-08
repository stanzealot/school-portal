import { memo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ErrorBoundary } from 'react-error-boundary';
import type { FallbackProps } from 'react-error-boundary';

import { StudentSidebar, StudentMobileSidebar, STUDENT_SIDEBAR_WIDTH } from './StudentSidebar';
import { StudentHeader, STUDENT_HEADER_HEIGHT_MOBILE, STUDENT_HEADER_HEIGHT_DESKTOP } from './StudentHeader';
import ErrorFallback from '@/components/shared/ErrorFallback';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.18 } },
};

const ErrorAdapter = (props: FallbackProps) => <ErrorFallback {...props} />;

export const StudentPortalLayout = memo(() => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#F6F7F9' }}>
      <StudentSidebar />
      <StudentMobileSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <style>{`
          .student-portal-header { left: 0 !important; }
          .student-main { padding-top: ${STUDENT_HEADER_HEIGHT_MOBILE + 24}px; }
          @media (min-width: 768px) {
            .student-area { margin-left: ${STUDENT_SIDEBAR_WIDTH}px; }
            .student-portal-header { left: ${STUDENT_SIDEBAR_WIDTH}px !important; height: ${STUDENT_HEADER_HEIGHT_DESKTOP}px !important; }
            .student-main { padding-top: ${STUDENT_HEADER_HEIGHT_DESKTOP + 24}px; }
          }
        `}</style>

        <div className="student-area flex flex-col min-h-screen">
          <StudentHeader />
          <main className="student-main flex-1 px-4 md:px-6 lg:px-8 pb-8">
            <ErrorBoundary FallbackComponent={ErrorAdapter}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full max-w-[1200px] mx-auto"
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </ErrorBoundary>
          </main>
        </div>
      </div>
    </div>
  );
});

StudentPortalLayout.displayName = 'StudentPortalLayout';
export default StudentPortalLayout;
