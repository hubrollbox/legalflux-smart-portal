
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Scale, Eye, EyeOff, ArrowLeft, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    phone: '',
    organization: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar lógica de registo
    console.log('Register attempt:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center px-4 py-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative w-full max-w-lg">
        {/* Back to Home */}
        <Link to="/" className="inline-flex items-center text-primary-800 hover:text-primary-600 mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao início
        </Link>

        <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden">
          <CardHeader className="text-center bg-white p-8">
            {/* Logo */}
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="bg-primary-800 p-3 rounded-xl">
                <Scale className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-800">Legalflux</h1>
                <p className="text-sm text-gray-500">Portal Jurídico Inteligente</p>
              </div>
            </div>

            <CardTitle className="text-2xl font-bold text-primary-800 mb-2">
              Criar Nova Conta
            </CardTitle>
            <p className="text-gray-600">
              Junte-se à nossa plataforma jurídica
            </p>
          </CardHeader>

          <CardContent className="p-8">
            {/* Approval Notice */}
            <div className="mb-6 p-4 bg-accent-50 border border-accent-200 rounded-xl">
              <div className="flex items-center space-x-2">
                <UserCheck className="h-5 w-5 text-accent-600" />
                <div>
                  <p className="text-sm font-medium text-accent-800">Aprovação Manual</p>
                  <p className="text-xs text-accent-600">
                    Todas as contas são aprovadas manualmente para garantir segurança
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-primary-800 font-medium">
                    Nome Completo
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="rounded-xl border-gray-200 focus:border-primary-800 focus:ring-primary-800"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-primary-800 font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="rounded-xl border-gray-200 focus:border-primary-800 focus:ring-primary-800"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="userType" className="text-primary-800 font-medium">
                  Tipo de Utilizador
                </Label>
                <Select value={formData.userType} onValueChange={(value) => setFormData({...formData, userType: value})}>
                  <SelectTrigger className="rounded-xl border-gray-200 focus:border-primary-800 focus:ring-primary-800">
                    <SelectValue placeholder="Selecione o tipo de utilizador" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cliente">Cliente (Particular/Empresa)</SelectItem>
                    <SelectItem value="advogado">Advogado</SelectItem>
                    <SelectItem value="assistente">Assistente Jurídico</SelectItem>
                    <SelectItem value="admin">Administrador de Escritório</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-primary-800 font-medium">
                    Telefone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+351 xxx xxx xxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="rounded-xl border-gray-200 focus:border-primary-800 focus:ring-primary-800"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization" className="text-primary-800 font-medium">
                    Organização
                  </Label>
                  <Input
                    id="organization"
                    type="text"
                    placeholder="Nome do escritório/empresa"
                    value={formData.organization}
                    onChange={(e) => setFormData({...formData, organization: e.target.value})}
                    className="rounded-xl border-gray-200 focus:border-primary-800 focus:ring-primary-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-primary-800 font-medium">
                    Palavra-passe
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="rounded-xl border-gray-200 focus:border-primary-800 focus:ring-primary-800 pr-12"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-800"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-primary-800 font-medium">
                    Confirmar Palavra-passe
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="rounded-xl border-gray-200 focus:border-primary-800 focus:ring-primary-800"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-primary-800 font-medium">
                  Mensagem (Opcional)
                </Label>
                <Textarea
                  id="message"
                  placeholder="Conte-nos um pouco sobre suas necessidades jurídicas..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="rounded-xl border-gray-200 focus:border-primary-800 focus:ring-primary-800 min-h-[100px]"
                />
              </div>

              <div className="space-y-4">
                <label className="flex items-start space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 mt-1" required />
                  <span className="text-sm text-gray-600">
                    Concordo com os{' '}
                    <a href="#" className="text-primary-800 hover:underline">Termos de Uso</a>
                    {' '}e{' '}
                    <a href="#" className="text-primary-800 hover:underline">Política de Privacidade</a>
                  </span>
                </label>

                <label className="flex items-start space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 mt-1" />
                  <span className="text-sm text-gray-600">
                    Aceito receber comunicações sobre atualizações e novidades do Legalflux
                  </span>
                </label>
              </div>

              <Button 
                type="submit"
                className="w-full bg-primary-800 hover:bg-primary-700 text-white py-3 rounded-xl font-semibold"
              >
                Criar Conta
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Já tem conta?{' '}
                <Link to="/login" className="text-primary-800 hover:underline font-medium">
                  Entrar
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
