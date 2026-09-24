import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { VendorDocument } from '../types';
import { 
  FileText, 
  Download, 
  Eye, 
  ShieldCheck, 
  Building2, 
  CheckCircle2, 
  X, 
  Printer,
  Archive,
  ArrowRight
} from 'lucide-react';

interface VendorEnlistmentPageProps {
  navigate: (path: string) => void;
}

// Helper to check if file URL is an image
const isImageDoc = (url?: string) => {
  if (!url || url === '#') return false;
  return url.startsWith('data:image/') || /\.(jpg|jpeg|png|webp|svg)(\?.*)?$/i.test(url);
};

// Helper to check if file URL is a PDF
const isPdfDoc = (url?: string) => {
  if (!url || url === '#') return false;
  return url.startsWith('data:application/pdf') || /\.pdf(\?.*)?$/i.test(url);
};

// Helper to generate an authentic high-resolution SVG Certificate
const generateSvgCertificate = (doc: VendorDocument, settings: any): string => {
  const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 850" width="1200" height="850" style="background:#ffffff; font-family:'Barlow', sans-serif;">
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f59e0b" />
        <stop offset="100%" stop-color="#b45309" />
      </linearGradient>
      <linearGradient id="darkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0f172a" />
        <stop offset="100%" stop-color="#1e293b" />
      </linearGradient>
    </defs>

    <!-- Outer Guilloche Border -->
    <rect x="25" y="25" width="1150" height="800" fill="#fafafa" stroke="#0f172a" stroke-width="6" rx="8" />
    <rect x="38" y="38" width="1124" height="774" fill="none" stroke="#d97706" stroke-width="2" stroke-dasharray="8 4" rx="4" />
    <rect x="46" y="46" width="1108" height="758" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" />

    <!-- Corner Accents -->
    <path d="M 50 80 L 80 50 L 50 50 Z" fill="#f59e0b" />
    <path d="M 1150 80 L 1120 50 L 1150 50 Z" fill="#f59e0b" />
    <path d="M 50 770 L 80 800 L 50 800 Z" fill="#f59e0b" />
    <path d="M 1150 770 L 1120 800 L 1150 800 Z" fill="#f59e0b" />

    <!-- Top Watermark Logo -->
    <rect x="560" y="70" width="80" height="40" rx="4" fill="#0f172a" />
    <text x="600" y="97" font-size="20" font-weight="900" fill="#f59e0b" text-anchor="middle" font-family="'Barlow', sans-serif">ART</text>

    <!-- Company Name & Header -->
    <text x="600" y="145" font-size="28" font-weight="800" fill="#0f172a" text-anchor="middle" letter-spacing="1">${settings.company_name.toUpperCase()}</text>
    <text x="600" y="172" font-size="13" font-weight="600" fill="#64748b" text-anchor="middle" letter-spacing="2">GOVERNMENT STATUTORY & COMMERCIAL PROCUREMENT DOSSIER</text>
    
    <line x1="250" y1="195" x2="950" y2="195" stroke="#f59e0b" stroke-width="2" />

    <!-- Certificate Title -->
    <text x="600" y="245" font-size="14" font-weight="700" fill="#d97706" text-anchor="middle" letter-spacing="3">OFFICIAL COMPLIANCE DOCUMENT</text>
    <text x="600" y="295" font-size="34" font-weight="800" fill="#0f172a" text-anchor="middle">${doc.title}</text>
    
    <!-- Code Badge -->
    <rect x="475" y="325" width="250" height="32" rx="4" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" />
    <text x="600" y="346" font-size="12" font-family="monospace" font-weight="700" fill="#b45309" text-anchor="middle">CODE: ${doc.document_code}</text>

    <!-- Document Info Box -->
    <rect x="150" y="385" width="900" height="190" rx="8" fill="#f8fafc" stroke="#e2e8f0" />
    
    <text x="180" y="420" font-size="12" font-family="monospace" font-weight="700" fill="#64748b">REGISTERED ENTITY:</text>
    <text x="350" y="420" font-size="13" font-weight="700" fill="#0f172a">${settings.company_name}</text>

    <text x="180" y="455" font-size="12" font-family="monospace" font-weight="700" fill="#64748b">OPERATIONAL SCOPE:</text>
    <text x="350" y="455" font-size="13" font-weight="500" fill="#1e293b">Industrial Engineering, Machinery Spares & Factory Consumables</text>

    <text x="180" y="490" font-size="12" font-family="monospace" font-weight="700" fill="#64748b">DOC DESCRIPTION:</text>
    <text x="350" y="490" font-size="12" font-weight="400" fill="#334155">${doc.description.substring(0, 90)}...</text>

    <text x="180" y="525" font-size="12" font-family="monospace" font-weight="700" fill="#64748b">OFFICE ADDRESS:</text>
    <text x="350" y="525" font-size="12" font-weight="400" fill="#334155">${settings.address}</text>

    <text x="180" y="555" font-size="12" font-family="monospace" font-weight="700" fill="#64748b">AUDIT VALIDITY:</text>
    <text x="350" y="555" font-size="12" font-weight="700" fill="#059669">Verified Current for FY 2026 · Valid for Corporate Vendor Enlistment</text>

    <!-- Red Seal Stamp -->
    <g transform="translate(250, 680)">
      <circle cx="0" cy="0" r="50" fill="none" stroke="#dc2626" stroke-width="3" stroke-dasharray="6 3" opacity="0.85" />
      <circle cx="0" cy="0" r="42" fill="none" stroke="#dc2626" stroke-width="1.5" opacity="0.85" />
      <text x="0" y="-15" font-size="9" font-weight="700" fill="#dc2626" text-anchor="middle" letter-spacing="1">ART INDUSTRIAL</text>
      <text x="0" y="5" font-size="13" font-weight="900" fill="#dc2626" text-anchor="middle">VERIFIED</text>
      <text x="0" y="20" font-size="8" font-weight="700" fill="#dc2626" text-anchor="middle">SEALED &amp; SIGNED</text>
    </g>

    <!-- Signatures -->
    <g transform="translate(850, 680)">
      <path d="M -80 0 Q -40 -30 0 -10 Q 40 10 80 -15" fill="none" stroke="#1e293b" stroke-width="2.5" />
      <line x1="-120" y1="15" x2="120" y2="15" stroke="#94a3b8" stroke-width="1" />
      <text x="0" y="32" font-size="12" font-weight="700" fill="#0f172a" text-anchor="middle">Engr. A. R. Talukder</text>
      <text x="0" y="47" font-size="10" font-weight="500" fill="#64748b" text-anchor="middle">Managing Proprietor</text>
    </g>

    <!-- Footer metadata -->
    <text x="600" y="795" font-size="10" font-family="monospace" fill="#94a3b8" text-anchor="middle">
      Portal: ${settings.domain} · Generated: ${dateStr} · Reference ID: ${doc.document_code}
    </text>
  </svg>`;
};

export const VendorEnlistmentPage: React.FC<VendorEnlistmentPageProps> = ({ navigate }) => {
  const { vendorDocuments, settings } = useData();
  const [selectedDoc, setSelectedDoc] = useState<VendorDocument | null>(null);

  const activeDocs = vendorDocuments.filter((d) => d.is_active).sort((a, b) => a.order - b.order);

  const handleDownload = (doc: VendorDocument) => {
    // 1. If admin uploaded an actual file (data URI or direct link)
    if (doc.file_url && doc.file_url !== '#') {
      const a = document.createElement('a');
      a.href = doc.file_url;
      
      let ext = doc.file_format?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'pdf';
      if (doc.file_url.startsWith('data:image/png')) ext = 'png';
      else if (doc.file_url.startsWith('data:image/jpeg') || doc.file_url.startsWith('data:image/jpg')) ext = 'jpg';
      else if (doc.file_url.startsWith('data:image/webp')) ext = 'webp';
      else if (doc.file_url.startsWith('data:image/svg')) ext = 'svg';
      else if (doc.file_url.startsWith('data:application/pdf')) ext = 'pdf';

      a.download = `${doc.document_code}_${doc.title.replace(/[^a-zA-Z0-9_-]/g, '_')}.${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    // 2. Default high-resolution official SVG Certificate
    const svgContent = generateSvgCertificate(doc, settings);
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.document_code}_${doc.title.replace(/[^a-zA-Z0-9_-]/g, '_')}_Official_Certificate.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAllDocket = () => {
    const docketRows = activeDocs
      .map(
        (d, idx) => `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px; font-weight: bold; color: #0f172a;">${idx + 1}</td>
          <td style="padding: 12px; font-family: monospace; font-weight: bold; color: #b45309;">${d.document_code}</td>
          <td style="padding: 12px; font-weight: bold; color: #0f172a;">${d.title}</td>
          <td style="padding: 12px; font-size: 13px; color: #475569;">${d.description}</td>
          <td style="padding: 12px; font-size: 13px; font-weight: bold; color: #059669;">VERIFIED</td>
        </tr>`
      )
      .join('');

    const masterDocketHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>ART Industrial Solutions - Master Procurement Docket</title>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; margin: 40px; }
    .header { border-bottom: 3px solid #0f172a; padding-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
    .title { font-size: 24px; font-weight: bold; color: #0f172a; }
    .meta { font-size: 12px; color: #64748b; margin-top: 5px; }
    table { width: 100%; border-collapse: collapse; margin-top: 30px; }
    th { background: #0f172a; color: white; padding: 12px; text-align: left; font-size: 12px; }
    .footer { margin-top: 50px; border-top: 1px solid #cbd5e1; padding-top: 20px; display: flex; justify-content: space-between; font-size: 12px; color: #64748b; }
    .stamp { border: 2px dashed #dc2626; color: #dc2626; padding: 8px 16px; font-weight: bold; display: inline-block; transform: rotate(-3deg); }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="title">${settings.company_name}</div>
      <div class="meta">${settings.address} | Phone: ${settings.phone} | Email: ${settings.email}</div>
      <div class="meta">Portal: ${settings.domain}</div>
    </div>
    <div class="stamp">OFFICIAL DOSSIER · FY 2026</div>
  </div>

  <h2 style="margin-top: 30px; font-size: 18px; color: #0f172a;">MASTER PROCUREMENT &amp; STATUTORY COMPLIANCE DOCKET</h2>
  <p style="font-size: 13px; color: #475569; line-height: 1.6;">
    This certified documentation dossier is assembled for enterprise procurement committees, purchase managers, and government tender evaluation boards. The following registered items have been validated by internal compliance officers.
  </p>

  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>DOC CODE</th>
        <th>CREDENTIAL TITLE</th>
        <th>SCOPE &amp; DETAILS</th>
        <th>STATUS</th>
      </tr>
    </thead>
    <tbody>
      ${docketRows}
    </tbody>
  </table>

  <div class="footer">
    <div>Generated from Official Corporate Portal: ${settings.domain}</div>
    <div style="text-align: right;">
      <strong>Authorized Signatory</strong><br>
      Engr. A. R. Talukder, Managing Proprietor
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([masterDocketHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ART_Industrial_Solutions_Master_Vendor_Docket_2026.html`;
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
            <span>Procurement & Supply Chain Portal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-white">
            Vendor Enlistment
          </h1>
          <p className="text-slate-400 text-base max-w-2xl mt-3">
            Dedicated documentation resource for factory procurement committees, purchase managers, and tender evaluators.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-16">
        {/* Intro Banner */}
        <section className="bg-white rounded-lg border border-slate-200 p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Full Statutory Compliance Verified</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-slate-900">
              Download Official Enlistment Dossier
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Procuring components for your factory? Access verified copies of our Trade License, NBR 13-digit BIN, e-TIN, DCCI membership, and 2026 Product Catalog without delay.
            </p>
          </div>

          <button
            onClick={handleDownloadAllDocket}
            className="btn-industrial-accent shrink-0 text-sm py-3 px-6"
          >
            <Archive className="w-4 h-4" />
            <span>Download Complete Dossier</span>
          </button>
        </section>

        {/* Documents Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-display font-bold text-slate-900">
              Procurement & Compliance Files
            </h3>
            <span className="text-xs font-mono text-slate-500">
              {activeDocs.length} Documents Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs font-mono">
                    <span className="text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                      {doc.document_code}
                    </span>
                    <span className="text-slate-400">
                      {doc.file_format} · {doc.file_size}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                    {doc.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {doc.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
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

        {/* Corporate Registration Support */}
        <section className="bg-slate-900 text-white rounded-lg p-8 sm:p-10 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <h3 className="text-2xl font-display font-bold text-white">
              Need ART Sealed Hard Copies for Formal Tender Submission?
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Our corporate accounts office dispatches signed and embossed tender submission dockets, bank solvency certificates, and sample components directly to factory purchase committees.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <button
              onClick={() => navigate('/contact')}
              className="btn-industrial-accent justify-center py-3"
            >
              <span>Request Sealed Docket</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
            <button
              onClick={() => navigate('/rfq')}
              className="btn-industrial-outline justify-center py-3 bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
            >
              Submit Itemized RFQ
            </button>
          </div>
        </section>
      </div>

      {/* Document View Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full border border-slate-300 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-500" />
                <span className="font-display font-bold text-sm tracking-tight">
                  Vendor Document Preview
                </span>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6 bg-slate-50/50 max-h-[75vh] overflow-y-auto">
              {/* If an image photo was uploaded */}
              {isImageDoc(selectedDoc.file_url) ? (
                <div className="space-y-4">
                  <div className="text-center pb-2 border-b border-slate-200">
                    <span className="text-[11px] uppercase font-mono font-bold tracking-widest text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {selectedDoc.document_code}
                    </span>
                    <h3 className="text-xl font-display font-bold text-slate-900 mt-2">
                      {selectedDoc.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono mt-1">
                      {selectedDoc.file_format} · {selectedDoc.file_size} · Verified Official Document Scan
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
                    <strong className="text-slate-900">Scope & Narrative:</strong> {selectedDoc.description}
                  </p>
                </div>
              ) : isPdfDoc(selectedDoc.file_url) ? (
                <div className="space-y-4">
                  <div className="text-center pb-2 border-b border-slate-200">
                    <span className="text-[11px] uppercase font-mono font-bold tracking-widest text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {selectedDoc.document_code}
                    </span>
                    <h3 className="text-xl font-display font-bold text-slate-900 mt-2">
                      {selectedDoc.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono mt-1">
                      PDF Document · {selectedDoc.file_size} · Certified Enlistment Dossier
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
                    <strong className="text-slate-900">Scope & Narrative:</strong> {selectedDoc.description}
                  </p>
                </div>
              ) : (
                /* Default statutory certificate preview */
                <div className="border-4 border-double border-slate-300 p-6 bg-white rounded shadow-inner space-y-6">
                  <div className="text-center border-b border-slate-200 pb-4">
                    <div className="text-xs uppercase font-mono font-bold tracking-widest text-slate-500">
                      ART Industrial Solutions · Procurement Docket
                    </div>
                    <h3 className="text-xl font-display font-extrabold text-slate-900 mt-1">
                      {selectedDoc.title}
                    </h3>
                    <div className="text-xs text-amber-700 font-mono mt-1 font-semibold">
                      DOCUMENT CODE: {selectedDoc.document_code}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-3 bg-slate-50 rounded border border-slate-100">
                      <span className="text-slate-500 block">File Type:</span>
                      <span className="font-bold text-slate-900">{selectedDoc.file_format} Official Document</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded border border-slate-100">
                      <span className="text-slate-500 block">File Size:</span>
                      <span className="font-bold text-slate-900">{selectedDoc.file_size}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded border border-slate-100">
                      <span className="text-slate-500 block">Entity:</span>
                      <span className="font-bold text-slate-900">{settings.company_name}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded border border-slate-100">
                      <span className="text-slate-500 block">Validity Audit:</span>
                      <span className="font-bold text-emerald-700">Verified Current FY 2026</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    <span className="font-semibold text-slate-900 block mb-1">Docket Description:</span>
                    {selectedDoc.description}
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <div>Company Domain: {settings.domain}</div>
                    <div className="text-emerald-700 font-bold">DIGITALLY STAMPED &amp; SEALED ✓</div>
                  </div>
                </div>
              )}
            </div>

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
                  <span>Print</span>
                </button>
                <button
                  onClick={() => handleDownload(selectedDoc)}
                  className="btn-industrial-primary text-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Document</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
