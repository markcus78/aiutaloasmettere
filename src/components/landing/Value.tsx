const packageItems = [
  {
    name: "Accesso completo alla struttura",
    price: "\u20AC220",
    desc: "Palestra, piscina, corsi. Per tutta la durata del percorso.",
  },
  {
    name: "Programma personalizzato",
    price: "\u20AC280",
    desc: "Costruito con il tuo trainer. Come un piano di fisioterapia, ma per cominciare.",
  },
  {
    name: "Visita con il nutrizionista",
    price: "\u20AC80",
    desc: "A met\u00e0 percorso, per fare il punto.",
  },
  {
    name: "Badge di accesso",
    price: "\u20AC15",
    desc: "Niente cauzione. Per i Rookie \u00e8 in omaggio.",
  },
  {
    name: "Welcome kit",
    price: "\u20AC25",
    desc: "Cosa c\u2019\u00e8 dentro lo scopri il sabato.",
  },
];

const Value = () => (
  <section id="regaliamo" className="px-5 sm:px-8 py-24 sm:py-32 bg-cream border-b border-border">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-12 gap-8 mb-12">
        <div className="col-span-12 md:col-span-7">
          <p className="sec-num mb-3">05 / Cosa ricevi</p>
          <h2 className="font-display text-5xl sm:text-7xl leading-[0.95]">
            Vale <span className="strike-out text-muted-foreground">\u20AC620</span>
            <br />
            Lo paghi <span className="text-primary">\u20AC0</span>.
          </h2>
        </div>
        <div className="col-span-12 md:col-span-5 flex md:items-end">
          <p className="text-ink2 text-lg leading-relaxed">
            Tutto incluso per i 30 Rookie selezionati. Nessuna carta di credito richiesta in fase
            di candidatura.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Big card */}
        <div className="col-span-12 md:col-span-7 bg-charcoal text-charcoal-foreground rounded-2xl p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-primary/15 blur-2xl" />
          <p className="font-mono uppercase tracking-widest text-[12px] text-primary mb-6">
            Il pacchetto Rookie
          </p>
          <ul className="space-y-5 relative">
            {packageItems.map((item) => (
              <li
                key={item.name}
                className="grid grid-cols-12 gap-4 items-start pb-5 border-b border-charcoal-foreground/10"
              >
                <span className="col-span-9 font-display text-2xl tracking-wide">{item.name}</span>
                <span className="col-span-3 text-right font-mono text-sm text-charcoal-foreground/70 line-through">
                  {item.price}
                </span>
                <p className="col-span-12 text-charcoal-foreground/70 leading-relaxed -mt-1">
                  {item.desc}
                </p>
              </li>
            ))}
            <li className="grid grid-cols-12 gap-4 items-baseline pt-3">
              <span className="col-span-7 font-display text-3xl tracking-wide">Totale Rookie</span>
              <span className="col-span-5 text-right">
                <span className="font-display text-3xl text-charcoal-foreground/40 line-through mr-2">
                  \u20AC620
                </span>
                <span className="font-display text-4xl text-primary">\u20AC0</span>
              </span>
            </li>
          </ul>
        </div>

        {/* Sidebar cards */}
        <div className="col-span-12 md:col-span-5 grid grid-cols-1 gap-4">
          <div className="bg-card border border-border rounded-2xl p-7">
            <p className="font-mono uppercase tracking-widest text-[12px] text-primary mb-3">
              La garanzia Rookie
            </p>
            <h3 className="font-display text-3xl mb-3">
              Se al primo allenamento ti accorgi che non \u00e8 per te, ce lo dici e finisce l\u00ec.
            </h3>
            <p className="text-ink2 leading-relaxed">
              Niente rimborsi perch\u00e9 non hai pagato niente. Niente domande perch\u00e9 non te
              le facciamo. Niente catena di follow-up commerciali &mdash; promesso.
            </p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-7">
            <p className="font-mono uppercase tracking-widest text-[12px] text-primary mb-3">
              Una cosa che non ti regaliamo
            </p>
            <p className="font-display text-3xl leading-tight">
              &ldquo;La scusa di non averci provato.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Value;
