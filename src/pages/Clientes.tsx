
import DashboardLayout from '@/components/DashboardLayout';
import ClientesContainer from '@/components/clientes/ClientesContainer';

const Clientes = () => (
  <DashboardLayout>
    <div className="p-6">
      <ClientesContainer />
    </div>
  </DashboardLayout>
);

export default Clientes;
