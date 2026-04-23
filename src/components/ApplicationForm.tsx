import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const schema = z.object({
  nome: z.string().trim().max(80, "Massimo 80 caratteri").optional().or(z.literal("")),
  cognome: z.string().trim().max(80, "Massimo 80 caratteri").optional().or(z.literal("")),
  telefono: z
    .string()
    .trim()
    .min(6, "Inserisci un numero valido")
    .max(20, "Numero troppo lungo")
    .regex(/^[+0-9\s().-]+$/, "Formato non valido"),
  email: z.string().trim().email("Email non valida").max(255, "Email troppo lunga"),
  privacy: z.literal(true, { errorMap: () => ({ message: "Devi accettare la Privacy Policy" }) }),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const ApplicationForm = () => {
  const [values, setValues] = useState({
    nome: "",
    cognome: "",
    telefono: "",
    email: "",
    privacy: false as boolean,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof typeof values>(key: K, val: (typeof values)[K]) => {
    setValues((v) => ({ ...v, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
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
    setTimeout(() => {
      toast.success("Candidatura inviata!", {
        description: "Ti chiamiamo noi entro poche ore.",
      });
      setValues({ nome: "", cognome: "", telefono: "", email: "", privacy: false });
      setSubmitting(false);
    }, 400);
  };

  const errClass = (k: keyof FieldErrors) =>
    errors[k] ? "border-destructive focus-visible:ring-destructive" : "";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="nome" className="font-semibold">Nome</Label>
          <Input
            id="nome"
            value={values.nome}
            onChange={(e) => update("nome", e.target.value)}
            className={`h-12 bg-card ${errClass("nome")}`}
            autoComplete="given-name"
          />
          {errors.nome && <p className="text-destructive text-sm">{errors.nome}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cognome" className="font-semibold">Cognome</Label>
          <Input
            id="cognome"
            value={values.cognome}
            onChange={(e) => update("cognome", e.target.value)}
            className={`h-12 bg-card ${errClass("cognome")}`}
            autoComplete="family-name"
          />
          {errors.cognome && <p className="text-destructive text-sm">{errors.cognome}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefono" className="font-semibold">
          Telefono <span className="text-destructive">*</span>
        </Label>
        <Input
          id="telefono"
          type="tel"
          value={values.telefono}
          onChange={(e) => update("telefono", e.target.value)}
          className={`h-12 bg-card ${errClass("telefono")}`}
          autoComplete="tel"
          required
        />
        {errors.telefono && <p className="text-destructive text-sm">{errors.telefono}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="font-semibold">
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          className={`h-12 bg-card ${errClass("email")}`}
          autoComplete="email"
          required
        />
        {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
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
          <a href="#" className="underline font-semibold">Privacy Policy</a>{" "}
          <span className="text-destructive">*</span>
        </Label>
      </div>
      {errors.privacy && <p className="text-destructive text-sm -mt-3">{errors.privacy}</p>}

      <Button
        type="submit"
        disabled={submitting}
        className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-bold tracking-wider"
      >
        {submitting ? "INVIO IN CORSO..." : "INVIA LA MIA CANDIDATURA"}
      </Button>

      <p className="text-xs text-muted-foreground text-center leading-relaxed">
        Massimo 30 posti disponibili. La tua candidatura non garantisce l'iscrizione —
        ti contatteremo per verificare insieme che il percorso faccia per te.
      </p>
    </form>
  );
};

export default ApplicationForm;
