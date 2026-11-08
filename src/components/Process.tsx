import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, MessageSquareText, Compass, Scissors, Sliders, Send } from 'lucide-react';

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Understanding',
    subtitle: 'Chat & Creative Direction',
    desc: "We chat about what you want to achieve, who you're speaking to, what music style you like, and your deadline.",
    icon: MessageSquareText,
    duration: 'Day 1'
  },
  {
    step: '02',
    title: 'Story & Structure',
    subtitle: 'Footage Upload & Selects',
    desc: 'You send over the raw footage. I organize the clips, sync the clean audio tracks, and pick out the strongest takes.',
    icon: Compass,
    duration: 'Day 2'
  },
  {
    step: '03',
    title: 'Editing',
    subtitle: 'Pacing & Sound Design',
    desc: 'I assemble the story, cut the dead air, sync beats to the soundtrack, and layer in realistic sound effects that keep viewers engaged.',
    icon: Scissors,
    duration: 'Day 3 - 4'
  },
  {
    step: '04',
    title: 'Refinement',
    subtitle: 'Color Grading & Revisions',
    desc: 'You watch the rough cut and share feedback. Then I color grade each shot in DaVinci, clean up dialogue, and polish the graphics.',
    icon: Sliders,
    duration: 'Day 5'
  },
  {
    step: '05',
    title: 'Delivery',
    subtitle: 'Final High-Res Exports',
    desc: 'I send over full-resolution 4K masters ready for YouTube or client review, plus vertical 9:16 versions for Reels and TikTok.',
    icon: Send,
    duration: 'Day 6'
  }
];

export const Process: React.FC = () => {
  return (
    <section id="process" className="relative py-32 px-6 sm:px-8 lg:px-12 bg-[#08090B] border-t border-white/5 overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] bg-[#B58CFF]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#B58CFF] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE WORKFLOW</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tighter uppercase text-[#F5F5F5]">
              FROM RAW TO REMARKABLE.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#A5A5A5] max-w-md font-body leading-relaxed">
            A systematic, collaborative post-production pipeline delivering cinema-grade results without delays.
          </p>
        </div>

        {/* Horizontal Process Steps */}
        <div className="relative">
          {/* Subtle Horizontal Connecting Track (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B58CFF]/40 to-transparent -translate-y-12 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {PROCESS_STEPS.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative p-6 sm:p-7 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-[#B58CFF]/50 transition-all duration-300 flex flex-col justify-between group hover:bg-white/[0.04]"
                >
                  <div>
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-2xl font-black font-mono text-[#B58CFF]">
                        {item.step}
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F5F5F5] group-hover:text-[#B58CFF] group-hover:border-[#B58CFF]/40 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Step Title & Subtitle */}
                    <h3 className="text-xl font-bold font-heading text-[#F5F5F5] mb-1 group-hover:text-[#B58CFF] transition-colors">
                      {item.title}
                    </h3>
                    <span className="block text-xs font-mono text-[#A5A5A5] mb-4">
                      {item.subtitle}
                    </span>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#A5A5A5] font-body leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Step Estimated Duration */}
                  <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#71717A]">
                    <span>PHASE TIMING</span>
                    <span className="text-[#F5F5F5] font-semibold">{item.duration}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
