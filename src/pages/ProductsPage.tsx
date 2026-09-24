import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { Search, Filter, ArrowRight, ShieldCheck, Tag, Layers, ChevronRight } from 'lucide-react';

interface ProductsPageProps {
  navigate: (path: string) => void;
  selectedCategorySlug?: string;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ navigate, selectedCategorySlug }) => {
  const { products, categories } = useData();
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategorySlug || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'name' | 'newest'>('featured');

  const activeCategories = categories.filter((c) => c.is_active).sort((a, b) => a.order - b.order);

  // Filter & Search Logic
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      if (!prod.is_active) return false;

      // Category filter
      if (activeCategory !== 'all') {
        const cat = categories.find((c) => c.slug === activeCategory);
        if (cat && prod.category_id !== cat.id) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = prod.name.toLowerCase().includes(query);
        const matchSku = prod.sku.toLowerCase().includes(query);
        const matchBrand = prod.brand.toLowerCase().includes(query);
        const matchDesc = prod.short_description.toLowerCase().includes(query);
        const matchCategory = (prod.category_name || '').toLowerCase().includes(query);
        if (!matchName && !matchSku && !matchBrand && !matchDesc && !matchCategory) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'featured') {
        return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return b.id - a.id;
    });
  }, [products, categories, activeCategory, searchQuery, sortBy]);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider font-mono mb-2">
            <span className="w-4 h-px bg-amber-500"></span>
            <span>Comprehensive B2B Inventory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-white">
            Industrial Products Catalog
          </h1>
          <p className="text-slate-400 text-base max-w-2xl mt-2">
            Direct OEM distributor for certified bearings, low-hydrogen welding consumables, high-pressure valves, and heavy plant hardware.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search Input */}
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
              <label className="text-xs font-bold text-slate-800 uppercase font-mono tracking-wider block mb-2">
                Search Catalog
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Part name, SKU, brand..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Categories List */}
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 uppercase font-mono tracking-wider">
                  Product Categories
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {categories.length} total
                </span>
              </div>

              <div className="space-y-1 pt-1 max-h-[480px] overflow-y-auto pr-1">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`w-full text-left px-3 py-2 text-xs font-medium rounded transition-colors flex items-center justify-between cursor-pointer ${
                    activeCategory === 'all'
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[10px] font-mono opacity-80">
                    {products.filter((p) => p.is_active).length}
                  </span>
                </button>

                {activeCategories.map((cat) => {
                  const count = products.filter((p) => p.category_id === cat.id && p.is_active).length;
                  const isSelected = activeCategory === cat.slug;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.slug)}
                      className={`w-full text-left px-3 py-2 text-xs font-medium rounded transition-colors flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 text-white font-semibold'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate pr-2">{cat.name}</span>
                      <span className="text-[10px] font-mono opacity-80 shrink-0">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Procurement Notice Box */}
            <div className="bg-amber-50 rounded-lg border border-amber-200 p-4 space-y-2">
              <div className="flex items-center gap-2 text-amber-800 text-xs font-bold font-mono uppercase">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Bulk RFQ Support</span>
              </div>
              <p className="text-xs text-amber-900/80 leading-relaxed">
                Looking for unlisted specifications or custom imported spares? Submit your complete purchase requisition list directly.
              </p>
              <button
                onClick={() => navigate('/rfq')}
                className="text-xs font-bold text-amber-800 hover:text-amber-950 underline pt-1 block"
              >
                Submit Custom RFQ Requisition →
              </button>
            </div>
          </div>

          {/* Products Grid & Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* Toolbar */}
            <div className="bg-white px-5 py-3 rounded-lg border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-mono text-slate-600">
                Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> industrial products
                {activeCategory !== 'all' && (
                  <span> in <span className="text-amber-600 font-bold">{categories.find((c) => c.slug === activeCategory)?.name}</span></span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-mono">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-800 focus:outline-hidden focus:border-amber-500"
                >
                  <option value="featured">Featured First</option>
                  <option value="name">Alphabetical (A-Z)</option>
                  <option value="newest">Latest Added</option>
                </select>
              </div>
            </div>

            {/* Product Cards */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg border border-slate-200 p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  No matching products found
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your search keywords or select a different category from the sidebar.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                  }}
                  className="btn-industrial-outline text-xs mt-2"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between overflow-hidden group"
                  >
                    <div>
                      {/* Image Preview */}
                      <div className="relative h-44 bg-slate-100 overflow-hidden cursor-pointer"
                        onClick={() => navigate(`/products/${product.slug}`)}
                      >
                        <img
                          src={product.main_image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2.5 left-2.5 bg-slate-900/90 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                          {product.brand || 'OEM'}
                        </div>
                        {product.is_featured && (
                          <div className="absolute top-2.5 right-2.5 bg-amber-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded">
                            FEATURED
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                          <span className="truncate max-w-[130px]">{product.category_name}</span>
                          <span>{product.sku}</span>
                        </div>

                        <h3
                          onClick={() => navigate(`/products/${product.slug}`)}
                          className="text-sm font-semibold text-slate-900 hover:text-amber-600 transition-colors line-clamp-2 cursor-pointer"
                        >
                          {product.name}
                        </h3>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {product.short_description}
                        </p>

                        {/* Specs quick pill preview */}
                        {Object.keys(product.specifications).length > 0 && (
                          <div className="pt-2 text-[11px] font-mono text-slate-500 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-slate-400">Model:</span>
                            <span className="font-semibold text-slate-800 truncate max-w-[140px]">
                              {product.model || 'Standard'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => navigate(`/products/${product.slug}`)}
                        className="btn-industrial-outline text-xs justify-center py-2"
                      >
                        Specs & Detail
                      </button>
                      <button
                        onClick={() => navigate(`/rfq?product=${product.id}`)}
                        className="btn-industrial-primary text-xs justify-center py-2"
                      >
                        Quote RFQ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
