import type React from "react";
import type { Metadata } from "next";
import { Playfair_Display, Inter, Amiri } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { ClientSessionProvider } from "@/components/providers/session-provider";
import "./globals.css";
import ClientRootWrapper from "./ClientRootWrapper";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "أفضل محامي في صنعاء - خالد يحيى الناصر | استشارات قانونية للمغتربين واليمنيين",
  description: "محامي معتمد ومترافع أمام المحكمة العليا في صنعاء. خدمات قانونية شاملة، استشارات للمغتربين، قضايا الأسرة، الشركات، والعقود.",
  keywords: [
    "محامي في صنعاء",
    "أفضل محامي في صنعاء",
    "محامي مغتربين في السعودية",
    "محامي شركات في اليمن",
    "محامي قضايا أسرية",
    "استشارات قانونية صنعاء",
    "المحامي خالد يحيى الناصر",
    "مكتب المحامي خالد يحيى الناصر",
   " مكتب محامي"
  ],
  openGraph: {
    title: "أفضل محامي في صنعاء - خالد يحيى الناصر",
    description: "محامي معتمد أمام المحكمة العليا يقدم خدمات قانونية متكاملة داخل اليمن وللمغتربين في السعودية.",
    url: "https://www.khaledalnasserlaw.com",
    type: "website",
    locale: "ar_YE"
  },
  alternates: {
    canonical: "https://www.khaledalnasserlaw.com"
  }
}


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`font-body ${playfairDisplay.variable} ${inter.variable} ${amiri.variable}`}
      >
        <ClientSessionProvider>
          <Suspense fallback={null}>
            <ClientRootWrapper>{children}</ClientRootWrapper>
          </Suspense>
        </ClientSessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
