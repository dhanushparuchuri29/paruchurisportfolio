import React, { useState, useEffect } from 'react';
import { ArrowUp, Film, Instagram, Linkedin, Mail } from 'lucide-react';
import { FiverrIcon } from './icons/FiverrIcon';
import { soundManager } from '../utils/audio';

export const Footer: React.FC = () => {
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to IST
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setIstTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 px-6 sm:px-8 lg:px-12 bg-[#050608] border-t border-white/10 text-[#A5A5A5]">
      <div className="max-w-7xl mx-auto">
        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/5">
          {/* Logo & Philosophy */}
          <div>
            <div className="flex items-center gap-2 text-2xl font-black text-[#F5F5F5] font-display tracking-tight mb-2">
              <span>DHANUSH</span>
              <span className="w-2 h-2 rounded-full bg-[#B58CFF]" />
            </div>
            <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#B58CFF]">
              EDITED WITH PURPOSE. CREATED WITH PASSION.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-mono">
            <a href="#home" className="hover:text-[#F5F5F5] transition-colors">Home</a>
            <a href="#showreel" className="hover:text-[#F5F5F5] transition-colors">Showreel</a>
            <a href="#about" className="hover:text-[#F5F5F5] transition-colors">About</a>
            <a href="#services" className="hover:text-[#F5F5F5] transition-colors">Services</a>
            <a href="#work" className="hover:text-[#F5F5F5] transition-colors">Work</a>
            <a href="#contact" className="hover:text-[#F5F5F5] transition-colors">Contact</a>
          </div>

          {/* Social Profiles & Back to top button */}
          <div className="flex items-center gap-3">
            {/* Social Icons */}
            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/abbai_animutyam?cplk=dHpwZndmaXZ2M2E2"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/[0.04] hover:bg-[#B58CFF] hover:text-[#08090B] border border-white/10 text-[#A5A5A5] transition-all duration-300 cursor-pointer"
                title="Instagram Profile"
                aria-label="Instagram profile"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/dhanush-paruchuri-a9359037b?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/[0.04] hover:bg-[#B58CFF] hover:text-[#08090B] border border-white/10 text-[#A5A5A5] transition-all duration-300 cursor-pointer"
                title="LinkedIn Profile"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <div
                className="p-2.5 rounded-full bg-white/[0.04] border border-white/10 text-[#A5A5A5] hover:text-[#B58CFF] hover:border-[#B58CFF]/40 transition-all duration-300 flex items-center justify-center cursor-default"
                title="Fiverr"
                aria-label="Fiverr"
              >
                <FiverrIcon className="w-4 h-4" />
              </div>

              <a
                href="mailto:dhanushparuchuri7@gmail.com"
                className="p-2.5 rounded-full bg-white/[0.04] hover:bg-[#B58CFF] hover:text-[#08090B] border border-white/10 text-[#A5A5A5] transition-all duration-300 cursor-pointer"
                title="Send Email to dhanushparuchuri7@gmail.com"
                aria-label="Send email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-[#B58CFF] hover:text-[#08090B] border border-white/10 text-xs font-mono transition-all duration-300 cursor-pointer"
              aria-label="Back to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom Footer Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-4">
            <span>DHANUSH © 2026. ALL RIGHTS RESERVED.</span>
          </div>

          {/* Live IST clock */}
          <div className="flex items-center gap-2 text-[#71717A]">
            <Film className="w-3.5 h-3.5 text-[#B58CFF]" />
            <span>LOCAL TIME (IST):</span>
            <span className="text-[#F5F5F5] font-semibold">{istTime || '22:15:00'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
