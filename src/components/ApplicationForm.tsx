import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/1842375/uvdpto7/";

const rimandoOptions = [
  { value: "<6m" as const, label: "< 6 mesi" },
  { value: "1y" as const, label: "1 anno" },
  { value: "some-y" as const, label: "2-5 anni" },
  { value: "forever" as const, label: "Da sempre" },
];

const schema = z.object({
  nome: z.string().trim().max(80).optional().or(z.literal("")),
  cognome: z.string().trim().max(80).optional().or(z.literal("")),
  telefono: z
    .string()
    .trim()
    .min(6, "Inserisci un numero valido")
    .max(20, "Numero troppo lungo")
    .regex(/^[+0-9\s().-]+$/, "Formato non valido"),
  email: z.string().trim().email("Email non valida").max(255),
  rimando: z.enum(["<6m", "1y", "some-y", "forever"]).optional(),
  privacy: z.literal(true, { errorMap: () => ({ message: "Devi accettare la Privacy Policy" }) }),
  conferma: z.literal(true, { errorMap: () => ({ message: "Devi confermare di voler essere ricontattato/a" }) }),
});

type FormValues = {
  nome: string;
  cognome: string;
  telefono: string;
  email: string;
  rimando: "" | "<6m" | "1y" | "some-y" | "forever";
  privacy: boolean;
  conferma: boolean;
};

type FieldErrors = Partial<Record<keyof z.infer<typeof schema>, string>>;

type ApplicationFormProps = {
  pagina: string;
  extraPayload?: Record<string, unknown>;
};

const ApplicationForm = ({ pagina, extraPayload }: ApplicationFormProps) => {
  const [values, setValues] = useState<FormValues>({
    nome: "",
    cognome: "",
    telefono: "",
    email: "",
    rimando: "",
    privacy: false,
    conferma: false,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof FormValues>(key: K, val: FormValues[K]) => {
    setValues((v) => ({ ...v, [key]: val }));
    if (errors[key as keyof FieldErrors]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const newErrors: FieldErrors = {};
      parsed.error.issues.forEach((issue) => {
        const k = issue.path[0] as keyof FieldErrors;
        if (!newErrors[k]) newErrors[k] = issue.message;
      });
      setErrors(newErrors);
      toast.error("Controlla i campi evidenziati");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: JSON.stringify({
          nome: parsed.data.nome ?? "",
          cognome: parsed.data.cognome ?? "",
          telefono: parsed.data.telefono,
          email: parsed.data.email,
          rimando: parsed.data.rimando ?? "",
          privacy: parsed.data.privacy,
          conferma: parsed.data.conferma,
          pagina_provenienza: pagina,
          ...(extraPayload ?? {}),
        }),
      });
      if (!res.ok) throw new Error("Errore di rete");
      window.location.assign("/grazie");
    } catch {
      toast.error("Qualcosa è andato storto. Riprova o chiamaci direttamente.");
      setSubmitting(false);
    }
  };

  const errClass = (k: keyof FieldErrors) =>
    errors[k] ? "border-destructive focus-visible:ring-destructive" : "";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="nome" className="font-bold text-sm">Nome</Label>
          <Input
            id="nome"
            value={values.nome}
            onChange={(e) => update("nome", e.target.value)}
            className={`h-12 ${errClass("nome")}`}
            autoComplete="given-name"
          />
          {errors.nome && <p className="text-destructive text-sm">{errors.nome}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cognome" className="font-bold text-sm">Cognome</Label>
          <Input
            id="cognome"
            value={values.cognome}
            onChange={(e) => update("cognome", e.target.value)}
            className={`h-12 ${errClass("cognome")}`}
            autoComplete="family-name"
          />
          {errors.cognome && <p className="text-destructive text-sm">{errors.cognome}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefono" className="font-bold text-sm">
          Telefono <span className="text-cross">*</span>
        </Label>
        <Input
          id="telefono"
          type="tel"
          value={values.telefono}
          onChange={(e) => update("telefono", e.target.value)}
          className={`h-12 ${errClass("telefono")}`}
          placeholder="es. 333 1234567"
          autoComplete="tel"
          required
        />
        {errors.telefono && <p className="text-destructive text-sm">{errors.telefono}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="font-bold text-sm">
          Email <span className="text-cross">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          className={`h-12 ${errClass("email")}`}
          placeholder="nome@email.it"
          autoComplete="email"
          required
        />
        {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label className="font-bold text-sm">Da quanto rimandi?</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {rimandoOptions.map((opt) => (
            <label key={opt.value} className="cursor-pointer">
              <input
                type="radio"
                name="rimando"
                value={opt.value}
                checked={values.rimando === opt.value}
                onChange={() => update("rimando", opt.value)}
                className="peer sr-only"
              />
              <span className="block text-center px-3 py-3 rounded-md border border-border bg-card peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary text-sm font-semibold transition-colors">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-start gap-3 pt-2">
        <Checkbox
          id="privacy"
          checked={values.privacy}
          onCheckedChange={(c) => update("privacy", c === true)}
          className="mt-1"
        />
        <Label htmlFor="privacy" className="text-sm font-normal leading-relaxed cursor-pointer">
          Ho letto e accetto la{" "}
          <a href="https://wellnesstown.it/privacy" target="_blank" rel="noopener noreferrer" className="underline font-semibold">
            Privacy Policy
          </a>{" "}
          <span className="text-cross">*</span>
        </Label>
      </div>
      {errors.privacy && <p className="text-destructive text-sm -mt-3">{errors.privacy}</p>}

      <div className="flex items-start gap-3">
        <Checkbox
          id="conferma"
          checked={values.conferma}
          onCheckedChange={(c) => update("conferma", c === true)}
          className="mt-1"
        />
        <Label htmlFor="conferma" className="text-sm font-normal leading-relaxed cursor-pointer">
          Confermo di voler essere ricontattato/a per il programma{" "}
          <strong>Aiutalo a Smettere</strong> via WhatsApp ed email{" "}
          <span className="text-cross">*</span>
        </Label>
      </div>
      {errors.conferma && <p className="text-destructive text-sm -mt-3">{errors.conferma}</p>}

      <Button
        type="submit"
        disabled={submitting}
        className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold tracking-wider"
        style={{
          boxShadow: "0 1px 0 hsl(0 0% 0% / 0.04), 0 8px 24px -8px hsl(178 52% 43% / 0.55)",
        }}
      >
        {submitting ? "INVIO IN CORSO..." : "INVIA LA MIA CANDIDATURA \u2192"}
      </Button>

      <p className="text-xs text-muted-foreground text-center leading-relaxed">
        Massimo 30 posti. La candidatura non garantisce l&apos;iscrizione &mdash; ti contattiamo entro poche ore per verificare insieme.
      </p>
    </form>
  );
};

export default ApplicationForm;
