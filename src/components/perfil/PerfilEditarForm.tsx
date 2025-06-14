
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PerfilEditarFormProps {
  valores: {
    nome: string;
    email: string;
    telefone: string;
  };
  onSave: (valores: { nome: string; email: string; telefone: string }) => Promise<boolean>;
  onCancel: () => void;
}

const PerfilEditarForm = ({ valores, onSave, onCancel }: PerfilEditarFormProps) => {
  const [formValues, setFormValues] = useState(valores);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    if (!formValues.nome.trim() || !formValues.email.trim()) {
      toast({
        title: "Erro",
        description: "Nome e email são obrigatórios.",
        variant: "destructive",
      });
      setSaving(false);
      return;
    }
    const result = await onSave(formValues);
    setSaving(false);
    if (!result) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao guardar o perfil.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3 max-w-md">
      <div>
        <Label htmlFor="nome">Nome</Label>
        <Input
          id="nome"
          name="nome"
          value={formValues.nome}
          onChange={handleInputChange}
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formValues.email}
          onChange={handleInputChange}
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="telefone">Telefone</Label>
        <Input
          id="telefone"
          name="telefone"
          value={formValues.telefone}
          onChange={handleInputChange}
          className="mt-1"
        />
      </div>
      <div className="flex gap-2 mt-2">
        <Button type="submit" disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              A guardar...
            </>
          ) : (
            "Guardar"
          )}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} disabled={saving}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default PerfilEditarForm;
