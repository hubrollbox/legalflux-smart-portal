
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProcessosHeaderProps {
  onNew: () => void;
}
const ProcessosHeader = ({ onNew }: ProcessosHeaderProps) => (
  <div className="flex justify-between items-center mb-8">
    <div>
      <h1 className="text-3xl font-bold text-primary-800">Processos</h1>
      <p className="text-gray-600">Gerir todos os processos jurídicos</p>
    </div>
    <Button
      className="bg-primary-800 hover:bg-primary-700"
      onClick={onNew}
    >
      <Plus className="h-4 w-4 mr-2" />
      Novo Processo
    </Button>
  </div>
);

export default ProcessosHeader;
