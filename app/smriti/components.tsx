"use client";

import {
  Accessibility, Activity, Bell, Brain, ChevronRight, CircleHelp, CloudOff, Gamepad2,
  HeartHandshake, Home, Languages, LayoutDashboard, Leaf, Menu, MessageCircle, Mic,
  Moon, Network, Phone, RotateCcw, Settings, ShieldCheck, Sparkles, Sun, Users, Wifi,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { useDemo } from "./state";

export function Brand({ compact = false }: { compact?: boolean }) {
  const { go } = useDemo();
  return (
    <button className="brand" onClick={() => go("/")} aria-label="Smriti Saathi home">
      <span className="brand-mark" aria-hidden="true"><Brain /></span>
      {!compact && <span><strong>Smriti Saathi</strong><small>NER</small></span>}
    </button>
  );
}

export function GlowButton({ children, onClick, secondary = false, className = "", type = "button", disabled = false }: {
  children: React.ReactNode; onClick?: () => void; secondary?: boolean; className?: string; type?: "button" | "submit"; disabled?: boolean;
}) {
  return <Button type={type} disabled={disabled} onClick={onClick} className={`glow-button ${secondary ? "secondary" : ""} ${className}`}>{children}</Button>;
}

export function GlassCard({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return <article className={`glass-card ${className}`} onClick={onClick}>{children}</article>;
}

export function Orb({ small = false }: { small?: boolean }) {
  return (
    <div className={`orb-scene ${small ? "small" : ""}`} aria-label="Calm animated cognitive connection orb" role="img">
      <div className="orb-halo" />
      <div className="orb-core"><Brain /></div>
      {[0, 1, 2, 3, 4].map((n) => <span key={n} className={`orbit-node node-${n}`}><Sparkles /></span>)}
      <span className="orbit orbit-a" /><span className="orbit orbit-b" /><span className="orbit orbit-c" />
    </div>
  );
}

export function DailyProgressRing({ value = 68, label = "Daily plan" }: { value?: number; label?: string }) {
  return (
    <div className="progress-ring" style={{ "--progress": `${value * 3.6}deg` } as React.CSSProperties} role="img" aria-label={`${label}: ${value}% complete`}>
      <div><strong>{value}%</strong><span>{label}</span></div>
    </div>
  );
}

const elderNav = [
  ["/elderly/home", Home, "Home"], ["/elderly/games", Gamepad2, "Games"], ["/elderly/memory-garden", Leaf, "Memories"],
  ["/elderly/reminders", Bell, "Reminders"], ["/elderly/family", CircleHelp, "Help"],
] as const;
const careNav = [
  ["/caregiver/dashboard", LayoutDashboard, "Overview"], ["/caregiver/elder/elder-001", Users, "Elder profiles"],
  ["/elderly/games", Activity, "Activities"], ["/elderly/reminders", Bell, "Reminders"], ["/elderly/memory-garden", Leaf, "Memory Garden"],
  ["/reports", ShieldCheck, "Reports"], ["/settings", Settings, "Settings"],
] as const;
const healthNav = [
  ["/health-worker/dashboard", LayoutDashboard, "Dashboard"], ["/caregiver/elder/elder-001", Users, "Assigned users"],
  ["/reports", Activity, "Reports"], ["/settings", Settings, "Settings"],
] as const;

export function AppShell({ children, title, subtitle }: { children: React.ReactNode; title?: string; subtitle?: string }) {
  const { state, route, go, online, setRole } = useDemo();
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = state.role === "elderly" ? elderNav : state.role === "caregiver" ? careNav : healthNav;
  return (
    <div className={`app-shell role-${state.role}`}>
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`} aria-label="Main navigation">
        <div className="sidebar-top"><Brand /><button className="icon-button mobile-only" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X /></button></div>
        <nav>{nav.map(([path, Icon, label]) => <button key={path} className={route === path || (path.includes("elder-001") && route.startsWith("/caregiver/elder")) ? "active" : ""} onClick={() => { go(path); setMobileOpen(false); }}><Icon /><span>{label}</span></button>)}</nav>
        <div className="sidebar-footer">
          <label htmlFor="role-demo">Demo role</label>
          <select id="role-demo" value={state.role} onChange={(e) => { const role = e.target.value as typeof state.role; setRole(role); go(role === "elderly" ? "/elderly/home" : role === "caregiver" ? "/caregiver/dashboard" : "/health-worker/dashboard"); }}>
            <option value="elderly">Elderly user</option><option value="caregiver">Caregiver</option><option value="health-worker">Health worker</option>
          </select>
          <div className="connection"><span className={online ? "online" : "offline"}>{online ? <Wifi /> : <CloudOff />}</span>{online ? "Online · synced" : "Offline · saving safely"}</div>
        </div>
      </aside>
      {mobileOpen && <button className="sidebar-scrim" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
      <main className="app-main">
        <header className="app-topbar">
          <button className="icon-button mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu /></button>
          <div><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>
          <div className="top-actions"><span className={`status-pill ${online ? "" : "warning"}`}>{online ? <Wifi /> : <CloudOff />}{online ? "Synced" : "Offline"}</span><button className="avatar" aria-label="Profile for Anita Devi">AD</button></div>
        </header>
        <div className="page-content">{children}</div>
      </main>
      {state.role === "elderly" && <nav className="bottom-nav" aria-label="Elderly navigation">{elderNav.map(([path, Icon, label]) => <button key={path} className={route === path ? "active" : ""} onClick={() => go(path)}><Icon /><span>{label}</span></button>)}</nav>}
      <AccessibilityPanel />
    </div>
  );
}

export function AccessibilityPanel() {
  const { state, updateAccessibility } = useDemo();
  const a = state.accessibility;
  const toggles: [keyof typeof a, string, React.ReactNode][] = [
    ["highContrast", "High contrast", <ShieldCheck key="1" />], ["lightMode", "Light mode", a.lightMode ? <Sun key="2" /> : <Moon key="2" />],
    ["reduceMotion", "Reduce motion", <Activity key="3" />], ["disable3D", "Disable 3D effects", <Network key="4" />],
    ["voiceGuidance", "Voice guidance", <Mic key="5" />], ["simplifiedNavigation", "Simplified navigation", <Menu key="6" />],
    ["largeButtons", "Larger buttons", <Accessibility key="7" />],
  ];
  return (
    <Dialog>
      <DialogTrigger asChild><Button className="accessibility-fab" aria-label="Open accessibility controls"><Accessibility /></Button></DialogTrigger>
      <DialogContent className="access-dialog">
        <DialogHeader><DialogTitle>Accessibility control centre</DialogTitle><DialogDescription>Changes are applied immediately and saved on this device.</DialogDescription></DialogHeader>
        <div className="text-size-group"><span>Text size</span><div>{(["normal", "large", "extra"] as const).map((size) => <button key={size} className={a.textSize === size ? "active" : ""} onClick={() => updateAccessibility({ textSize: size })}>{size === "normal" ? "A" : size === "large" ? "A+" : "A++"}</button>)}</div></div>
        <div className="settings-list">{toggles.map(([key, label, icon]) => <label key={key}><span>{icon}{label}</span><Switch checked={Boolean(a[key])} onCheckedChange={(checked) => updateAccessibility({ [key]: checked })} aria-label={label} /></label>)}</div>
      </DialogContent>
    </Dialog>
  );
}

export function VoiceButton({ text }: { text: string }) {
  const [speaking, setSpeaking] = useState(false);
  const speak = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setSpeaking(false);
    setSpeaking(true); window.speechSynthesis.speak(utterance);
  };
  return <button className="voice-button" onClick={speak} aria-label={`Read aloud: ${text}`}><Mic />{speaking ? "Reading…" : "Read aloud"}</button>;
}

export function SectionHeading({ eyebrow, title, body }: { eyebrow?: string; title: string; body?: string }) {
  return <div className="section-heading">{eyebrow && <span>{eyebrow}</span>}<h2>{title}</h2>{body && <p>{body}</p>}</div>;
}

export function SafeNotice({ children }: { children: React.ReactNode }) {
  return <div className="safe-notice"><ShieldCheck /> <p>{children}</p></div>;
}

export function CompletionCard({ title, score, onContinue }: { title: string; score: number; onContinue: () => void }) {
  const { go } = useDemo();
  return <GlassCard className="completion-card"><div className="achievement"><Sparkles /></div><span className="eyebrow">Activity complete</span><h2>{title}</h2><p>You stayed focused and completed today’s gentle practice.</p><div className="score-row"><strong>{score}</strong><span>activity points</span></div><div className="button-row"><GlowButton onClick={onContinue}>Play again</GlowButton><GlowButton secondary onClick={() => go("/elderly/home")}>Return home</GlowButton></div><small>Activity points support engagement only. They are not a medical score.</small></GlassCard>;
}

export function PageProgress({ value }: { value: number }) {
  return <Progress value={value} className="page-progress" aria-label={`${value}% complete`} />;
}

export const featureIcons = { Brain, Bell, Leaf, Users, Languages, ShieldCheck, HeartHandshake, Gamepad2, MessageCircle, Phone, RotateCcw, ChevronRight };
