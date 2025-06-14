
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

interface Stat {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  color: string;
}

interface DashboardStatsProps {
  stats: Stat[];
}

const DashboardStats: React.FC<DashboardStatsProps> = React.memo(({ stats }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
    {stats.map((stat, index) => (
      <Card key={index} className="rounded-2xl border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-primary-800 mt-1">{stat.value}</p>
              <p className={`text-sm mt-1 ${
                stat.change.startsWith("+") ? "text-green-600" : "text-red-600"
              }`}>
                {stat.change} vs mês anterior
              </p>
            </div>
            <div className={`p-3 rounded-xl bg-gray-50 ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
));
export default DashboardStats;
