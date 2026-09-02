"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultState } from "./data";
import type { AccessibilitySettings, DemoState, GameResult, MemoryItem, Reminder, Role } from "./types";

type DemoContextValue = {
  state: DemoState;
  route: string;
  online: boolean;
  go: (path: string) => void;
  setRole: (role: Role) => void;
  setLanguage: (language: string) => void;
  updateAccessibility: (values: Partial<AccessibilitySettings>) => void;
  setOnboardingStep: (step: number) => void;
  finishOnboarding: () => void;
  toggleReminder: (id: string) => void;
  snoozeReminder: (id: string) => void;
  addReminder: (reminder: Omit<Reminder, "id" | "completed">) => void;
  addMemory: (memory: Omit<MemoryItem, "id">) => void;
  deleteMemory: (id: string) => void;
  completeGame: (result: Omit<GameResult, "completedAt">) => void;
  reset: () => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);
const storageKey = "smriti-saathi-demo-v1";

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DemoState>(defaultState);
  const [route, setRoute] = useState("/");
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const hydrateTimer = window.setTimeout(() => {
      setRoute(window.location.pathname);
      setOnline(navigator.onLine);
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        try { setState({ ...defaultState, ...JSON.parse(saved) }); } catch { /* keep safe defaults */ }
      }
    }, 0);
    const onPop = () => setRoute(window.location.pathname);
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener("popstate", onPop);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.clearTimeout(hydrateTimer);
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  useEffect(() => { window.localStorage.setItem(storageKey, JSON.stringify(state)); }, [state]);

  const value = useMemo<DemoContextValue>(() => ({
    state,
    route,
    online,
    go: (path) => { window.history.pushState({}, "", path); setRoute(path); window.scrollTo({ top: 0, behavior: state.accessibility.reduceMotion ? "auto" : "smooth" }); },
    setRole: (role) => setState((s) => ({ ...s, role })),
    setLanguage: (language) => setState((s) => ({ ...s, language })),
    updateAccessibility: (values) => setState((s) => ({ ...s, accessibility: { ...s.accessibility, ...values } })),
    setOnboardingStep: (onboardingStep) => setState((s) => ({ ...s, onboardingStep })),
    finishOnboarding: () => setState((s) => ({ ...s, onboarded: true, onboardingStep: 7 })),
    toggleReminder: (id) => setState((s) => ({ ...s, reminders: s.reminders.map((r) => r.id === id ? { ...r, completed: !r.completed } : r) })),
    snoozeReminder: (id) => setState((s) => ({ ...s, reminders: s.reminders.map((r) => r.id === id ? { ...r, time: `${r.time} · snoozed 10 min` } : r) })),
    addReminder: (reminder) => setState((s) => ({ ...s, reminders: [...s.reminders, { ...reminder, id: crypto.randomUUID(), completed: false }] })),
    addMemory: (memory) => setState((s) => ({ ...s, memories: [{ ...memory, id: crypto.randomUUID() }, ...s.memories] })),
    deleteMemory: (id) => setState((s) => ({ ...s, memories: s.memories.filter((m) => m.id !== id) })),
    completeGame: (result) => setState((s) => ({ ...s, gameResults: [...s.gameResults.filter((g) => g.gameId !== result.gameId), { ...result, completedAt: new Date().toISOString() }] })),
    reset: () => { window.localStorage.removeItem(storageKey); setState(defaultState); },
  }), [state, route, online]);

  const a = state.accessibility;
  const classes = [
    `text-${a.textSize}`,
    a.highContrast ? "high-contrast" : "",
    a.lightMode ? "light-mode" : "",
    a.reduceMotion ? "reduce-motion" : "",
    a.disable3D ? "disable-3d" : "",
    a.largeButtons ? "large-buttons" : "",
  ].filter(Boolean).join(" ");

  return <DemoContext.Provider value={value}><div className={classes}>{children}</div></DemoContext.Provider>;
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error("useDemo must be used within DemoProvider");
  return context;
}
