import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Github, Linkedin, Twitter, MessageCircle, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSent, setFormSent] = useState(false);

  const email = 'pitnewbie12@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSent(true);
  };

  return (
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/[0.08]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: About StarPit (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2 text-xs text-sky-400 font-semibold tracking-wide uppercase">
            <span>Kolaborasi & Karir</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Get In Touch</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Mari Wujudkan Proyek Web Luar Biasa Bersama.
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            StarPit terbuka untuk proyek konsultasi rekayasa perangkat lunak, pengembangan frontend interaktif WebGL/3D, implementasi pipeline AI agentic, serta peran kepemimpinan teknik full-stack.
          </p>

          {/* Email Direct Card */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="truncate">
                <div className="text-[11px] text-slate-400">Email Langsung</div>
                <div className="text-sm font-mono text-white truncate">{email}</div>
              </div>
            </div>

            <button
              onClick={handleCopyEmail}
              className="p-2.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/[0.08] transition-colors shrink-0"
              title="Salin alamat email"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Social Proof Links */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors"
              title="Twitter / X"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right Column: Direct Inquiry Form (7 columns) */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-2xl bg-[#0d101a]/80 border border-white/[0.08] backdrop-blur-md shadow-2xl">
            {formSent ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Pesan Anda Berhasil Terkirim!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto font-light">
                  Terima kasih telah menghubungi StarPit. Kami akan merespons pesan Anda ke email yang Anda cantumkan dalam kurun waktu 1x24 jam.
                </p>
                <button
                  onClick={() => {
                    setFormSent(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="mt-4 px-4 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold text-white transition-colors"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-2">
                  Kirim Pesan Langsung
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Tan"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/[0.09] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400/60 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Alamat Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/[0.09] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400/60 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Detail Pesan / Rencana Proyek
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Ceritakan tentang kebutuhan website, aplikasi 3D, atau kolaborasi AI Anda..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/[0.09] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400/60 transition-colors resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-400">
                    Respon cepat dalam &lt; 24 jam
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs flex items-center gap-2 transition-all shadow-lg shadow-sky-500/20 active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirimkan Pesan</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div>
          <span>© {new Date().getFullYear()} StarPit. Seluruh hak cipta dilindungi.</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#companion" className="hover:text-white transition-colors">
            Kembali ke Atas ↑
          </a>
        </div>
      </footer>
    </section>
  );
};
    
