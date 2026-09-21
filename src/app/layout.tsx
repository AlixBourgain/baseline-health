import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Baseline", template: "%s · Baseline" },
  description: "Comprendre et suivre ses données de santé dans le temps.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
