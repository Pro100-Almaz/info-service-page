import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Astratech Solutions — Разработка сайтов и приложений",
  description:
    "Разработка сайтов, мобильных приложений и MVP для стартапов и бизнеса в Казахстане",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark">
      <body className={`${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
