import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/testimonials';
import { soundManager } from '../utils/audio';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    soundManager.playClick();
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    soundManager.playClick();
    setCurrentIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS_DATA[currentIndex];

  return (
    <section id="testimonials" className="relative py-32 px-6 sm:px-8 lg:px-12 bg-[#08090B] border-t border-white/5 overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#B58CFF]/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#B58CFF] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CLIENT EXPERIENCES</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tighter uppercase text-[#F5F5F5]">
              WORDS FROM CLIENTS.
            </h2>
          </div>

          {/* Slider Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full border border-white/10 hover:border-[#B58CFF] bg-white/[0.02] hover:bg-white/10 text-[#F5F5F5] transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full border border-white/10 hover:border-[#B58CFF] bg-white/[0.02] hover:bg-white/10 text-[#F5F5F5] transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Minimal Testimonial Card */}
        <div className="relative p-8 sm:p-14 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-md shadow-2xl min-h-[300px] flex flex-col justify-between">
          <Quote className="w-12 h-12 text-[#B58CFF]/20 mb-6" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="flex-1 flex flex-col justify-between"
            >
              {/* Star rating */}
              <div className="flex items-center gap-1.5 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#B58CFF] text-[#B58CFF]" />
                ))}
              </div>

              {/* Quote text */}
              <blockquote className="text-xl sm:text-2xl md:text-3xl font-light text-[#F5F5F5] font-display italic leading-relaxed mb-8 whitespace-pre-line">
                "{current.quote}"
              </blockquote>

              {/* Client Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
                <div>
                  <h4 className="text-lg font-bold text-[#F5F5F5] font-heading">
                    {current.clientName}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#A5A5A5] font-body">
                    {current.clientRole} {current.companyOrChannel ? `· ${current.companyOrChannel}` : ''}
                  </p>
                </div>

                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#B58CFF] self-start sm:self-auto">
                  {current.projectType}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pagination Indicators */}
          <div className="flex items-center gap-2 mt-8 pt-4">
            {TESTIMONIALS_DATA.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => {
                  soundManager.playClick();
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-8 bg-[#B58CFF]' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
