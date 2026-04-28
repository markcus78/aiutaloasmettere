import { useEffect, useRef, type ReactNode } from "react";

const phases = [
  {
    n: "01",
    duration: "5 min",
    name: "PRENOTA",
    body: "Ti candidi qui sotto. Non è automatico — ti chiamiamo noi entro poche ore per capire se il percorso fa per te.",
    detail: "→ Selezioniamo 30 persone su circa 80 candidature.",
    warn: false,
  },
  {
    n: "02",
    duration: "30 min",
    name: "INCONTRA",
    body: "Conosci il tuo trainer. Un caffè al bistro’, il tuo punto di partenza, gli obiettivi. E una cosa che non ti aspetti.",
    detail: "→ Settimana dal 4 al 10 maggio.",
    warn: false,
  },
  {
    n: "03",
    duration: "7 giorni",
    name: "PREPARATI",
    body: "La settimana prima del sabato non è tempo libero. Audio, micro-task, una sveglia che non spegni.",
    detail: "→ 15–22 maggio. Tutto via WhatsApp.",
    warn: false,
  },
  {
    n: "04",
    duration: "Sab 23.05",
    name: "COMINCIA",
    body: "Il sabato che cambia tutto. Tutti i Rookie insieme, in palestra, alle 10:00. Un’ora di attivazione, foto del prima, welcome kit.",
    detail: "→ Sabato 23 maggio 2026, ore 10:00.",
    warn: true,
  },
  {
    n: "05",
    duration: "5 settimane",
    name: "COSTRUISCI",
    body: "12 allenamenti pianificati. 1 incontro con il nutrizionista. Una regola: mai due assenze di fila. Il resto lo decidi tu, con il tuo trainer.",
    detail: "→ 23 maggio – 28 giugno.",
    warn: false,
  },
];

function RevealLi({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <li ref={ref} className={`reveal ${className ?? ""}`}>
      {children}
    </li>
  );
}

const Phases = () => (
  <section id="funziona" className="px-5 sm:px-8 py-24 sm:py-32 border-b border-border">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-12 gap-8 mb-16">
        <div className="col-span-12 md:col-span-7">
          <p className="sec-num mb-3">04 / Come funziona</p>
          <h2 className="font-display text-5xl sm:text-7xl leading-[0.95]">
            Cinque fasi.
            <br />
            Una alla volta.
          </h2>
        </div>
        <div className="col-span-12 md:col-span-5 flex md:items-end">
          <p className="text-ink2 text-lg leading-relaxed">
            Niente improvvisazione. Ogni settimana sa già cosa fare di te. Tu devi solo presentarti.
          </p>
        </div>
      </div>

      <ol className="relative">
        <span
          className="absolute left-[7px] sm:left-[15px] top-2 bottom-2 w-px bg-border"
          aria-hidden="true"
        />

        {phases.map((p, idx) => (
          <RevealLi
            key={p.n}
            className={`relative pl-10 sm:pl-16 ${idx < phases.length - 1 ? "pb-10" : ""}`}
          >
            {p.warn ? (
              <span className="phase-bullet-warn absolute left-0 sm:left-2 top-2" />
            ) : (
              <span className="phase-bullet absolute left-0 sm:left-2 top-2" />
            )}
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 sm:col-span-3">
                <p
                  className={`font-mono text-sm uppercase tracking-widest ${
                    p.warn ? "text-warn" : "text-muted-foreground"
                  }`}
                >
                  Fase {p.n} &middot; {p.duration}
                </p>
              </div>
              <div className="col-span-12 sm:col-span-9">
                <h3 className="font-display text-4xl sm:text-5xl mb-2">{p.name}</h3>
                <p className="text-ink2 text-lg leading-relaxed mb-3">{p.body}</p>
                <p className="text-muted-foreground text-sm">{p.detail}</p>
              </div>
            </div>
          </RevealLi>
        ))}
      </ol>
    </div>
  </section>
);

export default Phases;
