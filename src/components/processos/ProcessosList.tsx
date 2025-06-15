
import { Button } from "@/components/ui/button";
import type { Processo } from "@/pages/Processos";

interface ProcessosListProps {
  processos: Processo[];
  loading: boolean;
  onView: (proc: Processo) => void;
  onEdit: (proc: Processo) => void;
  onDelete: (id: number) => void;
  getStatusColor: (status: string) => string;
  pageSize: number;
}

const ProcessosList = ({
  processos,
  loading,
  onView,
  onEdit,
  onDelete,
  getStatusColor,
  pageSize
}: ProcessosListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading
        ? Array(pageSize).fill(0).map((_, i) => (
            <div
              key={i}
              className="animate-pulse h-32 bg-gray-200 rounded-2xl"
            ></div>
          ))
        : processos.map(proc => (
            <div
              key={proc.id}
              className="rounded-2xl border-0 shadow-lg p-4 bg-white"
            >
              <h3 className="text-lg font-bold text-primary-800">
                {proc.titulo || proc.numero}
              </h3>
              <p className="text-sm text-gray-600">Cliente: {proc.cliente || "N/A"}</p>
              <p className="text-sm text-gray-600">Advogado: {proc.advogado || "N/A"}</p>
              <p className="text-sm text-gray-600">Prazo: {proc.prazo || "N/A"}</p>
              <p className="text-sm text-gray-600">Valor: {proc.valor || "N/A"}</p>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(
                  proc.status
                )}`}
              >
                {proc.status}
              </span>
              <Button
                className="mt-4 bg-primary-800 hover:bg-primary-700 w-full"
                onClick={() => onView(proc)}
              >
                Ver Detalhes
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(proc)}
                title="Editar"
                className="ml-2"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor"><path d="M12.65 3.35a2.121 2.121 0 0 1 3 3L7.5 14.5H4v-3.5l8.65-7.65Z"/></svg>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(proc.id)}
                title="Remover"
                className="ml-1"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor"><path d="M6 6v6m4-6v6M3 6h10M5 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
              </Button>
            </div>
          ))}
    </div>
  );
};

export default ProcessosList;
