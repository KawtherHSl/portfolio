import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kawther Halima Salem | AI Engineer Portfolio",
  description: "Portfolio professionnel de Kawther Halima Salem, Ingénieure en Intelligence Artificielle et Machine Learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" translate="no" className={`notranslate ${inter.className}`} suppressHydrationWarning>
      <body suppressHydrationWarning className="notranslate">{children}</body>
    </html>
  );
}
