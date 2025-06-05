
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings,
  User,
  Bell,
  Shield,
  CreditCard,
  Users,
  Building,
  Save
} from 'lucide-react';

const Definicoes = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-800">Definições</h1>
            <p className="text-gray-600">Gerir preferências e configurações da conta</p>
          </div>
        </div>

        <Tabs defaultValue="perfil" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
            <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
            <TabsTrigger value="seguranca">Segurança</TabsTrigger>
            <TabsTrigger value="plano">Plano</TabsTrigger>
            <TabsTrigger value="escritorio">Escritório</TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="perfil">
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-primary-800 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Informações do Perfil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary-100 text-primary-800 text-xl">
                      AC
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline">Alterar Foto</Button>
                    <p className="text-sm text-gray-600 mt-2">JPG, PNG ou GIF (máx. 2MB)</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input id="nome" defaultValue="Ana Costa" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="ana.costa@legalflux.pt" type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input id="telefone" defaultValue="+351 912 345 678" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cargo">Cargo</Label>
                    <Input id="cargo" defaultValue="Advogada Sénior" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biografia</Label>
                  <textarea 
                    id="bio" 
                    className="w-full p-3 border border-gray-200 rounded-xl resize-none h-24"
                    placeholder="Breve descrição profissional..."
                    defaultValue="Advogada especializada em Direito do Trabalho com mais de 10 anos de experiência."
                  />
                </div>

                <Button className="bg-primary-800 hover:bg-primary-700">
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Alterações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notificacoes">
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-primary-800 flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Preferências de Notificação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Novos processos</h4>
                      <p className="text-sm text-gray-600">Receber notificações sobre novos processos atribuídos</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Prazos importantes</h4>
                      <p className="text-sm text-gray-600">Alertas sobre prazos que se aproximam</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Mensagens de clientes</h4>
                      <p className="text-sm text-gray-600">Notificações de novas mensagens no chat</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Atualizações financeiras</h4>
                      <p className="text-sm text-gray-600">Notificações sobre pagamentos e faturas</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Relatórios semanais</h4>
                      <p className="text-sm text-gray-600">Resumo semanal de atividades</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Button className="bg-primary-800 hover:bg-primary-700">
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Preferências
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="seguranca">
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-primary-800 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Segurança da Conta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Alterar Palavra-passe</h4>
                    <div className="space-y-3">
                      <Input type="password" placeholder="Palavra-passe atual" />
                      <Input type="password" placeholder="Nova palavra-passe" />
                      <Input type="password" placeholder="Confirmar nova palavra-passe" />
                    </div>
                    <Button variant="outline" className="mt-3">Alterar Palavra-passe</Button>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Autenticação em dois fatores (2FA)</h4>
                        <p className="text-sm text-gray-600">Adicionar uma camada extra de segurança</p>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">Sessões Ativas</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Chrome (Windows)</p>
                          <p className="text-sm text-gray-600">Lisboa, Portugal • Agora</p>
                        </div>
                        <span className="text-green-600 text-sm">Sessão atual</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Safari (iPhone)</p>
                          <p className="text-sm text-gray-600">Lisboa, Portugal • 2 horas atrás</p>
                        </div>
                        <Button variant="outline" size="sm">Terminar</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Plan Settings */}
          <TabsContent value="plano">
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-primary-800 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Plano e Faturação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-primary-50 to-accent-50 p-6 rounded-xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-primary-800">Plano Profissional</h3>
                      <p className="text-gray-600">€79/mês • Processos ilimitados</p>
                      <p className="text-sm text-gray-500 mt-1">Próxima faturação: 15 de Fevereiro</p>
                    </div>
                    <Button variant="outline">Alterar Plano</Button>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Utilização Atual</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Processos</span>
                        <span>24 / ∞</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary-800 h-2 rounded-full" style={{width: '30%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Armazenamento</span>
                        <span>12GB / 25GB</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-accent-600 h-2 rounded-full" style={{width: '48%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Método de Pagamento</h4>
                  <div className="flex items-center justify-between p-4 border rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs">
                        VISA
                      </div>
                      <div>
                        <p className="font-medium">**** **** **** 4321</p>
                        <p className="text-sm text-gray-600">Expira 12/26</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Alterar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Office Settings */}
          <TabsContent value="escritorio">
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-primary-800 flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  Configurações do Escritório
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="escritorio_nome">Nome do Escritório</Label>
                    <Input id="escritorio_nome" defaultValue="Costa & Associados" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="escritorio_endereco">Endereço</Label>
                    <Input id="escritorio_endereco" defaultValue="Av. da Liberdade, 123, Lisboa" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="escritorio_telefone">Telefone</Label>
                    <Input id="escritorio_telefone" defaultValue="+351 21 123 4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="escritorio_email">Email</Label>
                    <Input id="escritorio_email" defaultValue="geral@costaassociados.pt" />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Membros da Equipa</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>AC</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Ana Costa</p>
                          <p className="text-sm text-gray-600">Advogada Sénior</p>
                        </div>
                      </div>
                      <span className="text-green-600 text-sm">Admin</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>PO</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Pedro Oliveira</p>
                          <p className="text-sm text-gray-600">Advogado</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Gerir</Button>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-3">
                    <Users className="h-4 w-4 mr-2" />
                    Convidar Membro
                  </Button>
                </div>

                <Button className="bg-primary-800 hover:bg-primary-700">
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Configurações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Definicoes;
