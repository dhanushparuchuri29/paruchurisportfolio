import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  isScrolled: boolean;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'HOME', href: '#home' },
  { id: 'showreel', label: 'SHOWREEL', href: '#showreel' },
  { id: 'about', label: 'ABOUT', href: '#about' },
  { id: 'services', label: 'SERVICES', href: '#services' },
  { id: 'work', label: 'WORK', href: '#work' },
  { id: 'contact', label: 'CONTACT', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  // Active section scroll spy
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.id);
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Smooth scroll accounting for fixed navbar height
  const handleNavClick = (href: string, id: string) => {
    soundManager.playClick();
    setActiveSection(id);
    setMobileMenuOpen(false);

    const targetElement = document.querySelector(href);
    if (targetElement) {
      const navbarHeight = isScrolled ? 70 : 84;
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Desktop & Mobile Floating Header Container */}
      <header className="fixed top-4 sm:top-5 left-0 right-0 z-40 flex justify-center pointer-events-none px-4 sm:px-10">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto w-[calc(100%-16px)] sm:w-[calc(100%-80px)] max-w-[1200px] rounded-[100px] flex items-center justify-between transition-all duration-300 ease-out border shadow-[0_20px_45px_-12px_rgba(0,0,0,0.65)] ${
            isScrolled
              ? 'h-[62px] px-6 sm:px-8 bg-[#0E0E10]/90 backdrop-blur-[28px] border-white/[0.16] shadow-black/80'
              : 'h-[74px] sm:h-[76px] px-6 sm:px-10 bg-[#121214]/80 backdrop-blur-[24px] border-white/[0.13]'
          }`}
          style={{
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          {/* LEFT SIDE — PERSONAL BRAND */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home', 'home');
            }}
            className="group flex items-center select-none focus:outline-none"
            aria-label="Dhanush Portfolio - Back to top"
          >
            <span className="font-heading font-[800] text-base sm:text-lg tracking-[0.16em] uppercase text-white transition-opacity duration-200 group-hover:opacity-90">
              DHANUSH
            </span>
            <span className="text-[#B58CFF] font-heading font-[800] text-base sm:text-lg transition-transform duration-300 group-hover:scale-125">
              .
            </span>
          </a>

          {/* CENTER — DESKTOP NAVIGATION LINKS */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2 relative"
            aria-label="Main Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              const isHovered = hoveredSection === item.id;

              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href, item.id);
                  }}
                  onMouseEnter={() => setHoveredSection(item.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                  className={`relative px-4 py-2 text-[13px] tracking-[0.09em] font-[500] uppercase transition-colors duration-250 flex items-center justify-center ${
                    isActive ? 'text-white font-[600]' : 'text-[#C5C5C5] hover:text-white'
                  }`}
                >
                  {/* Subtle active background glow pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBackground"
                      className="absolute inset-0 rounded-full bg-white/[0.06] -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  <span>{item.label}</span>

                  {/* Refined Animated Bottom Indicator Underline */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavUnderline"
                      className="absolute -bottom-1 left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-[#B58CFF] to-transparent rounded-full shadow-[0_0_8px_rgba(181,140,255,0.7)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}

                  {/* Hover indicator (if not already active) */}
                  {!isActive && isHovered && (
                    <motion.span
                      layoutId="hoverNavPill"
                      className="absolute inset-0 rounded-full bg-white/[0.03] -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* RIGHT SIDE — AVAILABILITY INDICATOR (DESKTOP) */}
          <div className="hidden lg:flex items-center">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact', 'contact');
              }}
              className="group flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.16] transition-all duration-250 cursor-pointer"
              title="Click to discuss a project"
            >
              {/* Subtle green pulse status indicator */}
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 duration-1000" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              </span>

              <span className="text-[11px] font-[500] tracking-[0.14em] uppercase text-[#D4D4D8] group-hover:text-white transition-colors duration-250 whitespace-nowrap">
                AVAILABLE FOR PROJECTS
              </span>
            </a>
          </div>

          {/* MOBILE MENU TOGGLE BUTTON */}
          <button
            onClick={() => {
              soundManager.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="flex lg:hidden items-center justify-center w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white/[0.1] transition-all focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-white" /> : <Menu className="w-4 h-4 text-white" />}
          </button>
        </motion.div>
      </header>

      {/* FULL-SCREEN DARK MOBILE NAVIGATION OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 lg:hidden flex flex-col justify-between p-6 sm:p-8 bg-[#0A0A0C]/96 backdrop-blur-[28px] overflow-hidden"
          >
            {/* Top Bar inside Overlay */}
            <div className="flex items-center justify-between pt-2">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#home', 'home');
                }}
                className="font-heading font-[800] text-lg tracking-[0.16em] uppercase text-white"
              >
                DHANUSH<span className="text-[#B58CFF]">.</span>
              </a>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setMobileMenuOpen(false);
                }}
                className="w-11 h-11 rounded-full bg-white/[0.08] border border-white/[0.15] text-white flex items-center justify-center hover:bg-white/[0.15] transition-all"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Navigation Links with Staggered Entrance */}
            <nav className="flex flex-col gap-5 my-auto py-8">
              {NAV_ITEMS.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.08 + index * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href, item.id);
                      }}
                      className={`group flex items-center justify-between py-2 text-2xl sm:text-3xl font-heading font-[700] tracking-[0.06em] uppercase transition-colors ${
                        isActive ? 'text-white' : 'text-[#8E8E93] hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-[#B58CFF] shadow-[0_0_8px_#B58CFF]" />
                        )}
                        <span>{item.label}</span>
                      </span>

                      <span className="text-xs font-mono text-white/30 group-hover:text-[#B58CFF] transition-colors">
                        0{index + 1}
                      </span>
                    </a>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom Status & Quick Action */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="pt-6 border-t border-white/[0.1] flex flex-col gap-4"
            >
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-xs font-[500] tracking-[0.14em] uppercase text-[#D4D4D8]">
                  AVAILABLE FOR PROJECTS
                </span>
              </div>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contact', 'contact');
                }}
                className="w-full py-4 rounded-full bg-white text-[#0A0A0C] font-heading font-[700] text-sm tracking-wider uppercase text-center shadow-lg hover:bg-[#F0F0F2] transition-colors"
              >
                Let's Work Together
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
