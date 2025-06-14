import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { UserPlus, Mail, Send } from 'lucide-react';
import { useUserManagement, ExtendedUser } from '@/hooks/useUserManagement';

const CreateUser = () => {
  const { createUser } = useUserManagement();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    role: '' as "" | "cliente" | "assistente",
    observacoes: ''
  });

  // Allowed enum values according to your Supabase type
  const RBAC_ROLE_MAP: { [key: string]: "cliente" | "assistente" } = {
    cliente: "cliente",
    assistente: "assistente",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.role || !(formData.role in RBAC_ROLE_MAP)) {
      alert('Por favor, selecione um tipo de utilizador válido.');
      return;
    }
    setLoading(true);
    try {
      const result = await createUser({
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        role: formData.role as ExtendedUser['role']
      });
      if (result) {
        // RBAC insert: only allow enum values
        await import('@/integrations/supabase/client').then(async ({ supabase }) => {
          await supabase.from("user_roles").insert([
            {
              user_id: result.id,
              // role must match enum — do NOT use empty string!
              role: RBAC_ROLE_MAP[formData.role]
            }
          ]);
        });
        setFormData({
          nome: '',
          email: '',
          telefone: '',
          role: '',
          observacoes: ''
        });
        alert('Utilizador criado com sucesso! Um convite foi enviado por email.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-800 flex items-center">
              <UserPlus className="h-8 w-8 mr-3" />
              Criar Utilizador
            </h1>
            <p className="text-gray-600">
              Criar novos clientes ou assistentes diretamente no sistema
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-primary-800 flex items-center">
                <UserPlus className="h-5 w-5 mr-2" />
                Dados do Novo Utilizador
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome">Nome Completo *</Label>
                    <Input
                      id="nome"
                      type="text"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      type="tel"
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Tipo de Utilizador *</Label>
                    <Select 
                      value={formData.role} 
                      onValueChange={(value) => setFormData({ ...formData, role: value as ExtendedUser['role'] })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cliente">Cliente</SelectItem>
                        <SelectItem value="assistente">Assistente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="observacoes">Observações</Label>
                  <Textarea
                    id="observacoes"
                    value={formData.observacoes}
                    onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                    placeholder="Notas adicionais sobre o utilizador..."
                    rows={3}
                  />
                </div>

                {/* Informação sobre envio de email */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800">Convite Automático</h4>
                      <p className="text-sm text-blue-600 mt-1">
                        Após criar o utilizador, será enviado automaticamente um email de convite 
                        com as instruções de acesso ao portal LegalFlux.
                      </p>
                      <p className="text-xs text-blue-500 mt-2">
                        ⚠️ Certifique-se de que o endereço de envio está configurado nas 
                        definições do escritório.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-primary-800 hover:bg-primary-700"
                    disabled={loading}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {loading ? 'A criar...' : 'Criar Utilizador'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setFormData({
                      nome: '',
                      email: '',
                      telefone: '',
                      role: '',
                      observacoes: ''
                    })}
                  >
                    Limpar Formulário
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateUser;
