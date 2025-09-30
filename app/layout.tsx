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
  title: "المحامي خالد يحيى الناصر - استشارات قانونية",
  description:
    "محامي ومستشار قانوني مترافع أمام المحكمة العليا - خدمات قانونية شاملة",
  generator: "ُEbrahim ,Ahmed",
};

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
