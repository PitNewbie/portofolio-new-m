import React from 'react';
import { ArrowDown, MessageSquare } from 'lucide-react';
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
    <section id="companion" className="relative pt-6 sm:pt-12 pb-16 sm:pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-sky-500/[0.06] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-40 right-10 w-80 h-80 bg-indigo-500/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
        {/* Left Column (Desktop) / Intro Flow (Mobile) */}
        <div className="w-full lg:col-span-5 space-y-4 sm:space-y-6 order-1">
          {/* Mobile-friendly unboxed kicker badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-sky-400/20 bg-sky-500/10 text-[11px] sm:text-xs text-sky-300 font-semibold tracking-wide">
            <span>StarPit Portfolio</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>Creative Tech & AI</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Merancang Web Modern, Realistis, & Cerdas.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Selamat datang di dunia kreatif <strong className="text-white font-medium">StarPit</strong>. Menggabungkan arsitektur software berkecepatan tinggi, estetika minimalis mewah, dan kapabilitas interaktif 3D WebGL bersama agen AI mutakhir.
          </p>

          {/* Quick Metrics (Desktop/Tablet view) */}
          <div className="hidden sm:flex items-center gap-4 text-xs text-slate-400 pt-1 pb-1">
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

          {/* Action Buttons (Desktop view) */}
          <div className="hidden lg:flex flex-wrap items-center gap-3 pt-2">
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
              <span>Ajak Bicara StarBot 3D</span>
            </button>
          </div>

          {/* Reactive Speech Bubble Panel (Desktop view) */}
          {dialogMessage && (
            <div className="hidden lg:block pt-3">
              <RobotDialogBubble
                currentMessage={dialogMessage}
                onNextMessage={onNextDialog}
                onSelectTopic={onSelectTopic}
                onDismiss={onDismissDialog}
              />
            </div>
          )}
        </div>

        {/* 3D Robot Companion: Order 2 on Mobile (directly visible after title/intro!) */}
        <div className="w-full lg:col-span-7 order-2 space-y-4">
          <Robot3DCanvas
            currentEmotion={currentEmotion}
            onEmotionChange={onEmotionChange}
            onRobotClick={onRobotClick}
          />

          {/* Reactive Speech Bubble Panel (Mobile view: sits directly below the robot) */}
          {dialogMessage && (
            <div className="block lg:hidden">
              <RobotDialogBubble
                currentMessage={dialogMessage}
                onNextMessage={onNextDialog}
                onSelectTopic={onSelectTopic}
                onDismiss={onDismissDialog}
              />
            </div>
          )}

          {/* Action Buttons & Metrics on Mobile */}
          <div className="block lg:hidden space-y-3 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href="#projects"
                className="px-5 py-3 rounded-xl bg-white text-slate-950 font-semibold text-xs hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 shadow-md text-center"
              >
                <span>Lihat Website Buatanku</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onRobotClick}
                className="px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-200 hover:text-white font-medium text-xs transition-colors flex items-center justify-center gap-2 text-center"
              >
                <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
                <span>Ajak Bicara StarBot</span>
              </button>
            </div>

            {/* Mobile compact metrics strip */}
            <div className="flex sm:hidden items-center justify-around p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-400">
              <div className="text-center">
                <span className="font-mono text-sm font-bold text-white block">20+</span>
                <span className="text-[10px]">Proyek Web</span>
              </div>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <div className="text-center">
                <span className="font-mono text-sm font-bold text-white block">4</span>
                <span className="text-[10px]">Platform AI</span>
              </div>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <div className="text-center">
                <span className="font-mono text-sm font-bold text-white block">60 FPS</span>
                <span className="text-[10px]">WebGL 3D</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
            
