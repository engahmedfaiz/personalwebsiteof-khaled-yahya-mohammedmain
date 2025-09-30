import { Scale, Gavel, BookOpen } from "lucide-react";

export default function BackgroundPattern() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-primary/20 rounded-full animate-pulse" />
        <div className="absolute top-32 right-20 w-24 h-24 border border-primary/10 rotate-45" />
        <div className="absolute bottom-20 left-20 w-40 h-40 border border-primary/10 rounded-full" />
        <div className="absolute bottom-40 right-40 w-20 h-20 border-2 border-primary/20 rotate-12" />
      </div>

      <div className="absolute top-1/4 left-1/4 opacity-5 animate-float">
        <Scale className="w-16 h-16 text-primary" />
      </div>
      <div
        className="absolute top-3/4 right-1/4 opacity-5 animate-float"
        style={{ animationDelay: "1s" }}
      >
        <Gavel className="w-12 h-12 text-primary" />
      </div>
      <div
        className="absolute top-1/2 left-1/6 opacity-5 animate-float"
        style={{ animationDelay: "2s" }}
      >
        <BookOpen className="w-14 h-14 text-primary" />
      </div>
    </div>
  );
}