import Hero from "@/components/landing/Hero";
import WhatItIs from "@/components/landing/WhatItIs";
import Filter from "@/components/landing/Filter";
import Phases from "@/components/landing/Phases";
import Value from "@/components/landing/Value";
import Testimonials from "@/components/landing/Testimonials";
import About from "@/components/landing/About";
import Faq from "@/components/landing/Faq";

// ⚠ Nota operativa per Claude: questa pagina è la thank-you del quiz/form.
// È una copia ridotta di Index.tsx senza FormSection, senza StickyBar e senza CTA "Candidati".
// Quando applichi modifiche di copy/struttura/sezioni a Index.tsx, replicale qui — esclusi form e CTA.

const navLinks = [
  { href: "#cosa", label: "Cos’è" },
  { href: "#funziona", label: "Come funziona" },
  { href: "#regaliamo", label: "Cosa ricevi" },
  { href: "#metodo", label: "Metodo" },
  { href: "#faq", label: "FAQ" },
];

const Grazie = () => {
  return (
    <div className="bg-background text-foreground">
      {/* Confirmation banner */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3 flex items-center gap-3 text-sm sm:text-base">
          <span className="font-display text-xl leading-none" aria-hidden>✓</span>
          <p className="leading-snug">
            <strong className="font-bold uppercase tracking-wide">Candidatura ricevuta.</strong>{" "}
            Ti scriviamo su WhatsApp entro 24 ore. Nel frattempo, scopri come funziona il programma.
          </p>
        </div>
      </div>

      {/* Announcement bar */}
      <div className="bg-charcoal text-charcoal-foreground">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-10 flex items-center justify-between gap-4 text-[12px] sm:text-[13px]">
          <div className="flex items-center gap-2 font-mono uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-warn live-dot" />
            <span className="opacity-90">Ti chiamiamo entro 24 ore</span>
          </div>
          <div className="hidden sm:flex items-center gap-5 font-mono uppercase tracking-widest opacity-80">
            <span>Roma &middot; Ardeatino</span>
            <span>&middot;</span>
            <span>Sabato 23 Maggio 2026</span>
          </div>
        </div>
      </div>

      {/* Sticky header (no Candidati CTA) */}
      <header className="sticky top-0 z-40 backdrop-blur bg-background/85 border-b border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src="/logo-wt.png" alt="Wellness Town" className="h-8 w-auto" />
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-foreground/70">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-primary transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <Hero hideCTA />
        <WhatItIs />
        <Filter />
        <Phases />
        <Value />
        <Testimonials />
        <About />
        <Faq />
      </main>

      {/* Footer */}
      <footer className="bg-charcoal text-charcoal-foreground/70 px-5 sm:px-8 py-14 border-t border-charcoal-foreground/10">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 text-sm">
          <div className="col-span-12 md:col-span-4">
            <img
              src="/logo-wt.png"
              alt="Wellness Town"
              className="h-9 w-auto mb-4 brightness-0 invert opacity-90"
            />
            <p className="leading-relaxed">
              by Appiae Sport ssd arl
              <br />
              Via F. Giangiacomo, 55 &mdash; Roma
              <br />
              P.IVA 17326171000
            </p>
          </div>
          <div className="col-span-6 md:col-span-3">
            <p className="font-bold text-charcoal-foreground mb-3 font-mono uppercase tracking-widest text-[12px]">
              Contatti
            </p>
            <a href="tel:+390651390560" className="block hover:text-charcoal-foreground transition-colors">
              Tel &middot; 06 5139 056
            </a>
            <a
              href="https://wa.me/390651390560"
              className="block hover:text-charcoal-foreground transition-colors"
            >
              WhatsApp &middot; 06 5139 056
            </a>
            <a
              href="mailto:info@wellnesstown.org"
              className="block hover:text-charcoal-foreground transition-colors"
            >
              info@wellnesstown.org
            </a>
          </div>
          <div className="col-span-6 md:col-span-3">
            <p className="font-bold text-charcoal-foreground mb-3 font-mono uppercase tracking-widest text-[12px]">
              Naviga
            </p>
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="block hover:text-charcoal-foreground transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="col-span-12 md:col-span-2 md:text-right text-charcoal-foreground/40">
            <p>&copy; {new Date().getFullYear()} Wellness Town</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Grazie;
