
import ProcessosFilters from "@/components/processos/ProcessosFilters";
const ProcessosMainFilters = ({
  searchTerm,
  onSearchTerm,
  filterStatus,
  onFilterStatus,
}: {
  searchTerm: string;
  onSearchTerm: (s: string) => void;
  filterStatus: string;
  onFilterStatus: (s: string) => void;
}) => (
  <div className="my-6">
    <ProcessosFilters
      searchTerm={searchTerm}
      onSearchTerm={onSearchTerm}
      filterStatus={filterStatus}
      onFilterStatus={onFilterStatus}
    />
  </div>
);
export default ProcessosMainFilters;
