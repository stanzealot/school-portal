import { Construction } from 'lucide-react';

const PlaceholderPage = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="py-10 flex flex-col items-center justify-center text-center min-h-[50vh]">
    <div className="w-16 h-16 rounded-2xl bg-[#20A8D8]/10 flex items-center justify-center mb-5">
      <Construction size={28} className="text-[#20A8D8]" />
    </div>
    <h1 className="text-xl font-bold text-gray-800 mb-2">{title}</h1>
    <p className="text-sm text-gray-400 max-w-xs">{subtitle ?? 'This section is under construction and will be available soon.'}</p>
  </div>
);

export const CourseRegPage       = () => <PlaceholderPage title="Course Reg & O'Level"   subtitle="Register your courses and manage O'Level records here." />;
export const HostelPage          = () => <PlaceholderPage title="Hostel Accommodation"   subtitle="View your hostel allocation and ballot for a room." />;
export const PaymentsPage        = () => <PlaceholderPage title="Payments"               subtitle="Pay school fees and view payment history." />;
export const ResultsPage         = () => <PlaceholderPage title="My Results"             subtitle="View your semester and cumulative results." />;
export const CalendarPage        = () => <PlaceholderPage title="Academic Calendar"      subtitle="View important dates for this academic session." />;
export const TimetablePage       = () => <PlaceholderPage title="Time Table"             subtitle="Your class and examination timetable." />;
export const StudentSettingsPage = () => <PlaceholderPage title="Settings"               subtitle="Update your profile, password, and preferences." />;

export default PlaceholderPage;
