export type Role = "elderly" | "caregiver" | "health-worker";

export type AccessibilitySettings = {
  textSize: "normal" | "large" | "extra";
  highContrast: boolean;
  lightMode: boolean;
  reduceMotion: boolean;
  disable3D: boolean;
  voiceGuidance: boolean;
  simplifiedNavigation: boolean;
  largeButtons: boolean;
};

export type Reminder = {
  id: string;
  title: string;
  category: string;
  time: string;
  completed: boolean;
  caregiverCreated?: boolean;
  repeat?: string;
};

export type MemoryItem = {
  id: string;
  name: string;
  relationship: string;
  place: string;
  memory: string;
  accent: string;
  imageData?: string;
};

export type GameResult = {
  gameId: string;
  completedAt: string;
  score: number;
};

export type DemoState = {
  role: Role;
  language: string;
  onboarded: boolean;
  onboardingStep: number;
  accessibility: AccessibilitySettings;
  reminders: Reminder[];
  memories: MemoryItem[];
  gameResults: GameResult[];
};
