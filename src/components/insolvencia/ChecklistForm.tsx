
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const statusOptions = [
  { value: "pendente", label: "Pendente" },
  { value: "em_progresso", label: "Em Progresso" },
  { value: "concluido", label: "Concluído" },
  { value: "atrasado", label: "Atrasado" },
];

interface ChecklistFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  defaultValues?: any;
}

const ChecklistForm: React.FC<ChecklistFormProps> = ({ open, onClose, onSave, defaultValues }) => {
  const [form, setForm] = useState({
    etapa: "",
    status: "pendente",
    prazo: "",
    ...defaultValues,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm({
      etapa: "",
      status: "pendente",
      prazo: "",
      ...defaultValues,
    });
  }, [defaultValues, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded p-6 min-w-[320px] shadow-lg">
        <h2 className="font-semibold mb-4">{defaultValues ? "Editar" : "Nova"} tarefa checklist</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            await onSave(form);
            setLoading(false);
            onClose();
          }}
          className="flex flex-col gap-3"
        >
          <div>
            <Input
              placeholder="Etapa"
              value={form.etapa}
              onChange={(e) => setForm((f) => ({ ...f, etapa: e.target.value }))}
              required
            />
          </div>
          <div>
            <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v }))}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Input
              type="date"
              value={form.prazo ? form.prazo.slice(0,10) : ""}
              onChange={e => setForm(f => ({ ...f, prazo: e.target.value }))}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={onClose} disabled={loading}>Cancelar</Button>
            <Button type="submit" disabled={loading}>
              {loading ? "A aguardar..." : defaultValues ? "Guardar" : "Criar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChecklistForm;
