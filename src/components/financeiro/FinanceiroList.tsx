// FinanceiroList.tsx
import { useEffect, useState } from 'react';
import { ContaFinanceira, FinanceiroService } from '@/services/FinanceiroService';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

interface FinanceiroListProps {
  onEdit: (conta: ContaFinanceira) => void;
  onDelete: (id: string) => void;
  filtro?: Partial<ContaFinanceira>;
}

export default function FinanceiroList({ onEdit, onDelete, filtro }: FinanceiroListProps) {
  const [contas, setContas] = useState<ContaFinanceira[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    FinanceiroService.list(filtro).then(setContas).finally(() => setLoading(false));
  }, [filtro]);

  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [[
        'Descrição', 'Valor', 'Tipo', 'Status', 'Vencimento', 'Pagamento'
      ]],
      body: contas.map(c => [
        c.descricao,
        `R$ ${c.valor.toFixed(2)}`,
        c.tipo === 'receita' ? 'Receita' : 'Despesa',
        c.status === 'pago' ? 'Pago' : 'Pendente',
        c.dataVencimento,
        c.dataPagamento || '-'
      ]),
    });
    doc.save('relatorio-financeiro.pdf');
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(contas.map(c => ({
      Descrição: c.descricao,
      Valor: c.valor,
      Tipo: c.tipo === 'receita' ? 'Receita' : 'Despesa',
      Status: c.status === 'pago' ? 'Pago' : 'Pendente',
      Vencimento: c.dataVencimento,
      Pagamento: c.dataPagamento || '-',
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Contas');
    XLSX.writeFile(wb, 'relatorio-financeiro.xlsx');
  };

  if (loading) return <div>Carregando contas...</div>;
  if (!contas.length) return <div>Nenhuma conta encontrada.</div>;

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <button className="btn btn-xs btn-outline" onClick={exportPDF}>Exportar PDF</button>
        <button className="btn btn-xs btn-outline" onClick={exportExcel}>Exportar Excel</button>
      </div>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Descrição</th>
            <th className="border px-2 py-1">Valor</th>
            <th className="border px-2 py-1">Tipo</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Vencimento</th>
            <th className="border px-2 py-1">Pagamento</th>
            <th className="border px-2 py-1">Ações</th>
          </tr>
        </thead>
        <tbody>
          {contas.map(c => (
            <tr key={c.id}>
              <td className="border px-2 py-1">{c.descricao}</td>
              <td className="border px-2 py-1">R$ {c.valor.toFixed(2)}</td>
              <td className="border px-2 py-1">{c.tipo === 'receita' ? 'Receita' : 'Despesa'}</td>
              <td className="border px-2 py-1">{c.status === 'pago' ? 'Pago' : 'Pendente'}</td>
              <td className="border px-2 py-1">{c.dataVencimento}</td>
              <td className="border px-2 py-1">{c.dataPagamento || '-'}</td>
              <td className="border px-2 py-1">
                <button className="btn btn-xs btn-primary mr-2" onClick={() => onEdit(c)}>Editar</button>
                <button className="btn btn-xs btn-danger" onClick={() => c.id && onDelete(c.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
