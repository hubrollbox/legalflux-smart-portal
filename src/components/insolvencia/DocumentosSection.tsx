import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { DocumentoInsolvencia } from "@/integrations/supabase/insolvencyTypes";
import { useState } from "react";
import { toast } from "sonner";

// Modal auxiliar simples para email input
const EmailModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onSend: (email: string) => void;
}> = ({ open, onClose, onSend }) => {
  const [email, setEmail] = useState("");
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 min-w-[340px] shadow flex flex-col gap-3">
        <div className="font-semibold mb-2">Enviar documento para email</div>
        <input
          type="email"
          placeholder="Email de destino"
          className="border px-3 py-2 rounded text-sm"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <div className="flex justify-end gap-2 mt-2">
          <button className="btn" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={() => { onSend(email); setEmail(""); }}>Enviar</button>
        </div>
      </div>
    </div>
  );
};

const fetchDocumentos = async (insolvenciaId: string): Promise<DocumentoInsolvencia[]> => {
  const { data, error } = await supabase
    .from("documentos_insolvencia")
    .select("*")
    .eq("insolvencia_id", insolvenciaId)
    .order("data", { ascending: false });
  if (error) throw error;
  return data || [];
};

const DocumentosSection: React.FC<{ insolvenciaId: string }> = ({ insolvenciaId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["documentos_insolvencia", insolvenciaId],
    queryFn: () => fetchDocumentos(insolvenciaId),
    enabled: !!insolvenciaId,
  });

  const [loadingDoc, setLoadingDoc] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingDoc, setPendingDoc] = useState<any>(null);

  // Função para chamar edge function e gerar o documento
  const handleGerarDoc = async (tipo_documento: string) => {
    setLoadingDoc(true);
    try {
      const resp = await fetch(
        "https://iibvdqcwycrcyskxvsgu.supabase.co/functions/v1/gerar_documento_insolvencia",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ insolvenciaId, tipo_documento }),
        }
      );
      const data = await resp.json();
      if (data.error) throw new Error(data.error);
      toast.success("Documento gerado!");
    } catch (e: any) {
      toast.error("Erro ao gerar documento: " + e.message);
    }
    setLoadingDoc(false);
  };

  // Função enviar por email
  const handleSendEmail = async (tipo_documento: string, email: string) => {
    setModalOpen(false);
    setLoadingDoc(true);
    try {
      const resp = await fetch(
        "https://iibvdqcwycrcyskxvsgu.supabase.co/functions/v1/gerar_documento_insolvencia",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ insolvenciaId, tipo_documento, email_destino: email }),
        }
      );
      const data = await resp.json();
      if (data.error) throw new Error(data.error);
      toast.success("Documento enviado por email!");
    } catch (e: any) {
      toast.error("Erro no envio: " + e.message);
    }
    setLoadingDoc(false);
  };

  return (
    <div>
      <div className="font-semibold mb-2">Documentos Legais Gerados:</div>
      {isLoading && <div className="text-muted-foreground">A carregar documentos...</div>}
      {error && <div className="text-destructive text-sm">Ocorreu um erro ao carregar os documentos.</div>}
      {!isLoading && !error && data && data.length === 0 && (
        <div className="text-muted-foreground italic">
          Nenhum documento registado para este processo.
        </div>
      )}
      {!isLoading && !error && data && data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border rounded">
            <thead>
              <tr className="bg-muted">
                <th className="px-3 py-2 text-left">Tipo de Documento</th>
                <th className="px-3 py-2 text-left">Data</th>
                <th className="px-3 py-2 text-left">Visualizar</th>
              </tr>
            </thead>
            <tbody>
              {data.map((doc) => (
                <tr key={doc.id} className="border-b">
                  <td className="px-3 py-2">{doc.tipo_documento}</td>
                  <td className="px-3 py-2">{doc.data ? new Date(doc.data).toLocaleDateString("pt-PT") : <span className="text-muted-foreground italic">—</span>}</td>
                  <td className="px-3 py-2">
                    {doc.conteudo
                      ? (
                        <button
                          className="text-blue-700 underline font-medium hover:text-blue-900"
                          onClick={() => {
                            // Abre uma nova aba apenas se for um URL (futuramente pode suportar html/pdf inline)
                            if (doc.conteudo?.startsWith("http")) {
                              window.open(doc.conteudo, "_blank", "noopener");
                            } else {
                              alert("Conteúdo disponível apenas internamente.");
                            }
                          }}
                        >
                          Ver
                        </button>
                      )
                      : <span className="text-muted-foreground italic">—</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {modalOpen && (
        <EmailModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSend={(email) => {
            if (pendingDoc) handleSendEmail(pendingDoc.tipo_documento, email);
            setPendingDoc(null);
          }}
        />
      )}
      {/* Botões gerar/enviar para cada TIPO de documento obrigatório */}
      <div className="flex flex-wrap gap-3 mb-4">
        {["Relação Provisória de Credores", "Inventário de Bens", "Relação de Credores Reconhecidos"].map(tipoDoc => (
          <div key={tipoDoc} className="flex gap-1 items-center">
            <button
              className="text-xs px-3 py-1 rounded bg-blue-600 text-white disabled:opacity-50"
              disabled={loadingDoc}
              onClick={() => handleGerarDoc(tipoDoc)}
            >
              Gerar PDF: {tipoDoc}
            </button>
            <button
              className="text-xs px-3 py-1 rounded bg-emerald-700 text-white disabled:opacity-50"
              disabled={loadingDoc}
              onClick={() => { setModalOpen(true); setPendingDoc({ tipo_documento: tipoDoc }); }}
            >
              Enviar por Email
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentosSection;
