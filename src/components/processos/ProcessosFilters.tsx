
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProcessosFiltersProps {
  searchTerm: string;
  onSearchTerm: (v: string) => void;
  filterStatus: string;
  onFilterStatus: (v: string) => void;
}
const statusList = [
  { value: "all", label: "Todos" },
  { value: "activo", label: "Activo" },
  { value: "pendente", label: "Pendente" },
  { value: "arquivado", label: "Arquivado" },
  { value: "concluido", label: "Concluído" }
];

const ProcessosFilters = ({
  searchTerm,
  onSearchTerm,
  filterStatus,
  onFilterStatus
}: ProcessosFiltersProps) => (
  <div className="flex flex-col md:flex-row gap-4 mb-6">
    <Input
      placeholder="Buscar por número ou título..."
      value={searchTerm}
      onChange={e => onSearchTerm(e.target.value)}
      className="flex-1"
    />
    <Select value={filterStatus} onValueChange={onFilterStatus}>
      <SelectTrigger className="flex-1 md:flex-none">
        <SelectValue placeholder="Filtrar por status" />
      </SelectTrigger>
      <SelectContent>
        {statusList.map(status => (
          <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default ProcessosFilters;
