import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'link' | 'video' | 'drag'>('default');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop/mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest('button, a, input, textarea, select, [role="button"]');
      const videoCard = target.closest('[data-cursor="play"]');
      const dragArea = target.closest('[data-cursor="drag"]');

      if (videoCard) {
        setCursorType('video');
      } else if (dragArea) {
        setCursorType('drag');
      } else if (clickable) {
        setCursorType('link');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Outer Follower Ring */}
      <motion.div
        className="absolute top-0 left-0 rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 border transition-colors duration-200"
        style={{
          x: smoothX,
          y: smoothY,
          width: cursorType === 'video' ? 72 : cursorType === 'drag' ? 64 : cursorType === 'link' ? 48 : 28,
          height: cursorType === 'video' ? 72 : cursorType === 'drag' ? 64 : cursorType === 'link' ? 48 : 28,
          backgroundColor:
            cursorType === 'video'
              ? 'rgba(181, 140, 255, 0.9)'
              : cursorType === 'drag'
              ? 'rgba(255, 255, 255, 0.85)'
              : cursorType === 'link'
              ? 'rgba(181, 140, 255, 0.15)'
              : 'rgba(255, 255, 255, 0.04)',
          borderColor:
            cursorType === 'video'
              ? '#B58CFF'
              : cursorType === 'link'
              ? 'rgba(181, 140, 255, 0.6)'
              : 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(2px)'
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {cursorType === 'video' && (
          <span className="text-[11px] font-bold tracking-widest text-[#08090B] uppercase font-mono">
            PLAY
          </span>
        )}
        {cursorType === 'drag' && (
          <span className="text-[10px] font-bold tracking-wider text-[#08090B] font-mono">
            ↔ SLIDE
          </span>
        )}
      </motion.div>

      {/* Tiny Core Dot */}
      {cursorType === 'default' && (
        <motion.div
          className="absolute top-0 left-0 w-1.5 h-1.5 bg-[#B58CFF] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#B58CFF]"
          style={{ x: mouseX, y: mouseY }}
        />
      )}
    </div>
  );
};
