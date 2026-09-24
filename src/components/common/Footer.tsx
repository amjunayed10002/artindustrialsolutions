import React from 'react';
import { useData } from '../../context/DataContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  ArrowRight, 
  ShieldCheck, 
  Lock,
  Linkedin,
  Facebook,
  Youtube,
  Twitter,
  Instagram,
  MessageCircle,
  Send,
  Globe
} from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
  openAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate, openAdmin }) => {
  const { settings, categories, services, socialLinks } = useData();

  const cleanPhone = settings.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsApp = settings.whatsapp.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(settings.whatsapp_message)}`;

  const activeCategories = categories.filter((c) => c.is_active).slice(0, 6);
  const activeServices = services.filter((s) => s.is_active).slice(0, 5);

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'facebook':
        return <Facebook className="w-4 h-4" />;
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      case 'twitter':
      case 'x':
        return <Twitter className="w-4 h-4" />;
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'whatsapp':
        return <MessageCircle className="w-4 h-4" />;
      case 'telegram':
        return <Send className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Company Profile (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-slate-900 flex items-center justify-center text-amber-500 font-display font-extrabold text-xl border border-slate-800">
                ART
              </div>
              <div>
                <span className="text-xl font-display font-bold text-white tracking-tight">
                  {settings.company_name}
                </span>
                <p className="text-xs text-amber-500 font-medium tracking-wide">
                  {settings.tagline}
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              {settings.footer_text}
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                ISO 9001 Compliant Standards
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                DCCI Registered Member M-8491
              </span>
            </div>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-2">
              <span className="text-xs text-slate-500 mr-2">Connect:</span>
              {socialLinks.filter((s) => s.is_active).map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
                  title={social.label}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase font-mono">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => navigate('/')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/about')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  About Us & Proprietor
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/company-profile')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Company Profile & Legal
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/products')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Product Catalog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/services')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Engineering Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/industries')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Industries We Serve
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/vendor-enlistment')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Vendor Enlistment
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/rfq')} 
                  className="text-amber-400 hover:text-amber-300 transition-colors text-left font-medium flex items-center gap-1"
                >
                  <span>Request for Quotation</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Key Products & Categories */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase font-mono">
              Products
            </h4>
            <ul className="space-y-2.5 text-sm">
              {activeCategories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => navigate(`/products?category=${cat.slug}`)}
                    className="hover:text-amber-400 transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => navigate('/products')}
                  className="text-xs text-amber-500 hover:underline pt-1 block"
                >
                  View All Categories ({categories.length}) →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase font-mono">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed text-slate-300">
                  {settings.address}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a 
                  href={`tel:${cleanPhone}`} 
                  className="text-xs text-slate-300 hover:text-amber-400 transition-colors"
                >
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a 
                  href={`mailto:${settings.email}`} 
                  className="text-xs text-slate-300 hover:text-amber-400 transition-colors"
                >
                  {settings.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                <a 
                  href={waUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  WhatsApp: {settings.whatsapp}
                </a>
              </li>
              <li className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span className="text-[11px] text-slate-400">
                  {settings.office_hours}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            {settings.copyright_text}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/company-profile')}
              className="hover:text-slate-400 transition-colors"
            >
              Legal Compliance
            </button>
            <span>·</span>
            <button 
              onClick={() => navigate('/contact')}
              className="hover:text-slate-400 transition-colors"
            >
              Support
            </button>
            <span>·</span>
            <button
              onClick={openAdmin}
              className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors px-2 py-1 rounded bg-slate-900 border border-slate-800"
            >
              <Lock className="w-3 h-3 text-amber-500" />
              <span>Admin Management</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
