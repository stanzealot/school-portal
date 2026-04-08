import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, RotateCcw, Printer, Filter, ChevronDown, Search, ArrowLeft, X, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import RightDrawer from '@/components/ui/RightDrawer';
import {
  MOCK_REGISTERED_COURSES, MOCK_AVAILABLE_COURSES,
  SESSIONS, SEMESTERS, LEVELS, SIGNATURE_FIELDS,
  MOCK_OLEVEL_RESULTS, OLEVEL_SUBJECTS, OLEVEL_GRADES,
  EXAM_TYPES, SITTINGS, type OLevelResult,
} from '@/constants/course-reg-mock.data';
import { MOCK_STUDENT } from '@/constants/student-mock.data';
import { ROUTES } from '@/constants/routes.constants';
import { cn } from '@/utils';

// ─── Tab toggle ─────────────────────────────────────────────────
type Tab = 'course' | 'olevel';

// ─── Zod schemas ─────────────────────────────────────────────────
const step1Schema = z.object({
  session:  z.string().min(1, 'Session is required'),
  semester: z.string().min(1, 'Semester is required'),
  level:    z.string().min(1, 'Level is required'),
});
type Step1Data = z.infer<typeof step1Schema>;

const olevelExamSchema = z.object({
  examNo:   z.string().min(1, 'Exam number is required'),
  examYear: z.string().min(4, 'Exam year is required'),
  examType: z.string().min(1, 'Exam type is required'),
  sitting:  z.string().min(1, 'Sitting is required'),
});
type OLevelExamData = z.infer<typeof olevelExamSchema>;

const addOLevelSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  grade:   z.string().min(1, 'Grade is required'),
});
type AddOLevelData = z.infer<typeof addOLevelSchema>;

const prevRegSchema = z.object({
  semester: z.string().min(1, 'Please select a semester'),
  session:  z.string().min(1, 'Please select a session'),
});
type PrevRegData = z.infer<typeof prevRegSchema>;

// ─── Main page ───────────────────────────────────────────────────
const CourseRegPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('course');

  // Drawer states
  const [newRegOpen,  setNewRegOpen]  = useState(false);
  const [editRegOpen, setEditRegOpen] = useState(false);
  const [prevRegOpen, setPrevRegOpen] = useState(false);

  return (
    <div className="py-5">
      {/* Page header with tab toggle */}
      <div className="bg-white rounded-xl border border-gray-100 px-5 py-4 mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Course Registration</h1>
          <p className="text-sm text-gray-400 mt-0.5">Register and manage your courses for the semester.</p>
        </div>
        {/* Tab toggle */}
        <div className="flex rounded-lg border border-gray-200 overflow-hidden flex-shrink-0">
          <button
            onClick={() => setTab('course')}
            className={cn(
              'px-5 py-2 text-sm font-semibold transition-colors',
              tab === 'course' ? 'bg-[#20A8D8] text-white' : 'bg-white text-gray-500 hover:bg-gray-50'
            )}
          >
            Course registration
          </button>
          <button
            onClick={() => setTab('olevel')}
            className={cn(
              'px-5 py-2 text-sm font-semibold transition-colors',
              tab === 'olevel' ? 'bg-[#20A8D8] text-white' : 'bg-white text-gray-500 hover:bg-gray-50'
            )}
          >
            Olevel
          </button>
        </div>
      </div>

      {tab === 'course'
        ? <CourseTab
            onNewReg={() => setNewRegOpen(true)}
            onPrevReg={() => setPrevRegOpen(true)}
            onEditReg={() => setEditRegOpen(true)}
          />
        : <OLevelTab />
      }

      {/* New Course Registration Drawer */}
      <NewCourseRegDrawer isOpen={newRegOpen} onClose={() => setNewRegOpen(false)} />

      {/* Edit Registration Drawer */}
      <EditCourseRegDrawer isOpen={editRegOpen} onClose={() => setEditRegOpen(false)} />

      {/* Previous Registration Modal */}
      <PrevRegModal
        isOpen={prevRegOpen}
        onClose={() => setPrevRegOpen(false)}
        onView={(data) => {
          setPrevRegOpen(false);
          navigate(ROUTES.STUDENT.COURSE_REG_PREVIOUS, { state: data });
        }}
      />
    </div>
  );
};

// ─── Course Tab ──────────────────────────────────────────────────
const CourseTab = ({
  onNewReg, onPrevReg, onEditReg,
}: { onNewReg: () => void; onPrevReg: () => void; onEditReg: () => void }) => {
  const [filterSemester, setFilterSemester] = useState('1st Semester');
  const [showFilter, setShowFilter] = useState(false);

  const totalUnits = MOCK_REGISTERED_COURSES.reduce((s, c) => s + c.unit, 0);

  return (
    <div className="flex flex-col gap-5">
      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-100 px-5 py-4">
        <h2 className="text-sm font-bold text-gray-700 mb-3">Quick Actions</h2>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onNewReg}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-semibold transition-colors hover:opacity-90"
            style={{ backgroundColor: '#20A8D8' }}
          >
            <Plus size={15} />
            New Course Registration.
          </button>
          <button
            onClick={onPrevReg}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <RotateCcw size={15} className="text-[#20A8D8]" />
            Previous Registration
          </button>
          <button
            onClick={() => window.print()}
            className="ml-auto flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Printer size={15} />
            Print
          </button>
        </div>
      </div>

      {/* Student Info Card */}
      <StudentInfoCard />

      {/* Registered Courses Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-wrap gap-3">
          <h2 className="text-sm font-bold text-gray-800">
            Registered Course in 1st Semester 2024/2025
          </h2>
          <div className="flex items-center gap-3">
            {/* Filter */}
            <div className="relative">
              <button
                onClick={() => setShowFilter(v => !v)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Filter size={13} />
                Filter By
                <span className="font-semibold text-gray-800">{filterSemester}</span>
                <ChevronDown size={13} className={cn('transition-transform', showFilter && 'rotate-180')} />
              </button>
              {showFilter && (
                <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-20">
                  {['1st Semester', '2nd Semester'].map(s => (
                    <button key={s} onClick={() => { setFilterSemester(s); setShowFilter(false); }}
                      className={cn('w-full text-left px-4 py-2 text-sm transition-colors',
                        filterSemester === s ? 'text-[#20A8D8] font-semibold bg-[#20A8D8]/5' : 'text-gray-600 hover:bg-gray-50'
                      )}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Edit */}
            <button
              onClick={onEditReg}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-white text-xs font-semibold transition-colors hover:opacity-90"
              style={{ backgroundColor: '#20A8D8' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit Registration
            </button>
          </div>
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
              {MOCK_REGISTERED_COURSES.map((course, idx) => (
                <tr key={course.courseCode}
                  className={cn('border-b border-gray-50 hover:bg-gray-50/50 transition-colors',
                    idx % 2 === 1 && 'bg-gray-50/30'
                  )}>
                  <td className="px-5 py-3 text-gray-500 text-sm">{course.sn}</td>
                  <td className="px-5 py-3 text-gray-700 text-sm font-medium">{course.courseCode}</td>
                  <td className="px-5 py-3 text-gray-700 text-sm">{course.courseTitle}</td>
                  <td className="px-5 py-3 text-gray-700 text-sm text-right">{course.unit}</td>
                  <td className="px-5 py-3 text-gray-700 text-sm text-right">{course.status}</td>
                </tr>
              ))}
              {/* Total row */}
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

      {/* Signatures and Date */}
      <SignaturesCard />
    </div>
  );
};

// ─── Student info card ───────────────────────────────────────────
const StudentInfoCard = () => (
  <div className="bg-white rounded-xl border border-gray-100 p-5">
    <div className="flex gap-4 items-start">
      <div className="w-20 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
        <img src={MOCK_STUDENT.avatar} alt={MOCK_STUDENT.fullName}
          className="w-full h-full object-cover"
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
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
);

const InfoPair = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-gray-400 mb-0.5">{label}</p>
    <p className="text-sm font-semibold text-gray-800">{value}</p>
  </div>
);

// ─── Signatures card ─────────────────────────────────────────────
const SignaturesCard = () => (
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
);

// ─── New Course Registration Drawer ─────────────────────────────
const NewCourseRegDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: { session: '2024/2025', semester: 'First', level: 'HND' },
  });

  const filtered = useMemo(() =>
    MOCK_AVAILABLE_COURSES.filter(c =>
      c.courseTitle.toLowerCase().includes(search.toLowerCase()) ||
      c.courseCode.toLowerCase().includes(search.toLowerCase())
    ), [search]);

  const handleClose = () => {
    setStep(1); setSelected(new Set()); setSearch(''); reset();
    onClose();
  };

  const onStep1Submit = (data: Step1Data) => {
    setStep1Data(data);
    setStep(2);
  };

  const toggleCourse = (code: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(code) ? next.delete(code) : next.add(code);
      return next;
    });
  };

  const handleSubmitReg = () => {
    // In real app: API call
    handleClose();
  };

  return (
    <RightDrawer isOpen={isOpen} onClose={handleClose} width={560} hideCloseButton>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100 flex-shrink-0">
          <button onClick={step === 2 ? () => setStep(1) : handleClose}
            className="mb-4 p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-800">New Course Registration</h2>
              <p className="text-sm text-gray-400 mt-0.5">Register courses in line with your academic programme.</p>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-sm text-gray-500 font-medium">Step: {step}/2</span>
              <div className="flex gap-1">
                <div className="w-6 h-1.5 rounded-full bg-[#20A8D8]" />
                <div className={cn('w-6 h-1.5 rounded-full transition-colors', step === 2 ? 'bg-[#20A8D8]' : 'bg-gray-200')} />
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {step === 1 ? (
            <form id="step1-form" onSubmit={handleSubmit(onStep1Submit)} className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <SelectField label="Session" error={errors.session?.message}
                  registration={register('session')} options={SESSIONS} />
                <SelectField label="Semester" error={errors.semester?.message}
                  registration={register('semester')} options={SEMESTERS} />
              </div>
              <SelectField label="Level" error={errors.level?.message}
                registration={register('level')} options={LEVELS} />
            </form>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Info banner */}
              <div className="rounded-lg px-4 py-3 text-white text-xs font-medium" style={{ backgroundColor: '#1D3A4A' }}>
                List of Courses in the Department of Computer Science {step1Data?.semester} semester {step1Data?.session} Academic Session
              </div>
              {/* Search */}
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search a course"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#20A8D8] focus:ring-2 focus:ring-[#20A8D8]/20"
                />
              </div>
              {/* Course list */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="w-10 px-3 py-3">
                        <input type="checkbox"
                          checked={selected.size === filtered.length && filtered.length > 0}
                          onChange={e => setSelected(e.target.checked ? new Set(filtered.map(c => c.courseCode)) : new Set())}
                          className="w-4 h-4 rounded accent-[#20A8D8]" />
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600">Course Code</th>
                      <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600">Course Title</th>
                      <th className="px-3 py-3 text-right text-xs font-semibold text-gray-600">Unit</th>
                      <th className="px-3 py-3 text-right text-xs font-semibold text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(course => (
                      <tr key={course.courseCode}
                        onClick={() => toggleCourse(course.courseCode)}
                        className="border-b border-gray-50 hover:bg-gray-50/60 cursor-pointer transition-colors">
                        <td className="px-3 py-3">
                          <div className={cn(
                            'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
                            selected.has(course.courseCode) ? 'bg-[#20A8D8] border-[#20A8D8]' : 'border-gray-300'
                          )}>
                            {selected.has(course.courseCode) && <Check size={12} className="text-white" strokeWidth={3} />}
                          </div>
                        </td>
                        <td className="px-3 py-3 text-gray-700 font-medium text-sm">{course.courseCode}</td>
                        <td className="px-3 py-3 text-gray-700 text-sm">{course.courseTitle}</td>
                        <td className="px-3 py-3 text-gray-600 text-sm text-right">{course.unit}</td>
                        <td className="px-3 py-3 text-gray-600 text-sm text-right">{course.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3 flex-shrink-0">
          <button onClick={handleClose}
            className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          {step === 1 ? (
            <button form="step1-form" type="submit"
              className="flex-1 py-2.5 rounded-lg text-white text-sm font-semibold transition-colors hover:opacity-90"
              style={{ backgroundColor: '#20A8D8' }}>
              Proceed
            </button>
          ) : (
            <button onClick={handleSubmitReg} disabled={selected.size === 0}
              className={cn(
                'flex-1 py-2.5 rounded-lg text-white text-sm font-semibold transition-colors',
                selected.size === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:opacity-90'
              )}
              style={{ backgroundColor: '#20A8D8' }}>
              Submit Course Registration
            </button>
          )}
        </div>
      </div>
    </RightDrawer>
  );
};

// ─── Edit Course Registration Drawer ────────────────────────────
const EditCourseRegDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(MOCK_REGISTERED_COURSES.map(c => c.courseCode))
  );
  const [search, setSearch] = useState('');

  const filtered = useMemo(() =>
    MOCK_AVAILABLE_COURSES.filter(c =>
      c.courseTitle.toLowerCase().includes(search.toLowerCase()) ||
      c.courseCode.toLowerCase().includes(search.toLowerCase())
    ), [search]);

  const toggleCourse = (code: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(code) ? next.delete(code) : next.add(code);
      return next;
    });
  };

  return (
    <RightDrawer isOpen={isOpen} onClose={onClose} width={560} hideCloseButton>
      <div className="flex flex-col h-full">
        <div className="px-6 pt-6 pb-4 border-b border-gray-100 flex-shrink-0">
          <button onClick={onClose} className="mb-4 p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
            <ArrowLeft size={18} />
          </button>
          <h2 className="text-lg font-bold text-gray-800">Edit Courses</h2>
          <p className="text-sm text-gray-400 mt-0.5">Register courses in line with your academic programme.</p>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="flex flex-col gap-4">
            <div className="rounded-lg px-4 py-3 text-white text-xs font-medium" style={{ backgroundColor: '#1D3A4A' }}>
              List of Courses in the Department of Computer Science 1st semester 2025/2026 Academic Session
            </div>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search a course" value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#20A8D8] focus:ring-2 focus:ring-[#20A8D8]/20" />
            </div>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="w-10 px-3 py-3">
                      <input type="checkbox"
                        checked={selected.size === filtered.length && filtered.length > 0}
                        onChange={e => setSelected(e.target.checked ? new Set(filtered.map(c => c.courseCode)) : new Set())}
                        className="w-4 h-4 rounded accent-[#20A8D8]" />
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600">Course Code</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600">Course Title</th>
                    <th className="px-3 py-3 text-right text-xs font-semibold text-gray-600">Unit</th>
                    <th className="px-3 py-3 text-right text-xs font-semibold text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(course => (
                    <tr key={course.courseCode}
                      onClick={() => toggleCourse(course.courseCode)}
                      className="border-b border-gray-50 hover:bg-gray-50/60 cursor-pointer transition-colors">
                      <td className="px-3 py-3">
                        <div className={cn(
                          'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
                          selected.has(course.courseCode) ? 'bg-[#20A8D8] border-[#20A8D8]' : 'border-gray-300'
                        )}>
                          {selected.has(course.courseCode) && <Check size={12} className="text-white" strokeWidth={3} />}
                        </div>
                      </td>
                      <td className="px-3 py-3 text-gray-700 font-medium text-sm">{course.courseCode}</td>
                      <td className="px-3 py-3 text-gray-700 text-sm">{course.courseTitle}</td>
                      <td className="px-3 py-3 text-gray-600 text-sm text-right">{course.unit}</td>
                      <td className="px-3 py-3 text-gray-600 text-sm text-right">{course.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex gap-3 flex-shrink-0">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={onClose} disabled={selected.size === 0}
            className={cn('flex-1 py-2.5 rounded-lg text-white text-sm font-semibold transition-colors',
              selected.size === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:opacity-90'
            )}
            style={{ backgroundColor: '#20A8D8' }}>
            Submit Course Registration
          </button>
        </div>
      </div>
    </RightDrawer>
  );
};

// ─── Previous Registration Modal ─────────────────────────────────
const PrevRegModal = ({
  isOpen, onClose, onView,
}: { isOpen: boolean; onClose: () => void; onView: (data: PrevRegData) => void }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<PrevRegData>({
    resolver: zodResolver(prevRegSchema),
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10">
        {/* Close */}
        <button onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
          <X size={18} />
        </button>

        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Previous Registration</h2>
          <p className="text-sm text-gray-400 mt-0.5">Access records of your previously registered courses.</p>
        </div>

        <form onSubmit={handleSubmit(onView)} className="px-6 py-5 flex flex-col gap-4">
          <SelectField label="Semester" error={errors.semester?.message}
            registration={register('semester')} options={SEMESTERS} placeholder="Select semester" />
          <SelectField label="Session" error={errors.session?.message}
            registration={register('session')} options={SESSIONS} placeholder="Select session" />

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit"
              className="flex-1 py-2.5 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-colors"
              style={{ backgroundColor: '#20A8D8' }}>
              View Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── O-Level Tab ─────────────────────────────────────────────────
const OLevelTab = () => {
  const [results, setResults] = useState<OLevelResult[]>(MOCK_OLEVEL_RESULTS);
  const [addOpen, setAddOpen] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<OLevelExamData>({
    resolver: zodResolver(olevelExamSchema),
    defaultValues: { examNo: '2110379751BG', examYear: '2023', examType: 'WAEC', sitting: 'First' },
  });

  const onExamSubmit = (data: OLevelExamData) => {
    console.log('Exam details saved:', data);
  };

  const handleAddResult = (data: AddOLevelData) => {
    setResults(prev => [...prev, { id: String(Date.now()), subject: data.subject, grade: data.grade }]);
    setAddOpen(false);
  };

  const handleDelete = (id: string) => {
    setResults(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Examination Details */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h2 className="text-sm font-bold text-gray-800 mb-4">Examination Details</h2>
        <form onSubmit={handleSubmit(onExamSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Exam No.</label>
            <input {...register('examNo')}
              placeholder="Enter examination number"
              className={cn('w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none transition-all',
                errors.examNo ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-[#20A8D8] focus:ring-2 focus:ring-[#20A8D8]/20'
              )} />
            {errors.examNo && <p className="text-red-500 text-xs mt-1">{errors.examNo.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Exam Year</label>
            <input {...register('examYear')}
              placeholder="e.g. 2023"
              className={cn('w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none transition-all',
                errors.examYear ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-[#20A8D8] focus:ring-2 focus:ring-[#20A8D8]/20'
              )} />
            {errors.examYear && <p className="text-red-500 text-xs mt-1">{errors.examYear.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Exam Type</label>
            <div className="relative">
              <select {...register('examType')}
                className={cn('w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none appearance-none transition-all',
                  errors.examType ? 'border-red-300' : 'border-gray-200 focus:border-[#20A8D8] focus:ring-2 focus:ring-[#20A8D8]/20'
                )}>
                <option value="">Select exam type</option>
                {EXAM_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {errors.examType && <p className="text-red-500 text-xs mt-1">{errors.examType.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Sitting</label>
            <div className="relative">
              <select {...register('sitting')}
                className={cn('w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none appearance-none transition-all',
                  errors.sitting ? 'border-red-300' : 'border-gray-200 focus:border-[#20A8D8] focus:ring-2 focus:ring-[#20A8D8]/20'
                )}>
                <option value="">Select sitting</option>
                {SITTINGS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {errors.sitting && <p className="text-red-500 text-xs mt-1">{errors.sitting.message}</p>}
          </div>
        </form>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-bold text-gray-800">All Result</h2>
          <button
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-xs font-semibold hover:opacity-90 transition-colors"
            style={{ backgroundColor: '#20A8D8' }}
          >
            <Plus size={13} />
            Add O-Level
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#1D3A4A' }}>
                <th className="px-5 py-3 text-left text-xs font-semibold text-white w-14">S/N</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-white">Subject</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-white w-28">Grade</th>
                <th className="px-5 py-3 w-14" />
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3 text-gray-500 text-sm">{i + 1}</td>
                  <td className="px-5 py-3 text-gray-700 text-sm">{r.subject}</td>
                  <td className="px-5 py-3 text-gray-700 text-sm">{r.grade}</td>
                  <td className="px-5 py-3">
                    <button onClick={() => handleDelete(r.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                        <path d="M10 11v6"/><path d="M14 11v6"/>
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add O-Level Modal */}
      <AddOLevelModal isOpen={addOpen} onClose={() => setAddOpen(false)} onAdd={handleAddResult} />
    </div>
  );
};

// ─── Add O-Level Modal ────────────────────────────────────────────
const AddOLevelModal = ({
  isOpen, onClose, onAdd,
}: { isOpen: boolean; onClose: () => void; onAdd: (data: AddOLevelData) => void }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AddOLevelData>({
    resolver: zodResolver(addOLevelSchema),
  });

  const handleAdd = (data: AddOLevelData) => {
    onAdd(data);
    reset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10">
        <button onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
          <X size={18} />
        </button>

        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Student level Upload</h2>
          <p className="text-sm text-gray-400 mt-0.5">Upload and manage your O'Level results</p>
        </div>

        <form onSubmit={handleSubmit(handleAdd)} className="px-6 py-5 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Subject</label>
            <div className="relative">
              <select {...register('subject')}
                defaultValue=""
                className={cn('w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none appearance-none transition-all',
                  errors.subject ? 'border-red-300' : 'border-gray-200 focus:border-[#20A8D8] focus:ring-2 focus:ring-[#20A8D8]/20'
                )}>
                <option value="" disabled>Select subject</option>
                {OLEVEL_SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Grade</label>
            <div className="relative">
              <select {...register('grade')}
                defaultValue=""
                className={cn('w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none appearance-none transition-all',
                  errors.grade ? 'border-red-300' : 'border-gray-200 focus:border-[#20A8D8] focus:ring-2 focus:ring-[#20A8D8]/20'
                )}>
                <option value="" disabled>Select grade</option>
                {OLEVEL_GRADES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {errors.grade && <p className="text-red-500 text-xs mt-1">{errors.grade.message}</p>}
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit"
              className="flex-1 py-2.5 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-colors"
              style={{ backgroundColor: '#20A8D8' }}>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Shared: SelectField ─────────────────────────────────────────
const SelectField = ({
  label, error, registration, options, placeholder,
}: {
  label: string;
  error?: string;
  registration: ReturnType<ReturnType<typeof useForm<any>>['register']>;
  options: string[];
  placeholder?: string;
}) => (
  <div>
    <label className="block text-xs font-medium text-gray-600 mb-1.5">{label}</label>
    <div className="relative">
      <select {...registration}
        defaultValue={placeholder ? '' : undefined}
        className={cn('w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none appearance-none transition-all',
          error ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-[#20A8D8] focus:ring-2 focus:ring-[#20A8D8]/20'
        )}>
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default CourseRegPage;
