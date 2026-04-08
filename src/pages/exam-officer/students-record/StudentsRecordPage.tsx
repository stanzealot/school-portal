import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, Ban } from 'lucide-react';
import { SearchBar, FilterDropdown, Pagination, EmptyState, TableCard, IconBtn } from '@/components/ui/exam-officer';
import { MOCK_STUDENTS, EXAM_DEPARTMENTS, EXAM_PAGE_SIZE, type StudentRecord } from '@/constants/exam-officer-mock';
import { COLORS } from '@/constants/theme.constants';
import { cn } from '@/utils';

const STATUS_COLORS = {
  Active:      'bg-green-50 text-green-600',
  Inactive:    'bg-gray-100 text-gray-500',
  Blacklisted: 'bg-red-50 text-red-500',
};

const StudentsRecordPage = () => {
  const [students, setStudents] = useState<StudentRecord[]>(MOCK_STUDENTS);
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return students.filter(s =>
      (!q || s.fullName.toLowerCase().includes(q) || s.matricNumber.toLowerCase().includes(q)) &&
      (!filterDept || s.department === filterDept)
    );
  }, [students, search, filterDept]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / EXAM_PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * EXAM_PAGE_SIZE, page * EXAM_PAGE_SIZE);

  const toggleBlacklist = (id: string) =>
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'Blacklisted' ? 'Active' : 'Blacklisted' } : s));

  const handleExport = () => {
    const csv = ['S/N,Matric No.,Full Name,Department,Level,Session,Status',
      ...filtered.map((s, i) => `${i + 1},${s.matricNumber},${s.fullName},${s.department},${s.level},${s.session},${s.status}`)
    ].join('\n');
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([csv], { type: 'text/csv' })), download: 'students.csv' });
    a.click();
  };

  return (
    <TableCard>
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 gap-3 flex-wrap">
        <h3 className="font-bold text-base" style={{ color: COLORS.text.title }}>Students Record</h3>
        <div className="flex items-center gap-2 flex-wrap">
          <SearchBar value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Search student..." className="w-48" />
          <FilterDropdown label="All Department" options={EXAM_DEPARTMENTS} value={filterDept} onChange={v => { setFilterDept(v); setPage(1); }} />
          <button onClick={handleExport} className="flex items-center gap-1.5 text-sm border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors text-gray-600 whitespace-nowrap">
            <Download size={14} /> Export
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              {['S/N','Matric No.','Full Name','Department','Level','Session','Status',''].map(h => (
                <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr><td colSpan={8}><EmptyState message="No students found" /></td></tr>
            ) : paginated.map((s, i) => (
              <motion.tr key={s.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15, delay: i * 0.03 }}
                className="border-b border-gray-50 hover:bg-gray-50/40 transition-colors">
                <td className="px-5 py-3.5 text-gray-400">{(page - 1) * EXAM_PAGE_SIZE + i + 1}</td>
                <td className="px-5 py-3.5 font-medium text-gray-600 whitespace-nowrap">{s.matricNumber}</td>
                <td className="px-5 py-3.5 font-semibold" style={{ color: COLORS.text.title }}>{s.fullName}</td>
                <td className="px-5 py-3.5 text-gray-500">{s.department}</td>
                <td className="px-5 py-3.5 text-gray-500">{s.level}</td>
                <td className="px-5 py-3.5 text-gray-500">{s.session}</td>
                <td className="px-5 py-3.5">
                  <span className={cn('px-2.5 py-1 rounded-full text-xs font-semibold', STATUS_COLORS[s.status])}>{s.status}</span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex gap-1">
                    <IconBtn onClick={() => {}} title="View"><Eye size={15} /></IconBtn>
                    <IconBtn onClick={() => toggleBlacklist(s.id)} title={s.status === 'Blacklisted' ? 'Unblacklist' : 'Blacklist'} variant="danger"><Ban size={15} /></IconBtn>
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
export default StudentsRecordPage;
