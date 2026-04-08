/**
 * Shared UI primitives for the Exam Officer portal.
 * Keeps individual pages lean — import only what you need.
 */
import { useRef, useEffect, useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/utils';
import { COLORS } from '@/constants/theme.constants';

// ─── Search bar ───────────────────────────────────────────────
interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}
export const SearchBar = memo(({ value, onChange, placeholder = 'Search...', className }: SearchBarProps) => (
  <div className={cn('relative', className)}>
    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#20A8D8] focus:ring-2 focus:ring-[#20A8D8]/20 bg-white transition-all"
    />
    {value && (
      <button onClick={() => onChange('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5">
        <X size={13} />
      </button>
    )}
  </div>
));
SearchBar.displayName = 'SearchBar';

// ─── Filter dropdown ──────────────────────────────────────────
interface FilterDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}
export const FilterDropdown = memo(({ label, options, value, onChange }: FilterDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 text-sm border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors bg-white whitespace-nowrap text-gray-600"
      >
        <Filter size={13} className="text-gray-400" />
        Filter By
        <ChevronDown size={13} className={cn('text-gray-400 transition-transform', open && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
            style={{ transformOrigin: 'top' }}
            transition={{ duration: 0.13 }}
            className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-gray-100 z-20 min-w-[160px] overflow-hidden"
          >
            <button
              onClick={() => { onChange(''); setOpen(false); }}
              className={cn('w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors', !value && 'text-[#20A8D8] font-semibold')}
            >
              {label}
            </button>
            {options.map(o => (
              <button key={o} onClick={() => { onChange(o); setOpen(false); }}
                className={cn('w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors', value === o && 'text-[#20A8D8] font-semibold')}
              >{o}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
FilterDropdown.displayName = 'FilterDropdown';

// ─── Semester badge ───────────────────────────────────────────
export const SemesterBadge = ({ semester }: { semester: string }) => (
  <span className={cn(
    'px-2.5 py-1 rounded-full text-xs font-semibold',
    semester === 'First' ? 'bg-[#20A8D8]/10 text-[#20A8D8]' : 'bg-purple-50 text-purple-600'
  )}>
    {semester}
  </span>
);

// ─── Status badge ─────────────────────────────────────────────
export const StatusBadge = ({ status }: { status: string }) => {
  const isCore = status === 'Core';
  return (
    <span className={cn('text-sm', isCore ? 'text-gray-700' : 'text-gray-500')}>
      {status}
    </span>
  );
};

// ─── Pagination ───────────────────────────────────────────────
interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}
export const Pagination = memo(({ page, totalPages, onChange }: PaginationProps) => {
  const pages: (number | '...')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1, 2, 3);
    if (page > 5) pages.push('...');
    if (page > 3 && page < totalPages - 2) pages.push(page);
    if (page < totalPages - 4) pages.push('...');
    pages.push(totalPages - 2, totalPages - 1, totalPages);
  }

  return (
    <div className="flex items-center justify-between">
      {/* Mobile */}
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
      {/* Desktop */}
      <div className="hidden md:flex items-center gap-2">
        <button onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-500 hover:text-gray-800 disabled:opacity-40 transition-colors">
          <ChevronLeft size={14} /> Previous
        </button>
        {pages.map((p, i) => (
          <button key={i} onClick={() => typeof p === 'number' && onChange(p)} disabled={p === '...'}
            className={cn('w-8 h-8 rounded-lg text-sm font-medium transition-colors',
              p === page ? 'bg-[#20A8D8] text-white' : 'text-gray-500 hover:bg-gray-100',
              p === '...' && 'cursor-default'
            )}>
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
Pagination.displayName = 'Pagination';

// ─── Empty state ──────────────────────────────────────────────
export const EmptyState = ({ message = 'No records found', sub = '' }: { message?: string; sub?: string }) => (
  <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
    <div className="relative mb-5">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
          <Search size={20} className="text-gray-400" />
        </div>
      </div>
    </div>
    <p className="font-semibold text-sm mb-1" style={{ color: COLORS.text.title }}>{message}</p>
    {sub && <p className="text-xs leading-relaxed max-w-[220px]" style={{ color: COLORS.text.muted }}>{sub}</p>}
  </div>
);

// ─── Page primary button ──────────────────────────────────────
export const PrimaryButton = memo(({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
  <motion.button
    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className="flex items-center gap-2 px-4 py-2.5 rounded-[4px] text-white text-sm font-semibold whitespace-nowrap"
    style={{ backgroundColor: COLORS.primary }}
  >
    {children}
  </motion.button>
));
PrimaryButton.displayName = 'PrimaryButton';

// ─── Table card wrapper ───────────────────────────────────────
export const TableCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden', className)}>
    {children}
  </div>
);

// ─── Icon action button (edit / delete) ───────────────────────
export const IconBtn = memo(({
  onClick, title, variant = 'default', children,
}: {
  onClick: () => void; title?: string; variant?: 'default' | 'danger'; children: React.ReactNode;
}) => (
  <button onClick={onClick} title={title}
    className={cn(
      'p-1.5 rounded-md transition-colors',
      variant === 'danger'
        ? 'text-gray-300 hover:text-red-500 hover:bg-red-50'
        : 'text-gray-300 hover:text-[#20A8D8] hover:bg-[#20A8D8]/10'
    )}>
    {children}
  </button>
));
IconBtn.displayName = 'IconBtn';

// ─── Confirm delete modal ─────────────────────────────────────
interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}
export const ConfirmModal = memo(({ isOpen, title, message, onConfirm, onCancel }: ConfirmModalProps) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]" onClick={onCancel} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4"
        >
          <h3 className="font-bold text-base mb-2" style={{ color: COLORS.text.title }}>{title}</h3>
          <p className="text-sm mb-6" style={{ color: COLORS.text.muted }}>{message}</p>
          <div className="flex gap-3">
            <button onClick={onCancel}
              className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button onClick={onConfirm}
              className="flex-1 py-2.5 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors">
              Delete
            </button>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
));
ConfirmModal.displayName = 'ConfirmModal';

// ─── Form field (used in drawers) ────────────────────────────
interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}
export const FormField = ({ label, children, required }: FormFieldProps) => (
  <div>
    <label className="block text-sm font-medium mb-1.5 text-gray-700">
      {label}{required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

// ─── Select field ─────────────────────────────────────────────
interface SelectFieldProps {
  placeholder?: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}
export const SelectField = memo(({ placeholder, options, value, onChange, disabled }: SelectFieldProps) => (
  <div className="relative">
    <select
      value={value} onChange={e => onChange(e.target.value)} disabled={disabled}
      className={cn(
        'w-full appearance-none px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm outline-none',
        'focus:border-[#20A8D8] focus:ring-2 focus:ring-[#20A8D8]/20 bg-white transition-all',
        disabled && 'opacity-50 cursor-not-allowed',
        value ? 'text-gray-800' : 'text-gray-400'
      )}
    >
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
    <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
));
SelectField.displayName = 'SelectField';

// ─── Text input field ─────────────────────────────────────────
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}
export const InputField = memo(({ error, className, ...props }: InputFieldProps) => (
  <div>
    <input
      {...props}
      className={cn(
        'w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none transition-all bg-white text-gray-800',
        error ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20' : 'border-gray-200 focus:border-[#20A8D8] focus:ring-2 focus:ring-[#20A8D8]/20',
        className
      )}
    />
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
));
InputField.displayName = 'InputField';
