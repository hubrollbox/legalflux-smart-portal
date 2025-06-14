
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CreditoFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  defaultValues?: any;
  credores: { id: string; nome: string }[];
}

const tiposCredito = [
  "Privilegiado",
  "Comum",
  "Subordinado",
  "Garantido",
  "Outros",
];

const CreditoForm: React.FC<CreditoFormProps> = ({ open, onClose, onSave, defaultValues, credores }) => {
  const [form, setForm] = useState({
    credor_id: "",
    tipo_credito: "",
    valor: "",
    data: "",
    ...defaultValues,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm({
      credor_id: "",
      tipo_credito: "",
      valor: "",
      data: "",
      ...defaultValues,
    });
  }, [defaultValues, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded p-6 min-w-[340px] shadow-lg">
        <h2 className="font-semibold mb-4">{defaultValues ? "Editar" : "Novo"} crédito</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            await onSave({ ...form, valor: Number(form.valor) });
            setLoading(false);
            onClose();
          }}
          className="flex flex-col gap-3"
        >
          <div>
            <label className="block text-xs mb-1 font-medium">Credor</label>
            <select
              value={form.credor_id}
              required
              disabled={!!defaultValues}
              onChange={(e) => setForm((f) => ({ ...f, credor_id: e.target.value }))}
              className="w-full border rounded px-3 py-2 text-sm"
            >
              <option value="">Selecione...</option>
              {credores.map((c) => (
                <option key={c.id} value={c.id}>{c.nome}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs mb-1 font-medium">Tipo de crédito</label>
            <select
              value={form.tipo_credito}
              required
              onChange={(e) => setForm(f => ({ ...f, tipo_credito: e.target.value }))}
              className="w-full border rounded px-3 py-2 text-sm"
            >
              <option value="">Tipo...</option>
              {tiposCredito.map(tc => (
                <option value={tc} key={tc}>{tc}</option>
              ))}
            </select>
          </div>
          <div>
            <Input
              type="number"
              step="0.01"
              min="0"
              placeholder="Valor (€)"
              value={form.valor}
              required
              onChange={e => setForm(f => ({ ...f, valor: e.target.value }))}
            />
          </div>
          <div>
            <Input
              type="date"
              value={form.data ? form.data.slice(0, 10) : ""}
              onChange={e => setForm(f => ({ ...f, data: e.target.value }))}
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

export default CreditoForm;
