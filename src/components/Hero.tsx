import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Sparkles, Play, Mail } from 'lucide-react';
import { Hero3DCanvas } from './Hero3DCanvas';
import { soundManager } from '../utils/audio';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    soundManager.playClick();
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 sm:px-8 lg:px-12 overflow-hidden bg-[#08090B]"
    >
      {/* 3D WebGL Canvas Layer */}
      <Hero3DCanvas />

      {/* Atmospheric Radial Glow Behind Content */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#B58CFF]/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[420px] h-[420px] bg-[#532b88]/15 blur-[130px] pointer-events-none rounded-full" />

      {/* Hero Central Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto flex flex-col items-start pt-6 sm:pt-12">
        {/* Top Tagline Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-[#B58CFF] shadow-[0_0_8px_#B58CFF]" />
          <span className="text-xs sm:text-xs font-mono uppercase tracking-[0.25em] text-[#A5A5A5]">
            INDEPENDENT VIDEO EDITOR & CREATIVE STORYTELLER
          </span>
        </motion.div>

        {/* Oversized Cinematic Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-heading tracking-tighter uppercase leading-[0.92] text-[#F5F5F5] mb-6 max-w-5xl"
        >
          TURNING <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5F5F5] via-[#E2D5FF] to-[#B58CFF] animate-text-shimmer">
            FRAMES INTO
          </span> <br />
          FEELINGS.
        </motion.h1>

        {/* Minimal Sub-description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl md:text-2xl font-light text-[#A5A5A5] max-w-2xl font-body leading-relaxed mb-10"
        >
          Hey, I'm Dhanush. I take raw, messy footage and turn it into engaging stories, punchy reels, and cinematic edits that hold attention from start to finish.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-4 sm:gap-6"
        >
          {/* Primary CTA */}
          <button
            onClick={() => scrollTo('#work')}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#F5F5F5] text-[#08090B] font-bold text-sm tracking-wide overflow-hidden shadow-2xl hover:shadow-[0_0_25px_rgba(181,140,255,0.4)] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Play className="w-4 h-4 fill-current" />
              Explore My Work
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#B58CFF] to-[#E2D5FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => scrollTo('#contact')}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-white/15 hover:border-[#B58CFF] text-[#F5F5F5] hover:text-[#B58CFF] bg-white/[0.02] hover:bg-white/[0.05] font-semibold text-sm tracking-wide transition-all duration-300 backdrop-blur-sm"
          >
            <Mail className="w-4 h-4" />
            Let's Work Together
          </button>

          {/* Reel preview quick trigger */}
          <button
            onClick={() => scrollTo('#showreel')}
            className="hidden lg:flex items-center gap-2 text-xs font-mono text-[#A5A5A5] hover:text-[#F5F5F5] transition-colors ml-4 pl-4 border-l border-white/10"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B58CFF]" />
            Watch 2026 Showreel (01:45)
          </button>
        </motion.div>
      </div>

      {/* Hero Footer Meta: Location & Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative z-10 max-w-7xl mx-auto w-full pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#A5A5A5] border-t border-white/10"
      >
        <div className="flex items-center gap-3 tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>BASED IN INDIA · AVAILABLE WORLDWIDE</span>
        </div>

        <button
          onClick={() => scrollTo('#showreel')}
          className="group flex items-center gap-2 text-[#A5A5A5] hover:text-[#B58CFF] transition-colors tracking-widest uppercase cursor-pointer"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform duration-300 text-[#B58CFF]" />
        </button>
      </motion.div>
    </section>
  );
};
