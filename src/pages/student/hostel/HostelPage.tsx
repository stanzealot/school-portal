import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, CheckCircle2, XCircle, HelpCircle, X, ArrowRight, Lock } from 'lucide-react';
import { ROUTES } from '@/constants/routes.constants';
import { cn } from '@/utils';

// ─── Types ───────────────────────────────────────────────────────
type HostelState = 'idle' | 'balloting' | 'success' | 'failed';

interface Hostel {
  id: string;
  name: string;
  type: string;
  block: string;
  studentsPerRoom: number;
  totalRooms: number;
  totalBedspace: number;
  occupiedRooms: number;
  availableRooms: number;
  fee: number;
  status: 'Available' | 'Filled';
  tags: string[];
}

// ─── Mock data ────────────────────────────────────────────────────
const HOSTELS: Hostel[] = [
  {
    id: 'queen-amina',
    name: 'Queen Amina Hostel',
    type: 'Female hostel',
    block: 'Block A',
    studentsPerRoom: 4,
    totalRooms: 48,
    totalBedspace: 192,
    occupiedRooms: 124,
    availableRooms: 68,
    fee: 48_000,
    status: 'Available',
    tags: ['Near lecture halls', 'Water included', '24/7 security'],
  },
  {
    id: 'unity',
    name: 'Unity Hostel',
    type: 'Male hostel',
    block: 'Block C',
    studentsPerRoom: 6,
    totalRooms: 48,
    totalBedspace: 192,
    occupiedRooms: 124,
    availableRooms: 68,
    fee: 36_500,
    status: 'Available',
    tags: ['Affordable option', 'Shared kitchen', 'Power backup'],
  },
  {
    id: 'nile-court',
    name: 'Nile Court Hostel',
    type: 'Female hostel',
    block: 'Annex',
    studentsPerRoom: 3,
    totalRooms: 48,
    totalBedspace: 192,
    occupiedRooms: 124,
    availableRooms: 68,
    fee: 55_000,
    status: 'Available',
    tags: ['Smaller room size', 'Reading area'],
  },
  {
    id: 'independence',
    name: 'Independence Hall',
    type: 'Male hostel',
    block: 'Block B',
    studentsPerRoom: 8,
    totalRooms: 48,
    totalBedspace: 192,
    occupiedRooms: 192,
    availableRooms: 0,
    fee: 30_000,
    status: 'Filled',
    tags: ['Budget friendly', 'Large common room'],
  },
];

const GUIDELINES = [
  'Entering the ballot does not guarantee that you have been allocated a space in the hostel',
  'By entering the ballot you have given yourself a chance to allocated a bed space',
  { text: 'This Ballot is transparent and the technique used in selection is called ', bold: 'First Come First Serve(FIFS) technique' },
  'If you are selected it should be noted that payment should be made in 48 hours else your Bed Space will be reallocated to someone else...',
  'Squating, re-selling and re-allocating your Bed space is Prohibited.',
  'Violating any of the above terms will lead to withdrawal of Admission with immediate effect',
];

const HOSTEL_RULES = [
  'Keep your room and surroundings clean.',
  'Follow hostel curfew and access rules.',
  'Avoid noise and respect other residents.',
  'Handle hostel property with care.',
  'No unauthorized visitors allowed.',
];

// ─── Main Page ────────────────────────────────────────────────────
const HostelPage = () => {
  const [state, setState] = useState<HostelState>('idle');
  const [progress, setProgress] = useState(0);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const navigate = useNavigate();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Simulate ballot progress then resolve to success (deterministic for demo)
  const startBallot = () => {
    setState('balloting');
    setProgress(0);

    let current = 0;
    timerRef.current = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 3; // 3–10% per tick
      if (current >= 100) {
        current = 100;
        clearInterval(timerRef.current!);
        // resolve after a brief pause at 100%
        setTimeout(() => setState('success'), 600);
      }
      setProgress(current);
    }, 280);
  };

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <div className="py-5">
      {/* Page header */}
      <div className="bg-white rounded-xl border border-gray-100 px-5 py-4 mb-5">
        <h1 className="text-xl font-bold text-gray-800">Hostel Accommodation</h1>
        <p className="text-sm text-gray-400 mt-0.5">Manage your hostel reservation and stay details.</p>
      </div>

      <AnimatePresence mode="wait">
        {state === 'idle' && (
          <motion.div key="idle" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <IdleView onProceed={startBallot} />
          </motion.div>
        )}

        {state === 'balloting' && (
          <motion.div key="balloting" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <BallotingView progress={progress} />
          </motion.div>
        )}

        {state === 'success' && (
          <motion.div key="success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <SuccessView
              onSelectHostel={(hostel) =>
                navigate(ROUTES.STUDENT.HOSTEL_PAYMENT, { state: { hostel } })
              }
              onViewGuidelines={() => setShowGuidelines(true)}
            />
          </motion.div>
        )}

        {state === 'failed' && (
          <motion.div key="failed" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <FailedView onViewGuidelines={() => setShowGuidelines(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hostel Guidelines Modal */}
      <GuidelinesModal isOpen={showGuidelines} onClose={() => setShowGuidelines(false)} />
    </div>
  );
};

// ─── Idle View ────────────────────────────────────────────────────
const IdleView = ({ onProceed }: { onProceed: () => void }) => (
  <div className="flex flex-col gap-5">
    {/* Main CTA card */}
    <div className="bg-white rounded-xl border border-gray-100 py-16 px-8 flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
        <Home size={36} className="text-gray-400" />
      </div>
      <h2 className="text-lg font-bold text-gray-800 mb-2">Ready to secure your accommodation?</h2>
      <p className="text-sm text-gray-500 max-w-md leading-relaxed mb-8">
        You have not balloted for a hostel space yet. Ensure your school fees are fully paid or the required percentage is met before proceeding to ballot.
      </p>
      <button
        onClick={onProceed}
        className="inline-flex items-center gap-2.5 px-8 py-3 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-all"
        style={{ backgroundColor: '#20A8D8' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 4v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
        Proceed to Ballot
      </button>
    </div>

    {/* Guidelines */}
    <GuidelinesCard />
  </div>
);

// ─── Balloting View ───────────────────────────────────────────────
const BallotingView = ({ progress }: { progress: number }) => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="bg-white rounded-2xl border border-gray-100 p-10 w-full max-w-lg text-center shadow-sm">
      {/* Spinner */}
      <div className="w-16 h-16 rounded-full border-4 border-gray-100 border-t-[#20A8D8] animate-spin mx-auto mb-6" />
      <h2 className="text-xl font-bold text-gray-800 mb-3">Balloting in Progress...</h2>
      <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-sm mx-auto">
        Please wait while we process your request and check for available accommodation spaces. Do not refresh or close this page, this might take a few moments.
      </p>
      {/* Progress bar */}
      <div className="bg-gray-100 rounded-full h-2 overflow-hidden mb-2">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: '#20A8D8' }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: 'easeOut', duration: 0.3 }}
        />
      </div>
      <p className="text-xs text-gray-400">Processing your request ({progress}%)</p>
    </div>
  </div>
);

// ─── Success View ─────────────────────────────────────────────────
const SuccessView = ({
  onSelectHostel,
  onViewGuidelines,
}: {
  onSelectHostel: (hostel: Hostel) => void;
  onViewGuidelines: () => void;
}) => (
  <div className="flex flex-col gap-5">
    {/* Success banner */}
    <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <CheckCircle2 size={22} className="text-green-500 flex-shrink-0" />
        <div>
          <p className="text-sm font-bold text-gray-800">Ballot completed successfully</p>
          <p className="text-xs text-gray-500 mt-0.5">
            Available hostel spaces have been released. Select your preferred hostel below to continue.
          </p>
        </div>
      </div>
      <span className="flex-shrink-0 px-3 py-1.5 rounded-lg border border-green-300 text-xs font-semibold text-green-700 bg-white whitespace-nowrap">
        Hostel allocation open
      </span>
    </div>

    <div className="flex flex-col lg:flex-row gap-5">
      {/* Left: hostel cards */}
      <div className="flex-1 min-w-0">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Choose your preferred hostel</h2>
              <p className="text-sm text-gray-500 mt-1 max-w-md leading-relaxed">
                Your balloting request has been approved and hostel spaces are now available for selection. Review the options, compare prices and bed-space details, then proceed with the hostel you prefer most.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl px-5 py-3 text-center flex-shrink-0">
              <p className="text-xs text-gray-400 mb-0.5">Available hostels</p>
              <p className="text-2xl font-bold text-gray-800">4 options</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HOSTELS.map(hostel => (
              <HostelCard key={hostel.id} hostel={hostel} onSelect={() => onSelectHostel(hostel)} />
            ))}
          </div>
        </div>
      </div>

      {/* Right: ballot summary sidebar */}
      <BallotSidebar
        status="Awaiting hostel choice"
        selectionWindow="Closes in 24 hours"
        onViewGuidelines={onViewGuidelines}
        nextStep="After selecting a hostel, you will be redirected to the accommodation payment page to complete your reservation."
      />
    </div>
  </div>
);

// ─── Hostel card ──────────────────────────────────────────────────
const HostelCard = ({ hostel, onSelect }: { hostel: Hostel; onSelect: () => void }) => {
  const isFilled = hostel.status === 'Filled';
  return (
    <div className={cn(
      'rounded-xl border p-4 flex flex-col gap-3 transition-all',
      isFilled ? 'border-gray-200 bg-gray-50/50 opacity-75' : 'border-gray-200 hover:border-[#20A8D8]/30 hover:shadow-sm'
    )}>
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-bold text-gray-800 leading-snug">{hostel.name}</h3>
        <span className={cn(
          'flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold',
          isFilled ? 'bg-gray-100 text-gray-500' : 'bg-green-50 text-green-600'
        )}>
          {hostel.status}
        </span>
      </div>

      {/* Stats chips */}
      <div className="flex flex-wrap gap-1.5">
        {[
          `Total Rooms: ${hostel.totalRooms}`,
          `Total Bedspace: ${hostel.totalBedspace}`,
          `Occupied Rooms: ${hostel.occupiedRooms}`,
          `Available Rooms: ${hostel.availableRooms}`,
        ].map(label => (
          <span key={label} className="px-2.5 py-1 rounded-lg bg-gray-100 text-xs text-gray-600 font-medium">
            {label}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-1">
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Accommodation fee</p>
          <p className="text-lg font-bold text-gray-800">₦{hostel.fee.toLocaleString()}</p>
        </div>
        <button
          onClick={onSelect}
          disabled={isFilled}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all',
            isFilled
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-[#20A8D8] hover:opacity-90'
          )}
        >
          Select hostel
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

// ─── Failed View ──────────────────────────────────────────────────
const FailedView = ({ onViewGuidelines }: { onViewGuidelines: () => void }) => (
  <div className="flex flex-col gap-5">
    {/* Error banner */}
    <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <XCircle size={22} className="text-red-500 flex-shrink-0" />
        <div>
          <p className="text-sm font-bold text-red-700">Balloting was not successful</p>
          <p className="text-xs text-red-500 mt-0.5">
            No hostel space was allocated to your profile in this ballot cycle. Balloting is now closed for this session.
          </p>
        </div>
      </div>
      <span className="flex-shrink-0 px-3 py-1.5 rounded-lg border border-red-200 text-xs font-semibold text-red-600 bg-white whitespace-nowrap">
        Ballot closed
      </span>
    </div>

    <div className="flex flex-col lg:flex-row gap-5">
      {/* Left: content */}
      <div className="flex-1 min-w-0 bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          You can no longer ballot for accommodation
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          Your hostel ballot attempt did not return any available space, and the balloting window has now ended. You will not be able to submit another ballot request from this page.
        </p>

        <h3 className="text-sm font-bold text-gray-800 mb-3">What to do next</h3>
        <div className="flex flex-col gap-3">
          {[
            'Monitor portal updates: Check the hostel accommodation page and student announcements for any supplementary allocation notice.',
            'Keep your documents ready: If another accommodation round opens, ensure your school fee receipt and student records are available for quick processing.',
            'Reach out for support: Students needing urgent accommodation guidance should contact the accommodation unit or student affairs office.',
          ].map((text, i) => (
            <p key={i} className="text-sm text-gray-600 leading-relaxed">
              <span className="font-semibold">{i + 1}.</span> {text}
            </p>
          ))}
        </div>
      </div>

      {/* Right: ballot summary sidebar (closed state) */}
      <BallotSidebar
        status="No hostel allocated"
        selectionWindow="Closed"
        onViewGuidelines={onViewGuidelines}
      />
    </div>
  </div>
);

// ─── Ballot Summary Sidebar ───────────────────────────────────────
const BallotSidebar = ({
  status, selectionWindow, onViewGuidelines, nextStep,
}: {
  status: string;
  selectionWindow: string;
  onViewGuidelines: () => void;
  nextStep?: string;
}) => (
  <div className="lg:w-[300px] flex-shrink-0 flex flex-col gap-4">
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <h3 className="text-base font-bold text-gray-800 mb-4">Ballot summary</h3>
      <div className="flex flex-col gap-3 divide-y divide-gray-50">
        {[
          { label: 'Student category', value: 'Returning student' },
          { label: 'Gender filter',    value: 'Male'              },
          { label: 'Selection window', value: selectionWindow     },
          { label: 'Current status',   value: status              },
        ].map(row => (
          <div key={row.label} className="flex items-start justify-between gap-2 pt-3 first:pt-0">
            <span className="text-sm text-gray-400">{row.label}</span>
            <span className="text-sm font-semibold text-gray-800 text-right">{row.value}</span>
          </div>
        ))}
      </div>

      {/* Next step box */}
      {nextStep && (
        <div className="mt-4 rounded-xl p-4 text-white text-xs leading-relaxed" style={{ backgroundColor: '#1D3A4A' }}>
          <p className="font-bold mb-1">Next step</p>
          <p className="opacity-80">{nextStep}</p>
        </div>
      )}
    </div>

    {/* View guidelines link */}
    <button
      onClick={onViewGuidelines}
      className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl border border-gray-100 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
    >
      <HelpCircle size={16} className="text-gray-400" />
      View hostel guidelines
    </button>
  </div>
);

// ─── Guidelines Card (idle view) ──────────────────────────────────
const GuidelinesCard = () => (
  <div className="bg-white rounded-xl border border-gray-100 p-5">
    <div className="flex items-center gap-2.5 mb-4 pb-4 border-b border-gray-50">
      <div className="w-6 h-6 rounded-full border-2 border-[#20A8D8] flex items-center justify-center flex-shrink-0">
        <span className="text-[#20A8D8] text-xs font-bold">i</span>
      </div>
      <h2 className="text-sm font-bold text-gray-800">Guidelines to entering ballot</h2>
    </div>
    <div className="flex flex-col gap-0 divide-y divide-gray-50">
      {GUIDELINES.map((item, i) => (
        <div key={i} className="flex gap-4 py-3.5">
          <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-500 flex-shrink-0 mt-0.5">
            {i + 1}
          </span>
          <p className="text-sm text-gray-600 leading-relaxed">
            {typeof item === 'string'
              ? item
              : <>{item.text}<strong className="text-gray-800 font-bold">{item.bold}</strong></>
            }
          </p>
        </div>
      ))}
    </div>
  </div>
);

// ─── Hostel Guidelines Modal ──────────────────────────────────────
const GuidelinesModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10">
        <button onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
          <X size={18} />
        </button>
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Hostel Guideline</h2>
        </div>
        <ul className="px-6 py-5 flex flex-col gap-3">
          {HOSTEL_RULES.map((rule, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
              {rule}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HostelPage;
