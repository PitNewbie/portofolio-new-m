import React from 'react';
import { Cpu, Sparkles, CheckCircle2, Layers, Zap, Terminal, Globe2, ArrowUpRight } from 'lucide-react';
import { AIContributionItem } from '../types';

interface AIContributionsSectionProps {
  contributions: AIContributionItem[];
}

export const AIContributionsSection: React.FC<AIContributionsSectionProps> = ({
  contributions,
}) => {
  return (
    <section id="contributions" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/[0.08]">
      {/* Section Header */}
      <div className="mb-14 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-400/20 bg-sky-500/10 text-xs font-semibold text-sky-300 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Eksplorasi & Kontribusi AI</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
          Kontribusi Ekosistem Artificial Intelligence
        </h2>
        <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
          Dedikasi mendalam StarPit dalam meneliti, merancang arsitektur prompt, mengoptimalkan context caching, dan membangun integrasi model cerdas terkemuka dunia.
        </p>
      </div>

      {/* 4 Dedicated Cards Grid (2x2 Layout on Desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contributions.map((item) => (
          <div
            key={item.id}
            className="p-7 rounded-2xl bg-[#0e121e]/70 border border-white/[0.08] hover:border-white/[0.18] transition-all duration-300 backdrop-blur-md flex flex-col justify-between group shadow-xl"
          >
            <div>
              {/* Header: Platform & Badge */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.accentColor }}
                    />
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {item.platform}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {item.logoBadge}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-semibold text-sky-400 uppercase tracking-wider block">
                    {item.role}
                  </span>
                  <span className="text-[11px] text-slate-400 font-light block">
                    {item.focusArea}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed font-light mb-6">
                {item.description}
              </p>

              {/* Key Contributions Checklist */}
              <div className="space-y-2 mb-6">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Kontribusi Utama:
                </span>
                {item.keyContributions.map((contrib, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                    <span className="font-light leading-snug">{contrib}</span>
                  </div>
                ))}
              </div>

              {/* Benchmarks Strip */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] mb-6">
                <div className="grid grid-cols-2 gap-2 text-center">
                  {item.benchmarks.map((bench, bIdx) => (
                    <div key={bIdx} className="p-2 rounded bg-white/[0.02]">
                      <div className="text-[10px] text-slate-400">{bench.label}</div>
                      <div className="text-xs font-bold font-mono text-white mt-0.5">
                        {bench.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Footer: Tools & SDKs + Impact Summary */}
            <div className="pt-4 border-t border-white/[0.06] space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {item.toolsAndSDKs.map((tool) => (
                  <span
                    key={tool}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 border border-white/[0.06]"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <div className="text-xs text-slate-400 font-light italic">
                &ldquo;{item.impactSummary}&rdquo;
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
