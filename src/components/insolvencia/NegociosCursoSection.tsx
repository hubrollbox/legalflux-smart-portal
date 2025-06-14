import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { NegocioCurso } from "@/integrations/supabase/insolvencyTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Edit2, Trash, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import NegocioCursoForm from "./NegocioCursoForm";

const fetchNegocios = async (insolvenciaId: string): Promise<NegocioCurso[]> => {
  const { data, error } = await supabase
    .from("negocios_curso")
    .select("*")
    .eq("insolvencia_id", insolvenciaId)
    .order("descricao", { ascending: true });
  if (error) throw error;
  return data || [];
};

const uploadDocumento = async (file: File, negocioId: string) => {
  const ext = file.name.split(".").pop();
  const filePath = `negocios/${negocioId}-${Date.now()}.${ext}`;
  const { data, error } = await supabase.storage
    .from("documentos") // Assumindo bucket 'documentos' já está público/criado!
    .upload(filePath, file);
  if (error) throw error;
  // URL pública simplista (ajustar se precisar CDN): 
  return `${supabase.storageUrl}/object/public/documentos/${filePath}`;
};

const NegociosCursoSection: React.FC<{ insolvenciaId: string }> = ({ insolvenciaId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["negocios_curso", insolvenciaId],
    queryFn: () => fetchNegocios(insolvenciaId),
    enabled: !!insolvenciaId,
  });

  const queryClient = useQueryClient();

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editNegocio, setEditNegocio] = useState<NegocioCurso | null>(null);

  // CRUD mutation
  const mutationUpsert = useMutation({
    mutationFn: async (values: any) => {
      const { file, ...rest } = values;
      let documentoUrl = rest.documento ?? "";
      let negocioId = editNegocio?.id ?? crypto.randomUUID();
      // Se tem file novo, faz upload antes
      if (file) {
        documentoUrl = await uploadDocumento(file, negocioId);
      }
      if (editNegocio) {
        const { error } = await supabase
          .from("negocios_curso")
          .update({
            descricao: rest.descricao,
            estado: rest.estado,
            documento: documentoUrl,
          })
          .eq("id", editNegocio.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("negocios_curso")
          .insert({
            insolvencia_id: insolvenciaId,
            descricao: rest.descricao,
            estado: rest.estado,
            documento: documentoUrl,
            id: negocioId,
          });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Negócio em curso guardado!");
      queryClient.invalidateQueries({ queryKey: ["negocios_curso", insolvenciaId] });
    },
    onError: (e: any) => toast.error("Erro ao guardar: " + e.message),
  });

  // Delete mutation
  const mutationDelete = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("negocios_curso")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Negócio removido");
      queryClient.invalidateQueries({ queryKey: ["negocios_curso", insolvenciaId] });
    },
    onError: (e: any) => toast.error("Erro ao remover: " + e.message),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">Negócios em Curso:</span>
        <Button size="sm" onClick={() => { setEditNegocio(null); setModalOpen(true); }}>
          <Plus size={16} /> Novo negócio
        </Button>
      </div>
      {isLoading && <div className="text-muted-foreground">A carregar negócios em curso...</div>}
      {error && <div className="text-destructive text-sm">Ocorreu um erro ao carregar os negócios.</div>}
      {!isLoading && !error && data && data.length === 0 && (
        <div className="text-muted-foreground italic">Nenhum negócio em curso registado.</div>
      )}
      {!isLoading && !error && data && data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border rounded">
            <thead>
              <tr className="bg-muted">
                <th className="px-3 py-2 text-left">Descrição</th>
                <th className="px-3 py-2 text-left">Estado</th>
                <th className="px-3 py-2 text-left">Documento</th>
                <th className="px-3 py-2 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((negocio) => (
                <tr key={negocio.id} className="border-b">
                  <td className="px-3 py-2">{negocio.descricao}</td>
                  <td className="px-3 py-2">{negocio.estado || <span className="text-muted-foreground italic">—</span>}</td>
                  <td className="px-3 py-2">
                    {negocio.documento
                      ? (
                        <a
                          href={negocio.documento}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 underline flex items-center gap-1"
                        >
                          <File size={16} />
                          Ver documento
                        </a>
                      )
                      : <span className="text-muted-foreground italic">—</span>
                    }
                  </td>
                  <td className="px-3 py-2 flex gap-2">
                    <button
                      title="Editar"
                      onClick={() => { setEditNegocio(negocio); setModalOpen(true); }}
                      className="text-sm p-1 rounded text-blue-600 hover:bg-blue-50"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      title="Remover"
                      onClick={() => mutationDelete.mutate(negocio.id)}
                      className="text-sm p-1 rounded text-red-600 hover:bg-red-50"
                    >
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {modalOpen && (
        <NegocioCursoForm
          open={modalOpen}
          onClose={() => { setModalOpen(false); setEditNegocio(null); }}
          defaultValues={editNegocio}
          onSave={async (data, file) => mutationUpsert.mutateAsync({ ...data, file })}
        />
      )}
    </div>
  );
};

export default NegociosCursoSection;
