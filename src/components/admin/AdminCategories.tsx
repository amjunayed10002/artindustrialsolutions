import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ProductCategory } from '../../types';
import { Plus, Edit, Trash2, CheckCircle2, XCircle, X, Save, FolderTree, Image as ImageIcon } from 'lucide-react';
import { ImageUploadField } from './ImageUploadField';

export const AdminCategories: React.FC = () => {
  const { categories, products, store } = useData();
  const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image_url: '/src/assets/images/industrial_manufacturing_plant_1790260752764.jpg',
    order: categories.length + 1,
    is_active: true,
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: isCreating ? generateSlug(name) : prev.slug,
    }));
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

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingCategory(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      image_url: '/src/assets/images/industrial_manufacturing_plant_1790260752764.jpg',
      order: categories.length + 1,
      is_active: true,
    });
  };

  const handleStartEdit = (cat: ProductCategory) => {
    setEditingCategory(cat);
    setIsCreating(false);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      image_url: cat.image_url,
      order: cat.order,
      is_active: cat.is_active,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const payload = {
      name: formData.name.trim(),
      slug: formData.slug.trim() || generateSlug(formData.name),
      description: formData.description.trim(),
      image_url: formData.image_url,
      order: Number(formData.order),
      is_active: formData.is_active,
    };

    if (isCreating) {
      store.addCategory(payload);
      setIsCreating(false);
    } else if (editingCategory) {
      store.updateCategory(editingCategory.id, payload);
      setEditingCategory(null);
    }
  };

  const handleDelete = (cat: ProductCategory) => {
    const assignedProducts = products.filter((p) => p.category_id === cat.id);
    if (assignedProducts.length > 0) {
      const confirmDelete = confirm(
        `Warning: Category "${cat.name}" has ${assignedProducts.length} associated products. Deleting it will keep the products unassigned. Do you want to proceed?`
      );
      if (!confirmDelete) return;
    } else {
      if (!confirm(`Are you sure you want to delete category "${cat.name}"?`)) return;
    }
    store.deleteCategory(cat.id);
  };

  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-mono font-semibold text-amber-600 uppercase tracking-wider">
            Catalog Taxonomy
          </span>
          <h1 className="text-2xl font-display font-extrabold text-slate-900 mt-1">
            Product Categories Management
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Manage public categories. Any added, renamed, or deactivated category updates the website navigation and filters immediately.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="btn-industrial-primary text-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Category Editor */}
      {(isCreating || editingCategory) && (
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-lg border border-amber-300 shadow-md space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 font-display">
              {isCreating ? 'Create New Category (e.g. Industrial Pumps)' : `Edit Category: ${editingCategory?.name}`}
            </h3>
            <button
              type="button"
              onClick={() => { setIsCreating(false); setEditingCategory(null); }}
              className="text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Category Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Industrial Pumps"
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="industrial-pumps"
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
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
              Category Description
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of parts, standards, and items covered under this category..."
              className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
            />
          </div>

          <ImageUploadField
            label="Category Header / Cover Image"
            value={formData.image_url}
            onChange={(val) => setFormData({ ...formData, image_url: val })}
            helperText="Upload industrial category banner photo from computer or enter image URL"
          />

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <label className="flex items-center gap-2 text-xs font-mono cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="rounded text-amber-500"
              />
              <span>Active on Public Website</span>
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => { setIsCreating(false); setEditingCategory(null); }}
                className="btn-industrial-outline text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-industrial-primary text-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Category</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Categories Table / List */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-mono text-slate-500">
          <span>{categories.length} total categories registered</span>
          <span>Click Edit to change name, upload image or reorder</span>
        </div>

        <div className="divide-y divide-slate-100">
          {sortedCategories.map((cat) => {
            const productCount = products.filter((p) => p.category_id === cat.id).length;
            return (
              <div key={cat.id} className="p-4 hover:bg-slate-50/60 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded border border-slate-200 bg-slate-100 overflow-hidden shrink-0">
                    <img src={cat.image_url} alt="" className="w-full h-full object-cover" />
                  </div>

                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 truncate">
                        {cat.name}
                      </span>
                      <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded border border-slate-200">
                        /{cat.slug}
                      </span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold uppercase ${
                        cat.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {cat.is_active ? 'Active' : 'Disabled'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-1">
                      {cat.description || 'No description provided.'}
                    </p>

                    <div className="text-[11px] font-mono text-slate-400">
                      Order: {cat.order} · Products: <span className="font-semibold text-slate-700">{productCount} items</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => store.updateCategory(cat.id, { is_active: !cat.is_active })}
                    className={`p-1.5 rounded border text-xs ${
                      cat.is_active ? 'text-emerald-700 border-emerald-200 bg-emerald-50' : 'text-slate-500 border-slate-200'
                    }`}
                    title={cat.is_active ? 'Deactivate' : 'Activate'}
                  >
                    {cat.is_active ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => handleStartEdit(cat)}
                    className="btn-industrial-outline text-xs py-1.5 px-3"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDelete(cat)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded border border-rose-200"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
