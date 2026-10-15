import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ExternalLink, Layers, Sparkles, Code2, Monitor, ArrowRight, Eye } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectsSplitViewProps {
  projects: ProjectItem[];
  onOpenDrawer: (project: ProjectItem) => void;
}

export const ProjectsSplitView: React.FC<ProjectsSplitViewProps> = ({
  projects,
  onOpenDrawer,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProjectId, setActiveProjectId] = useState<string>(projects[0]?.id || '');

  const categories = ['All', 'Full-Stack', 'AI & LLM', 'E-Commerce', 'WebGL 3D'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const activeProject = projects.find((p) => p.id === activeProjectId) || filteredProjects[0] || projects[0];

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs text-sky-400 font-semibold tracking-wider uppercase mb-2">
          <span>Karya Unggulan</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Web Applications</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
              Website Buatanku
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl leading-relaxed">
              Kompilasi website produksi dan prototipe arsitektural yang dirancang dengan presisi, kinerja tinggi, serta visual modern berstandar internasional.
            </p>
          </div>

          {/* Interactive Category Filter Controls (Functional button tabs) */}
          <div className="flex items-center gap-1 p-1 bg-white/[0.04] rounded-xl border border-white/[0.08] backdrop-blur-md overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  const firstInCat = cat === 'All' ? projects[0] : projects.find((p) => p.category === cat);
                  if (firstInCat) setActiveProjectId(firstInCat.id);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-white text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Split-Screen Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Project Cards List (5 columns on desktop) */}
        <div className="lg:col-span-5 space-y-3.5">
          {filteredProjects.map((project) => {
            const isSelected = project.id === activeProject.id;
            return (
              <div
                key={project.id}
                onClick={() => setActiveProjectId(project.id)}
                className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer text-left ${
                  isSelected
                    ? 'bg-[#121626]/90 border-sky-400/50 shadow-[0_8px_30px_rgba(56,189,248,0.15)] ring-1 ring-sky-400/20'
                    : 'bg-[#0d101b]/60 border-white/[0.07] hover:border-white/[0.18] hover:bg-[#121624]/70'
                }`}
              >
                {/* Clean unboxed metadata with typographic separators */}
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                  <span className={isSelected ? 'text-sky-300 font-medium' : 'text-slate-400'}>
                    {project.category}
                  </span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{project.year}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{project.client}</span>
                </div>

                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                    {project.title}
                  </h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDrawer(project);
                    }}
                    className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                    title="Buka Drawer Detail"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-300 font-light line-clamp-2 leading-relaxed mb-4">
                  {project.summary}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 text-slate-500">
                      +{project.techStack.length - 3} lainnya
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Sticky Live Interactive Mockup Viewport (7 columns on desktop) */}
        <div className="lg:col-span-7 lg:sticky lg:top-24">
          <div className="rounded-2xl border border-white/[0.1] bg-[#0c0e18]/90 backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Window Browser Header Bar */}
            <div className="px-5 py-3.5 bg-[#121625] border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 font-mono text-xs text-slate-400 hidden sm:inline">
                  https://{activeProject.id}.preview.starpit.dev
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-emerald-400 font-mono text-[11px]">Active Preview</span>
              </div>
            </div>

            {/* Screen Content Viewport */}
            <div className={`p-8 min-h-[380px] bg-gradient-to-br ${activeProject.mockupTheme.gradient} flex flex-col justify-between relative`}>
              {/* Subtle top pill highlight */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: activeProject.mockupTheme.accent }}
                  />
                  <span className="text-xs font-semibold uppercase tracking-wider text-white">
                    {activeProject.title}
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400">{activeProject.category}</span>
              </div>

              {/* Center Highlight Banner */}
              <div className="my-8 p-6 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md">
                <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {activeProject.tagline}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6">
                  {activeProject.description}
                </p>

                {/* Performance Metrics strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/[0.08]">
                  {activeProject.metrics.map((m, i) => (
                    <div key={i}>
                      <div className="text-[10px] text-slate-400">{m.label}</div>
                      <div className="text-sm font-bold font-mono text-white mt-0.5">{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.08] text-slate-200 border border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onOpenDrawer(activeProject)}
                  className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs flex items-center gap-2 transition-all shadow-lg shadow-sky-500/20 active:scale-95"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Buka Detail Proyek (Drawer)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
