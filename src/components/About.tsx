import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Layers, Sliders, Film } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-32 px-6 sm:px-8 lg:px-12 bg-[#08090B] overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#B58CFF]/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto">
        {/* Section Pill */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#B58CFF] mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ABOUT ME</span>
        </div>

        {/* Section Heading */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tighter uppercase text-[#F5F5F5] mb-16">
          BEHIND THE FRAMES.
        </h2>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Creative Workspace / Portrait with Floating Elements */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/[0.02] aspect-[4/5] group">
              <img
                src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1000&auto=format&fit=crop"
                alt="Creative video editing workspace and grading monitors"
                className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-transparent opacity-80" />

              {/* Status Badge in Image */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#08090B]/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-[#A5A5A5] uppercase tracking-wider">Studio Setup</div>
                  <div className="text-sm font-bold text-[#F5F5F5] font-display">Dual Color-Calibrated Displays</div>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>

            {/* Floating 3D/Glass Badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#08090B]/90 border border-[#B58CFF]/30 backdrop-blur-md shadow-xl text-xs font-mono text-[#F5F5F5]"
            >
              <Film className="w-4 h-4 text-[#B58CFF]" />
              <span>4K DCI TIMELINE</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#08090B]/90 border border-white/20 backdrop-blur-md shadow-xl text-xs font-mono text-[#F5F5F5]"
            >
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>ACES COLOR PIPELINE</span>
            </motion.div>
          </div>

          {/* Right Column: Bio & Core Philosophy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-2xl sm:text-3xl font-display font-medium text-[#B58CFF] mb-4">
              Hey, I'm Dhanush.
            </span>

            <p className="text-xl sm:text-2xl font-light text-[#F5F5F5] font-body leading-relaxed mb-6">
              I'm a video editor and visual storyteller focused on creating engaging,
              cinematic, and memorable content. From fast-paced social media reels to detailed cinematic edits,
              I love turning raw, unorganized footage into stories that actually connect with people.
            </p>

            <p className="text-base sm:text-lg text-[#A5A5A5] font-body leading-relaxed mb-10">
              I work with creators, brands, and businesses to turn their ideas into powerful visual experiences.
              Whether you need tight retention on YouTube Shorts, a heartfelt wedding highlight, or rich color grading in DaVinci Resolve, I handle the technical heavy lifting so you can focus on creating.
            </p>

            {/* Software Badges */}
            <div className="pt-8 border-t border-white/10">
              <span className="block text-xs font-mono text-[#A5A5A5] uppercase tracking-widest mb-4">
                Software I Work In Daily
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* DaVinci Resolve */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#FF6F3D]/50 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#FF6F3D]/10 border border-[#FF6F3D]/30 flex items-center justify-center font-black text-xs text-[#FF6F3D]">
                      DVR
                    </div>
                    <span className="font-semibold text-sm text-[#F5F5F5]">DaVinci Resolve</span>
                  </div>
                  <p className="text-xs text-[#A5A5A5]">Color grading, matching tricky cameras, and audio mastering.</p>
                </div>

                {/* Adobe Premiere Pro */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#9999FF]/50 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#9999FF]/10 border border-[#9999FF]/30 flex items-center justify-center font-black text-xs text-[#9999FF]">
                      Pr
                    </div>
                    <span className="font-semibold text-sm text-[#F5F5F5]">Premiere Pro</span>
                  </div>
                  <p className="text-xs text-[#A5A5A5]">Where the cut begins: pacing, story rhythm, and multi-cam sync.</p>
                </div>

                {/* Adobe After Effects */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#D291FF]/50 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#D291FF]/10 border border-[#D291FF]/30 flex items-center justify-center font-black text-xs text-[#D291FF]">
                      Ae
                    </div>
                    <span className="font-semibold text-sm text-[#F5F5F5]">After Effects</span>
                  </div>
                  <p className="text-xs text-[#A5A5A5]">Kinetic subtitles, clean logo reveals, and custom motion graphics.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
