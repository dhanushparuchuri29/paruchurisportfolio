import React from 'react';
import { Sparkles, ArrowUpRight, Play } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const Showreel: React.FC = () => {
  const showreelUrl = 'https://youtu.be/Ozp4GkxUCLQ?si=c8qxJPuEykA1IxCD';
  const showreelPoster = '/assets/aistudio/showreel_poster.jpg';

  const handleClick = () => {
    soundManager.playClick();
    window.open(showreelUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="showreel" className="relative py-28 px-6 sm:px-8 lg:px-12 bg-[#08090B] border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#B58CFF]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#B58CFF] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SHOWREEL 2026</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black font-heading tracking-tighter uppercase text-[#F5F5F5]">
              MY WORLD IN MOTION.
            </h2>
          </div>

          {/* Quick External Link Button */}
          <a
            href={showreelUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playClick()}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-[#B58CFF] text-white hover:text-[#08090B] border border-white/10 hover:border-[#B58CFF] text-xs font-mono tracking-wider uppercase transition-all duration-300 shadow-lg cursor-pointer"
          >
            <span className="flex items-center gap-1.5 text-rose-400 group-hover:text-[#08090B] transition-colors">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </span>
            <span>Watch on YouTube</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* 16:9 Cinematic Card (Click to Open YouTube Link) */}
        <div
          data-cursor="link"
          onClick={handleClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClick();
            }
          }}
          className="relative aspect-video w-full rounded-3xl overflow-hidden bg-black/90 border border-white/15 hover:border-[#B58CFF]/50 shadow-[0_20px_80px_rgba(0,0,0,0.8)] group cursor-pointer select-none transition-all duration-500"
        >
          {/* Poster image preview */}
          <div className="w-full h-full relative">
            <img
              src={showreelPoster}
              alt="Dhanush 2026 Showreel Preview"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 pointer-events-none" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60 pointer-events-none" />
          </div>

          {/* Top Bar Info */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-white/90 z-20 pointer-events-none">
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="tracking-wider uppercase">4K EDITING & SOUND SHOWREEL</span>
            </span>

            <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-rose-400 font-semibold">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span>YouTube 4K</span>
            </span>
          </div>

          {/* Big Center Play & Launch Button */}
          <div className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-[#B58CFF] text-[#08090B] flex items-center justify-center shadow-[0_0_50px_rgba(181,140,255,0.7)] group-hover:scale-110 active:scale-95 transition-all duration-300 z-20 pointer-events-none">
            <Play className="w-10 h-10 fill-current translate-x-1 text-[#08090B]" />
          </div>

          {/* Bottom Callout Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 bg-gradient-to-t from-black via-black/80 to-transparent z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#B58CFF] block mb-1">
                YOUTUBE PREMIERE
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-heading text-white">
                Click to Watch 2026 Showreel
              </h3>
            </div>

            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 group-hover:bg-[#B58CFF] text-white group-hover:text-[#08090B] border border-white/15 text-xs font-mono uppercase tracking-wider transition-all duration-300">
              <span>Open Video</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Cinematic Philosophy Quote & Animated Timeline Graphic */}
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-xl sm:text-2xl font-light text-[#F5F5F5] font-display italic">
            "Every frame has a purpose. Every cut tells a story."
          </p>

          {/* Animated Timeline Graphic with Track Layers */}
          <div className="w-full md:w-80 bg-white/[0.03] border border-white/10 rounded-xl p-3 flex flex-col gap-2 font-mono text-[10px]">
            <div className="flex items-center justify-between text-[#A5A5A5]">
              <span>TIMELINE V1/A1-A4</span>
              <span className="text-[#B58CFF]">48.0 kHz 24-BIT</span>
            </div>
            {/* Visual timeline track blocks */}
            <div className="flex flex-col gap-1.5">
              {/* Video Track 1 */}
              <div className="h-3 w-full bg-white/5 rounded flex gap-1 overflow-hidden p-0.5">
                <div className="h-full w-1/4 bg-[#B58CFF]/60 rounded-sm" />
                <div className="h-full w-1/3 bg-[#8C52FF]/70 rounded-sm" />
                <div className="h-full w-1/5 bg-[#B58CFF]/80 rounded-sm" />
                <div className="h-full w-1/4 bg-white/30 rounded-sm" />
              </div>
              {/* Audio Track 1 */}
              <div className="h-2 w-full bg-white/5 rounded flex gap-1 overflow-hidden p-0.5">
                <div className="h-full w-1/2 bg-emerald-500/50 rounded-sm" />
                <div className="h-full w-1/2 bg-emerald-500/60 rounded-sm" />
              </div>
              {/* Audio Track 2 (Foley) */}
              <div className="h-2 w-full bg-white/5 rounded flex gap-1 overflow-hidden p-0.5">
                <div className="h-full w-1/3 bg-cyan-500/40 rounded-sm" />
                <div className="h-full w-2/3 bg-cyan-500/50 rounded-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
