"use client";

import { ArrowDown, ArrowLeft, ArrowUp, Check, Eye, Footprints, Grid2X2, Lightbulb, RotateCcw, Sparkles, Volume2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AppShell, CompletionCard, GlassCard, GlowButton, SafeNotice, VoiceButton } from "./components";
import { useDemo } from "./state";

const gameMeta = {
  "memory-match": { title: "Memory Match", area: "Visual memory", duration: "3–4 min", icon: Grid2X2, description: "Find the pairs of familiar objects. Take all the time you need." },
  "sequence-glow": { title: "Sequence Glow", area: "Attention & sequence", duration: "2–3 min", icon: Eye, description: "Watch the gentle lights, then repeat them in the same order." },
  "daily-steps": { title: "Daily Steps", area: "Planning", duration: "3–5 min", icon: Footprints, description: "Put familiar everyday steps into a helpful order." },
};

export function GamePage({ gameId }: { gameId: keyof typeof gameMeta }) {
  const { go } = useDemo();
  const meta = gameMeta[gameId] ?? gameMeta["memory-match"];
  return <AppShell title={meta.title} subtitle={`${meta.area} · ${meta.duration}`}><div className="game-top"><button className="back-link" onClick={() => go("/elderly/games")}><ArrowLeft />All games</button><VoiceButton text={meta.description} /></div><SafeNotice>{meta.description} Activity results are supportive and non-diagnostic.</SafeNotice>{gameId === "memory-match" ? <MemoryMatch /> : gameId === "sequence-glow" ? <SequenceGlow /> : <DailySteps />}</AppShell>;
}

const cards = [
  { id: 1, pair: "tea", symbol: "☕", label: "Tea cup" }, { id: 2, pair: "leaf", symbol: "🍃", label: "Leaf" },
  { id: 3, pair: "flower", symbol: "✿", label: "Flower" }, { id: 4, pair: "leaf", symbol: "🍃", label: "Leaf" },
  { id: 5, pair: "tea", symbol: "☕", label: "Tea cup" }, { id: 6, pair: "flower", symbol: "✿", label: "Flower" },
];

function MemoryMatch() {
  const { completeGame } = useDemo();
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const lock = useRef(false);
  const reported = useRef(false);
  const completed = matched.length === cards.length;
  useEffect(() => {
    if (completed && !reported.current) {
      reported.current = true;
      completeGame({ gameId: "memory-match", score: Math.max(60, 110 - moves * 5) });
    }
  }, [completed, moves, completeGame]);
  const choose = (card: typeof cards[number]) => {
    if (lock.current || open.includes(card.id) || matched.includes(card.id)) return;
    const next = [...open, card.id]; setOpen(next);
    if (next.length === 2) {
      setMoves((m) => m + 1); lock.current = true;
      const a = cards.find((c) => c.id === next[0]);
      if (a?.pair === card.pair) { setMatched((m) => [...m, ...next]); setOpen([]); lock.current = false; }
      else window.setTimeout(() => { setOpen([]); lock.current = false; }, 700);
    }
  };
  const reset = () => { setOpen([]); setMatched([]); setMoves(0); lock.current = false; reported.current = false; };
  if (completed) return <CompletionCard title="All pairs found" score={Math.max(60, 110 - moves * 5)} onContinue={reset} />;
  return <GlassCard className="game-stage"><div className="game-stage-head"><div><span className="eyebrow">Gentle practice</span><h2>Find three matching pairs</h2></div><span className="move-count">{moves} moves</span></div><div className="memory-board">{cards.map((card) => { const visible = open.includes(card.id) || matched.includes(card.id); return <button key={card.id} className={`memory-game-card ${visible ? "open" : ""} ${matched.includes(card.id) ? "matched" : ""}`} onClick={() => choose(card)} aria-label={visible ? card.label : "Hidden memory card"} aria-pressed={visible}><span className="card-back"><Sparkles /></span><span className="card-front"><b>{card.symbol}</b><small>{card.label}</small></span></button>; })}</div><div className="game-footer"><span><Lightbulb />Try remembering each symbol’s position.</span><button onClick={reset}><RotateCcw />Restart</button></div></GlassCard>;
}

function SequenceGlow() {
  const { completeGame } = useDemo();
  const sequences = useMemo(() => [[0, 2, 1], [3, 0, 2, 1], [1, 3, 0, 2, 1]], []);
  const [level, setLevel] = useState(0);
  const [active, setActive] = useState<number | null>(null);
  const [input, setInput] = useState<number[]>([]);
  const [phase, setPhase] = useState<"ready" | "showing" | "input" | "gentle">("ready");
  const [complete, setComplete] = useState(false);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);
  const showSequence = () => {
    timers.current.forEach(window.clearTimeout); timers.current = []; setInput([]); setPhase("showing");
    sequences[level].forEach((n, i) => {
      timers.current.push(window.setTimeout(() => setActive(n), i * 700 + 250));
      timers.current.push(window.setTimeout(() => setActive(null), i * 700 + 700));
    });
    timers.current.push(window.setTimeout(() => setPhase("input"), sequences[level].length * 700 + 300));
  };
  const press = (n: number) => {
    if (phase !== "input") return;
    const next = [...input, n]; setInput(next);
    if (sequences[level][next.length - 1] !== n) { setPhase("gentle"); return; }
    if (next.length === sequences[level].length) {
      if (level === sequences.length - 1) { setComplete(true); completeGame({ gameId: "sequence-glow", score: 95 }); }
      else { setLevel((l) => l + 1); setPhase("ready"); setInput([]); }
    }
  };
  const reset = () => { setLevel(0); setInput([]); setPhase("ready"); setComplete(false); };
  if (complete) return <CompletionCard title="Beautiful sequence work" score={95} onContinue={reset} />;
  return <GlassCard className="game-stage"><div className="game-stage-head"><div><span className="eyebrow">Level {level + 1} of 3</span><h2>{phase === "showing" ? "Watch the lights" : phase === "input" ? "Now repeat the pattern" : phase === "gentle" ? "Let’s view it once more" : "Ready when you are"}</h2></div><span className="round-dots">{sequences.map((_, i) => <i className={i <= level ? "active" : ""} key={i} />)}</span></div><div className="sequence-board">{[0, 1, 2, 3].map((n) => <button key={n} onClick={() => press(n)} className={active === n ? "active" : ""} disabled={phase !== "input"} aria-label={`Sequence light ${n + 1}`}><span>{n + 1}</span></button>)}</div><div className="sequence-actions">{phase === "ready" && <GlowButton onClick={showSequence}><Volume2 />Show pattern</GlowButton>}{phase === "gentle" && <><p>No problem—patterns become easier with practice.</p><GlowButton onClick={showSequence}>Show again</GlowButton></>}{phase === "input" && <p>{input.length} of {sequences[level].length} selected</p>}{phase === "showing" && <p>Please watch…</p>}</div></GlassCard>;
}

const initialSteps = ["Pour hot water into the cup", "Place tea leaves in the pot", "Gather a cup, pot and tea leaves", "Let the tea rest, then serve"];
const correct = ["Gather a cup, pot and tea leaves", "Place tea leaves in the pot", "Pour hot water into the cup", "Let the tea rest, then serve"];

function DailySteps() {
  const { completeGame } = useDemo();
  const [steps, setSteps] = useState(initialSteps);
  const [message, setMessage] = useState("");
  const [complete, setComplete] = useState(false);
  const move = (index: number, direction: -1 | 1) => { const target = index + direction; if (target < 0 || target >= steps.length) return; const copy = [...steps]; [copy[index], copy[target]] = [copy[target], copy[index]]; setSteps(copy); setMessage(""); };
  const check = () => { if (steps.every((s, i) => s === correct[i])) { setComplete(true); completeGame({ gameId: "daily-steps", score: 90 }); } else setMessage("Almost there. Think about what you need before the water is poured."); };
  const reset = () => { setSteps(initialSteps); setMessage(""); setComplete(false); };
  if (complete) return <CompletionCard title="Tea steps arranged" score={90} onContinue={reset} />;
  return <GlassCard className="game-stage"><div className="game-stage-head"><div><span className="eyebrow">Everyday planning</span><h2>Arrange the steps for preparing tea</h2></div><span className="move-count">Use arrows</span></div><ol className="steps-board">{steps.map((step, i) => <li key={step}><span>{i + 1}</span><p>{step}</p><div><button onClick={() => move(i, -1)} disabled={i === 0} aria-label={`Move ${step} up`}><ArrowUp /></button><button onClick={() => move(i, 1)} disabled={i === steps.length - 1} aria-label={`Move ${step} down`}><ArrowDown /></button></div></li>)}</ol>{message && <div className="gentle-feedback"><Lightbulb />{message}</div>}<div className="game-footer"><button onClick={reset}><RotateCcw />Restart</button><GlowButton onClick={check}><Check />Check order</GlowButton></div></GlassCard>;
}
