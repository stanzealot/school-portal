import { useState, useMemo, memo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Pencil, X, ChevronDown, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { useExamHeader } from '@/components/layout/ExamOfficerLayout';
import RightDrawer from '@/components/ui/RightDrawer';
import {
  MOCK_CURRICULUM, STATUSES, EXAM_SEMESTERS, EXAM_PAGE_SIZE, EXAM_SESSIONS,
  type CurriculumCourse,
} from '@/constants/exam-officer-mock';
import { COLORS } from '@/constants/theme.constants';
import { cn } from '@/utils';

// ─── Course Curriculum options (for Add modal dropdown) ────────
const COURSE_CURRICULUM_OPTIONS = [
  'ABE133 - Basic construction workshop and practices',
  'ACC111 - Principles of Accounting 1',
  'ACC112 - Principles of Accounting 2',
  'BAM111 - Business Mathematics',
  'BAM112 - Principles of Economics',
  'GNS101 - Use of English I',
  'MGT301 - Management Principles',
];

const UNIT_OPTIONS = ['1','2','3','4','5','6'];

// ─── Form state ────────────────────────────────────────────────
interface AddForm   { status: string; semester: string; unit: string; session: string; courseCurriculum: string; }
interface EditForm  { courseCode: string; courseTitle: string; unit: string; status: string; }

const EMPTY_ADD:  AddForm  = { status: 'Core', semester: 'First', unit: '3', session: '2025/2026', courseCurriculum: '' };
const EMPTY_EDIT: EditForm = { courseCode: '', courseTitle: '', unit: '3', status: 'Core' };

// ═══════════════════════════════════════════════════════════════
const ManageCurriculumPage = () => {
  const { setActions } = useExamHeader();

  const [courses, setCourses]           = useState<CurriculumCourse[]>(MOCK_CURRICULUM);
  const [search, setSearch]             = useState('');
  const [showSearch, setShowSearch]     = useState(false);   // mobile search toggle
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [filterSemester, setFilterSemester] = useState('');
  const [page, setPage]                 = useState(1);

  // Add modal (centered overlay — Image 1)
  const [addOpen, setAddOpen]           = useState(false);
  const [addForm, setAddForm]           = useState<AddForm>(EMPTY_ADD);

  // Edit drawer (right panel — Image 3)
  const [editTarget, setEditTarget]     = useState<CurriculumCourse | null>(null);
  const [editForm, setEditForm]         = useState<EditForm>(EMPTY_EDIT);

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  // ── Inject header button ──────────────────────────────────
  useEffect(() => {
    setActions(
      <motion.button
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
        onClick={() => { setAddForm(EMPTY_ADD); setAddOpen(true); }}
        className="flex items-center gap-2 px-4 py-2.5 rounded-[4px] text-white text-sm font-semibold whitespace-nowrap"
        style={{ backgroundColor: COLORS.primary }}
      >
        <Plus size={15} /> Add Curriculum
      </motion.button>
    );
    return () => setActions(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Filtered + paginated ──────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return courses.filter(c =>
      (!q || c.courseCode.toLowerCase().includes(q) || c.courseTitle.toLowerCase().includes(q)) &&
      (!filterSemester || c.semester === filterSemester)
    );
  }, [courses, search, filterSemester]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / EXAM_PAGE_SIZE));
  const paginated  = filtered.slice((page - 1) * EXAM_PAGE_SIZE, page * EXAM_PAGE_SIZE);

  const setSearchReset  = (v: string) => { setSearch(v); setPage(1); };
  const setFilterReset  = (v: string) => { setFilterSemester(v); setPage(1); setMobileFilterOpen(false); };

  // ── Add ───────────────────────────────────────────────────
  const handleAdd = () => {
    if (!addForm.courseCurriculum) return;
    const [code, ...rest] = addForm.courseCurriculum.split(' - ');
    const newCourse: CurriculumCourse = {
      id:          String(Date.now()),
      courseCode:  code.trim(),
      courseTitle: rest.join(' - ').trim(),
      unit:        Number(addForm.unit),
      status:      addForm.status as 'Core' | 'Elective',
      semester:    addForm.semester as 'First' | 'Second',
      level:       'ND1',
    };
    setCourses(prev => [newCourse, ...prev]);
    setAddOpen(false);
  };

  // ── Edit ──────────────────────────────────────────────────
  const openEdit = (course: CurriculumCourse) => {
    setEditTarget(course);
    setEditForm({ courseCode: course.courseCode, courseTitle: course.courseTitle, unit: String(course.unit), status: course.status });
  };

  const handleUpdate = () => {
    if (!editTarget) return;
    setCourses(prev => prev.map(c =>
      c.id === editTarget.id
        ? { ...c, courseTitle: editForm.courseTitle, unit: Number(editForm.unit), status: editForm.status as 'Core' | 'Elective' }
        : c
    ));
    setEditTarget(null);
  };

  // ── Delete ────────────────────────────────────────────────
  const handleDelete = () => {
    if (!deleteTarget) return;
    setCourses(prev => prev.filter(c => c.id !== deleteTarget));
    setDeleteTarget(null);
  };

  return (
    <div className="flex flex-col gap-4">

      {/* Mobile: "+ Add Curriculum" button below header (Image 2) */}
      <div className="md:hidden">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => { setAddForm(EMPTY_ADD); setAddOpen(true); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-[4px] text-white text-sm font-semibold"
          style={{ backgroundColor: COLORS.primary }}
        >
          <Plus size={15} /> Add Curriculum
        </motion.button>
      </div>

      {/* ── Table card ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Card header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 gap-3">
          <h3 className="font-bold text-base" style={{ color: COLORS.text.title }}>All Curriculum</h3>

          {/* Desktop: search + filter */}
          <div className="hidden md:flex items-center gap-2">
            <DesktopSearch value={search} onChange={setSearchReset} />
            <FilterDropdownDesktop
              value={filterSemester}
              onChange={setFilterReset}
            />
          </div>

          {/* Mobile: search icon + Apply Filter */}
          <div className="flex md:hidden items-center gap-2">
            <button onClick={() => setShowSearch(s => !s)}
              className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
              <Search size={16} />
            </button>
            <button onClick={() => setMobileFilterOpen(true)}
              className="flex items-center gap-1.5 text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap">
              <Filter size={13} /> Apply Filter
            </button>
          </div>
        </div>

        {/* Mobile search bar (slides in) */}
        <AnimatePresence>
          {showSearch && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-b border-gray-100 px-4 py-2 md:hidden">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={search} onChange={e => setSearchReset(e.target.value)} placeholder="Search..."
                  className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#20A8D8]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Table ── */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide w-12">S/N</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Course Code</th>
                {/* Course Title — hidden on mobile (Image 2 shows Unit in col 3) */}
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide hidden md:table-cell">Course Title</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  {/* Mobile: Course Title as 3rd col, Desktop: Unit */}
                  <span className="md:hidden">Course Title</span>
                  <span className="hidden md:inline">Unit</span>
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide hidden md:table-cell">Status</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide hidden md:table-cell">Semester</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide hidden md:table-cell">Level</th>
                <th className="hidden md:table-cell px-5 py-3 w-20" />
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8}>
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <Search size={32} className="text-gray-200 mb-3" />
                      <p className="font-semibold text-sm text-gray-500">No curriculum found</p>
                      <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filter</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((course, i) => (
                  <CourseRow
                    key={course.id}
                    course={course}
                    sn={(page - 1) * EXAM_PAGE_SIZE + i + 1}
                    onEdit={() => openEdit(course)}
                    onDelete={() => setDeleteTarget(course.id)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="border-t border-gray-100 px-5 py-4">
            <CurriculumPagination page={page} totalPages={totalPages} onChange={setPage} />
          </div>
        )}
      </div>

      {/* ══ ADD MODAL — centered overlay (Image 1) ══ */}
      <AnimatePresence>
        {addOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
              onClick={() => setAddOpen(false)}
            />
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl w-full max-w-[540px] mx-4"
            >
              {/* Close */}
              <button onClick={() => setAddOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                <X size={18} />
              </button>

              <div className="p-8">
                <h2 className="text-xl font-bold mb-1" style={{ color: COLORS.text.title }}>Add Curriculum</h2>
                <p className="text-sm mb-6" style={{ color: COLORS.text.muted }}>
                  Add and configure a curriculum to organize courses, levels, and academic requirements for students.
                </p>

                <div className="flex flex-col gap-4">
                  {/* Row 1: Status + Semester */}
                  <div className="grid grid-cols-2 gap-4">
                    <ModalField label="Status">
                      <ModalSelect value={addForm.status} onChange={v => setAddForm(p => ({ ...p, status: v }))} options={[...STATUSES]} />
                    </ModalField>
                    <ModalField label="Semester">
                      <ModalSelect value={addForm.semester} onChange={v => setAddForm(p => ({ ...p, semester: v }))} options={[...EXAM_SEMESTERS]} />
                    </ModalField>
                  </div>

                  {/* Row 2: Unit + Session */}
                  <div className="grid grid-cols-2 gap-4">
                    <ModalField label="Unit">
                      <ModalSelect value={addForm.unit} onChange={v => setAddForm(p => ({ ...p, unit: v }))} options={UNIT_OPTIONS} />
                    </ModalField>
                    <ModalField label="Session">
                      <ModalSelect value={addForm.session} onChange={v => setAddForm(p => ({ ...p, session: v }))} options={EXAM_SESSIONS} />
                    </ModalField>
                  </div>

                  {/* Row 3: Course Curriculum (full width) */}
                  <ModalField label="Course Curriculum">
                    <ModalSelect
                      value={addForm.courseCurriculum}
                      onChange={v => setAddForm(p => ({ ...p, courseCurriculum: v }))}
                      options={COURSE_CURRICULUM_OPTIONS}
                      placeholder="Select course curriculum"
                    />
                  </ModalField>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 mt-8">
                  <button onClick={() => setAddOpen(false)}
                    className="py-3 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                    onClick={handleAdd}
                    className="py-3 rounded-lg text-white text-sm font-semibold transition-colors"
                    style={{ backgroundColor: COLORS.primary }}
                  >
                    Add
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ══ EDIT DRAWER — right panel (Image 3) ══ */}
      <RightDrawer isOpen={!!editTarget} onClose={() => setEditTarget(null)} width={440} hideCloseButton>
        {editTarget && (
          <div className="flex flex-col h-full p-6 md:p-8 gap-5">
            {/* Back arrow */}
            <button onClick={() => setEditTarget(null)}
              className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors flex-shrink-0">
              <ChevronLeft size={18} />
            </button>

            {/* Title + subtitle */}
            <div className="border-b border-gray-100 pb-5">
              <h2 className="text-xl font-bold mb-1" style={{ color: COLORS.text.title }}>Modify Curriculum</h2>
              <p className="text-sm leading-relaxed" style={{ color: COLORS.text.muted }}>
                Modifications Made here will only affect{' '}
                <strong className="font-semibold" style={{ color: COLORS.text.title }}>
                  {editTarget.courseCode}
                </strong>{' '}
                2025/2026 Session Accountancy {editTarget.level}.
              </p>
            </div>

            {/* Form fields */}
            <div className="flex flex-col gap-5 flex-1">
              {/* Course Code — read-only (grey background) */}
              <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-700">Course Code</label>
                <div className="px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-100 text-sm text-gray-600 select-none">
                  {editForm.courseCode}
                </div>
              </div>

              {/* Course Title */}
              <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-700">Course Title</label>
                <input
                  value={editForm.courseTitle}
                  onChange={e => setEditForm(p => ({ ...p, courseTitle: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#20A8D8] focus:ring-2 focus:ring-[#20A8D8]/20 bg-white text-gray-800 transition-all"
                />
              </div>

              {/* Unit — dropdown */}
              <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-700">Unit</label>
                <ModalSelect value={editForm.unit} onChange={v => setEditForm(p => ({ ...p, unit: v }))} options={UNIT_OPTIONS} />
              </div>

              {/* Status — dropdown */}
              <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-700">Status</label>
                <ModalSelect value={editForm.status} onChange={v => setEditForm(p => ({ ...p, status: v }))} options={[...STATUSES]} />
              </div>
            </div>

            {/* Actions — Cancel | Update */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
              <button onClick={() => setEditTarget(null)}
                className="py-3 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                onClick={handleUpdate}
                className="py-3 rounded-lg text-white text-sm font-semibold"
                style={{ backgroundColor: COLORS.primary }}
              >
                Update
              </motion.button>
            </div>
          </div>
        )}
      </RightDrawer>

      {/* ══ DELETE CONFIRM MODAL ══ */}
      <AnimatePresence>
        {deleteTarget && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
              onClick={() => setDeleteTarget(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4"
            >
              <h3 className="font-bold text-base mb-2" style={{ color: COLORS.text.title }}>Delete Course</h3>
              <p className="text-sm mb-6" style={{ color: COLORS.text.muted }}>
                Are you sure you want to remove this course from the curriculum? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteTarget(null)}
                  className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button onClick={handleDelete}
                  className="flex-1 py-2.5 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors">
                  Delete
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile filter bottom sheet */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/30 md:hidden" onClick={() => setMobileFilterOpen(false)} />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl p-6 pb-8 md:hidden"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-base" style={{ color: COLORS.text.title }}>Filter by</h3>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-gray-400 hover:text-gray-600 transition-colors"><X size={18} /></button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1.5 text-gray-700">Semester</label>
                <div className="relative">
                  <select value={filterSemester} onChange={e => setFilterReset(e.target.value)}
                    className="w-full appearance-none px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#20A8D8] bg-white">
                    <option value="">All Semester</option>
                    {EXAM_SEMESTERS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-6">
                <button onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3.5 rounded-xl text-white text-sm font-semibold"
                  style={{ backgroundColor: COLORS.primary }}>
                  Apply Filter
                </button>
                <button onClick={() => { setFilterReset(''); }}
                  className="w-full py-3.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Table row ─────────────────────────────────────────────────
const CourseRow = memo(({ course, sn, onEdit, onDelete }: {
  course: CurriculumCourse; sn: number; onEdit: () => void; onDelete: () => void;
}) => (
  <motion.tr
    initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.18 }}
    className="border-b border-gray-50 hover:bg-gray-50/40 transition-colors"
  >
    <td className="px-5 py-3.5 text-gray-400 text-sm">{sn}</td>
    <td className="px-5 py-3.5 text-gray-600 font-medium text-sm whitespace-nowrap">{course.courseCode}</td>
    {/* Desktop: Course Title as col 3 */}
    <td className="px-5 py-3.5 font-semibold text-sm hidden md:table-cell" style={{ color: COLORS.text.title }}>{course.courseTitle}</td>
    {/* Mobile col 3: Course Title truncated; Desktop: Unit */}
    <td className="px-5 py-3.5 text-sm">
      <span className="md:hidden font-semibold truncate max-w-[140px] block" style={{ color: COLORS.text.title }}>{course.courseTitle}</span>
      <span className="hidden md:inline text-gray-500">{course.unit}</span>
    </td>
    <td className="px-5 py-3.5 text-sm text-gray-600 hidden md:table-cell">{course.status}</td>
    <td className="px-5 py-3.5 hidden md:table-cell">
      <span className={cn('px-2.5 py-1 rounded-full text-xs font-semibold',
        course.semester === 'First' ? 'bg-[#20A8D8]/10 text-[#20A8D8]' : 'bg-purple-50 text-purple-600')}>
        {course.semester}
      </span>
    </td>
    <td className="px-5 py-3.5 text-gray-500 text-sm hidden md:table-cell">{course.level}</td>
    <td className="px-5 py-3.5 hidden md:table-cell">
      <div className="flex items-center gap-1">
        <button onClick={onDelete} title="Delete"
          className="p-1.5 rounded-md text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors">
          <Trash2 size={15} />
        </button>
        <button onClick={onEdit} title="Edit"
          className="p-1.5 rounded-md text-gray-300 hover:text-[#20A8D8] hover:bg-[#20A8D8]/10 transition-colors">
          <Pencil size={15} />
        </button>
      </div>
    </td>
  </motion.tr>
));
CourseRow.displayName = 'CourseRow';

// ── Desktop search bar ────────────────────────────────────────
const DesktopSearch = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <div className="relative">
    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    <input value={value} onChange={e => onChange(e.target.value)} placeholder="Search..."
      className="pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#20A8D8] focus:ring-2 focus:ring-[#20A8D8]/20 bg-white w-44 transition-all" />
  </div>
);

// ── Desktop filter dropdown ───────────────────────────────────
const FilterDropdownDesktop = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 text-sm border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors bg-white text-gray-600">
        <Filter size={13} className="text-gray-400" /> Filter By
        <ChevronDown size={13} className={cn('text-gray-400 transition-transform', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -6, scaleY: 0.95 }} animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.95 }} style={{ transformOrigin: 'top' }} transition={{ duration: 0.13 }}
            className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-gray-100 z-20 min-w-[160px] overflow-hidden">
            <button onClick={() => { onChange(''); setOpen(false); }}
              className={cn('w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors', !value && 'text-[#20A8D8] font-semibold')}>
              All Semester
            </button>
            {EXAM_SEMESTERS.map(o => (
              <button key={o} onClick={() => { onChange(o); setOpen(false); }}
                className={cn('w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors', value === o && 'text-[#20A8D8] font-semibold')}>
                {o}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Modal select field ────────────────────────────────────────
const ModalField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-sm font-medium mb-1.5 text-gray-700">{label}</label>
    {children}
  </div>
);

const ModalSelect = ({ value, onChange, options, placeholder }: {
  value: string; onChange: (v: string) => void; options: string[]; placeholder?: string;
}) => (
  <div className="relative">
    <select value={value} onChange={e => onChange(e.target.value)}
      className={cn(
        'w-full appearance-none px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm outline-none',
        'focus:border-[#20A8D8] focus:ring-2 focus:ring-[#20A8D8]/20 bg-white transition-all',
        value ? 'text-gray-800' : 'text-gray-400'
      )}>
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
    <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);

// ── Pagination matching designs ───────────────────────────────
const CurriculumPagination = memo(({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (p: number) => void }) => {
  const pages: (number | '...')[] = [];
  if (totalPages <= 7) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
  else {
    pages.push(1, 2, 3);
    if (page > 5) pages.push('...');
    if (page > 3 && page < totalPages - 2) pages.push(page);
    if (page < totalPages - 4) pages.push('...');
    pages.push(totalPages - 2, totalPages - 1, totalPages);
  }
  return (
    <div className="flex items-center justify-between">
      {/* Mobile: ← Page X of Y → */}
      <div className="flex md:hidden items-center gap-4 w-full justify-between">
        <button onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1}
          className="p-2 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors">
          <ChevronLeft size={16} />
        </button>
        <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
        <button onClick={() => onChange(Math.min(totalPages, page + 1))} disabled={page === totalPages}
          className="p-2 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors">
          <ChevronRight size={16} />
        </button>
      </div>
      {/* Desktop: ← Previous  1 2 3 ... 8 9 10  Next → */}
      <div className="hidden md:flex items-center gap-2">
        <button onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-500 hover:text-gray-800 disabled:opacity-40 transition-colors">
          <ChevronLeft size={14} /> Previous
        </button>
        {pages.map((p, i) => (
          <button key={i} onClick={() => typeof p === 'number' && onChange(p)} disabled={p === '...'}
            className={cn('w-8 h-8 rounded-lg text-sm font-medium transition-colors',
              p === page ? 'bg-[#20A8D8] text-white' : 'text-gray-500 hover:bg-gray-100',
              p === '...' && 'cursor-default')}>
            {p}
          </button>
        ))}
        <button onClick={() => onChange(Math.min(totalPages, page + 1))} disabled={page === totalPages}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-500 hover:text-gray-800 disabled:opacity-40 transition-colors">
          Next <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
});
CurriculumPagination.displayName = 'CurriculumPagination';

export default ManageCurriculumPage;
