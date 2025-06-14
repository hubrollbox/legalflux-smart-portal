
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAuth } from "@/contexts/useAuth";

const fetchInsolvencias = async () => {
  const { data, error } = await supabase
    .from("insolvencias")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

const Insolvencias: React.FC = () => {
  const { role } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["insolvencias"],
    queryFn: fetchInsolvencias,
  });

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Processos de Insolvência</h1>
        {(role === "admin" || role === "jurista") && (
          <Button asChild size="sm">
            <Link to="/insolvencias/criar">
              <Plus size={16} />
              <span className="ml-1">Novo Processo</span>
            </Link>
          </Button>
        )}
      </div>
      {isLoading && <div className="text-muted-foreground">A carregar...</div>}
      {!isLoading && data && data.length === 0 && (
        <div className="border p-8 rounded text-muted-foreground text-center">
          Não existem processos de insolvência registados.
        </div>
      )}
      {!isLoading && data && data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="font-medium px-3 py-2">Nº Processo</th>
                <th className="font-medium px-3 py-2">Tribunal</th>
                <th className="font-medium px-3 py-2">Devedor</th>
                <th className="font-medium px-3 py-2">Data Abertura</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((p: any) => (
                <tr key={p.id} className="border-b">
                  <td className="px-3 py-2">{p.numero_processo}</td>
                  <td className="px-3 py-2">{p.tribunal}</td>
                  <td className="px-3 py-2">{p.devedor}</td>
                  <td className="px-3 py-2">{p.data_abertura}</td>
                  <td className="px-3 py-2">
                    <Link
                      className="text-link hover:underline text-blue-600"
                      to={`/insolvencias/${p.id}`}
                    >
                      Ver detalhes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Insolvencias;
