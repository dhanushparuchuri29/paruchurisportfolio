import React from 'react';
import { useScrollProgress } from './hooks/useScrollProgress';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Showreel } from './components/Showreel';
import { About } from './components/About';
import { Services } from './components/Services';
import { Software } from './components/Software';
import { Projects } from './components/Projects';
import { BeforeAfter } from './components/BeforeAfter';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const { scrollProgress, isScrolled } = useScrollProgress();

  return (
    <div className="relative min-h-screen bg-[#08090B] text-[#F5F5F5] overflow-x-hidden selection:bg-[#B58CFF] selection:text-[#08090B] font-body film-grain">
      {/* Top Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] bg-transparent z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#8C52FF] via-[#B58CFF] to-[#E2D5FF] transition-all duration-75 shadow-[0_0_10px_#B58CFF]"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Desktop Custom Follower Cursor */}
      <CustomCursor />

      {/* Sticky Blurred Navbar */}
      <Navbar isScrolled={isScrolled} />

      {/* Main Content Sections */}
      <main className="relative">
        {/* 1. Hero Section with 3D Canvas */}
        <Hero />

        {/* Cinematic Continuous Marquee Ticker */}
        <div className="relative py-4 bg-[#0E1015] border-y border-white/10 overflow-hidden font-mono text-xs uppercase tracking-[0.25em] text-[#A5A5A5] z-10">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-12">
            <span className="flex items-center gap-4">
              <span>STORYTELLING & PACING</span>
              <span className="text-[#B58CFF]">✦</span>
            </span>
            <span className="flex items-center gap-4">
              <span>DAVINCI COLOR GRADING</span>
              <span className="text-[#B58CFF]">✦</span>
            </span>
            <span className="flex items-center gap-4">
              <span>HIGH-RETENTION REELS & SHORTS</span>
              <span className="text-[#B58CFF]">✦</span>
            </span>
            <span className="flex items-center gap-4">
              <span>SOUND DESIGN & FOLEY</span>
              <span className="text-[#B58CFF]">✦</span>
            </span>
            <span className="flex items-center gap-4">
              <span>AFTER EFFECTS MOTION TITLES</span>
              <span className="text-[#B58CFF]">✦</span>
            </span>
            <span className="flex items-center gap-4">
              <span>WEDDING & EVENT FILMS</span>
              <span className="text-[#B58CFF]">✦</span>
            </span>
            <span className="flex items-center gap-4">
              <span>COMMERCIAL CUTS</span>
              <span className="text-[#B58CFF]">✦</span>
            </span>
            {/* Repeated for seamless loop */}
            <span className="flex items-center gap-4">
              <span>STORYTELLING & PACING</span>
              <span className="text-[#B58CFF]">✦</span>
            </span>
            <span className="flex items-center gap-4">
              <span>DAVINCI COLOR GRADING</span>
              <span className="text-[#B58CFF]">✦</span>
            </span>
            <span className="flex items-center gap-4">
              <span>HIGH-RETENTION REELS & SHORTS</span>
              <span className="text-[#B58CFF]">✦</span>
            </span>
            <span className="flex items-center gap-4">
              <span>SOUND DESIGN & FOLEY</span>
              <span className="text-[#B58CFF]">✦</span>
            </span>
          </div>
        </div>

        {/* 2. Showreel Section */}
        <Showreel />

        {/* 3. About Section */}
        <About />

        {/* 4. Services Section (Light Neutral Contrast Background with Rounded Top) */}
        <Services />

        {/* 5. Software & Toolkit */}
        <Software />

        {/* 6. Selected Work (Main Portfolio) */}
        <Projects />

        {/* 7. Before & After Color Grading Slider */}
        <BeforeAfter />

        {/* 8. Creative Process Timeline */}
        <Process />

        {/* 9. Client Testimonials Slider */}
        <Testimonials />

        {/* 10. Contact Section */}
        <Contact />
      </main>

      {/* 11. Footer */}
      <Footer />
    </div>
  );
}
