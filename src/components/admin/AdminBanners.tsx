import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Banner } from '../../types';
import { Plus, Edit, Trash2, CheckCircle2, XCircle, ArrowUp, ArrowDown, Save, X, Image as ImageIcon } from 'lucide-react';
import { ImageUploadField } from './ImageUploadField';

export const AdminBanners: React.FC = () => {
  const { banners, store } = useData();
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState<Omit<Banner, 'id'>>({
    title: '',
    subtitle: '',
    description: '',
    image_url: '',
    button_text: 'Request a Quotation',
    button_url: '/rfq',
    is_button_visible: true,
    order: banners.length + 1,
    is_active: true,
  });

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingBanner(null);
    setFormData({
      title: 'New Industrial Supply Slide',
      subtitle: 'Precision Mechanical Solutions',
      description: 'Supplying certified bearings, high-pressure valves, and structural consumables for heavy manufacturing.',
      image_url: '/src/assets/images/hero_industrial_warehouse_1790260728838.jpg',
      button_text: 'Request a Quotation',
      button_url: '/rfq',
      is_button_visible: true,
      order: banners.length + 1,
      is_active: true,
    });
  };

  const handleStartEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setIsCreating(false);
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle,
      description: banner.description,
      image_url: banner.image_url,
      button_text: banner.button_text,
      button_url: banner.button_url,
      is_button_visible: banner.is_button_visible,
      order: banner.order,
      is_active: banner.is_active,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image_url: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreating) {
      store.addBanner(formData);
      setIsCreating(false);
    } else if (editingBanner) {
      store.updateBanner(editingBanner.id, formData);
      setEditingBanner(null);
    }
  };

  const handleDelete = (id: number) => {
    if (banners.length <= 1) {
      alert('You must have at least one hero banner.');
      return;
    }
    if (confirm('Are you sure you want to delete this banner slide?')) {
      store.deleteBanner(id);
    }
  };

  const handleToggleActive = (banner: Banner) => {
    store.updateBanner(banner.id, { is_active: !banner.is_active });
  };

  const sortedBanners = [...banners].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-mono font-semibold text-amber-600 uppercase tracking-wider">
            Homepage Presentation
          </span>
          <h1 className="text-2xl font-display font-extrabold text-slate-900 mt-1">
            Hero Banners Management
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Add, edit, reorder, or replace images for homepage hero carousel slides.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="btn-industrial-primary text-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Banner Slide</span>
        </button>
      </div>

      {/* Editor Modal / Panel */}
      {(isCreating || editingBanner) && (
        <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-lg border border-amber-300 shadow-md space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 font-display">
              {isCreating ? 'Create New Hero Banner' : `Edit Banner Slide #${editingBanner?.id}`}
            </h3>
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setEditingBanner(null);
              }}
              className="text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Headline Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Subtitle / Kicker
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
              Banner Description *
            </label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
            />
          </div>

          {/* Image Upload & Preview */}
          <ImageUploadField
            label="Hero Slide Background Image"
            value={formData.image_url}
            onChange={(val) => setFormData({ ...formData, image_url: val })}
            helperText="Upload industrial plant/warehouse banner from device or enter image URL"
            aspectRatio="wide"
            required
          />

          {/* Button Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Button Text
              </label>
              <input
                type="text"
                value={formData.button_text}
                onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Button URL / Link
              </label>
              <input
                type="text"
                value={formData.button_url}
                onChange={(e) => setFormData({ ...formData, button_url: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500 font-mono"
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
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs font-mono text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_button_visible}
                onChange={(e) => setFormData({ ...formData, is_button_visible: e.target.checked })}
                className="rounded text-amber-500"
              />
              <span>Show CTA Button</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-mono text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="rounded text-amber-500"
              />
              <span>Active on Homepage</span>
            </label>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setEditingBanner(null);
              }}
              className="btn-industrial-outline text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-industrial-primary text-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isCreating ? 'Create Banner' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Existing Banners List */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {sortedBanners.map((banner, index) => (
          <div key={banner.id} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-slate-50/60 transition-colors">
            {/* Thumbnail */}
            <div className="w-full md:w-44 h-24 rounded border border-slate-200 overflow-hidden bg-slate-900 shrink-0 relative">
              <img src={banner.image_url} alt="" className="w-full h-full object-cover" />
              <div className="absolute top-1.5 left-1.5 bg-slate-900/90 text-amber-400 text-[10px] font-mono px-1.5 py-0.5 rounded">
                Slide #{banner.order}
              </div>
            </div>

            {/* Content Preview */}
            <div className="flex-1 space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-amber-600 font-semibold uppercase">
                  {banner.subtitle || 'Slide'}
                </span>
                <span className="text-slate-300">·</span>
                <span className={`text-[10px] font-mono px-2 py-0.2 rounded font-bold uppercase ${
                  banner.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {banner.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 truncate">
                {banner.title}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-2">
                {banner.description}
              </p>

              <div className="text-[11px] font-mono text-slate-400 pt-1">
                Button: <span className="text-slate-700 font-medium">{banner.is_button_visible ? `"${banner.button_text}" → ${banner.button_url}` : 'Disabled'}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
              <button
                onClick={() => handleToggleActive(banner)}
                className={`p-2 rounded border text-xs transition-colors ${
                  banner.is_active 
                    ? 'border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100' 
                    : 'border-slate-200 text-slate-500 bg-slate-50 hover:bg-slate-100'
                }`}
                title={banner.is_active ? 'Deactivate banner' : 'Activate banner'}
              >
                {banner.is_active ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              </button>

              <button
                onClick={() => handleStartEdit(banner)}
                className="btn-industrial-outline text-xs py-1.5 px-3"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => handleDelete(banner.id)}
                className="p-2 rounded border border-rose-200 text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
                title="Delete banner"
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
