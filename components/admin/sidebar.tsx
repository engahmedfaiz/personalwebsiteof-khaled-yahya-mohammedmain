// "use client"

// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { cn } from "@/lib/utils"
// import { LayoutDashboard, Users, Calendar, FolderOpen, PenTool, UserCog, Settings, Scale } from "lucide-react"

// const navigation = [
//   { name: "لوحة القيادة", href: "/admin/dashboard", icon: LayoutDashboard },
//   { name: "إدارة القضايا", href: "/admin/cases", icon: Scale },
//   { name: "إدارة العملاء", href: "/admin/clients", icon: Users },
//   { name: "إدارة المواعيد", href: "/admin/appointments", icon: Calendar },
//   { name: "إدارة الوثائق", href: "/admin/documents", icon: FolderOpen },
//   { name: "إدارة المقالات", href: "/admin/articles", icon: PenTool },
//   { name: "إدارة المستخدمين", href: "/admin/users", icon: UserCog },
//   { name: "الإعدادات", href: "/admin/settings", icon: Settings },
// ]

// export function Sidebar() {
//   const pathname = usePathname()

//   return (
//     <div className="w-64 bg-white shadow-lg h-screen sticky top-0">
//       <div className="p-6 border-b">
//         <div className="flex items-center space-x-3 space-x-reverse">
//           <div className="p-2 bg-amber-100 rounded-lg">
//             <Scale className="h-6 w-6 text-amber-600" />
//           </div>
//           <div>
//             <h2 className="text-lg font-bold text-slate-800">لوحة التحكم</h2>
//             <p className="text-sm text-slate-600">مكتب المحاماة</p>
//           </div>
//         </div>
//       </div>

//       <nav className="p-4">
//         <ul className="space-y-2">
//           {navigation.map((item) => {
//             const isActive = pathname === item.href
//             return (
//               <li key={item.name}>
//                 <Link
//                   href={item.href}
//                   className={cn(
//                     "flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg text-sm font-medium transition-colors",
//                     isActive
//                       ? "bg-amber-100 text-amber-700 border-r-4 border-amber-600"
//                       : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
//                   )}
//                 >
//                   <item.icon className="h-5 w-5" />
//                   <span>{item.name}</span>
//                 </Link>
//               </li>
//             )
//           })}
//         </ul>
//       </nav>
//     </div>
//   )
// }
// "use client"

// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { cn } from "@/lib/utils"
// import { LayoutDashboard, Users, Calendar, FolderOpen, PenTool, UserCog, Settings, Scale, ChevronLeft, ChevronRight, Menu, X } from "lucide-react"
// import { useState, useEffect } from "react"

// const navigation = [
//   { name: "لوحة القيادة", href: "/admin/dashboard", icon: LayoutDashboard },
//   { name: "إدارة القضايا", href: "/admin/cases", icon: Scale },
//   { name: "إدارة العملاء", href: "/admin/clients", icon: Users },
//   { name: "إدارة المواعيد", href: "/admin/appointments", icon: Calendar },
//   { name: "إدارة الوثائق", href: "/admin/documents", icon: FolderOpen },
//   { name: "إدارة المقالات", href: "/admin/articles", icon: PenTool },
//   { name: "إدارة المستخدمين", href: "/admin/users", icon: UserCog },
//   { name: "الإعدادات", href: "/admin/settings", icon: Settings },
// ]

// export function Sidebar() {
//   const pathname = usePathname()
//   const [isCollapsed, setIsCollapsed] = useState(false)
//   const [isMobileOpen, setIsMobileOpen] = useState(false)
//   const [isMobile, setIsMobile] = useState(false)

//   // كشف نوع الجهاز
//   useEffect(() => {
//     const checkDevice = () => {
//       setIsMobile(window.innerWidth < 768)
//       if (window.innerWidth >= 768) {
//         setIsMobileOpen(false)
//       }
//     }

//     checkDevice()
//     window.addEventListener('resize', checkDevice)
//     return () => window.removeEventListener('resize', checkDevice)
//   }, [])

//   return (
//     <>
//       {/* Mobile Menu Button */}
//       {isMobile && (
//         <button
//           onClick={() => setIsMobileOpen(!isMobileOpen)}
//           className="fixed top-4 right-4 z-50 p-2 bg-amber-600 text-white rounded-lg md:hidden"
//         >
//           {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//         </button>
//       )}

//       {/* Overlay for Mobile */}
//       {isMobileOpen && isMobile && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//           onClick={() => setIsMobileOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div className={cn(
//         "bg-white shadow-lg h-screen sticky top-0 transition-all duration-300 border-r border-neutral-200 z-30",
//         "flex flex-col",
//         isMobile ? [
//           "fixed inset-y-0 right-0 w-64 transform",
//           isMobileOpen ? "translate-x-0" : "translate-x-full",
//           "md:translate-x-0 md:static md:w-64"
//         ] : [
//           isCollapsed ? "w-16 md:w-20" : "w-64"
//         ]
//       )}>
//         {/* Header */}
//         <div className="p-4 sm:p-6 border-b border-neutral-200 flex-shrink-0">
//           <div className={cn(
//             "flex items-center transition-all duration-300",
//             (isCollapsed && !isMobile) ? "justify-center" : "space-x-3 space-x-reverse"
//           )}>
//             <div className={cn(
//               "p-2 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-lg shadow-sm flex-shrink-0",
//               (isCollapsed && !isMobile) ? "p-2" : "p-2 sm:p-3"
//             )}>
//               <Scale className={cn(
//                 "text-white transition-all",
//                 (isCollapsed && !isMobile) ? "h-4 w-4 sm:h-5 sm:w-5" : "h-5 w-5 sm:h-6 sm:w-6"
//               )} />
//             </div>

//             {(!isCollapsed || isMobile) && (
//               <div className="flex-1 min-w-0">
//                 <h2 className="text-lg font-bold text-neutral-800 truncate text-base sm:text-lg">
//                   لوحة التحكم
//                 </h2>
//                 <p className="text-neutral-600 truncate text-xs sm:text-sm">
//                   مكتب المحاماة
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Collapse Button - Desktop Only */}
//         {!isMobile && (
//           <div className="flex justify-end p-2 border-b border-neutral-100 flex-shrink-0">
//             <button
//               onClick={() => setIsCollapsed(!isCollapsed)}
//               className="p-1 sm:p-2 rounded-lg hover:bg-amber-50 transition-colors duration-200 text-amber-600"
//             >
//               {isCollapsed ? (
//                 <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
//               ) : (
//                 <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
//               )}
//             </button>
//           </div>
//         )}

//         {/* Navigation */}
//         <nav className="p-2 sm:p-4 flex-1 overflow-y-auto">
//           <ul className="space-y-1">
//             {navigation.map((item) => {
//               const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
//               return (
//                 <li key={item.name}>
//                   <Link
//                     href={item.href}
//                     onClick={() => isMobile && setIsMobileOpen(false)}
//                     className={cn(
//                       "flex items-center px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-sm font-medium transition-all duration-200 group",
//                       "hover:bg-amber-50 hover:text-amber-900",
//                       isActive
//                         ? "bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border-r-2 border-amber-500 shadow-sm"
//                         : "text-neutral-600",
//                       (isCollapsed && !isMobile) ? "justify-center" : "space-x-3 space-x-reverse"
//                     )}
//                     title={(isCollapsed && !isMobile) ? item.name : undefined}
//                   >
//                     <item.icon className={cn(
//                       "flex-shrink-0 transition-colors",
//                       isActive ? "text-amber-600" : "text-neutral-500 group-hover:text-amber-600",
//                       (isCollapsed && !isMobile) ? "h-4 w-4 sm:h-5 sm:w-5" : "h-4 w-4 sm:h-5 sm:w-5"
//                     )} />

//                     {(!isCollapsed || isMobile) && (
//                       <span className="flex-1 truncate text-sm sm:text-base">{item.name}</span>
//                     )}

//                     {isActive && (!isCollapsed || isMobile) && (
//                       <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
//                     )}
//                   </Link>
//                 </li>
//               )
//             })}
//           </ul>
//         </nav>

//         {/* User Info (Bottom) */}
//         <div className={cn(
//           "p-3 sm:p-4 border-t border-neutral-200 bg-white flex-shrink-0",
//           (isCollapsed && !isMobile) ? "px-2" : "px-3 sm:px-4"
//         )}>
//           <div className={cn(
//             "flex items-center transition-all duration-300",
//             (isCollapsed && !isMobile) ? "justify-center" : "space-x-3 space-x-reverse"
//           )}>
//             <div className="relative flex-shrink-0">
//               <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-full flex items-center justify-center">
//                 <span className="text-white text-xs sm:text-sm font-medium">ا</span>
//               </div>
//               <div className="absolute -bottom-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-amber-500 rounded-full border-2 border-white"></div>
//             </div>

//             {(!isCollapsed || isMobile) && (
//               <div className="flex-1 min-w-0">
//                 <p className="text-neutral-800 truncate text-xs sm:text-sm font-medium">المستخدم</p>
//                 <p className="text-neutral-600 truncate text-xs">مدير النظام</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FolderOpen,
  PenTool,
  UserCog,
  Settings,
  Scale,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

const navigation = [
  { name: "لوحة القيادة", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "إدارة المقالات", href: "/admin/articles", icon: PenTool },
  { name: "إدارة المستخدمين", href: "/admin/users", icon: UserCog },
  { name: "اداره الفريق", href: "/admin/team", icon: Settings},
  { name: "إدارة القضايا", href: "/admin/cases", icon: Scale },
  { name: "إدارة العملاء", href: "/admin/clients", icon: Users },
  { name: "إدارة المواعيد", href: "/admin/appointments", icon: Calendar },
  { name: "إدارة الوثائق", href: "/admin/documents", icon: FolderOpen },
];

export function Sidebar({
  isMobileOpen,
  setIsMobileOpen,
}: {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, [setIsMobileOpen]);

  return (
    <>
      {/* Overlay for Mobile */}
      {isMobileOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "bg-white shadow-lg h-screen sticky top-0 transition-all duration-300 border-r border-neutral-200 z-50",
          "flex flex-col",
          isMobile
            ? [
                "fixed inset-y-0 right-0 w-64 transform",
                isMobileOpen ? "translate-x-0" : "translate-x-full",
                "md:translate-x-0 md:static md:w-64",
              ]
            : [isCollapsed ? "w-16 md:w-20" : "w-64"]
        )}
      >
        {/* Close button in mobile */}
        {isMobile && (
          <button
            onClick={() => setIsMobileOpen(false)}
            className="absolute top-4 left-4 p-2 rounded-lg bg-amber-600 text-white md:hidden"
            aria-label="إغلاق القائمة"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-200 flex-shrink-0">
          <div
            className={cn(
              "flex items-center transition-all duration-300",
              isCollapsed && !isMobile
                ? "justify-center"
                : "space-x-3 space-x-reverse"
            )}
          >
            <div className="p-2 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-lg shadow-sm flex-shrink-0">
              <Scale
                className={cn(
                  "text-white transition-all",
                  isCollapsed && !isMobile
                    ? "h-4 w-4 sm:h-5 sm:w-5"
                    : "h-5 w-5 sm:h-6 sm:w-6"
                )}
              />
            </div>
            {(!isCollapsed || isMobile) && (
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-neutral-800 truncate text-base sm:text-lg">
                  لوحة التحكم
                </h2>
                <p className="text-neutral-600 truncate text-xs sm:text-sm">
                  مكتب المحاماة
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Collapse button desktop only */}
        {!isMobile && (
          <div className="flex justify-end p-2 border-b border-neutral-100 flex-shrink-0">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 sm:p-2 rounded-lg hover:bg-amber-50 transition-colors duration-200 text-amber-600"
              aria-label={
                isCollapsed ? "توسيع الشريط الجانبي" : "طي الشريط الجانبي"
              }
            >
              {isCollapsed ? (
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
              ) : (
                <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              )}
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className="p-2 sm:p-4 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => isMobile && setIsMobileOpen(false)}
                    className={cn(
                      "flex items-center px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-sm font-medium transition-all duration-200 group",
                      "hover:bg-amber-50 hover:text-amber-900",
                      isActive
                        ? "bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border-r-2 border-amber-500 shadow-sm"
                        : "text-neutral-600",
                      isCollapsed && !isMobile
                        ? "justify-center"
                        : "space-x-3 space-x-reverse"
                    )}
                    title={isCollapsed && !isMobile ? item.name : undefined}
                  >
                    <item.icon
                      className={cn(
                        "flex-shrink-0 transition-colors",
                        isActive
                          ? "text-amber-600"
                          : "text-neutral-500 group-hover:text-amber-600",
                        "h-4 w-4 sm:h-5 sm:w-5"
                      )}
                      aria-hidden="true"
                    />
                    {(!isCollapsed || isMobile) && (
                      <span className="flex-1 truncate text-sm sm:text-base">
                        {item.name}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
