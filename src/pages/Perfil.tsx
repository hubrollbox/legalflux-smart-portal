
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProcessoDTO {
  id: string;
  numero: string;
  descricao: string;
}

const Perfil = () => {
  const { user, role } = useAuth();
  const [processos, setProcessos] = useState<ProcessoDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Consome o endpoint mockado usado nos testes Cypress
    fetch("/api/processos")
      .then((res) => res.json())
      .then((data) => setProcessos(data))
      .catch(() => setProcessos([]))
      .finally(() => setLoading(false));
  }, []);

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

  return (
    <div className="max-w-2xl mx-auto my-10">
      <Card>
        <CardHeader className="flex flex-row gap-4 items-center">
          <User className="h-8 w-8 text-primary-700" />
          <div>
            <CardTitle>
              Bem-vindo, {user.email}
            </CardTitle>
            <p className="text-sm text-gray-500">Tipo de utilizador: <span className="font-semibold">{role || "n/d"}</span></p>
          </div>
        </CardHeader>
        <CardContent>
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
                  <span className="font-semibold text-primary-700">{p.numero}</span>
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
