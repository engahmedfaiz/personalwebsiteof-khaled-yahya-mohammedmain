
// "use client";

// import type React from "react";

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { Sidebar } from "@/components/admin/sidebar";
// import { AdminHeader } from "@/components/admin/header";
// import { Loader2 } from "lucide-react";

// export const dynamic = "force-dynamic";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const sessionResult = useSession();
//   const session = sessionResult?.data;
//   const status = sessionResult?.status;
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "loading") return;

//     if (!session) {
//       router.push("/admin/login");
//       return;
//     }

//     if (session.user?.role !== "admin" && session.user?.role !== "lawyer") {
//       router.push("/admin/login");
//       return;
//     }
//   }, [session, status, router]);

//   if (status === "loading") {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
//       </div>
//     );
//   }

//   if (
//     !session ||
//     (session.user?.role !== "admin" && session.user?.role !== "lawyer")
//   ) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-slate-50" dir="rtl">
//       <div className="flex flex-col md:flex-row">
//         {/* Sidebar يظهر في الشاشات المتوسطة وفوق */}
//         <div className="hidden md:block">{/* <Sidebar /> */}</div>

//         {/* المحتوى الرئيسي */}
//         <div className="flex-1 flex flex-col">
//           <AdminHeader />
//           <main className="p-4 sm:p-6">{children}</main>
//         </div>
//       </div>
//     </div>
//   );
// }
