"use client";

import { AccessibilityPage, CaregiverDashboardPage, ElderDetailPage, HealthWorkerDashboardPage, ReportsPage, SettingsPage } from "./dashboard-pages";
import { ElderHomePage, FamilyPage, GamesHubPage, MemoryGardenPage, RemindersPage } from "./elderly-pages";
import { GamePage } from "./games";
import { LandingPage, OnboardingPage, RolePage } from "./public-pages";
import { DemoProvider, useDemo } from "./state";

function Router() {
  const { route } = useDemo();
  if (route === "/") return <LandingPage />;
  if (route === "/select-role") return <RolePage />;
  if (route === "/onboarding") return <OnboardingPage />;
  if (route === "/elderly/home") return <ElderHomePage />;
  if (route === "/elderly/games") return <GamesHubPage />;
  if (route === "/elderly/games/memory-match") return <GamePage gameId="memory-match" />;
  if (route === "/elderly/games/sequence-glow") return <GamePage gameId="sequence-glow" />;
  if (route === "/elderly/games/daily-steps") return <GamePage gameId="daily-steps" />;
  if (route === "/elderly/memory-garden") return <MemoryGardenPage />;
  if (route === "/elderly/reminders") return <RemindersPage />;
  if (route === "/elderly/family") return <FamilyPage />;
  if (route === "/caregiver/dashboard") return <CaregiverDashboardPage />;
  if (route.startsWith("/caregiver/elder/")) return <ElderDetailPage />;
  if (route === "/health-worker/dashboard") return <HealthWorkerDashboardPage />;
  if (route === "/reports") return <ReportsPage />;
  if (route === "/accessibility") return <AccessibilityPage />;
  if (route === "/settings") return <SettingsPage />;
  return <LandingPage />;
}

export function SmritiApp() {
  return <DemoProvider><Router /></DemoProvider>;
}
