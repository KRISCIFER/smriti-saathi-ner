"use client";

import { Accessibility, ArrowRight, Brain, Check, ChevronLeft, Gamepad2, HeartHandshake, Languages, Leaf, Mic, ShieldCheck, Sparkles, UserRound, Users, Wifi } from "lucide-react";
import { useState } from "react";
import { Brand, GlassCard, GlowButton, Orb, PageProgress, SafeNotice, SectionHeading, VoiceButton } from "./components";
import { useDemo } from "./state";
import type { Role } from "./types";

const features = [
  { icon: Gamepad2, title: "Gentle cognitive games", body: "Short, familiar activities adapt in small, explainable steps." },
  { icon: Leaf, title: "Personal Memory Garden", body: "Consented family memories become warm, removable prompts." },
  { icon: HeartHandshake, title: "Connected care", body: "Families and health workers see clear routines and trends." },
];

export function LandingPage() {
  const { go } = useDemo();
  return (
    <div className="landing">
      <header className="landing-nav"><Brand /><nav aria-label="Landing navigation"><button onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}>How it works</button><button onClick={() => document.getElementById("games")?.scrollIntoView({ behavior: "smooth" })}>Games</button><button onClick={() => document.getElementById("care")?.scrollIntoView({ behavior: "smooth" })}>For caregivers</button><button onClick={() => go("/accessibility")}>Accessibility</button></nav><div className="nav-cta"><button className="text-button" onClick={() => go("/select-role")}>Sign in</button><GlowButton onClick={() => go("/select-role")}>Get started <ArrowRight /></GlowButton></div></header>
      <main>
        <section className="hero">
          <div className="hero-copy"><span className="eyebrow"><Sparkles /> Built for the North Eastern Region</span><h1>Every memory deserves <em>gentle support.</em></h1><p>Daily cognitive activities, thoughtful reminders and family connections—designed around dignity, local languages and life offline.</p><div className="button-row"><GlowButton onClick={() => go("/select-role")}>Start today <ArrowRight /></GlowButton><GlowButton secondary onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}>See how it works</GlowButton></div><div className="trust-row"><span><Wifi />Offline-friendly</span><span><Users />Caregiver connected</span><span><Languages />Multilingual</span><span><ShieldCheck />Privacy first</span></div></div>
          <div className="hero-visual"><Orb /><div className="float-card float-a"><Gamepad2 /><span><strong>Daily games</strong>8 min today</span></div><div className="float-card float-b"><Leaf /><span><strong>Memory Garden</strong>6 moments</span></div><div className="float-card float-c"><Check /><span><strong>Reminder</strong>Morning complete</span></div></div>
        </section>
        <section className="landing-section problem-grid"><GlassCard className="problem-card"><span className="eyebrow">The need</span><h2>Support that fits everyday life.</h2><p>Memory difficulties can affect routines, confidence and family coordination. Most tools are not designed for low connectivity, local languages or older adults.</p></GlassCard><GlassCard className="solution-card"><div><Brain /><span>Personal baseline</span></div><div className="flow-line" /><div><Sparkles /><span>Gentle adaptation</span></div><div className="flow-line" /><div><HeartHandshake /><span>Human support</span></div></GlassCard></section>
        <section id="games" className="landing-section"><SectionHeading eyebrow="One calm ecosystem" title="Made for the person—and the people beside them." body="Three connected experiences keep daily use simple while making care coordination clearer."/><div className="feature-grid">{features.map(({ icon: Icon, title, body }) => <GlassCard key={title} className="feature-card"><div className="feature-icon"><Icon /></div><h3>{title}</h3><p>{body}</p><button onClick={() => go(title.includes("games") ? "/elderly/games" : title.includes("Garden") ? "/elderly/memory-garden" : "/caregiver/dashboard")}>Explore <ArrowRight /></button></GlassCard>)}</div></section>
        <section id="care" className="landing-section split-feature"><div><span className="eyebrow">Explainable, never diagnostic</span><h2>Useful trends without frightening labels.</h2><p>Caregivers see activity, reminder completion and changes from the person’s own usual pattern. Every observation includes human-review guidance.</p><SafeNotice>Smriti Saathi supports cognitive engagement and routines. It does not diagnose, cure or prevent dementia.</SafeNotice><GlowButton onClick={() => go("/caregiver/dashboard")}>View caregiver dashboard <ArrowRight /></GlowButton></div><div className="mini-dashboard"><div className="mini-head"><span>Weekly engagement</span><strong>Steady</strong></div><div className="bars">{[54, 78, 66, 90, 74, 46, 70].map((h, i) => <span key={i} style={{ height: `${h}%` }} />)}</div><div className="mini-stats"><span><strong>11</strong>games</span><span><strong>82%</strong>reminders</span><span><strong>7m</strong>daily avg.</span></div></div></section>
        <section className="landing-section memory-preview"><div className="memory-orbit"><div className="memory-tile one">N</div><div className="memory-tile two">A</div><div className="memory-tile three">M</div><div className="memory-center"><Leaf /></div></div><div><span className="eyebrow">Signature experience</span><h2>Familiar people. Positive moments. Fully in your control.</h2><p>The Memory Garden turns approved family photos, names, places and voice messages into gentle reminiscence activities. Every item can be removed at any time.</p><GlowButton onClick={() => go("/elderly/memory-garden")}>Enter Memory Garden <ArrowRight /></GlowButton></div></section>
        <section id="how" className="landing-section"><SectionHeading eyebrow="Simple by design" title="A supportive rhythm in three steps."/><div className="steps"><div><span>01</span><h3>Choose language & comfort</h3><p>Set text size, voice and motion preferences.</p></div><div><span>02</span><h3>Practice for 5–10 minutes</h3><p>Complete short, familiar activities without pressure.</p></div><div><span>03</span><h3>Stay gently connected</h3><p>Routines save offline and trusted care teams see useful summaries.</p></div></div></section>
        <section className="landing-cta"><Orb small /><div><span className="eyebrow">A calmer daily companion</span><h2>Begin with one gentle activity today.</h2><p>No diagnosis. No pressure. Just supportive practice and everyday connection.</p></div><GlowButton onClick={() => go("/select-role")}>Choose your experience <ArrowRight /></GlowButton></section>
      </main>
      <footer><Brand /><p>Games for the mind. Support for everyday life.</p><div><button onClick={() => go("/accessibility")}>Accessibility</button><button onClick={() => go("/settings")}>Privacy</button><span>Prototype · Not medical advice</span></div></footer>
    </div>
  );
}

const roles: { id: Role; icon: typeof UserRound; title: string; body: string; points: string[] }[] = [
  { id: "elderly", icon: UserRound, title: "Elderly user", body: "Play gentle games, remember routines and stay close to family.", points: ["Large, simple controls", "Voice guidance", "Works offline"] },
  { id: "caregiver", icon: HeartHandshake, title: "Family caregiver", body: "Support daily routines without constant checking or confusing scores.", points: ["Seven-day overview", "Reminder support", "Permission controls"] },
  { id: "health-worker", icon: Users, title: "Health worker", body: "Coordinate consented follow-ups across villages and care centres.", points: ["Assisted onboarding", "Offline sync", "Human-review reports"] },
];

export function RolePage() {
  const { state, setRole, go } = useDemo();
  return <div className="focus-page"><div className="focus-nav"><Brand /><button onClick={() => go("/")}><ChevronLeft />Back</button></div><div className="role-wrap"><SectionHeading eyebrow="Choose your experience" title="How will you use Smriti Saathi?" body="This demo can switch roles anytime. Elderly view is selected by default."/><div className="role-grid">{roles.map(({ id, icon: Icon, title, body, points }) => <button key={id} className={`role-card ${state.role === id ? "selected" : ""}`} onClick={() => setRole(id)} aria-pressed={state.role === id}><span className="role-check">{state.role === id && <Check />}</span><div className="role-icon"><Icon /></div><h3>{title}</h3><p>{body}</p><ul>{points.map((p) => <li key={p}><Check />{p}</li>)}</ul><span className="role-continue">Select role <ArrowRight /></span></button>)}</div><GlowButton className="role-submit" onClick={() => go("/onboarding")}>Continue as {roles.find((r) => r.id === state.role)?.title} <ArrowRight /></GlowButton></div></div>;
}

const languages = ["English", "Hindi", "Assamese", "Manipuri", "Khasi", "Mizo"];

export function OnboardingPage() {
  const { state, setLanguage, updateAccessibility, setOnboardingStep, finishOnboarding, go } = useDemo();
  const [caregiver, setCaregiver] = useState("Nandini Sharma");
  const step = state.onboardingStep;
  const a = state.accessibility;
  const screens = [
    { title: "Welcome to a gentler daily rhythm", body: "We’ll set up language, comfort and trusted support. You can change everything later.", content: <div className="welcome-orb"><Orb small /></div> },
    { title: "Choose your preferred language", body: "All important instructions will follow this setting.", content: <div className="choice-grid">{languages.map((l) => <button className={state.language === l ? "selected" : ""} onClick={() => setLanguage(l)} key={l}><Languages />{l}{state.language === l && <Check />}</button>)}</div> },
    { title: "Choose a comfortable text size", body: "Pick the option that is easiest to read.", content: <div className="size-choices">{(["normal", "large", "extra"] as const).map((size) => <button key={size} className={a.textSize === size ? "selected" : ""} onClick={() => updateAccessibility({ textSize: size })}><span>{size === "normal" ? "A" : size === "large" ? "A+" : "A++"}</span>{size === "normal" ? "Normal" : size === "large" ? "Large" : "Extra large"}</button>)}</div> },
    { title: "Would you like voice guidance?", body: "Instructions can be read aloud before activities and reminders.", content: <div className="binary-choice"><button className={a.voiceGuidance ? "selected" : ""} onClick={() => updateAccessibility({ voiceGuidance: true })}><Mic />Yes, guide me</button><button className={!a.voiceGuidance ? "selected" : ""} onClick={() => updateAccessibility({ voiceGuidance: false })}>No, text only</button></div> },
    { title: "Choose your motion comfort", body: "Visual depth is gentle and can be disabled at any time.", content: <div className="binary-choice"><button className={!a.disable3D ? "selected" : ""} onClick={() => updateAccessibility({ disable3D: false, reduceMotion: false })}><Sparkles />Gentle 3D on</button><button className={a.disable3D ? "selected" : ""} onClick={() => updateAccessibility({ disable3D: true, reduceMotion: true })}><Accessibility />Simple & still</button></div> },
    { title: "Connect a trusted caregiver", body: "They can only see information you approve.", content: <div className="form-card"><label>Caregiver name<input value={caregiver} onChange={(e) => setCaregiver(e.target.value)} /></label><label>Permission<select><option>Activities and reminders</option><option>Reminders only</option><option>Full approved support</option></select></label><p><ShieldCheck /> A demo connection is saved only on this device.</p></div> },
    { title: "Your information stays in your control", body: "Choose what to share. Withdraw permission or remove a memory at any time.", content: <div className="consent-list"><p><Check /> Games and daily activity</p><p><Check /> Reminders you confirm</p><p><Check /> Approved family memories</p><p><ShieldCheck /> No sale of personal health data</p></div> },
    { title: "Try one small practice", body: "Tap the glowing circle. There is no timer and no harsh failure state.", content: <PracticeActivity /> },
  ];
  const current = screens[step] ?? screens[0];
  const next = () => { if (step === 7) { finishOnboarding(); go(state.role === "elderly" ? "/elderly/home" : state.role === "caregiver" ? "/caregiver/dashboard" : "/health-worker/dashboard"); } else setOnboardingStep(step + 1); };
  return <div className="focus-page onboarding-page"><div className="focus-nav"><Brand /><span>Step {step + 1} of 8</span></div><main className="onboarding-card"><PageProgress value={(step + 1) * 12.5} /><div className="onboarding-heading"><span className="step-badge">{String(step + 1).padStart(2, "0")}</span><h1>{current.title}</h1><p>{current.body}</p><VoiceButton text={`${current.title}. ${current.body}`} /></div><div className="onboarding-content">{current.content}</div><div className="onboarding-actions"><GlowButton secondary disabled={step === 0} onClick={() => setOnboardingStep(Math.max(0, step - 1))}><ChevronLeft />Back</GlowButton><span>Saved automatically</span><GlowButton onClick={next}>{step === 7 ? "Finish setup" : "Continue"}<ArrowRight /></GlowButton></div></main></div>;
}

function PracticeActivity() {
  const [done, setDone] = useState(false);
  return <div className="practice-box"><button className={done ? "practice-done" : "practice-dot"} onClick={() => setDone(true)} aria-label="Practice button">{done ? <><Check /><span>Wonderful—practice complete</span></> : <Sparkles />}</button></div>;
}
