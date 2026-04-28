const testimonials = [
  {
    quote: "\u201cHo cominciato 14 volte negli ultimi 10 anni. \u00c8 la prima che continuo dopo le 5 settimane.\u201d",
    name: "Marco \u00b7 41",
    edition: "Edizione Settembre 2025 \u00b7 oggi va 3 volte a settimana",
    dark: false,
  },
  {
    quote: "\u201cPensavo di essere il problema. Era il \u2018da solo\u2019 il problema.\u201d",
    name: "Giulia \u00b7 33",
    edition: "Edizione Febbraio 2026",
    dark: true,
  },
  {
    quote: "\u201cMi serviva qualcuno che si arrabbiasse se non venivo. Ho trovato Stefano.\u201d",
    name: "Andrea \u00b7 52",
    edition: "Edizione Settembre 2025",
    dark: false,
  },
];

const stats = [
  { value: "87%", label: "dei Rookie continua dopo le 5 settimane" },
  { value: "11/12", label: "presenza media agli allenamenti" },
  { value: "2003", label: "anno di apertura di Wellness Town" },
  { value: "31.574", label: "persone hanno scelto Wellness Town" },
];

const Testimonials = () => (
  <section
    id="testimonianze"
    className="px-5 sm:px-8 py-24 sm:py-32 border-b border-border"
  >
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-12 gap-8 mb-12 items-end">
        <div className="col-span-12 md:col-span-7">
          <p className="sec-num mb-3">06 / Storie vere</p>
          <h2 className="font-display text-5xl sm:text-7xl leading-[0.95]">
            Hanno smesso
            <br />
            di rimandare.
          </h2>
        </div>
        <div className="col-span-12 md:col-span-5">
          <p className="text-ink2 text-lg leading-relaxed">
            Ex Rookie delle prime due edizioni. Foto vere, parole loro.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        {testimonials.map((t) => (
          <article
            key={t.name}
            className={`col-span-12 md:col-span-4 rounded-2xl overflow-hidden flex flex-col ${
              t.dark
                ? "bg-charcoal text-charcoal-foreground"
                : "bg-card border border-border"
            }`}
          >
            <div
              className={`aspect-[4/3] flex items-center justify-center ${
                t.dark ? "stripes-dark" : "stripes"
              }`}
            >
              <p
                className={`font-mono text-[11px] uppercase tracking-widest ${
                  t.dark ? "text-charcoal-foreground/50" : "text-muted-foreground"
                }`}
              >
                [ ritratto ]
              </p>
            </div>
            <div className="p-7 flex-1 flex flex-col">
              <p className="font-display text-3xl leading-[1.05] mb-4">{t.quote}</p>
              <div
                className={`mt-auto pt-4 border-t ${
                  t.dark ? "border-charcoal-foreground/15" : "border-border"
                }`}
              >
                <p className="font-bold">{t.name}</p>
                <p
                  className={`text-sm ${
                    t.dark ? "text-charcoal-foreground/60" : "text-muted-foreground"
                  }`}
                >
                  {t.edition}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
        {stats.map((s) => (
          <div key={s.value} className="bg-background p-7">
            <p className="font-display text-5xl sm:text-6xl text-primary leading-none mb-2">
              {s.value}
            </p>
            <p className="text-ink2 text-sm leading-relaxed">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
