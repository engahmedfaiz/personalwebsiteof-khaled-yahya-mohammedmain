"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Scale,
  Phone,
  MessageCircle,
  Users,
  Gavel,
  BookOpen,
  Mail,
  MapPin,
  Briefcase,
  Shield,
} from "lucide-react";

interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

interface NavigationItem {
  id: string;
  label: string;
  icon: JSX.Element;
  href: string;
}

export default function Sidebar({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: SidebarProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const pathname = usePathname(); // 🔥 الرابط الحالي

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const navigationItems: NavigationItem[] = [
    {
      id: "home",
      label: "الرئيسية",
      icon: <Scale className="w-4 h-4" />,
      href: "/",
    },
    {
      id: "about",
      label: "من نحن",
      icon: <Users className="w-4 h-4" />,
      href: "/about",
    },
    {
      id: "services",
      label: "خدماتنا",
      icon: <Gavel className="w-4 h-4" />,
      href: "/services",
    },
    {
      id: "team",
      label: "فريق العمل",
      icon: <Users className="w-4 h-4" />,
      href: "/team",
    },
    {
      id: "blog",
      label: "المقالات",
      icon: <BookOpen className="w-4 h-4" />,
      href: "/blog",
    },
    {
      id: "contact",
      label: "اتصل بنا",
      icon: <MessageCircle className="w-4 h-4" />,
      href: "/contact",
    },
  ];

  return (
    <div
      className={`fixed right-0 top-0 h-full w-full sm:w-80 lg:w-80 bg-card/95 backdrop-blur-xl border-l border-border/50 p-4 sm:p-8 overflow-y-auto transition-all duration-1000 z-40 ${
        isLoaded ? "translate-x-0" : "translate-x-full"
      } ${
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="space-y-6 sm:space-y-8">
        {/* Profile Section */}
        <div className="text-center space-y-3 sm:space-y-4 animate-in fade-in slide-in-from-right-4 duration-1000 delay-300">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-full animate-pulse" />
            <div
              className="absolute -inset-2 border border-primary/30 rounded-full animate-spin"
              style={{ animationDuration: "20s" }}
            />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/20">
              <Scale className="w-10 h-10 sm:w-12 sm:h-12 text-primary animate-in zoom-in duration-1000 delay-700 drop-shadow-lg" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold text-balance bg-gradient-to-l from-primary via-foreground to-primary bg-clip-text text-transparent">
              مكتب المحامي خالد يحيى الناصر
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground font-medium">
              محامي ومستشار قانوني
            </p>
            <p className="text-xs sm:text-sm text-primary font-semibold">
              مترافع أمام المحكمة العليا
            </p>
            <div className="flex flex-wrap gap-1 justify-center mt-2">
              <Badge
                variant="secondary"
                className="text-xs bg-primary/10 text-primary border-primary/20"
              >
                <Briefcase className="w-3 h-3 ml-1" />
                محكم دولي
              </Badge>
              <Badge
                variant="secondary"
                className="text-xs bg-primary/10 text-primary border-primary/20"
              >
                <Shield className="w-3 h-3 ml-1" />
                10+ سنة خبرة
              </Badge>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navigationItems.map((item: NavigationItem, index: number) => {
            const isActive = pathname === item.href; // 🔥 يحدد القسم الحالي
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`w-full flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-right transition-all duration-300 group animate-in slide-in-from-right-4 text-sm sm:text-base relative overflow-hidden ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "hover:bg-secondary/50 text-muted-foreground hover:text-foreground hover:scale-102"
                }`}
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                {isActive && (
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1 right-1 w-2 h-2 border border-primary-foreground/30 rotate-45" />
                    <div className="absolute bottom-1 left-1 w-2 h-2 border border-primary-foreground/30 rounded-full" />
                  </div>
                )}
                <div className="group-hover:scale-110 transition-transform duration-300 relative z-10">
                  {item.icon}
                </div>
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Contact Info */}
        <div className="space-y-3 pt-4 border-t border-border/50 animate-in fade-in duration-1000 delay-800">
          <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer group">
            <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-primary group-hover:scale-110 transition-transform" />
            <span>770461195</span>
          </div>
          <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer group">
            <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-primary group-hover:scale-110 transition-transform" />
            <span className="break-all">Khalid77791@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer group">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary group-hover:scale-110 transition-transform" />
            <span>صنعاء - شارع النصر</span>
          </div>
        </div>
      </div>
    </div>
  );
}
