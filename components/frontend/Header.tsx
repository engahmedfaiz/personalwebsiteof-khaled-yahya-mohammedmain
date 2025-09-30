"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Menu,
  X,
  Scale,
  Users,
  Gavel,
  BookOpen,
  MessageCircle,
} from "lucide-react";
import { memo, useCallback, useMemo } from "react";

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

interface NavigationItem {
  id: string;
  label: string;
  icon: JSX.Element;
  href: string;
}

// استخدام useMemo للبيانات الثابتة
const useNavigationItems = (): NavigationItem[] =>
  useMemo(
    () => [
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
    ],
    []
  );

// مكون منفصل للزر الرئيسي
const ConsultationButton = memo(() => (
  <Button
    asChild
    size="sm"
    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-primary/25 transition-all duration-300 hover:scale-105 group text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-3 rounded-xl"
  >
    <Link href="/contact" prefetch={true}>
      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 group-hover:rotate-12 transition-transform" />
      <span className="hidden sm:inline">احجز استشارة الآن</span>
      <span className="sm:hidden">استشارة</span>
    </Link>
  </Button>
));

ConsultationButton.displayName = "ConsultationButton";

// مكون منفصل لزر الموبايل
const MobileMenuButton = memo(
  ({
    isMobileMenuOpen,
    toggleMobileMenu,
  }: {
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
  }) => (
    <div className="fixed top-4 right-4 z-50 lg:hidden">
      <Button
        variant="outline"
        size="sm"
        onClick={toggleMobileMenu}
        className="bg-card/80 backdrop-blur-md border border-border/40 hover:bg-primary/10"
      >
        {isMobileMenuOpen ? (
          <X className="w-4 h-4" />
        ) : (
          <Menu className="w-4 h-4" />
        )}
      </Button>
    </div>
  )
);

MobileMenuButton.displayName = "MobileMenuButton";

// مكون منفصل لعنوان الصفحة
const PageTitle = memo(() => {
  const pathname = usePathname();
  const navigationItems = useNavigationItems();

  const currentPage = useMemo(
    () => navigationItems.find((item) => item.href === pathname),
    [pathname, navigationItems]
  );

  return (
    <h1 className="text-base sm:text-lg font-bold text-primary flex items-center gap-2 pr-10 sm:pr-0">
      {currentPage?.icon}
      {currentPage?.label || "صفحة"}
    </h1>
  );
});

PageTitle.displayName = "PageTitle";

export default function Header({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: HeaderProps) {
  const navigationItems = useNavigationItems();

  // استخدام useCallback لمنع إعادة التصنيع
  const toggleMobileMenu = useCallback((): void => {
    setIsMobileMenuOpen((prev) => !prev);
  }, [setIsMobileMenuOpen]);

  return (
    <>
      <MobileMenuButton
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />

      {/* الهيدر */}
      <header
        className={`
          fixed top-0 left-0 z-40 
          w-full lg:w-[calc(100%-20rem)] lg:mr-80
          bg-card/90 backdrop-blur-xl border-b border-border/50 shadow-sm
          transition-all duration-300
          ${
            isMobileMenuOpen
              ? "opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto"
              : "opacity-100"
          }
        `}
      >
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between sm:gap-6">
          <PageTitle />
          <ConsultationButton />
        </div>
      </header>
    </>
  );
}
