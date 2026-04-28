const faqs = [
  {
    q: "\u00c8 davvero gratis? Dov\u2019\u00e8 il trucco?",
    a: "Davvero. Non chiediamo carta di credito, non hai un abbonamento dormiente, non ti chiamiamo per \u201cricordarti l\u2019offerta\u201d. Lo facciamo perch\u00e9 chi finisce le 5 settimane spesso decide da solo di restare. \u00c8 pubblicit\u00e0 onesta, non un\u2019esca.",
  },
  {
    q: "Sono fuori forma. Troppo?",
    a: "No. Il percorso \u00e8 costruito per chi parte \u2014 non per chi \u00e8 gi\u00e0 allenato. Il trainer adatta tutto al tuo punto di partenza, e il primo allenamento \u00e8 di attivazione, non di prestazione.",
  },
  {
    q: "Quante volte alla settimana devo venire?",
    a: "Pianifichiamo 2\u20133 sessioni a settimana per 5 settimane (12 allenamenti totali). La regola \u00e8 una sola: niente due assenze di fila. Le date le chiudi tu con il tuo trainer.",
  },
  {
    q: "Cosa succede dopo le 5 settimane?",
    a: "Decidi tu. Puoi restare con un abbonamento di Wellness Town \u2014 i Rookie hanno una condizione dedicata, ma senza obbligo. Oppure prendi il piano e lo continui altrove. O non lo continui. \u00c8 legittimo.",
  },
  {
    q: "Perch\u00e9 solo 30 posti?",
    a: "Perch\u00e9 ognuno ha un trainer che gli scrive di nome. Oltre i 30, smette di essere un percorso e diventa un corso di gruppo. Non \u00e8 quello che facciamo qui.",
  },
  {
    q: "Posso candidarmi se non vivo a Roma Sud?",
    a: "S\u00ec, ma sii realista. Il percorso funziona perch\u00e9 \u00e8 fisico \u2014 devi venire qui, in Via Giangiacomo 55. Se ci metti 50 minuti, salterai. Se ce ne metti 20, ce la fai.",
  },
];

const Faq = () => (
  <section id="faq" className="px-5 sm:px-8 py-24 sm:py-32 border-b border-border">
    <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
      <div className="col-span-12 md:col-span-4">
        <div className="sticky top-24">
          <p className="sec-num mb-3">08 / Domande oneste</p>
          <h2 className="font-display text-5xl sm:text-7xl leading-[0.95]">
            Risposte
            <br />
            oneste.
          </h2>
          <p className="mt-6 text-ink2 leading-relaxed">
            Quello che ci chiedono prima di candidarsi.
          </p>
        </div>
      </div>

      <div className="col-span-12 md:col-span-8">
        <div className="border-t border-border">
          {faqs.map((faq) => (
            <details key={faq.q} className="border-b border-border py-5 group">
              <summary className="flex items-center justify-between gap-6 list-none cursor-pointer">
                <span className="font-display text-2xl sm:text-3xl tracking-wide">{faq.q}</span>
                <span className="faq-plus" aria-hidden="true" />
              </summary>
              <p className="mt-4 text-ink2 leading-relaxed max-w-2xl">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Faq;
