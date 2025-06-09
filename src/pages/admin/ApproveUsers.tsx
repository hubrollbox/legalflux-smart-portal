
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  MapPin,
  FileText,
  CreditCard
} from 'lucide-react';
import { useUserManagement, ExtendedUser } from '@/hooks/useUserManagement';

const ApproveUsers = () => {
  const { pendingUsers, loading, approveUser } = useUserManagement();

  const handleApprove = async (userId: string) => {
    if (confirm('Tem certeza que deseja aprovar este utilizador?')) {
      await approveUser(userId);
    }
  };

  const getStatusColor = (status: ExtendedUser['status']) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleColor = (role: ExtendedUser['role']) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'advogado': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'assistente': return 'bg-green-100 text-green-800 border-green-200';
      case 'cliente': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-800 flex items-center">
              <Users className="h-8 w-8 mr-3" />
              Aprovação de Utilizadores
            </h1>
            <p className="text-gray-600">
              Gerir pedidos de registo pendentes ({pendingUsers.length} pendentes)
            </p>
          </div>
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="h-4 w-4 mr-1" />
            {pendingUsers.length} Pendentes
          </Badge>
        </div>

        {/* Pending Users */}
        {pendingUsers.length === 0 ? (
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardContent className="text-center py-12">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary-800 mb-2">
                Nenhum registo pendente
              </h3>
              <p className="text-gray-600">
                Todos os registos foram processados.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pendingUsers.map((user) => (
              <Card key={user.id} className="rounded-2xl border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-primary-800 text-lg">
                        {user.nome || 'Nome não informado'}
                      </CardTitle>
                      <p className="text-gray-600 flex items-center mt-1">
                        <Mail className="h-4 w-4 mr-1" />
                        {user.email}
                      </p>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                      <Badge className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    {/* Informações de Contacto */}
                    {user.telefone && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        {user.telefone}
                      </div>
                    )}
                    
                    {user.morada && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {user.morada}
                      </div>
                    )}

                    {/* Informações Profissionais */}
                    {user.numero_profissional && (
                      <div className="flex items-center text-sm text-gray-600">
                        <FileText className="h-4 w-4 mr-2" />
                        Nº Profissional: {user.numero_profissional}
                      </div>
                    )}

                    {user.nif && (
                      <div className="flex items-center text-sm text-gray-600">
                        <FileText className="h-4 w-4 mr-2" />
                        NIF: {user.nif}
                      </div>
                    )}

                    {/* Método de Pagamento */}
                    {user.metodo_pagamento && (
                      <div className="flex items-center text-sm text-gray-600">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Pagamento: {user.metodo_pagamento}
                      </div>
                    )}

                    {/* Data de Registo */}
                    <div className="text-xs text-gray-500 pt-2 border-t">
                      Registado em: {new Date(user.data_criacao).toLocaleDateString('pt-PT')}
                    </div>

                    {/* Ações */}
                    <div className="flex space-x-2 pt-4">
                      <Button 
                        onClick={() => handleApprove(user.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Aprovar
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ApproveUsers;
