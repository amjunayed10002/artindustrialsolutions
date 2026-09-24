import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Industry } from '../../types';
import { Plus, Edit, Trash2, CheckCircle2, XCircle, Save, X, Building2 } from 'lucide-react';
import { ImageUploadField } from './ImageUploadField';

export const AdminIndustries: React.FC = () => {
  const { industries, store } = useData();
  const [editingIndustry, setEditingIndustry] = useState<Industry | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image_url: '/src/assets/images/industrial_manufacturing_plant_1790260752764.jpg',
    supplied_equipment: ['Bearings', 'Valves', 'Piping'],
    order: industries.length + 1,
    is_active: true,
  });

  const [equipmentText, setEquipmentText] = useState('');

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingIndustry(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      image_url: '/src/assets/images/industrial_manufacturing_plant_1790260752764.jpg',
      supplied_equipment: ['Pumps', 'Shaft Couplings', 'Mechanical Seals'],
      order: industries.length + 1,
      is_active: true,
    });
    setEquipmentText('Pumps\nShaft Couplings\nMechanical Seals');
  };

  const handleStartEdit = (ind: Industry) => {
    setEditingIndustry(ind);
    setIsCreating(false);
    setFormData({
      name: ind.name,
      slug: ind.slug,
      description: ind.description,
      image_url: ind.image_url,
      supplied_equipment: ind.supplied_equipment || [],
      order: ind.order,
      is_active: ind.is_active,
    });
    setEquipmentText((ind.supplied_equipment || []).join('\n'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const supplied_equipment = equipmentText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      name: formData.name.trim(),
      slug: formData.slug.trim() || generateSlug(formData.name),
      description: formData.description.trim(),
      image_url: formData.image_url,
      supplied_equipment,
      order: Number(formData.order),
      is_active: formData.is_active,
    };

    if (isCreating) {
      store.addIndustry(payload);
      setIsCreating(false);
    } else if (editingIndustry) {
      store.updateIndustry(editingIndustry.id, payload);
      setEditingIndustry(null);
    }
  };

  const handleDelete = (ind: Industry) => {
    if (confirm(`Are you sure you want to delete industry sector "${ind.name}"?`)) {
      store.deleteIndustry(ind.id);
    }
  };

  const sorted = [...industries].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-mono font-semibold text-amber-600 uppercase tracking-wider">
            Industrial Client Base
          </span>
          <h1 className="text-2xl font-display font-extrabold text-slate-900 mt-1">
            Industries We Serve Management
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Manage target sectors, sector-specific mechanical supplies, and presentation on the website.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="btn-industrial-primary text-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Industry</span>
        </button>
      </div>

      {/* Editor Modal */}
      {(isCreating || editingIndustry) && (
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-lg border border-amber-300 shadow-md space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 font-display">
              {isCreating ? 'Create Industry Sector' : `Edit Sector: ${editingIndustry?.name}`}
            </h3>
            <button
              type="button"
              onClick={() => { setIsCreating(false); setEditingIndustry(null); }}
              className="text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Industry Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  name: e.target.value,
                  slug: isCreating ? generateSlug(e.target.value) : formData.slug
                })}
                placeholder="e.g. Shipbuilding & Maritime"
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

          <div>
            <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
              Sector Description *
            </label>
            <textarea
              rows={2}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded border border-slate-200"
            />
          </div>

          <div>
            <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
              Common Equipment Supplied (One per line)
            </label>
            <textarea
              rows={3}
              value={equipmentText}
              onChange={(e) => setEquipmentText(e.target.value)}
              placeholder="High pressure valves&#10;Spherical bearings&#10;Hardox chutes"
              className="w-full px-3 py-2 text-xs rounded border border-slate-200 font-mono"
            />
          </div>

          <ImageUploadField
            label="Industry Sector Cover Photo"
            value={formData.image_url}
            onChange={(val) => setFormData({ ...formData, image_url: val })}
            helperText="Upload industrial plant/factory photo from device or paste image URL"
          />

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 text-xs font-mono cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              />
              <span>Active on Public Website</span>
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => { setIsCreating(false); setEditingIndustry(null); }}
                className="btn-industrial-outline text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-industrial-primary text-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Industry</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Industries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((ind) => (
          <div key={ind.id} className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">{ind.name}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold uppercase ${
                  ind.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {ind.is_active ? 'Active' : 'Disabled'}
                </span>
              </div>

              <p className="text-xs text-slate-500 line-clamp-2 mt-2">
                {ind.description}
              </p>

              <div className="text-[11px] font-mono text-slate-400 mt-2">
                Equipment: {ind.supplied_equipment?.length || 0} items listed
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">Order: {ind.order}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => store.updateIndustry(ind.id, { is_active: !ind.is_active })}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  {ind.is_active ? 'Hide' : 'Show'}
                </button>
                <button
                  onClick={() => handleStartEdit(ind)}
                  className="btn-industrial-outline text-xs py-1 px-2.5"
                >
                  <Edit className="w-3 h-3" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(ind)}
                  className="p-1 text-rose-500 hover:text-rose-700"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
