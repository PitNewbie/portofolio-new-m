import { ProjectItem } from '../types';

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'aura-luxe',
    title: 'Aura Luxe Living',
    tagline: 'High-end minimalist e-commerce with real-time 3D furniture visualizer',
    category: 'E-Commerce',
    year: '2026',
    role: 'Lead Architect & Full-Stack Developer',
    summary: 'Platform e-commerce arsitektural mewah dengan konfigurator material 3D interaktif, transisi halaman instan, dan integrasi checkout berkinerja tinggi.',
    description: 'Aura Luxe Living dibangun untuk merek furnitur eksklusif Eropa. Platform ini memadukan pengalaman belanja editorial dengan WebGL 3D photorealistic viewer, memungkinkan pelanggan memutar dan menguji swatch kain sutra, marmer carrara, dan kayu walnut dalam resolusi ultra-tinggi sebelum membeli.',
    client: 'Aura Living GmbH (Munich)',
    metrics: [
      { label: 'Konversi Penjualan', value: '+42.8%' },
      { label: 'Rata-rata Durasi Sesi', value: '4m 35s' },
      { label: 'Lighthouse Performance', value: '99/100' },
      { label: 'WebGL Frame Rate', value: '60 FPS' },
    ],
    techStack: ['React 19', 'Three.js / WebGL', 'TypeScript', 'Tailwind CSS', 'Stripe API', 'PostgreSQL'],
    keyFeatures: [
      '360° Real-time 3D product material & texture switcher (velvet, bouclé, brushed bronze)',
      'Sub-second instant routing dengan pre-fetching cerdas',
      'One-click multi-currency checkout dengan proteksi rate limit terenkripsi',
      'Responsive touch & gesture camera choreography untuk perangkat seluler'
    ],
    architecturalHighlights: [
      'PMREM Procedural Studio HDRI generation untuk rendering logam & kaca realistis tanpa aset eksternal berat',
      'Optimasi geometri Three.js dengan InstancedMesh dan GLTF buffer LOD switching',
      'Server-driven cart state synchronization dengan zero layout shift'
    ],
    mockupTheme: {
      accent: '#F59E0B',
      gradient: 'from-amber-950/40 via-stone-900/60 to-black',
      uiType: 'ecommerce',
    },
    demoUrl: 'https://aura-luxe.preview.starpit.dev',
    githubUrl: 'https://github.com/starpit/aura-luxe-storefront'
  },
  {
    id: 'cognitive-ops',
    title: 'CognitiveOps AI Platform',
    tagline: 'Enterprise multi-agent LLM orchestrator & real-time telemetry console',
    category: 'AI & LLM',
    year: '2026',
    role: 'AI Systems Architect & Frontend Engineer',
    summary: 'Sistem komando orkestrasi agent AI multi-model dengan visualisasi graph node dinamis, evaluasi respons realtime, dan token audit analyzer.',
    description: 'Platform enterprise terpadu yang memantau, menguji, dan mendeploy agen cerdas otonom lintas model (Gemini, Claude, GPT). Menyediakan debugging step-by-step interaktif, branch simulation, serta cost analysis per pipeline pemrosesan.',
    client: 'Cognitive Dynamics Inc.',
    metrics: [
      { label: 'Agen Terorkestrasi', value: '1.2M+ runs/bln' },
      { label: 'Efisiensi Token Cost', value: '-38.4%' },
      { label: 'Latency P99', value: '240 ms' },
      { label: 'Uptime Reliability', value: '99.98%' },
    ],
    techStack: ['TypeScript', 'Gemini 2.5 API', 'React 19', 'Tailwind CSS', 'WebSockets', 'Express'],
    keyFeatures: [
      'Visual Flow Builder untuk chaining prompt, tool calling, dan human-in-the-loop review',
      'Live streaming token execution inspector dengan colored syntax highlighting',
      'Context Caching manager untuk menghemat kuota dan memangkas latency model',
      'Automated semantic evaluation benchmark untuk menguji akurasi model'
    ],
    architecturalHighlights: [
      'SSE (Server-Sent Events) pipeline untuk streaming token zero-lag ke DOM',
      'Canvas node-graph editor dengan zoom pan tak terbatas berkecepatan 60 FPS',
      'Dynamic schema validator untuk Function Calling parameters'
    ],
    mockupTheme: {
      accent: '#38BDF8',
      gradient: 'from-sky-950/40 via-slate-900/60 to-black',
      uiType: 'ai-studio',
    },
    demoUrl: 'https://cognitive-ops.preview.starpit.dev',
    githubUrl: 'https://github.com/starpit/cognitive-ops-engine'
  },
  {
    id: 'nexus-cloud',
    title: 'Nexus Cloud Console',
    tagline: 'High-density developer platform for serverless infrastructure',
    category: 'Full-Stack',
    year: '2025',
    role: 'Lead Full-Stack Developer',
    summary: 'Dashboard developer berdensitas tinggi untuk pengelolaan microservices, distributed logging, dan zero-downtime deployment pipelines.',
    description: 'Nexus Cloud menghadirkan antarmuka minimalis elegan untuk tim rekayasa perangkat lunak berskala besar. Menghubungkan metrik performa CPU/RAM secara live, cluster deployment, SSL automation, serta environment variable vaults dalam satu layar responsif.',
    client: 'Nexus Systems Global',
    metrics: [
      { label: 'Deploy Time', value: '< 18 detik' },
      { label: 'Active Microservices', value: '450+ nodes' },
      { label: 'Developer NPS', value: '+74' },
      { label: 'Zero-Downtime Record', value: '100%' },
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'Tailwind CSS', 'TypeScript'],
    keyFeatures: [
      'Multi-region cluster map dengan live traffic heatmaps',
      'Instant rollback engine dengan visual commit timeline',
      'End-to-end secret keys manager dengan audit logs terperinci',
      'Integrated web terminal & CLI companion'
    ],
    architecturalHighlights: [
      'Optimasi render list tervirtualisasi untuk menangani 10,000+ log lines per detik',
      'Drizzle ORM schema dengan query latensi sub-5ms di Cloud SQL',
      'Role-based access control (RBAC) dengan token JWT rotasi otomatis'
    ],
    mockupTheme: {
      accent: '#10B981',
      gradient: 'from-emerald-950/40 via-zinc-900/60 to-black',
      uiType: 'dashboard',
    },
    demoUrl: 'https://nexus-cloud.preview.starpit.dev',
    githubUrl: 'https://github.com/starpit/nexus-cloud-core'
  },
  {
    id: 'symphony-spatial',
    title: 'Symphony Spatial Experience',
    tagline: 'Immersive WebGL virtual architecture & sound design gallery',
    category: 'WebGL 3D',
    year: '2025',
    role: 'Creative Technologist & 3D WebGL Developer',
    summary: 'Ruang pameran arsitektur virtual 3D interaktif dengan pencahayaan dinamis, spatial audio synthesis, dan navigasi kamera sinematik.',
    description: 'Proyek eksperimental berbasis Three.js yang mengeksplorasi batas kemampuan browser modern. Menggabungkan arsitektur brutalist modern, simulasi pencahayaan ray-like procedural, serta Web Audio API generative ambient soundtrack yang beradaptasi dengan sudut pandang pengguna.',
    client: 'Symphony Design Collective',
    metrics: [
      { label: 'Awards & Honors', value: 'Awwwards SOTD' },
      { label: 'FPS Stabilitas', value: 'Solid 60 FPS' },
      { label: 'Aset Ukuran Bersih', value: '1.4 MB (No Heavy GLB)' },
      { label: 'Interaksi Durasi', value: '6m 12s' },
    ],
    techStack: ['Three.js', 'Web Audio API', 'GLSL Custom Shaders', 'React', 'TypeScript'],
    keyFeatures: [
      'Procedural geometry generation untuk paviliun arsitektural tanpa download model berat',
      'Dynamic day/night cycle dengan exposure control yang halus',
      'Interactive 3D hotspots dengan modal cerita kuratorial',
      'Procedural spatial audio oscillator yang bereaksi terhadap jarak objek'
    ],
    architecturalHighlights: [
      'Custom MeshPhysicalMaterial shader hooks menggunakan onBeforeCompile',
      'Zero 404 asset guarantee dengan tekstur kanvas prosedural berkualitas studio',
      'Optimasi raycaster throttled untuk interaksi klik 3D yang sangat mulus'
    ],
    mockupTheme: {
      accent: '#8B5CF6',
      gradient: 'from-purple-950/40 via-stone-900/60 to-black',
      uiType: 'spatial',
    },
    demoUrl: 'https://symphony-spatial.preview.starpit.dev',
    githubUrl: 'https://github.com/starpit/symphony-webgl'
  },
  {
    id: 'zenith-flow',
    title: 'Zenith Flow Workspace',
    tagline: 'Keyboard-first task orchestrator & creative markdown IDE',
    category: 'Full-Stack',
    year: '2025',
    role: 'Frontend Architect',
    summary: 'Aplikasi manajemen tugas dan penulisan naskah teknis dengan navigasi keyboard kilat, visual split mind-map, dan sinkronisasi offline.',
    description: 'Dirancang khusus untuk engineer dan kreator konten yang mengutamakan kecepatan. Memungkinkan pengelolaan ribuan ide tanpa menyentuh mouse berkat command palette terpadu (Cmd+K) dan engine penulisan bebas gangguan.',
    client: 'Zenith Labs',
    metrics: [
      { label: 'Kecepatan Respons', value: '< 16 ms' },
      { label: 'Keyboard Shortcuts', value: '65+ bindings' },
      { label: 'Offline Support', value: '100% PWA Cache' },
      { label: 'Pengguna Aktif', value: '18,500+' },
    ],
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'IndexedDB', 'Service Workers'],
    keyFeatures: [
      'Command palette instan dengan fuzzy search pencarian secepat kilat',
      'Bi-directional linking antar dokumen dan visual graph relations',
      'Split-screen live markdown renderer dengan math formulas LaTeX support',
      'Penyimpanan lokal terenkripsi dengan ekspor format serbaguna (JSON, MD, PDF)'
    ],
    architecturalHighlights: [
      'Optimized virtualized tree structure untuk jutaan node dokumen',
      'Zero-dependency state machine untuk undo/redo tak terbatas',
      'Responsive design yang seamless di tablet, desktop, dan ponsel'
    ],
    mockupTheme: {
      accent: '#EC4899',
      gradient: 'from-pink-950/40 via-slate-900/60 to-black',
      uiType: 'devtools',
    },
    demoUrl: 'https://zenith-flow.preview.starpit.dev',
    githubUrl: 'https://github.com/starpit/zenith-workspace'
  }
];
