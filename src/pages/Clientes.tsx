import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import ClienteForm from '@/components/clientes/ClienteForm';
import ClientesHeader from '@/components/clientes/ClientesHeader';
import ClientesStats from '@/components/clientes/ClientesStats';
import ClientesFilters from '@/components/clientes/ClientesFilters';
import ClientesList from '@/components/clientes/ClientesList';
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
  // Estados de UI
  const [showForm, setShowForm] = useState(false);
  const [clientesList, setClientesList] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [editCliente, setEditCliente] = useState<Cliente | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadClientes() {
      setLoading(true);
      try {
        const data = await fetchClientes();
        const clientesCorrigidos: Cliente[] = Array.isArray(data)
          ? data.filter(isClienteValido).map(mapToCliente)
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

      if (novo && isClienteValido(novo)) {
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
      if (atualizado && isClienteValido(atualizado)) {
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

  // Filtro de clientes por termo pesquisado
  const clientesFiltrados = searchTerm
    ? clientesList.filter((c) =>
        c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.email && c.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (c.telefone && c.telefone.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : clientesList;

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <ClientesHeader onAdd={() => setShowForm(true)} />

        {/* Stats */}
        <ClientesStats total={clientesList.length} />

        {/* Filters */}
        <Card className="rounded-2xl border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <ClientesFilters searchTerm={searchTerm} onSearch={setSearchTerm} />
          </CardContent>
        </Card>

        {/* Clients List */}
        <Card className="rounded-2xl border-0 shadow-lg">
          <CardContent>
            <ClientesList
              clientes={clientesFiltrados}
              loading={loading}
              onView={cliente => setEditCliente(mapToCliente(cliente))}
            />
          </CardContent>
        </Card>

        {/* Modal Novo Cliente */}
        <ClienteForm
          open={showForm}
          onOpenChange={setShowForm}
          onSubmit={handleAddCliente}
        />
        {/* Modal Editar Cliente */}
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

// ⚠️ NOTA: Este ficheiro tem mais de 350 linhas.
// Sugiro refatorar mais (após implementação da React Query/paginação) para maior legibilidade/mantibilidade.
