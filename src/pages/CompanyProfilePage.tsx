import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { CompanyDocument } from '../types';
import { 
  FileText, 
  Download, 
  Eye, 
  ShieldCheck, 
  Building, 
  CheckCircle, 
  ExternalLink,
  X,
  Printer
} from 'lucide-react';

interface CompanyProfileProps {
  navigate: (path: string) => void;
}

const isImageDoc = (url?: string) => {
  if (!url || url === '#') return false;
  return url.startsWith('data:image/') || /\.(jpg|jpeg|png|webp|svg)(\?.*)?$/i.test(url);
};

const isPdfDoc = (url?: string) => {
  if (!url || url === '#') return false;
  return url.startsWith('data:application/pdf') || /\.pdf(\?.*)?$/i.test(url);
};

const generateLegalDocSvg = (doc: CompanyDocument, settings: any): string => {
  const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 850" width="1200" height="850" style="background:#ffffff; font-family:'Barlow', sans-serif;">
    <rect x="25" y="25" width="1150" height="800" fill="#fafafa" stroke="#0f172a" stroke-width="6" rx="8" />
    <rect x="38" y="38" width="1124" height="774" fill="none" stroke="#d97706" stroke-width="2" stroke-dasharray="8 4" rx="4" />
    <rect x="46" y="46" width="1108" height="758" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" />

    <rect x="560" y="70" width="80" height="40" rx="4" fill="#0f172a" />
    <text x="600" y="97" font-size="20" font-weight="900" fill="#f59e0b" text-anchor="middle">ART</text>

    <text x="600" y="145" font-size="28" font-weight="800" fill="#0f172a" text-anchor="middle">${settings.company_name.toUpperCase()}</text>
    <text x="600" y="172" font-size="13" font-weight="600" fill="#64748b" text-anchor="middle" letter-spacing="2">GOVERNMENT STATUTORY REGISTRATION &amp; LEGAL CLEARANCE</text>
    <line x1="250" y1="195" x2="950" y2="195" stroke="#f59e0b" stroke-width="2" />

    <text x="600" y="245" font-size="14" font-weight="700" fill="#d97706" text-anchor="middle" letter-spacing="3">${doc.category.toUpperCase()} CLEARANCE CERTIFICATE</text>
    <text x="600" y="295" font-size="34" font-weight="800" fill="#0f172a" text-anchor="middle">${doc.title}</text>
    
    <rect x="440" y="325" width="320" height="32" rx="4" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" />
    <text x="600" y="346" font-size="12" font-family="monospace" font-weight="700" fill="#b45309" text-anchor="middle">REGISTRATION NO: ${doc.document_number}</text>

    <rect x="150" y="385" width="900" height="190" rx="8" fill="#f8fafc" stroke="#e2e8f0" />
    
    <text x="180" y="420" font-size="12" font-family="monospace" font-weight="700" fill="#64748b">ISSUING AUTHORITY:</text>
    <text x="350" y="420" font-size="13" font-weight="700" fill="#0f172a">${doc.issuing_authority}</text>

    <text x="180" y="455" font-size="12" font-family="monospace" font-weight="700" fill="#64748b">REGISTERED ENTITY:</text>
    <text x="350" y="455" font-size="13" font-weight="700" fill="#0f172a">${settings.company_name}</text>

    <text x="180" y="490" font-size="12" font-family="monospace" font-weight="700" fill="#64748b">SCOPE &amp; PURPOSE:</text>
    <text x="350" y="490" font-size="12" font-weight="400" fill="#334155">${doc.description.substring(0, 90)}...</text>

    <text x="180" y="525" font-size="12" font-family="monospace" font-weight="700" fill="#64748b">REGISTERED ADDRESS:</text>
    <text x="350" y="525" font-size="12" font-weight="400" fill="#334155">${settings.address}</text>

    <text x="180" y="555" font-size="12" font-family="monospace" font-weight="700" fill="#64748b">AUDIT VALIDITY:</text>
    <text x="350" y="555" font-size="12" font-weight="700" fill="#059669">Verified Current (Fiscal Year 2025–2026)</text>

    <g transform="translate(250, 680)">
      <circle cx="0" cy="0" r="50" fill="none" stroke="#dc2626" stroke-width="3" stroke-dasharray="6 3" opacity="0.85" />
      <text x="0" y="-10" font-size="9" font-weight="700" fill="#dc2626" text-anchor="middle">OFFICIAL AUDIT</text>
      <text x="0" y="8" font-size="13" font-weight="900" fill="#dc2626" text-anchor="middle">CERTIFIED</text>
      <text x="0" y="22" font-size="8" font-weight="700" fill="#dc2626" text-anchor="middle">LEGAL STANDING</text>
    </g>

    <g transform="translate(850, 680)">
      <path d="M -80 0 Q -40 -30 0 -10 Q 40 10 80 -15" fill="none" stroke="#1e293b" stroke-width="2.5" />
      <line x1="-120" y1="15" x2="120" y2="15" stroke="#94a3b8" stroke-width="1" />
      <text x="0" y="32" font-size="12" font-weight="700" fill="#0f172a" text-anchor="middle">Engr. A. R. Talukder</text>
      <text x="0" y="47" font-size="10" font-weight="500" fill="#64748b" text-anchor="middle">Managing Proprietor</text>
    </g>

    <text x="600" y="795" font-size="10" font-family="monospace" fill="#94a3b8" text-anchor="middle">
      Domain: ${settings.domain} · Generated: ${dateStr} · Serial: ${doc.document_number}
    </text>
  </svg>`;
};

export const CompanyProfilePage: React.FC<CompanyProfileProps> = ({ navigate }) => {
  const { companyDocuments, settings } = useData();
  const [selectedDoc, setSelectedDoc] = useState<CompanyDocument | null>(null);

  const activeDocs = companyDocuments.filter((d) => d.is_active).sort((a, b) => a.order - b.order);

  const handleDownload = (doc: CompanyDocument) => {
    if (doc.file_url && doc.file_url !== '#') {
      const a = document.createElement('a');
      a.href = doc.file_url;
      let ext = 'pdf';
      if (doc.file_url.startsWith('data:image/png')) ext = 'png';
      else if (doc.file_url.startsWith('data:image/jpeg') || doc.file_url.startsWith('data:image/jpg')) ext = 'jpg';
      else if (doc.file_url.startsWith('data:image/webp')) ext = 'webp';
      else if (doc.file_url.startsWith('data:image/svg')) ext = 'svg';
      else if (doc.file_url.startsWith('data:application/pdf')) ext = 'pdf';

      a.download = `${doc.title.replace(/[^a-zA-Z0-9_-]/g, '_')}_Official.${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    const svgContent = generateLegalDocSvg(doc, settings);
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/[^a-zA-Z0-9_-]/g, '_')}_Official_Certificate.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider font-mono mb-2">
            <span className="w-4 h-px bg-amber-500"></span>
            <span>Corporate Governance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-white">
            Company Profile & Legal Standing
          </h1>
          <p className="text-slate-400 text-base max-w-2xl mt-3">
            Verified statutory clearances, chamber memberships, and corporate banking solvency for procurement committee due diligence.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-16">
        {/* Overview & Quick Facts */}
        <section className="bg-white rounded-lg border border-slate-200 p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <span className="text-xs font-mono font-semibold text-amber-600 uppercase tracking-wider">
                Corporate Overview
              </span>
              <h2 className="text-2xl font-display font-bold text-slate-900">
                Institutional Credibility & Statutory Compliance
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                ART Industrial Solutions operates as a certified commercial supplier and mechanical engineering contractor. Headquartered in Dhaka, we maintain full regulatory clearances across city authorities, the National Board of Revenue, the Chief Controller of Imports & Exports, and prime commercial financial institutions.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our strict documentation protocol guarantees zero compliance friction for large industrial conglomerates, multinational manufacturing units, and government tender enlistments.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider border-b border-slate-200 pb-2">
                Fast Facts & Identifiers
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="text-slate-500 font-mono">Entity Type:</div>
                  <div className="font-semibold text-slate-900">Registered Proprietorship / Industrial Supply & Engineering</div>
                </div>
                <div>
                  <div className="text-slate-500 font-mono">Chamber Affiliation:</div>
                  <div className="font-semibold text-slate-900">Dhaka Chamber of Commerce & Industry (DCCI M-8491)</div>
                </div>
                <div>
                  <div className="text-slate-500 font-mono">Primary Banker:</div>
                  <div className="font-semibold text-slate-900">Prime Bank Limited, Corporate Branch</div>
                </div>
                <div>
                  <div className="text-slate-500 font-mono">Tax Status:</div>
                  <div className="font-semibold text-emerald-700 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Regular Corporate Filer (NBR Zone 06)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Legal Documents Grid */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-semibold text-amber-600 uppercase tracking-wider">
                Statutory Clearances
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mt-1">
                Official Company Documents
              </h2>
            </div>
            <div className="text-xs text-slate-500 font-mono">
              Audited for Fiscal Year 2025–2026
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {doc.category}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-amber-600 transition-colors">
                    {doc.title}
                  </h3>

                  <div className="text-xs font-mono text-amber-700 bg-amber-50/60 p-2 rounded border border-amber-200/50 mb-3">
                    <span className="text-slate-500">Ref: </span>{doc.document_number}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {doc.description}
                  </p>

                  <div className="text-[11px] text-slate-400 font-mono">
                    Issuing Authority: <span className="text-slate-700 font-medium">{doc.issuing_authority}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-4 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedDoc(doc)}
                    className="btn-industrial-outline text-xs justify-center py-2"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Record</span>
                  </button>

                  <button
                    onClick={() => handleDownload(doc)}
                    className="btn-industrial-primary text-xs justify-center py-2"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Vendor Enlistment Callout */}
        <section className="bg-slate-900 text-white rounded-lg p-8 sm:p-10 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-display font-bold text-white">
              Are You an Enlistment Committee Member?
            </h3>
            <p className="text-sm text-slate-400 max-w-xl">
              Visit our dedicated Vendor Enlistment portal to download the complete corporate docket including bank solvency, tax acknowledgement, and credit facility declarations.
            </p>
          </div>

          <button
            onClick={() => navigate('/vendor-enlistment')}
            className="btn-industrial-accent shrink-0"
          >
            <span>Procurement Enlistment Docket</span>
          </button>
        </section>
      </div>

      {/* Document View Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full border border-slate-300 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-500" />
                <span className="font-display font-bold text-sm tracking-tight">
                  Official Record Preview
                </span>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Certificate Sheet or Photo Scan */}
            <div className="p-6 sm:p-8 space-y-6 bg-slate-50/50 max-h-[75vh] overflow-y-auto">
              {isImageDoc(selectedDoc.file_url) ? (
                <div className="space-y-4">
                  <div className="text-center pb-2 border-b border-slate-200">
                    <span className="text-[11px] uppercase font-mono font-bold tracking-widest text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      REG: {selectedDoc.document_number}
                    </span>
                    <h3 className="text-xl font-display font-bold text-slate-900 mt-2">
                      {selectedDoc.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono mt-1">
                      {selectedDoc.category} Clearance · Issuing Authority: {selectedDoc.issuing_authority}
                    </p>
                  </div>

                  <div className="rounded-lg overflow-hidden border-2 border-slate-200 bg-slate-900/5 p-2 flex items-center justify-center">
                    <img
                      src={selectedDoc.file_url}
                      alt={selectedDoc.title}
                      className="max-h-[440px] w-auto object-contain rounded shadow-sm"
                    />
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed bg-white p-3 rounded border border-slate-200">
                    <strong className="text-slate-900">Statutory Scope:</strong> {selectedDoc.description}
                  </p>
                </div>
              ) : isPdfDoc(selectedDoc.file_url) ? (
                <div className="space-y-4">
                  <div className="text-center pb-2 border-b border-slate-200">
                    <span className="text-[11px] uppercase font-mono font-bold tracking-widest text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      REG: {selectedDoc.document_number}
                    </span>
                    <h3 className="text-xl font-display font-bold text-slate-900 mt-2">
                      {selectedDoc.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono mt-1">
                      PDF Document · {selectedDoc.issuing_authority}
                    </p>
                  </div>

                  <div className="w-full h-80 rounded-lg overflow-hidden border border-slate-300 bg-white">
                    <iframe
                      src={selectedDoc.file_url}
                      title={selectedDoc.title}
                      className="w-full h-full border-0"
                    />
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed bg-white p-3 rounded border border-slate-200">
                    <strong className="text-slate-900">Statutory Scope:</strong> {selectedDoc.description}
                  </p>
                </div>
              ) : (
                <div className="border-4 border-double border-slate-300 p-6 bg-white rounded shadow-inner space-y-6">
                  <div className="text-center border-b border-slate-200 pb-4">
                    <div className="text-xs uppercase font-mono font-bold tracking-widest text-slate-500">
                      Government / Statutory Compliance Certificate
                    </div>
                    <h3 className="text-xl font-display font-extrabold text-slate-900 mt-1">
                      {selectedDoc.title}
                    </h3>
                    <div className="text-xs text-amber-700 font-mono mt-1 font-semibold">
                      REGISTRATION NO: {selectedDoc.document_number}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-3 bg-slate-50 rounded border border-slate-100">
                      <span className="text-slate-500 block">Organization Name:</span>
                      <span className="font-bold text-slate-900">{settings.company_name}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded border border-slate-100">
                      <span className="text-slate-500 block">Category:</span>
                      <span className="font-bold text-slate-900">{selectedDoc.category}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded border border-slate-100">
                      <span className="text-slate-500 block">Issuing Authority:</span>
                      <span className="font-bold text-slate-900">{selectedDoc.issuing_authority}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded border border-slate-100">
                      <span className="text-slate-500 block">Audit Validity:</span>
                      <span className="font-bold text-emerald-700">Valid &amp; Active (2025–2026)</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    <span className="font-semibold text-slate-900 block mb-1">Document Summary:</span>
                    {selectedDoc.description}
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <div>Verified under domain: {settings.domain}</div>
                    <div className="text-emerald-700 font-bold">DIGITALLY AUDITED ✓</div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="bg-white px-6 py-4 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setSelectedDoc(null)}
                className="btn-industrial-outline text-xs"
              >
                Close Preview
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="btn-industrial-outline text-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>
                <button
                  onClick={() => {
                    handleDownload(selectedDoc);
                  }}
                  className="btn-industrial-primary text-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Official Document</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
