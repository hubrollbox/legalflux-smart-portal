
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useFormValidation } from "@/hooks/useFormValidation";
import type { Insolvencia } from "@/integrations/supabase/insolvencyTypes";

interface InsolvenciaFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (values: Partial<InsolvenciaFormValues>) => Promise<void>;
  defaultValues?: Partial<InsolvenciaFormValues>;
  loading?: boolean;
}

type InsolvenciaFormValues = {
  numero_processo: string;
  tribunal: string;
  tipo: string;
  devedor: string;
  data_abertura: string;
};

const tiposInsolvencia = [
  "Pessoal",
  "Societária",
  "SIREVE",
  "PEVE",
  "PER",
  "Outros"
];

const initialState: InsolvenciaFormValues = {
  numero_processo: "",
  tribunal: "",
  tipo: "",
  devedor: "",
  data_abertura: ""
};

const validationRules = {
  numero_processo: { required: true, minLength: 4 },
  tribunal: { required: true },
  tipo: { required: true },
  devedor: { required: true, minLength: 3 },
  data_abertura: { required: true }
};

const InsolvenciaForm: React.FC<InsolvenciaFormProps> = ({
  open,
  onOpenChange,
  onSave,
  defaultValues,
  loading,
}) => {
  const [form, setForm] = useState<InsolvenciaFormValues>({ ...initialState, ...defaultValues });
  const [submitting, setSubmitting] = useState(false);

  const { errors, validateForm, clearErrors } = useFormValidation(validationRules);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    clearErrors();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(form)) return;
    setSubmitting(true);
    await onSave(form);
    setSubmitting(false);
    onOpenChange(false);
    setForm(initialState);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Processo de Insolvência</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="numero_processo">Nº Processo <span className="text-destructive">*</span></Label>
            <Input
              id="numero_processo"
              name="numero_processo"
              value={form.numero_processo}
              onChange={handleChange}
              autoFocus
            />
            {errors.numero_processo && <span className="text-destructive text-xs">{errors.numero_processo}</span>}
          </div>
          <div>
            <Label htmlFor="tribunal">Tribunal <span className="text-destructive">*</span></Label>
            <Input
              id="tribunal"
              name="tribunal"
              value={form.tribunal}
              onChange={handleChange}
            />
            {errors.tribunal && <span className="text-destructive text-xs">{errors.tribunal}</span>}
          </div>
          <div>
            <Label htmlFor="tipo">Tipo <span className="text-destructive">*</span></Label>
            <select
              id="tipo"
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
              required
            >
              <option value="">Selecione o tipo...</option>
              {tiposInsolvencia.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {errors.tipo && <span className="text-destructive text-xs">{errors.tipo}</span>}
          </div>
          <div>
            <Label htmlFor="devedor">Devedor <span className="text-destructive">*</span></Label>
            <Input
              id="devedor"
              name="devedor"
              value={form.devedor}
              onChange={handleChange}
            />
            {errors.devedor && <span className="text-destructive text-xs">{errors.devedor}</span>}
          </div>
          <div>
            <Label htmlFor="data_abertura">Data de Abertura <span className="text-destructive">*</span></Label>
            <Input
              id="data_abertura"
              name="data_abertura"
              type="date"
              value={form.data_abertura}
              onChange={handleChange}
            />
            {errors.data_abertura && <span className="text-destructive text-xs">{errors.data_abertura}</span>}
          </div>
          <Button
            type="submit"
            className="w-full bg-primary-700"
            disabled={loading || submitting}
          >
            {submitting || loading ? "A guardar..." : "Criar Processo"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InsolvenciaForm;
