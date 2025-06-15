
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
                Veja e altere o estado das suas assinaturas de add-ons LegalFlux. Clique em terminar para cancelar uma subscrição ativa.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="mb-6 text-gray-600">
          Gere facilmente as subscrições dos seus add-ons LegalFlux: consulte estado, datas de ativação e termine add-ons quando necessário.
        </p>
        <SubscricoesTable />
      </div>
    </DashboardLayout>
  );
}
