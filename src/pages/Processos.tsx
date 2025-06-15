import React, { useEffect, useState } from "react";
import { fetchProcessos, addProcesso, updateProcesso, deleteProcesso } from "@/services/ProcessoService";
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
import AtividadesLog from "@/components/AtividadesLog";
import ModelosJuridicos from "@/components/ModelosJuridicos";
import ProcessoForm from '@/components/processos/ProcessoForm';
import ProcessosHeader from "@/components/processos/ProcessosHeader";
import ProcessosFilters from "@/components/processos/ProcessosFilters";
import ProcessosList from "@/components/processos/ProcessosList";
import ProcessosPagination from "@/components/processos/ProcessosPagination";

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

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.
        </div>
      );
    }

    return this.props.children;
  }
}

// Function to validate and map data to Processo interface
const mapToProcesso = (raw: any): Processo => ({
  id: Number(raw.id) || 0,
  numero: raw.numero || `PROC-${Date.now()}`,
  titulo: raw.titulo || '',
  cliente: raw.cliente || '',
  advogado: raw.advogado || '',
  status: raw.status || 'pendente',
  prazo: raw.prazo || '',
  valor: raw.valor || '',
  movimentos: raw.movimentos || [],
});

const isValidProcesso = (raw: any): boolean => {
  return raw && (raw.numero || raw.titulo) && raw.status;
};

const Processos = () => {
  console.log("Rendering Processos page");

  const [processos, setProcessos] = useState<Processo[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedProcesso, setSelectedProcesso] = useState<Processo | null>(
    null
  );
  const [showForm, setShowForm] = useState(false);
  const [editProcesso, setEditProcesso] = useState<Processo | null>(null);

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
        // Filter and map data to valid Processo objects
        const processosFormatados: Processo[] = Array.isArray(data) 
          ? data.filter(isValidProcesso).map(mapToProcesso)
          : [];
        setProcessos(processosFormatados);
        setTotal(total);
      })
      .catch((err) => {
        toast.error("Erro ao carregar processos");
      })
      .finally(() => setLoading(false));
  }, [page]);

  const handleAddProcesso = async (data: any) => {
    try {
      const novoRaw = await addProcesso(data);
      if (isValidProcesso(novoRaw)) {
        const novo = mapToProcesso(novoRaw);
        setProcessos((prev) => [novo, ...prev]);
      }
      setShowForm(false);
    } catch (e) {
      toast.error("Erro ao adicionar processo");
    }
  };

  const handleEditProcesso = async (data: any) => {
    if (!editProcesso) return;
    try {
      const atualizadoRaw = await updateProcesso(editProcesso.id, data);
      if (isValidProcesso(atualizadoRaw)) {
        const atualizado = mapToProcesso(atualizadoRaw);
        setProcessos((prev) => prev.map(p => p.id === atualizado.id ? atualizado : p));
      }
      setEditProcesso(null);
    } catch (e) {
      toast.error("Erro ao editar processo");
    }
  };

  const handleDeleteProcesso = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja remover este processo?")) return;
    try {
      await deleteProcesso(id);
      setProcessos((prev) => prev.filter(p => p.id !== id));
    } catch (e) {
      toast.error("Erro ao remover processo");
    }
  };

  const filteredProcessos = processos.filter((proc) => {
    const matchesSearch =
      proc.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proc.numero.includes(searchTerm);
    const matchesStatus = filterStatus && filterStatus !== "all" ? proc.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  // Exemplo de uso dos componentes:
  const logs = [
    { user: "Usuário X", action: "editou", target: "documento Y", date: "01/10/2023" },
    { user: "Usuário Y", action: "criou", target: "caso Z", date: "02/10/2023" },
  ];
  const modelos = [
    { nome: "Contrato de Prestação de Serviços", url: "/modelos/contrato-prestacao.pdf" },
    { nome: "Petição Inicial", url: "/modelos/peticao-inicial.docx" },
  ];

  return (
    <ErrorBoundary>
      <DashboardLayout>
        <div className="p-6">
          <ProcessosHeader onNew={() => setShowForm(true)} />
          <ProcessosFilters
            searchTerm={searchTerm}
            onSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            onFilterStatus={setFilterStatus}
          />
          <ProcessosList
            processos={filteredProcessos}
            loading={loading}
            onView={proc => setSelectedProcesso(proc)}
            onEdit={proc => setEditProcesso(proc)}
            onDelete={handleDeleteProcesso}
            getStatusColor={getStatusColor}
            pageSize={PAGE_SIZE}
          />
          {selectedProcesso && (
            <ProcessoDetalhes
              processo={selectedProcesso}
              open={!!selectedProcesso}
              onOpenChange={open => !open && setSelectedProcesso(null)}
            />
          )}
          {/* Atividades Log e Modelos Jurídicos - Exemplo de uso dos novos componentes */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-primary-800 mb-4">
              Histórico de Alterações
            </h2>
            <AtividadesLog logs={logs} />
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-primary-800 mb-4">
              Modelos Jurídicos
            </h2>
            <ModelosJuridicos modelos={modelos} />
          </div>
          <ProcessosPagination
            pageCount={Math.ceil(total / PAGE_SIZE)}
            onPageChange={selected => setPage(selected)}
          />
        </div>
        <ProcessoForm
          open={showForm}
          onOpenChange={setShowForm}
          onSubmit={handleAddProcesso}
        />
        <ProcessoForm
          open={!!editProcesso}
          onOpenChange={() => setEditProcesso(null)}
          onSubmit={handleEditProcesso}
          processo={editProcesso || undefined}
        />
      </DashboardLayout>
    </ErrorBoundary>
  );
};

export default Processos;
