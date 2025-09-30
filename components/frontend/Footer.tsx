import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface DeveloperInfo {
  name: string;
  phone: string;
}

export default function Footer() {
  const developers: DeveloperInfo[] = [
    { name: "المهندس هــدام زنيــج ", phone: "778080103" },
    { name: "المهندس أحمد فايز", phone: "780138083" },
    { name: "المهندس يعقوب السامدي", phone: "777352501" },
    { name: "المهندس إبراهيم بجاش", phone: "775121130" },
  ];

  return (
    <footer className="lg:mr-80 bg-card/30 border-t border-border/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <div className="text-center space-y-3 sm:space-y-4">
          <p className="text-xs sm:text-sm text-muted-foreground">
            تم التطوير بواسطة:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {developers.map((developer: DeveloperInfo, index: number) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-lg bg-card/50 border border-primary/20 hover:bg-card/80 transition-all duration-300 hover:scale-105"
              >
                <span className="font-medium text-foreground text-sm sm:text-base">
                  {developer.name}
                </span>
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                  <span className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    {developer.phone}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
