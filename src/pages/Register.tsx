
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Eye, EyeOff, ArrowLeft, UserCheck, AlertCircle, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    phone: '',
    organization: '',
    nif: '',
    message: ''
  });
  const [error, setError] = useState<string | null>(null);

  const { signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already logged in
  if (user) {
    navigate('/dashboard');
    return null;
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      return 'Por favor, insira o seu nome completo.';
    }

    if (!formData.email || !formData.email.includes('@')) {
      return 'Por favor, insira um email válido.';
    }

    if (formData.password.length < 6) {
      return 'A palavra-passe deve ter pelo menos 6 caracteres.';
    }

    if (formData.password !== formData.confirmPassword) {
      return 'As palavras-passe não coincidem.';
    }

    if (!formData.userType) {
      return 'Por favor, selecione o tipo de utilizador.';
    }

    // NIF é obrigatório para empresas e profissionais
    if (['advogado', 'assistente', 'admin'].includes(formData.userType) && !formData.nif.trim()) {
      return 'NIF é obrigatório para profissionais e empresas.';
    }

    // Validação básica do NIF (9 dígitos)
    if (formData.nif && !/^\d{9}$/.test(formData.nif.trim())) {
      return 'NIF deve ter exatamente 9 dígitos.';
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      const userData = {
        name: formData.name.trim(),
        user_type: formData.userType,
        phone: formData.phone.trim(),
        organization: formData.organization.trim(),
        nif: formData.nif.trim(),
        message: formData.message.trim()
      };

      const { error } = await signUp(formData.email.trim(), formData.password, userData);
      
      if (error) {
        console.error('Registration error:', error);
        
        if (error.message?.includes('User already registered')) {
          setError('Este email já está registado. Tente fazer login.');
        } else if (error.message?.includes('Password should be at least 6 characters')) {
          setError('A palavra-passe deve ter pelo menos 6 caracteres.');
        } else if (error.message?.includes('Signup requires a valid password')) {
          setError('Por favor, insira uma palavra-passe válida.');
        } else {
          setError('Erro ao criar conta. Tente novamente.');
        }
      } else {
        setSuccess(true);
        toast({
          title: "Conta criada com sucesso!",
          description: "Verifique o seu email para confirmar a conta.",
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setError('Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const requiresNIF = ['advogado', 'assistente', 'admin'].includes(formData.userType);

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center px-4">
        <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="bg-green-100 p-6 rounded-full w-20 h-20 mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mt-2" />
            </div>
            <h2 className="text-2xl font-bold text-primary-800 mb-4">
              Conta Criada com Sucesso!
            </h2>
            <p className="text-gray-600 mb-6">
              Enviámos um email de confirmação para <strong>{formData.email}</strong>.
              Por favor, verifique a sua caixa de entrada e confirme a sua conta.
            </p>
            <div className="space-y-4">
              <Button asChild className="w-full bg-primary-800 hover:bg-primary-700">
                <Link to="/login">Ir para Login</Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link to="/">Voltar ao Início</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            <div className="flex items-center justify-center mb-6">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-primary-800">LegalFlux</h1>
                <p className="text-sm text-gray-500 mt-1">Portal Jurídico Inteligente</p>
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

            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-primary-800 font-medium">
                    Nome Completo *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="rounded-xl border-gray-200 focus:border-primary-800 focus:ring-primary-800"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-primary-800 font-medium">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="rounded-xl border-gray-200 focus:border-primary-800 focus:ring-primary-800"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="userType" className="text-primary-800 font-medium">
                  Tipo de Utilizador *
                </Label>
                <Select 
                  value={formData.userType} 
                  onValueChange={(value) => setFormData({...formData, userType: value})}
                  disabled={loading}
                >
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
                {requiresNIF && (
                  <p className="text-xs text-accent-600">
                    NIF é obrigatório para profissionais e empresas
                  </p>
                )}
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
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nif" className="text-primary-800 font-medium">
                    NIF {requiresNIF && '*'}
                  </Label>
                  <Input
                    id="nif"
                    type="text"
                    placeholder="123456789"
                    value={formData.nif}
                    onChange={(e) => setFormData({...formData, nif: e.target.value.replace(/\D/g, '').slice(0, 9)})}
                    className="rounded-xl border-gray-200 focus:border-primary-800 focus:ring-primary-800"
                    maxLength={9}
                    disabled={loading}
                    required={requiresNIF}
                  />
                </div>
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
                  disabled={loading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-primary-800 font-medium">
                    Palavra-passe *
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
                      disabled={loading}
                      minLength={6}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-800"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-primary-800 font-medium">
                    Confirmar Palavra-passe *
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="rounded-xl border-gray-200 focus:border-primary-800 focus:ring-primary-800"
                    required
                    disabled={loading}
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
                  disabled={loading}
                />
              </div>

              <div className="space-y-4">
                <label className="flex items-start space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 mt-1" required disabled={loading} />
                  <span className="text-sm text-gray-600">
                    Concordo com os{' '}
                    <Link to="/termos-uso" className="text-primary-800 hover:underline">Termos de Uso</Link>
                    {' '}e{' '}
                    <Link to="/politica-privacidade" className="text-primary-800 hover:underline">Política de Privacidade</Link>
                  </span>
                </label>

                <label className="flex items-start space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 mt-1" disabled={loading} />
                  <span className="text-sm text-gray-600">
                    Aceito receber comunicações sobre atualizações e novidades do Legalflux
                  </span>
                </label>
              </div>

              <Button 
                type="submit"
                className="w-full bg-primary-800 hover:bg-primary-700 text-white py-3 rounded-xl font-semibold"
                disabled={loading}
              >
                {loading ? 'A criar conta...' : 'Criar Conta'}
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
