import { useNavigate } from 'react-router-dom';
import {
  ExternalLink, FileText, Mail, Briefcase,
  Award, CreditCard, Users, BedDouble,
  BookMarked, LogOut, GraduationCap,
} from 'lucide-react';
import { DOCUMENT_CARDS, type DocType } from '@/constants/student-mock.data';

const DocIcon = ({ type, color }: { type: DocType; color: string }) => {
  const p = { size: 24, style: { color } };
  switch (type) {
    case 'new-student-screening':  return <FileText      {...p} />;
    case 'admission-letter':       return <Mail          {...p} />;
    case 'entrepreneurship-form':  return <Briefcase     {...p} />;
    case 'screening-certificate':  return <Award         {...p} />;
    case 'id-card-form':           return <CreditCard    {...p} />;
    case 'behavioral-form':        return <Users         {...p} />;
    case 'accommodation-slip':     return <BedDouble     {...p} />;
    case 'exam-docket':            return <BookMarked    {...p} />;
    case 'exit-form':              return <LogOut        {...p} />;
    case 'final-year-clearance':   return <GraduationCap {...p} />;
    default:                       return <FileText      {...p} />;
  }
};

const DocumentsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="py-5">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Documents & Forms</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Generate, download, and print all your essential student documents from here.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DOCUMENT_CARDS.map(doc => (
          <button
            key={doc.type}
            onClick={() => navigate(`/student/documents/${doc.type}`)}
            className="group relative bg-white rounded-xl border border-gray-100 p-5 text-left hover:border-[#20A8D8]/30 hover:shadow-sm transition-all duration-200"
          >
            <div className="absolute top-4 right-4 text-gray-300 group-hover:text-[#20A8D8] transition-colors">
              <ExternalLink size={15} />
            </div>
            <div className="mb-4">
              <DocIcon type={doc.type} color={doc.iconColor} />
            </div>
            <h3 className="text-sm font-bold text-gray-800 leading-snug mb-1.5 pr-4">{doc.label}</h3>
            <p className="text-xs text-gray-400 leading-relaxed">{doc.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DocumentsPage;
