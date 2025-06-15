
import { integrationList } from "@/data/integrations";
import IntegrationCard from "@/components/integrations/IntegrationCard";

export default function AvailableAddonsSection() {
  // Selecionar apenas add-ons disponíveis para subscrição
  const availableAddons = integrationList.filter(
    (i) => i.category === "Add-ons" && i.status === "disponivel"
  );

  if (!availableAddons.length) return null;

  return (
    <div className="my-12">
      <h2 className="text-xl md:text-2xl font-bold text-primary-800 mb-4">
        Add-ons Disponíveis
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {availableAddons.map((addon) => (
          <IntegrationCard key={addon.id} integration={addon} />
        ))}
      </div>
    </div>
  );
}
