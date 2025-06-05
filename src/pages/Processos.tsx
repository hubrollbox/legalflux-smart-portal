
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  Plus,
  Search,
  Filter,
  FileText,
  Calendar,
  User,
  MoreHorizontal
} from 'lucide-react';

const Processos = () => {
  const processos = [
    {
      id: 1,
      numero: '2024/001',
      titulo: 'Processo Trabalhista - João Silva',
      cliente: 'João Silva',
      advogado: 'Dr. Ana Costa',
      status: 'activo',
      prazo: '2024-01-15',
      valor: '€5,000',
      created_at: '2024-01-01'
    },
    {
      id: 2,
      numero: '2024/002',
      titulo: 'Divórcio - Maria Santos',
      cliente: 'Maria Santos',
      advogado: 'Dr. Pedro Oliveira',
      status: 'pendente',
      prazo: '2024-01-20',
      valor: '€3,500',
      created_at: '2024-01-02'
    },
    {
      id: 3,
      numero: '2024/003',
      titulo: 'Contrato Empresarial - TechCorp',
      cliente: 'TechCorp Lda',
      advogado: 'Dr. Ana Costa',
      status: 'arquivado',
      prazo: '2024-01-25',
      valor: '€12,000',
      created_at: '2024-01-03'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'activo':
        return 'bg-green-100 text-green-800';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'arquivado':
        return 'bg-gray-100 text-gray-800';
      case 'concluido':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-800">Processos</h1>
            <p className="text-gray-600">Gerir todos os processos jurídicos</p>
          </div>
          <Button className="bg-primary-800 hover:bg-primary-700">
            <Plus className="h-4 w-4 mr-2" />
            Novo Processo
          </Button>
        </div>

        {/* Filters */}
        <Card className="rounded-2xl border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Pesquisar processos..."
                  className="pl-10 rounded-xl border-gray-200"
                />
              </div>
              <Button variant="outline" className="border-primary-800 text-primary-800">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Processes Table */}
        <Card className="rounded-2xl border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary-800 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Lista de Processos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Advogado</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Prazo</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Acções</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processos.map((processo) => (
                  <TableRow key={processo.id}>
                    <TableCell className="font-medium">{processo.numero}</TableCell>
                    <TableCell>{processo.titulo}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-gray-400" />
                        {processo.cliente}
                      </div>
                    </TableCell>
                    <TableCell>{processo.advogado}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(processo.status)}>
                        {processo.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {processo.prazo}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{processo.valor}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
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

export default Processos;
