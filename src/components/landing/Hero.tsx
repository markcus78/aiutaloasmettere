import { Fragment } from "react";

const POSTI_RIMASTI = 12;
const POSTI_TOTALI = 30;
const FILL_PCT = Math.round(((POSTI_TOTALI - POSTI_RIMASTI) / POSTI_TOTALI) * 100);

const tickerItems = [
  "5 SETTIMANE",
  "12 ALLENAMENTI",
  "1 TRAINER DEDICATO",
  "0\u20AC",
  "30 POSTI",
  "NESSUNA SCUSA",
];

const scrollToForm = () =>
  document.getElementById("candidati")?.scrollIntoView({ behavior: "smooth" });

const TickerRow = ({ hidden }: { hidden?: boolean }) => (
  <div className="flex gap-12 items-center shrink-0" aria-hidden={hidden}>
    {tickerItems.map((item) => (
      <Fragment key={item}>
        <span className="font-display text-2xl tracking-wider">{item}</span>
        <span className="text-primary font-display text-2xl">&middot;</span>
      </Fragment>
    ))}
  </div>
);

const Hero = () => (
  <>
    <section className="relative paper-grain border-b border-border overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-12 sm:pt-16 pb-20 sm:pb-24 grid grid-cols-12 gap-8">
        {/* Left */}
        <div className="col-span-12 lg:col-span-7">
          <div className="flex items-center gap-3 mb-8">
            <span className="sec-num">01 / Aiutalo a smettere</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="flex items-center gap-4 mb-6">
            <img
              src="/aas-logo.png"
              alt="Aiutalo a Smettere"
              className="w-16 h-16 sm:w-20 sm:h-20 shrink-0"
            />
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-1">
                Il programma
              </p>
              <p className="font-display text-3xl sm:text-4xl leading-none tracking-wide">
                Aiutalo a Smettere
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-secondary text-primary border border-primary/20 rounded-full px-3 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary live-dot" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em]">
              5 settimane &middot; 100% gratuito &middot; Roma Sud
            </span>
          </div>

          <h1 className="font-display text-[64px] leading-[0.92] sm:text-[96px] md:text-[116px] tracking-tight mb-6">
            HAI INIZIATO{" "}
            <br className="hidden sm:block" />
            <span className="strike-out text-muted-foreground">38 volte.</span>
            <br />
            QUESTA <span className="text-primary">\u00c8 LA 39.</span>
          </h1>

          <p className="text-lg sm:text-2xl text-ink2 max-w-2xl leading-relaxed mb-8">
            Un percorso gratuito di 5 settimane, costruito per chi{" "}
            <strong className="text-foreground">ha sempre rimandato</strong> e questa volta vuole
            farla finita. Niente prove omaggio. Niente abbonamenti nascosti.{" "}
            <span className="marker font-bold">Solo l&apos;allenamento, il trainer, e tu.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">
            <button
              onClick={scrollToForm}
              className="h-14 px-8 inline-flex items-center rounded-md bg-primary text-primary-foreground text-sm font-bold tracking-wider hover:-translate-y-px transition-transform"
              style={{
                boxShadow:
                  "0 1px 0 hsl(0 0% 0% / 0.04), 0 8px 24px -8px hsl(178 52% 43% / 0.55)",
              }}
            >
              CANDIDATI ORA &nbsp;&rarr;
            </button>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <span className="w-9 h-9 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center font-bold text-[13px] text-primary">
                  M
                </span>
                <span className="w-9 h-9 rounded-full bg-foreground/15 border-2 border-background flex items-center justify-center font-bold text-[13px]">
                  F
                </span>
                <span className="w-9 h-9 rounded-full bg-warn/20 border-2 border-background flex items-center justify-center font-bold text-[13px] text-warn">
                  L
                </span>
              </div>
              <div className="text-[13px] leading-tight">
                <p className="font-bold">Gi\u00e0 18 candidati</p>
                <p className="text-muted-foreground">in 4 giorni &middot; max 30 posti</p>
              </div>
            </div>
          </div>

          {/* Scarcity card */}
          <div className="bg-charcoal text-charcoal-foreground rounded-xl p-4 sm:p-5 max-w-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 font-mono uppercase tracking-widest text-[11px] text-warn">
                <span className="w-1.5 h-1.5 rounded-full bg-warn live-dot" />
                <span>Posti rimasti &middot; live</span>
              </div>
              <div className="font-mono uppercase tracking-widest text-[11px] opacity-70">
                Edizione &middot; Maggio 2026
              </div>
            </div>
            <div className="flex items-end justify-between gap-4">
              <div className="font-display text-5xl sm:text-6xl leading-none">
                <span>{POSTI_RIMASTI}</span>
                <span className="text-charcoal-foreground/40">/{POSTI_TOTALI}</span>
              </div>
              <div className="text-right">
                <p className="text-[12px] uppercase tracking-widest text-charcoal-foreground/60 mb-1 font-mono">
                  Sabato
                </p>
                <p className="font-display text-3xl leading-none">23 MAG</p>
              </div>
            </div>
            <div className="mt-4 h-1.5 rounded-full bg-charcoal-foreground/10 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${FILL_PCT}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right: real photos */}
        <aside className="col-span-12 lg:col-span-5 flex flex-col gap-4">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border">
            <img
              src="/hero-rookie.jpg"
              alt="Un Rookie all'uscita dallo spogliatoio"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-charcoal text-charcoal-foreground font-mono uppercase tracking-widest text-[10px] px-2 py-1 rounded">
              REC &middot; 23.05.26
            </div>
            <div className="absolute bottom-4 right-4 bg-background text-foreground font-mono uppercase tracking-widest text-[10px] px-2 py-1 rounded shadow">
              Wellness Town
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { src: "/palestra.jpg", alt: "La palestra di Wellness Town" },
              { src: "/trainer.jpg", alt: "Un trainer con un Rookie" },
              { src: "/rookie.jpg", alt: "Una Rookie che si prepara" },
            ].map(({ src, alt }) => (
              <div key={src} className="aspect-square rounded-lg overflow-hidden border border-border">
                <img src={src} alt={alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Ticker */}
      <div className="border-t border-b border-border bg-card overflow-hidden">
        <div className="ticker-track flex gap-12 py-4 whitespace-nowrap">
          <TickerRow />
          <TickerRow hidden />
        </div>
      </div>
    </section>
  </>
);

export default Hero;
