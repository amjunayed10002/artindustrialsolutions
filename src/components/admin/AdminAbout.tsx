import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { AboutSection, CoreValue, WhyChooseReason } from '../../types';
import { Save, Plus, Edit, Trash2, CheckCircle2, UploadCloud, X } from 'lucide-react';
import { ImageUploadField } from './ImageUploadField';

export const AdminAbout: React.FC = () => {
  const { about, coreValues, whyChooseReasons, store } = useData();
  const [formData, setFormData] = useState<AboutSection>({ ...about });
  const [activeSection, setActiveSection] = useState<'general' | 'proprietor' | 'values' | 'why-choose'>('general');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Core Value modal state
  const [editingValue, setEditingValue] = useState<CoreValue | null>(null);
  const [isAddingValue, setIsAddingValue] = useState(false);
  const [valForm, setValForm] = useState({ title: '', description: '', icon_name: 'ShieldCheck', order: 1 });

  // Why choose reason modal state
  const [editingReason, setEditingReason] = useState<WhyChooseReason | null>(null);
  const [isAddingReason, setIsAddingReason] = useState(false);
  const [reasonForm, setReasonForm] = useState({ title: '', description: '', icon_name: 'Award', order: 1, is_active: true });

  const handleProprietorPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          proprietor_photo: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateAbout(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Values Actions
  const handleSaveValue = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAddingValue) {
      store.addCoreValue(valForm);
      setIsAddingValue(false);
    } else if (editingValue) {
      store.updateCoreValue(editingValue.id, valForm);
      setEditingValue(null);
    }
  };

  // Reasons Actions
  const handleSaveReason = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAddingReason) {
      store.addWhyChooseReason(reasonForm);
      setIsAddingReason(false);
    } else if (editingReason) {
      store.updateWhyChooseReason(editingReason.id, reasonForm);
      setEditingReason(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-mono font-semibold text-amber-600 uppercase tracking-wider">
            Corporate Story & Leadership
          </span>
          <h1 className="text-2xl font-display font-extrabold text-slate-900 mt-1">
            About Us & Proprietor CMS
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Manage corporate history, mission, vision, core values, reasons, and the Managing Proprietor's official statement.
          </p>
        </div>

        <button
          onClick={handleSaveAbout}
          className="btn-industrial-primary text-xs"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save About Content</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">About Us content successfully updated in SQLite database!</span>
        </div>
      )}

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-6 pt-3 rounded-t-lg">
        <button
          onClick={() => setActiveSection('general')}
          className={`pb-3 text-xs font-semibold px-3 border-b-2 transition-colors cursor-pointer ${
            activeSection === 'general' ? 'border-amber-500 text-slate-900' : 'border-transparent text-slate-500'
          }`}
        >
          History, Mission & Vision
        </button>
        <button
          onClick={() => setActiveSection('proprietor')}
          className={`pb-3 text-xs font-semibold px-3 border-b-2 transition-colors cursor-pointer ${
            activeSection === 'proprietor' ? 'border-amber-500 text-slate-900' : 'border-transparent text-slate-500'
          }`}
        >
          Managing Proprietor Message
        </button>
        <button
          onClick={() => setActiveSection('values')}
          className={`pb-3 text-xs font-semibold px-3 border-b-2 transition-colors cursor-pointer ${
            activeSection === 'values' ? 'border-amber-500 text-slate-900' : 'border-transparent text-slate-500'
          }`}
        >
          Core Values ({coreValues.length})
        </button>
        <button
          onClick={() => setActiveSection('why-choose')}
          className={`pb-3 text-xs font-semibold px-3 border-b-2 transition-colors cursor-pointer ${
            activeSection === 'why-choose' ? 'border-amber-500 text-slate-900' : 'border-transparent text-slate-500'
          }`}
        >
          Why Choose ART ({whyChooseReasons.length})
        </button>
      </div>

      {/* Main Forms */}
      <div className="bg-white p-6 sm:p-8 rounded-b-lg border border-slate-200 border-t-0 shadow-xs">
        {/* Section 1: History, Mission, Vision */}
        {activeSection === 'general' && (
          <form onSubmit={handleSaveAbout} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Company History Section
              </h3>
              <div>
                <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                  History Heading *
                </label>
                <input
                  type="text"
                  value={formData.history_heading}
                  onChange={(e) => setFormData({ ...formData, history_heading: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                  History Narrative Text *
                </label>
                <textarea
                  rows={4}
                  value={formData.history_text}
                  onChange={(e) => setFormData({ ...formData, history_text: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <ImageUploadField
                label="History Facility Cover Photo"
                value={formData.history_image}
                onChange={(val) => setFormData({ ...formData, history_image: val })}
                helperText="Upload industrial workshop/facility photo from device or provide image link"
              />
            </div>

            <div className="pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mission */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold font-mono uppercase text-slate-900">
                  Mission Statement
                </h4>
                <input
                  type="text"
                  value={formData.mission_heading}
                  onChange={(e) => setFormData({ ...formData, mission_heading: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded border border-slate-200 font-semibold"
                />
                <textarea
                  rows={4}
                  value={formData.mission_text}
                  onChange={(e) => setFormData({ ...formData, mission_text: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded border border-slate-200"
                />
              </div>

              {/* Vision */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold font-mono uppercase text-slate-900">
                  Vision Statement
                </h4>
                <input
                  type="text"
                  value={formData.vision_heading}
                  onChange={(e) => setFormData({ ...formData, vision_heading: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded border border-slate-200 font-semibold"
                />
                <textarea
                  rows={4}
                  value={formData.vision_text}
                  onChange={(e) => setFormData({ ...formData, vision_text: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded border border-slate-200"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button type="submit" className="btn-industrial-primary text-xs">
                <Save className="w-3.5 h-3.5" />
                <span>Save History & Mission</span>
              </button>
            </div>
          </form>
        )}

        {/* Section 2: Managing Proprietor */}
        {activeSection === 'proprietor' && (
          <form onSubmit={handleSaveAbout} className="space-y-6">
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Managing Proprietor Information & Quote
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Photo Box */}
              <div className="md:col-span-5 space-y-3">
                <ImageUploadField
                  label="Managing Proprietor Portrait Photo"
                  value={formData.proprietor_photo}
                  onChange={(val) => setFormData({ ...formData, proprietor_photo: val })}
                  helperText="Upload official executive portrait from device or paste image URL"
                  aspectRatio="square"
                />
              </div>

              {/* Text Fields */}
              <div className="md:col-span-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                      Proprietor Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.proprietor_name}
                      onChange={(e) => setFormData({ ...formData, proprietor_name: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                      Official Designation *
                    </label>
                    <input
                      type="text"
                      value={formData.proprietor_designation}
                      onChange={(e) => setFormData({ ...formData, proprietor_designation: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                    Managing Proprietor Message *
                  </label>
                  <textarea
                    rows={5}
                    value={formData.proprietor_message}
                    onChange={(e) => setFormData({ ...formData, proprietor_message: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                    Signature Text / Title *
                  </label>
                  <input
                    type="text"
                    value={formData.proprietor_signature}
                    onChange={(e) => setFormData({ ...formData, proprietor_signature: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button type="submit" className="btn-industrial-primary text-xs">
                <Save className="w-3.5 h-3.5" />
                <span>Save Proprietor Details</span>
              </button>
            </div>
          </form>
        )}

        {/* Section 3: Core Values CRUD */}
        {activeSection === 'values' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Core Corporate Values
                </h3>
                <p className="text-xs text-slate-500">
                  Add, edit, or remove operating principles shown on the About Us page.
                </p>
              </div>

              <button
                onClick={() => {
                  setIsAddingValue(true);
                  setEditingValue(null);
                  setValForm({ title: '', description: '', icon_name: 'ShieldCheck', order: coreValues.length + 1 });
                }}
                className="btn-industrial-primary text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Value</span>
              </button>
            </div>

            {/* Modal for Core Value */}
            {(isAddingValue || editingValue) && (
              <form onSubmit={handleSaveValue} className="p-4 bg-slate-50 rounded-lg border border-amber-300 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 font-mono">
                    {isAddingValue ? 'Add New Core Value' : `Edit Value: ${editingValue?.title}`}
                  </h4>
                  <button type="button" onClick={() => { setIsAddingValue(false); setEditingValue(null); }}>
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-mono block mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      value={valForm.title}
                      onChange={(e) => setValForm({ ...valForm, title: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono block mb-1">Icon Identifier</label>
                    <select
                      value={valForm.icon_name}
                      onChange={(e) => setValForm({ ...valForm, icon_name: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 bg-white"
                    >
                      <option value="ShieldCheck">ShieldCheck</option>
                      <option value="Wrench">Wrench</option>
                      <option value="Truck">Truck</option>
                      <option value="FileCheck">FileCheck</option>
                      <option value="Award">Award</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-mono block mb-1">Order</label>
                    <input
                      type="number"
                      value={valForm.order}
                      onChange={(e) => setValForm({ ...valForm, order: Number(e.target.value) })}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-mono block mb-1">Description *</label>
                  <textarea
                    rows={2}
                    required
                    value={valForm.description}
                    onChange={(e) => setValForm({ ...valForm, description: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 bg-white"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => { setIsAddingValue(false); setEditingValue(null); }} className="btn-industrial-outline text-xs">
                    Cancel
                  </button>
                  <button type="submit" className="btn-industrial-primary text-xs">
                    Save Value
                  </button>
                </div>
              </form>
            )}

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
              {coreValues.map((val) => (
                <div key={val.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{val.title}</span>
                      <span className="text-[10px] font-mono text-slate-400">Order: {val.order}</span>
                    </div>
                    <p className="text-xs text-slate-600">{val.description}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setEditingValue(val);
                        setIsAddingValue(false);
                        setValForm({ title: val.title, description: val.description, icon_name: val.icon_name, order: val.order });
                      }}
                      className="btn-industrial-outline text-xs py-1 px-2.5"
                    >
                      <Edit className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => store.deleteCoreValue(val.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 4: Why Choose ART Reasons CRUD */}
        {activeSection === 'why-choose' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Why Choose ART Reasons
                </h3>
                <p className="text-xs text-slate-500">
                  Manage the strategic advantage cards shown on the homepage and about page.
                </p>
              </div>

              <button
                onClick={() => {
                  setIsAddingReason(true);
                  setEditingReason(null);
                  setReasonForm({ title: '', description: '', icon_name: 'Award', order: whyChooseReasons.length + 1, is_active: true });
                }}
                className="btn-industrial-primary text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Reason</span>
              </button>
            </div>

            {/* Modal for Why Choose */}
            {(isAddingReason || editingReason) && (
              <form onSubmit={handleSaveReason} className="p-4 bg-slate-50 rounded-lg border border-amber-300 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 font-mono">
                    {isAddingReason ? 'Add Why Choose Reason' : `Edit Reason: ${editingReason?.title}`}
                  </h4>
                  <button type="button" onClick={() => { setIsAddingReason(false); setEditingReason(null); }}>
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-mono block mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      value={reasonForm.title}
                      onChange={(e) => setReasonForm({ ...reasonForm, title: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono block mb-1">Icon</label>
                    <select
                      value={reasonForm.icon_name}
                      onChange={(e) => setReasonForm({ ...reasonForm, icon_name: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 bg-white"
                    >
                      <option value="Award">Award</option>
                      <option value="Package">Package</option>
                      <option value="Users">Users</option>
                      <option value="TrendingDown">TrendingDown</option>
                      <option value="CheckCircle">CheckCircle</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-mono block mb-1">Order</label>
                    <input
                      type="number"
                      value={reasonForm.order}
                      onChange={(e) => setReasonForm({ ...reasonForm, order: Number(e.target.value) })}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-mono block mb-1">Description *</label>
                  <textarea
                    rows={2}
                    required
                    value={reasonForm.description}
                    onChange={(e) => setReasonForm({ ...reasonForm, description: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 bg-white"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs font-mono">
                    <input
                      type="checkbox"
                      checked={reasonForm.is_active}
                      onChange={(e) => setReasonForm({ ...reasonForm, is_active: e.target.checked })}
                    />
                    <span>Active & Visible</span>
                  </label>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => { setIsAddingReason(false); setEditingReason(null); }} className="btn-industrial-outline text-xs">
                      Cancel
                    </button>
                    <button type="submit" className="btn-industrial-primary text-xs">
                      Save Reason
                    </button>
                  </div>
                </div>
              </form>
            )}

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
              {whyChooseReasons.map((r) => (
                <div key={r.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{r.title}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
                        r.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {r.is_active ? 'Active' : 'Hidden'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{r.description}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setEditingReason(r);
                        setIsAddingReason(false);
                        setReasonForm({ title: r.title, description: r.description, icon_name: r.icon_name, order: r.order, is_active: r.is_active });
                      }}
                      className="btn-industrial-outline text-xs py-1 px-2.5"
                    >
                      <Edit className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => store.deleteWhyChooseReason(r.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
