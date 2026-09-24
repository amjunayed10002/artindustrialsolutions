import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { EngineeringService } from '../../types';
import { Plus, Edit, Trash2, CheckCircle2, XCircle, Save, X, Wrench } from 'lucide-react';
import { ImageUploadField } from './ImageUploadField';

export const AdminServices: React.FC = () => {
  const { services, store } = useData();
  const [editingService, setEditingService] = useState<EngineeringService | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    short_description: '',
    full_description: '',
    image_url: '/src/assets/images/industrial_engineering_service_1790260740648.jpg',
    icon_name: 'Wrench',
    deliverables: ['Laser alignment', 'Vibration baseline', 'Commissioning'],
    order: services.length + 1,
    is_active: true,
    is_featured: true,
  });

  const [deliverablesText, setDeliverablesText] = useState('');

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingService(null);
    setFormData({
      title: '',
      slug: '',
      short_description: '',
      full_description: '',
      image_url: '/src/assets/images/industrial_engineering_service_1790260740648.jpg',
      icon_name: 'Wrench',
      deliverables: ['Turnaround timeline planning', 'Safety compliance protocol', 'Final load commissioning'],
      order: services.length + 1,
      is_active: true,
      is_featured: true,
    });
    setDeliverablesText('Turnaround timeline planning\nSafety compliance protocol\nFinal load commissioning');
  };

  const handleStartEdit = (service: EngineeringService) => {
    setEditingService(service);
    setIsCreating(false);
    setFormData({
      title: service.title,
      slug: service.slug,
      short_description: service.short_description,
      full_description: service.full_description,
      image_url: service.image_url,
      icon_name: service.icon_name,
      deliverables: service.deliverables || [],
      order: service.order,
      is_active: service.is_active,
      is_featured: service.is_featured,
    });
    setDeliverablesText((service.deliverables || []).join('\n'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const deliverables = deliverablesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title.trim(),
      slug: formData.slug.trim() || generateSlug(formData.title),
      short_description: formData.short_description.trim(),
      full_description: formData.full_description.trim(),
      image_url: formData.image_url,
      icon_name: formData.icon_name,
      deliverables,
      order: Number(formData.order),
      is_active: formData.is_active,
      is_featured: formData.is_featured,
    };

    if (isCreating) {
      store.addService(payload);
      setIsCreating(false);
    } else if (editingService) {
      store.updateService(editingService.id, payload);
      setEditingService(null);
    }
  };

  const handleDelete = (service: EngineeringService) => {
    if (confirm(`Are you sure you want to delete service "${service.title}"?`)) {
      store.deleteService(service.id);
    }
  };

  const sorted = [...services].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-mono font-semibold text-amber-600 uppercase tracking-wider">
            Turnkey Mechanical Solutions
          </span>
          <h1 className="text-2xl font-display font-extrabold text-slate-900 mt-1">
            Engineering Services Management
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Configure mechanical maintenance, shutdown turnaround, fabrication, and installation capabilities.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="btn-industrial-primary text-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Editor Modal */}
      {(isCreating || editingService) && (
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-lg border border-amber-300 shadow-md space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 font-display">
              {isCreating ? 'Create Engineering Service' : `Edit Service: ${editingService?.title}`}
            </h3>
            <button
              type="button"
              onClick={() => { setIsCreating(false); setEditingService(null); }}
              className="text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Service Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  title: e.target.value,
                  slug: isCreating ? generateSlug(e.target.value) : formData.slug
                })}
                placeholder="e.g. Boiler Overhaul & Tube Inspection"
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                URL Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 font-mono focus:outline-hidden focus:border-amber-500"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Short Description *
              </label>
              <textarea
                rows={2}
                required
                value={formData.short_description}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded border border-slate-200"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Detailed Scope
              </label>
              <textarea
                rows={2}
                value={formData.full_description}
                onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded border border-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
              Key Engineering Deliverables (One item per line)
            </label>
            <textarea
              rows={3}
              value={deliverablesText}
              onChange={(e) => setDeliverablesText(e.target.value)}
              placeholder="Precision laser shaft alignment&#10;Dynamic rotor balancing&#10;Non-destructive testing"
              className="w-full px-3 py-2 text-xs rounded border border-slate-200 font-mono"
            />
          </div>

          <ImageUploadField
            label="Service Cover Photo"
            value={formData.image_url}
            onChange={(val) => setFormData({ ...formData, image_url: val })}
            helperText="Upload service machinery/engineering photo from device or provide image URL"
          />

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs font-mono cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
              />
              <span>Featured on Homepage</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-mono cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              />
              <span>Published & Active</span>
            </label>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => { setIsCreating(false); setEditingService(null); }}
              className="btn-industrial-outline text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-industrial-primary text-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Service</span>
            </button>
          </div>
        </form>
      )}

      {/* Services List */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {sorted.map((serv) => (
          <div key={serv.id} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-slate-50/60 transition-colors">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-16 h-14 rounded border border-slate-200 overflow-hidden bg-slate-900 shrink-0">
                <img src={serv.image_url} alt="" className="w-full h-full object-cover" />
              </div>

              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900 truncate">
                    {serv.title}
                  </span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold uppercase ${
                    serv.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {serv.is_active ? 'Active' : 'Hidden'}
                  </span>
                  {serv.is_featured && (
                    <span className="text-[10px] font-mono bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold">
                      Homepage
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 line-clamp-1">
                  {serv.short_description}
                </p>

                <div className="text-[11px] font-mono text-slate-400">
                  Deliverables: {serv.deliverables?.length || 0} items · Order: {serv.order}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
              <button
                onClick={() => store.updateService(serv.id, { is_active: !serv.is_active })}
                className={`p-1.5 rounded border text-xs ${
                  serv.is_active ? 'text-emerald-700 border-emerald-200 bg-emerald-50' : 'text-slate-500 border-slate-200'
                }`}
                title="Toggle Active"
              >
                {serv.is_active ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              </button>

              <button
                onClick={() => handleStartEdit(serv)}
                className="btn-industrial-outline text-xs py-1.5 px-3"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => handleDelete(serv)}
                className="p-1.5 text-rose-600 hover:bg-rose-50 rounded border border-rose-200"
                title="Delete Service"
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
