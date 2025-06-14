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
import { useState, useEffect } from 'react';
import { fetchClientes, addCliente, updateCliente, deleteCliente } from '@/services/ClienteService';

export interface Cliente {
  id: string;
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

const isClienteValido = (raw: any): raw is Cliente =>
  raw &&
  typeof raw.nome === 'string' &&
  typeof raw.email === 'string' &&
  typeof raw.telefone === 'string' &&
  typeof raw.tipo === 'string' &&
  typeof raw.processos !== 'undefined' &&
  typeof raw.status === 'string' &&
  typeof raw.ultimo_contacto === 'string' &&
  typeof raw.valor_total === 'string';

const mapToCliente = (raw: any): Cliente => ({
  id: raw.id?.toString() ?? '-',
  nome: raw.nome ?? 'Sem nome',
  email: raw.email ?? 'Sem email',
  telefone: raw.telefone ?? 'Sem telefone',
  tipo: raw.tipo ?? 'particular',
  processos: raw.processos ?? 0,
  status: raw.status ?? 'pendente',
  ultimo_contacto: raw.ultimo_contacto ?? '',
  valor_total: raw.valor_total ?? '€0',
  nif: raw.nif ?? '',
  morada: raw.morada ?? '',
  notas: raw.notas ?? '',
});

const Clientes = () => {
  const [showForm, setShowForm] = useState(false);
  const [clientesList, setClientesList] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [editCliente, setEditCliente] = useState<Cliente | null>(null);

  useEffect(() => {
    async function loadClientes() {
      setLoading(true);
      try {
        const data = await fetchClientes();
        const clientesCorrigidos: Cliente[] = Array.isArray(data)
          ? data
              .filter((raw: any) =>
                typeof raw.nome === 'string' &&
                typeof raw.email === 'string'
              )
              .map(mapToCliente)
          : [];
        setClientesList(clientesCorrigidos);
      } catch (e) {
        setClientesList([]);
      } finally {
        setLoading(false);
      }
    }
    loadClientes();
  }, []);

  const handleAddCliente = async (
    data: Omit<
      Cliente,
      'id' | 'processos' | 'status' | 'ultimo_contacto' | 'valor_total'
    >
  ) => {
    try {
      const novo = await addCliente({
        ...data,
        status: 'pendente',
        processos: 0,
        ultimo_contacto: new Date().toISOString().slice(0, 10),
        valor_total: '€0',
      });

      if (novo && typeof novo.nome === 'string' && typeof novo.email === 'string') {
        setClientesList((prev) => [
          mapToCliente(novo),
          ...prev,
        ]);
      }
    } catch (e) {
      // TODO: toast de erro
    }
  };

  const handleEditCliente = async (data: any) => {
    if (!editCliente) return;
    try {
      const atualizado = await updateCliente(editCliente.id, data);
      if (atualizado && typeof atualizado.nome === 'string' && typeof atualizado.email === 'string') {
        setClientesList((prev) =>
          prev.map((c) =>
            c.id === atualizado.id
              ? mapToCliente(atualizado)
              : c
          )
        );
        setEditCliente(null);
      }
    } catch (e) {
      // TODO: toast de erro
    }
  };

  const handleDeleteCliente = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja remover este cliente?')) return;
    try {
      await deleteCliente(id);
      setClientesList((prev) => prev.filter(c => c.id !== id));
    } catch (e) {
      // TODO: toast de erro
    }
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
                  <p className="text-2xl font-bold text-primary-800">{clientesList.length}</p>
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
                  <p className="text-2xl font-bold text-primary-800">{clientesList.filter(c => c.status === 'activo').length}</p>
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
                  <p className="text-2xl font-bold text-primary-800">{clientesList.filter(c => c.tipo === 'particular').length}</p>
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
                  <p className="text-2xl font-bold text-primary-800">{clientesList.filter(c => c.tipo === 'empresa').length}</p>
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
                  // Adicione lógica de busca se desejar
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
              {loading ? (
                <div className="text-center py-8">A carregar clientes...</div>
              ) : (
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
                        <Button variant="ghost" size="sm" onClick={() => setEditCliente(cliente)} title="Editar">
                          <svg width="16" height="16" fill="none" stroke="currentColor"><path d="M12.65 3.35a2.121 2.121 0 0 1 3 3L7.5 14.5H4v-3.5l8.65-7.65Z"/></svg>
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteCliente(cliente.id)} title="Remover">
                          <svg width="16" height="16" fill="none" stroke="currentColor"><path d="M6 6v6m4-6v6M3 6h10M5 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </CardContent>
        </Card>

        <ClienteForm
          open={showForm}
          onOpenChange={setShowForm}
          onSubmit={handleAddCliente}
        />
        <ClienteForm
          open={!!editCliente}
          onOpenChange={() => setEditCliente(null)}
          onSubmit={handleEditCliente}
          cliente={editCliente || undefined}
        />
      </div>
    </DashboardLayout>
  );
};

export default Clientes;
