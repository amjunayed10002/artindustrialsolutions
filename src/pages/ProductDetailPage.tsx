import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  ArrowLeft, 
  FileText, 
  ShieldCheck, 
  Truck, 
  CheckCircle, 
  Layers, 
  ChevronRight,
  Share2
} from 'lucide-react';

interface ProductDetailPageProps {
  slug: string;
  navigate: (path: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug, navigate }) => {
  const { store, products, categories, settings } = useData();
  const product = store.getProductBySlug(slug) || products.find((p) => p.slug === slug);
  const [selectedImage, setSelectedImage] = useState<string>(product ? product.main_image : '');

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-display font-bold text-slate-900">
          Product Not Found
        </h2>
        <p className="text-sm text-slate-600">
          The requested industrial product may have been archived or moved to another category.
        </p>
        <button
          onClick={() => navigate('/products')}
          className="btn-industrial-primary text-xs"
        >
          Return to Product Catalog
        </button>
      </div>
    );
  }

  const category = categories.find((c) => c.id === product.category_id);
  const relatedProducts = products
    .filter((p) => p.category_id === product.category_id && p.id !== product.id && p.is_active)
    .slice(0, 3);

  const allImages = [product.main_image, ...(product.additional_images || [])].filter(Boolean);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center gap-2 text-xs font-mono text-slate-500">
          <button 
            onClick={() => navigate('/')}
            className="hover:text-slate-900 transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <button 
            onClick={() => navigate('/products')}
            className="hover:text-slate-900 transition-colors"
          >
            Products
          </button>
          <span>/</span>
          {category && (
            <>
              <button 
                onClick={() => navigate(`/products?category=${category.slug}`)}
                className="hover:text-slate-900 transition-colors"
              >
                {category.name}
              </button>
              <span>/</span>
            </>
          )}
          <span className="text-slate-900 font-semibold truncate max-w-xs">
            {product.name}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
        {/* Main Product Showcase Card */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Gallery Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="h-80 sm:h-96 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 relative">
                <img
                  src={selectedImage || product.main_image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-slate-900/90 text-white text-xs font-mono px-2.5 py-1 rounded">
                  {product.brand || 'OEM Grade'}
                </div>
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 rounded border overflow-hidden shrink-0 transition-all ${
                        selectedImage === img
                          ? 'border-amber-500 ring-2 ring-amber-500/20'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Guarantee Box */}
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Genuine OEM Sourced</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Supplied with manufacturer test certificate, batch identification, and guaranteed material traceability.
                </p>
              </div>
            </div>

            {/* Details & Action Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-3 text-xs font-mono text-slate-500 mb-2">
                  <span className="text-amber-600 font-semibold uppercase">{product.category_name}</span>
                  <span>·</span>
                  <span>SKU: {product.sku}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Primary Specs Micro Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block">Manufacturer:</span>
                  <span className="font-bold text-slate-900">{product.brand || 'Certified OEM'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Model/Series:</span>
                  <span className="font-bold text-slate-900">{product.model || 'Standard'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Availability:</span>
                  <span className="font-bold text-emerald-700">In Ready Stock</span>
                </div>
              </div>

              {/* Short Description */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
                  Product Overview
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {product.full_description || product.short_description}
                </p>
              </div>

              {/* Prominent RFQ Action Button */}
              <div className="pt-2 pb-4 border-y border-slate-100 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate(`/rfq?product=${product.id}`)}
                  className="btn-industrial-accent text-sm px-6 py-3 flex-1 justify-center"
                >
                  <FileText className="w-4 h-4" />
                  <span>Request a Quote for This Product</span>
                </button>

                <a
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                  className="btn-industrial-outline text-sm px-4 py-3"
                  title="Speak directly with inventory specialist"
                >
                  Call Desk
                </a>
              </div>

              {/* Technical Specifications Table */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
                  Engineering Specifications
                </h3>
                {Object.keys(product.specifications).length > 0 ? (
                  <div className="rounded-lg border border-slate-200 overflow-hidden">
                    <table className="w-full text-left text-xs font-mono">
                      <tbody>
                        {Object.entries(product.specifications).map(([key, val], idx) => (
                          <tr
                            key={key}
                            className={idx % 2 === 0 ? 'bg-slate-50/70' : 'bg-white'}
                          >
                            <td className="py-2.5 px-4 font-semibold text-slate-700 border-b border-slate-100 w-1/3">
                              {key}
                            </td>
                            <td className="py-2.5 px-4 text-slate-900 border-b border-slate-100">
                              {val}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">
                    Contact our technical sales engineers for detailed engineering CAD drawings and tolerance data.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products in this Category */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-display font-bold text-slate-900">
                Related {category ? category.name : 'Industrial'} Components
              </h3>
              <button
                onClick={() => navigate(`/products?category=${category?.slug}`)}
                className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1"
              >
                <span>View Full Category</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    navigate(`/products/${rel.slug}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md hover:border-amber-400 transition-all cursor-pointer group"
                >
                  <div className="h-36 bg-slate-100 rounded overflow-hidden mb-3">
                    <img src={rel.main_image} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 mb-1">{rel.sku}</div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2">
                    {rel.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
