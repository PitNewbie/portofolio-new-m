import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu, BarChart3, Globe, Sparkles } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectDetailDrawerProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetailDrawer: React.FC<ProjectDetailDrawerProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  // ESC key listener to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Slide-over Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-2xl bg-[#0c0f18] border-l border-white/[0.1] text-slate-100 shadow-2xl flex flex-col h-full overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="px-6 py-5 border-b border-white/[0.08] flex items-center justify-between gap-4 bg-[#090b12]/90 sticky top-0 z-10 backdrop-blur-md">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-sky-400 font-semibold">{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.year}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.client}</span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                  title="Tutup (ESC)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Drawer Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
                {/* Title & Tagline */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                    {project.title}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                    {project.tagline}
                  </p>
                </div>

                {/* Simulated UI Viewport Showcase */}
                <div className="rounded-xl border border-white/[0.1] overflow-hidden bg-black/60 shadow-xl">
                  {/* Browser Bar */}
                  <div className="px-4 py-2.5 bg-[#141824] border-b border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="px-3 py-0.5 rounded-md bg-black/40 border border-white/5 font-mono text-[11px] text-slate-400 truncate max-w-xs">
                      {project.demoUrl || `https://${project.id}.starpit.dev`}
                    </div>
                    <div className="text-[11px] font-mono text-emerald-400">ONLINE</div>
                  </div>

                  {/* Mockup Canvas Screen */}
                  <div className={`p-6 min-h-[220px] bg-gradient-to-br ${project.mockupTheme.gradient} flex flex-col justify-between relative`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: project.mockupTheme.accent }}
                        />
                        <span className="text-xs font-semibold uppercase tracking-wider text-white">
                          {project.title} Architecture
                        </span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">v2.6 Stable</span>
                    </div>

                    <div className="my-6 p-4 rounded-lg bg-black/50 border border-white/10 backdrop-blur-md">
                      <div className="text-xs text-slate-400 mb-1">Peran Pengembang</div>
                      <div className="text-sm font-semibold text-slate-100">{project.role}</div>
                      <div className="text-xs text-slate-300 mt-2 font-light">{project.summary}</div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.08] border border-white/10 text-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4 text-sky-400" />
                    <span>Dampak & Metrik Kinerja</span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {project.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex flex-col justify-between"
                      >
                        <span className="text-[11px] text-slate-400">{metric.label}</span>
                        <span className="text-lg font-bold font-mono text-white mt-1">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Full Description & Context */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-sky-400" />
                    <span>Studi Kasus & Ringkasan Teknis</span>
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>

                {/* Key Features */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Fitur Utama yang Dibangun</span>
                  </h3>
                  <div className="space-y-2.5">
                    {project.keyFeatures.map((feat, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-start gap-2.5 text-xs sm:text-sm text-slate-200"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                        <span className="font-light">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Architectural Highlights */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-purple-400" />
                    <span>Keputusan Rekayasa & Arsitektur</span>
                  </h3>
                  <div className="space-y-2">
                    {project.architecturalHighlights.map((arch, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] text-xs text-slate-300 font-light"
                      >
                        {arch}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Sticky Footer with Actions */}
              <div className="p-4 border-t border-white/[0.08] bg-[#090b12] flex items-center justify-between gap-3">
                <a
                  href={project.githubUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-lg border border-white/10 hover:border-white/20 bg-white/[0.04] text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-2 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>Lihat Repository</span>
                </a>

                <a
                  href={project.demoUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-sky-500/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Kunjungi Website Demo</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
