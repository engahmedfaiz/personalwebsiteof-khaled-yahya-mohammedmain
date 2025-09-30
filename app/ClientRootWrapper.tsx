"use client";

import { usePathname } from "next/navigation";
import RootLayout from "@/components/frontend/RootLayout";

export default function ClientRootWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    // صفحات الـ admin → ما نلفها بالـ RootLayout
    return <>{children}</>;
  }

  // باقي الصفحات → نستخدم RootLayout
  return <RootLayout>{children}</RootLayout>;
}
