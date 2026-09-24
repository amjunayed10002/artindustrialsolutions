import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

interface HeroSliderProps {
  navigate: (path: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ navigate }) => {
  const { banners } = useData();
  const activeBanners = banners.filter((b) => b.is_active).sort((a, b) => a.order - b.order);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [activeBanners.length]);

  if (!activeBanners.length) return null;

  const current = activeBanners[currentIndex] || activeBanners[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? activeBanners.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
  };

  return (
    <section className="relative w-full bg-slate-950 overflow-hidden min-h-[560px] md:min-h-[640px] flex items-center">
      {/* Background Image with Controlled Scrim */}
      <div className="absolute inset-0">
        <img
          src={current.image_url}
          alt={current.title}
          className="w-full h-full object-cover object-center transition-all duration-700 transform scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Measured dark gradient overlay for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40"></div>
        {/* Fine industrial grid pattern */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        ></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 w-full">
        <div className="max-w-3xl space-y-6">
          {/* Subtitle / Kicker */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 font-mono">
            <span className="w-6 h-px bg-amber-500"></span>
            <span>{current.subtitle}</span>
          </div>

          {/* Headline: Barlow Bold / 700 */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-[1.1] text-balance hero-heading">
            {current.title}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
            {current.description}
          </p>

          {/* Action Button & Trust Markers */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            {current.is_button_visible && (
              <button
                onClick={() => navigate(current.button_url || '/rfq')}
                className="btn-industrial-accent text-base px-6 py-3"
              >
                <span>{current.button_text || 'Request a Quotation'}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            )}

            <button
              onClick={() => navigate('/products')}
              className="btn-industrial-outline text-base px-6 py-3 bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
            >
              Browse Catalog
            </button>
          </div>

          {/* Industrial Trust Metrics */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-lg">
            <div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-white tabular-nums">
                12,000+
              </div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">
                SKUs In Ready Stock
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-amber-400 tabular-nums">
                180+
              </div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">
                Industrial Clients
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-white tabular-nums">
                24 Hr
              </div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">
                Breakdown Dispatch
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls (Arrows & Pagination) */}
      {activeBanners.length > 1 && (
        <>
          <div className="absolute bottom-6 right-6 sm:right-12 z-20 flex items-center gap-3 bg-slate-900/80 backdrop-blur-xs p-1.5 rounded-lg border border-white/10">
            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-xs font-mono text-slate-400 px-2 tabular-nums">
              <span className="text-white font-bold">{currentIndex + 1}</span> / {activeBanners.length}
            </div>
            <button
              onClick={handleNext}
              className="w-9 h-9 rounded flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {activeBanners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-8 bg-amber-500' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};
