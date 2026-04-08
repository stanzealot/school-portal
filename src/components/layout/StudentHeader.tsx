import { memo, useState, useRef, useEffect } from 'react';
import { Menu, Bell, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '@/store/ui.store';
import { useAuthStore } from '@/store/auth.store';
import { ROUTES } from '@/constants/routes.constants';
import { MOCK_STUDENT } from '@/constants/student-mock.data';

export const STUDENT_HEADER_HEIGHT_MOBILE  = 64;
export const STUDENT_HEADER_HEIGHT_DESKTOP = 72;

export const StudentHeader = memo(() => {
  const { toggleMobileSidebar } = useUIStore();
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME, { replace: true });
  };

  const firstName = MOCK_STUDENT.fullName.split(' ')[0];
  const initials  = MOCK_STUDENT.fullName.split(' ').map(n => n[0]).slice(0, 2).join('');

  return (
    <header
      className="student-portal-header fixed top-0 right-0 z-20 bg-white border-b border-gray-100"
      style={{ left: 0, height: STUDENT_HEADER_HEIGHT_MOBILE }}
    >
      <div className="h-full w-full px-4 md:px-6 lg:px-8 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={toggleMobileSidebar}
            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors flex-shrink-0"
          >
            <Menu size={20} />
          </button>

          {/* Mobile: logo */}
          <div className="md:hidden flex items-center gap-2">
            <img
              src="/images/logo.png"
              alt="KSP"
              className="w-7 h-7 object-contain flex-shrink-0"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <span className="text-sm font-bold text-gray-800">Student Portal</span>
          </div>

          {/* Desktop: portal title */}
          <div className="hidden md:block">
            <h1 className="text-lg font-bold text-gray-800 leading-tight">Student Portal</h1>
            <p className="text-xs text-gray-400 mt-0.5">Academic Session 2024/2025</p>
          </div>
        </div>

        {/* Right: bell + avatar */}
        <div className="flex items-center gap-2 md:gap-3">
          <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
            <Bell size={19} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
          </button>

          <div className="relative" ref={dropRef}>
            <button
              onClick={() => setDropdownOpen(v => !v)}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-[#20A8D8]/15 flex items-center justify-center flex-shrink-0">
                <img
                  src={MOCK_STUDENT.avatar}
                  alt={MOCK_STUDENT.fullName}
                  className="w-full h-full object-cover"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <span className="text-[#20A8D8] font-bold text-xs">{initials}</span>
              </div>
              <span className="hidden sm:block text-sm font-semibold text-gray-700 max-w-[80px] truncate">
                {firstName} A.
              </span>
              <ChevronDown
                size={14}
                className={`text-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50">
                <div className="px-3.5 py-2.5 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800 truncate">{MOCK_STUDENT.fullName}</p>
                  <p className="text-xs text-gray-400 truncate">{MOCK_STUDENT.email}</p>
                </div>
                <button
                  onClick={() => { navigate(ROUTES.STUDENT.SETTINGS); setDropdownOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <User size={15} className="text-gray-400" />
                  My Profile
                </button>
                <button
                  onClick={() => { navigate(ROUTES.STUDENT.SETTINGS); setDropdownOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <Settings size={15} className="text-gray-400" />
                  Settings
                </button>
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={15} />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
});
StudentHeader.displayName = 'StudentHeader';
