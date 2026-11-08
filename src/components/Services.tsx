import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles, Film, Smartphone, Heart, Sliders, Layers, CheckCircle2 } from 'lucide-react';
import { SERVICES_DATA } from '../data/services';
import { soundManager } from '../utils/audio';

export const Services: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Film':
        return <Film className="w-6 h-6 text-[#7C3AED]" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-[#7C3AED]" />;
      case 'Heart':
        return <Heart className="w-6 h-6 text-[#7C3AED]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#7C3AED]" />;
      case 'Sliders':
        return <Sliders className="w-6 h-6 text-[#7C3AED]" />;
      default:
        return <Layers className="w-6 h-6 text-[#7C3AED]" />;
    }
  };

  const scrollToContact = (serviceTitle: string) => {
    soundManager.playClick();
    const el = document.querySelector('#contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // prefill or trigger notice
      const select = document.querySelector('select[name="projectType"]') as HTMLSelectElement;
      if (select) {
        select.value = serviceTitle;
      }
    }
  };

  return (
    <section
      id="services"
      className="relative py-28 px-6 sm:px-8 lg:px-12 bg-[#F3F4F6] text-[#0E1015] rounded-t-[40px] sm:rounded-t-[64px] shadow-2xl z-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Top Tag & Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-black/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#7C3AED] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>WHAT I OFFER</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tighter uppercase text-[#0E1015]">
              WHAT I CREATE.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#4B5563] max-w-md font-body leading-relaxed">
            From raw, unorganized camera cards to clean, high-impact edits ready for YouTube, Instagram, or client presentation.
          </p>
        </div>

        {/* 5 Premium Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_DATA.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => scrollToContact(service.title)}
              className={`group relative p-8 sm:p-10 rounded-3xl bg-white border border-black/5 hover:border-[#7C3AED]/30 shadow-sm hover:shadow-2xl hover:shadow-[#7C3AED]/10 transition-all duration-500 cursor-pointer flex flex-col justify-between ${
                index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div>
                {/* Header Row: Service Number & Moving Arrow */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl font-black font-mono text-[#9CA3AF] group-hover:text-[#7C3AED] transition-colors duration-300">
                      {service.number}
                    </span>
                    <div className="p-2.5 rounded-2xl bg-[#F3F4F6] group-hover:bg-[#7C3AED]/10 transition-colors">
                      {getIcon(service.iconName)}
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-[#F3F4F6] group-hover:bg-[#7C3AED] text-[#4B5563] group-hover:text-white flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-[#0E1015] group-hover:text-[#7C3AED] transition-colors mb-4">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-sm sm:text-base text-[#4B5563] font-body leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                {/* Service Feature Highlights */}
                <ul className="space-y-2.5 pt-4 border-t border-black/5 mb-8">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#374151] font-body">
                      <CheckCircle2 className="w-4 h-4 text-[#7C3AED] shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer: Turnaround & CTA prompt */}
              <div className="pt-4 border-t border-black/5 flex items-center justify-between text-xs font-mono text-[#6B7280]">
                <span>TURNAROUND: {service.turnaround}</span>
                <span className="font-semibold text-[#7C3AED] group-hover:underline">Inquire →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
