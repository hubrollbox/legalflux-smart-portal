
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NegocioCursoFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any, file?: File | null) => Promise<void>;
  defaultValues?: any;
}

const estados = [
  "em curso",
  "suspenso",
  "interrompido",
  "concluído",
  "outro",
];

const NegocioCursoForm: React.FC<NegocioCursoFormProps> = ({ open, onClose, onSave, defaultValues }) => {
  const [form, setForm] = useState({
    descricao: "",
    estado: "",
    documento: "",
    ...defaultValues,
  });
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setForm({
      descricao: "",
      estado: "",
      documento: "",
      ...defaultValues,
    });
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  }, [defaultValues, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded p-6 min-w-[340px] shadow-lg">
        <h2 className="font-semibold mb-4">{defaultValues ? "Editar" : "Novo"} negócio em curso</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            const file = fileRef.current?.files?.[0] ?? null;
            await onSave(form, file);
            setLoading(false);
            onClose();
          }}
          className="flex flex-col gap-3"
        >
          <div>
            <Input
              placeholder="Descrição do negócio"
              value={form.descricao}
              required
              onChange={e => setForm(f => ({ ...f, descricao: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-xs mb-1 font-medium">Estado</label>
            <select
              value={form.estado ?? ""}
              required
              onChange={e => setForm(f => ({ ...f, estado: e.target.value }))}
              className="w-full border rounded px-3 py-2 text-sm"
            >
              <option value="">Selecione...</option>
              {estados.map(opt => (
                <option value={opt} key={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs mb-1 font-medium">Documento (opcional)</label>
            <Input ref={fileRef} type="file" accept="application/pdf,image/*" />
            {form.documento && (
              <a
                href={form.documento}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-1 text-xs text-blue-700 underline"
              >
                Ver documento atual
              </a>
            )}
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

export default NegocioCursoForm;
