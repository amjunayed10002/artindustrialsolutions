import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { SiteSettings } from '../../types';
import { Save, CheckCircle2, Building, Phone, Mail, Globe, MapPin, UploadCloud, RefreshCw, Plus, Trash2, X, ExternalLink } from 'lucide-react';
import { ImageUploadField } from './ImageUploadField';

export const AdminSettings: React.FC = () => {
  const { settings, store, socialLinks } = useData();
  const [formData, setFormData] = useState<SiteSettings>({ ...settings });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'company' | 'contact' | 'branding' | 'seo' | 'social'>('company');

  // Social Links State
  const [isAddingSocial, setIsAddingSocial] = useState(false);
  const [newSocial, setNewSocial] = useState({
    platform: 'facebook',
    label: '',
    url: '',
    order: socialLinks.length + 1,
    is_active: true,
  });

  const handleAddSocial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSocial.url.trim()) return;
    const label = newSocial.label.trim() || (newSocial.platform.charAt(0).toUpperCase() + newSocial.platform.slice(1));
    store.addSocialLink({
      platform: newSocial.platform as any,
      label,
      url: newSocial.url.trim(),
      order: Number(newSocial.order) || socialLinks.length + 1,
      is_active: newSocial.is_active,
    });
    setNewSocial({
      platform: 'facebook',
      label: '',
      url: '',
      order: socialLinks.length + 2,
      is_active: true,
    });
    setIsAddingSocial(false);
  };

  const handleDeleteSocial = (id: number, label: string) => {
    if (confirm(`Are you sure you want to remove ${label} from website social profiles?`)) {
      store.deleteSocialLink(id);
    }
  };

  // Handle Logo Upload (Base64)
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          logo_url: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateSettings(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-mono font-semibold text-amber-600 uppercase tracking-wider">
            Configuration
          </span>
          <h1 className="text-2xl font-display font-extrabold text-slate-900 mt-1">
            Global Website Settings
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Updates to phone numbers, company name, addresses, and branding reflect immediately across the entire website.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="btn-industrial-primary text-xs"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save All Settings</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">All settings have been successfully updated in SQLite database! Changes are live on the public website.</span>
        </div>
      )}

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-6 pt-3 rounded-t-lg">
        <button
          onClick={() => setActiveSubTab('company')}
          className={`pb-3 text-xs font-semibold px-3 border-b-2 transition-colors cursor-pointer ${
            activeSubTab === 'company'
              ? 'border-amber-500 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Company Information
        </button>
        <button
          onClick={() => setActiveSubTab('contact')}
          className={`pb-3 text-xs font-semibold px-3 border-b-2 transition-colors cursor-pointer ${
            activeSubTab === 'contact'
              ? 'border-amber-500 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Contact & Communication
        </button>
        <button
          onClick={() => setActiveSubTab('branding')}
          className={`pb-3 text-xs font-semibold px-3 border-b-2 transition-colors cursor-pointer ${
            activeSubTab === 'branding'
              ? 'border-amber-500 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Logo & Branding
        </button>
        <button
          onClick={() => setActiveSubTab('seo')}
          className={`pb-3 text-xs font-semibold px-3 border-b-2 transition-colors cursor-pointer ${
            activeSubTab === 'seo'
              ? 'border-amber-500 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Website & SEO Metadata
        </button>
        <button
          onClick={() => setActiveSubTab('social')}
          className={`pb-3 text-xs font-semibold px-3 border-b-2 transition-colors cursor-pointer ${
            activeSubTab === 'social'
              ? 'border-amber-500 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Social Media Links
        </button>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-b-lg border border-slate-200 border-t-0 shadow-xs space-y-6">
        {/* Tab 1: Company Info */}
        {activeSubTab === 'company' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Corporate Identity & Legal Address
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                  Corporate Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                  Registered Domain
                </label>
                <input
                  type="text"
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                  Office / Warehouse Operating Hours
                </label>
                <input
                  type="text"
                  value={formData.office_hours}
                  onChange={(e) => setFormData({ ...formData, office_hours: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Full Physical Address *
              </label>
              <textarea
                rows={2}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Google Map Embed URL (iframe src)
              </label>
              <input
                type="text"
                value={formData.google_map_embed}
                onChange={(e) => setFormData({ ...formData, google_map_embed: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500 font-mono"
              />
              <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                Paste the 'src' attribute from Google Maps 'Embed a map' share option.
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: Contact Info */}
        {activeSubTab === 'contact' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Phone, WhatsApp & Email Routing
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                  Primary Phone Number (Used in Call Now) *
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                  Secondary Emergency Phone
                </label>
                <input
                  type="text"
                  value={formData.secondary_phone}
                  onChange={(e) => setFormData({ ...formData, secondary_phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                  General Inquiries Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                  Sales / Quotations Email
                </label>
                <input
                  type="email"
                  value={formData.sales_email}
                  onChange={(e) => setFormData({ ...formData, sales_email: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                  WhatsApp Direct Number (e.g. +8801711234567) *
                </label>
                <input
                  type="text"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                  Default WhatsApp Greeting Message
                </label>
                <input
                  type="text"
                  value={formData.whatsapp_message}
                  onChange={(e) => setFormData({ ...formData, whatsapp_message: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Logo & Branding */}
        {activeSubTab === 'branding' && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Logo, Favicon & Brand Marks
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Logo Box */}
              <div className="p-4 rounded-lg border border-slate-200 space-y-3">
                <ImageUploadField
                  label="Website Header Brand Logo"
                  value={formData.logo_url}
                  onChange={(val) => setFormData({ ...formData, logo_url: val })}
                  helperText="Upload official brand vector/mark (PNG, SVG, JPG) or paste URL"
                  aspectRatio="auto"
                />

                {formData.logo_url && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, logo_url: '' })}
                    className="text-xs text-rose-600 hover:underline font-mono block pt-1"
                  >
                    Reset to Default Corporate Mark
                  </button>
                )}
              </div>

              {/* Favicon Box */}
              <div className="p-4 rounded-lg border border-slate-200 space-y-3">
                <ImageUploadField
                  label="Browser Tab Favicon"
                  value={formData.favicon_url}
                  onChange={(val) => setFormData({ ...formData, favicon_url: val })}
                  helperText="Upload favicon (.ico, .png, .svg) from computer or paste icon URL"
                  aspectRatio="square"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: SEO Metadata */}
        {activeSubTab === 'seo' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Search Engine Optimization (SEO) & Footer Copy
            </h3>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Website Meta Title *
              </label>
              <input
                type="text"
                value={formData.website_title}
                onChange={(e) => setFormData({ ...formData, website_title: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Search Engine Meta Description *
              </label>
              <textarea
                rows={3}
                value={formData.meta_description}
                onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Footer Corporate Description Text *
              </label>
              <textarea
                rows={3}
                value={formData.footer_text}
                onChange={(e) => setFormData({ ...formData, footer_text: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Footer Copyright Text *
              </label>
              <input
                type="text"
                value={formData.copyright_text}
                onChange={(e) => setFormData({ ...formData, copyright_text: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500 font-mono"
              />
            </div>
          </div>
        )}

        {/* Tab 5: Social Media Accounts Management */}
        {activeSubTab === 'social' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Corporate Social Media Profiles & Channels ({socialLinks.length})
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  Add, configure, or remove social profiles displayed across the website header and footer.
                </p>
              </div>

              {!isAddingSocial && (
                <button
                  type="button"
                  onClick={() => setIsAddingSocial(true)}
                  className="btn-industrial-primary text-xs shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Social Media</span>
                </button>
              )}
            </div>

            {/* Add New Social Form */}
            {isAddingSocial && (
              <div className="p-5 rounded-lg border-2 border-amber-400 bg-amber-50/30 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                    Add New Social Media Profile
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsAddingSocial(false)}
                    className="p-1 text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                      Platform Type *
                    </label>
                    <select
                      value={newSocial.platform}
                      onChange={(e) => {
                        const plat = e.target.value;
                        setNewSocial({
                          ...newSocial,
                          platform: plat,
                          label: newSocial.label || (plat.charAt(0).toUpperCase() + plat.slice(1)),
                        });
                      }}
                      className="w-full px-3 py-2 text-xs rounded border border-slate-200 bg-white font-mono"
                    >
                      <option value="linkedin">LinkedIn</option>
                      <option value="facebook">Facebook</option>
                      <option value="youtube">YouTube</option>
                      <option value="twitter">X / Twitter</option>
                      <option value="instagram">Instagram</option>
                      <option value="whatsapp">WhatsApp Channel/Group</option>
                      <option value="telegram">Telegram</option>
                      <option value="tiktok">TikTok</option>
                      <option value="other">Other / Custom</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                      Display Label *
                    </label>
                    <input
                      type="text"
                      required
                      value={newSocial.label}
                      onChange={(e) => setNewSocial({ ...newSocial, label: e.target.value })}
                      placeholder="e.g. LinkedIn or Corporate Page"
                      className="w-full px-3 py-2 text-xs rounded border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={newSocial.order}
                      onChange={(e) => setNewSocial({ ...newSocial, order: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs rounded border border-slate-200 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                    Profile or Channel Full URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={newSocial.url}
                    onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })}
                    placeholder="https://instagram.com/artindustrialsolutions"
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 font-mono focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 text-xs font-mono cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newSocial.is_active}
                      onChange={(e) => setNewSocial({ ...newSocial, is_active: e.target.checked })}
                    />
                    <span>Active & Visible to Public</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingSocial(false)}
                      className="btn-industrial-outline text-xs py-1.5 px-3"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAddSocial}
                      className="btn-industrial-primary text-xs py-1.5 px-3"
                    >
                      Save Social Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* List of Accounts */}
            <div className="space-y-3">
              {socialLinks.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200 text-xs text-slate-500 font-mono">
                  No social accounts configured yet. Click "Add Social Media" to create one.
                </div>
              ) : (
                socialLinks.map((link) => (
                  <div 
                    key={link.id} 
                    className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-100/50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 w-full sm:w-48 shrink-0">
                      <select
                        value={link.platform}
                        onChange={(e) => store.updateSocialLink(link.id, { platform: e.target.value as any })}
                        className="text-xs font-mono font-bold capitalize bg-white border border-slate-200 rounded px-2 py-1"
                      >
                        <option value="linkedin">LinkedIn</option>
                        <option value="facebook">Facebook</option>
                        <option value="youtube">YouTube</option>
                        <option value="twitter">X / Twitter</option>
                        <option value="instagram">Instagram</option>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="telegram">Telegram</option>
                        <option value="tiktok">TikTok</option>
                        <option value="other">Other</option>
                      </select>

                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) => store.updateSocialLink(link.id, { label: e.target.value })}
                        className="text-xs font-medium px-2 py-1 rounded border border-slate-200 bg-white w-28"
                        placeholder="Label"
                      />
                    </div>

                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => store.updateSocialLink(link.id, { url: e.target.value })}
                      placeholder="https://..."
                      className="flex-1 w-full px-3 py-1.5 text-xs rounded border border-slate-200 bg-white focus:outline-hidden focus:border-amber-500 font-mono"
                    />

                    <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                      <label className="flex items-center gap-1.5 text-xs text-slate-600 font-mono cursor-pointer shrink-0">
                        <input
                          type="checkbox"
                          checked={link.is_active}
                          onChange={(e) => store.updateSocialLink(link.id, { is_active: e.target.checked })}
                          className="rounded text-amber-500 focus:ring-0"
                        />
                        <span>Active</span>
                      </label>

                      {link.url && (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-slate-400 hover:text-slate-800"
                          title="Open link in new tab"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDeleteSocial(link.id, link.label)}
                        className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                        title="Delete social media account"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Form Bottom Action */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">
            SQLite Database Storage · Persistent
          </span>
          <button
            type="submit"
            className="btn-industrial-primary text-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save All Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
