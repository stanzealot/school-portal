import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Lock, Copy, Check, Clock, HelpCircle } from 'lucide-react';
import { ROUTES } from '@/constants/routes.constants';
import { cn } from '@/utils';

// Reusable for school fees, departmental dues, other payments
// The page title/amounts adapt based on the route

type PaymentType = 'school-fees' | 'departmental' | 'other';

const PAYMENT_CONFIG: Record<PaymentType, {
  title: string;
  subtitle: string;
  fee: number;
  feeLabel: string;
  ref: string;
}> = {
  'school-fees': {
    title:    'School Fees Payment',
    subtitle: 'Review your fee breakdown and complete your payment for the current academic session.',
    fee:      120_000,
    feeLabel: 'School Fee',
    ref:      '283749201932',
  },
  departmental: {
    title:    'Departmental Dues Payment',
    subtitle: 'Pay your mandatory faculty and departmental association dues.',
    fee:      15_000,
    feeLabel: 'Departmental Fee',
    ref:      '283749201929',
  },
  other: {
    title:    'Other Payments',
    subtitle: 'Acceptance fees, medical fees, library fines, and more.',
    fee:      35_000,
    feeLabel: 'Acceptance Fee',
    ref:      '283749201928',
  },
};

const PROCESSING_CHARGE = 1_500;

const SchoolFeesPaymentPage = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [copied, setCopied]  = useState(false);

  // Determine type from path
  const path = location.pathname;
  const type: PaymentType =
    path.includes('departmental') ? 'departmental' :
    path.includes('other')        ? 'other'         :
    'school-fees';

  const config = PAYMENT_CONFIG[type];
  const total  = config.fee + PROCESSING_CHARGE;

  const handleCopy = () => {
    navigator.clipboard.writeText(config.ref).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-5">
      {/* Page header */}
      <div className="bg-white rounded-xl border border-gray-100 px-5 py-4 mb-5">
        <h1 className="text-xl font-bold text-gray-800">{config.title}</h1>
        <p className="text-sm text-gray-400 mt-0.5 max-w-lg">{config.subtitle}</p>
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate(ROUTES.STUDENT.PAYMENTS)}
        className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
      >
        <ArrowLeft size={15} />
        Go Back
      </button>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Left: payment breakdown */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
              <h2 className="text-sm font-bold text-gray-800">Payment Breakdown</h2>
              <span className="px-3 py-1 rounded-full bg-[#20A8D8]/10 text-xs font-semibold text-[#20A8D8]">
                Academic Session: 2024/2025
              </span>
            </div>

            {/* Breakdown rows */}
            <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
              {/* Reference */}
              <div className="flex items-center justify-between px-5 py-4">
                <span className="text-sm text-gray-500">Reference (RRR)</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-800 font-mono">{config.ref}</span>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-[#20A8D8] hover:bg-[#20A8D8]/10 transition-colors"
                    title="Copy reference"
                  >
                    {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              {/* Payment status */}
              <div className="flex items-center justify-between px-5 py-4">
                <span className="text-sm text-gray-500">Payment Status</span>
                <span className="text-sm font-semibold text-amber-500">Pending</span>
              </div>

              {/* Main fee */}
              <div className="flex items-center justify-between px-5 py-4">
                <span className="text-sm text-gray-500">{config.feeLabel}</span>
                <span className="text-sm font-semibold text-gray-800">₦{config.fee.toLocaleString()}.00</span>
              </div>

              {/* Date */}
              <div className="flex items-center justify-between px-5 py-4">
                <span className="text-sm text-gray-500">Date Generated</span>
                <span className="text-sm font-semibold text-gray-800">12 Oct 2024</span>
              </div>

              {/* Processing charge */}
              <div className="flex items-center justify-between px-5 py-4">
                <span className="text-sm text-gray-500">Portal / Processing Charge</span>
                <span className="text-sm font-semibold text-gray-800">₦{PROCESSING_CHARGE.toLocaleString()}.00</span>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between px-5 py-4 bg-gray-50">
                <span className="text-sm font-bold text-gray-800">Total Payable</span>
                <span className="text-base font-bold text-gray-800">₦{total.toLocaleString()}.00</span>
              </div>
            </div>

            {/* CTA */}
            <button
              className="w-full mt-5 flex items-center justify-center gap-2 py-3.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition-all"
              style={{ backgroundColor: '#20A8D8' }}
            >
              Proceed to Pay ₦{total.toLocaleString()}.00
              <ArrowLeft size={16} className="rotate-180" />
            </button>
            <div className="flex items-center justify-center gap-1.5 mt-3">
              <Lock size={12} className="text-gray-400" />
              <p className="text-xs text-gray-400">Payments are secured and encrypted via Remita</p>
            </div>
          </div>
        </div>

        {/* Right: quick links sidebar */}
        <div className="lg:w-[280px] flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="text-sm font-bold text-gray-800 mb-3">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate(ROUTES.STUDENT.PAYMENTS)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-100 bg-gray-50/60 hover:border-[#20A8D8]/30 hover:bg-[#20A8D8]/5 transition-all text-left group"
              >
                <Clock size={16} className="text-[#20A8D8] flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-[#20A8D8] transition-colors">
                  Payment History
                </span>
              </button>
              <button
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-100 bg-gray-50/60 hover:border-[#20A8D8]/30 hover:bg-[#20A8D8]/5 transition-all text-left group"
              >
                <HelpCircle size={16} className="text-[#20A8D8] flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-[#20A8D8] transition-colors">
                  Payment Support
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolFeesPaymentPage;
