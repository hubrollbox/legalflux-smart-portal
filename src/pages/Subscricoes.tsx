
import DashboardLayout from "@/components/DashboardLayout";
import SubscricoesTable from "@/components/SubscricoesTable";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { FileText } from "lucide-react";

export default function SubscricoesPage() {
  useScrollToTop();
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="flex items-center gap-3 mb-8">
          <FileText className="h-7 w-7 text-accent-700" />
          <h1 className="text-2xl font-bold text-primary-900">Add-ons & Subscrições</h1>
        </div>
        <p className="mb-6 text-gray-600">
          Gere facilmente as subscrições dos seus add-ons LegalFlux: consulte estado, datas de ativação e termine add-ons quando necessário.
        </p>
        <SubscricoesTable />
      </div>
    </DashboardLayout>
  );
}
