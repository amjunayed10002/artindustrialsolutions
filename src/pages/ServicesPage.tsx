import React from 'react';
import { useData } from '../context/DataContext';
import { getIconComponent } from '../components/home/HomeSections';
import { ArrowRight, CheckCircle2, ShieldAlert, Phone } from 'lucide-react';

interface ServicesPageProps {
  navigate: (path: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ navigate }) => {
  const { services, settings } = useData();
  const activeServices = services.filter((s) => s.is_active).sort((a, b) => a.order - b.order);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider font-mono mb-2">
            <span className="w-4 h-px bg-amber-500"></span>
            <span>Turnkey Engineering & Overhauls</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-white">
            Engineering Services
          </h1>
          <p className="text-slate-400 text-base max-w-2xl mt-3">
            On-site plant shutdown management, certified mechanical overhauls, structural fabrication, and 24/7 emergency response engineering.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-16">
        {/* Service Cards Detailed List */}
        <div className="space-y-12">
          {activeServices.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs hover:border-amber-400 hover:shadow-md transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Image Column */}
                <div className="lg:col-span-4 relative h-64 lg:h-auto min-h-[260px] bg-slate-900">
                  <img
                    src={service.image_url}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded bg-slate-900/90 text-amber-400 flex items-center justify-center font-display font-bold border border-slate-800">
                    0{index + 1}
                  </div>
                </div>

                {/* Content Column */}
                <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                      <span className="text-amber-600 font-semibold uppercase">Industrial Division</span>
                      <span>·</span>
                      <span>Turnkey Contract</span>
                    </div>

                    <h2 className="text-2xl font-display font-bold text-slate-900">
                      {service.title}
                    </h2>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {service.full_description || service.short_description}
                    </p>

                    {/* Deliverables Checklist */}
                    {service.deliverables && service.deliverables.length > 0 && (
                      <div className="pt-2">
                        <div className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider mb-2">
                          Key Engineering Deliverables:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {service.deliverables.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2 rounded border border-slate-100">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                    <div className="text-xs font-mono text-slate-500">
                      Compliance: <span className="font-semibold text-slate-800">ASME / ISO Standards</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => navigate(`/rfq?service=${encodeURIComponent(service.title)}`)}
                        className="btn-industrial-primary text-xs"
                      >
                        <span>Inquire About This Service</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Breakdown Callout */}
        <section className="bg-amber-500/10 rounded-lg border border-amber-500/30 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-slate-900">
                Experiencing Unscheduled Factory Stoppage?
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-xl">
                Our emergency rapid-response engineering teams are available 24/7 for mechanical alignment, bearing replacements, and critical pipeline welding repairs.
              </p>
            </div>
          </div>

          <a
            href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
            className="btn-industrial-accent text-sm shrink-0"
          >
            <Phone className="w-4 h-4" />
            <span>Call 24/7 Emergency Line</span>
          </a>
        </section>
      </div>
    </div>
  );
};
