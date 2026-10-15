# StarPit — Luxury Modern Minimalist Portfolio & Interactive 3D Companion

Website portofolio profesional kelas dunia untuk **StarPit**, dirancang dengan estetika *dark modern luxury glassmorphism*, dilengkapi Robot 3D interaktif 360° berkemampuan ekspresi wajah & dialog responsif, showcase proyek buatan bersistem *split-screen* dengan laci detail (*drawer*), serta katalog kontribusi mendalam untuk platform AI mutakhir (Gemini, ChatGPT, Claude AI, Google AI Studio) diawali dengan animasi *welcome entrance* yang elegan dan mulus.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> **Keputusan Terkonfirmasi dari Tanya Jawab Tahap 1:**
> - **Gaya Visual & Tema**: Minimalis modern mewah dengan efek *glassmorphism* gelap (*deep obsidian/charcoal canvas*, kartu kaca buram dengan garis batas halus *hairline*, tipografi berkelas).
> - **Interaksi Robot 3D**: Dapat diputar bebas 360° (orbit drag & inertia damping), ekspresi mata dinamis (*normal, happy, excited, curious, wink*), dan sistem dialog interaktif saat robot diklik/disentuh.
> - **Layout Portofolio Website & AI Contributions**: Format *split-screen* dengan live preview kartu di satu sisi dan *drawer detail proyek* yang komprehensif saat diklik.

---

## 1. Overview & Core Concept

- **What It Does**: Memamerkan identitas profesional, mahakarya website yang telah dibangun, serta keahlian kontribusi AI dari StarPit secara interaktif dan berkelas. Pengunjung dapat berinteraksi langsung dengan robot maskot 3D StarPit, meninjau preview situs, membaca studi kasus detail di drawer, dan menjelajahi kontribusi AI.
- **Target Audience**: Klien internasional, kolaborator teknologi, rekruiter korporat, dan komunitas developer & AI enthusiast.
- **Key Value**: Menggabungkan kredibilitas profesional tingkat tinggi (*luxury aesthetic*) dengan kapabilitas teknis interaktif WebGL 3D yang memukau tanpa terasa berantakan (*zero-slop*).

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Cinematic Welcome Entrance**:
   - Pengunjung disambut dengan layar introduksi eksklusif StarPit dengan tipografi terkoordinasi, partikel lembut, dan tombol interaktif *"Enter Portfolio"* (disertai opsi auto-skip atau klik).
   - Transisi *fade-through* yang sangat mulus langsung menuju layout utama portofolio.
2. **Hero Section & Interactive 3D Companion**:
   - *Split-screen layout*: Sisi kiri memuat pernyataan nilai StarPit, bio eksekutif, spesialisasi, dan aksi kontak langsung.
   - Sisi kanan menampilkan **Robot 3D StarPit** yang hidup: mengapung lembut, merespon putaran kursor mouse/touch 360°, bereaksi dengan animasi ekspresi mata (LED visor procedural), dan menampilkan *speech dialog cloud* interaktif ketika diajak interaksi atau tombol dialog ditekan.
   - Kontrol navigasi robot yang bersih di area bawah viewport 3D (putar otomatis, reset kamera, ganti mood ekspresi, trigger dialog).
3. **Showcase Website Buatan (Split-Screen & Project Drawer)**:
   - Panel kiri: Daftar kartu website yang telah dibuat dengan filter kategori (Full-Stack, AI Apps, E-Commerce, Creative Web).
   - Panel kanan: *Live Interactive Viewport* yang menampilkan mockup layar penuh, highlight teknologi, metrik performa, dan tombol *"Buka Detail Proyek"*.
   - Saat diklik: Membuka *Full-Screen Project Drawer / Modal* yang menampilkan arsitektur, tantangan, solusi teknis, galeri visual resolusi tinggi, dan tautan live demo simulasi.
4. **AI Contribution Showcase**:
   - Bagian khusus yang mendokumentasikan kontribusi spesifik pada ekosistem AI terdepan:
     - **Google Gemini**: Integrasi multimodal, context caching, prompt architectures, reasoning workflows.
     - **ChatGPT (OpenAI)**: Custom GPT actions, advanced system prompts, tool call orchestrations.
     - **Claude AI (Anthropic)**: Artifacts development, computer use workflows, constitutional AI prompt tuning.
     - **Google AI Studio**: Rapid prototyping, API key governance, system instructions crafting, structured JSON output design.
   - Dilengkapi deskripsi profesional, metrik kontribusi, dan contoh implementasi nyata.
5. **Contact & Collaboration Hub**:
   - Formulir kontak elegan, integrasi direct mail (`pitnewbie12@gmail.com`), tautan sosial profesional, dan footer bersih sesuai standar arsitektur modern.

### Visual Identity & Theme
- **Color Palette (60-30-10 Rule)**:
  - **60% Canvas**: Obsidian hitam mewah (`#07080C` hingga `#0C0E14`) dengan aksen grid halus.
  - **30% Structural**: Kaca frosted semi-transparan (`rgba(255, 255, 255, 0.03)` dengan border halus `rgba(255, 255, 255, 0.08)` dan backdrop blur terkontrol).
  - **10% Accent**: Platinum icy blue (`#38BDF8`) dan sleek subtle violet glow untuk fokus interaktif.
- **Typography**:
  - *Headings*: `Plus Jakarta Sans` / `Outfit` (bersih, geometris, modern).
  - *Body Prose*: `DM Sans` (sangat terbaca, elegan).
  - *Metrics & Code*: `JetBrains Mono` / tabular numerals.
- **Anti-Slop Discipline**:
  - Tidak ada pill capsule menumpuk di atas judul kartu.
  - Tidak ada badge mechanical pseudo-code (`// 01 STATUS: ONLINE`).
  - Tidak ada titik hijau berkedip dekoratif (`animate-pulse`).
  - Top Bar mengikuti kontrak 3-zona yang bersih dan patuh standar.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Procedural 3D Robot Architecture via Three.js**:
  - *Chosen Approach*: Membangun robot 3D menggunakan modul Three.js prosedural (*multi-part hierarchical mesh group*: kepala ber-visor lengkung, badan mekanis bertekstur PBR, bahu & tangan berartikulasi, mata LED ekspresif dinamis, cincin levitasi dan bayangan kontak/contact shadow) dengan procedural canvas textures.
  - *Why*: Menjamin zero-dependency pada file eksternal 3D yang rawan 404/broken model di sandbox, loading instan tanpa jeda, performa 60 FPS tinggi, dan fleksibilitas penuh untuk mengubah ekspresi wajah (happy, curious, focused, wink) secara instan via canvas texture update.
- **Decision 2: Split-Screen Layout with Slide-Over Drawer**:
  - *Chosen Approach*: Layout split interaktif dengan drawer sisi kanan / modal yang dapat ditutup dengan tombol ESC atau klik luar.
  - *Why*: Memenuhi preferensi pengguna secara presisi, memudahkan membandingkan berbagai website buatan tanpa harus berpindah halaman atau kehilangan konteks.
- **Decision 3: Welcome Animation Flow with Non-Intrusive Dismissal**:
  - *Chosen Approach*: Full-screen reveal animasi sambutan yang menawan saat pertama kali dibuka, dengan tombol aksi cepat dan memory state sesi agar tidak mengganggu jika pengguna me-refresh di tab yang sama.

---

## 4. Technical Architecture & Data Strategy

### Architecture & Component Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                        StarPit Web Application                         │
├────────────────────────────────────────────────────────────────────────┤
│  [TopNavigation]: Brand ("StarPit") ── Links ── Primary CTA            │
├────────────────────────────────────────────────────────────────────────┤
│  [WelcomeOverlay] (Intro Animation, Smooth Dismiss, Auto-Continue)    │
├────────────────────────────────────────────────────────────────────────┤
│  [HeroSection]                                                         │
│  ┌──────────────────────────────┬───────────────────────────────────┐  │
│  │ Executive Intro & Bio        │ Three.js 3D Interactive Robot     │  │
│  │ Specialties & Experience     │ - 360° Orbit Drag & Inertia Damping│  │
│  │ Action CTA (View Works)      │ - Reactive Facial Visor Emotions  │  │
│  │                              │ - Interactive Dialog Speech Bubble│  │
│  └──────────────────────────────┴───────────────────────────────────┘  │
├────────────────────────────────────────────────────────────────────────┤
│  [ProjectsSplitView] (Website Buatanku)                                │
│  ┌──────────────────────────────┬───────────────────────────────────┐  │
│  │ Project Filter & Card List   │ Live Interactive Mockup Frame     │  │
│  │ - E-Commerce Luxury Platform │ - Full Screen Viewport & Metrics  │  │
│  │ - AI Studio Generative Suite │ - Tech Stack Specs & Highlights   │  │
│  │ - Cloud SaaS Orchestrator    │ - "Buka Detail Proyek" CTA Button │  │
│  │ - WebGL Spatial Experience   │                                   │  │
│  └──────────────────────────────┴───────────────────────────────────┘  │
│                                                                        │
│  [ProjectDetailDrawer] (Studi Kasus, Arsitektur, Galeri, Live Demo Link)│
├────────────────────────────────────────────────────────────────────────┤
│  [AIContributionsGrid] (Gemini, ChatGPT, Claude AI, Google AI Studio)  │
│  - 4 Curated Deep Showcase Cards with Key Workflows & Benchmarks       │
├────────────────────────────────────────────────────────────────────────┤
│  [ContactSection & Footer]                                             │
│  - Clean Inquiry Form, Direct Email to pitnewbie12@gmail.com, Copyright│
└────────────────────────────────────────────────────────────────────────┘
```

### Component & State Mapping
- `useRobotState`: Mengelola rotasi kamera 360°, ekspresi wajah aktif (`normal`, `happy`, `curious`, `focused`, `wink`), dan percakapan dialog interaktif.
- `useProjectShowcase`: Mengelola filter proyek yang aktif, proyek yang sedang disorot di panel live preview split-screen, dan drawer detail proyek yang sedang terbuka.
- `useWelcomeIntro`: Mengontrol transisi animasi *welcome* saat pertama kali pengguna masuk ke situs.

---

## 5. Implementation Phases & Verification Plan

### Phase 1: Dependencies & Configuration
- Install pustaka `three` dan `@types/three` untuk rendering 3D performa tinggi.
- Update `metadata.json` dan `index.html` dengan metadata nama aplikasi StarPit yang akurat.

### Phase 2: Procedural 3D Robot Companion & Engine
- Implementasi `src/components/Robot3DCanvas.tsx` dengan scene Three.js, RoomEnvironment reflections, 3-point studio lighting, contact shadow, hierarchical procedural robot, visor canvas eye shader, dan orbit 360° controls.
- Implementasi `src/components/RobotDialogBubble.tsx` untuk interaksi dialog lucu & profesional saat robot disentuh atau tombol mood ditekan.

### Phase 3: Welcome Screen & Navigation
- Implementasi `src/components/WelcomeScreen.tsx` dengan motion animasi mulus, tipografi mewah, dan entrance sequence.
- Implementasi `src/components/Navbar.tsx` sesuai aturan 3-Zone Top Bar.

### Phase 4: Split-Screen Project Showcase & Drawer
- Implementasi `src/data/projectsData.ts` dengan data proyek website buatan StarPit (deskripsi kaya, metrik, arsitektur, gambar UI mockup resolusi tinggi).
- Implementasi `src/components/ProjectsSplitView.tsx` dan `src/components/ProjectDetailDrawer.tsx`.

### Phase 5: AI Contribution Showcase & Contact
- Implementasi `src/data/aiContributionsData.ts` dan `src/components/AIContributionsSection.tsx` untuk Gemini, ChatGPT, Claude AI, dan Google AI Studio.
- Implementasi `src/components/ContactSection.tsx` dan footer profesional.

### Phase 6: Build Verification & Polish
- Menjalankan `compile_applet` untuk memastikan TypeScript dan build Vite lulus tanpa error.
- Verifikasi visual kelancaran animasi dan interaktivitas 360° robot di browser.
