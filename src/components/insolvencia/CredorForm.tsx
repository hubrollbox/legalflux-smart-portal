
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CredorFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  defaultValues?: any;
}

const CredorForm: React.FC<CredorFormProps> = ({ open, onClose, onSave, defaultValues }) => {
  const [form, setForm] = useState({
    nome: "",
    nif: "",
    email: "",
    ...defaultValues,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm({
      nome: "",
      nif: "",
      email: "",
      ...defaultValues,
    });
  }, [defaultValues, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded p-6 min-w-[320px] shadow-lg">
        <h2 className="font-semibold mb-4">{defaultValues ? "Editar" : "Novo"} credor</h2>
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
              placeholder="Nome"
              value={form.nome}
              onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
              required
            />
          </div>
          <div>
            <Input
              placeholder="NIF (opcional)"
              value={form.nif || ""}
              onChange={(e) => setForm((f) => ({ ...f, nif: e.target.value }))}
            />
          </div>
          <div>
            <Input
              placeholder="Email (opcional)"
              type="email"
              value={form.email || ""}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
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
export default CredorForm;
