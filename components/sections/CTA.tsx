"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

// §11/08 — CTA final. Seção fullwidth que PERMANECE dark mesmo em light mode
// (classe .section-dark força os tokens dark no subtree). Formulário de
// qualificação progressiva: nome, segmento, gargalo, WhatsApp.

const SEGMENTOS = [
  "Pet shop",
  "Clínica",
  "Escola ou creche",
  "Restaurante",
  "Profissional liberal",
  "Outro",
] as const;

const GARGALOS = [
  "Perco cliente no WhatsApp",
  "Faço tarefas manuais demais",
  "Meu site não converte",
  "Não tenho controle dos dados",
  "Outro",
] as const;

// WhatsApp BR: 11 dígitos (DDD + 9). Validamos sobre os dígitos crus.
const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome completo."),
  segmento: z.enum(SEGMENTOS, { message: "Selecione um segmento." }),
  gargalo: z.enum(GARGALOS, { message: "Selecione seu principal gargalo." }),
  whatsapp: z
    .string()
    .refine((v) => v.replace(/\D/g, "").length === 11, {
      message: "Informe um WhatsApp válido com DDD.",
    }),
});

type FormValues = z.infer<typeof schema>;

// Máscara brasileira (XX) XXXXX-XXXX — progressiva, só transform de string.
function maskPhone(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const FIELD_CLASS =
  "w-full rounded-md border-[0.5px] border-border bg-surface-2 px-4 py-3 text-body-md text-text-primary transition-colors placeholder:text-text-muted focus:border-accent focus:outline-none aria-[invalid=true]:border-red-400";

export function CTA() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async (data) => {
    // TODO: conectar ao backend/n8n/webhook
    void data;
    setSubmitted(true);
  });

  return (
    <section id="contato" className="section-dark scroll-mt-20 px-6 py-[120px]">
      <div className="mx-auto max-w-[640px]">
        <Reveal>
          <p className="text-eyebrow text-text-secondary">Próximo passo</p>
          <h2 className="text-display-lg mt-3 text-balance text-text-primary">
            Vamos achar o gargalo da sua empresa?
          </h2>
          <p className="text-body-lg mt-4 text-text-secondary">
            Diagnóstico gratuito. A gente olha sua operação e mostra onde dá pra
            automatizar. Resposta em até 24h, sem compromisso.
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          {submitted ? (
            <div
              role="status"
              aria-live="polite"
              className="mt-10 flex items-start gap-3 rounded-lg border-[0.5px] border-accent bg-surface-1 p-6"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div>
                <p className="text-heading text-text-primary">
                  Recebido! Retornamos em até 24h.
                </p>
                <p className="text-body-sm mt-1 text-text-secondary">
                  Enquanto isso, fica à vontade pra dar uma olhada nos nossos
                  cases.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="mt-10 flex flex-col gap-5">
              {/* Nome */}
              <div className="flex flex-col gap-2">
                <label htmlFor="nome" className="text-label text-text-primary">
                  Nome completo
                </label>
                <input
                  id="nome"
                  type="text"
                  autoComplete="name"
                  placeholder="Seu nome"
                  className={FIELD_CLASS}
                  aria-invalid={!!errors.nome}
                  aria-describedby={errors.nome ? "nome-error" : undefined}
                  {...register("nome")}
                />
                {errors.nome && (
                  <p
                    id="nome-error"
                    role="alert"
                    aria-live="polite"
                    className="text-caption text-red-400"
                  >
                    {errors.nome.message}
                  </p>
                )}
              </div>

              {/* Segmento */}
              <div className="flex flex-col gap-2">
                <label htmlFor="segmento" className="text-label text-text-primary">
                  Segmento
                </label>
                <select
                  id="segmento"
                  defaultValue=""
                  className={FIELD_CLASS}
                  aria-invalid={!!errors.segmento}
                  aria-describedby={errors.segmento ? "segmento-error" : undefined}
                  {...register("segmento")}
                >
                  <option value="" disabled>
                    Selecione…
                  </option>
                  {SEGMENTOS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errors.segmento && (
                  <p
                    id="segmento-error"
                    role="alert"
                    aria-live="polite"
                    className="text-caption text-red-400"
                  >
                    {errors.segmento.message}
                  </p>
                )}
              </div>

              {/* Gargalo */}
              <div className="flex flex-col gap-2">
                <label htmlFor="gargalo" className="text-label text-text-primary">
                  Principal gargalo hoje
                </label>
                <select
                  id="gargalo"
                  defaultValue=""
                  className={FIELD_CLASS}
                  aria-invalid={!!errors.gargalo}
                  aria-describedby={errors.gargalo ? "gargalo-error" : undefined}
                  {...register("gargalo")}
                >
                  <option value="" disabled>
                    Selecione…
                  </option>
                  {GARGALOS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                {errors.gargalo && (
                  <p
                    id="gargalo-error"
                    role="alert"
                    aria-live="polite"
                    className="text-caption text-red-400"
                  >
                    {errors.gargalo.message}
                  </p>
                )}
              </div>

              {/* WhatsApp (com máscara) */}
              <div className="flex flex-col gap-2">
                <label htmlFor="whatsapp" className="text-label text-text-primary">
                  WhatsApp
                </label>
                <Controller
                  control={control}
                  name="whatsapp"
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      id="whatsapp"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      placeholder="(11) 91234-5678"
                      className={FIELD_CLASS}
                      aria-invalid={!!errors.whatsapp}
                      aria-describedby={
                        errors.whatsapp ? "whatsapp-error" : undefined
                      }
                      value={field.value ?? ""}
                      onBlur={field.onBlur}
                      onChange={(e) => field.onChange(maskPhone(e.target.value))}
                    />
                  )}
                />
                {errors.whatsapp && (
                  <p
                    id="whatsapp-error"
                    role="alert"
                    aria-live="polite"
                    className="text-caption text-red-400"
                  >
                    {errors.whatsapp.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary mt-1 w-full disabled:opacity-60"
              >
                Quero meu diagnóstico
              </button>

              <p className="text-caption text-text-secondary">
                Sem spam. Sem ligação sem aviso. Você fala com a gente quando
                quiser.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
