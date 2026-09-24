import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Building,
  ShieldCheck
} from 'lucide-react';

interface ContactPageProps {
  navigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ navigate }) => {
  const { settings, store } = useData();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const cleanPhone = settings.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsApp = settings.whatsapp.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(settings.whatsapp_message)}`;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.company.trim()) errs.company = 'Company name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid corporate email required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.subject.trim()) errs.subject = 'Subject is required';
    if (!formData.message.trim() || formData.message.length < 10) errs.message = 'Please provide a detailed inquiry message (at least 10 characters)';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      // Save directly into database via dbStore
      store.addContactMessage({
        name: formData.name.trim(),
        company: formData.company.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      setIsSubmitting(false);
      setSubmittedMessage(`Thank you, ${formData.name}. Your inquiry has been registered in our engineering desk. Our sales team will respond within 4 business hours.`);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setErrors({});
    }, 400);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider font-mono mb-2">
            <span className="w-4 h-px bg-amber-500"></span>
            <span>Get In Touch</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-white">
            Contact Engineering Desk
          </h1>
          <p className="text-slate-400 text-base max-w-2xl mt-3">
            Have a bill of materials to quote or need emergency technical assistance? Our key account engineers are ready to support your plant.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-12">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded bg-slate-100 text-slate-900 flex items-center justify-center mb-3">
              <MapPin className="w-5 h-5 text-amber-600" />
            </div>
            <h4 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-wider">
              Head Office & Warehouse
            </h4>
            <p className="text-sm font-semibold text-slate-900 leading-snug">
              {settings.address}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded bg-slate-100 text-slate-900 flex items-center justify-center mb-3">
              <Phone className="w-5 h-5 text-amber-600" />
            </div>
            <h4 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-wider">
              Direct Phone Lines
            </h4>
            <div className="text-sm font-semibold text-slate-900 space-y-1">
              <div>
                <a href={`tel:${cleanPhone}`} className="hover:text-amber-600 transition-colors">
                  {settings.phone}
                </a>
              </div>
              {settings.secondary_phone && (
                <div className="text-xs text-slate-500 font-mono">
                  Alt: {settings.secondary_phone}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded bg-slate-100 text-slate-900 flex items-center justify-center mb-3">
              <Mail className="w-5 h-5 text-amber-600" />
            </div>
            <h4 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-wider">
              Email Communications
            </h4>
            <div className="text-sm font-semibold text-slate-900 space-y-1">
              <div>
                <a href={`mailto:${settings.email}`} className="hover:text-amber-600 transition-colors">
                  {settings.email}
                </a>
              </div>
              <div className="text-xs text-slate-500 font-mono">
                Sales: {settings.sales_email}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-wider">
              Instant WhatsApp
            </h4>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors block"
            >
              {settings.whatsapp}
            </a>
            <div className="text-[11px] text-slate-400">
              {settings.office_hours}
            </div>
          </div>
        </div>

        {/* Main Section: Form & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 p-8 sm:p-10 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-mono font-semibold text-amber-600 uppercase tracking-wider">
                Send an Inquiry
              </span>
              <h2 className="text-2xl font-display font-bold text-slate-900 mt-1">
                How Can Our Engineers Assist You?
              </h2>
            </div>

            {submittedMessage && (
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold">Message Sent Successfully!</div>
                  <p>{submittedMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Engr. Arifur Rahman"
                    className={`w-full px-3 py-2 text-xs rounded border ${
                      errors.name ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200'
                    } focus:outline-hidden focus:border-amber-500`}
                  />
                  {errors.name && <span className="text-[10px] text-rose-600 mt-0.5 block">{errors.name}</span>}
                </div>

                <div>
                  <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                    Company / Plant Name *
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Meghna Cement Mills"
                    className={`w-full px-3 py-2 text-xs rounded border ${
                      errors.company ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200'
                    } focus:outline-hidden focus:border-amber-500`}
                  />
                  {errors.company && <span className="text-[10px] text-rose-600 mt-0.5 block">{errors.company}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className={`w-full px-3 py-2 text-xs rounded border ${
                      errors.email ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200'
                    } focus:outline-hidden focus:border-amber-500`}
                  />
                  {errors.email && <span className="text-[10px] text-rose-600 mt-0.5 block">{errors.email}</span>}
                </div>

                <div>
                  <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+880 1700-000000"
                    className={`w-full px-3 py-2 text-xs rounded border ${
                      errors.phone ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200'
                    } focus:outline-hidden focus:border-amber-500`}
                  />
                  {errors.phone && <span className="text-[10px] text-rose-600 mt-0.5 block">{errors.phone}</span>}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Quotation for Spherical Bearings & Valves"
                  className={`w-full px-3 py-2 text-xs rounded border ${
                    errors.subject ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200'
                  } focus:outline-hidden focus:border-amber-500`}
                />
                {errors.subject && <span className="text-[10px] text-rose-600 mt-0.5 block">{errors.subject}</span>}
              </div>

              <div>
                <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                  Detailed Message / Requirement *
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please state item codes, required quantities, delivery location, or service scope..."
                  className={`w-full px-3 py-2 text-xs rounded border ${
                    errors.message ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200'
                  } focus:outline-hidden focus:border-amber-500`}
                />
                {errors.message && <span className="text-[10px] text-rose-600 mt-0.5 block">{errors.message}</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-industrial-primary w-full justify-center py-3 text-sm"
              >
                {isSubmitting ? (
                  <span>Recording message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Message to Engineering Desk</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Interactive Google Map & Logistics Presence */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  Location & Logistics Hub
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Dhaka North Industrial Zone
                </span>
              </div>
              <div className="h-80 w-full bg-slate-100">
                {settings.google_map_embed ? (
                  <iframe
                    src={settings.google_map_embed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    title="ART Industrial Solutions Location"
                  ></iframe>
                ) : (
                  <div className="h-full flex items-center justify-center text-xs text-slate-400 font-mono">
                    Google Maps embed active per settings
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
                Looking for an Itemized Bill of Materials Quotation?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Use our dedicated Request for Quotation (RFQ) portal to attach part numbers, technical specifications, and spreadsheets for formal commercial quotation.
              </p>
              <button
                onClick={() => navigate('/rfq')}
                className="btn-industrial-outline text-xs w-full justify-center"
              >
                Open Formal RFQ Form →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
