import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { SearchBar, FilterDropdown, Pagination, EmptyState, TableCard, IconBtn } from '@/components/ui/exam-officer';
import { MOCK_STUDENTS, EXAM_DEPARTMENTS,EXAM_PAGE_SIZE } from '@/constants/exam-officer-mock';
import { COLORS } from '@/constants/theme.constants';
import { Eye } from 'lucide-react';

const StudentCourseFormPage = () => {
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return MOCK_STUDENTS.filter(s =>
      (!q || s.fullName.toLowerCase().includes(q) || s.matricNumber.toLowerCase().includes(q)) &&
      (!filterDept || s.department === filterDept)
    );
  }, [search, filterDept]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / EXAM_PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * EXAM_PAGE_SIZE, page * EXAM_PAGE_SIZE);

  return (
    <TableCard>
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 gap-3 flex-wrap">
        <h3 className="font-bold text-base" style={{ color: COLORS.text.title }}>Student Course Form</h3>
        <div className="flex items-center gap-2 flex-wrap">
          <SearchBar value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Search student..." className="w-48" />
          <FilterDropdown label="All Department" options={EXAM_DEPARTMENTS} value={filterDept} onChange={v => { setFilterDept(v); setPage(1); }} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide w-10">S/N</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Matric No.</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Full Name</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Department</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Level</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Session</th>
              <th className="px-5 py-3 w-20" />
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr><td colSpan={7}><EmptyState message="No students found" /></td></tr>
            ) : paginated.map((s, i) => (
              <motion.tr key={s.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15, delay: i * 0.03 }}
                className="border-b border-gray-50 hover:bg-gray-50/40 transition-colors">
                <td className="px-5 py-3.5 text-gray-400 text-sm">{(page - 1) * EXAM_PAGE_SIZE + i + 1}</td>
                <td className="px-5 py-3.5 font-medium text-gray-600 text-sm whitespace-nowrap">{s.matricNumber}</td>
                <td className="px-5 py-3.5 font-semibold text-sm" style={{ color: COLORS.text.title }}>{s.fullName}</td>
                <td className="px-5 py-3.5 text-gray-500 text-sm">{s.department}</td>
                <td className="px-5 py-3.5 text-gray-500 text-sm">{s.level}</td>
                <td className="px-5 py-3.5 text-gray-500 text-sm">{s.session}</td>
                <td className="px-5 py-3.5">
                  <div className="flex gap-1">
                    <IconBtn onClick={() => {}} title="View form"><Eye size={15} /></IconBtn>
                    <IconBtn onClick={() => {}} title="Download"><Download size={15} /></IconBtn>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && <div className="border-t border-gray-100 px-5 py-4"><Pagination page={page} totalPages={totalPages} onChange={setPage} /></div>}
    </TableCard>
  );
};
export default StudentCourseFormPage;
