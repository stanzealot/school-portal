import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import { ROUTES } from '@/constants/routes.constants';

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
  status: string;
  tags: string[];
}

const PROCESSING_CHARGE = 1_500;

const AccommodationPaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hostel = (location.state as { hostel?: Hostel })?.hostel;

  // Fallback if navigated directly without state
  const hostelName   = hostel?.name    ?? 'Queen Amina Hostel';
  const hostelFee    = hostel?.fee     ?? 48_000;
  const spacesLeft   = hostel?.availableRooms ?? 12;
  const total        = hostelFee + PROCESSING_CHARGE;

  const hostelDesc   = `${hostel?.studentsPerRoom ?? 4}-man room · Ground floor utilities available · Close to lecture blocks`;

  return (
    <div className="py-5">
      {/* Page header */}
      <div className="bg-white rounded-xl border border-gray-100 px-5 py-4 mb-5">
        <h1 className="text-xl font-bold text-gray-800">Accommodation Payment</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Review your selected hostel details and complete your payment to secure the bed space for the current academic session.
        </p>
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate(ROUTES.STUDENT.HOSTEL)}
        className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
      >
        <ArrowLeft size={15} />
        Back to hostel selection
      </button>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Left: payment details */}
        <div className="flex-1 min-w-0 flex flex-col gap-5">
          {/* Selected Hostel */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h2 className="text-sm font-bold text-gray-800 mb-4">Selected Hostel</h2>
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="text-base font-bold text-gray-800 mb-1">{hostelName}</h3>
              <p className="text-xs text-gray-400 mb-4">{hostelDesc}</p>
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Spaces left</p>
                  <p className="text-sm font-bold text-gray-800">{spacesLeft} beds</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Hostel fee</p>
                  <p className="text-sm font-bold text-gray-800">₦{(hostelFee + PROCESSING_CHARGE).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Breakdown */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h2 className="text-sm font-bold text-gray-800 mb-4">Payment Breakdown</h2>
            <div className="divide-y divide-gray-100">
              <div className="flex items-center justify-between py-3.5">
                <span className="text-sm text-gray-600">Accommodation Fee</span>
                <span className="text-sm font-semibold text-gray-800">₦{hostelFee.toLocaleString()}.00</span>
              </div>
              <div className="flex items-center justify-between py-3.5">
                <span className="text-sm text-gray-600">Portal / Processing Charge</span>
                <span className="text-sm font-semibold text-gray-800">₦{PROCESSING_CHARGE.toLocaleString()}.00</span>
              </div>
              <div className="flex items-center justify-between py-4">
                <span className="text-sm font-bold text-gray-800">Total Payable</span>
                <span className="text-base font-bold text-gray-800">₦{total.toLocaleString()}.00</span>
              </div>
            </div>

            {/* CTA */}
            <button
              className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition-all"
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

        {/* Right: ballot summary */}
        <div className="lg:w-[300px] flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="text-base font-bold text-gray-800 mb-4">Ballot summary</h3>
            <div className="flex flex-col gap-3 divide-y divide-gray-50">
              {[
                { label: 'Student category', value: 'Returning student'   },
                { label: 'Gender filter',    value: 'Male'                },
                { label: 'Selection window', value: 'Closes in 24 hours'  },
                { label: 'Current status',   value: 'Awaiting hostel choice' },
              ].map(row => (
                <div key={row.label} className="flex items-start justify-between gap-2 pt-3 first:pt-0">
                  <span className="text-sm text-gray-400">{row.label}</span>
                  <span className="text-sm font-semibold text-gray-800 text-right">{row.value}</span>
                </div>
              ))}
            </div>

            {/* Payment timeout warning */}
            <div className="mt-4 rounded-xl p-4 text-white" style={{ backgroundColor: '#1D3A4A' }}>
              <p className="text-sm font-bold mb-1">Payment Timeout</p>
              <p className="text-xs opacity-80 leading-relaxed">
                You have 48 hours to complete this payment. Failure to pay will result in the immediate loss of this bed space allocation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccommodationPaymentPage;
