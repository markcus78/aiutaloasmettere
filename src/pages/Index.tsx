import { ArrowDown, ChevronRight, Clock, UserCheck, Target, Dumbbell, ClipboardList, Apple, Gift, MapPin, X, Check, CreditCard, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import StickyBar from "@/components/StickyBar";
import ApplicationForm from "@/components/ApplicationForm";

const POSTI_RIMASTI = 12;
const POSTI_TOTALI = 30;

const phases = [
  { n: "1", name: "PRENOTA", teaser: "Ti candidati. Non è automatico — ti chiamiamo noi." },
  { n: "2", name: "INCONTRA", teaser: "Il tuo trainer, un caffè, e una cosa che non ti aspetti." },
  { n: "3", name: "PREPARATI", teaser: "La settimana prima del sabato non è tempo libero." },
  { n: "4", name: "COMINCIA", teaser: "Il sabato che cambia tutto. Con gli altri Rookie." },
  { n: "5", name: "COSTRUISCI", teaser: "5 settimane. 12 allenamenti. Una regola sola: non saltare mai due volte di fila. Il resto lo costruisci tu." },
];

const gifts = [
  { icon: Dumbbell, title: "Accesso completo alla struttura", desc: "Per tutta la durata del percorso." },
  { icon: ClipboardList, title: "Programma personalizzato", desc: "Costruito insieme al tuo trainer — come un piano di fisioterapia, ma per cominciare." },
  { icon: Apple, title: "Appuntamento con il nutrizionista", desc: "A meta percorso, per fare il punto." },
  { icon: CreditCard, title: "Badge di accesso in omaggio", desc: "Normalmente prevede una cauzione di 15 euro — per i Rookie e gratis." },
  { icon: Gift, title: "Welcome kit", desc: "Quello che c'e dentro lo scopri il sabato." },
];

const scrollToForm = (e: React.MouseEvent) => {
  e.preventDefault();
  document.getElementById("candidati")?.scrollIntoView({ behavior: "smooth" });
};

const Index = () => {
  return (
    <main className="bg-background text-foreground">
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col px-6 sm:px-10 pt-6 pb-32">
        <div className="flex items-center justify-between">
          <div
            aria-label="Logo Aiutalo a Smettere"
            className="inline-flex items-center justify-center bg-primary text-primary-foreground font-bold tracking-widest px-4 py-2 rounded-md text-sm"
          >
            [LOGO]
          </div>
          <span className="hidden sm:inline-block text-xs uppercase tracking-[0.25em] text-muted-foreground font-semibold">
            Wellness Town · Roma Sud
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full py-16">
          <div className="inline-flex w-fit items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-primary motion-safe:animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-bold">Percorso gratuito · 5 settimane</span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl leading-[0.95] mb-8">
            Hai iniziato a fare sport <span className="text-primary">38 volte</span>.
            <br />
            Questa è <span className="underline decoration-primary decoration-[6px] underline-offset-8">la 39.</span>
          </h1>

          <p className="text-lg sm:text-2xl text-foreground/80 max-w-3xl mb-10 leading-relaxed">
            Un percorso gratuito di 5 settimane per smettere di rimandare e iniziare davvero.
            <span className="font-semibold text-foreground"> Per sempre.</span>
          </p>

          <div className="flex flex-col gap-2 mb-10">
            <div className="inline-flex w-fit items-center gap-2 bg-destructive/10 text-destructive px-3 py-1.5 rounded-full">
              <Flame className="w-3.5 h-3.5 shrink-0" aria-hidden />
              <span className="text-sm font-bold uppercase tracking-widest">
                Ultimi {POSTI_RIMASTI} posti su {POSTI_TOTALI} — Sabato 23 maggio 2026
              </span>
            </div>
            <p className="text-muted-foreground text-base">Wellness Town — Roma Sud</p>
          </div>

          <div>
            <Button
              size="lg"
              onClick={scrollToForm}
              className="h-14 px-10 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-bold tracking-wider shadow-lg"
            >
              CANDIDATI ORA
            </Button>
          </div>
        </div>

        <div className="flex justify-center">
          <ArrowDown className="w-6 h-6 text-primary motion-safe:animate-bounce" aria-hidden />
        </div>
      </section>

      {/* DI COSA SI TRATTA */}
      <section className="px-6 sm:px-10 py-24 sm:py-32">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-display text-4xl sm:text-6xl mb-8">Di cosa si tratta</h2>
          <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed max-w-3xl mx-auto mb-8">
            <span className="font-bold text-foreground">Aiutalo a Smettere</span> non è una prova omaggio.
            Non è un corso di fitness. È un percorso gratuito e strutturato, con un trainer dedicato,
            pensato per chi ha sempre rimandato — e questa volta vuole fare sul serio.
          </p>

          <blockquote className="border-l-4 border-primary pl-5 sm:pl-6 max-w-3xl mx-auto mb-16 text-left">
            <p className="text-lg sm:text-xl font-bold leading-relaxed">
              Chi partecipa si chiama Rookie. Non perché non sa fare le cose — ma perché ha deciso di iniziare a farle.
            </p>
          </blockquote>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {[
              { Icon: Clock, label: "5 settimane di allenamento pianificato" },
              { Icon: UserCheck, label: "Un trainer che ti segue davvero" },
              { Icon: Target, label: "Zero costi — solo il tuo impegno" },
              { Icon: Check, label: "Non ti promettiamo un fisico diverso. Ti promettiamo un'abitudine diversa." },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-primary" aria-hidden />
                </div>
                <p className="font-bold text-lg leading-snug max-w-xs">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <Button
              size="lg"
              onClick={scrollToForm}
              className="h-14 px-10 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-bold tracking-wider shadow-lg"
            >
              VOGLIO UN POSTO
            </Button>
            <p className="text-sm text-muted-foreground mt-3">Ultimi {POSTI_RIMASTI} posti disponibili · Nessun costo</p>
          </div>
        </div>
      </section>

      {/* IL PERCORSO */}
      <section className="px-6 sm:px-10 py-24 sm:py-32 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-6xl mb-4">Come funziona</h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Cinque fasi. Una alla volta. Niente improvvisazione.
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {phases.map((p) => (
              <li
                key={p.n}
                className="group relative bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="font-display text-6xl text-primary leading-none mb-4">{p.n}</div>
                <h3 className="font-display text-2xl mb-3 tracking-wide">{p.name}</h3>
                <p className="text-sm text-foreground/75 leading-relaxed">{p.teaser}</p>
                <ChevronRight className="absolute top-6 right-6 w-5 h-5 text-primary/40 group-hover:text-primary group-hover:translate-x-1 transition-all" aria-hidden />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* NON FA PER TE / FA PER TE */}
      <section className="px-6 sm:px-10 py-24 sm:py-32 bg-charcoal text-charcoal-foreground">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <h2 className="font-display text-3xl sm:text-5xl mb-8 leading-tight">
              Questo percorso <span className="text-cross">non fa per te</span> se...
            </h2>
            <ul className="space-y-5">
              {[
                "Pensi di venire quando ti va",
                "Stai cercando una prova omaggio senza impegno",
                "Non hai uno smartphone",
              ].map((t) => (
                <li key={t} className="flex items-start gap-4">
                  <X className="w-6 h-6 text-cross shrink-0 mt-1" strokeWidth={3} aria-hidden />
                  <span className="text-lg leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:border-l md:border-white/15 md:pl-16">
            <h2 className="font-display text-3xl sm:text-5xl mb-8 leading-tight">
              <span className="text-check">Fa per te</span> se...
            </h2>
            <ul className="space-y-5">
              {[
                "Hai rimandato troppe volte e questa volta vuoi davvero cambiare",
                "Sai che da solo non riesci — e non c'è niente di male",
                "Sei pronto a presentarti quando hai detto che saresti venuto",
              ].map((t) => (
                <li key={t} className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-check shrink-0 mt-1" strokeWidth={3} aria-hidden />
                  <span className="text-lg leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* COSA TI REGALIAMO */}
      <section className="px-6 sm:px-10 py-24 sm:py-32">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-6xl mb-4">Cosa ti regaliamo</h2>
            <p className="text-lg sm:text-xl text-muted-foreground">Gratis. Davvero.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {gifts.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card border border-border rounded-xl p-7 flex gap-5 items-start">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-primary" aria-hidden />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 leading-snug">{title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center italic text-lg sm:text-xl mt-12 text-foreground/80 max-w-2xl mx-auto">
            "L'unica cosa che non ti regaliamo è la scusa di non averci provato."
          </p>
        </div>
      </section>

      {/* CHI SIAMO */}
      <section className="px-6 sm:px-10 py-24 sm:py-32 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <MapPin className="w-10 h-10 mx-auto mb-6 opacity-90" aria-hidden />
          <h2 className="font-display text-4xl sm:text-6xl mb-8">Chi siamo</h2>
          <p className="text-lg sm:text-xl leading-relaxed opacity-95 mb-14">
            <span className="font-bold">Wellness Town</span> è la struttura sportiva più completa di Roma Sud.
            Palestra, piscina, corsi, bistro'. Siamo a{" "}
            <span className="font-bold">Via Francesco Giangiacomo 55, Ardeatino</span>.
            Questo percorso lo abbiamo costruito perché crediamo che fare attività fisica
            non debba essere una punizione.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-primary-foreground/20 pt-12">
            <div>
              <p className="font-display text-6xl sm:text-7xl leading-none mb-2">2003</p>
              <p className="text-primary-foreground/80 text-lg">Anno di apertura — oltre 20 anni di esperienza</p>
            </div>
            <div>
              <p className="font-display text-6xl sm:text-7xl leading-none mb-2">31.574</p>
              <p className="text-primary-foreground/80 text-lg">Persone che hanno scelto Wellness Town</p>
            </div>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="candidati" className="px-6 sm:px-10 py-24 sm:py-32 scroll-mt-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-3 py-1.5 rounded-full mb-6">
              <Flame className="w-3.5 h-3.5 shrink-0" aria-hidden />
              <span className="text-sm font-bold uppercase tracking-widest">Ultimi {POSTI_RIMASTI} posti disponibili</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl mb-4">Candidati</h2>
            <p className="text-lg sm:text-xl font-semibold text-foreground/90 leading-relaxed mb-4 max-w-xl mx-auto">
              Alla fine delle 5 settimane, quando qualcuno ti chiede se vai in palestra, risponderai di sì senza pensarci.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Compila il form — ti chiamiamo entro poche ore per verificare insieme che il percorso faccia per te.
            </p>
          </div>
          <div className="bg-secondary/60 border border-border rounded-2xl p-6 sm:p-10">
            <ApplicationForm />
          </div>
        </div>
      </section>

      {/* FOOTER minimal */}
      <footer className="px-6 sm:px-10 py-10 bg-charcoal text-charcoal-foreground/70 text-center text-sm">
        <p>© {new Date().getFullYear()} Wellness Town — Via Francesco Giangiacomo 55, Roma</p>
      </footer>

      <StickyBar postiRimasti={POSTI_RIMASTI} />
      <div className="h-20" aria-hidden />
    </main>
  );
};

export default Index;
