
import DashboardLayout from "@/components/DashboardLayout";
import SubscricoesTable from "@/components/SubscricoesTable";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { FileText } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function SubscricoesPage() {
  useScrollToTop();
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="flex items-center gap-3 mb-8">
          <FileText className="h-7 w-7 text-accent-700" />
          <h1 className="text-2xl font-bold text-primary-900">Add-ons & Subscrições</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="ml-1 cursor-help text-accent-400" tabIndex={0}>
                  <svg width={18} height={18} fill="none" viewBox="0 0 24 24" aria-hidden>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="16" r="1" fill="currentColor"/>
                    <path d="M12 12v-2a2 2 0 1 0-2-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                Veja e altere o estado das suas assinaturas de add-ons LegalFlux.
                <div className="mt-2 text-xs text-gray-600">
                  A tabela é acessível por <b>Tab</b> e as ações podem ser feitas via teclado.<br/>
                  Se houver muitos resultados, ative a paginação para melhor desempenho.
                </div>
                Clique em terminar para cancelar uma subscrição ativa.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="mb-6 text-gray-600">
          Gere facilmente as subscrições dos seus add-ons LegalFlux: consulte estado, datas de ativação e termine add-ons quando necessário.
        </p>
        <SubscricoesTable />
        {/* Widget dashboard customizável - Placeholder */}
        <div className="mt-10 mb-4 flex flex-col gap-4 border rounded-lg bg-accent-50 p-5 shadow transition hover:shadow-lg" tabIndex={0} aria-label="Configuração de widgets da dashboard">
          <span className="block text-lg font-semibold text-primary-800">Dashboard Personalizável <span className="text-xs text-gray-400">(beta)</span></span>
          <span className="text-neutral-700 text-sm">Em breve: Organize sua dashboard escolhendo seus próprios widgets de informação e ative/desative blocos como Resumo Financeiro, Próximos Prazos, Tarefas, Estatísticas, etc.</span>
          <button className="w-fit px-4 py-2 mt-2 rounded bg-accent-700 text-white text-sm hover:bg-accent-800 focus:outline focus:ring-2 focus:ring-accent-500" disabled tabIndex={0}>Configurar widgets (em breve)</button>
        </div>
      </div>
    </DashboardLayout>
  );
}
