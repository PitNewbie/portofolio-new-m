import React from 'react';
import { ArrowDown, Sparkles, MessageSquare, ExternalLink, Code, Layers } from 'lucide-react';
import { Robot3DCanvas } from './Robot3DCanvas';
import { RobotDialogBubble } from './RobotDialogBubble';
import { RobotEmotion, DialogMessage } from '../types';

interface HeroSectionProps {
  currentEmotion: RobotEmotion;
  onEmotionChange: (emotion: RobotEmotion) => void;
  onRobotClick: () => void;
  dialogMessage: DialogMessage | null;
  onNextDialog: () => void;
  onSelectTopic: (topic: string) => void;
  onDismissDialog: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentEmotion,
  onEmotionChange,
  onRobotClick,
  dialogMessage,
  onNextDialog,
  onSelectTopic,
  onDismissDialog,
}) => {
  return (
    <section id="companion" className="relative pt-12 pb-20 px-6 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-sky-500/[0.06] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-40 right-10 w-80 h-80 bg-indigo-500/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Executive Introduction (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Subtle kicker */}
          <div className="flex items-center gap-2 text-xs text-sky-400 font-semibold tracking-wide uppercase">
            <span>StarPit Portfolio</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Creative Tech & AI Architect</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
            Merancang Web Modern, Realistis, & Cerdas.
          </h1>

          <p className="text-base text-slate-300 font-light leading-relaxed">
            Selamat datang di dunia kreatif <strong className="text-white font-medium">StarPit</strong>. Menggabungkan arsitektur software berkecepatan tinggi, estetika minimalis mewah, dan kapabilitas interaktif 3D WebGL bersama agen AI mutakhir.
          </p>

          {/* Quick Metrics unboxed metadata */}
          <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 pb-1">
            <div>
              <span className="font-mono text-base font-bold text-white block">20+</span>
              <span>Proyek Web</span>
            </div>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <div>
              <span className="font-mono text-base font-bold text-white block">4</span>
              <span>Platform AI</span>
            </div>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <div>
              <span className="font-mono text-base font-bold text-white block">60 FPS</span>
              <span>WebGL 3D</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              className="px-6 py-3 rounded-xl bg-white text-slate-950 font-semibold text-xs hover:bg-slate-200 transition-colors flex items-center gap-2 shadow-lg shadow-white/5"
            >
              <span>Lihat Website Buatanku</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onRobotClick}
              className="px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-200 hover:text-white font-medium text-xs transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
              <span>Interaksi dengan StarBot 3D</span>
            </button>
          </div>

          {/* Reactive Speech Bubble Panel */}
          {dialogMessage && (
            <div className="pt-4">
              <RobotDialogBubble
                currentMessage={dialogMessage}
                onNextMessage={onNextDialog}
                onSelectTopic={onSelectTopic}
                onDismiss={onDismissDialog}
              />
            </div>
          )}
        </div>

        {/* Right Column: 3D Robot Interactive Canvas Viewport (7 columns) */}
        <div className="lg:col-span-7 w-full h-[540px] sm:h-[620px]">
          <Robot3DCanvas
            currentEmotion={currentEmotion}
            onEmotionChange={onEmotionChange}
            onRobotClick={onRobotClick}
          />
        </div>
      </div>
    </section>
  );
};
