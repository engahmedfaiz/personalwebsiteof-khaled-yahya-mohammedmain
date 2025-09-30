
"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { Loader2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // ✅ ما نحتاج نحمي صفحة تسجيل الدخول نفسها
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (status === "loading") return;

    if (!session && !isLoginPage) {
      router.push("/admin/login");
      return;
    }

    if (
      !isLoginPage &&
      session &&
      session.user?.role !== "admin" &&
      session.user?.role !== "lawyer"
    ) {
      router.push("/admin/login");
      return;
    }
  }, [session, status, router, isLoginPage]);

  // حالة التحميل
  // if (status === "loading") {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
  //     </div>
  //   );
  // }

  // ✅ صفحة تسجيل الدخول ما تحتاج layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  // منع العرض لو ما في صلاحيات
  if (
    !session ||
    (session.user?.role !== "admin" && session.user?.role !== "lawyer")
  ) {
    return null;
  }

  // ✅ باقي صفحات الإدارة
  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Main */}
        <div className="flex-1 flex flex-col">
          <AdminHeader onMenuToggle={() => setIsMobileOpen(!isMobileOpen)} />
          <main className="p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
