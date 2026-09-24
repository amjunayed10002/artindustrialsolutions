import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { VendorDocument } from '../../types';
import { Plus, Edit, Trash2, CheckCircle2, XCircle, Save, X, Briefcase, Download } from 'lucide-react';
import { FileUploadField } from './FileUploadField';

export const AdminVendorDocs: React.FC = () => {
  const { vendorDocuments, store } = useData();
  const [editingDoc, setEditingDoc] = useState<VendorDocument | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    document_code: '',
    description: '',
    file_format: 'PDF',
    file_size: '2.5 MB',
    file_url: '#',
    order: vendorDocuments.length + 1,
    is_active: true,
  });

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingDoc(null);
    setFormData({
      title: '',
      document_code: `ART-DOC-${Date.now().toString().slice(-4)}`,
      description: '',
      file_format: 'PDF',
      file_size: '1.8 MB',
      file_url: '#',
      order: vendorDocuments.length + 1,
      is_active: true,
    });
  };

  const handleStartEdit = (doc: VendorDocument) => {
    setEditingDoc(doc);
    setIsCreating(false);
    setFormData({
      title: doc.title,
      document_code: doc.document_code,
      description: doc.description,
      file_format: doc.file_format,
      file_size: doc.file_size,
      file_url: doc.file_url,
      order: doc.order,
      is_active: doc.is_active,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const payload = {
      ...formData,
      title: formData.title.trim(),
      document_code: formData.document_code.trim(),
      description: formData.description.trim(),
      order: Number(formData.order),
      updated_at: new Date().toISOString().substring(0, 10),
    };

    if (isCreating) {
      store.addVendorDocument(payload);
      setIsCreating(false);
    } else if (editingDoc) {
      store.updateVendorDocument(editingDoc.id, payload);
      setEditingDoc(null);
    }
  };

  const handleDelete = (doc: VendorDocument) => {
    if (confirm(`Are you sure you want to delete vendor document "${doc.title}"?`)) {
      store.deleteVendorDocument(doc.id);
    }
  };

  const sorted = [...vendorDocuments].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-mono font-semibold text-amber-600 uppercase tracking-wider">
            Procurement Dossiers
          </span>
          <h1 className="text-2xl font-display font-extrabold text-slate-900 mt-1">
            Vendor Enlistment Documents CMS
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Upload, update, or remove company profiles, capability statements, and catalogs downloadable by client purchase teams.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="btn-industrial-primary text-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Vendor Docket File</span>
        </button>
      </div>

      {/* Editor Modal */}
      {(isCreating || editingDoc) && (
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-lg border border-amber-300 shadow-md space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 font-display">
              {isCreating ? 'Register Vendor Document File' : `Edit File: ${editingDoc?.title}`}
            </h3>
            <button
              type="button"
              onClick={() => { setIsCreating(false); setEditingDoc(null); }}
              className="text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Document Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Official Corporate Company Profile 2026"
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Document Code *
              </label>
              <input
                type="text"
                required
                value={formData.document_code}
                onChange={(e) => setFormData({ ...formData, document_code: e.target.value })}
                placeholder="ART-DOC-CP2026"
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                File Format
              </label>
              <input
                type="text"
                value={formData.file_format}
                onChange={(e) => setFormData({ ...formData, file_format: e.target.value })}
                placeholder="PDF, XLSX, ZIP"
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                File Size
              </label>
              <input
                type="text"
                value={formData.file_size}
                onChange={(e) => setFormData({ ...formData, file_size: e.target.value })}
                placeholder="e.g. 4.8 MB"
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Display Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded border border-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
              Document Description *
            </label>
            <textarea
              rows={2}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="State contents, page count, and procurement relevance..."
              className="w-full px-3 py-2 text-xs rounded border border-slate-200"
            />
          </div>

          <FileUploadField
            label="Enlistment Document Photo Scan (PNG, JPG) or Official PDF"
            value={formData.file_url === '#' ? '' : formData.file_url}
            onChange={(val, meta) => setFormData({ 
              ...formData, 
              file_url: val || '#',
              file_format: meta?.format || formData.file_format,
              file_size: meta?.size || formData.file_size
            })}
            helperText="Upload real document photo scan (PNG, JPG) or official PDF file from your device, or enter link"
          />

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 text-xs font-mono cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              />
              <span>Available for Public Procurement Download</span>
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => { setIsCreating(false); setEditingDoc(null); }}
                className="btn-industrial-outline text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-industrial-primary text-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Vendor File</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Vendor Files List */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {sorted.map((doc) => (
          <div key={doc.id} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">{doc.title}</span>
                <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200/60">
                  {doc.document_code}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {doc.file_format} · {doc.file_size}
                </span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold uppercase ${
                  doc.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {doc.is_active ? 'Active' : 'Disabled'}
                </span>
              </div>

              <p className="text-xs text-slate-500 line-clamp-1">
                {doc.description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
              <button
                onClick={() => store.updateVendorDocument(doc.id, { is_active: !doc.is_active })}
                className={`p-1.5 rounded border text-xs ${
                  doc.is_active ? 'text-emerald-700 border-emerald-200 bg-emerald-50' : 'text-slate-500 border-slate-200'
                }`}
                title="Toggle Active"
              >
                {doc.is_active ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              </button>

              <button
                onClick={() => handleStartEdit(doc)}
                className="btn-industrial-outline text-xs py-1.5 px-3"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => handleDelete(doc)}
                className="p-1.5 text-rose-600 hover:bg-rose-50 rounded border border-rose-200"
                title="Delete Vendor File"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
