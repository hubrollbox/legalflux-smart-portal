
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ProcessosHeader from "@/components/processos/ProcessosHeader";
import ProcessosMainFilters from "@/components/processos/ProcessosMainFilters";
import ProcessosList from "@/components/processos/ProcessosList";
import ProcessosModalForm from "@/components/processos/ProcessosModalForm";
import { ProcessoService } from "@/services/ProcessoService";

const PAGE_SIZE = 6;

const Processos = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editProc, setEditProc] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);

  // Simplified fetch: (in real project use React Query)
  const [data, setData] = React.useState({ data: [], total: 0, loading: true });

  React.useEffect(() => {
    setData((d) => ({ ...d, loading: true }));
    ProcessoService.fetchProcessos(page, PAGE_SIZE).then((res) => {
      setData({ ...res, loading: false });
    });
  }, [page, refresh]);

  // Filters
  const filtered =
    filterStatus === "all"
      ? data.data
      : data.data.filter((p) => p.status === filterStatus);

  const searched = search.trim()
    ? filtered.filter(
        (p) =>
          (p.titulo || "").toLowerCase().includes(search.toLowerCase()) ||
          (p.numero || "").toLowerCase().includes(search.toLowerCase())
      )
    : filtered;

  // Status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "activo":
        return "bg-green-100 text-green-700";
      case "pendente":
        return "bg-yellow-100 text-yellow-700";
      case "arquivado":
        return "bg-gray-100 text-gray-800";
      case "concluido":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-50 text-gray-500";
    }
  };

  return (
    <DashboardLayout>
      <ProcessosHeader onNew={() => setModalOpen(true)} />
      <div className="px-2 sm:px-6">
        <ProcessosMainFilters
          searchTerm={search}
          onSearchTerm={setSearch}
          filterStatus={filterStatus}
          onFilterStatus={setFilterStatus}
        />
        <ProcessosList
          processos={searched}
          loading={data.loading}
          onView={setEditProc}
          onEdit={setEditProc}
          onDelete={() => setRefresh((r) => !r)}
          getStatusColor={getStatusColor}
          pageSize={PAGE_SIZE}
        />
        {/* Paginação futura */}
      </div>
      <ProcessosModalForm
        open={modalOpen || !!editProc}
        onOpenChange={(open) => {
          setModalOpen(open);
          if (!open) setEditProc(null);
        }}
        onSubmit={async (proc) => {
          // Add or update
          if (!editProc) {
            await ProcessoService.addProcesso(proc);
          } else {
            await ProcessoService.updateProcesso(editProc.id, proc);
          }
          setRefresh((r) => !r);
        }}
        processo={editProc}
      />
    </DashboardLayout>
  );
};

export default Processos;
