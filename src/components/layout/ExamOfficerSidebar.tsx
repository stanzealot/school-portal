import { memo, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogOut, ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '@/utils';
import { COLORS } from '@/constants/theme.constants';
import { EXAM_OFFICER_NAV, type ExamNavItem } from '@/constants/exam-officer-nav.constants';
import { useAuthStore } from '@/store/auth.store';
import { useUIStore } from '@/store/ui.store';
import { ROUTES } from '@/constants/routes.constants';

export const EXAM_SIDEBAR_WIDTH = 260;

// ── Desktop sidebar ───────────────────────────────────────────
export const ExamOfficerSidebar = memo(() => (
  <aside
    className="hidden md:flex flex-col fixed inset-y-0 left-0 z-30 overflow-y-auto"
    style={{ width: EXAM_SIDEBAR_WIDTH, backgroundColor: COLORS.sidebar.bg }}
  >
    <SidebarContent />
  </aside>
));
ExamOfficerSidebar.displayName = 'ExamOfficerSidebar';

// ── Mobile drawer ─────────────────────────────────────────────
export const ExamOfficerMobileSidebar = memo(() => {
  const { mobileSidebarOpen, setMobileSidebarOpen } = useUIStore();
  return (
    <AnimatePresence>
      {mobileSidebarOpen && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <motion.aside
            key="drawer"
            initial={{ x: -EXAM_SIDEBAR_WIDTH }} animate={{ x: 0 }} exit={{ x: -EXAM_SIDEBAR_WIDTH }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 flex flex-col md:hidden overflow-y-auto"
            style={{ width: EXAM_SIDEBAR_WIDTH, backgroundColor: COLORS.sidebar.bg }}
          >
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>
            <SidebarContent />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
});
ExamOfficerMobileSidebar.displayName = 'ExamOfficerMobileSidebar';

// ── Shared sidebar content ─────────────────────────────────────
const SidebarContent = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { setMobileSidebarOpen } = useUIStore();
  const location = useLocation();

  // Which collapsible groups are open — auto-open active group
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => {
    const s = new Set<string>();
    EXAM_OFFICER_NAV.forEach(item => {
      if (item.children?.some(c => location.pathname.startsWith(c.path))) {
        s.add(item.label);
      }
    });
    return s;
  });

  const toggleGroup = (label: string) =>
    setOpenGroups(prev => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME, { replace: true });
  };

  const closeDrawer = () => setMobileSidebarOpen(false);

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b flex-shrink-0" style={{ borderColor: COLORS.sidebar.border }}>
        <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-white/10 flex items-center justify-center">
          <img src="/images/logo.png" alt="KSP crest" className="w-full h-full object-cover"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <span className="text-white font-bold text-xs hidden">KSP</span>
        </div>
        <span className="text-white font-semibold text-sm tracking-wide">Untitled UI</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
        {EXAM_OFFICER_NAV.map(item =>
          item.children ? (
            <CollapsibleGroup
              key={item.label}
              item={item}
              isOpen={openGroups.has(item.label)}
              onToggle={() => toggleGroup(item.label)}
              onChildClick={closeDrawer}
            />
          ) : (
            <NavItem key={item.path} item={item} onClick={closeDrawer} />
          )
        )}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-3 flex-shrink-0 border-t" style={{ borderColor: COLORS.sidebar.border }}>
        {/* Support link */}
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium mt-3 mb-2">
          <HelpCircle size={18} className="text-white/70" />
          Support
        </button>

        {/* User row */}
        <div className="flex items-center gap-2.5 px-2 py-2.5 border-t" style={{ borderColor: COLORS.sidebar.border }}>
          <div className="w-8 h-8 rounded-full bg-[#20A8D8]/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <img src={user?.avatar ?? ''} alt={user?.name ?? ''}
              className="w-full h-full object-cover"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            <span className="text-[#20A8D8] font-semibold text-xs">{user?.name?.charAt(0) ?? 'E'}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold truncate">{user?.name ?? 'Exam Officer'}</p>
            <p className="text-white/50 text-[11px] truncate">{user?.email ?? ''}</p>
          </div>
          <button onClick={handleLogout} title="Sign out"
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0">
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Plain nav item ────────────────────────────────────────────
const NavItem = ({ item, onClick }: { item: ExamNavItem; onClick?: () => void }) => {
  const Icon = item.icon;
  return (
    <NavLink to={item.path!} onClick={onClick}
      className={({ isActive }) => cn(
        'relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
        isActive ? 'text-white' : 'text-white/60 hover:text-white hover:bg-white/5'
      )}
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.div layoutId="exam-sidebar-active"
              className="absolute inset-0 rounded-lg"
              style={{ backgroundColor: COLORS.sidebar.active }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }} />
          )}
          <Icon size={18} className={cn('relative z-10 flex-shrink-0', isActive ? 'text-white' : 'text-white/70')} />
          <span className="relative z-10">{item.label}</span>
          {isActive && (
            <motion.div layoutId="exam-sidebar-dot"
              className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white/80"
              transition={{ type: 'spring', stiffness: 400, damping: 35 }} />
          )}
        </>
      )}
    </NavLink>
  );
};

// ── Collapsible group ─────────────────────────────────────────
interface CollapsibleGroupProps {
  item: ExamNavItem;
  isOpen: boolean;
  onToggle: () => void;
  onChildClick?: () => void;
}

const CollapsibleGroup = ({ item, isOpen, onToggle, onChildClick }: CollapsibleGroupProps) => {
  const Icon = item.icon;
  const location = useLocation();
  const isGroupActive = item.children?.some(c => location.pathname.startsWith(c.path));

  return (
    <div>
      {/* Group header button */}
      <button onClick={onToggle}
        className={cn(
          'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
          isGroupActive ? 'text-white bg-[#20A8D8]' : 'text-white/60 hover:text-white hover:bg-white/5'
        )}
      >
        <Icon size={18} className={cn('flex-shrink-0', isGroupActive ? 'text-white' : 'text-white/70')} />
        <span className="flex-1 text-left">{item.label}</span>
        <ChevronDown size={15} className={cn('transition-transform duration-200 text-white/60', isOpen && 'rotate-180')} />
      </button>

      {/* Children */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="ml-4 pl-3 border-l border-white/10 mt-0.5 flex flex-col gap-0.5 pb-1">
              {item.children!.map(child => (
                <NavLink
                  key={child.path}
                  to={child.path}
                  onClick={onChildClick}
                  className={({ isActive }) => cn(
                    'block px-3 py-2 rounded-lg text-sm transition-colors duration-150',
                    isActive
                      ? 'text-[#20A8D8] font-semibold bg-white/8'
                      : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                  )}
                  style={({ isActive }) => isActive ? { backgroundColor: 'rgba(255,255,255,0.06)' } : {}}
                >
                  {child.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
