import type { DemoState } from "./types";

export const defaultState: DemoState = {
  role: "elderly",
  language: "English",
  onboarded: false,
  onboardingStep: 0,
  accessibility: {
    textSize: "normal",
    highContrast: false,
    lightMode: false,
    reduceMotion: false,
    disable3D: false,
    voiceGuidance: true,
    simplifiedNavigation: false,
    largeButtons: true,
  },
  reminders: [
    { id: "r1", title: "Morning medicine", category: "Medicine", time: "08:00", completed: true, caregiverCreated: true, repeat: "Daily" },
    { id: "r2", title: "Drink a glass of water", category: "Hydration", time: "10:30", completed: false, repeat: "Daily" },
    { id: "r3", title: "Lunch", category: "Meal", time: "13:00", completed: false, repeat: "Daily" },
    { id: "r4", title: "Call Nandini", category: "Family call", time: "16:30", completed: false },
    { id: "r5", title: "Evening walk", category: "Exercise", time: "17:30", completed: false, repeat: "Weekdays" },
    { id: "r6", title: "Doctor appointment", category: "Appointment", time: "Tomorrow, 11:00", completed: false, caregiverCreated: true },
  ],
  memories: [
    { id: "m1", name: "Nandini", relationship: "Daughter", place: "Guwahati", memory: "Our spring picnic beside the Brahmaputra.", accent: "#7c3aed" },
    { id: "m2", name: "Aarav", relationship: "Grandson", place: "Shillong", memory: "His first school-day smile.", accent: "#a855f7" },
    { id: "m3", name: "Meera", relationship: "Sister", place: "Imphal", memory: "Making tea together on rainy evenings.", accent: "#6d5dfc" },
    { id: "m4", name: "Ravi", relationship: "Son", place: "Aizawl", memory: "Our family garden in full bloom.", accent: "#8b5cf6" },
    { id: "m5", name: "Lalita", relationship: "Friend", place: "Gangtok", memory: "A quiet morning at the flower show.", accent: "#c084fc" },
    { id: "m6", name: "Our home", relationship: "Familiar place", place: "Assam", memory: "The veranda where we share evening stories.", accent: "#5b21b6" },
  ],
  gameResults: [],
};

export const engagementData = [
  { day: "Mon", minutes: 8, games: 2, reminders: 80 },
  { day: "Tue", minutes: 10, games: 2, reminders: 100 },
  { day: "Wed", minutes: 6, games: 1, reminders: 75 },
  { day: "Thu", minutes: 12, games: 3, reminders: 100 },
  { day: "Fri", minutes: 9, games: 2, reminders: 80 },
  { day: "Sat", minutes: 5, games: 1, reminders: 60 },
  { day: "Sun", minutes: 7, games: 2, reminders: 80 },
];

export const domainData = [
  { domain: "Memory", value: 78 },
  { domain: "Attention", value: 72 },
  { domain: "Planning", value: 68 },
  { domain: "Language", value: 74 },
  { domain: "Routine", value: 82 },
];

export const workers = [
  { id: "elder-001", name: "Anita Devi", village: "Chandmari", language: "Assamese", status: "Synced", followUp: "Today", activity: "Active" },
  { id: "elder-002", name: "Thangjam Ibobi", village: "Kakching", language: "Manipuri", status: "Offline", followUp: "Tomorrow", activity: "Check-in" },
  { id: "elder-003", name: "Meri Khonglam", village: "Mawlai", language: "Khasi", status: "Synced", followUp: "Sep 2", activity: "Active" },
  { id: "elder-004", name: "Lalrinpuii", village: "Kulikawn", language: "Mizo", status: "Pending", followUp: "Sep 3", activity: "New" },
];
