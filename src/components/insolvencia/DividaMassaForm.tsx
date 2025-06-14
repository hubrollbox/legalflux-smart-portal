
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DividaMassaFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  defaultValues?: any;
}

const categorias = [
  "Salários",
  "Impostos",
  "Fornecedores",
  "Despesas correntes",
  "Outros"
];

const DividaMassaForm: React.FC<DividaMassaFormProps> = ({ open, onClose, onSave, defaultValues }) => {
  const [form, setForm] = useState({
    descricao: "",
    valor: "",
    categoria: "",
    ...defaultValues,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm({
      descricao: "",
      valor: "",
      categoria: "",
      ...defaultValues,
    });
  }, [defaultValues, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded p-6 min-w-[340px] shadow-lg">
        <h2 className="font-semibold mb-4">{defaultValues ? "Editar" : "Nova"} dívida da massa</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            await onSave({ ...form, valor: form.valor ? Number(form.valor) : null });
            setLoading(false);
            onClose();
          }}
          className="flex flex-col gap-3"
        >
          <div>
            <Input
              placeholder="Descrição da dívida"
              required
              value={form.descricao}
              onChange={e => setForm(f => ({ ...f, descricao: e.target.value }))}
            />
          </div>
          <div>
            <Input
              type="number"
              step="0.01"
              min="0"
              placeholder="Valor (€)"
              value={form.valor ?? ""}
              onChange={e => setForm(f => ({ ...f, valor: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-xs mb-1 font-medium">Categoria</label>
            <select
              value={form.categoria ?? ""}
              onChange={e => setForm(f => ({ ...f, categoria: e.target.value }))}
              className="w-full border rounded px-3 py-2 text-sm"
            >
              <option value="">Categoria...</option>
              {categorias.map(cat => (
                <option value={cat} key={cat}>{cat}</option>
              ))}
            </select>
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

export default DividaMassaForm;
