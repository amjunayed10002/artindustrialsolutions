import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { 
  FileText, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Paperclip, 
  Clock, 
  Building, 
  ChevronRight,
  UploadCloud,
  FileCheck
} from 'lucide-react';

interface RFQPageProps {
  navigate: (path: string) => void;
  preselectedProductId?: number | null;
  preselectedServiceName?: string;
  preselectedIndustryName?: string;
}

export const RFQPage: React.FC<RFQPageProps> = ({ 
  navigate, 
  preselectedProductId, 
  preselectedServiceName,
  preselectedIndustryName
}) => {
  const { products, store, settings } = useData();

  const [formData, setFormData] = useState({
    customer_name: '',
    company_name: '',
    email: '',
    phone: '',
    product_id: preselectedProductId ? String(preselectedProductId) : '',
    custom_product_name: preselectedServiceName ? `Service: ${preselectedServiceName}` : preselectedIndustryName ? `Industry Inquiry: ${preselectedIndustryName}` : '',
    quantity: '',
    requirement: '',
    message: '',
    attachment_name: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRFQ, setSubmittedRFQ] = useState<{ reference_no: string; name: string } | null>(null);

  // Sync if preselected changes
  useEffect(() => {
    if (preselectedProductId) {
      setFormData((prev) => ({
        ...prev,
        product_id: String(preselectedProductId),
      }));
    }
  }, [preselectedProductId]);

  const activeProducts = products.filter((p) => p.is_active);
  const selectedProductObj = activeProducts.find((p) => p.id === Number(formData.product_id));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        attachment_name: file.name,
      }));
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.customer_name.trim()) errs.customer_name = 'Contact person name is required';
    if (!formData.company_name.trim()) errs.company_name = 'Company / Factory name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid corporate email required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.product_id && !formData.custom_product_name.trim()) {
      errs.product = 'Please select a catalog product or enter your requirement name';
    }
    if (!formData.quantity.trim()) errs.quantity = 'Quantity and units required (e.g. 24 Units or 500 Meters)';
    if (!formData.requirement.trim()) errs.requirement = 'Please specify technical requirement or material grade';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const prodId = formData.product_id ? Number(formData.product_id) : null;
      const productName = selectedProductObj 
        ? `${selectedProductObj.name} [SKU: ${selectedProductObj.sku}]`
        : formData.custom_product_name.trim();

      const newRfq = await store.addRFQ({
        customer_name: formData.customer_name.trim(),
        company_name: formData.company_name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        product_id: prodId,
        product_name: productName,
        quantity: formData.quantity.trim(),
        requirement: formData.requirement.trim(),
        message: formData.message.trim(),
        attachment_name: formData.attachment_name || undefined,
        attachment_url: formData.attachment_name ? '#' : undefined,
      });

      setIsSubmitting(false);
      setSubmittedRFQ({
        reference_no: newRfq.reference_no,
        name: newRfq.customer_name,
      });
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } catch {
      setIsSubmitting(false);
      alert('The RFQ could not be submitted. Please check the connection and try again.');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider font-mono mb-2">
            <span className="w-4 h-px bg-amber-500"></span>
            <span>Commercial Procurement Desk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-white">
            Request for Quotation (RFQ)
          </h1>
          <p className="text-slate-400 text-base max-w-2xl mt-3">
            Submit your bill of materials, engineering specifications, or urgent shutdown parts list. We deliver comprehensive commercial quotes within 4 business hours.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-14">
        {submittedRFQ ? (
          <div className="bg-white rounded-lg border border-emerald-300 p-8 sm:p-12 shadow-md space-y-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded border border-emerald-200 uppercase">
                RFQ Submitted Successfully
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
                Official Reference: <span className="text-amber-600">{submittedRFQ.reference_no}</span>
              </h2>
              <p className="text-sm text-slate-600 max-w-xl mx-auto">
                Thank you, <span className="font-semibold text-slate-900">{submittedRFQ.name}</span>. Your RFQ has been logged into our key account database and assigned to a Technical Sales Engineer.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 max-w-md mx-auto text-xs font-mono text-slate-600 space-y-1">
              <div>Expected Turnaround: <span className="font-bold text-slate-900">Within 4 Business Hours</span></div>
              <div>Direct Inquiries: <span className="font-bold text-slate-900">{settings.sales_email}</span></div>
              <div>Urgent Breakdown: <span className="font-bold text-amber-600">{settings.phone}</span></div>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  setSubmittedRFQ(null);
                  setFormData({
                    customer_name: '',
                    company_name: '',
                    email: '',
                    phone: '',
                    product_id: '',
                    custom_product_name: '',
                    quantity: '',
                    requirement: '',
                    message: '',
                    attachment_name: '',
                  });
                }}
                className="btn-industrial-outline text-xs"
              >
                Submit Another RFQ
              </button>

              <button
                onClick={() => navigate('/products')}
                className="btn-industrial-primary text-xs"
              >
                Return to Product Catalog
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-6 sm:p-10 space-y-8">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-semibold text-amber-600 uppercase tracking-wider">
                Official Purchase Requisition Form
              </span>
              <h2 className="text-2xl font-display font-bold text-slate-900 mt-1">
                Enter Equipment & Delivery Requirements
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Section 1: Contact & Company */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-amber-400 inline-flex items-center justify-center text-[10px]">
                    1
                  </span>
                  <span>Buyer Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                      Contact Person Name *
                    </label>
                    <input
                      type="text"
                      value={formData.customer_name}
                      onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                      placeholder="e.g. Engr. Tanvir Ahmed"
                      className={`w-full px-3 py-2 text-xs rounded border ${
                        errors.customer_name ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200'
                      } focus:outline-hidden focus:border-amber-500`}
                    />
                    {errors.customer_name && <span className="text-[10px] text-rose-600 mt-0.5 block">{errors.customer_name}</span>}
                  </div>

                  <div>
                    <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                      Company / Factory Name *
                    </label>
                    <input
                      type="text"
                      value={formData.company_name}
                      onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                      placeholder="e.g. Meghna Cement Mills Ltd."
                      className={`w-full px-3 py-2 text-xs rounded border ${
                        errors.company_name ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200'
                      } focus:outline-hidden focus:border-amber-500`}
                    />
                    {errors.company_name && <span className="text-[10px] text-rose-600 mt-0.5 block">{errors.company_name}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="procurement@company.com"
                      className={`w-full px-3 py-2 text-xs rounded border ${
                        errors.email ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200'
                      } focus:outline-hidden focus:border-amber-500`}
                    />
                    {errors.email && <span className="text-[10px] text-rose-600 mt-0.5 block">{errors.email}</span>}
                  </div>

                  <div>
                    <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                      Direct Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+880 1819-000000"
                      className={`w-full px-3 py-2 text-xs rounded border ${
                        errors.phone ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200'
                      } focus:outline-hidden focus:border-amber-500`}
                    />
                    {errors.phone && <span className="text-[10px] text-rose-600 mt-0.5 block">{errors.phone}</span>}
                  </div>
                </div>
              </div>

              {/* Section 2: Product & Quantity */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-amber-400 inline-flex items-center justify-center text-[10px]">
                    2
                  </span>
                  <span>Items & Technical Scope</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                      Select Catalog Product (Optional)
                    </label>
                    <select
                      value={formData.product_id}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          product_id: e.target.value,
                          custom_product_name: e.target.value ? '' : formData.custom_product_name,
                        });
                      }}
                      className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500 bg-white"
                    >
                      <option value="">-- Choose from Catalog or Enter Below --</option>
                      {activeProducts.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.sku})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                      Custom Item / Unlisted Part Name
                    </label>
                    <input
                      type="text"
                      disabled={Boolean(formData.product_id)}
                      value={formData.custom_product_name}
                      onChange={(e) => setFormData({ ...formData, custom_product_name: e.target.value })}
                      placeholder="e.g. Hardox 500 Wear Liners or High Temp Steam Trap"
                      className={`w-full px-3 py-2 text-xs rounded border ${
                        errors.product ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200'
                      } ${formData.product_id ? 'bg-slate-100 cursor-not-allowed opacity-60' : 'bg-white'} focus:outline-hidden focus:border-amber-500`}
                    />
                    {errors.product && <span className="text-[10px] text-rose-600 mt-0.5 block">{errors.product}</span>}
                  </div>
                </div>

                {selectedProductObj && (
                  <div className="p-3 bg-amber-50 rounded border border-amber-200/60 text-xs font-mono text-amber-900 flex items-center justify-between">
                    <div>
                      Selected: <span className="font-bold">{selectedProductObj.name}</span> · SKU: {selectedProductObj.sku}
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, product_id: '' })}
                      className="text-amber-800 hover:text-amber-950 font-bold underline"
                    >
                      Clear
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                      Required Quantity & Units *
                    </label>
                    <input
                      type="text"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      placeholder="e.g. 24 Units, 50 VacPacs, 300 Meters"
                      className={`w-full px-3 py-2 text-xs rounded border ${
                        errors.quantity ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200'
                      } focus:outline-hidden focus:border-amber-500`}
                    />
                    {errors.quantity && <span className="text-[10px] text-rose-600 mt-0.5 block">{errors.quantity}</span>}
                  </div>

                  <div>
                    <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                      Technical Requirement / Clearance Grade *
                    </label>
                    <input
                      type="text"
                      value={formData.requirement}
                      onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                      placeholder="e.g. C3 clearance, DIN 931 Grade 10.9, Class 300 RF"
                      className={`w-full px-3 py-2 text-xs rounded border ${
                        errors.requirement ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200'
                      } focus:outline-hidden focus:border-amber-500`}
                    />
                    {errors.requirement && <span className="text-[10px] text-rose-600 mt-0.5 block">{errors.requirement}</span>}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                    Delivery Destination & Delivery Timeline
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Specify plant delivery gate, emergency turnaround date, or test certificate requirements..."
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                {/* Optional File Attachment */}
                <div>
                  <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                    Attach Bill of Materials / Drawings (Optional)
                  </label>
                  <div className="border border-dashed border-slate-300 rounded-lg p-4 bg-slate-50/50 text-center hover:bg-slate-50 transition-colors">
                    <input
                      type="file"
                      id="rfq-attachment"
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.xlsx,.xls,.csv,.doc,.docx,.png,.jpg"
                    />
                    <label
                      htmlFor="rfq-attachment"
                      className="cursor-pointer flex flex-col items-center justify-center space-y-1"
                    >
                      <UploadCloud className="w-6 h-6 text-slate-400" />
                      <span className="text-xs font-semibold text-slate-700">
                        {formData.attachment_name ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <FileCheck className="w-4 h-4" />
                            {formData.attachment_name}
                          </span>
                        ) : (
                          <span>Click to upload Excel BOM, Drawing PDF, or Requisition Slip</span>
                        )}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Supports PDF, Excel (.xlsx), Word, Images up to 25MB
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500 font-mono flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified B2B Procurement Protocol · Direct Factory Pricing</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-industrial-accent text-sm px-8 py-3 w-full sm:w-auto justify-center"
                >
                  {isSubmitting ? (
                    <span>Registering RFQ...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Commercial RFQ</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
