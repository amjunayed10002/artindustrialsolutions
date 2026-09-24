import React from 'react';
import { useData } from '../context/DataContext';
import { Building2, ArrowRight, CheckCircle } from 'lucide-react';

interface IndustriesPageProps {
  navigate: (path: string) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ navigate }) => {
  const { industries } = useData();
  const activeIndustries = industries.filter((i) => i.is_active).sort((a, b) => a.order - b.order);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider font-mono mb-2">
            <span className="w-4 h-px bg-amber-500"></span>
            <span>Target Manufacturing Sectors</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-white">
            Industries We Serve
          </h1>
          <p className="text-slate-400 text-base max-w-2xl mt-3">
            Sector-specialized inventory and turnkey maintenance tailored to demanding thermal, chemical, and mechanical environments.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeIndustries.map((industry) => (
            <div
              key={industry.id}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Sector Image */}
                <div className="h-44 bg-slate-900 relative overflow-hidden">
                  <img
                    src={industry.image_url}
                    alt={industry.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-4 flex items-center gap-2 text-white">
                    <Building2 className="w-4 h-4 text-amber-400" />
                    <h3 className="font-display font-bold text-lg text-white">
                      {industry.name}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {industry.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                      Common Equipment Supplied:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {industry.supplied_equipment.map((item, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => navigate(`/rfq?industry=${encodeURIComponent(industry.name)}`)}
                  className="w-full btn-industrial-outline text-xs justify-center py-2"
                >
                  <span>Request RFQ for {industry.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
