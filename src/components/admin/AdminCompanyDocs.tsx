import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { CompanyDocument } from '../../types';
import { Plus, Edit, Trash2, CheckCircle2, XCircle, Save, X, FileText, UploadCloud } from 'lucide-react';
import { FileUploadField } from './FileUploadField';

export const AdminCompanyDocs: React.FC = () => {
  const { companyDocuments, store } = useData();
  const [editingDoc, setEditingDoc] = useState<CompanyDocument | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Legal' as CompanyDocument['category'],
    document_number: '',
    issuing_authority: '',
    description: '',
    file_url: '#',
    order: companyDocuments.length + 1,
    is_active: true,
  });

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingDoc(null);
    setFormData({
      title: '',
      category: 'Legal',
      document_number: '',
      issuing_authority: '',
      description: '',
      file_url: '#',
      order: companyDocuments.length + 1,
      is_active: true,
    });
  };

  const handleStartEdit = (doc: CompanyDocument) => {
    setEditingDoc(doc);
    setIsCreating(false);
    setFormData({
      title: doc.title,
      category: doc.category,
      document_number: doc.document_number,
      issuing_authority: doc.issuing_authority,
      description: doc.description,
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
      document_number: formData.document_number.trim(),
      issuing_authority: formData.issuing_authority.trim(),
      description: formData.description.trim(),
      order: Number(formData.order),
      updated_at: new Date().toISOString().substring(0, 10),
    };

    if (isCreating) {
      store.addCompanyDocument(payload);
      setIsCreating(false);
    } else if (editingDoc) {
      store.updateCompanyDocument(editingDoc.id, payload);
      setEditingDoc(null);
    }
  };

  const handleDelete = (doc: CompanyDocument) => {
    if (confirm(`Are you sure you want to remove document "${doc.title}"?`)) {
      store.deleteCompanyDocument(doc.id);
    }
  };

  const sorted = [...companyDocuments].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-mono font-semibold text-amber-600 uppercase tracking-wider">
            Statutory Clearances
          </span>
          <h1 className="text-2xl font-display font-extrabold text-slate-900 mt-1">
            Company Profile Documents CMS
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Manage Trade License, BIN, TIN, IRC, ERC, DCCI Membership, and Bank Solvency shown on the Company Profile page.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="btn-industrial-primary text-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Official Document</span>
        </button>
      </div>

      {/* Editor Modal */}
      {(isCreating || editingDoc) && (
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-lg border border-amber-300 shadow-md space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 font-display">
              {isCreating ? 'Register New Official Document' : `Edit Document: ${editingDoc?.title}`}
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
            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Document Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Trade License (DNCC)"
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 bg-white"
              >
                <option value="Legal">Legal</option>
                <option value="Tax">Tax</option>
                <option value="Membership">Membership</option>
                <option value="Financial">Financial</option>
                <option value="Compliance">Compliance</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Registration / Serial Number *
              </label>
              <input
                type="text"
                required
                value={formData.document_number}
                onChange={(e) => setFormData({ ...formData, document_number: e.target.value })}
                placeholder="TRAD/DNCC/024819/2021"
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Issuing Authority / Agency *
              </label>
              <input
                type="text"
                required
                value={formData.issuing_authority}
                onChange={(e) => setFormData({ ...formData, issuing_authority: e.target.value })}
                placeholder="e.g. Dhaka North City Corporation or NBR"
                className="w-full px-3 py-2 text-xs rounded border border-slate-200"
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
              Description & Verification Scope *
            </label>
            <textarea
              rows={2}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="State the validity period, permissible trade scope, or tax zone..."
              className="w-full px-3 py-2 text-xs rounded border border-slate-200"
            />
          </div>

          <FileUploadField
            label="Official Document Scan / Certificate File"
            value={formData.file_url === '#' ? '' : formData.file_url}
            onChange={(val) => setFormData({ ...formData, file_url: val || '#' })}
            helperText="Upload official scan (PDF, PNG, JPG) from computer or provide secure document link"
          />

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 text-xs font-mono cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              />
              <span>Active & Viewable by Public Visitors</span>
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
                <span>Save Document Record</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Documents Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {sorted.map((doc) => (
          <div key={doc.id} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">{doc.title}</span>
                <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded border border-slate-200">
                  {doc.category}
                </span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold uppercase ${
                  doc.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {doc.is_active ? 'Published' : 'Hidden'}
                </span>
              </div>

              <div className="text-xs font-mono text-amber-700">
                Reg: {doc.document_number} · Authority: {doc.issuing_authority}
              </div>

              <p className="text-xs text-slate-500 line-clamp-1">
                {doc.description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
              <button
                onClick={() => store.updateCompanyDocument(doc.id, { is_active: !doc.is_active })}
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
                title="Delete Document"
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
