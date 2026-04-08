import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer, ArrowRight } from 'lucide-react';
import { MOCK_STUDENT, OTHER_DOCS_SIDEBAR, FEE_SCHEDULE, type DocType } from '@/constants/student-mock.data';
import { cn } from '@/utils';

// ── Other docs sidebar ────────────────────────────────────────────
const OtherDocsSidebar = ({ currentType }: { currentType: DocType }) => {
  const navigate = useNavigate();
  const others = OTHER_DOCS_SIDEBAR.filter(d => d.type !== currentType);
  return (
    <div className="lg:w-[260px] flex-shrink-0">
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <h3 className="text-sm font-bold text-gray-800 mb-3">Other Document</h3>
        <div className="flex flex-col gap-1">
          {others.map(doc => (
            <button
              key={doc.type}
              onClick={() => navigate(`/student/documents/${doc.type}`)}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-gray-100 bg-gray-50/60 hover:border-[#20A8D8]/30 hover:bg-[#20A8D8]/5 transition-all text-left group"
            >
              <span className="text-sm text-gray-700 group-hover:text-[#20A8D8] transition-colors font-medium">{doc.label}</span>
              <ArrowRight size={14} className="text-gray-400 group-hover:text-[#20A8D8] flex-shrink-0 transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Shared helpers ────────────────────────────────────────────────
const InfoPair = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-gray-400 mb-0.5">{label}</p>
    <p className="text-sm font-semibold text-gray-800">{value}</p>
  </div>
);

const SignatureRow = () => (
  <div className="mt-6 pt-4 border-t border-gray-100">
    <div className="grid grid-cols-3 gap-4 text-center">
      {['Name of Officer', 'Signature', 'Date'].map(f => (
        <div key={f}>
          <div className="border-b border-gray-300 h-8 mb-1" />
          <p className="text-xs text-gray-400">{f}</p>
        </div>
      ))}
    </div>
  </div>
);

const ScreeningSection = ({ title, headers, rows }: { title: string; headers: string[]; rows: string[][] }) => (
  <div className="mb-6">
    <h3 className="text-sm font-bold text-gray-800 mb-3">{title}</h3>
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-[#1D3A4A] text-white">
            {headers.map(h => <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
              {row.map((cell, j) => <td key={j} className="px-4 py-3 text-gray-600 h-10">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <SignatureRow />
  </div>
);

// ── Document: New Student Screening Form ──────────────────────────
const NewStudentScreeningForm = () => (
  <div className="bg-white rounded-xl border border-gray-100 p-6 md:p-8">
    <div className="text-center mb-6 pb-6 border-b border-gray-100">
      <img src="/images/logo.png" alt="KSP" className="w-12 h-12 object-contain mx-auto mb-2"
        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
      <h2 className="text-base font-bold text-gray-800">Kogi State Polytechnic</h2>
      <p className="text-sm text-gray-500">New Student Screening Form</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <InfoPair label="Student Full Name" value={MOCK_STUDENT.fullName} />
      <InfoPair label="School"            value={MOCK_STUDENT.school}   />
      <InfoPair label="State of Origin"   value={MOCK_STUDENT.stateOfOrigin} />
      <InfoPair label="Gender"            value={MOCK_STUDENT.gender}   />
      <InfoPair label="Programme"         value={MOCK_STUDENT.programme2} />
      <InfoPair label="Department"        value={MOCK_STUDENT.department} />
      <InfoPair label="Academic Session"  value="2024/2025"             />
      <InfoPair label="Date"              value="24/10/2024"            />
    </div>

    <ScreeningSection
      title="Section A: Registry"
      headers={['S/N', 'Credentials', 'Remarks']}
      rows={[['1','Birth Certificate',''],['2','State of Origin',''],["3","O'Level Verification",''],['4','Admission Letter',''],['5','Acceptance Payment Receipt',''],['6','ND Result / IT Letter','']]}
    />
    <ScreeningSection
      title="Section B: Department Screening"
      headers={['S/N', 'Subjects', 'Grade', 'Remarks']}
      rows={[['1','Mathematics','',''],['2','English Language','',''],['3','Physics','',''],['4','Chemistry','',''],['5','Further Mathematics','',''],['6','Biology','','']]}
    />
    <ScreeningSection
      title="Section C: DITRC"
      headers={['S/N', 'Credentials', 'Remarks']}
      rows={[['1','Birth Certificate',''],['2','State of Origin',''],["3","O'Level Verification",''],['4','ND Result / IT Letter','']]}
    />

    <div className="mt-6 pt-4 border-t border-gray-100">
      <p className="text-xs text-gray-400 leading-relaxed">
        <strong>Instructions:</strong> 1. After the successful screening of Section A, B and C above, you can now proceed to make your School fee payment/Hostel Accommodation fees. 2. Make copies of these screening forms available in a file for the School Department, Record Office, Academic Planning Unit and your Personal copy.
      </p>
    </div>
  </div>
);

// ── Document: Final Year Clearance Form ───────────────────────────
const FinalYearClearanceForm = () => (
  <div className="bg-white rounded-xl border border-gray-100 p-6 md:p-8">
    <div className="text-center mb-6 pb-6 border-b border-gray-100">
      <div className="w-24 h-24 rounded-lg overflow-hidden mx-auto mb-3 bg-gray-100">
        <img src={MOCK_STUDENT.avatar} alt={MOCK_STUDENT.fullName} className="w-full h-full object-cover"
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
      </div>
      <p className="text-xs text-gray-400 mb-1">S/N: FRM-2024-89021</p>
      <h2 className="text-xl font-bold text-gray-800">Final Year Clearance Form</h2>
    </div>

    <div className="bg-gray-50 rounded-xl p-5 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <InfoPair label="Student Full Name:" value={MOCK_STUDENT.fullName}     />
      <InfoPair label="Matric Number"      value="CSC/2021/045"              />
      <InfoPair label="Department"         value={MOCK_STUDENT.department}   />
      <InfoPair label="Gender:"            value={MOCK_STUDENT.gender}       />
      <InfoPair label="School"             value={MOCK_STUDENT.school}       />
      <InfoPair label="Mode of Study:"     value={MOCK_STUDENT.modeOfStudy}  />
    </div>

    <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
      <div className="flex gap-3">
        <div className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-blue-600 text-xs font-bold">i</span>
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-2">Important Instructions</h3>
          <p className="text-xs text-gray-600 mb-3">Attach to this form the following documents for the collection of result:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4">
            {['1. School fees receipt','2. HOD clearance','3. Result collection receipt','4. ND result',"5. O'Level result",'6. Admission letter','7. ID card']
              .map(item => <p key={item} className="text-xs text-gray-600">{item}</p>)}
          </div>
        </div>
      </div>
    </div>
    <SignatureRow />
  </div>
);

// ── Document: Admission Letter ────────────────────────────────────
const AdmissionLetter = () => (
  <div className="bg-white rounded-xl border border-gray-100 p-6 md:p-8 space-y-5">
    <div className="text-center pb-4 border-b border-gray-100">
      <img src="/images/logo.png" alt="KSP" className="w-12 h-12 object-contain mx-auto mb-2"
        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
      <h2 className="text-base font-bold text-gray-800">Kogi State Polytechnic</h2>
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mt-0.5">OFFICE OF THE REGISTRAR</p>
    </div>

    <div className="text-xs text-gray-500 space-y-0.5">
      <p>Telephone: 08183201768 &nbsp;&nbsp; Post: 2001 &nbsp;&nbsp; Telegram: KOGIPOLY</p>
      <p>REF: KSPA/CAD/ADM/2024/INTERIM862</p>
      <p>Printed on Thursday March 19, 2026</p>
    </div>

    <div className="flex gap-4 items-start">
      <div className="text-xs text-gray-600 space-y-1 flex-1">
        <p>Application Number: 94772</p>
        <p>Name: Adebo Julius</p>
        <p>Kogi State &nbsp;&nbsp; LGA: OFU</p>
      </div>
      <div className="w-16 h-20 bg-gray-100 rounded border border-gray-200 overflow-hidden flex-shrink-0">
        <img src={MOCK_STUDENT.avatar} alt="" className="w-full h-full object-cover"
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
      </div>
    </div>

    <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
      <p className="text-center font-bold text-gray-800">Offer Of Provisional Admission For 2024/2025 Academic Session</p>
      <p>After due consideration of your application for admission into the polytechnic, I am pleased to offer you provisional admission to undergo two (2) Years (Full-Time) Higher National Diploma (HND) in Computer Science in the School of Applied Sciences in the 2024/2025 academic session.</p>
      <p>This provisional offer is subject to the following:</p>
      {[
        "(i) All particulars provided on your Application Form are correct in every respect.",
        "(ii) You will present at the time of registration the original of credentials listed in your application form for scrutiny.",
        "(iii) All fees must be paid at the beginning of the session. The current rate of fees can be obtained from our website.",
        "(iv) Evidence of Status, G. A Origin.",
        "(v) This offer is not transferable to another session.",
        "(vi) You are expected to sign a declaration of good behaviour on your arrival at the Polytechnic.",
      ].map((t, i) => <p key={i} className="text-xs text-gray-600">{t}</p>)}
    </div>

    <div className="flex justify-between items-end pt-4 border-t border-gray-100">
      <div>
        <div className="w-32 border-b-2 border-gray-400 mb-1 h-8" />
        <p className="text-xs font-bold text-gray-700">EHINDERO MOSES JONATHAN</p>
        <p className="text-xs text-gray-500">For Registrar</p>
      </div>
      <div className="w-16 h-16 border border-gray-200 rounded flex items-center justify-center text-[10px] text-gray-400">QR Code</div>
    </div>

    {/* Fee schedule */}
    <div className="pt-6 border-t border-gray-100">
      <div className="text-center mb-4">
        <h3 className="text-sm font-bold text-gray-800">Kogi State Polytechnic</h3>
        <p className="text-xs text-gray-500">2024/2025 Academic Session Approved Fees For Regular Students</p>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#1D3A4A] text-white">
              <th className="px-3 py-2.5 text-left font-semibold w-8">S/N</th>
              <th className="px-3 py-2.5 text-left font-semibold">Description</th>
              <th className="px-3 py-2.5 text-right font-semibold">Indigene (₦)</th>
              <th className="px-3 py-2.5 text-right font-semibold">Non-Indigene (₦)</th>
            </tr>
          </thead>
          <tbody>
            {FEE_SCHEDULE.map((fee, idx) => (
              <tr key={fee.sn} className={cn('border-b border-gray-50', idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/40')}>
                <td className="px-3 py-2 text-gray-400">{fee.sn}</td>
                <td className="px-3 py-2 text-gray-700">{fee.description}</td>
                <td className="px-3 py-2 text-right text-gray-700">{fee.indigene.toLocaleString()}.00</td>
                <td className="px-3 py-2 text-right text-gray-700">{fee.nonIndegene.toLocaleString()}.00</td>
              </tr>
            ))}
            <tr className="bg-gray-100 font-bold">
              <td colSpan={2} className="px-3 py-2.5 text-gray-800 text-right">TOTAL (A+B)</td>
              <td className="px-3 py-2.5 text-right text-gray-800">118,825.00</td>
              <td className="px-3 py-2.5 text-right text-gray-800">136,825.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// ── Document: Entrepreneurship Form ──────────────────────────────
const EntrepreneurshipForm = () => {
  const SKILLS = [
    ['Metal Casting', 'Poultry feed production'],
    ['Beads and wire work', 'Blocks and interlocking'],
    ['Chemical production (Cosmetology)', 'Fashion design and Tailoring'],
    ['Knitting', 'Millinery (Turban and Fascinator)'],
    ['Photography and Video production', 'Shoe and Bag production'],
    ['Satchet water production', 'Tie and Dye/ Batik production'],
    ['Welding and Metal fabrication', 'Wood work and Carpentry'],
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 md:p-8 space-y-6">
      <div className="text-center pb-4 border-b border-gray-100">
        <img src="/images/logo.png" alt="KSP" className="w-12 h-12 object-contain mx-auto mb-2"
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        <h2 className="text-base font-bold text-gray-800">Kogi State Polytechnic</h2>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-600 mt-0.5">DIRECTORATE OF ENTREPRENEURSHIP</p>
        <p className="text-xs text-gray-400 mt-0.5">Skill Registration Form</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoPair label="Student Full Name" value={MOCK_STUDENT.fullName} />
        <InfoPair label="Matric Number"     value="2024/HND/NET/100"      />
        <InfoPair label="Department"        value={MOCK_STUDENT.department} />
        <InfoPair label="School"            value="School of Applied Science" />
        <InfoPair label="Phone Number"      value="+234 8146628482"        />
        <InfoPair label="Department"        value={MOCK_STUDENT.department} />
      </div>
      {/* Instructions */}
      <div>
        <p className="text-sm font-bold text-gray-800 mb-1">INSTRUCTION</p>
        <p className="text-xs text-[#20A8D8] mb-3">Kindly Select the correct answer in the form below</p>
        <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs text-gray-700 mb-4">
          {[
            ['Gender:', ['Male', 'Female']],
            ['Programme of study:', ['ND', 'HND']],
            ['Please indicate if its a carryover course', ['Yes', 'No']],
          ].map(([label, opts]) => (
            <div key={label as string} className="col-span-2 flex items-center gap-4">
              <span className="w-60 flex-shrink-0">{label as string}</span>
              {(opts as string[]).map(o => (
                <label key={o} className="flex items-center gap-2 cursor-pointer">
                  <span>{o}</span>
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-sm" />
                </label>
              ))}
            </div>
          ))}
        </div>
        <p className="text-sm font-semibold text-gray-700 mb-3">Please Tick your Skill Choice From The Underlisted</p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          {SKILLS.map(([left, right]) => (
            <div key={left} className="contents">
              <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                <div className="w-5 h-5 border-2 border-gray-300 rounded-sm flex-shrink-0" />
                {left}
              </label>
              <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                <div className="w-5 h-5 border-2 border-gray-300 rounded-sm flex-shrink-0" />
                {right}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs text-gray-600 mb-1">State the reason for your choice:</p>
        <div className="border border-gray-200 rounded-lg h-20" />
      </div>
      <p className="text-xs text-gray-500 leading-relaxed">
        I should only be allowed to participate in the semester combination only if I have up to 75% attendance in the practical training classes
      </p>
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
        <div>
          <div className="border-b border-gray-400 h-8 mb-1" />
          <p className="text-xs text-gray-500">Student Signature</p>
        </div>
        <div>
          <div className="border-b border-gray-400 h-8 mb-1" />
          <p className="text-xs text-gray-500">Date</p>
        </div>
      </div>
      <div>
        <p className="text-xs font-bold text-gray-700 mb-3">Official Use</p>
        <p className="text-xs text-gray-600 mb-2">Received by</p>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {['Name', 'Signature', 'Date'].map(f => (
            <div key={f}>
              <div className="border-b border-gray-300 h-8 mb-1" />
              <p className="text-xs text-gray-400">{f}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-600 mb-2">Director EDC</p>
        <div className="grid grid-cols-3 gap-4">
          {['Name', 'Signature', 'Date'].map(f => (
            <div key={f}>
              <div className="border-b border-gray-300 h-8 mb-1" />
              <p className="text-xs text-gray-400">{f}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-4 border-t border-gray-100">
        <p className="text-xs font-bold text-gray-700 mb-1">Director.</p>
        <p className="text-xs text-gray-500 mb-3">Please note that this form is exclusively for year two students</p>
        <p className="text-xs font-bold text-gray-700 mb-1">ACCOMPANYING INSTRUCTION</p>
        <p className="text-xs text-gray-500 leading-relaxed">
          Students are expected to complete these form online and print two copies. A copy is to be submitted at EDC and the other copy is to be retained by the the student as the Pass during the Continuous Assessment Test.
        </p>
      </div>
    </div>
  );
};

// ── Document: ID Card Form ────────────────────────────────────────
const IDCardForm = () => (
  <div className="bg-white rounded-xl border border-gray-100 p-6 md:p-8">
    <div className="rounded-xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <img src="/images/logo.png" alt="KSP" className="w-14 h-14 object-contain"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <div>
            <h2 className="text-base font-bold text-gray-800">Kogi State Polytechnic</h2>
            <p className="text-xs font-semibold text-gray-600">DIRECTORATE OF STUDENT SERVICE</p>
            <p className="text-xs text-gray-400">Office Of The Dean</p>
          </div>
        </div>
        <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-xs text-gray-400 text-center flex-shrink-0">
          Affix Passport<br />Photograph
        </div>
      </div>
      {/* Title */}
      <div className="text-center mb-6">
        <span className="inline-block px-4 py-1.5 rounded-md text-white text-sm font-bold" style={{ backgroundColor: '#6B1414' }}>
          Student Identity Card
        </span>
      </div>
      {/* Info grid */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6">
        <IDCardInfoPair label="Student Full Name:" value={MOCK_STUDENT.fullName} />
        <IDCardInfoPair label="Course"             value={MOCK_STUDENT.department} />
        <IDCardInfoPair label="Department"         value={MOCK_STUDENT.department} />
        <IDCardInfoPair label="School"             value="School of Applied Science" />
        <IDCardInfoPair label="Matric Number"      value="2024/HND/NET/100" />
        <div>
          <p className="text-xs text-gray-400 mb-1">Valid Until</p>
          <div className="border border-gray-200 rounded-lg h-10" />
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">Student Sign</p>
          <div className="border border-gray-200 rounded-lg h-10" />
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">Valid Until</p>
          <div className="border border-gray-200 rounded-lg h-10" />
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">Blood Group</p>
          <div className="border border-gray-200 rounded-lg h-10" />
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">Clinic Number</p>
          <div className="border border-gray-200 rounded-lg h-10" />
        </div>
      </div>
      <div className="pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="border-b border-gray-300 h-8 mb-1" />
            <p className="text-xs text-gray-400">Name (Head of Department)</p>
          </div>
          <div>
            <div className="border-b border-gray-300 h-8 mb-1" />
            <p className="text-xs text-gray-400">Signature</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const IDCardInfoPair = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-gray-400 mb-0.5">{label}</p>
    <p className="text-sm font-bold text-gray-800">{value}</p>
  </div>
);

// ── Document: Behavioral Form ─────────────────────────────────────
const BehavioralForm = () => {
  const COVENANTS = [
    'To be of good and sound behaviours at all times in and outside the Polytechnic premises, during and after my studies as a student.',
    'To obey all the rules and regulations contained in students Information Handbook of the Polytechnic.',
    'To be a good ambassador of the Polytechnic at all times and in all circumstances.',
    'To refrain from involvement in any act or conduct that is likely to constitute a threat or that is inimical to the peace, security, safety and smooth operations of the Polytechnic.',
    'To refrain from involvement in any form of "sign out" celebration either as an individual or group, on the premises of the Polytechnic.',
    'To abide by all policies and decisions of the Polytechnic regarding lectures, Continuous Assessment/examination, dress code, registration, payment of school fees, use of facilities, membership of and participation in Clubs/Societies/Associations, etc.',
    'Not to promote/project ethnic/tribal, religious or political sentiments which may be injurious to the aims and objectives of the Polytechnic or incompatible with the culture of teaching and learning in the Polytechnic.',
    'Not to do anything or act in any manner whatsoever, that may embarrass, impugn the integrity/reputation or corporate image of the Polytechnic.',
    'To respect all constituted authorities in the Polytechnic.',
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 md:p-8 space-y-5">
      <div className="text-center pb-4 border-b border-gray-100">
        <img src="/images/logo.png" alt="KSP" className="w-12 h-12 object-contain mx-auto mb-2"
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        <h2 className="text-base font-bold text-gray-800">Kogi State Polytechnic</h2>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">STUDENT BEHAVIOUR CONTRACT FORM (MALE)</p>
        <p className="text-xs text-gray-400 mt-0.5">Programme: HND</p>
      </div>
      <div>
        <p className="text-sm font-bold text-gray-800 mb-3">A. Student Personal Data</p>
        <div className="flex gap-4">
          <div className="flex-1 text-xs text-gray-700 space-y-1">
            <p>Name: {MOCK_STUDENT.fullName}</p>
            <p>Contact Address: ETIEKE IKANEKPO, OFU LGA</p>
            <p>Permanent Home Address: ETIEKE IKANEKPO, OFU LGA</p>
            <p>Phone No: 07084473708</p>
            <p>E-mail: tjanivincent202l@gmail.com</p>
            <p>Course of Study: {MOCK_STUDENT.department}</p>
            <p>School: {MOCK_STUDENT.school}</p>
            <p>Year of Entry: HND</p>
            <p>Expected year of Graduation: Session</p>
          </div>
          <div className="w-20 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            <img src={MOCK_STUDENT.avatar} alt="" className="w-full h-full object-cover"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
        </div>
      </div>
      <div>
        <p className="text-xs text-gray-700 mb-3">
          I ……… JULIUS ADEBO ………enter a covenant with Kogi State Polytechnic as follows:
        </p>
        <div className="space-y-2">
          {COVENANTS.map((c, i) => (
            <p key={i} className="text-xs text-gray-700 leading-relaxed">{i + 1}. {c}</p>
          ))}
        </div>
      </div>
      <div>
        <div className="border-b border-dashed border-gray-400 h-8 mb-1 w-72" />
        <p className="text-xs text-gray-500">Signature of Student and date:</p>
      </div>
      {/* Parent section */}
      {[1, 2].map(n => (
        <div key={n} className="border-t border-gray-100 pt-4">
          <p className="text-xs font-bold text-gray-700 mb-2">B. PARENT/GUARDIAN DATA kindly Complete Manually</p>
          <div className="flex gap-4">
            <div className="flex-1 text-xs text-gray-700 space-y-1">
              <p>i. Name Relationship to Student:</p>
              <p>ii. Occupation:</p>
              <p>iii. Office Address:</p>
              <p>iv. Permanent Home Address:</p>
              <p>v. Phone No: E-mail:</p>
              <p>vi. Valid means of Identification: &nbsp; National ID Card ( ) Driver's License ( ) International Passport ( )</p>
            </div>
            <div className="w-20 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-[10px] text-gray-400 text-center flex-shrink-0">
              Affix Passport<br />Photograph
            </div>
          </div>
          <p className="text-xs font-bold text-gray-700 mt-3 mb-1">Parent Passport</p>
          <p className="text-xs text-gray-500 mb-3">Note: This form must be submitted with a photograph of a valid means of identification of Parent/Guardian of the Student.</p>
          <p className="text-xs text-gray-600">Parents/Guardians Signature: ……………… Date: ………………</p>
          <p className="text-xs text-gray-600">Registrar's Signature: ………………… Date: ………………</p>
        </div>
      ))}
    </div>
  );
};

// ── Document: Exit Form ───────────────────────────────────────────
const ExitForm = () => {
  const DESIGNATIONS = ['Librarian', 'HOD', 'Dean of School', 'DITRC', 'Bursary', 'Director of Sport', 'Security Unit'];
  const HOSTEL_ITEMS = ['Pillows', 'Mattress', 'Key No', 'Damage (if any)', 'Amount surcharged on loses and damage to the Polytechnic Property'];
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <img src="/images/logo.png" alt="KSP" className="w-14 h-14 object-contain"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <div>
            <h2 className="text-base font-bold text-gray-800">Kogi State Polytechnic</h2>
            <p className="text-xs font-semibold text-gray-600 uppercase">OFFICE OF THE DEAN, DIRECTORATE OF STUDENTS' SERVICES</p>
            <p className="text-xs text-gray-500 mt-0.5">STUDENT EXIT FORM</p>
          </div>
        </div>
        <div className="w-16 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          <img src={MOCK_STUDENT.avatar} alt="" className="w-full h-full object-cover"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        </div>
      </div>
      {/* Session row */}
      <div className="flex items-center justify-between text-xs text-gray-600">
        <span>2025/2026 Academic Session</span>
        <span>MATRIC NO: 2024/HND/NET/100</span>
      </div>
      {/* Section A */}
      <div>
        <p className="text-xs font-bold text-gray-800 mb-3">A. &nbsp; STUDENT'S DATA</p>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-xs">
            <tbody>
              {[
                ['1', 'Name', MOCK_STUDENT.fullName],
                ['2', 'Matric NO', '2024/HND/NET/100'],
                ['3', 'Course:', MOCK_STUDENT.department],
                ['4', 'School', 'School: School of Applied Sciences'],
              ].map(([sn, label, value]) => (
                <tr key={sn} className="border-b border-gray-100">
                  <td className="px-4 py-2.5 text-gray-400 w-8">{sn}</td>
                  <td className="px-4 py-2.5 text-gray-600 w-32">{label}</td>
                  <td className="px-4 py-2.5 text-gray-800 font-medium">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3">
          <p className="text-xs text-gray-600 mb-1">Reason(s) for leaving:</p>
          <div className="border border-gray-200 rounded-lg h-20" />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div><div className="border-b border-gray-300 h-8 mb-1" /><p className="text-xs text-gray-400">Student Signature</p></div>
          <div><div className="border-b border-gray-300 h-8 mb-1" /><p className="text-xs text-gray-400">Date</p></div>
        </div>
      </div>
      {/* Section B */}
      <div>
        <p className="text-xs font-bold text-gray-800 mb-2">B. &nbsp; FOR OFFICE USE ONLY</p>
        <p className="text-xs text-gray-600 mb-3">This is to certify that……… TIJANI VINCENT ……… has been cleared</p>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ backgroundColor: '#1D3A4A' }}>
                <th className="px-4 py-2.5 text-left font-semibold text-white w-10">S/N</th>
                <th className="px-4 py-2.5 text-left font-semibold text-white">DESIGNATION</th>
                <th className="px-4 py-2.5 text-left font-semibold text-white">SIGNATURE/DATE</th>
              </tr>
            </thead>
            <tbody>
              {DESIGNATIONS.map((d, i) => (
                <tr key={d} className="border-b border-gray-100">
                  <td className="px-4 py-2.5 text-gray-500">{i + 1}</td>
                  <td className="px-4 py-2.5 text-gray-700">{d}</td>
                  <td className="px-4 py-2.5" />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Section C */}
      <div>
        <p className="text-xs font-bold text-gray-800 mb-3">C. &nbsp; RECORD OF HOSTEL EQUIPMENT RETURNEE</p>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ backgroundColor: '#1D3A4A' }}>
                <th className="px-4 py-2.5 text-left font-semibold text-white w-10">S/N</th>
                <th className="px-4 py-2.5 text-left font-semibold text-white">ITEMS</th>
                <th className="px-4 py-2.5 text-left font-semibold text-white">QUANTITY</th>
              </tr>
            </thead>
            <tbody>
              {HOSTEL_ITEMS.map((item, i) => (
                <tr key={item} className="border-b border-gray-100">
                  <td className="px-4 py-2.5 text-gray-500">{i + 1}</td>
                  <td className="px-4 py-2.5 text-gray-700">{item}</td>
                  <td className="px-4 py-2.5" />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {['Hall Officer', 'Signature', 'Date'].map(f => (
            <div key={f}><div className="border-b border-gray-300 h-8 mb-1" /><p className="text-xs text-gray-400">{f}</p></div>
          ))}
        </div>
      </div>
      <p className="text-xs text-gray-500">Dean, Directorate of Student's Services</p>
    </div>
  );
};

// ── Document: Exam Docket ─────────────────────────────────────────
const ExamDocketDoc = () => {
  const DOCKET_COURSES = [
    { sn: 1, code: 'ACC111', title: 'Principles of Accounting 1', unit: 3 },
    { sn: 2, code: 'ACC112', title: 'Principles of Accounting 2', unit: 3 },
    { sn: 3, code: 'BUS101', title: 'Introduction to Business',   unit: 3 },
    { sn: 4, code: 'ECO201', title: 'Microeconomics',             unit: 3 },
    { sn: 5, code: 'ECO202', title: 'Macroeconomics',             unit: 2 },
    { sn: 6, code: 'FIN301', title: 'Corporate Finance',          unit: 3 },
    { sn: 7, code: 'MKT305', title: 'Principles of Marketing',    unit: 3 },
  ];
  const totalUnits = DOCKET_COURSES.reduce((s, c) => s + c.unit, 0);
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 md:p-8 space-y-6">
      <div className="text-center pb-4 border-b border-gray-100">
        <img src="/images/logo.png" alt="KSP" className="w-12 h-12 object-contain mx-auto mb-2"
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        <h2 className="text-base font-bold text-gray-800">Kogi State Polytechnic</h2>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">EXAMINATION DOCKET</p>
      </div>
      {/* Student bio */}
      <div className="flex gap-4 items-start">
        <div className="w-24 h-28 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          <img src={MOCK_STUDENT.avatar} alt="" className="w-full h-full object-cover"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 flex-1">
          <InfoPair label="Student Full Name:" value={MOCK_STUDENT.fullName} />
          <InfoPair label="Matric Number"      value="2024/HND/NET/100"      />
          <InfoPair label="Level"              value="HND Year Two"          />
          <InfoPair label="Mode of Entry"      value="HND"                   />
          <InfoPair label="School"             value="School of Applied Science" />
          <InfoPair label="Department"         value={MOCK_STUDENT.department} />
        </div>
      </div>
      {/* Course table with watermark overlay */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none overflow-hidden rounded-lg">
          <p className="text-6xl font-black text-gray-700 -rotate-12 whitespace-nowrap">KOGI STATE POLYTECHNIC</p>
        </div>
        <div className="rounded-lg px-4 py-2 text-center text-white text-xs font-medium mb-2" style={{ backgroundColor: '#1D3A4A' }}>
          Courses to be written for first semester 2024/2025 Academic Session
        </div>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#1D3A4A' }}>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white w-10">S/N</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white w-32">Course Code</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white">Course Title</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-white w-14">Unit</th>
              </tr>
            </thead>
            <tbody>
              {DOCKET_COURSES.map(c => (
                <tr key={c.code} className="border-b border-gray-100 hover:bg-gray-50/40">
                  <td className="px-4 py-3 text-gray-500 text-sm">{c.sn}</td>
                  <td className="px-4 py-3 text-gray-700 font-medium text-sm">{c.code}</td>
                  <td className="px-4 py-3 text-gray-700 text-sm">{c.title}</td>
                  <td className="px-4 py-3 text-gray-700 text-sm text-right">{c.unit}</td>
                </tr>
              ))}
              <tr className="bg-gray-50 border-t border-gray-200">
                <td colSpan={3} className="px-4 py-3 text-sm font-semibold text-gray-700">Total Unit Registered</td>
                <td className="px-4 py-3 text-sm font-bold text-gray-800 text-right">{totalUnits}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Signatures */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100 text-center">
        {['Student Signature/Date', 'Account Officer Signature/Date', 'Head of Department Signature/Date'].map(f => (
          <div key={f}><div className="border-b border-gray-300 h-8 mb-1" /><p className="text-xs text-gray-400 leading-snug">{f}</p></div>
        ))}
      </div>
      {/* Footer */}
      <div className="flex items-end justify-between pt-2">
        <div>
          <p className="text-xs font-bold text-red-500">This Docket is not Transferable</p>
          <p className="text-xs text-gray-400 mt-0.5">Printed on Thursday, March 19, 2026</p>
        </div>
        <div className="w-16 h-16 border border-gray-200 rounded flex items-center justify-center text-[10px] text-gray-400">QR Code</div>
      </div>
    </div>
  );
};

const ComingSoonDoc = ({ label }: { label: string }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-10 text-center">
    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 text-2xl">📄</div>
    <h3 className="text-lg font-bold text-gray-700 mb-1">{label}</h3>
    <p className="text-sm text-gray-400">This document will be available soon.</p>
  </div>
);

// ── Label map ─────────────────────────────────────────────────────
const DOC_LABELS: Record<DocType, string> = {
  'new-student-screening': 'New Student Screening Form',
  'admission-letter':      'Admission Letter',
  'entrepreneurship-form': 'Entrepreneurship Form',
  'screening-certificate': 'Screening Certificate',
  'id-card-form':          'ID Card Form',
  'behavioral-form':       'Behavioral Form',
  'accommodation-slip':    'Accommodation Slip',
  'exam-docket':           'Exam Docket',
  'exit-form':             'Exit Form',
  'final-year-clearance':  'Final Year Clearance Form',
};

// ── Main page ─────────────────────────────────────────────────────
const DocumentViewPage = () => {
  const { docType } = useParams<{ docType: string }>();
  const navigate    = useNavigate();
  const type  = docType as DocType;
  const label = DOC_LABELS[type] ?? 'Document';

  const renderDoc = () => {
    switch (type) {
      case 'new-student-screening': return <NewStudentScreeningForm />;
      case 'final-year-clearance':  return <FinalYearClearanceForm />;
      case 'admission-letter':      return <AdmissionLetter />;
      case 'entrepreneurship-form': return <EntrepreneurshipForm />;
      case 'id-card-form':          return <IDCardForm />;
      case 'behavioral-form':       return <BehavioralForm />;
      case 'exit-form':             return <ExitForm />;
      case 'exam-docket':           return <ExamDocketDoc />;
      default:                      return <ComingSoonDoc label={label} />;
    }
  };

  return (
    <div className="py-5">
      {/* Action bar */}
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={() => navigate('/student/documents')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={15} />
          Go Back
        </button>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-colors"
          style={{ backgroundColor: '#20A8D8' }}
        >
          <Printer size={15} />
          Print Document
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex-1 min-w-0">{renderDoc()}</div>
        <OtherDocsSidebar currentType={type} />
      </div>
    </div>
  );
};

export default DocumentViewPage;
// NOTE: This append block is intentionally empty — the new docs are injected via str_replace below
