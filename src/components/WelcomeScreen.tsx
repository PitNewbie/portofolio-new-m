import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Compass, ShieldCheck } from 'lucide-react';

interface WelcomeScreenProps {
  onEnter: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter }) => {
  const [countdown, setCountdown] = useState(4);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleEnter();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 600);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#06070B] text-white px-6 overflow-hidden select-none"
        >
          {/* Subtle ambient lighting gradients */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/[0.07] rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-indigo-500/[0.05] rounded-full blur-[120px] pointer-events-none" />

          {/* Background subtle geometric lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-40" />

          {/* Content container */}
          <div className="relative max-w-xl w-full text-center flex flex-col items-center">
            {/* Minimalist Top Kicker */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-8 text-xs text-slate-300"
            >
              <Compass className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-medium tracking-wide">Selamat Datang di Portofolio Resmi</span>
            </motion.div>

            {/* Giant Monolithic Brand Wordmark */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-7xl font-extrabold tracking-tight bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent mb-4"
            >
              STARPIT
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-base sm:text-lg text-slate-300 font-light max-w-lg mb-8 leading-relaxed"
            >
              Architecting High-Performance Web Applications, Spatial 3D Experiences, & Advanced AI Ecosystems.
            </motion.p>

            {/* Feature highlights unboxed metadata */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center justify-center gap-3 text-xs text-slate-400 mb-10"
            >
              <span>3D Companion</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Website Showcase</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>AI Contributions</span>
            </motion.div>

            {/* Enter Button & Auto countdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="flex flex-col items-center gap-3 w-full sm:w-auto"
            >
              <button
                onClick={handleEnter}
                className="group relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-sky-400 text-slate-950 font-semibold text-sm hover:from-sky-400 hover:to-sky-300 transition-all duration-200 flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(56,189,248,0.3)] hover:shadow-[0_0_40px_rgba(56,189,248,0.5)] active:scale-[0.98] w-full sm:w-auto"
              >
                <span>Masuk ke Portofolio</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <span className="text-[11px] text-slate-400">
                Otomatis masuk dalam <span className="font-mono text-sky-400">{countdown}s</span> atau klik tombol di atas
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
