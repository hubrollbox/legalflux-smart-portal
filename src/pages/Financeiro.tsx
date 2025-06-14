import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Euro,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Receipt,
  Download,
  Plus,
  Filter
} from 'lucide-react';
import { useState, useEffect } from 'react';
import TransacaoForm from '@/components/financeiro/TransacaoForm';
import { FinanceiroService, ContaFinanceira } from '@/services/FinanceiroService';

export default function FinanceiroPage() {
  const [editing, setEditing] = useState<ContaFinanceira | null>(null);
  const [refresh, setRefresh] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [transacoesList, setTransacoesList] = useState<ContaFinanceira[]>([]);
  const [loading, setLoading] = useState(true);
  const [resumoFinanceiro, setResumoFinanceiro] = useState({
    receita_mensal: 0,
    despesas_mensais: 0,
    pendente_recebimento: 0,
    margem_lucro: 0,
  });

  useEffect(() => {
    setLoading(true);
    FinanceiroService.list().then(data => {
      setTransacoesList(data);
      // Calcular resumo
      const receita = data.filter(t => t.tipo === 'receita').reduce((sum, t) => sum + (t.valor || 0), 0);
      const despesas = data.filter(t => t.tipo === 'despesa').reduce((sum, t) => sum + (t.valor || 0), 0);
      const pendente = data.filter(t => t.tipo === 'receita' && t.status === 'pendente').reduce((sum, t) => sum + (t.valor || 0), 0);
      const margem = receita > 0 ? Math.round(((receita - despesas) / receita) * 100) : 0;
      setResumoFinanceiro({
        receita_mensal: receita,
        despesas_mensais: despesas,
        pendente_recebimento: pendente,
        margem_lucro: margem,
      });
    }).finally(() => setLoading(false));
  }, [refresh]);

  const handleSave = () => {
    setEditing(null);
    setRefresh(r => r + 1);
  };
  const handleEdit = (conta: ContaFinanceira) => setEditing(conta);
  const handleDelete = async (id: string) => {
    if (window.confirm('Excluir esta conta?')) {
      // @ts-expect-error dynamic import for service, type not inferred
      await import('@/services/FinanceiroService').then(s => s.FinanceiroService.remove(id));
      setRefresh(r => r + 1);
    }
  };

  function getTipoColor(tipo: string) {
    if (tipo === 'receita') return 'text-green-700';
    if (tipo === 'despesa') return 'text-red-700';
    return '';
  }
  function getStatusColor(status: string) {
    if (status === 'pago') return 'bg-green-100 text-green-800';
    if (status === 'pendente') return 'bg-yellow-100 text-yellow-800';
    if (status === 'atrasado') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  }

  async function handleAddTransacao(data: any) {
    // Adaptação para interface de ContaFinanceira
    await FinanceiroService.create({
      ...data,
      dataVencimento: data.dataVencimento || new Date().toISOString().slice(0, 10),
    });
    setShowForm(false);
    setRefresh(r => r + 1);
  }

  // Exemplo de dados para o gráfico (substituir por dados reais do FinanceiroService)
  const chartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Receita',
        data: [1200, 1500, 1100, 1800, 1700, 2000],
        backgroundColor: 'rgba(34,197,94,0.5)',
      },
      {
        label: 'Despesa',
        data: [800, 900, 700, 1200, 1100, 1300],
        backgroundColor: 'rgba(239,68,68,0.5)',
      },
    ],
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-800">Financeiro</h1>
            <p className="text-gray-600">Gestão financeira e relatórios</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="border-primary-800 text-primary-800">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button className="bg-primary-800 hover:bg-primary-700" onClick={() => setEditing({ descricao: '', valor: 0, tipo: 'receita', status: 'pendente', dataVencimento: '' })}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Transação
            </Button>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Receita Mensal</p>
                  <p className="text-2xl font-bold text-primary-800">€{resumoFinanceiro.receita_mensal.toLocaleString()}</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +23% vs mês anterior
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-green-50">
                  <Euro className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Despesas Mensais</p>
                  <p className="text-2xl font-bold text-primary-800">€{resumoFinanceiro.despesas_mensais.toLocaleString()}</p>
                  <p className="text-sm text-red-600 flex items-center mt-1">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    +5% vs mês anterior
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-red-50">
                  <CreditCard className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pendente Recebimento</p>
                  <p className="text-2xl font-bold text-primary-800">€{resumoFinanceiro.pendente_recebimento.toLocaleString()}</p>
                  <p className="text-sm text-yellow-600 mt-1">
                    5 faturas em aberto
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-yellow-50">
                  <Receipt className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Margem de Lucro</p>
                  <p className="text-2xl font-bold text-primary-800">{resumoFinanceiro.margem_lucro}%</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +2.1% vs mês anterior
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-blue-50">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="rounded-2xl border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex gap-4">
                <Button variant="outline" className="border-primary-800 text-primary-800">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
                <Button variant="outline">Este Mês</Button>
                <Button variant="outline">Receitas</Button>
                <Button variant="outline">Despesas</Button>
              </div>
              <div className="text-sm text-gray-600">
                Total: €{transacoesList.reduce((sum, t) => sum + (t.tipo === 'receita' ? t.valor : -t.valor), 0).toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card className="rounded-2xl border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary-800 flex items-center">
              <Euro className="h-5 w-5 mr-2" />
              Transações Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Método</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transacoesList.map((transacao) => (
                  <TableRow key={transacao.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-primary-800">{transacao.descricao}</p>
                      </div>
                    </TableCell>
                    <TableCell>{transacao.clienteId ?? ''}</TableCell>
                    <TableCell>
                      <span className={`capitalize ${getTipoColor(transacao.tipo)}`}>
                        {transacao.tipo}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium ${getTipoColor(transacao.tipo)}`}>
                        {transacao.tipo === 'receita' ? '+' : '-'}€{transacao.valor.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(transacao.status)}>
                        {transacao.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{transacao.dataVencimento}</TableCell>
                    <TableCell>{transacao.metodo_pagamento ?? ''}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* New Transaction Form */}
        <TransacaoForm
          open={showForm}
          onOpenChange={setShowForm}
          onSubmit={handleAddTransacao}
        />
      </div>
    </DashboardLayout>
  );
};
