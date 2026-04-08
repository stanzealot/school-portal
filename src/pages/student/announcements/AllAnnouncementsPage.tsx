import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, FileText, BedDouble, CreditCard, Library } from 'lucide-react';
import { MOCK_ANNOUNCEMENTS } from '@/constants/student-mock.data';
import { ROUTES } from '@/constants/routes.constants';
import { COLORS } from '@/constants/theme.constants';
import { cn } from '@/utils';

const CATEGORY_STYLES: Record<string, { bg: string; text: string }> = {
  Important: { bg: '#FEF2F2', text: '#EF4444' },
  Academic:  { bg: '#EFF6FF', text: '#3B82F6' },
  General:   { bg: '#F0FDF4', text: '#22C55E' },
};

const ALL_CATEGORIES = ['All', 'Important', 'Academic', 'General'];
const PAGE_SIZE = 5;

const AllAnnouncementsPage = () => {
  const navigate = useNavigate();
  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState('All');
  const [showFilter, setShowFilter] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => MOCK_ANNOUNCEMENTS.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
                        a.body.toLowerCase().includes(search.toLowerCase());
    const matchCat    = category === 'All' || a.category === category;
    return matchSearch && matchCat;
  }), [search, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch   = (v: string) => { setSearch(v);   setPage(1); };
  const handleCategory = (c: string) => { setCategory(c); setShowFilter(false); setPage(1); };

  return (
    <div className="py-5">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-800">All Announcements</h1>
        <p className="text-sm text-gray-400 mt-0.5">Catch up on every recent announcement</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* ── Main ── */}
        <div className="flex-1 min-w-0">
          <button
            onClick={() => navigate(ROUTES.STUDENT.HOME)}
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={15} />
            Back to Dashboard
          </button>

          {/* Search + filter */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search announcements..."
                value={search}
                onChange={e => handleSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-[#20A8D8] focus:ring-2 focus:ring-[#20A8D8]/20 transition-all"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setShowFilter(v => !v)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors',
                  category !== 'All'
                    ? 'border-[#20A8D8] bg-[#20A8D8]/5 text-[#20A8D8]'
                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                )}
              >
                <Filter size={15} />
                <span className="hidden sm:inline">{category === 'All' ? 'Filter by Category' : category}</span>
              </button>
              {showFilter && (
                <div className="absolute right-0 top-full mt-1.5 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-20">
                  {ALL_CATEGORIES.map(c => (
                    <button
                      key={c}
                      onClick={() => handleCategory(c)}
                      className={cn(
                        'w-full text-left px-4 py-2 text-sm transition-colors',
                        category === c ? 'text-[#20A8D8] font-semibold bg-[#20A8D8]/5' : 'text-gray-600 hover:bg-gray-50'
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Cards */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            {paginated.length === 0
              ? <div className="py-16 text-center text-gray-400 text-sm">No announcements found.</div>
              : <div className="divide-y divide-gray-50">{paginated.map(ann => <AnnCard key={ann.id} ann={ann} />)}</div>
            }

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 flex-wrap gap-3">
                <span className="text-sm text-gray-400">
                  Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
                </span>
                <div className="flex items-center gap-1">
                  <PBtn label="← Prev" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} />
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                    .reduce<(number | '...')[]>((acc, p, i, arr) => {
                      if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push('...');
                      acc.push(p); return acc;
                    }, [])
                    .map((p, i) =>
                      p === '...'
                        ? <span key={`el-${i}`} className="px-2 text-gray-400 text-sm">…</span>
                        : <PNumBtn key={p} page={p as number} active={page === p} onClick={() => setPage(p as number)} />
                    )}
                  <PBtn label="Next →" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className="lg:w-[280px] flex-shrink-0 flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="text-sm font-bold text-gray-800 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Course Reg',    icon: <FileText  size={18} className="text-[#20A8D8]" />, path: ROUTES.STUDENT.COURSE_REG },
                { label: 'Ballot Hostel', icon: <BedDouble size={18} className="text-[#20A8D8]" />, path: ROUTES.STUDENT.HOSTEL     },
                { label: 'Pay Fees',      icon: <CreditCard size={18} className="text-[#20A8D8]" />,path: ROUTES.STUDENT.PAYMENTS   },
                { label: 'Transcript',    icon: <Library   size={18} className="text-[#20A8D8]" />, path: ROUTES.STUDENT.RESULTS    },
              ].map(a => (
                <button
                  key={a.label}
                  onClick={() => navigate(a.path)}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-100 bg-gray-50/60 hover:border-[#20A8D8]/30 hover:bg-[#20A8D8]/5 transition-all text-center"
                >
                  {a.icon}
                  <span className="text-[11px] font-semibold text-gray-600 leading-snug">{a.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="text-sm font-bold text-gray-800 mb-2">Need Help?</h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">
              If you have any issues regarding portal access, payments or registration, please contact the ICT support desk.
            </p>
            <div className="flex flex-col gap-2">
              <a href="mailto:support@eduportal.edu" className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#20A8D8] transition-colors">
                <span className="w-6 h-6 rounded-full bg-[#20A8D8]/10 flex items-center justify-center text-[#20A8D8] flex-shrink-0 text-[10px]">✉</span>
                support@eduportal.edu
              </a>
              <a href="tel:+2348001234567" className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#20A8D8] transition-colors">
                <span className="w-6 h-6 rounded-full bg-[#20A8D8]/10 flex items-center justify-center text-[#20A8D8] flex-shrink-0 text-[10px]">📞</span>
                +234 800 123 4567
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnnCard = ({ ann }: { ann: typeof MOCK_ANNOUNCEMENTS[0] }) => {
  const s = CATEGORY_STYLES[ann.category] ?? CATEGORY_STYLES.General;
  return (
    <div className="flex gap-4 px-5 py-4 hover:bg-gray-50/60 transition-colors">
      <div
        className="flex-shrink-0 w-12 h-14 rounded-lg flex flex-col items-center justify-center text-white"
        style={{ background: 'linear-gradient(135deg, #20A8D8, #1a91bb)' }}
      >
        <span className="text-base font-bold leading-none">{ann.day}</span>
        <span className="text-[9px] font-semibold mt-1 opacity-80 tracking-wide">{ann.month}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold text-gray-800 leading-snug">{ann.title}</h3>
          <span className="flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: s.bg, color: s.text }}>
            {ann.category}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-1 mb-2">
          <span className="text-xs text-gray-400">👤 {ann.department}</span>
          <span className="text-xs text-gray-400">🕐 {ann.time}</span>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{ann.body}</p>
      </div>
    </div>
  );
};

const PBtn = ({ label, onClick, disabled }: { label: string; onClick: () => void; disabled: boolean }) => (
  <button onClick={onClick} disabled={disabled}
    className={cn('px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
      disabled ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
    )}>
    {label}
  </button>
);

const PNumBtn = ({ page, active, onClick }: { page: number; active: boolean; onClick: () => void }) => (
  <button onClick={onClick}
    className={cn('w-8 h-8 rounded-lg text-sm font-semibold transition-colors',
      active ? 'text-white' : 'text-gray-500 hover:bg-gray-100'
    )}
    style={active ? { backgroundColor: COLORS.primary } : {}}>
    {page}
  </button>
);

export default AllAnnouncementsPage;
