import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, CreditCard, ExternalLink, Download } from 'lucide-react';
import { ROUTES } from '@/constants/routes.constants';
import { cn } from '@/utils';

// ─── Mock payment history ─────────────────────────────────────────
const PAYMENT_HISTORY = [
  { sn: 1, type: 'Acceptance Fee',       amount: 35_000,  ref: '283749201928', date: '12 Oct 2024', status: 'Paid'    },
  { sn: 2, type: 'Processing Fee',       amount: 15_000,  ref: '283749201929', date: '15 Oct 2024', status: 'Pending' },
  { sn: 3, type: 'Registration Fee',     amount: 50_000,  ref: '283749201930', date: '20 Oct 2024', status: 'Paid'    },
  { sn: 4, type: 'Membership Fee',       amount: 20_000,  ref: '283749201931', date: '25 Oct 2024', status: 'Paid'    },
  { sn: 5, type: 'Renewal Fee',          amount: 40_000,  ref: '283749201932', date: '30 Oct 2024', status: 'Paid'    },
  { sn: 6, type: 'School Fee',           amount: 120_000, ref: '283749201932', date: '30 Oct 2024', status: 'Paid'    },
  { sn: 7, type: 'Hostel Accommodation', amount: 49_500,  ref: '283749201932', date: '30 Oct 2024', status: 'Pending' },
];

// ─── Payment categories ───────────────────────────────────────────
const PAYMENT_CARDS = [
  {
    icon: <BookOpen size={28} className="text-[#20A8D8]" />,
    title: 'School Fees',
    description: 'Click here to Pay your tuition and standard academic charges for the current session.',
    route: ROUTES.STUDENT.PAYMENTS_SCHOOL_FEES,
  },
  {
    icon: <Users size={28} className="text-[#20A8D8]" />,
    title: 'Departmental Dues',
    description: 'Pay your mandatory faculty and departmental association dues.',
    route: ROUTES.STUDENT.PAYMENTS_DEPARTMENTAL,
  },
  {
    icon: <CreditCard size={28} className="text-[#20A8D8]" />,
    title: 'Other Payments',
    description: 'Acceptance fees, medical fees, library fines, and more.',
    route: ROUTES.STUDENT.PAYMENTS_OTHER,
  },
];

const PaymentsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="py-5 flex flex-col gap-5">
      {/* Page header */}
      <div className="bg-white rounded-xl border border-gray-100 px-5 py-4">
        <h1 className="text-xl font-bold text-gray-800">Payments</h1>
        <p className="text-sm text-gray-400 mt-0.5 max-w-lg">
          Manage your school fees, accommodation, departmental dues, and view your payment history seamlessly.
        </p>
      </div>

      {/* Make a Payment */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h2 className="text-sm font-bold text-gray-800 mb-4">Make a Payment</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PAYMENT_CARDS.map(card => (
            <PaymentCard
              key={card.title}
              icon={card.icon}
              title={card.title}
              description={card.description}
              onOpen={() => navigate(card.route)}
            />
          ))}
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-bold text-gray-800">Payment History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#1D3A4A' }}>
                <th className="px-5 py-3 text-left text-xs font-semibold text-white w-12">S/N</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-white">Payment Type</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-white">Amount (₦)</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-white">Reference (RRR)</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-white">Date Generated</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-white">Status</th>
                <th className="px-5 py-3 w-28" />
              </tr>
            </thead>
            <tbody>
              {PAYMENT_HISTORY.map((row, idx) => (
                <tr
                  key={row.sn}
                  className={cn(
                    'border-b border-gray-50 hover:bg-gray-50/50 transition-colors',
                    idx % 2 === 1 && 'bg-gray-50/30'
                  )}
                >
                  <td className="px-5 py-3 text-gray-400 text-sm">{row.sn}</td>
                  <td className="px-5 py-3 text-gray-700 text-sm">{row.type}</td>
                  <td className="px-5 py-3 text-gray-700 text-sm">{row.amount.toLocaleString()}.00</td>
                  <td className="px-5 py-3 text-gray-600 text-sm font-mono">{row.ref}</td>
                  <td className="px-5 py-3 text-gray-600 text-sm">{row.date}</td>
                  <td className="px-5 py-3">
                    <span className={cn(
                      'text-sm font-semibold',
                      row.status === 'Paid' ? 'text-green-600' : 'text-amber-500'
                    )}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    {row.status === 'Paid' ? (
                      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#20A8D8] hover:opacity-90 transition-colors">
                        <Download size={12} />
                        Receipt
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate(ROUTES.STUDENT.PAYMENTS_SCHOOL_FEES)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#20A8D8] hover:opacity-90 transition-colors"
                      >
                        Pay Now
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─── Payment Card ─────────────────────────────────────────────────
const PaymentCard = ({
  icon, title, description, onOpen,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onOpen: () => void;
}) => (
  <div className="relative group border border-gray-100 rounded-xl p-5 hover:border-[#20A8D8]/30 hover:shadow-sm transition-all">
    <button
      onClick={onOpen}
      className="absolute top-4 right-4 text-gray-300 group-hover:text-[#20A8D8] transition-colors"
      aria-label={`Open ${title}`}
    >
      <ExternalLink size={15} />
    </button>
    <div className="mb-4">{icon}</div>
    <h3 className="text-base font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-xs text-gray-500 leading-relaxed mb-4">{description}</p>
    <button
      onClick={onOpen}
      className="text-sm font-semibold"
      style={{ color: '#20A8D8' }}
    >
      Proceed to Pay
    </button>
  </div>
);

export default PaymentsPage;
