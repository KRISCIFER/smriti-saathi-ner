import { NextRequest, NextResponse } from "next/server";

const plan = {
  elderId: "elder-001",
  date: "2026-08-29",
  activities: [
    { id: "memory-match", title: "Memory Match", minutes: 4, difficulty: "gentle" },
    { id: "sequence-glow", title: "Sequence Glow", minutes: 3, difficulty: "adaptive" },
    { id: "daily-steps", title: "Daily Steps", minutes: 4, difficulty: "familiar" },
  ],
  explanation: "Selected from recent engagement and the person’s preferred activities.",
  medicalDisclaimer: "This plan supports engagement and is not a diagnosis or treatment recommendation.",
};

const trends = {
  elderId: "elder-001",
  period: "7d",
  engagement: "steady",
  minutes: [8, 10, 6, 12, 9, 5, 7],
  observation: "Recent activity is close to this person’s usual pattern.",
  medicalDisclaimer: "Observations are non-diagnostic and require human context.",
};

function endpoint(request: NextRequest) {
  return request.nextUrl.pathname.replace("/api/v1/", "");
}

export async function GET(request: NextRequest) {
  const path = endpoint(request);
  if (path === "health") return NextResponse.json({ ok: true, service: "smriti-saathi-api", offlineMode: true });
  if (path === "plan/today") return NextResponse.json(plan);
  if (path === "trends") return NextResponse.json(trends);
  if (path === "reminders") return NextResponse.json({ items: [], source: "device-first demo" });
  return NextResponse.json({ error: "Unknown API route" }, { status: 404 });
}

export async function POST(request: NextRequest) {
  const path = endpoint(request);
  const allowed = ["onboarding", "sessions", "responses", "reminders", "caregiver-links"];
  if (!allowed.includes(path)) return NextResponse.json({ error: "Unknown API route" }, { status: 404 });
  const body = await request.json().catch(() => ({}));
  const idempotencyKey = request.headers.get("idempotency-key") ?? crypto.randomUUID();
  return NextResponse.json({ accepted: true, path, idempotencyKey, receivedFields: Object.keys(body), queuedForSync: false }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  if (endpoint(request) !== "profile") return NextResponse.json({ error: "Unknown API route" }, { status: 404 });
  return NextResponse.json({ accepted: true, status: "deletion-requested", humanReviewRequired: true });
}
