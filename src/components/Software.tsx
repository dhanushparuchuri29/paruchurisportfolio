import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface SoftwareCardData {
  id: string;
  name: string;
  roleBadge: string;
  version: string;
  logoSrc: string;
  glowGradient: string;
  accentBorder: string;
  accentTextColor: string;
  glowColor: string;
  shortDescription: string;
  appliedSkills: string[];
}

const SOFTWARE_LIST: SoftwareCardData[] = [
  {
    id: 'davinci-resolve',
    name: 'DaVinci Resolve Studio',
    roleBadge: 'COLOR SCIENCE & MASTERING',
    version: 'Blackmagic Design Studio 19',
    logoSrc: '/logos/davinci-resolve.svg',
    // Authentic multi-colored luminous reflections for DaVinci Resolve
    glowGradient: 'radial-gradient(circle at center, rgba(255, 60, 60, 0.28) 0%, rgba(255, 204, 0, 0.2) 30%, rgba(0, 180, 255, 0.25) 60%, rgba(175, 82, 222, 0.2) 100%)',
    accentBorder: 'rgba(255, 120, 60, 0.45)',
    accentTextColor: '#FF7A45',
    glowColor: 'rgba(255, 110, 60, 0.35)',
    shortDescription:
      'My primary powerhouse for node-based color grading, ACES color management, and final mastering. I use it to balance tricky mixed camera sensors, isolate natural human skin tones, and build authentic 35mm film print emulations.',
    appliedSkills: [
      'Node-based Color Grading',
      'ACEScc Color Management',
      'Skin Tone Isolation & Tracking',
      'Kodak 2383 Film Print Emulation',
      'Fairlight Dialogue Restoration',
    ],
  },
  {
    id: 'after-effects',
    name: 'Adobe After Effects',
    roleBadge: 'MOTION DESIGN & VFX',
    version: 'Adobe Creative Cloud 2025',
    logoSrc: '/logos/after-effects.svg',
    // Elegant purple & violet glow
    glowGradient: 'radial-gradient(circle at center, rgba(181, 140, 255, 0.38) 0%, rgba(140, 82, 255, 0.25) 50%, rgba(80, 0, 200, 0.15) 100%)',
    accentBorder: 'rgba(181, 140, 255, 0.5)',
    accentTextColor: '#D291FF',
    glowColor: 'rgba(181, 140, 255, 0.4)',
    shortDescription:
      'Where motion graphics and visual polish happen. From kinetic subtitle animations and 3D camera tracking to custom intro title sequences, screen replacements, and seamless glitch transitions that make videos feel high-budget.',
    appliedSkills: [
      'Kinetic Subtitles & Typography',
      '3D Camera Tracking & Matchmove',
      'Screen Cleanups & Object Removal',
      'Custom Title Card Sequences',
      'MOGRT Template Development',
    ],
  },
  {
    id: 'premiere-pro',
    name: 'Adobe Premiere Pro',
    roleBadge: 'STORY ASSEMBLY & PACING',
    version: 'Adobe Creative Cloud 2025',
    logoSrc: '/logos/premiere-pro.svg',
    // Sophisticated blue & purple glow
    glowGradient: 'radial-gradient(circle at center, rgba(80, 140, 255, 0.35) 0%, rgba(153, 153, 255, 0.25) 50%, rgba(0, 0, 91, 0.18) 100%)',
    accentBorder: 'rgba(120, 150, 255, 0.45)',
    accentTextColor: '#9999FF',
    glowColor: 'rgba(120, 150, 255, 0.35)',
    shortDescription:
      'The core timeline where all raw footage gets organized and assembled. I work heavily with keyboard shortcuts and multi-cam bins to trim dead pauses, find the story rhythm, and lock pacing tightly to the musical beat.',
    appliedSkills: [
      'Narrative Timeline Pacing',
      'Multi-Camera Synchronization',
      'Rhythmic J-Cuts & L-Cuts',
      'Essential Sound & Foley Mix',
      'Fast-Turnaround Client Revisions',
    ],
  },
];

export const Software: React.FC = () => {
  return (
    <section
      id="software"
      className="relative py-32 px-6 sm:px-8 lg:px-12 bg-[#08090B] text-[#F5F5F5] border-t border-white/5 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-[#B58CFF]/10 blur-[170px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#0066FF]/08 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#B58CFF] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PRODUCTION ARSENAL</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tighter uppercase text-[#F5F5F5]">
              TOOLS OF MY CRAFT.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#A5A5A5] max-w-md font-body leading-relaxed">
            Every tool has its dedicated purpose in my pipeline. Here is how I combine DaVinci Resolve, After Effects, and Premiere Pro to take raw footage and deliver cinema-grade stories.
          </p>
        </div>

        {/* 3 Equally Sized Premium Software Displays in Horizontal Row on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {SOFTWARE_LIST.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              onHoverStart={() => soundManager.playClick()}
              className="group relative rounded-[28px] p-8 sm:p-9 bg-[#111217]/75 backdrop-blur-[24px] border border-white/[0.09] hover:border-white/[0.22] transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              style={{
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)',
              }}
            >
              {/* Dynamic Colored Hover Glow Backing */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[28px]"
                style={{
                  background: tool.glowGradient,
                  filter: 'blur(35px)',
                }}
              />

              {/* Animated Light Sweep Beam on Card */}
              <div
                className="absolute -inset-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"
              />

              {/* Card Top: Logo Chamber & Badges */}
              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Meta Pills Row */}
                <div className="w-full flex items-center justify-between gap-2 mb-8">
                  <span
                    className="text-[10px] font-mono uppercase tracking-[0.16em] px-3 py-1 rounded-full border bg-white/[0.03] backdrop-blur-sm font-semibold"
                    style={{
                      color: tool.accentTextColor,
                      borderColor: tool.accentBorder,
                    }}
                  >
                    {tool.roleBadge}
                  </span>

                  <span className="text-[11px] font-mono text-[#71717A] tracking-wider">
                    {tool.version.split(' ')[tool.version.split(' ').length - 1]}
                  </span>
                </div>

                {/* 3D Glass Display Chamber for Authentic Logo */}
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 mb-8 flex items-center justify-center">
                  {/* Idle Ambient Glow Behind Logo */}
                  <motion.div
                    animate={{
                      scale: [1, 1.08, 1],
                      opacity: [0.55, 0.85, 0.55],
                    }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute inset-2 rounded-full pointer-events-none transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: tool.glowGradient,
                      filter: 'blur(20px)',
                    }}
                  />

                  {/* Glass Pedestal Ring */}
                  <div className="absolute inset-0 rounded-3xl bg-white/[0.03] border border-white/[0.12] group-hover:border-white/[0.25] backdrop-blur-md shadow-inner transition-colors duration-500 flex items-center justify-center overflow-hidden">
                    {/* Glass Surface Specular Top Highlight */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/[0.12] to-transparent pointer-events-none rounded-t-3xl" />

                    {/* Subtle Reflection Base Under Logo */}
                    <div className="absolute bottom-0 left-4 right-4 h-6 bg-gradient-to-t from-white/[0.08] to-transparent rounded-full filter blur-[4px] pointer-events-none" />
                  </div>

                  {/* Floating Logo Element */}
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 3.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.4,
                    }}
                    className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                  >
                    {/* Real Authentic Logo Image */}
                    <img
                      src={tool.logoSrc}
                      alt={`${tool.name} official logo`}
                      className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)] select-none pointer-events-none"
                      loading="lazy"
                    />

                    {/* Soft Reflection Shine sweep */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/[0.15] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  </motion.div>
                </div>

                {/* Software Name */}
                <h3 className="text-2xl sm:text-3xl font-black font-heading text-[#F5F5F5] group-hover:text-white transition-colors duration-300 mb-2">
                  {tool.name}
                </h3>

                {/* Version & Creator Subline */}
                <span className="text-xs font-mono text-[#A5A5A5] mb-5 block">
                  {tool.version}
                </span>

                {/* Short Human Description */}
                <p className="text-xs sm:text-sm text-[#A5A5A5] group-hover:text-[#D4D4D8] font-body leading-relaxed text-center mb-8 transition-colors duration-300">
                  {tool.shortDescription}
                </p>
              </div>

              {/* Card Bottom: Skills & Techniques */}
              <div className="relative z-10 pt-6 border-t border-white/[0.08] group-hover:border-white/[0.15] transition-colors duration-300">
                <span className="block text-[10px] font-mono uppercase tracking-[0.18em] text-[#71717A] mb-3 text-center sm:text-left">
                  Applied Capabilities
                </span>
                <ul className="space-y-2">
                  {tool.appliedSkills.map((skill, sIdx) => (
                    <li
                      key={sIdx}
                      className="flex items-center gap-2 text-xs font-mono text-[#C5C5C5] group-hover:text-[#F5F5F5] transition-colors"
                    >
                      <CheckCircle2
                        className="w-3.5 h-3.5 shrink-0 transition-colors"
                        style={{ color: tool.accentTextColor }}
                      />
                      <span className="truncate">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
