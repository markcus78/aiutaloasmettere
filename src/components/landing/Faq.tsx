const faqs = [
  {
    q: "È davvero gratis? Dov’è il trucco?",
    a: "Davvero. Non chiediamo carta di credito, non hai un abbonamento dormiente, non ti chiamiamo per “ricordarti l’offerta”. Lo facciamo perché chi finisce le 5 settimane spesso decide da solo di restare. È pubblicità onesta, non un’esca.",
  },
  {
    q: "Sono fuori forma. Troppo?",
    a: "No. Il percorso è costruito per chi parte — non per chi è già allenato. Il trainer adatta tutto al tuo punto di partenza, e il primo allenamento è di attivazione, non di prestazione.",
  },
  {
    q: "Quante volte alla settimana devo venire?",
    a: "Pianifichiamo 2–3 sessioni a settimana per 5 settimane (12 allenamenti totali). La regola è una sola: niente due assenze di fila. Le date le chiudi tu con il tuo trainer.",
  },
  {
    q: "Cosa succede dopo le 5 settimane?",
    a: "Decidi tu. Puoi restare con un abbonamento di Wellness Town — i Rookie hanno una condizione dedicata, ma senza obbligo. Oppure prendi il piano e lo continui altrove. O non lo continui. È legittimo.",
  },
  {
    q: "Perché solo 30 posti?",
    a: "Perché ognuno ha un trainer che gli scrive di nome. Oltre i 30, smette di essere un percorso e diventa un corso di gruppo. Non è quello che facciamo qui.",
  },
  {
    q: "Posso candidarmi se non vivo a Roma Sud?",
    a: "Sì, ma sii realista. Il percorso funziona perché è fisico — devi venire qui, in Via Giangiacomo 55. Se ci metti 50 minuti, salterai. Se ce ne metti 20, ce la fai.",
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
