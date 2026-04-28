const testimonials = [
  {
    img: "/testimonial-marco.jpg",
    imgAlt: "Marco, 41 anni",
    quote: "“Ho cominciato 14 volte negli ultimi 10 anni. È la prima che continuo dopo le 5 settimane.”",
    name: "Marco · 41",
    edition: "Edizione Settembre 2025 · oggi va 3 volte a settimana",
    dark: false,
  },
  {
    img: "/testimonial-giulia.jpg",
    imgAlt: "Giulia, 33 anni",
    quote: "“Pensavo di essere il problema. Era il ‘da solo’ il problema.”",
    name: "Giulia · 33",
    edition: "Edizione Febbraio 2026",
    dark: true,
  },
  {
    img: "/testimonial-andrea.jpg",
    imgAlt: "Andrea, 52 anni",
    quote: "“Mi serviva qualcuno che si arrabbiasse se non venivo. Ho trovato Stefano.”",
    name: "Andrea · 52",
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
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={t.img}
                alt={t.imgAlt}
                className="w-full h-full object-cover"
              />
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
