import { memo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogOut } from 'lucide-react';
import { cn } from '@/utils';
import { COLORS } from '@/constants/theme.constants';
import { STUDENT_NAV_ITEMS } from '@/constants/student-nav.constants';
import { useAuthStore } from '@/store/auth.store';
import { useUIStore } from '@/store/ui.store';
import { ROUTES } from '@/constants/routes.constants';
import { MOCK_STUDENT } from '@/constants/student-mock.data';
import type { NavItem } from '@/types';

export const STUDENT_SIDEBAR_WIDTH = 260;

// ── Desktop sidebar ───────────────────────────────────────────────
export const StudentSidebar = memo(() => (
  <aside
    className="hidden md:flex flex-col fixed inset-y-0 left-0 z-30 overflow-y-auto border-r border-gray-200"
    style={{ width: STUDENT_SIDEBAR_WIDTH, backgroundColor: '#FFFFFF' }}
  >
    <SidebarContent />
  </aside>
));
StudentSidebar.displayName = 'StudentSidebar';

// ── Mobile drawer ─────────────────────────────────────────────────
export const StudentMobileSidebar = memo(() => {
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
            initial={{ x: -STUDENT_SIDEBAR_WIDTH }}
            animate={{ x: 0 }}
            exit={{ x: -STUDENT_SIDEBAR_WIDTH }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 flex flex-col md:hidden overflow-y-auto border-r border-gray-200"
            style={{ width: STUDENT_SIDEBAR_WIDTH, backgroundColor: '#FFFFFF' }}
          >
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
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
StudentMobileSidebar.displayName = 'StudentMobileSidebar';

// ── Shared sidebar content ────────────────────────────────────────
const SidebarContent = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const { setMobileSidebarOpen } = useUIStore();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME, { replace: true });
  };

  const closeDrawer = () => setMobileSidebarOpen(false);

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100 flex-shrink-0">
        <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
          <img
            src="/images/logo.png"
            alt="KSP"
            className="w-full h-full object-cover"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-gray-800 truncate leading-tight">Kogi State Poly</p>
          <p className="text-[11px] text-gray-400 truncate">Student Portal</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
        {STUDENT_NAV_ITEMS.map(item => (
          <StudentNavItem key={item.path} item={item} onClick={closeDrawer} />
        ))}
      </nav>

      {/* Bottom: student info + logout */}
      <div className="px-3 pb-4 flex-shrink-0 border-t border-gray-100">
        <div className="flex items-center gap-2.5 px-2 py-3">
          <div className="w-8 h-8 rounded-full bg-[#20A8D8]/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <img
              src={MOCK_STUDENT.avatar}
              alt={MOCK_STUDENT.fullName}
              className="w-full h-full object-cover"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <span className="text-[#20A8D8] font-semibold text-xs">
              {MOCK_STUDENT.fullName.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-gray-800 text-xs font-semibold truncate">{MOCK_STUDENT.fullName}</p>
            <p className="text-gray-400 text-[11px] truncate">{MOCK_STUDENT.matricNumber}</p>
          </div>
          <button
            onClick={handleLogout}
            title="Sign out"
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors flex-shrink-0"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Nav item ──────────────────────────────────────────────────────
const StudentNavItem = ({ item, onClick }: { item: NavItem; onClick?: () => void }) => {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.path}
      onClick={onClick}
      className={({ isActive }) => cn(
        'relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
        isActive ? 'text-white' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
      )}
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.div
              layoutId="student-sidebar-active"
              className="absolute inset-0 rounded-lg"
              style={{ backgroundColor: COLORS.primary }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            />
          )}
          <Icon
            size={18}
            className={cn('relative z-10 flex-shrink-0', isActive ? 'text-white' : 'text-gray-400')}
          />
          <span className="relative z-10">{item.label}</span>
        </>
      )}
    </NavLink>
  );
};
