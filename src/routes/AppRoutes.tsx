import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { AnimatePresence } from 'framer-motion';
import type { FallbackProps } from 'react-error-boundary';

import PrivateRoute   from './PrivateRoute';
import PublicRoute    from './PublicRoute';
import SuspenseLoader from '@/components/shared/SuspenseLoader';
import ErrorFallback  from '@/components/shared/ErrorFallback';
import { ROUTES, EXAM_OFFICER_ROUTES } from '@/constants/routes.constants';

// ── Public ───────────────────────────────────────────────────────
const HomePage  = lazy(() => import('@/pages/home/HomePage'));
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));

// ── Lecturer portal ──────────────────────────────────────────────
const DashboardLayout   = lazy(() => import('@/components/layout/DashboardLayout'));
const DashboardPage     = lazy(() => import('@/pages/lecturer/dashboard/DashboardPage'));
const CourseAllocation  = lazy(() => import('@/pages/lecturer/course-allocation/CourseAllocationPage'));
const ExamAttendance    = lazy(() => import('@/pages/lecturer/exam-attendance/ExamAttendancePage'));
const UploadResult      = lazy(() => import('@/pages/lecturer/upload-result/UploadResultPage'));
const ViewResults       = lazy(() => import('@/pages/lecturer/view-results/ViewResultsPage'));
const AcademicCalendar  = lazy(() => import('@/pages/lecturer/academic-calendar/AcademicCalendarPage'));
const LecturerSettings  = lazy(() => import('@/pages/lecturer/settings/SettingsPage'));

// ── Exam Officer portal ──────────────────────────────────────────
const ExamOfficerLayout      = lazy(() => import('@/components/layout/ExamOfficerLayout'));
const ExamDashboardPage      = lazy(() => import('@/pages/exam-officer/dashboard/ExamDashboardPage'));
const ManageCurriculumPage   = lazy(() => import('@/pages/exam-officer/curriculum/manage/ManageCurriculumPage'));
const StudentCourseFormPage  = lazy(() => import('@/pages/exam-officer/curriculum/student-course-form/StudentCourseFormPage'));
const StudentCarryoverPage   = lazy(() => import('@/pages/exam-officer/curriculum/student-carryover/StudentCarryoverPage'));
const StudentsRecordPage     = lazy(() => import('@/pages/exam-officer/students-record/StudentsRecordPage'));
const UploadStatsPage        = lazy(() => import('@/pages/exam-officer/result-management/upload-stats/UploadStatsPage'));
const ResultModificationPage = lazy(() => import('@/pages/exam-officer/result-management/modification/ResultModificationPage'));
const ResultSpreadsheetPage  = lazy(() => import('@/pages/exam-officer/result-management/spreadsheet/ResultSpreadsheetPage'));
const StudentTranscriptPage  = lazy(() => import('@/pages/exam-officer/result-management/transcript/StudentTranscriptPage'));
const LecturerMarksheetsPage = lazy(() => import('@/pages/exam-officer/lecturer-marksheets/LecturerMarksheetsPage'));
const ExamSettingsPage       = lazy(() => import('@/pages/exam-officer/settings/ExamSettingsPage'));

// ── Student portal ───────────────────────────────────────────────
const StudentPortalLayout  = lazy(() => import('@/components/layout/StudentPortalLayout'));
const StudentHomePage      = lazy(() => import('@/pages/student/home/StudentHomePage'));
const DocumentsPage        = lazy(() => import('@/pages/student/documents/DocumentsPage'));
const DocumentViewPage     = lazy(() => import('@/pages/student/documents/DocumentViewPage'));
const AllAnnouncementsPage = lazy(() => import('@/pages/student/announcements/AllAnnouncementsPage'));
const CourseRegPage        = lazy(() => import('@/pages/student/course-reg/CourseRegPage'));
const PreviousRegPage      = lazy(() => import('@/pages/student/course-reg/PreviousRegPage'));
const HostelPage           = lazy(() => import('@/pages/student/hostel/HostelPage'));
const AccommodationPaymentPage = lazy(() => import('@/pages/student/hostel/AccommodationPaymentPage'));
const PaymentsPage         = lazy(() => import('@/pages/student/payments/PaymentsPage'));
const SchoolFeesPaymentPage = lazy(() => import('@/pages/student/payments/SchoolFeesPaymentPage'));
const ResultsPage          = lazy(() => import('@/pages/student/PlaceholderPages').then(m => ({ default: m.ResultsPage })));
const CalendarPage         = lazy(() => import('@/pages/student/PlaceholderPages').then(m => ({ default: m.CalendarPage })));
const TimetablePage        = lazy(() => import('@/pages/student/PlaceholderPages').then(m => ({ default: m.TimetablePage })));
const StudentSettingsPage  = lazy(() => import('@/pages/student/PlaceholderPages').then(m => ({ default: m.StudentSettingsPage })));

// ── 404 ──────────────────────────────────────────────────────────
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const ErrorAdapter = (props: FallbackProps) => <ErrorFallback {...props} />;

const AppRoutes = () => (
  <ErrorBoundary FallbackComponent={ErrorAdapter}>
    <Suspense fallback={<SuspenseLoader />}>
      <AnimatePresence mode="wait">
        <Routes>
          {/* ── Public ── */}
          <Route path={ROUTES.HOME}  element={<PublicRoute><HomePage /></PublicRoute>} />
          <Route path={ROUTES.LOGIN} element={<PublicRoute><LoginPage /></PublicRoute>} />

          {/* ── Lecturer portal ── */}
          <Route path="/lecturer" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
            <Route index element={<Navigate to={ROUTES.LECTURER.DASHBOARD} replace />} />
            <Route path="dashboard"         element={<DashboardPage />} />
            <Route path="course-allocation" element={<CourseAllocation />} />
            <Route path="exam-attendance"   element={<ExamAttendance />} />
            <Route path="upload-result"     element={<UploadResult />} />
            <Route path="view-results"      element={<ViewResults />} />
            <Route path="academic-calendar" element={<AcademicCalendar />} />
            <Route path="settings"          element={<LecturerSettings />} />
          </Route>

          {/* ── Exam Officer portal ── */}
          <Route path="/exam-officer" element={<PrivateRoute><ExamOfficerLayout /></PrivateRoute>}>
            <Route index element={<Navigate to={EXAM_OFFICER_ROUTES.DASHBOARD} replace />} />
            <Route path="dashboard" element={<ExamDashboardPage />} />
            <Route path="curriculum">
              <Route index element={<Navigate to={EXAM_OFFICER_ROUTES.CURRICULUM.MANAGE} replace />} />
              <Route path="manage"              element={<ManageCurriculumPage />} />
              <Route path="student-course-form" element={<StudentCourseFormPage />} />
              <Route path="student-carryover"   element={<StudentCarryoverPage />} />
            </Route>
            <Route path="students-record" element={<StudentsRecordPage />} />
            <Route path="result-management">
              <Route index element={<Navigate to={EXAM_OFFICER_ROUTES.RESULT_MANAGEMENT.UPLOAD_STATS} replace />} />
              <Route path="upload-stats" element={<UploadStatsPage />} />
              <Route path="modification" element={<ResultModificationPage />} />
              <Route path="spreadsheet"  element={<ResultSpreadsheetPage />} />
              <Route path="transcript"   element={<StudentTranscriptPage />} />
            </Route>
            <Route path="lecturer-marksheets" element={<LecturerMarksheetsPage />} />
            <Route path="settings"            element={<ExamSettingsPage />} />
          </Route>

          {/* ── Student portal ── */}
          <Route path="/student" element={<PrivateRoute><StudentPortalLayout /></PrivateRoute>}>
            <Route index element={<Navigate to={ROUTES.STUDENT.HOME} replace />} />
            <Route path="home"               element={<StudentHomePage />} />
            <Route path="documents"          element={<DocumentsPage />} />
            <Route path="documents/:docType" element={<DocumentViewPage />} />
            <Route path="announcements"      element={<AllAnnouncementsPage />} />
            <Route path="course-reg"         element={<CourseRegPage />} />
            <Route path="course-reg/previous" element={<PreviousRegPage />} />
            <Route path="hostel"             element={<HostelPage />} />
            <Route path="hostel/payment"     element={<AccommodationPaymentPage />} />
            <Route path="payments"           element={<PaymentsPage />} />
            <Route path="payments/school-fees"  element={<SchoolFeesPaymentPage />} />
            <Route path="payments/departmental" element={<SchoolFeesPaymentPage />} />
            <Route path="payments/other"        element={<SchoolFeesPaymentPage />} />
            <Route path="results"            element={<ResultsPage />} />
            <Route path="calendar"           element={<CalendarPage />} />
            <Route path="timetable"          element={<TimetablePage />} />
            <Route path="settings"           element={<StudentSettingsPage />} />
          </Route>

          {/* ── 404 ── */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  </ErrorBoundary>
);

export default AppRoutes;
