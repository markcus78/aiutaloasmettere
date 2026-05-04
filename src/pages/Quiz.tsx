import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const WEBHOOK = "https://hooks.zapier.com/hooks/catch/1842375/uvdpto7/";

type Sesso = "m" | "f";
type Q6Answer = "lunedi" | "non-ci-penso" | "mi-muovo";
type TipoBase = "cronico" | "pentito" | "falso";
type Step = "intro" | "sesso" | 1 | 2 | 3 | 4 | 5 | "q6" | "result";

const domande = [
  {
    testo: "Quando fai la spesa, compri l'acqua in cassetta e la porti in casa senza aiuto?",
    risposte: [
      { label: "Sì, sempre", active: true },
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
    testo: "Quando cerchi un parcheggio…",
    risposte: [
      { label: "Parcheggio nel primo posto libero che trovo", active: true },
      { label: "Cerco il posto più vicino possibile all'ingresso", active: false },
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
  { label: "Non serve — mi muovo già, solo non lo chiamo sport", value: "mi-muovo" },
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
        "Il divano è il tuo habitat naturale. Non ti senti in colpa: è una scelta di vita. Ma sai già che non può durare. Noi non ti diciamo che è facile — ti diciamo che questa volta non lo fai da solo.",
    },
    f: {
      titolo: "La Cronica",
      descrizione:
        "Il divano è il tuo habitat naturale. Non ti senti in colpa: è una scelta di vita. Ma sai già che non può durare. Noi non ti diciamo che è facile — ti diciamo che questa volta non lo fai da sola.",
    },
  },
  pentito: {
    m: {
      titolo: "Il Pentito",
      descrizione:
        "Hai l'impulso. Ce l'hai sempre avuto. Hai provato e hai smesso — non perché sei debole, ma perché eri solo. Ti mancava qualcuno che non ti lasciasse mollare. Questa volta il trainer ti tiene.",
    },
    f: {
      titolo: "La Pentita",
      descrizione:
        "Hai l'impulso. Ce l'hai sempre avuto. Hai provato e hai smesso — non perché sei debole, ma perché eri sola. Ti mancava qualcuno che non ti lasciasse mollare. Questa volta il trainer ti tiene.",
    },
  },
  falso: {
    m: {
      titolo: "Il Falso",
      descrizione:
        "Ti muovi già più di quanto pensi. Non ti serve motivazione — ti serve struttura. Cinque settimane per dartela, e per scoprire che in realtà non ti spaventa poi così tanto.",
    },
    f: {
      titolo: "La Falsa",
      descrizione:
        "Ti muovi già più di quanto pensi. Non ti serve motivazione — ti serve struttura. Cinque settimane per dartela, e per scoprire che in realtà non ti spaventa poi così tanto.",
    },
  },
};

const ANSWER_BTN =
  "w-full py-5 px-6 rounded-xl border-2 border-gray-200 bg-white text-gray-900 " +
  "hover:border-primary hover:bg-primary/10 active:scale-[0.99] " +
  "text-left font-semibold text-base transition-transform " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

function ProgressBar({ value, dark }: { value: number; dark?: boolean }) {
  return (
    <div className={`h-1 w-full ${dark ? "bg-charcoal-foreground/10" : "bg-gray-100"}`}>
      <div
        className="h-full bg-primary transition-[width] duration-500 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function QuizHeader() {
  return (
    <div className="px-5 sm:px-8 py-4 border-b border-gray-100 flex items-center gap-3">
      <img
        src="/aas-logo.png"
        alt="Aiutalo a Smettere"
        width={36}
        height={36}
        className="w-9 h-9 shrink-0"
      />
      <p className="text-[11px] sm:text-xs leading-snug text-gray-500">
        <strong className="text-gray-900 font-bold uppercase tracking-wide">
          Aiutalo a Smettere
        </strong>
        <span className="hidden sm:inline">{" "}&middot;{" "}</span>
        <br className="sm:hidden" />
        il programma gratuito di Wellness Town finalizzato a trasformare l&apos;allenamento in abitudine
      </p>
    </div>
  );
}

export default function Quiz() {
  const [searchParams] = useSearchParams();
  const isRef = searchParams.get("ref") === "friend";

  const [step, setStep] = useState<Step>("intro");
  const [sesso, setSesso] = useState<Sesso | null>(null);
  const [roma, setRoma] = useState<boolean | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [q6Answer, setQ6Answer] = useState<Q6Answer | null>(null);
  const [nome, setNome] = useState("");
  const [telefono, setTelefono] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const score = answers.filter(Boolean).length;
  const tipo = q6Answer ? getType(score, q6Answer) : null;
  const result = tipo && sesso ? risultati[tipo][sesso] : null;

  const progressValue =
    step === "intro" ? 0
    : step === "sesso" ? 7
    : step === 1 ? 21
    : step === 2 ? 35
    : step === 3 ? 49
    : step === 4 ? 63
    : step === 5 ? 77
    : step === "q6" ? 88
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
          roma,
          canale: isRef ? "referral" : "ads",
          fonte: "quiz-divanizzato",
        }),
      });
    } catch (_) {}
    window.location.assign("/?lead=ok");
  };

  // ── INTRO ───────────────────────────────────────────────────────────────────────────
  if (step === "intro") {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex flex-col">
        <ProgressBar value={0} />
        <div className="flex-1 flex flex-col items-center justify-center px-5 max-w-xl mx-auto w-full text-center py-12">
          <div className="flex items-center gap-3 mb-10">
            <img src="/aas-logo.png" alt="Aiutalo a Smettere" width={40} height={40} className="w-10 h-10" />
            <span className="font-mono text-xs uppercase tracking-widest text-gray-400">
              Wellness Town &middot; Roma Sud
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl leading-[0.95] mb-5">
            SEI SEDENTARIO.
            <br />
            <span className="text-primary">E LO SAI.</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-4 max-w-md">
            Se hai provato ad allenarti &mdash; e hai sempre mollato &mdash; abbiamo costruito qualcosa per te.
          </p>
          <p className="text-gray-500 text-base leading-relaxed mb-10 max-w-md">
            <strong className="text-gray-900">Aiutalo a Smettere</strong> è un percorso gratuito
            di 5 settimane con un trainer dedicato. 30 posti. Nessun abbonamento.
            Solo l&apos;allenamento, il trainer, e tu.
          </p>
          <p className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-5">
            Prima di tutto: sei di Roma?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mx-auto">
            <button
              onClick={() => { setRoma(true); setStep("sesso"); }}
              className="flex-1 h-14 rounded-xl bg-gray-900 text-white font-bold tracking-wider hover:-translate-y-px transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
            >
              Sì, sono di Roma
            </button>
            <button
              onClick={() => { setRoma(false); setStep("sesso"); }}
              className="flex-1 h-14 rounded-xl border-2 border-gray-300 text-gray-700 font-bold tracking-wider hover:border-gray-500 hover:-translate-y-px transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
            >
              No, sono altrove
            </button>
          </div>
          <p className="text-gray-400 text-xs mt-5">6 domande &middot; 2 minuti</p>
        </div>
      </div>
    );
  }

  // ── SESSO ──────────────────────────────────────────────────────────────────────────
  if (step === "sesso") {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex flex-col">
        <ProgressBar value={7} />
        <QuizHeader />
        <div className="flex-1 flex flex-col items-center justify-center px-5 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-6">
            Prima di iniziare
          </p>
          <h2 className="font-display text-5xl sm:text-6xl leading-none mb-10">
            CHE DIVANIZZATO SEI?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => { setSesso("m"); setStep(1); }}
              className="h-14 px-10 rounded-xl bg-gray-900 text-white font-bold tracking-wider hover:-translate-y-px transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
            >
              Sono un uomo
            </button>
            <button
              onClick={() => { setSesso("f"); setStep(1); }}
              className="h-14 px-10 rounded-xl border-2 border-gray-300 text-gray-700 font-bold tracking-wider hover:border-gray-500 hover:-translate-y-px transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
            >
              Sono una donna
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── DOMANDE 1–5 ───────────────────────────────────────────────────────────────────
  if (typeof step === "number" && step >= 1 && step <= 5) {
    const q = domande[step - 1];
    return (
      <div className="min-h-screen bg-white text-gray-900 flex flex-col">
        <ProgressBar value={progressValue} />
        <QuizHeader />
        <div className="flex-1 flex flex-col items-center justify-center px-5 w-full max-w-xl mx-auto text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-6">
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
                className={ANSWER_BTN}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── DOMANDA 6 (intenzione) ────────────────────────────────────────────────────────────────
  if (step === "q6") {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex flex-col">
        <ProgressBar value={88} />
        <QuizHeader />
        <div className="flex-1 flex flex-col items-center justify-center px-5 w-full max-w-xl mx-auto text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-6">
            6 di 6
          </p>
          <h2 className="font-display text-4xl sm:text-5xl leading-[1.05] mb-10">
            OGNI QUANTO TI DICI &ldquo;INIZIO LUNEDÌ&rdquo;?
          </h2>
          <div className="flex flex-col gap-3 w-full">
            {q6Opzioni.map((o) => (
              <button
                key={o.value}
                onClick={() => { setQ6Answer(o.value); setStep("result"); }}
                className={ANSWER_BTN}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── RISULTATO ───────────────────────────────────────────────────────────────────────────
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
            <p className="font-display text-3xl leading-none mb-1">C&apos;è speranza.</p>
            <p className="text-charcoal-foreground/60 text-sm mb-6">
              Candidati ad{" "}
              <strong className="text-charcoal-foreground">Aiutalo a Smettere</strong>{" "}
              &mdash; 5 settimane, 100% gratuito, Roma Sud.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label className="sr-only" htmlFor="quiz-nome">Nome</label>
              <input
                id="quiz-nome"
                name="nome"
                type="text"
                autoComplete="given-name"
                placeholder="Il tuo nome…"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="w-full h-12 px-4 rounded-lg bg-charcoal-foreground/10 border border-charcoal-foreground/20 text-charcoal-foreground placeholder:text-charcoal-foreground/40 focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
              />
              <label className="sr-only" htmlFor="quiz-telefono">Telefono</label>
              <input
                id="quiz-telefono"
                name="telefono"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="Telefono (ti scriviamo su WhatsApp)…"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
                className="w-full h-12 px-4 rounded-lg bg-charcoal-foreground/10 border border-charcoal-foreground/20 text-charcoal-foreground placeholder:text-charcoal-foreground/40 focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
              />
              <button
                type="submit"
                disabled={submitting}
                className="h-14 rounded-xl bg-primary text-primary-foreground font-bold tracking-wider hover:-translate-y-px active:scale-[0.99] transition-transform disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
                style={{ boxShadow: "0 8px 24px -8px hsl(178 52% 43% / 0.55)" }}
              >
                {submitting ? "Invio in corso…" : "CANDIDATI ORA →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
