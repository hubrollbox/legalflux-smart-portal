import React, { useEffect, useState } from "react";
import { fetchProcessos } from "@/services/processos";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import ReactPaginate from "react-paginate";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProcessoDetalhes from "@/components/processos/ProcessoDetalhes";

const PAGE_SIZE = 5;

const SkeletonRow = () => (
  <tr>
    <td colSpan={7} className="py-4">
      <div className="animate-pulse h-6 bg-gray-200 rounded w-full" />
    </td>
  </tr>
);

// Defina o tipo do processo conforme esperado pela tabela
export interface Processo {
  id: number;
  numero: string;
  titulo?: string;
  cliente?: string;
  advogado?: string;
  status: string;
  prazo?: string;
  valor?: string | number;
  movimentos?: Array<{ data: string; descricao: string }>;
}

const Processos = () => {
  const [processos, setProcessos] = useState<Processo[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedProcesso, setSelectedProcesso] = useState<Processo | null>(
    null
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "activo":
        return "bg-green-100 text-green-800";
      case "pendente":
        return "bg-yellow-100 text-yellow-800";
      case "arquivado":
        return "bg-gray-100 text-gray-800";
      case "concluido":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchProcessos(page + 1, PAGE_SIZE)
      .then(({ data, total }) => {
        setProcessos(data);
        setTotal(total);
      })
      .catch((err) => {
        toast.error("Erro ao carregar processos");
      })
      .finally(() => setLoading(false));
  }, [page]);

  const filteredProcessos = processos.filter((proc) => {
    const matchesSearch =
      proc.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proc.numero.includes(searchTerm);
    const matchesStatus = filterStatus ? proc.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-800">Processos</h1>
            <p className="text-gray-600">Gerir todos os processos jurídicos</p>
          </div>
          <Button className="bg-primary-800 hover:bg-primary-700">
            <Plus className="h-4 w-4 mr-2" />
            Novo Processo
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input
            placeholder="Buscar por número ou título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="flex-1 md:flex-none">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
              <SelectItem value="activo">Activo</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="arquivado">Arquivado</SelectItem>
              <SelectItem value="concluido">Concluído</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array(PAGE_SIZE)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse h-32 bg-gray-200 rounded-2xl"
                  ></div>
                ))
            : filteredProcessos.map((proc) => (
                <div
                  key={proc.id}
                  className="rounded-2xl border-0 shadow-lg p-4 bg-white"
                >
                  <h3 className="text-lg font-bold text-primary-800">
                    {proc.titulo || proc.numero}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Cliente: {proc.cliente || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Advogado: {proc.advogado || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Prazo: {proc.prazo || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Valor: {proc.valor || "N/A"}
                  </p>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(
                      proc.status
                    )}`}
                  >
                    {proc.status}
                  </span>
                  <Button
                    className="mt-4 bg-primary-800 hover:bg-primary-700 w-full"
                    onClick={() => setSelectedProcesso(proc)}
                  >
                    Ver Detalhes
                  </Button>
                </div>
              ))}
        </div>

        {/* Process Details Dialog */}
        {selectedProcesso && (
          <ProcessoDetalhes
            processo={selectedProcesso}
            open={!!selectedProcesso}
            onOpenChange={(open) => !open && setSelectedProcesso(null)}
          />
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <ReactPaginate
            previousLabel={"Anterior"}
            nextLabel={"Próxima"}
            breakLabel={"..."}
            pageCount={Math.ceil(total / PAGE_SIZE)}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={({ selected }) => setPage(selected)}
            containerClassName={"flex gap-2"}
            activeClassName={"font-bold underline"}
            pageClassName={"px-2"}
            previousClassName={"px-2"}
            nextClassName={"px-2"}
            breakClassName={"px-2"}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Processos;
