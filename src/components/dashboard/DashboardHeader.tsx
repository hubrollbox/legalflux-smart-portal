
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardHeaderProps {
  onNewProcess: () => void;
}

const DashboardHeader = ({ onNewProcess }: DashboardHeaderProps) => (
  <div className="flex justify-between items-center mb-8 dashboard-header">
    <div>
      <h1 className="text-3xl font-bold text-primary-800">Dashboard</h1>
      <p className="text-gray-600">Bem-vindo de volta! Aqui está o resumo dos seus processos.</p>
    </div>
    <button
      data-tour="new-process"
      className="bg-primary-800 hover:bg-primary-700 text-white px-4 py-2 rounded inline-flex items-center"
      title="Criar um novo processo jurídico"
      onClick={onNewProcess}
    >
      <Plus className="h-4 w-4 mr-2" />
      Novo Processo
    </button>
  </div>
);

export default DashboardHeader;
