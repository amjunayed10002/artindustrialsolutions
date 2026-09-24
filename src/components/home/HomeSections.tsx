import React from 'react';
import { useData } from '../../context/DataContext';
import { 
  ShieldCheck, 
  Wrench, 
  Truck, 
  Award, 
  Package, 
  Users, 
  TrendingDown, 
  CheckCircle,
  FileCheck,
  Building2,
  Hammer,
  Calendar,
  ArrowRight,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface SectionProps {
  navigate: (path: string) => void;
  openRFQWithProduct?: (productId: number) => void;
}

// Map dynamic icon string to Lucide icon
export const getIconComponent = (iconName: string, className = "w-5 h-5") => {
  switch (iconName.toLowerCase()) {
    case 'shieldcheck':
    case 'shield':
      return <ShieldCheck className={className} />;
    case 'wrench':
      return <Wrench className={className} />;
    case 'truck':
      return <Truck className={className} />;
    case 'award':
      return <Award className={className} />;
    case 'package':
      return <Package className={className} />;
    case 'users':
      return <Users className={className} />;
    case 'trendingdown':
      return <TrendingDown className={className} />;
    case 'checkcircle':
      return <CheckCircle className={className} />;
    case 'filecheck':
      return <FileCheck className={className} />;
    case 'building2':
      return <Building2 className={className} />;
    case 'hammer':
      return <Hammer className={className} />;
    case 'calendar':
      return <Calendar className={className} />;
    default:
      return <CheckCircle className={className} />;
  }
};

// --- 1. Company Introduction Section ---
export const CompanyIntroSection: React.FC<SectionProps> = ({ navigate }) => {
  const { about, settings } = useData();

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-slate-200 shadow-md">
              <img
                src={about.history_image || "/src/assets/images/industrial_manufacturing_plant_1790260752764.jpg"}
                alt="ART Industrial Solutions Facility"
                className="w-full h-[400px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-4 rounded border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                      Certified Industrial Partner
                    </div>
                    <div className="text-xs text-slate-500">
                      Supplying over 180 heavy manufacturing plants
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Subtle decorative backing */}
            <div className="absolute -bottom-3 -right-3 w-full h-full rounded-lg border-2 border-dashed border-amber-500/20 -z-10"></div>
          </div>

          {/* Copy Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-600 uppercase tracking-wider font-mono">
              <span className="w-4 h-px bg-amber-500"></span>
              <span>About ART Industrial Solutions</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
              {about.history_heading}
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              {about.history_text}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-slate-900 uppercase font-mono mb-1">
                  Our Mission
                </div>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {about.mission_text}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-slate-900 uppercase font-mono mb-1">
                  Our Vision
                </div>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {about.vision_text}
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate('/about')}
                className="btn-industrial-primary"
              >
                <span>Read Full Company Story</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => navigate('/company-profile')}
                className="btn-industrial-outline"
              >
                <span>View Legal Documents</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 2. Why Choose ART Section ---
export const WhyChooseSection: React.FC<SectionProps> = ({ navigate }) => {
  const { whyChooseReasons } = useData();
  const activeReasons = whyChooseReasons.filter((r) => r.is_active).sort((a, b) => a.order - b.order);

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-600 uppercase tracking-wider font-mono mb-2">
            <span className="w-4 h-px bg-amber-500"></span>
            <span>Why Industry Leaders Trust Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Reliability Engineered for Critical Uptime
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            From emergency bearing dispatch to certified plant shutdown overhauls, our operations are tuned to keep your factory producing without disruption.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeReasons.map((reason, index) => (
            <div
              key={reason.id}
              className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs hover:shadow-md hover:border-amber-400 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded bg-slate-100 text-slate-900 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    {getIconComponent(reason.icon_name, "w-5 h-5")}
                  </div>
                  <span className="text-xs font-mono text-slate-400 tabular-nums">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  {reason.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-slate-500 group-hover:text-amber-600 transition-colors">
                <span>Verified Standard</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 3. Featured Products Section ---
export const FeaturedProductsSection: React.FC<SectionProps> = ({ navigate, openRFQWithProduct }) => {
  const { products, categories } = useData();
  const featured = products.filter((p) => p.is_featured && p.is_active).slice(0, 6);

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-600 uppercase tracking-wider font-mono mb-2">
              <span className="w-4 h-px bg-amber-500"></span>
              <span>Catalog Highlights</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
              Featured Industrial Products
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Factory-sealed OEM components in ready warehouse stock for immediate dispatch.
            </p>
          </div>

          <button
            onClick={() => navigate('/products')}
            className="btn-industrial-outline text-xs"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-lg border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between overflow-hidden group"
            >
              {/* Product Thumbnail */}
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img
                  src={prod.main_image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                {/* Brand watermark badge */}
                <div className="absolute top-3 left-3 bg-slate-900/90 text-white text-[11px] font-mono px-2 py-0.5 rounded">
                  {prod.brand || 'Industrial Grade'}
                </div>
                <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                  Featured
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-mono">
                    <span>{prod.category_name}</span>
                    <span>SKU: {prod.sku}</span>
                  </div>

                  <h3 
                    onClick={() => navigate(`/products/${prod.slug}`)}
                    className="text-base font-semibold text-slate-900 hover:text-amber-600 transition-colors line-clamp-2 cursor-pointer mb-2"
                  >
                    {prod.name}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 mb-4">
                    {prod.short_description}
                  </p>
                </div>

                {/* Key Spec Snippet */}
                {Object.keys(prod.specifications).length > 0 && (
                  <div className="py-2 px-3 bg-slate-50 rounded text-[11px] font-mono text-slate-600 mb-4 border border-slate-100">
                    <span className="font-semibold text-slate-800">
                      {Object.keys(prod.specifications)[0]}:
                    </span>{' '}
                    {Object.values(prod.specifications)[0]}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => navigate(`/products/${prod.slug}`)}
                    className="btn-industrial-outline text-xs justify-center py-2"
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => {
                      if (openRFQWithProduct) {
                        openRFQWithProduct(prod.id);
                      } else {
                        navigate(`/rfq?product=${prod.id}`);
                      }
                    }}
                    className="btn-industrial-primary text-xs justify-center py-2"
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 4. Engineering Services Section ---
export const ServicesOverviewSection: React.FC<SectionProps> = ({ navigate }) => {
  const { services } = useData();
  const activeServices = services.filter((s) => s.is_active && s.is_featured).slice(0, 4);

  return (
    <section className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider font-mono mb-2">
              <span className="w-4 h-px bg-amber-500"></span>
              <span>Field Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Engineering Services & Plant Overhauls
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Turnkey mechanical contracting, shutdown management, precision laser alignment, and certified steel fabrication.
            </p>
          </div>

          <button
            onClick={() => navigate('/services')}
            className="btn-industrial-accent text-xs"
          >
            <span>View All Engineering Services</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeServices.map((service, index) => (
            <div
              key={service.id}
              className="bg-slate-950 rounded-lg border border-slate-800 p-6 flex flex-col justify-between hover:border-amber-500/50 transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded bg-slate-900 border border-slate-800 text-amber-400 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    {getIconComponent(service.icon_name, "w-5 h-5")}
                  </div>
                  <span className="text-xs font-mono text-slate-500">0{index + 1}</span>
                </div>

                <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {service.short_description}
                </p>

                {/* Key Deliverables Bullet List */}
                <div className="space-y-1.5 mb-6">
                  {service.deliverables.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-amber-500 font-bold shrink-0">✓</span>
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => navigate('/services')}
                className="w-full py-2 px-3 rounded text-xs font-semibold bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-slate-300 border border-slate-800 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Learn Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 5. Industries We Serve Section ---
export const IndustriesOverviewSection: React.FC<SectionProps> = ({ navigate }) => {
  const { industries } = useData();
  const activeIndustries = industries.filter((i) => i.is_active).slice(0, 6);

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-600 uppercase tracking-wider font-mono mb-2">
            <span className="w-4 h-px bg-amber-500"></span>
            <span>Target Sectors</span>
            <span className="w-4 h-px bg-amber-500"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Industries We Serve
          </h2>
          <p className="text-slate-600 text-sm mt-3">
            Customized procurement and specialized mechanical spares for continuous-process factories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeIndustries.map((industry) => (
            <div
              key={industry.id}
              className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-slate-900">
                    {industry.name}
                  </h3>
                  <Building2 className="w-5 h-5 text-amber-500 shrink-0" />
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {industry.description}
                </p>

                <div className="space-y-1">
                  <div className="text-[11px] font-mono font-semibold text-slate-500 uppercase tracking-wider">
                    Supplied Components:
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {industry.supplied_equipment.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100">
                <button
                  onClick={() => navigate(`/rfq?industry=${encodeURIComponent(industry.name)}`)}
                  className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Request RFQ for {industry.name}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => navigate('/industries')}
            className="btn-industrial-outline"
          >
            <span>Explore All 12 Industrial Sectors</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

// --- 6. Call to Action (CTA) Section ---
export const CTASection: React.FC<SectionProps> = ({ navigate }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Subtle industrial pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(to right, #f59e0b 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      ></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider font-mono">
          <span className="w-6 h-px bg-amber-500"></span>
          <span>Fast Turnaround · Certified Supplies · B2B Terms</span>
          <span className="w-6 h-px bg-amber-500"></span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-white leading-tight max-w-3xl mx-auto">
          Need Industrial Products or Engineering Services?
        </h2>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
          Submit your bill of materials or schedule a technical site evaluation. Our senior engineers respond with itemized quotations within 4 business hours.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => navigate('/rfq')}
            className="btn-industrial-accent text-base px-8 py-3.5"
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={() => navigate('/contact')}
            className="btn-industrial-outline text-base px-8 py-3.5 bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
          >
            Contact Engineering Desk
          </button>
        </div>
      </div>
    </section>
  );
};
