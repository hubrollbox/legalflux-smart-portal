import React, { useEffect, useState } from "react";
import { fetchProcessos } from "@/services/processos";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import ReactPaginate from "react-paginate";

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

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-2xl shadow">
            <thead>
              <tr>
                <th className="px-4 py-2">Número</th>
                <th className="px-4 py-2">Título</th>
                <th className="px-4 py-2">Cliente</th>
                <th className="px-4 py-2">Advogado</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Prazo</th>
                <th className="px-4 py-2">Valor</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array(PAGE_SIZE)
                    .fill(0)
                    .map((_, i) => <SkeletonRow key={i} />)
                : processos.map((proc) => (
                    <tr key={proc.id}>
                      <td className="px-4 py-2">{proc.numero}</td>
                      <td className="px-4 py-2">{proc.titulo}</td>
                      <td className="px-4 py-2">{proc.cliente}</td>
                      <td className="px-4 py-2">{proc.advogado}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(
                            proc.status
                          )}`}
                        >
                          {proc.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">{proc.prazo}</td>
                      <td className="px-4 py-2">{proc.valor}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

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
