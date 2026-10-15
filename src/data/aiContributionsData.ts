import { AIContributionItem } from '../types';

export const AI_CONTRIBUTIONS_DATA: AIContributionItem[] = [
  {
    id: 'google-gemini',
    platform: 'Google Gemini',
    logoBadge: 'Gemini 2.5 & 3.0 Pro/Flash',
    role: 'Multimodal Architect & Prompt System Specialist',
    focusArea: 'Long-Context Reasoning, Context Caching & Native Tool Calling',
    description: 'StarPit telah merancang dan mengoptimalkan berbagai arsitektur pipeline multimodal berbasis Google Gemini, mulai dari Gemini 1.5 Pro hingga lini terbaru Gemini 2.5 Flash dan 3.0. Fokus mencakup pemanfaatan 1M+ token context window, context caching untuk penghematan biaya produksi sebesar 40%, serta orkestrasi grounding dengan Google Search dan code execution.',
    keyContributions: [
      'Penyusunan arsitektur prompt reasoning rantai-langkah (Chain-of-Thought) untuk analisis data finansial dan medis.',
      'Implementasi mekanisme Context Caching TTL dinamis pada aplikasi analitik dokumen bervolume jutaan token.',
      'Pengembangan adapter Function Calling untuk koneksi aman ke database enterprise dan OpenAPI endpoints.',
      'Evaluasi benchmark performa latensi model Flash vs Pro untuk integrasi real-time UI/UX.'
    ],
    benchmarks: [
      { label: 'Context Processing', value: 'Up to 2M tokens' },
      { label: 'Caching Cost Reduction', value: '38 - 50%' },
      { label: 'Response Latency Avg', value: '< 420 ms' },
      { label: 'Evaluation Precision', value: '98.4%' }
    ],
    toolsAndSDKs: ['@google/genai SDK', 'Vertex AI', 'Context Caching API', 'Search Grounding', 'Code Execution'],
    impactSummary: 'Memungkinkan aplikasi web memproses video, audio, dan ratusan file PDF secara simultan dengan throughput tinggi dan efisiensi biaya maksimal.',
    accentColor: '#38BDF8'
  },
  {
    id: 'chatgpt-openai',
    platform: 'ChatGPT (OpenAI)',
    logoBadge: 'GPT-4o & OpenAI Reasoning',
    role: 'Custom GPT Architect & Function Call Engineer',
    focusArea: 'Agentic Workflows, Structured Outputs & System Prompting',
    description: 'Berkontribusi dalam perancangan ekosistem Custom GPTs, pembuatan OpenAPI Actions spesifik, serta implementasi Structured Outputs (JSON Schema) yang menjamin keandalan pemanggilan API eksternal tanpa risiko format parsing error.',
    keyContributions: [
      'Pembangunan Custom GPTs bersertifikasi untuk workflow code review, audit keamanan CSS/TypeScript, dan refactoring otomatis.',
      'Desain skema JSON Schema terverifikasi (Pydantic & Zod compliant) untuk transmisi data antar service microservices.',
      'Penerapan teknik token truncation cerdas dan memory summarization untuk sesi obrolan interaktif jangka panjang.',
      'Integrasi streaming response (SSE) ke antarmuka front-end React dengan zero layout flicker.'
    ],
    benchmarks: [
      { label: 'JSON Parsing Reliability', value: '100% Deterministic' },
      { label: 'Token Efficiency', value: '+32% Saved' },
      { label: 'Custom GPT Active Users', value: '25,000+' },
      { label: 'Schema Validation Rate', value: '99.9%' }
    ],
    toolsAndSDKs: ['OpenAI Responses API', 'Assistants API', 'Custom GPT Actions', 'Structured Outputs', 'Zod Validator'],
    impactSummary: 'Meningkatkan interoperabilitas agen cerdas ke dalam software bisnis, mengubah dialog teks menjadi aksi transaksional database yang presisi.',
    accentColor: '#10B981'
  },
  {
    id: 'claude-ai',
    platform: 'Claude AI (Anthropic)',
    logoBadge: 'Claude 3.5 & 3.7 Sonnet',
    role: 'Artifacts Engineer & Constitutional AI Prompt Specialist',
    focusArea: 'Interactive Artifacts, Computer Use & Long-form Synthesis',
    description: 'Berpengalaman mendalam dalam mengeksploitasi arsitektur penalaran Claude untuk pembuatan prototipe interaktif (Claude Artifacts), integrasi alur Computer Use, serta rekayasa prompt berbasis prinsip Constitutional AI untuk menghasilkan konten teknis yang bernuansa dan bebas halusinasi.',
    keyContributions: [
      'Perancangan modul modular React & SVG interaktif mandiri yang dapat langsung dirender di dalam Claude Artifacts.',
      'Optimalisasi prompt meta-system untuk coding engine Claude yang meminimalkan boilerplates dan memaksimalkan efisiensi token.',
      'Implementasi skenario Computer Use untuk pengujian end-to-end aplikasi web secara visual dan otomatis.',
      'Fine-tuning prompt instruksi berbasis XML tags (`<context>`, `<rules>`, `<examples>`) untuk konsistensi keluaran analitik.'
    ],
    benchmarks: [
      { label: 'Code Generation Quality', value: 'Top 1% Tier' },
      { label: 'Hallucination Mitigation', value: '-85% Incident' },
      { label: 'Artifact Rendering Success', value: '99.8%' },
      { label: 'Human Evaluation Score', value: '4.95 / 5.0' }
    ],
    toolsAndSDKs: ['Anthropic Messages API', 'Claude Artifacts', 'Computer Use Tool', 'XML Prompt Engineering'],
    impactSummary: 'Menghadirkan standar kode yang bersih, penjelasan teknis yang mendalam, dan pengalaman interaksi UI langsung di dalam kanvas percakapan AI.',
    accentColor: '#D97706'
  },
  {
    id: 'google-ai-studio',
    platform: 'Google AI Studio',
    logoBadge: 'AI Studio Build & Prototyping',
    role: 'Full-Stack Applet Architect & System Instruction Specialist',
    focusArea: 'Rapid Application Generation, Tool Prototyping & Live Tuning',
    description: 'Memelopori perancangan aplikasi web full-stack modern di Google AI Studio Build. Menggabungkan System Instructions yang presisi, pemanfaatan library modern seperti Three.js, Tailwind v4, dan Framer Motion, serta memastikan setiap komponen UI bekerja nyata tanpa placeholder atau dead-clicks.',
    keyContributions: [
      'Pembuatan blueprint arsitektur aplikasi web reaktif berkinerja tinggi yang langsung dapat di-deploy ke Cloud Run.',
      'Desain modul dialog interaktif dan integrasi WebGL 3D yang ringan, bebas dependensi rapuh, dan tahan terhadap sandbox restart.',
      'Penyusunan panduan best practice perancangan antarmuka berprinsip Anti-Slop: zero-pill metadata, single-line controls, dan typography berkelas.',
      'Optimalisasi proses build Vite dan TypeScript hermetis untuk pengalaman live-preview tanpa kedip (zero-flicker).'
    ],
    benchmarks: [
      { label: 'Applet Build Success', value: '100% Hermetic' },
      { label: 'First Contentful Paint', value: '< 0.4s' },
      { label: 'Clean Code Compliance', value: 'Strict TypeScript' },
      { label: 'Zero-404 Asset Rigor', value: '100% Procedural' }
    ],
    toolsAndSDKs: ['Google AI Studio Build', 'Gemini Live API', 'Cloud Run', 'Vite', 'Tailwind CSS v4'],
    impactSummary: 'Menjembatani ide konseptual pengguna menjadi software produksi siap pakai dalam hitungan menit dengan standar visual dan arsitektur tingkat tinggi.',
    accentColor: '#8B5CF6'
  }
];

export const ROBOT_DIALOGUES = [
  {
    id: 'intro',
    emotion: 'happy' as const,
    text: 'Halo! Saya StarBot, maskot 3D StarPit! Anda bisa memutar saya 360°, mengajak interaksi, atau klik tombol di bawah untuk melihat ekspresi saya.'
  },
  {
    id: 'about',
    emotion: 'curious' as const,
    text: 'StarPit adalah pengembang full-stack & AI specialist yang fokus membangun website elegan, modern, dan berkemampuan 3D interaktif.'
  },
  {
    id: 'projects',
    emotion: 'excited' as const,
    text: 'Cek bagian "Website Buatanku" di bawah! Ada tampilan split-screen canggih dengan mockup langsung dan drawer detail proyek!'
  },
  {
    id: 'ai',
    emotion: 'normal' as const,
    text: 'StarPit sangat aktif berkontribusi di ekosistem Gemini, ChatGPT, Claude AI, dan Google AI Studio dengan standar tinggi.'
  },
  {
    id: 'secret',
    emotion: 'wink' as const,
    text: 'Psst! Coba drag kursor ke kiri-kanan untuk memutar saya 360°, atau klik tubuh saya untuk reaksi khusus!'
  }
];
