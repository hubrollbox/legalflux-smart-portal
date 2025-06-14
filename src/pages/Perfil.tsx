
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ProcessoDTO {
  id: string;
  numero: string;
  descricao: string;
}

// Tipos para editar perfil
interface PerfilFormValues {
  nome: string;
  email: string;
  telefone: string;
}

const Perfil = () => {
  const { user, role } = useAuth();
  const [processos, setProcessos] = useState<ProcessoDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState<PerfilFormValues>({
    nome: user?.user_metadata?.nome || "",
    email: user?.email || "",
    telefone: user?.user_metadata?.telefone || "",
  });

  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    fetch("/api/processos")
      .then((res) => res.json())
      .then((data) => setProcessos(data))
      .catch(() => setProcessos([]))
      .finally(() => setLoading(false));
  }, []);

  // Se mudar de user, atualizar formulário
  useEffect(() => {
    setFormValues({
      nome: user?.user_metadata?.nome || "",
      email: user?.email || "",
      telefone: user?.user_metadata?.telefone || "",
    });
  }, [user]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Card>
          <CardHeader>
            <CardTitle>Acesso restrito</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Faça login para ver o seu perfil.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditMode(true);

  const handleCancel = () => {
    setFormValues({
      nome: user?.user_metadata?.nome || "",
      email: user?.email || "",
      telefone: user?.user_metadata?.telefone || "",
    });
    setEditMode(false);
  };

  // Guardar alterações (apenas mock local para demo)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Validação simples
    if (!formValues.nome.trim() || !formValues.email.trim()) {
      toast({
        title: "Erro",
        description: "Nome e email são obrigatórios.",
        variant: "destructive",
      });
      setSaving(false);
      return;
    }

    // Simular chamada à API
    setTimeout(() => {
      // MOCK: atualizar info local apenas (normalmente integrar com backend)
      toast({
        title: "Perfil atualizado!",
        description: "As alterações ao perfil foram guardadas com sucesso.",
        variant: "default",
      });
      setEditMode(false);
      setSaving(false);
      // Em app real atualizarias o state global/userStore aqui!
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto my-10">
      <Card>
        <CardHeader className="flex flex-row gap-4 items-center">
          <User className="h-8 w-8 text-primary-700" />
          <div>
            <CardTitle>
              Bem-vindo, {user.email}
            </CardTitle>
            <p className="text-sm text-gray-500">
              Tipo de utilizador:{" "}
              <span className="font-semibold">{role || "n/d"}</span>
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h2 className="font-semibold mb-2 text-lg">Informações do perfil</h2>
            {!editMode ? (
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Nome: </span>
                  {formValues.nome || <span className="italic text-muted-foreground">—</span>}
                </div>
                <div>
                  <span className="font-medium">Email: </span>
                  {formValues.email || <span className="italic text-muted-foreground">—</span>}
                </div>
                <div>
                  <span className="font-medium">Telefone: </span>
                  {formValues.telefone || <span className="italic text-muted-foreground">—</span>}
                </div>
                <div className="flex gap-3 mt-4">
                  <Button size="sm" onClick={handleEdit}>Editar perfil</Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-3 max-w-md">
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
                  <Button type="button" variant="outline" onClick={handleCancel} disabled={saving}>
                    Cancelar
                  </Button>
                </div>
              </form>
            )}
          </div>
          <h2 className="font-semibold mb-2 text-lg">Seus processos</h2>
          {loading ? (
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="animate-spin" />
              Carregando processos...
            </div>
          ) : processos.length === 0 ? (
            <p className="text-gray-500">Nenhum processo encontrado.</p>
          ) : (
            <ul className="space-y-2">
              {processos.map((p) => (
                <li
                  key={p.id}
                  className="border rounded p-3 flex flex-row items-center gap-3 bg-gray-50 hover:bg-accent-50 transition"
                >
                  <span className="font-semibold text-primary-700">
                    {p.numero}
                  </span>
                  <span className="flex-1 text-gray-800">{p.descricao}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6 flex justify-end">
            <Button asChild variant="secondary">
              <a href="/processos">Ver todos os processos</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Perfil;
