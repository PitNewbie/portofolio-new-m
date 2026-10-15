import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Sparkles, ChevronRight, X, Bot } from 'lucide-react';
import { DialogMessage, RobotEmotion } from '../types';

interface RobotDialogBubbleProps {
  currentMessage: DialogMessage | null;
  onNextMessage: () => void;
  onSelectTopic: (topicKey: string) => void;
  onDismiss: () => void;
}

export const RobotDialogBubble: React.FC<RobotDialogBubbleProps> = ({
  currentMessage,
  onNextMessage,
  onSelectTopic,
  onDismiss,
}) => {
  if (!currentMessage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md p-4 rounded-2xl bg-[#0f1322]/95 border border-sky-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl relative select-none"
      >
        {/* Glow accent */}
        <div className="absolute -top-1 -right-1 w-20 h-20 bg-sky-500/10 rounded-full blur-xl pointer-events-none" />

        {/* Header row */}
        <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-white/[0.08] text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-semibold text-slate-100">StarBot AI Companion</span>
              <span className="text-slate-500 mx-1.5">·</span>
              <span className="text-sky-400 capitalize">{currentMessage.emotion}</span>
            </div>
          </div>
          <button
            onClick={onDismiss}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            title="Tutup dialog"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Message body */}
        <div className="py-3">
          <p className="text-sm text-slate-200 leading-relaxed font-normal">
            &ldquo;{currentMessage.text}&rdquo;
          </p>
        </div>

        {/* Quick topic buttons & Next action */}
        <div className="pt-2 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => onSelectTopic('projects')}
              className="px-2 py-1 rounded-md text-[11px] font-medium bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] transition-colors"
            >
              Tentang Proyek
            </button>
            <button
              onClick={() => onSelectTopic('ai')}
              className="px-2 py-1 rounded-md text-[11px] font-medium bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] transition-colors"
            >
              Kontribusi AI
            </button>
            <button
              onClick={() => onSelectTopic('about')}
              className="px-2 py-1 rounded-md text-[11px] font-medium bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] transition-colors"
            >
              Siapa StarPit?
            </button>
          </div>

          <button
            onClick={onNextMessage}
            className="px-2.5 py-1 rounded-md text-xs font-semibold bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/30 flex items-center gap-1 transition-all ml-auto"
          >
            <span>Lanjut</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
