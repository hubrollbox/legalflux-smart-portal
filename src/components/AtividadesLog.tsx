import React from 'react';

interface LogEntry {
  user: string;
  action: string;
  target: string;
  date: string;
}

interface AtividadesLogProps {
  logs: LogEntry[];
}

const AtividadesLog: React.FC<AtividadesLogProps> = ({ logs }) => (
  <div className="bg-gray-50 border rounded p-4 mt-4">
    <h4 className="font-semibold mb-2 text-primary-800">Histórico de Alterações</h4>
    <ul className="text-sm text-gray-700 space-y-1">
      {logs.map((log, idx) => (
        <li key={idx}>
          <span className="font-medium">{log.user}</span> {log.action} <span className="font-medium">{log.target}</span> em {log.date}
        </li>
      ))}
    </ul>
  </div>
);

export default AtividadesLog;
