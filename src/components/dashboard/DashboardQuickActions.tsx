
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, Calendar, TrendingUp } from "lucide-react";
import React from "react";

interface DashboardQuickActionsProps {
  onNewProcess: () => void;
  onAddClient: () => void;
  onCreateEvent: () => void;
  onReport: () => void;
}

const quickActions = [
  {
    icon: FileText,
    label: "Novo Processo",
    onClickKey: "onNewProcess",
    title: "Criar um novo processo jurídico"
  },
  {
    icon: Users,
    label: "Adicionar Cliente",
    onClickKey: "onAddClient",
    title: "Adicionar um novo cliente"
  },
  {
    icon: Calendar,
    label: "Criar Evento",
    onClickKey: "onCreateEvent",
    title: "Agendar um novo evento ou prazo"
  },
  {
    icon: TrendingUp,
    label: "Relatório",
    onClickKey: "onReport",
    title: "Gerar relatório financeiro"
  },
];

const DashboardQuickActions: React.FC<DashboardQuickActionsProps> = React.memo(({
  onNewProcess,
  onAddClient,
  onCreateEvent,
  onReport
}) => {
  const handlers: { [key: string]: () => void } = {
    onNewProcess, onAddClient, onCreateEvent, onReport
  };
  return (
    <Card className="rounded-2xl border-0 shadow-lg mt-8">
      <CardHeader>
        <CardTitle className="text-primary-800">Acções Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map(({ icon: Icon, label, onClickKey, title }) => (
            <Button
              key={label}
              variant="outline"
              className="h-20 flex-col space-y-2"
              title={title}
              onClick={handlers[onClickKey]}
            >
              <Icon className="h-6 w-6" />
              <span className="text-sm">{label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});
export default DashboardQuickActions;
