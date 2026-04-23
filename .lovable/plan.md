
# Landing Page "Aiutalo a Smettere"

Single-page landing in italiano per il programma fitness gratuito di 5 settimane di Wellness Town (Roma Sud). Tono ironico in superficie, serio nella sostanza.

## Identità visiva
- **Palette**: verde foresta `#1a6b3c` (primario), off-white `#f8f6f1` (sfondo), charcoal `#1c1c1c` (testo), bianco caldo (card)
- **Typography**: Bebas Neue per display/headline, Inter per il body (Google Fonts)
- **Stile**: blocchi di colore, tipografia bold, forme geometriche — niente foto stock
- **Logo**: placeholder `[LOGO]` in alto a sinistra dell'hero (sostituibile)

## Sezioni della pagina

1. **Hero** (full viewport)
   - Logo placeholder top-left
   - H1: *"Hai iniziato a fare sport 38 volte. Questa è la 39ª."*
   - Sottotitolo + info posti/data/sede
   - CTA verde "CANDIDATI ORA" → ancora al form
   - Freccia animata verso il basso

2. **Di cosa si tratta** — paragrafo intro + 3 statement con icone (5 settimane / trainer dedicato / zero costi)

3. **Il percorso** — 5 card numerate (Prenota → Incontra → Preparati → Comincia → Costruisci), teaser misteriosi, layout grid desktop / stack mobile, chevron decorativo

4. **Non fa per te se… / Fa per te se…** — sfondo charcoal, due liste contrapposte (✗ rossi vs ✓ verdi)

5. **Cosa ti regaliamo** — griglia 2×2 (struttura, programma personalizzato, nutrizionista, welcome kit) + chiusura in corsivo

6. **Chi siamo** — sezione verde, testo bianco centrato su Wellness Town + indirizzo, icona map pin

7. **Form di candidatura** (anchor `#candidati`)
   - Campi: Nome, Cognome, Telefono*, Email*, checkbox privacy*
   - Validazione client-side con zod (lunghezze, formato email/telefono, trim) + messaggi d'errore in rosso
   - Submit "INVIA LA MIA CANDIDATURA" + disclaimer sui 30 posti
   - Submit handler: toast di conferma (nessun backend in questa fase)

## Comportamenti

- **Sticky bottom bar**: sempre visibile (testo posti+data a sinistra, CTA "CANDIDATI" a destra), si **nasconde automaticamente** quando il form entra in viewport (IntersectionObserver)
- **Smooth scroll** da tutte le CTA al form
- **Mobile-first**, fully responsive, sticky bar full-width su mobile
- **Accessibilità**: HTML semantico, label associate agli input, focus states visibili
- Nessun backend: il form mostra solo conferma locale (pronto per integrazione successiva con Lovable Cloud se vorrai)

## Note
- Le ads Meta non sono incluse in questa build — le scriviamo dopo che la landing è online e testata, come hai suggerito.
- Per ora niente analytics/pixel: li aggiungiamo in un secondo step quando avrai gli ID.
