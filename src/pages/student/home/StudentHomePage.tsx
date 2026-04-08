import { useNavigate } from 'react-router-dom';
import {
  FileText, BedDouble, CreditCard,
  BadgeCheck, BookMarked, Library, Pencil,
} from 'lucide-react';
import { MOCK_STUDENT, MOCK_ANNOUNCEMENTS, PORTAL_INSTRUCTIONS } from '@/constants/student-mock.data';
import { ROUTES } from '@/constants/routes.constants';
import { COLORS } from '@/constants/theme.constants';

// ── Quick action icon map ────────────────────────────────────────
const QAIcon = ({ type, size = 20 }: { type: string; size?: number }) => {
  const cls = 'text-[#20A8D8]';
  switch (type) {
    case 'course-reg':  return <FileText  size={size} className={cls} />;
    case 'hostel':      return <BedDouble size={size} className={cls} />;
    case 'payment':     return <CreditCard size={size} className={cls} />;
    case 'id-card':     return <BadgeCheck size={size} className={cls} />;
    case 'exam-docket': return <BookMarked size={size} className={cls} />;
    case 'transcript':  return <Library   size={size} className={cls} />;
    default:            return <FileText  size={size} className={cls} />;
  }
};

const QUICK_ACTIONS = [
  { label: 'Course Registration', icon: 'course-reg',  path: ROUTES.STUDENT.COURSE_REG },
  { label: 'Ballot Hostel',       icon: 'hostel',       path: ROUTES.STUDENT.HOSTEL     },
  { label: 'Pay School Fees',     icon: 'payment',      path: ROUTES.STUDENT.PAYMENTS   },
  { label: 'Print ID Card Form',  icon: 'id-card',      path: '/student/documents/id-card-form'      },
  { label: 'Exam Docket',         icon: 'exam-docket',  path: '/student/documents/exam-docket'       },
  { label: 'Result Transcript',   icon: 'transcript',   path: ROUTES.STUDENT.RESULTS    },
];

// ── Home page ────────────────────────────────────────────────────
const StudentHomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="py-5">
      {/* Mobile page title */}
      <div className="md:hidden mb-4">
        <h1 className="text-xl font-bold text-gray-800">Student Portal</h1>
        <p className="text-xs text-gray-400 mt-0.5">Academic Session 2024/2025</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* ── Left column ── */}
        <div className="flex-1 flex flex-col gap-5 min-w-0">
          <ProfileCard />
          <QuickActionsCard />
        </div>

        {/* ── Right column ── */}
        <div className="lg:w-[340px] flex flex-col gap-5 flex-shrink-0">
          {/* Announcements */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <h2 className="text-base font-bold text-gray-800">Announcements</h2>
              <button
                onClick={() => navigate(ROUTES.STUDENT.ANNOUNCEMENTS)}
                className="text-sm font-semibold"
                style={{ color: COLORS.primary }}
              >
                View All
              </button>
            </div>
            <div className="divide-y divide-gray-50 px-4 pb-4">
              {MOCK_ANNOUNCEMENTS.slice(0, 4).map(ann => (
                <AnnouncementRow key={ann.id} ann={ann} />
              ))}
            </div>
          </div>

          {/* Portal Instructions */}
          <PortalInstructionsCard />
        </div>
      </div>
    </div>
  );
};

// ── Profile card ─────────────────────────────────────────────────
const ProfileCard = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex items-start gap-4 mb-5 pb-5 border-b border-gray-50">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
          <img
            src={MOCK_STUDENT.avatar}
            alt={MOCK_STUDENT.fullName}
            className="w-full h-full object-cover"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-gray-800 leading-tight">{MOCK_STUDENT.fullName}</h2>
              <p className="text-sm text-gray-500 mt-0.5">{MOCK_STUDENT.programme}</p>
              <span className="inline-flex items-center mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-600">
                {MOCK_STUDENT.status}
              </span>
            </div>
            <button
              onClick={() => navigate(ROUTES.STUDENT.SETTINGS)}
              className="hidden md:flex items-center gap-1.5 text-xs font-semibold flex-shrink-0"
              style={{ color: COLORS.primary }}
            >
              <Pencil size={13} />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        <InfoField label="Matriculation Number" value={MOCK_STUDENT.matricNumber} />
        <InfoField label="Faculty"               value={MOCK_STUDENT.faculty}      />
        <InfoField label="Current Level"         value={MOCK_STUDENT.level}        />
        <InfoField label="Semester"              value={MOCK_STUDENT.semester}     />
        <InfoField label="Email Address"         value={MOCK_STUDENT.email}        />
        <InfoField label="Date of Birth"         value={MOCK_STUDENT.dateOfBirth}  />
      </div>
    </div>
  );
};

const InfoField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-gray-400 mb-0.5">{label}</p>
    <p className="text-sm font-semibold text-gray-800">{value}</p>
  </div>
);

// ── Quick actions card ────────────────────────────────────────────
const QuickActionsCard = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <h2 className="text-base font-bold text-gray-800 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {QUICK_ACTIONS.map(action => (
          <button
            key={action.label}
            onClick={() => navigate(action.path)}
            className="flex flex-col items-center justify-center gap-2.5 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:border-[#20A8D8]/30 hover:bg-[#20A8D8]/5 transition-all duration-200 text-center group"
          >
            <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center group-hover:border-[#20A8D8]/20 transition-colors shadow-sm">
              <QAIcon type={action.icon} />
            </div>
            <span className="text-xs font-semibold text-gray-600 leading-snug">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// ── Announcement row ──────────────────────────────────────────────
const AnnouncementRow = ({ ann }: { ann: typeof MOCK_ANNOUNCEMENTS[0] }) => (
  <div className="flex gap-3 py-3">
    <div
      className="flex-shrink-0 w-11 rounded-lg flex flex-col items-center justify-center py-1.5 text-white"
      style={{ background: 'linear-gradient(135deg, #20A8D8, #1a91bb)' }}
    >
      <span className="text-sm font-bold leading-none">{ann.day}</span>
      <span className="text-[9px] font-semibold mt-0.5 opacity-80 tracking-wide">{ann.month}</span>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-gray-800 leading-snug truncate">{ann.title}</p>
      <p className="text-xs text-gray-400 mt-0.5 line-clamp-2 leading-relaxed">{ann.body}</p>
    </div>
  </div>
);

// ── Portal instructions card ──────────────────────────────────────
const PortalInstructionsCard = () => (
  <div className="rounded-xl p-5 text-white" style={{ backgroundColor: '#1D3A4A' }}>
    <h2 className="text-base font-bold mb-4">Portal Instructions</h2>
    <div className="flex flex-col gap-3">
      {PORTAL_INSTRUCTIONS.map(inst => (
        <div key={inst.step} className="flex gap-3">
          <div
            className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-[#1D3A4A]"
            style={{ backgroundColor: COLORS.primary }}
          >
            {inst.step}
          </div>
          <p className="text-sm text-white/80 leading-relaxed">
            {inst.bold
              ? (() => {
                  const parts = inst.text.split(inst.bold);
                  return (
                    <>{parts[0]}<strong className="text-white font-semibold">{inst.bold}</strong>{parts[1]}</>
                  );
                })()
              : inst.text}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default StudentHomePage;
