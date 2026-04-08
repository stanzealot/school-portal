import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer } from 'lucide-react';
import { MOCK_PREVIOUS_COURSES, SIGNATURE_FIELDS } from '@/constants/course-reg-mock.data';
import { MOCK_STUDENT } from '@/constants/student-mock.data';
import { ROUTES } from '@/constants/routes.constants';

const PreviousRegPage = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const state     = (location.state as { semester?: string; session?: string }) ?? {};
  const semester  = state.semester ?? 'First';
  const session   = state.session  ?? '2023/2024';

  const totalUnits = MOCK_PREVIOUS_COURSES.reduce((s, c) => s + c.unit, 0);

  return (
    <div className="py-5">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-100 px-5 py-4 mb-5">
        <h1 className="text-xl font-bold text-gray-800">Previous Registration</h1>
        <p className="text-sm text-gray-400 mt-0.5">View courses registered in previous semesters.</p>
      </div>

      {/* Action bar */}
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={() => navigate(ROUTES.STUDENT.COURSE_REG)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={15} />
          Go Back
        </button>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-colors"
          style={{ backgroundColor: '#20A8D8' }}
        >
          <Printer size={15} />
          Print
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {/* Student Info */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex gap-4 items-start">
            <div className="w-20 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              <img
                src={MOCK_STUDENT.avatar}
                alt={MOCK_STUDENT.fullName}
                className="w-full h-full object-cover"
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3 flex-1">
              <InfoPair label="Student Full Name:" value={MOCK_STUDENT.fullName} />
              <InfoPair label="Matric Number"       value="2024/HND/NET/100"     />
              <InfoPair label="Level"               value="HND Year Two"         />
              <InfoPair label="Mode of Entry"       value="HND"                  />
              <InfoPair label="School"              value="School of Applied Science" />
              <InfoPair label="Department"          value={MOCK_STUDENT.department} />
            </div>
          </div>
        </div>

        {/* Course table */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-800 text-center">
              Registered Course in {semester === 'First' ? '1st' : '2nd'} Semester {session}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: '#1D3A4A' }}>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-white w-14">S/N</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-white w-36">Course Code</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-white">Course Title</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-white w-16">Unit</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-white w-16">Status</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_PREVIOUS_COURSES.map(course => (
                  <tr key={course.courseCode} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3 text-gray-500 text-sm">{course.sn}</td>
                    <td className="px-5 py-3 text-gray-700 text-sm font-medium">{course.courseCode}</td>
                    <td className="px-5 py-3 text-gray-700 text-sm">{course.courseTitle}</td>
                    <td className="px-5 py-3 text-gray-700 text-sm text-right">{course.unit}</td>
                    <td className="px-5 py-3 text-gray-700 text-sm text-right">{course.status}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50 border-t border-gray-200">
                  <td colSpan={3} className="px-5 py-3 text-sm font-semibold text-gray-700 text-right">
                    Total Number of Unit Registered
                  </td>
                  <td className="px-5 py-3 text-sm font-bold text-gray-800 text-right">{totalUnits}</td>
                  <td />
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Signatures */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="text-sm font-bold text-gray-800 mb-5">Signatures and Date</h2>
          <div className="flex flex-col gap-5">
            {SIGNATURE_FIELDS.map(field => (
              <div key={field} className="flex items-center gap-4 flex-wrap">
                <label className="text-sm text-gray-600 w-40 flex-shrink-0">{field}</label>
                <input readOnly className="flex-1 min-w-[140px] h-10 border border-gray-200 rounded-lg px-3 bg-gray-50 text-sm" />
                <label className="text-sm text-gray-600 w-10 flex-shrink-0">Date</label>
                <input readOnly className="flex-1 min-w-[140px] h-10 border border-gray-200 rounded-lg px-3 bg-gray-50 text-sm" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoPair = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-gray-400 mb-0.5">{label}</p>
    <p className="text-sm font-semibold text-gray-800">{value}</p>
  </div>
);

export default PreviousRegPage;
