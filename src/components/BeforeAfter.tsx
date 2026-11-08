import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Sparkles, SlidersHorizontal, Sun, Eye, Contrast, Palette, Award } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface GradePreset {
  id: string;
  name: string;
  subtitle: string;
  originalImage: string;
  gradedImage: string;
  lutTag: string;
}

const PRESETS: GradePreset[] = [
  {
    id: 'cinematic-film',
    name: '35mm Film Print Emulation',
    subtitle: 'Sony S-Log3 → Kodak Vision3 5219 / 2383 DCI Print',
    // Graded: rich warm highlights, cyan shadows, balanced skin
    gradedImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1600&auto=format&fit=crop',
    // Original: washed out flat log version (achieved with CSS filters and styling on the same asset)
    originalImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1600&auto=format&fit=crop',
    lutTag: 'ACEScc · Kodak 2383'
  },
  {
    id: 'golden-hour',
    name: 'Romantic Sunset Glow',
    subtitle: 'RAW 14-bit → Warm Golden Hue & Skin Tone Softening',
    gradedImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
    originalImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
    lutTag: 'Warm Amber 3200K'
  },
  {
    id: 'moody-noir',
    name: 'Cyber Noir & Automotive',
    subtitle: 'ARRI LogC → Deep Obsidian Blacks & Vibrant Speculars',
    gradedImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
    originalImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
    lutTag: 'High Density Matrix'
  }
];

export const BeforeAfter: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedPresetId, setSelectedPresetId] = useState(PRESETS[0].id);

  const containerRef = useRef<HTMLDivElement>(null);
  const currentPreset = PRESETS.find((p) => p.id === selectedPresetId) || PRESETS[0];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(clampedPos);
  }, []);

  const handleMouseDown = () => {
    setIsDragging(true);
    soundManager.playClick();
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="grading" className="relative py-32 px-6 sm:px-8 lg:px-12 bg-[#08090B] border-t border-white/5 overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#B58CFF]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#B58CFF] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DAVINCI RESOLVE COLOR SCIENCE</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tighter uppercase text-[#F5F5F5]">
              THE POWER OF COLOR.
            </h2>
          </div>
          <p className="text-base sm:text-lg text-[#A5A5A5] max-w-md font-body leading-relaxed">
            Drag the slider to reveal how custom tone curves, skin qualifiers, and 35mm film emulation bring flat digital sensor data to life.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {PRESETS.map((preset) => {
            const isSelected = preset.id === selectedPresetId;
            return (
              <button
                key={preset.id}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedPresetId(preset.id);
                  setSliderPosition(50);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono tracking-wide transition-all ${
                  isSelected
                    ? 'bg-[#B58CFF] text-[#08090B] font-bold shadow-[0_0_15px_rgba(181,140,255,0.4)]'
                    : 'bg-white/5 text-[#A5A5A5] hover:text-[#F5F5F5] hover:bg-white/10 border border-white/10'
                }`}
              >
                {preset.name}
              </button>
            );
          })}
        </div>

        {/* Draggable Split Slider Container */}
        <div
          ref={containerRef}
          onPointerDown={handleMouseDown}
          onPointerUp={handlePointerUp}
          onPointerMove={handlePointerMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handlePointerUp}
          onTouchMove={(e) => isDragging && handleMove(e.touches[0].clientX)}
          data-cursor="drag"
          className="relative w-full aspect-video sm:aspect-[21/9] rounded-3xl overflow-hidden select-none cursor-ew-resize border border-white/15 shadow-2xl bg-black"
        >
          {/* Base Layer: Color Graded (Full rich color) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={currentPreset.gradedImage}
              alt="Color Graded Master Footage"
              className="w-full h-full object-cover filter contrast-110 saturate-125 brightness-105"
            />
            {/* Graded Label */}
            <div className="absolute top-6 right-6 px-3.5 py-1.5 rounded-full bg-[#B58CFF]/90 text-[#08090B] font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg">
              COLOR GRADED
            </div>
          </div>

          {/* Top Layer: Original RAW / Flat LOG Profile (Clipped via clipPath) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            {/* Simulated true Flat LOG sensor gamma: desaturated, lowered contrast, lifted shadows */}
            <img
              src={currentPreset.originalImage}
              alt="Raw Unprocessed Flat LOG Footage"
              className="w-full h-full object-cover filter saturate-[0.35] contrast-[0.70] brightness-[1.12]"
            />
            {/* Original Label */}
            <div className="absolute top-6 left-6 px-3.5 py-1.5 rounded-full bg-black/75 border border-white/20 text-[#A5A5A5] font-mono text-xs uppercase tracking-wider backdrop-blur-md">
              RAW / FLAT LOG SENSOR
            </div>
          </div>

          {/* Draggable Divider Line & Knob */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-20 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-2xl border-2 border-[#B58CFF]">
              <SlidersHorizontal className="w-4 h-4 text-[#08090B]" />
            </div>
          </div>

          {/* Bottom Watermark / Specs info */}
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs font-mono text-white/70 pointer-events-none">
            <span className="bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
              LUT: {currentPreset.lutTag}
            </span>
            <span className="hidden sm:inline bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
              Drag left/right to compare
            </span>
          </div>
        </div>

        {/* 5 Technical Color Grading Breakdown Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-12">
          {/* 1. White Balance */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="w-8 h-8 rounded-lg bg-[#B58CFF]/15 text-[#B58CFF] flex items-center justify-center mb-3">
              <Sun className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-[#F5F5F5] font-heading mb-1">White Balance</h4>
            <p className="text-xs text-[#A5A5A5] leading-relaxed">
              Fixing clips that look too yellow, green, or cold so lighting looks completely natural.
            </p>
          </div>

          {/* 2. Skin Tone Correction */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="w-8 h-8 rounded-lg bg-[#B58CFF]/15 text-[#B58CFF] flex items-center justify-center mb-3">
              <Eye className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-[#F5F5F5] font-heading mb-1">Skin Tone Balancing</h4>
            <p className="text-xs text-[#A5A5A5] leading-relaxed">
              Making sure faces don't look sunburnt or sickly, keeping skin tones consistent from clip to clip.
            </p>
          </div>

          {/* 3. Contrast */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="w-8 h-8 rounded-lg bg-[#B58CFF]/15 text-[#B58CFF] flex items-center justify-center mb-3">
              <Contrast className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-[#F5F5F5] font-heading mb-1">Contrast & Depth</h4>
            <p className="text-xs text-[#A5A5A5] leading-relaxed">
              Adding punch back into flat RAW footage without crushing shadow detail or blowing out skies.
            </p>
          </div>

          {/* 4. Color Separation */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="w-8 h-8 rounded-lg bg-[#B58CFF]/15 text-[#B58CFF] flex items-center justify-center mb-3">
              <Palette className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-[#F5F5F5] font-heading mb-1">Subject Separation</h4>
            <p className="text-xs text-[#A5A5A5] leading-relaxed">
              Subtly cooling backgrounds so your subject in the foreground naturally pops off the screen.
            </p>
          </div>

          {/* 5. Cinematic Look Development */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 sm:col-span-2 lg:col-span-1">
            <div className="w-8 h-8 rounded-lg bg-[#B58CFF]/15 text-[#B58CFF] flex items-center justify-center mb-3">
              <Award className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-[#F5F5F5] font-heading mb-1">Filmic Look Dev</h4>
            <p className="text-xs text-[#A5A5A5] leading-relaxed">
              Emulating the warm highlights and soft roll-offs of real 35mm film stock instead of harsh digital video.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
