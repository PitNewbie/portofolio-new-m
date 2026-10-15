export type RobotEmotion = 'normal' | 'happy' | 'excited' | 'curious' | 'wink';

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: 'Full-Stack' | 'AI & LLM' | 'E-Commerce' | 'WebGL 3D';
  year: string;
  role: string;
  summary: string;
  description: string;
  client: string;
  metrics: { label: string; value: string }[];
  techStack: string[];
  keyFeatures: string[];
  architecturalHighlights: string[];
  mockupTheme: {
    accent: string;
    gradient: string;
    uiType: 'ecommerce' | 'dashboard' | 'spatial' | 'ai-studio' | 'devtools';
  };
  demoUrl?: string;
  githubUrl?: string;
}

export interface AIContributionItem {
  id: string;
  platform: 'Google Gemini' | 'ChatGPT (OpenAI)' | 'Claude AI (Anthropic)' | 'Google AI Studio';
  logoBadge: string;
  role: string;
  focusArea: string;
  description: string;
  keyContributions: string[];
  benchmarks: { label: string; value: string }[];
  toolsAndSDKs: string[];
  impactSummary: string;
  accentColor: string;
}

export interface DialogMessage {
  id: string;
  text: string;
  emotion: RobotEmotion;
  topic?: string;
}
