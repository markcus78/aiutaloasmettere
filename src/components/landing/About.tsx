const About = () => (
  <section className="px-5 sm:px-8 py-24 sm:py-32 bg-primary text-primary-foreground border-b border-border">
    <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 items-center">
      <div className="col-span-12 md:col-span-7">
        <p className="sec-num mb-3 text-primary-foreground/70">07 / Chi siamo</p>
        <h2 className="font-display text-5xl sm:text-7xl leading-[0.95] mb-6">
          Roma Sud,
          <br />
          dal 2003.
        </h2>
        <p className="text-lg sm:text-2xl leading-relaxed text-primary-foreground/90 max-w-2xl mb-6">
          <strong>Wellness Town</strong> è la struttura sportiva più completa di Roma Sud: palestra,
          piscina, corsi, bistro&apos;. Costruiamo questo percorso perché crediamo che fare
          attività fisica non debba essere una punizione, e che cominciare non debba essere una
          solitudine.
        </p>
        <p className="text-primary-foreground/80">
          📍 Via Francesco Giangiacomo 55, Ardeatino
        </p>
      </div>
      <div className="col-span-12 md:col-span-5">
        <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-primary-foreground/20">
          <img
            src="/wellness-town-facciata.jpg"
            alt="Wellness Town, Roma Sud"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </section>
);

export default About;
