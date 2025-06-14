
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProcessoDTO {
  id: string;
  numero: string;
  descricao: string;
}

interface ProcessosResumoProps {
  processos: ProcessoDTO[];
  loading: boolean;
}

const ProcessosResumo = ({ processos, loading }: ProcessosResumoProps) => {
  return (
    <>
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
    </>
  );
};

export default ProcessosResumo;
