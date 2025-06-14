import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import PerfilHeader from "@/components/perfil/PerfilHeader";
import PerfilInfoResumo from "@/components/perfil/PerfilInfoResumo";
import PerfilEditarForm from "@/components/perfil/PerfilEditarForm";
import ProcessosResumo from "@/components/perfil/ProcessosResumo";

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

  const handleEdit = () => setEditMode(true);

  const handleCancel = () => {
    setFormValues({
      nome: user?.user_metadata?.nome || "",
      email: user?.email || "",
      telefone: user?.user_metadata?.telefone || "",
    });
    setEditMode(false);
  };

  const handleSave = async (values: PerfilFormValues) => {
    setSaving(true);

    // Simular chamada à API
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setFormValues(values);
    toast({
      title: "Perfil atualizado!",
      description: "As alterações ao perfil foram guardadas com sucesso.",
      variant: "default",
    });
    setEditMode(false);
    setSaving(false);
    // Em app real atualizarias o state global/userStore aqui!
    return true;
  };

  return (
    <div className="max-w-2xl mx-auto my-10">
      <Card>
        <PerfilHeader email={user.email} role={role} />
        <CardContent>
          <div className="mb-6">
            <h2 className="font-semibold mb-2 text-lg">Informações do perfil</h2>
            {!editMode ? (
              <PerfilInfoResumo
                nome={formValues.nome}
                email={formValues.email}
                telefone={formValues.telefone}
                onEditar={handleEdit}
              />
            ) : (
              <PerfilEditarForm
                valores={formValues}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            )}
          </div>
          <ProcessosResumo processos={processos} loading={loading} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Perfil;
