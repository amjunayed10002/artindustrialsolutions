import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { Product } from '../../types';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Star, 
  Save, 
  X, 
  UploadCloud, 
  PlusCircle, 
  MinusCircle,
  FileText
} from 'lucide-react';
import { ImageUploadField } from './ImageUploadField';

export const AdminProducts: React.FC = () => {
  const { products, categories, store } = useData();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCatId, setSelectedCatId] = useState<string>('all');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category_id: categories[0]?.id || 1,
    sku: '',
    brand: '',
    model: '',
    short_description: '',
    full_description: '',
    main_image: '/src/assets/images/industrial_manufacturing_plant_1790260752764.jpg',
    is_featured: false,
    is_active: true,
  });

  // Dynamic Specifications key-value pairs
  const [specPairs, setSpecPairs] = useState<{ key: string; val: string }[]>([
    { key: 'Material', val: 'High-strength steel' },
    { key: 'Standard', val: 'ISO / DIN' },
  ]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingProduct(null);
    const cat = categories[0]?.id || 1;
    const count = products.length + 1;
    setFormData({
      name: '',
      slug: '',
      category_id: cat,
      sku: `PRD-ART-${String(100 + count)}`,
      brand: '',
      model: '',
      short_description: '',
      full_description: '',
      main_image: '/src/assets/images/industrial_manufacturing_plant_1790260752764.jpg',
      is_featured: false,
      is_active: true,
    });
    setSpecPairs([
      { key: 'Standard', val: 'DIN / ISO' },
      { key: 'Material', val: 'Standard Alloy' },
    ]);
  };

  const handleStartEdit = (prod: Product) => {
    setEditingProduct(prod);
    setIsCreating(false);
    setFormData({
      name: prod.name,
      slug: prod.slug,
      category_id: prod.category_id,
      sku: prod.sku,
      brand: prod.brand,
      model: prod.model,
      short_description: prod.short_description,
      full_description: prod.full_description,
      main_image: prod.main_image,
      is_featured: prod.is_featured,
      is_active: prod.is_active,
    });
    const pairs = Object.entries(prod.specifications || {}).map(([key, val]) => ({ key, val }));
    setSpecPairs(pairs.length ? pairs : [{ key: 'Standard', val: 'ISO' }]);
  };

  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          main_image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSpecRow = () => {
    setSpecPairs([...specPairs, { key: '', val: '' }]);
  };

  const handleRemoveSpecRow = (index: number) => {
    setSpecPairs(specPairs.filter((_, idx) => idx !== index));
  };

  const handleSpecChange = (index: number, field: 'key' | 'val', value: string) => {
    const updated = [...specPairs];
    updated[index][field] = value;
    setSpecPairs(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    // Convert specPairs back to object
    const specifications: Record<string, string> = {};
    specPairs.forEach((pair) => {
      if (pair.key.trim()) {
        specifications[pair.key.trim()] = pair.val.trim();
      }
    });

    const payload = {
      name: formData.name.trim(),
      slug: formData.slug.trim() || generateSlug(formData.name),
      category_id: Number(formData.category_id),
      sku: formData.sku.trim() || `SKU-${Date.now()}`,
      brand: formData.brand.trim(),
      model: formData.model.trim(),
      short_description: formData.short_description.trim(),
      full_description: formData.full_description.trim(),
      specifications,
      main_image: formData.main_image,
      additional_images: [],
      is_featured: formData.is_featured,
      is_active: formData.is_active,
      created_at: new Date().toISOString().substring(0, 10),
    };

    if (isCreating) {
      store.addProduct(payload);
      setIsCreating(false);
    } else if (editingProduct) {
      store.updateProduct(editingProduct.id, payload);
      setEditingProduct(null);
    }
  };

  const handleDelete = (prod: Product) => {
    if (confirm(`Are you sure you want to delete product "${prod.name}" (${prod.sku})?`)) {
      store.deleteProduct(prod.id);
    }
  };

  // Filtered List
  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (selectedCatId !== 'all' && p.category_id !== Number(selectedCatId)) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [products, selectedCatId, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-mono font-semibold text-amber-600 uppercase tracking-wider">
            Industrial Products Inventory
          </span>
          <h1 className="text-2xl font-display font-extrabold text-slate-900 mt-1">
            Product Catalog Management
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Add new parts, edit specifications, upload photos, feature items, or adjust category assignments.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="btn-industrial-primary text-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Editor Modal / Form */}
      {(isCreating || editingProduct) && (
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-lg border border-amber-300 shadow-md space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 font-display">
              {isCreating ? 'Create New Product Record' : `Edit Product: ${editingProduct?.name}`}
            </h3>
            <button
              type="button"
              onClick={() => { setIsCreating(false); setEditingProduct(null); }}
              className="text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Product Name *
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
                placeholder="e.g. SKF Explorer Spherical Roller Bearing 22220 EK"
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Category *
              </label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 bg-white focus:outline-hidden focus:border-amber-500"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Product Code / SKU *
              </label>
              <input
                type="text"
                required
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                placeholder="BRG-SKF-22220"
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 font-mono focus:outline-hidden focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Brand / Manufacturer
              </label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                placeholder="e.g. SKF, ESAB, KSB"
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Model / Series
              </label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                placeholder="e.g. 22220 EK/C3"
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Short Description (Catalog card snippet) *
              </label>
              <textarea
                rows={2}
                required
                value={formData.short_description}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                placeholder="One sentence summary of primary function and application..."
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Full Description (Product detail page)
              </label>
              <textarea
                rows={2}
                value={formData.full_description}
                onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                placeholder="Comprehensive technical details, tolerance data, standards compliance..."
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
              />
            </div>
          </div>

          {/* Technical Specifications Key-Value Editor */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">
                Engineering Specifications (Key - Value Pairs)
              </span>
              <button
                type="button"
                onClick={handleAddSpecRow}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 font-mono"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Specification Field</span>
              </button>
            </div>

            <div className="space-y-2">
              {specPairs.map((pair, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={pair.key}
                    onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                    placeholder="Spec Name (e.g. Bore Diameter, Material, Pressure)"
                    className="w-1/3 px-3 py-1.5 text-xs rounded border border-slate-200 font-mono"
                  />
                  <input
                    type="text"
                    value={pair.val}
                    onChange={(e) => handleSpecChange(idx, 'val', e.target.value)}
                    placeholder="Spec Value (e.g. 100 mm, Class 300, E7018)"
                    className="flex-1 px-3 py-1.5 text-xs rounded border border-slate-200 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpecRow(idx)}
                    className="p-1.5 text-slate-400 hover:text-rose-600"
                  >
                    <MinusCircle className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <ImageUploadField
            label="Main Product Photograph"
            value={formData.main_image}
            onChange={(val) => setFormData({ ...formData, main_image: val })}
            helperText="Upload high-resolution machinery/part photo from device or provide image URL"
            required
          />

          {/* Flags */}
          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs font-mono cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="rounded text-amber-500"
              />
              <span>Featured on Homepage</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-mono cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="rounded text-amber-500"
              />
              <span>Published & Active</span>
            </label>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => { setIsCreating(false); setEditingProduct(null); }}
              className="btn-industrial-outline text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-industrial-primary text-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isCreating ? 'Create Product' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-[280px]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search product by title, SKU, or brand..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
            />
          </div>

          <select
            value={selectedCatId}
            onChange={(e) => setSelectedCatId(e.target.value)}
            className="px-3 py-1.5 text-xs rounded border border-slate-200 bg-white"
          >
            <option value="all">All Categories ({categories.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="text-xs font-mono text-slate-500">
          Showing <span className="font-bold text-slate-900">{filtered.length}</span> of {products.length} products
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-mono uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Item & Code</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Brand / Model</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((prod) => {
                const cat = categories.find((c) => c.id === prod.category_id);
                return (
                  <tr key={prod.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded border border-slate-200 overflow-hidden bg-slate-100 shrink-0">
                          <img src={prod.main_image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 line-clamp-1 max-w-xs">
                            {prod.name}
                          </div>
                          <div className="text-[10px] font-mono text-slate-500">
                            SKU: {prod.sku}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono text-slate-700">
                      {cat?.name || 'Unassigned'}
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-900">{prod.brand || '—'}</div>
                      <div className="text-[10px] font-mono text-slate-400">{prod.model || 'Standard'}</div>
                    </td>

                    <td className="py-3 px-4">
                      <button
                        onClick={() => store.updateProduct(prod.id, { is_featured: !prod.is_featured })}
                        className={`p-1 rounded ${prod.is_featured ? 'text-amber-500' : 'text-slate-300 hover:text-slate-500'}`}
                        title="Toggle Featured"
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    </td>

                    <td className="py-3 px-4">
                      <button
                        onClick={() => store.updateProduct(prod.id, { is_active: !prod.is_active })}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase cursor-pointer ${
                          prod.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {prod.is_active ? 'Active' : 'Hidden'}
                      </button>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleStartEdit(prod)}
                          className="p-1.5 text-slate-600 hover:text-amber-600 rounded"
                          title="Edit Product"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(prod)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
