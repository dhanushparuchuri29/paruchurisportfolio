import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Play, ArrowUpRight, Clock, Monitor } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projects';
import { Project, ProjectCategory } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';
import { soundManager } from '../utils/audio';

const CATEGORIES: ProjectCategory[] = [
  'All Projects',
  'Cinematic Edits',
  'Wedding Films',
  'Reels & Shorts',
  'Motion Graphics',
  'Color Grading',
];

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All Projects');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  const filteredProjects = activeCategory === 'All Projects'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  const handleOpenProject = (project: Project) => {
    if (project.externalUrl) {
      soundManager.playClick();
      window.open(project.externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    soundManager.playShutter();
    setSelectedProject(project);
  };

  return (
    <section id="work" className="relative py-32 px-6 sm:px-8 lg:px-12 bg-[#08090B] border-t border-white/5 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#B58CFF]/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#B58CFF] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CURATED PORTFOLIO</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tighter uppercase text-[#F5F5F5]">
              SELECTED WORK.
            </h2>
          </div>
          <p className="text-base sm:text-lg text-[#A5A5A5] max-w-md font-body leading-relaxed">
            A collection of stories, experiments, and visual experiences crafted with narrative rigor.
          </p>
        </div>

        {/* Filter Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-14 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  soundManager.playClick();
                  setActiveCategory(cat);
                }}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-[#B58CFF] text-[#08090B] font-bold shadow-[0_0_20px_rgba(181,140,255,0.4)]'
                    : 'bg-white/[0.03] text-[#A5A5A5] hover:text-[#F5F5F5] hover:bg-white/[0.08] border border-white/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Asymmetrical Editorial Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              const isWide = project.gridSpan === 'wide' || index === 0;
              const isHovered = hoveredProjectId === project.id;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={`group relative rounded-3xl overflow-hidden bg-white/[0.02] border border-white/10 hover:border-[#B58CFF]/50 transition-all duration-500 cursor-pointer ${
                    isWide ? 'lg:col-span-8' : 'lg:col-span-4'
                  }`}
                  data-cursor={project.externalUrl ? 'link' : 'play'}
                  onClick={() => handleOpenProject(project)}
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                >
                  {/* Thumbnail / Video Container */}
                  <div className={`relative w-full overflow-hidden ${isWide ? 'aspect-[16/9] sm:aspect-[21/9]' : 'aspect-[4/3] sm:aspect-[16/10]'}`}>
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                    />

                    {/* Dark gradient overlay that animates on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-[#08090B]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                    {/* Category pill on top-left */}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#08090B]/80 backdrop-blur-md border border-white/10 text-[11px] font-mono font-medium text-[#F5F5F5]">
                        {project.category}
                      </span>
                      {project.isFeatured && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#B58CFF]/20 text-[#B58CFF] border border-[#B58CFF]/40 text-[10px] font-mono uppercase font-bold">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Aspect & Duration / External Link pill on top-right */}
                    <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-2 text-[11px] font-mono text-white/70 bg-[#08090B]/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                      {project.externalUrl ? (
                        <span className="flex items-center gap-1.5 text-rose-400 font-medium">
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                          <span>Watch Video</span>
                        </span>
                      ) : (
                        <>
                          <Clock className="w-3 h-3" />
                          <span>{project.duration}</span>
                          <span>·</span>
                          <Monitor className="w-3 h-3" />
                          <span>{project.aspectRatio}</span>
                        </>
                      )}
                    </div>

                    {/* Play Badge or External Link Overlay (Centered) */}
                    <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#B58CFF] text-[#08090B] flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-[0_0_30px_rgba(181,140,255,0.7)] z-20">
                      {project.externalUrl ? (
                        <ArrowUpRight className="w-8 h-8 text-[#08090B]" />
                      ) : (
                        <Play className="w-7 h-7 fill-current translate-x-0.5" />
                      )}
                    </div>
                  </div>

                  {/* Project Info Card Bottom */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      {/* Software Badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {project.software.map((sw, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono uppercase tracking-wider text-[#A5A5A5] bg-white/5 px-2 py-0.5 rounded"
                          >
                            {sw}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-black font-heading text-[#F5F5F5] group-hover:text-[#B58CFF] transition-colors duration-300 mb-2">
                        {project.title}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs sm:text-sm text-[#A5A5A5] font-body line-clamp-2 mb-4 leading-relaxed">
                        {project.shortDescription}
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#A5A5A5] group-hover:text-[#F5F5F5] transition-colors">
                      <span>{project.externalUrl ? 'Watch on YouTube' : 'View Breakdown & Video'}</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-[#B58CFF]" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Detail Modal (for projects with detailed breakdowns) */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(p) => setSelectedProject(p)}
        allProjects={PROJECTS_DATA.filter((p) => !p.externalUrl)}
      />
    </section>
  );
};
