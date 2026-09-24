import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { 
  Phone, 
  MessageSquare, 
  Menu, 
  X, 
  FileText, 
  Shield, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
  openAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate, openAdmin }) => {
  const { settings, currentAdmin } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);

  const cleanPhone = settings.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsApp = settings.whatsapp.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(settings.whatsapp_message)}`;

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Company Profile', path: '/company-profile' },
    { label: 'Products', path: '/products' },
    { label: 'Engineering Services', path: '/services' },
    { label: 'Industries', path: '/industries' },
    { label: 'Vendor Enlistment', path: '/vendor-enlistment' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Utility Ribbon */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              B2B Industrial Supply & Engineering Contractor
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-400">Dhaka, Bangladesh</span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={`tel:${cleanPhone}`} 
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-500" />
              <span>{settings.phone}</span>
            </a>
            <span className="text-slate-700">·</span>
            <a 
              href={waUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
            <span className="text-slate-700">·</span>
            <button
              onClick={openAdmin}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors text-xs font-medium cursor-pointer"
              title="Manage website content, products, and inquiries"
            >
              <Shield className="w-3 h-3 text-amber-500" />
              <span>{currentAdmin ? `Admin (${currentAdmin.role})` : 'Admin Panel'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 3-Zone Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single Brand Lockup */}
        <button 
          onClick={() => handleNav('/')}
          className="flex items-center gap-3 text-left cursor-pointer group shrink-0"
        >
          {settings.logo_url ? (
            <img 
              src={settings.logo_url} 
              alt={settings.company_name} 
              className="h-10 w-auto object-contain"
            />
          ) : (
            <div className="w-10 h-10 rounded bg-slate-900 flex items-center justify-center text-amber-500 font-display font-extrabold text-xl shadow-xs border border-slate-800 group-hover:border-amber-500 transition-colors">
              ART
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-lg font-display font-extrabold tracking-tight text-slate-900 leading-tight group-hover:text-amber-600 transition-colors">
              {settings.company_name}
            </span>
            <span className="text-[11px] font-medium text-slate-500 tracking-wide uppercase">
              Industrial Solutions
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((item) => {
            const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer rounded-md ${
                  isActive
                    ? 'text-slate-900 bg-slate-100 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & RFQ */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleNav('/rfq')}
            className="btn-industrial-accent"
          >
            <FileText className="w-4 h-4" />
            <span>Request for Quotation</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => handleNav('/rfq')}
            className="btn-industrial-accent text-xs px-2.5 py-1.5 sm:hidden"
          >
            RFQ
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-1">
            {navLinks.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className={`w-full text-left px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                    isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => handleNav('/rfq')}
              className="btn-industrial-accent w-full justify-center py-2.5"
            >
              <FileText className="w-4 h-4" />
              <span>Request for Quotation</span>
            </button>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={`tel:${cleanPhone}`}
                className="btn-industrial-outline text-xs justify-center py-2"
              >
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span>Call Now</span>
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-industrial-outline text-xs justify-center py-2 text-emerald-700 border-emerald-300 bg-emerald-50"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAdmin();
              }}
              className="btn-industrial-ghost text-xs justify-center text-slate-500 pt-2"
            >
              <Shield className="w-3.5 h-3.5 text-amber-500" />
              <span>Go to Admin Management Panel</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
