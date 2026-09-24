import React from 'react';
import { useData } from '../context/DataContext';
import { getIconComponent } from '../components/home/HomeSections';
import { ShieldCheck, Target, Eye, Quote, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  navigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  const { about, coreValues, whyChooseReasons } = useData();

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider font-mono mb-2">
            <span className="w-4 h-px bg-amber-500"></span>
            <span>About Us</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-white">
            Engineering Excellence & Industrial Trust
          </h1>
          <p className="text-slate-400 text-base max-w-2xl mt-3">
            Delivering authentic OEM mechanical components, turnkey plant maintenance, and compliant supply solutions across Bangladesh.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-20">
        {/* Section 1: Company History */}
        <section className="bg-white rounded-lg border border-slate-200 p-8 sm:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono font-semibold text-amber-600 uppercase tracking-wider">
                Our Journey
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
                {about.history_heading}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {about.history_text}
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-lg overflow-hidden border border-slate-200 shadow-md">
                <img
                  src={about.history_image || "/src/assets/images/industrial_manufacturing_plant_1790260752764.jpg"}
                  alt="Industrial Plant History"
                  className="w-full h-80 object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg border border-slate-200 p-8 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-slate-900">
                {about.mission_heading}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {about.mission_text}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-mono text-slate-400">
              Operational Guideline · Zero Downtime Mandate
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-8 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded bg-slate-900 text-amber-400 flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-slate-900">
                {about.vision_heading}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {about.vision_text}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-mono text-slate-400">
              Long-term Commitment · Sustainable Industrial Partnerships
            </div>
          </div>
        </section>

        {/* Section 3: Core Values */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-semibold text-amber-600 uppercase tracking-wider">
              Operating Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mt-1">
              Our Core Corporate Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, idx) => (
              <div
                key={value.id}
                className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs hover:border-amber-400 transition-colors"
              >
                <div className="w-10 h-10 rounded bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                  {getIconComponent(value.icon_name, "w-5 h-5")}
                </div>
                <h4 className="text-base font-semibold text-slate-900 mb-2">
                  {value.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Why Choose ART */}
        <section className="bg-white rounded-lg border border-slate-200 p-8 sm:p-12 shadow-xs space-y-8">
          <div>
            <span className="text-xs font-mono font-semibold text-amber-600 uppercase tracking-wider">
              Competitive Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mt-1">
              Why Partner with ART Industrial Solutions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseReasons.filter((r) => r.is_active).map((r) => (
              <div key={r.id} className="p-5 rounded border border-slate-100 bg-slate-50 space-y-2">
                <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  {r.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {r.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Managing Proprietor Message */}
        <section className="bg-slate-950 text-white rounded-lg border border-slate-800 p-8 sm:p-12 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Photo Column */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-lg overflow-hidden border-2 border-amber-500/30 shadow-lg shrink-0">
                <img
                  src={about.proprietor_photo || "/src/assets/images/proprietor_managing_director_1790260763384.jpg"}
                  alt={about.proprietor_name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-4 text-center sm:text-left">
                <div className="text-lg font-display font-bold text-white">
                  {about.proprietor_name}
                </div>
                <div className="text-xs text-amber-400 font-medium">
                  {about.proprietor_designation}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-1">
                  ART Industrial Solutions
                </div>
              </div>
            </div>

            {/* Quote Message Column */}
            <div className="lg:col-span-8 space-y-6">
              <div className="w-10 h-10 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Quote className="w-5 h-5" />
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-white leading-snug">
                "Never compromise on product authenticity and always stand squarely behind the engineering we provide."
              </h3>

              <div className="text-sm text-slate-300 leading-relaxed italic space-y-3">
                <p>{about.proprietor_message}</p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Executive Signature:
                  </span>
                  <div className="text-lg font-serif italic text-amber-400 font-bold tracking-wider mt-0.5">
                    {about.proprietor_signature}
                  </div>
                </div>

                <button
                  onClick={() => navigate('/contact')}
                  className="btn-industrial-accent text-xs"
                >
                  <span>Connect with Management</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
