
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import React from "react";

interface Case {
  id: number;
  title: string;
  status: string;
  deadline: string;
  priority: string;
}

interface DashboardRecentCasesProps {
  cases: Case[];
  onSeeAll: () => void;
}

const DashboardRecentCases: React.FC<DashboardRecentCasesProps> = React.memo(({ cases, onSeeAll }) => (
  <Card className="rounded-2xl border-0 shadow-lg">
    <CardHeader className="pb-4">
      <CardTitle className="text-primary-800 flex items-center">
        <FileText className="h-5 w-5 mr-2" />
        Processos Recentes
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {cases.map((case_item) => (
          <div key={case_item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex-1">
              <h4 className="font-medium text-primary-800">{case_item.title}</h4>
              <p className="text-sm text-gray-600">{case_item.status}</p>
              <p className="text-xs text-gray-500">Prazo: {case_item.deadline}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                case_item.priority === "Alta" ? "bg-red-100 text-red-800"
                : case_item.priority === "Média" ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}>
                {case_item.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        className="w-full mt-4 border-primary-800 text-primary-800 hover:bg-primary-50"
        onClick={onSeeAll}
      >
        Ver Todos os Processos
      </Button>
    </CardContent>
  </Card>
));
export default DashboardRecentCases;
