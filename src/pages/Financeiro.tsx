
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

const Financeiro = () => {
  const resumoFinanceiro = {
    receita_mensal: 15280,
    despesas_mensais: 3420,
    pendente_recebimento: 8950,
    margem_lucro: 77.6
  };

  const transacoes = [
    {
      id: 1,
      descricao: 'Honorários - Processo Trabalhista João Silva',
      valor: 2500,
      tipo: 'receita',
      data: '2024-01-10',
      status: 'pago',
      cliente: 'João Silva',
      metodo: 'Transferência'
    },
    {
      id: 2,
      descricao: 'Honorários - Divórcio Maria Santos',
      valor: 1800,
      tipo: 'receita',
      data: '2024-01-08',
      status: 'pendente',
      cliente: 'Maria Santos',
      metodo: 'Por definir'
    },
    {
      id: 3,
      descricao: 'Despesas de deslocação - Tribunal',
      valor: 45,
      tipo: 'despesa',
      data: '2024-01-07',
      status: 'pago',
      cliente: '-',
      metodo: 'Cartão'
    },
    {
      id: 4,
      descricao: 'Honorários - Contrato TechCorp',
      valor: 5000,
      tipo: 'receita',
      data: '2024-01-05',
      status: 'pago',
      cliente: 'TechCorp',
      metodo: 'Transferência'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pago':
        return 'bg-green-100 text-green-800';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'atrasado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'receita':
        return 'text-green-600';
      case 'despesa':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
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
            <Button className="bg-primary-800 hover:bg-primary-700">
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
                Total: €{transacoes.reduce((sum, t) => sum + (t.tipo === 'receita' ? t.valor : -t.valor), 0).toLocaleString()}
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
                {transacoes.map((transacao) => (
                  <TableRow key={transacao.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-primary-800">{transacao.descricao}</p>
                      </div>
                    </TableCell>
                    <TableCell>{transacao.cliente}</TableCell>
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
                    <TableCell>{transacao.data}</TableCell>
                    <TableCell>{transacao.metodo}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Financeiro;
