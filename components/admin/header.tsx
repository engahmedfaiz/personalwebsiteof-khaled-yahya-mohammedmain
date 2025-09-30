// "use client"

// import { useSession, signOut } from "next-auth/react"
// import { Button } from "@/components/ui/button"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Bell, LogOut, User } from "lucide-react"

// export function AdminHeader() {
//   const sessionResult = useSession()
//   const session = sessionResult?.data

//   const handleSignOut = () => {
//     signOut({ callbackUrl: "/admin/login" })
//   }

//   return (
//     <header className="bg-white shadow-sm border-b px-6 py-4">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-800">مرحباً، {session?.user?.name || "المستخدم"}</h1>
//           <p className="text-slate-600">إدارة مكتب المحاماة</p>
//         </div>

//         <div className="flex items-center space-x-4 space-x-reverse">
//           <Button variant="ghost" size="icon" className="relative">
//             <Bell className="h-5 w-5" />
//             <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
//               3
//             </span>
//           </Button>

//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="relative h-10 w-10 rounded-full">
//                 <Avatar className="h-10 w-10">
//                   <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
//                   <AvatarFallback>{session?.user?.name?.charAt(0) || "U"}</AvatarFallback>
//                 </Avatar>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-56" align="end" forceMount>
//               <DropdownMenuLabel className="font-normal">
//                 <div className="flex flex-col space-y-1">
//                   <p className="text-sm font-medium leading-none">{session?.user?.name || "المستخدم"}</p>
//                   <p className="text-xs leading-none text-muted-foreground">{session?.user?.email || ""}</p>
//                 </div>
//               </DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>
//                 <User className="mr-2 h-4 w-4" />
//                 <span>الملف الشخصي</span>
//               </DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem onClick={handleSignOut}>
//                 <LogOut className="mr-2 h-4 w-4" />
//                 <span>تسجيل الخروج</span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//     </header>
//   )
// }

// "use client";

// import { useSession, signOut } from "next-auth/react";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Bell,
//   LogOut,
//   User,
//   Settings,
//   Mail,
//   Shield,
//   Sun,
//   Moon,
//   Menu,
// } from "lucide-react";
// import { useState, useEffect } from "react";

// export function AdminHeader({ onMenuToggle }: { onMenuToggle?: () => void }) {
//   const sessionResult = useSession();
//   const session = sessionResult?.data;
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkDevice = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkDevice();
//     window.addEventListener("resize", checkDevice);
//     return () => window.removeEventListener("resize", checkDevice);
//   }, []);

//   const handleSignOut = () => {
//     signOut({ callbackUrl: "/admin/login" });
//   };

//   return (
//     <header className="bg-white shadow-sm border-b border-neutral-200 px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
//       <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 sm:gap-4">
//         {/* Title Section */}
//         <div className="flex items-center gap-3 w-full xs:w-auto">
//           {isMobile && onMenuToggle && (
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={onMenuToggle}
//               className="h-8 w-8 text-amber-600 flex-shrink-0"
//             >
//               <Menu className="h-4 w-4" />
//             </Button>
//           )}

//           <div className="flex-1 min-w-0">
//             <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-800 truncate">
//               مرحباً، {session?.user?.name || "المستخدم"}
//             </h1>
//             <p className="text-amber-600 text-xs sm:text-sm lg:text-base mt-1 font-medium truncate">
//               {new Date().toLocaleDateString("ar-SA", {
//                 weekday: "long",
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//               })}
//             </p>
//           </div>
//         </div>

//         {/* Actions Section */}
//         <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 w-full xs:w-auto justify-between xs:justify-normal">
//           {/* Dark Mode Toggle */}
//           <Button
//             variant="ghost"
//             size="icon"
//             className="h-8 w-8 sm:h-9 sm:w-9 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
//           >
//             <Sun className="h-3 w-3 sm:h-4 sm:w-4" />
//           </Button>

//           {/* Notifications */}
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="relative h-8 w-8 sm:h-9 sm:w-9 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
//               >
//                 <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
//                 <span className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 bg-amber-500 rounded-full text-[10px] sm:text-xs text-white flex items-center justify-center font-medium border-2 border-white">
//                   3
//                 </span>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-80 max-w-[90vw]" align="end">
//               <DropdownMenuLabel className="flex items-center justify-between">
//                 <span className="text-amber-700">الإشعارات</span>
//                 <span className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full">
//                   3 جديد
//                 </span>
//               </DropdownMenuLabel>
//               <DropdownMenuSeparator />

//               <div className="max-h-64 overflow-y-auto">
//                 <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer hover:bg-amber-50">
//                   <div className="p-2 bg-amber-100 rounded-full flex-shrink-0">
//                     <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-amber-600" />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-neutral-800 truncate">
//                       طلب استشارة جديد
//                     </p>
//                     <p className="text-xs text-neutral-600 truncate">
//                       عميل جديد يطلب استشارة قانونية
//                     </p>
//                     <span className="text-xs text-amber-600">منذ 5 دقائق</span>
//                   </div>
//                 </DropdownMenuItem>
//               </div>
//             </DropdownMenuContent>
//           </DropdownMenu>

//           {/* User Menu */}
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button
//                 variant="ghost"
//                 className="relative h-8 w-8 sm:h-9 sm:w-9 p-0 rounded-full border-2 border-transparent hover:border-amber-200 transition-all duration-200"
//               >
//                 <Avatar className="h-6 w-6 sm:h-7 sm:w-7">
//                   <AvatarImage src={session?.user?.image || ""} />
//                   <AvatarFallback className="bg-gradient-to-br from-amber-500 to-yellow-600 text-white text-xs">
//                     {session?.user?.name?.charAt(0) || "U"}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div className="absolute -bottom-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-amber-500 rounded-full border-2 border-white"></div>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-56 max-w-[90vw]" align="end">
//               <DropdownMenuLabel className="font-normal p-3">
//                 <div className="flex flex-col space-y-2">
//                   <div className="flex items-center gap-3">
//                     <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
//                       <AvatarImage src={session?.user?.image || ""} />
//                       <AvatarFallback className="bg-gradient-to-br from-amber-500 to-yellow-600 text-white text-sm">
//                         {session?.user?.name?.charAt(0) || "U"}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm font-medium text-neutral-800 truncate">
//                         {session?.user?.name || "المستخدم"}
//                       </p>
//                       <p className="text-xs text-amber-600 truncate">
//                         مدير النظام
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </DropdownMenuLabel>

//               <DropdownMenuSeparator />

//               <DropdownMenuItem className="flex items-center gap-2 p-2 cursor-pointer hover:bg-amber-50 text-amber-700 text-sm">
//                 <User className="h-4 w-4" />
//                 <span>الملف الشخصي</span>
//               </DropdownMenuItem>

//               <DropdownMenuSeparator />

//               <DropdownMenuItem
//                 onClick={handleSignOut}
//                 className="flex items-center gap-2 p-2 cursor-pointer text-amber-700 hover:bg-amber-50 text-sm"
//               >
//                 <LogOut className="h-4 w-4" />
//                 <span>تسجيل الخروج</span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>

//       {/* Quick Stats Bar - Hidden on mobile */}
//       {!isMobile && (
//         <div className="flex flex-wrap gap-3 lg:gap-4 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-neutral-100">
//           <div className="flex items-center gap-2">
//             <div className="w-2 h-2 sm:w-3 sm:h-3 bg-amber-500 rounded-full"></div>
//             <span className="text-xs sm:text-sm text-amber-600">نشط الآن</span>
//           </div>

//           <div className="flex items-center gap-2">
//             <div className="w-2 h-2 sm:w-3 sm:h-3 bg-amber-400 rounded-full"></div>
//             <span className="text-xs sm:text-sm text-amber-600">
//               24 مستخدم متصل
//             </span>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }
"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, LogOut, User, Sun, Menu, Mail } from "lucide-react";

export function AdminHeader({ onMenuToggle }: { onMenuToggle?: () => void }) {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/admin/login" });
  };

  return (
    <header className="bg-white shadow-sm border-b border-neutral-200 px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
      <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 sm:gap-4">
        {/* Title Section */}
        <div className="flex items-center gap-3 w-full xs:w-auto">
          {/* زر القائمة للموبايل */}
          {onMenuToggle && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuToggle}
              aria-label="فتح القائمة"
              className="h-8 w-8 text-amber-600 flex-shrink-0 md:hidden"
            >
              <Menu className="h-4 w-4" />
            </Button>
          )}

          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-800 truncate">
              مرحباً، {session?.user?.name || "المستخدم"}
            </h1>
            <p className="text-amber-600 text-xs sm:text-sm lg:text-base mt-1 font-medium truncate">
              {new Date().toLocaleDateString("ar-SA", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 w-full xs:w-auto justify-between xs:justify-normal">
          <Button
            variant="ghost"
            size="icon"
            aria-label="تبديل الوضع الليلي"
            className="hidden sm:flex h-8 w-8 sm:h-9 sm:w-9 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
          >
            <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="الإشعارات"
                className="relative h-8 w-8 sm:h-9 sm:w-9 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
              >
                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 bg-amber-500 rounded-full text-[10px] sm:text-xs text-white flex items-center justify-center font-medium border-2 border-white">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 max-w-[90vw]" align="end">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span className="text-amber-700">الإشعارات</span>
                <span className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full">
                  3 جديد
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-64 overflow-y-auto">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer hover:bg-amber-50">
                  <div className="p-2 bg-amber-100 rounded-full flex-shrink-0">
                    <Mail className="h-4 w-4 text-amber-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-800 truncate">
                      طلب استشارة جديد
                    </p>
                    <p className="text-xs text-neutral-600 truncate">
                      عميل جديد يطلب استشارة قانونية
                    </p>
                    <span className="text-xs text-amber-600">منذ 5 دقائق</span>
                  </div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                aria-label="القائمة الشخصية"
                className="relative h-8 w-8 sm:h-9 sm:w-9 p-0 rounded-full border-2 border-transparent hover:border-amber-200 transition-all duration-200"
              >
                <Avatar className="h-6 w-6 sm:h-7 sm:w-7">
                  <AvatarImage src={session?.user?.image || ""} />
                  <AvatarFallback className="bg-gradient-to-br from-amber-500 to-yellow-600 text-white text-xs">
                    {session?.user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-amber-500 rounded-full border-2 border-white"></div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 max-w-[90vw]" align="end">
              <DropdownMenuLabel className="font-normal p-3">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                      <AvatarImage src={session?.user?.image || ""} />
                      <AvatarFallback className="bg-gradient-to-br from-amber-500 to-yellow-600 text-white text-sm">
                        {session?.user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-800 truncate">
                        {session?.user?.name || "المستخدم"}
                      </p>
                      <p className="text-xs text-amber-600 truncate">
                        مدير النظام
                      </p>
                    </div>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 p-2 cursor-pointer hover:bg-amber-50 text-amber-700 text-sm">
                <User className="h-4 w-4" />
                <span>الملف الشخصي</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="flex items-center gap-2 p-2 cursor-pointer text-amber-700 hover:bg-amber-50 text-sm"
              >
                <LogOut className="h-4 w-4" />
                <span>تسجيل الخروج</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="hidden md:flex flex-wrap gap-3 lg:gap-4 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-neutral-100">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-amber-500 rounded-full"></div>
          <span className="text-xs sm:text-sm text-amber-600">نشط الآن</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-amber-400 rounded-full"></div>
          <span className="text-xs sm:text-sm text-amber-600">
            24 مستخدم متصل
          </span>
        </div>
      </div>
    </header>
  );
}
