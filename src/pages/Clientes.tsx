import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  Users,
  Phone,
  Mail,
  FileText,
  MoreHorizontal
} from 'lucide-react';
import ClienteForm from '@/components/clientes/ClienteForm';
import { useState } from 'react';

interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  tipo: string;
  processos: number;
  status: string;
  ultimo_contacto: string;
  valor_total: string;
  nif?: string;
  morada?: string;
  notas?: string;
}

const initialClientes: Cliente[] = [
  {
    id: 1,
    nome: 'João Silva',
    email: 'joao.silva@email.com',
    telefone: '+351 912 345 678',
    tipo: 'particular',
    processos: 3,
    status: 'activo',
    ultimo_contacto: '2024-01-10',
    valor_total: '€8,500'
  },
  {
    id: 2,
    nome: 'Maria Santos',
    email: 'maria.santos@email.com',
    telefone: '+351 923 456 789',
    tipo: 'particular',
    processos: 1,
    status: 'activo',
    ultimo_contacto: '2024-01-08',
    valor_total: '€3,500'
  },
  {
    id: 3,
    nome: 'TechCorp Lda',
    email: 'contacto@techcorp.pt',
    telefone: '+351 234 567 890',
    tipo: 'empresa',
    processos: 5,
    status: 'inactivo',
    ultimo_contacto: '2023-12-20',
    valor_total: '€25,000'
  }
];

const Clientes = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'activo':
        return 'bg-green-100 text-green-800';
      case 'inactivo':
        return 'bg-gray-100 text-gray-800';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'particular':
        return 'bg-blue-100 text-blue-800';
      case 'empresa':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const [showForm, setShowForm] = useState(false);
  const [clientesList, setClientesList] = useState<Cliente[]>(initialClientes);

  const handleAddCliente = async (data: Omit<Cliente, 'id' | 'processos' | 'status' | 'ultimo_contacto' | 'valor_total'>) => {
    setClientesList((prev) => [
      {
        id: prev.length + 1,
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        tipo: data.tipo,
        processos: 0,
        status: 'pendente',
        ultimo_contacto: new Date().toISOString().slice(0, 10),
        valor_total: '€0',
        nif: data.nif,
        morada: data.morada,
        notas: data.notas
      },
      ...prev
    ]);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-800">Clientes</h1>
            <p className="text-gray-600">Gerir informações e relacionamento com clientes</p>
          </div>
          <Button className="bg-primary-800 hover:bg-primary-700" onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Cliente
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Clientes</p>
                  <p className="text-2xl font-bold text-primary-800">156</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Activos</p>
                  <p className="text-2xl font-bold text-primary-800">132</p>
                </div>
                <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <div className="h-3 w-3 bg-green-600 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Particulares</p>
                  <p className="text-2xl font-bold text-primary-800">89</p>
                </div>
                <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <div className="h-3 w-3 bg-blue-600 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Empresas</p>
                  <p className="text-2xl font-bold text-primary-800">67</p>
                </div>
                <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <div className="h-3 w-3 bg-purple-600 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="rounded-2xl border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Pesquisar clientes..."
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

        {/* Clients Table */}
        <Card className="rounded-2xl border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary-800 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Lista de Clientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Processos</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Último Contacto</TableHead>
                  <TableHead>Valor Total</TableHead>
                  <TableHead>Acções</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientesList.map((cliente) => (
                  <TableRow key={cliente.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-primary-100 text-primary-800">
                            {cliente.nome.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-primary-800">{cliente.nome}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-2 text-gray-400" />
                          {cliente.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="h-3 w-3 mr-2 text-gray-400" />
                          {cliente.telefone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTipoColor(cliente.tipo)}>
                        {cliente.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-gray-400" />
                        {cliente.processos}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(cliente.status)}>
                        {cliente.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{cliente.ultimo_contacto}</TableCell>
                    <TableCell className="font-medium">{cliente.valor_total}</TableCell>
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

        <ClienteForm
          open={showForm}
          onOpenChange={setShowForm}
          onSubmit={handleAddCliente}
        />
      </div>
    </DashboardLayout>
  );
};

export default Clientes;
