import DashboardLayout from "@/components/DashboardLayout";
import SubscricoesTable from "@/components/SubscricoesTable";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { FileText } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import AvailableAddonsSection from "@/components/AvailableAddonsSection";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function SubscricoesPage() {
  useScrollToTop();

  // Listagem dos três planos, igual ao arquivo Pricing.tsx
  const plans = [
    {
      name: "Básico",
      price: "€29",
      period: "/mês",
      description: "Ideal para advogados independentes",
      features: [
        "Até 10 processos",
        "5GB de armazenamento",
        "Chat directo com suporte",
        "IA avançada para insights",
        "Calendário de prazos",
        "Upload de documentos",
        "Relatórios básicos",
        "15 dias de trial grátis"
      ],
      buttonText: "Escolher Básico",
      buttonVariant: "default" as const,
      popular: false
    },
    {
      name: "Profissional",
      price: "€79",
      period: "/mês",
      description: "Para advogados e consultórios pequenos",
      features: [
        "Processos ilimitados",
        "25GB de armazenamento",
        "Suporte prioritário",
        "IA completa + automações",
        "Gestão de clientes",
        "Chat seguro com clientes",
        "Relatórios avançados",
        "Multi-utilizador (até 3)",
        "Templates premium",
        "15 dias de trial grátis"
      ],
      buttonText: "Escolher Profissional",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      name: "Escritório",
      price: "€199",
      period: "/mês",
      description: "Para escritórios e empresas",
      features: [
        "Tudo do Profissional",
        "100GB de armazenamento",
        "Suporte dedicado",
        "Utilizadores ilimitados",
        "Dashboard administrativo",
        "Permissões avançadas (RBAC)",
        "Gestão de assistentes",
        "API personalizada",
        "Onboarding personalizado",
        "Integração Stripe completa",
        "15 dias de trial grátis"
      ],
      buttonText: "Falar com Vendas",
      buttonVariant: "default" as const,
      popular: false
    }
  ];

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
        {/* Planos disponíveis para subscrição */}
        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-primary-800 mb-4">
            Planos Legais Disponíveis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <Card 
                key={plan.name}
                className={`relative rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${plan.popular ? "ring-2 ring-primary-800 scale-105" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-800 text-white px-4 py-2 rounded-full text-xs font-semibold">
                      Mais Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center p-6 pb-3">
                  <h3 className="text-lg font-bold text-primary-800 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-2 flex items-end justify-center gap-1">
                    <span className="text-3xl font-bold text-primary-800">{plan.price}</span>
                    <span className="text-gray-500">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 text-xs">{plan.description}</p>
                </CardHeader>
                <CardContent className="p-6 pt-2">
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start">
                        <Check className="h-4 w-4 text-accent-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-xs">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="w-full rounded-md py-2 font-semibold bg-primary-800 hover:bg-primary-700 text-white text-sm transition disabled:opacity-60"
                    disabled
                    aria-disabled="true"
                  >
                    {plan.buttonText}
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Add-ons disponíveis para subscrição */}
        <AvailableAddonsSection />

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
