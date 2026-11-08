import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, Volume2, VolumeX, Clock, Monitor, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Project } from '../types/portfolio';
import { soundManager } from '../utils/audio';
import { parseVideoUrl } from '../utils/video';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject?: (project: Project) => void;
  allProjects?: Project[];
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onSelectProject,
  allProjects = []
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [audioBlocked, setAudioBlocked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Attempt playback when modal opens, handling autoplay audio policy
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !project?.videoUrl) return;

    try {
      video.load();
    } catch {
      // ignore
    }
    video.muted = isMuted;
    video.play().then(() => {
      setIsPlaying(true);
    }).catch((err) => {
      console.warn("Autoplay blocked, attempting muted fallback:", err);
      video.muted = true;
      setIsMuted(true);
      setAudioBlocked(true);
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    });
  }, [project?.id, project?.videoUrl]);

  if (!project) return null;

  const togglePlay = async () => {
    soundManager.playClick();
    const video = videoRef.current;
    if (!video) return;

    if (!video.paused && isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      try {
        await video.play();
        setIsPlaying(true);
        setAudioBlocked(false);
      } catch {
        video.muted = true;
        setIsMuted(true);
        setAudioBlocked(true);
        try {
          await video.play();
          setIsPlaying(true);
        } catch {
          setIsPlaying(false);
        }
      }
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundManager.playClick();
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) {
      setAudioBlocked(false);
    }
  };

  // Find next project
  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const nextProject = currentIndex >= 0 && currentIndex < allProjects.length - 1
    ? allProjects[currentIndex + 1]
    : allProjects[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl rounded-3xl bg-[#0E1015] border border-white/20 shadow-2xl overflow-hidden my-auto"
        >
          {/* Close button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="absolute top-5 right-5 z-30 p-2.5 rounded-full bg-black/70 hover:bg-black/90 text-white/80 hover:text-white border border-white/10 transition-colors cursor-pointer"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Video Player Header */}
          <div
            onClick={togglePlay}
            className="relative aspect-video w-full bg-black overflow-hidden group cursor-pointer"
          >
            {(() => {
              const videoSource = parseVideoUrl(project.videoUrl || '');
              if (videoSource.type === 'youtube' || videoSource.type === 'vimeo') {
                return (
                  <iframe
                    src={videoSource.embedUrl}
                    title={project.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                );
              }

              return (
                <>
                  <video
                    ref={videoRef}
                    src={project.videoUrl}
                    poster={project.thumbnailUrl}
                    playsInline
                    preload="auto"
                    muted={isMuted}
                    loop
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    className="w-full h-full object-contain"
                  />

                  {/* Play Button Overlay when paused */}
                  <AnimatePresence>
                    {!isPlaying && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-[#B58CFF] text-[#08090B] flex items-center justify-center shadow-[0_0_40px_rgba(181,140,255,0.7)] group-hover:scale-110 active:scale-95 transition-all duration-300 z-20 pointer-events-none"
                      >
                        <Play className="w-8 h-8 fill-current translate-x-0.5 text-[#08090B]" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Quick Unmute pill when playing muted */}
                  {isMuted && isPlaying && (
                    <button
                      onClick={toggleMute}
                      className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white text-xs font-mono flex items-center gap-2 cursor-pointer shadow-lg transition-transform hover:scale-105"
                      aria-label="Click to unmute"
                    >
                      <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                      <span>Click to Unmute Audio</span>
                    </button>
                  )}

                  {/* Video Controls Overlay */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={togglePlay}
                        className="p-2 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition-colors cursor-pointer"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current translate-x-0.5" />}
                      </button>
                      <button
                        onClick={toggleMute}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/30 text-white transition-colors cursor-pointer flex items-center gap-1.5"
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                        title={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                        {isMuted && <span className="text-[10px] font-mono text-rose-300">MUTED</span>}
                      </button>
                      <span className="text-xs font-mono text-white/80">
                        {project.duration} · {project.aspectRatio}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                        PRORES 422 HQ
                      </span>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>

          {/* Modal Content Body */}
          <div className="p-6 sm:p-10 max-h-[50vh] overflow-y-auto">
            {/* Meta tags bar */}
            <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-mono">
              <span className="px-3 py-1 rounded-full bg-[#B58CFF]/15 text-[#B58CFF] border border-[#B58CFF]/30 font-semibold">
                {project.category}
              </span>
              <span className="flex items-center gap-1.5 text-[#A5A5A5]">
                <Clock className="w-3.5 h-3.5" />
                {project.duration}
              </span>
              <span className="flex items-center gap-1.5 text-[#A5A5A5]">
                <Monitor className="w-3.5 h-3.5" />
                {project.aspectRatio}
              </span>
              <span className="text-[#A5A5A5]">
                Client / Spec: <strong className="text-[#F5F5F5]">{project.client}</strong>
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-4xl font-black font-heading text-[#F5F5F5] mb-4">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-base text-[#D1D5DB] font-body leading-relaxed mb-8">
              {project.fullDescription}
            </p>

            {/* Two Columns: Editing Process & Software Stack */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/10 mb-8">
              {/* Left: Editing Process */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#A5A5A5] mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#B58CFF]" />
                  <span>How I Edited This</span>
                </h4>
                <ul className="space-y-3">
                  {project.editingProcess.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#A5A5A5]">
                      <CheckCircle2 className="w-4 h-4 text-[#B58CFF] shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Software Used & Color Grading Notes */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#A5A5A5] mb-4">
                  Software & Tools
                </h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.software.map((sw, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-[#F5F5F5]"
                    >
                      {sw}
                    </span>
                  ))}
                </div>

                {project.colorGradeTags && project.colorGradeTags.length > 0 && (
                  <div>
                    <h5 className="text-[11px] font-mono uppercase tracking-wider text-[#A5A5A5] mb-2">
                      Color Grade Notes:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {project.colorGradeTags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded bg-[#B58CFF]/10 text-[#B58CFF] text-[11px] font-mono border border-[#B58CFF]/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Modal Actions */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-mono text-[#A5A5A5]">
                Need something similar for your project? Let's talk.
              </span>

              {nextProject && onSelectProject && (
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onSelectProject(nextProject);
                  }}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#B58CFF] hover:text-white transition-colors"
                >
                  <span>Next: {nextProject.title.split('|')[0]}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
