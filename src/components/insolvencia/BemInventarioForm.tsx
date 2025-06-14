
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface BemInventarioFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  defaultValues?: any;
}

const estadosBem = [
  "livre",
  "penhorado",
  "alienado",
  "indisponível",
  "vendido"
];

const BemInventarioForm: React.FC<BemInventarioFormProps> = ({
  open,
  onClose,
  onSave,
  defaultValues
}) => {
  const [form, setForm] = useState({
    descricao: "",
    valor_estimado: "",
    estado: "livre",
    ...defaultValues,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm({
      descricao: "",
      valor_estimado: "",
      estado: "livre",
      ...defaultValues,
    });
  }, [defaultValues, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded p-6 min-w-[340px] shadow-lg">
        <h2 className="font-semibold mb-4">{defaultValues ? "Editar" : "Novo"} bem</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            await onSave({
              ...form,
              valor_estimado: form.valor_estimado ? Number(form.valor_estimado) : null,
              estado: form.estado
            });
            setLoading(false);
            onClose();
          }}
          className="flex flex-col gap-3"
        >
          <div>
            <Input
              placeholder="Descrição do bem"
              value={form.descricao}
              required
              onChange={(e) => setForm((f) => ({ ...f, descricao: e.target.value }))}
            />
          </div>
          <div>
            <Input
              type="number"
              step="0.01"
              min="0"
              placeholder="Valor estimado (€)"
              value={form.valor_estimado ?? ""}
              onChange={e => setForm(f => ({ ...f, valor_estimado: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-xs mb-1 font-medium">Estado</label>
            <select
              value={form.estado ?? "livre"}
              required
              onChange={(e) => setForm(f => ({ ...f, estado: e.target.value }))}
              className="w-full border rounded px-3 py-2 text-sm"
            >
              {estadosBem.map(opt => (
                <option value={opt} key={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={onClose} disabled={loading}>Cancelar</Button>
            <Button type="submit" disabled={loading}>
              {loading ? "A aguardar..." : (defaultValues ? "Guardar" : "Criar")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BemInventarioForm;
