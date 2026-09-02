import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smriti Saathi",
  description: "Gentle cognitive games, memory support and connected care for older adults in North East India.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
