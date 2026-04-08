import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SearchBar, FilterDropdown, SemesterBadge, Pagination, EmptyState, TableCard } from '@/components/ui/exam-officer';
import { MOCK_UPLOAD_STATS, EXAM_DEPARTMENTS, EXAM_PAGE_SIZE } from '@/constants/exam-officer-mock';
import { COLORS } from '@/constants/theme.constants';
import { cn } from '@/utils';

const STATUS_STYLE: Record<string, string> = {
  Uploaded: 'bg-green-50 text-green-600',
  Pending:  'bg-yellow-50 text-yellow-600',
  Rejected: 'bg-red-50 text-red-500',
};

const UploadStatsPage = () => {
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return MOCK_UPLOAD_STATS.filter(s =>
      (!q || s.lecturerName.toLowerCase().includes(q) || s.courseCode.toLowerCase().includes(q)) &&
      (!filterDept || s.department === filterDept)
    );
  }, [search, filterDept]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / EXAM_PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * EXAM_PAGE_SIZE, page * EXAM_PAGE_SIZE);

  // Summary cards
  const uploaded = MOCK_UPLOAD_STATS.filter(s => s.status === 'Uploaded').length;
  const pending  = MOCK_UPLOAD_STATS.filter(s => s.status === 'Pending').length;
  const rejected = MOCK_UPLOAD_STATS.filter(s => s.status === 'Rejected').length;

  return (
    <div className="flex flex-col gap-5">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Uploaded', count: uploaded, color: '#4DBD74', bg: '#EAFAF1' },
          { label: 'Pending',  count: pending,  color: '#F0AD4E', bg: '#FFF8E7' },
          { label: 'Rejected', count: rejected, color: '#F86C6B', bg: '#FFF0F0' },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold" style={{ backgroundColor: c.bg, color: c.color }}>{c.count}</div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Total</p>
              <p className="font-bold text-sm" style={{ color: COLORS.text.title }}>{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      <TableCard>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 gap-3 flex-wrap">
          <h3 className="font-bold text-base" style={{ color: COLORS.text.title }}>Upload Statistics</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <SearchBar value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Search lecturer or course..." className="w-52" />
            <FilterDropdown label="All Department" options={EXAM_DEPARTMENTS} value={filterDept} onChange={v => { setFilterDept(v); setPage(1); }} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                {['S/N','Lecturer','Course Code','Course Title','Department','Session','Semester','Uploaded At','Status'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={9}><EmptyState message="No upload records found" /></td></tr>
              ) : paginated.map((s, i) => (
                <motion.tr key={s.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15, delay: i * 0.03 }}
                  className="border-b border-gray-50 hover:bg-gray-50/40 transition-colors">
                  <td className="px-5 py-3.5 text-gray-400">{(page - 1) * EXAM_PAGE_SIZE + i + 1}</td>
                  <td className="px-5 py-3.5 font-semibold whitespace-nowrap" style={{ color: COLORS.text.title }}>{s.lecturerName}</td>
                  <td className="px-5 py-3.5 text-gray-600">{s.courseCode}</td>
                  <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">{s.courseTitle}</td>
                  <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">{s.department}</td>
                  <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">{s.session}</td>
                  <td className="px-5 py-3.5"><SemesterBadge semester={s.semester} /></td>
                  <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">{s.uploadedAt || '—'}</td>
                  <td className="px-5 py-3.5">
                    <span className={cn('px-2.5 py-1 rounded-full text-xs font-semibold', STATUS_STYLE[s.status])}>{s.status}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && <div className="border-t border-gray-100 px-5 py-4"><Pagination page={page} totalPages={totalPages} onChange={setPage} /></div>}
      </TableCard>
    </div>
  );
};
export default UploadStatsPage;
