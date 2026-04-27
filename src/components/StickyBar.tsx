import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const StickyBar = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById("candidati");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("candidati")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      aria-hidden={hidden}
      className={`fixed bottom-0 inset-x-0 z-50 bg-charcoal text-charcoal-foreground border-t border-white/10 shadow-2xl transition-transform duration-300 ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <p className="text-sm sm:text-base font-semibold">
          Massimo 30 posti — <span className="text-primary-foreground/90">Sabato 23 maggio</span>
        </p>
        <Button
          onClick={scrollToForm}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold tracking-wide px-5 sm:px-7"
        >
          CANDIDATI
        </Button>
      </div>
    </div>
  );
};

export default StickyBar;
