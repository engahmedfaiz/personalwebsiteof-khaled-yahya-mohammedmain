import { Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="lg:mr-80 bg-card/30 border-t border-border/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <div className="text-center space-y-3 sm:space-y-4">
          <p className="text-xs sm:text-sm text-muted-foreground">
            جميع الحقوق محفوظة © {new Date().getFullYear()} مكتب المحامي خالد الناصر
          </p>

          <p className="text-sm sm:text-base text-foreground font-medium">
            الموقع من تطوير{" "}
            <Link
              href="https://wa.me/967775121130"
              target="_blank"
              className="text-primary hover:underline"
            >
              فريق إبراهيم بجاش
            </Link>
          </p>

          <div className="flex justify-center items-center gap-2 mt-3">
            <Phone className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              775121130
            </span>
          </div>
        </div>
      </div>
    </footer>
  );}
