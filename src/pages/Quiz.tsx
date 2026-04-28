import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const WEBHOOK = "https://hooks.zapier.com/hooks/catch/1842375/uvdpto7/";

type Sesso = "m" | "f";
type Q6Answer = "lunedi" | "non-ci-penso" | "mi-muovo";
type TipoBase = "cronico" | "pentito" | "falso";
type Step = "sesso" | 1 | 2 | 3 | 4 | 5 | "q6" | "result" | "done";

const domande = [
  {
    testo: "Quando fai la spesa, compri l'acqua in cassetta e la porti in casa senza aiuto?",
    risposte: [
      { label: "Si, sempre", active: true },
      { label: "No, mi faccio aiutare (o compro le bottigliette)", active: false },
    ],
  },
  {
    testo: "Devi salire al primo piano di un palazzo. Prendi le scale o l'ascensore?",
    risposte: [
      { label: "Le scale", active: true },
      { label: "L'ascensore", active: false },
    ],
  },
  {
    testo: "Quando cerchi un parcheggio...",
    risposte: [
      { label: "Parcheggio nel primo posto libero che trovo", active: true },
      { label: "Cerco il posto piu vicino possibile all'ingresso", active: false },
    ],
  },
  {
    testo: "Sei al mare, sdraiato al sole. Vuoi una granita.",
    risposte: [
      { label: "Mi alzo e la vado a prendere al chiosco", active: true },
      { label: "Aspetto che passi il carretto", active: false },
    ],
  },
  {
    testo: "Sei sul divano. Si scaricano le batterie del telecomando.",
    risposte: [
      { label: "Mi alzo e cambio canale dalla TV", active: true },
      { label: "Vedo quello che trasmettono", active: false },
    ],
  },
];

const q6Opzioni: { label: string; value: Q6Answer }[] = [
  { label: "Spesso — ci penso da anni ma non parto mai", value: "lunedi" },
  { label: "Non me lo dico mai — sinceramente non ci penso", value: "non-ci-penso" },
  { label: "Non serve — mi muovo gia, solo non lo chiamo sport", value: "mi-muovo" },
];

function getType(score: number, q6: Q6Answer): TipoBase {
  if (q6 === "mi-muovo") return "falso";
  if (q6 === "non-ci-penso") return score <= 2 ? "cronico" : "pentito";
  return score >= 4 ? "falso" : "pentito";
}

const risultati: Record<TipoBase, Record<Sesso, { titolo: string; descrizione: string }>> = {
  cronico: {
    m: {
      titolo: "Il Cronico",
      descrizione:
        "Il divano e il tuo habitat naturale. Non ti senti in colpa: e una scelta di vita. L'ultima volta che hai corso e stato per prendere l'autobus, e non ci sei arrivato lo stesso.",
    },
    f: {
      titolo: "La Cronica",
      descrizione:
        "Il divano e il tuo habitat naturale. Non ti senti in colpa: e una scelta di vita. L'ultima volta che hai corso e stato per prendere l'autobus, e non ci sei arrivata lo stesso.",
    },
  },
  pentito: {
    m: {
      titolo: "Il Pentito",
      descrizione:
        "In teoria vuoi muoverti. In pratica hai tre paia di scarpe da ginnastica nuove e nessun allenamento fatto. Ogni lunedi e quello buono. Ogni lunedi.",
    },
    f: {
      titolo: "La Pentita",
      descrizione:
        "In teoria vuoi muoverti. In pratica hai tre paia di scarpe da ginnastica nuove e nessun allenamento fatto. Ogni lunedi e quello buono. Ogni lunedi.",
    },
  },
  falso: {
    m: {
      titolo: "Il Falso",
      descrizione:
        "Ti lamenti di non muoverti mai, ma le risposte dicono altro. Il problema non sei tu: non ti sei mai dato una struttura vera.",
    },
    f: {
      titolo: "La Falsa",
      descrizione:
        "Ti lamenti di non muoverti mai, ma le risposte dicono altro. Il problema non sei tu: non ti sei mai data una struttura vera.",
    },
  },
};

function ProgressBar({ value, dark }: { value: number; dark?: boolean }) {
  return (
    <div className={`h-1 w-full ${dark ? "bg-charcoal-foreground/10" : "bg-border"}`}>
      <div
        className="h-full bg-primary transition-all duration-500 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function Quiz() {
  const [searchParams] = useSearchParams();
  const isRef = searchParams.get("ref") === "friend";

  const [step, setStep] = useState<Step>("sesso");
  const [sesso, setSesso] = useState<Sesso | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [q6Answer, setQ6Answer] = useState<Q6Answer | null>(null);
  const [nome, setNome] = useState("");
  const [telefono, setTelefono] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const score = answers.filter(Boolean).length;
  const tipo = q6Answer ? getType(score, q6Answer) : null;
  const result = tipo && sesso ? risultati[tipo][sesso] : null;

  const progressValue =
    step === "sesso" ? 0
    : step === 1 ? 12
    : step === 2 ? 25
    : step === 3 ? 40
    : step === 4 ? 55
    : step === 5 ? 70
    : step === "q6" ? 85
    : 100;

  const handleQ = (active: boolean, idx: number) => {
    const next = [...answers];
    next[idx] = active;
    setAnswers(next);
    if (idx < 4) setStep((idx + 2) as Step);
    else setStep("q6");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          telefono,
          tipo: result?.titolo ?? "",
          score,
          sesso,
          canale: isRef ? "referral" : "ads",
          fonte: "quiz-divanizzato",
        }),
      });
    } catch (_) {}
    setSubmitting(false);
    setStep("done");
  };

  // ── SESSO ──────────────────────────────────────────────────────────────────
  if (step === "sesso") {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex flex-col">
        <ProgressBar value={0} />
        <div className="flex-1 flex flex-col items-center justify-center px-5 text-center">
          <div className="flex items-center gap-3 mb-8">
            <img src="/aas-logo.png" alt="Aiutalo a Smettere" className="w-10 h-10" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Aiutalo a Smettere
            </span>
          </div>
          <h1 className="font-display text-6xl sm:text-8xl leading-none mb-3">
            CHE DIVANIZZATO SEI?
          </h1>
          <p className="text-ink2 text-lg mb-12">6 domande. Nessun giudizio.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => { setSesso("m"); setStep(1); }}
              className="h-14 px-10 rounded-md bg-foreground text-background font-bold tracking-wider hover:-translate-y-px transition-transform"
            >
              Sono un uomo
            </button>
            <button
              onClick={() => { setSesso("f"); setStep(1); }}
              className="h-14 px-10 rounded-md border-2 border-foreground font-bold tracking-wider hover:-translate-y-px transition-transform"
            >
              Sono una donna
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── DOMANDE 1–5 ───────────────────────────────────────────────────────────
  if (typeof step === "number" && step >= 1 && step <= 5) {
    const q = domande[step - 1];
    return (
      <div className="min-h-screen bg-white text-gray-900 flex flex-col">
        <ProgressBar value={progressValue} />
        <div className="flex-1 flex flex-col items-center justify-center px-5 w-full max-w-xl mx-auto text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
            {step} di 6
          </p>
          <h2 className="font-display text-4xl sm:text-5xl leading-[1.05] mb-10">
            {q.testo.toUpperCase()}
          </h2>
          <div className="flex flex-col gap-3 w-full">
            {q.risposte.map((r) => (
              <button
                key={r.label}
                onClick={() => handleQ(r.active, step - 1)}
                className="w-full py-5 px-6 rounded-xl border-2 border-gray-200 bg-white text-gray-900 hover:border-primary hover:bg-primary/5 text-left font-semibold text-base transition-all"
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── DOMANDA 6 (intenzione) ────────────────────────────────────────────────
  if (step === "q6") {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex flex-col">
        <ProgressBar value={85} />
        <div className="flex-1 flex flex-col items-center justify-center px-5 w-full max-w-xl mx-auto text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
            6 di 6
          </p>
          <h2 className="font-display text-4xl sm:text-5xl leading-[1.05] mb-10">
            OGNI QUANTO TI DICI "INIZIO LUNEDI"?
          </h2>
          <div className="flex flex-col gap-3 w-full">
            {q6Opzioni.map((o) => (
              <button
                key={o.value}
                onClick={() => { setQ6Answer(o.value); setStep("result"); }}
                className="w-full py-5 px-6 rounded-xl border-2 border-gray-200 bg-white text-gray-900 hover:border-primary hover:bg-primary/5 text-left font-semibold text-base transition-all"
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── RISULTATO ─────────────────────────────────────────────────────────────
  if (step === "result" && result) {
    return (
      <div className="min-h-screen bg-charcoal text-charcoal-foreground flex flex-col">
        <ProgressBar value={100} dark />
        <div className="flex-1 flex flex-col items-center justify-center px-5 w-full max-w-lg mx-auto text-center py-16">
          <p className="font-mono text-xs uppercase tracking-widest text-charcoal-foreground/50 mb-4">
            Il tuo risultato
          </p>
          <h1 className="font-display text-7xl sm:text-8xl text-primary leading-none mb-6">
            {result.titolo.toUpperCase()}
          </h1>
          <p className="text-lg leading-relaxed text-charcoal-foreground/80 mb-12 max-w-sm">
            {result.descrizione}
          </p>
          <div className="w-full border border-charcoal-foreground/15 rounded-2xl p-6 sm:p-8 text-left">
            <p className="font-display text-3xl leading-none mb-1">C'e speranza.</p>
            <p className="text-charcoal-foreground/60 text-sm mb-6">
              Candidati ad{" "}
              <strong className="text-charcoal-foreground">Aiutalo a Smettere</strong> —
              5 settimane, 100% gratuito, Roma Sud.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Il tuo nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="w-full h-12 px-4 rounded-lg bg-charcoal-foreground/10 border border-charcoal-foreground/20 text-charcoal-foreground placeholder:text-charcoal-foreground/40 focus:outline-none focus:border-primary"
              />
              <input
                type="tel"
                placeholder="Telefono (ti scriviamo su WhatsApp)"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
                className="w-full h-12 px-4 rounded-lg bg-charcoal-foreground/10 border border-charcoal-foreground/20 text-charcoal-foreground placeholder:text-charcoal-foreground/40 focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                disabled={submitting}
                className="h-12 rounded-lg bg-primary text-primary-foreground font-bold tracking-wider hover:-translate-y-px transition-transform disabled:opacity-50"
              >
                {submitting ? "..." : "CANDIDATI ORA \u2192"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ── DONE ──────────────────────────────────────────────────────────────────
  if (step === "done") {
    return (
      <div className="min-h-screen bg-charcoal text-charcoal-foreground flex flex-col items-center justify-center px-5 text-center">
        <img src="/aas-logo.png" alt="AAS" className="w-16 h-16 mb-8 opacity-80" />
        <p className="font-mono text-xs uppercase tracking-widest text-charcoal-foreground/50 mb-4">
          Fatto.
        </p>
        <h1 className="font-display text-6xl sm:text-7xl text-primary leading-none mb-4">
          CI SENTIAMO.
        </h1>
        <p className="text-charcoal-foreground/70 mb-10 max-w-sm leading-relaxed">
          {isRef
            ? "Il tuo amico ti ha gia messo sulla strada giusta. Ti scriviamo su WhatsApp entro 24 ore."
            : "Ti scriviamo su WhatsApp entro 24 ore. Nel frattempo, scopri come funziona il programma."}
        </p>
        <a
          href="/"
          className="h-12 px-8 inline-flex items-center rounded-lg border border-charcoal-foreground/20 font-bold tracking-wider hover:-translate-y-px transition-transform"
        >
          SCOPRI IL PROGRAMMA \u2192
        </a>
      </div>
    );
  }

  return null;
}
