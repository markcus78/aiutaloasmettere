const rows = [
  {
    n: "01",
    title: "Chi partecipa si chiama Rookie.",
    body: "Non perché non sa fare le cose. Perché ha deciso di iniziare a farle.",
  },
  {
    n: "02",
    title: "5 settimane. Una regola.",
    body: "Non saltare mai due volte di fila. Il resto lo costruisci tu, con il tuo trainer.",
  },
  {
    n: "03",
    title: "Non promettiamo un fisico.",
    body: 'Promettiamo un\'abitudine. Quando finiamo, alla domanda "vai in palestra?" rispondi sì senza pensarci.',
  },
  {
    n: "04",
    title: "Zero costi. Nessuna vendita nascosta.",
    body: 'Niente carta di credito. Niente abbonamento "in regalo per il primo mese". Se vorrai continuare, lo decidi alla fine — non adesso.',
  },
];

const WhatItIs = () => (
  <section id="cosa" className="px-5 sm:px-8 py-24 sm:py-32 border-b border-border">
    <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
      <div className="col-span-12 md:col-span-4">
        <div className="sticky top-24">
          <p className="sec-num mb-3">02 / Cos&apos;è</p>
          <h2 className="font-display text-5xl sm:text-7xl leading-[0.95]">
            Non è una<br />prova omaggio.
          </h2>
          <p className="mt-6 text-ink2 text-lg leading-relaxed">
            È un percorso. Strutturato, gratuito, con un trainer dedicato. Pensato per una persona sola:{" "}
            <strong className="text-foreground">chi ha sempre rimandato</strong>.
          </p>
        </div>
      </div>

      <div className="col-span-12 md:col-span-8">
        <div className="divide-y divide-border border-t border-b border-border">
          {rows.map((row) => (
            <div key={row.n} className="p-6 sm:p-8 grid grid-cols-12 gap-4 items-start">
              <div className="col-span-2 sm:col-span-1 font-mono text-muted-foreground text-sm">
                {row.n}
              </div>
              <div className="col-span-10 sm:col-span-11">
                <p className="font-display text-2xl sm:text-3xl tracking-wide mb-2">{row.title}</p>
                <p className="text-ink2 leading-relaxed">{row.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhatItIs;
