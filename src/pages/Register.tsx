import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Eye, EyeOff, ArrowLeft, UserCheck, AlertCircle, CheckCircle, CreditCard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';

const Register = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    // Dados pessoais
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    phone: '',
    nif: '',
    numero_profissional: '',
    morada: '',
    
    // Dados de faturação
    nome_fatura: '',
    morada_fatura: '',
    nif_fatura: '',
    
    // Pagamento
    metodo_pagamento: '',
    plano: 'basico',
    
    // Outros
    organization: '',
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

  const validateStep1 = () => {
    if (!formData.name.trim()) return 'Por favor, insira o seu nome completo.';
    if (!formData.email || !formData.email.includes('@')) return 'Por favor, insira um email válido.';
    if (formData.password.length < 6) return 'A palavra-passe deve ter pelo menos 6 caracteres.';
    if (formData.password !== formData.confirmPassword) return 'As palavras-passe não coincidem.';
    if (!formData.userType) return 'Por favor, selecione o tipo de utilizador.';
    
    // NIF é obrigatório para profissionais
    if (['advogado', 'assistente', 'admin'].includes(formData.userType) && !formData.nif.trim()) {
      return 'NIF é obrigatório para profissionais.';
    }
    
    // Número profissional obrigatório para advogados
    if (formData.userType === 'advogado' && !formData.numero_profissional.trim()) {
      return 'Número profissional é obrigatório para advogados.';
    }

    if (formData.nif && !/^\d{9}$/.test(formData.nif.trim())) {
      return 'NIF deve ter exatamente 9 dígitos.';
    }

    return null;
  };

  const validateStep2 = () => {
    if (!formData.metodo_pagamento) return 'Por favor, selecione um método de pagamento.';
    
    if (formData.userType !== 'cliente') {
      if (!formData.nome_fatura.trim()) return 'Nome de faturação é obrigatório.';
      if (!formData.nif_fatura.trim()) return 'NIF de faturação é obrigatório.';
      if (!/^\d{9}$/.test(formData.nif_fatura.trim())) return 'NIF de faturação deve ter 9 dígitos.';
    }

    return null;
  };

  const handleNextStep = () => {
    setError(null);
    const stepError = validateStep1();
    if (stepError) {
      setError(stepError);
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const step2Error = validateStep2();
    if (step2Error) {
      setError(step2Error);
      setLoading(false);
      return;
    }

    try {
      // Primeiro, criar a conta no Supabase Auth
      const { data: authData, error: authError } = await signUp(formData.email.trim(), formData.password, {
        name: formData.name.trim(),
        user_type: formData.userType
      });
      
      if (authError) {
        throw authError;
      }

      // Depois, criar entrada na tabela users_extended
      const userData = {
        id: authData?.user?.id,
        email: formData.email.trim(),
        role: formData.userType as any,
        status: 'pending' as any,
        nome: formData.name.trim(),
        telefone: formData.phone.trim() || null,
        nif: formData.nif.trim() || null,
        numero_profissional: formData.numero_profissional.trim() || null,
        morada: formData.morada.trim() || null,
        dados_faturacao: {
          nome_fatura: formData.nome_fatura.trim() || formData.name.trim(),
          morada_fatura: formData.morada_fatura.trim() || formData.morada.trim(),
          nif_fatura: formData.nif_fatura.trim() || formData.nif.trim()
        },
        metodo_pagamento: formData.metodo_pagamento as any
      };

      const { error: extendedError } = await supabase
        .from('users_extended')
        .insert([userData]);

      if (extendedError) {
        console.error('Error creating extended user:', extendedError);
        throw extendedError;
      }

      setSuccess(true);
      toast({
        title: "Conta criada com sucesso!",
        description: "A sua conta foi enviada para aprovação manual. Receberá um email quando a conta for aprovada e ativada.",
      });

    } catch (error: any) {
      console.error('Registration error:', error);
      
      if (error.message?.includes('User already registered')) {
        setError('Este email já está registado. Tente fazer login.');
      } else if (error.message?.includes('Password should be at least 6 characters')) {
        setError('A palavra-passe deve ter pelo menos 6 caracteres.');
      } else {
        setError('Erro ao criar conta. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const requiresNIF = ['advogado', 'assistente', 'admin'].includes(formData.userType);
  const requiresProfessionalNumber = formData.userType === 'advogado';

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center px-4">
        <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="bg-green-100 p-6 rounded-full w-20 h-20 mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mt-2" />
            </div>
            <h2 className="text-2xl font-bold text-primary-800 mb-4">
              Registo Enviado para Aprovação!
            </h2>
            <p className="text-gray-600 mb-6">
              A sua conta foi criada e enviada para aprovação manual. 
              Receberá um email quando a conta for aprovada e ativada.
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

      <div className="relative w-full max-w-2xl">
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
              Passo {step} de 2: {step === 1 ? 'Dados Pessoais' : 'Subscrição e Pagamento'}
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div 
                className="bg-primary-800 h-2 rounded-full transition-all"
                style={{ width: `${(step / 2) * 100}%` }}
              />
            </div>
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

            <form onSubmit={step === 1 ? (e) => { e.preventDefault(); handleNextStep(); } : handleSubmit} className="space-y-6">
              {step === 1 && (
                <>
                  {/* ... keep existing code (step 1 form fields) */}
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

                  {requiresProfessionalNumber && (
                    <div className="space-y-2">
                      <Label htmlFor="numero_profissional" className="text-primary-800 font-medium">
                        Número Profissional *
                      </Label>
                      <Input
                        id="numero_profissional"
                        type="text"
                        placeholder="Número da Ordem dos Advogados"
                        value={formData.numero_profissional}
                        onChange={(e) => setFormData({...formData, numero_profissional: e.target.value})}
                        className="rounded-xl border-gray-200 focus:border-primary-800 focus:ring-primary-800"
                        disabled={loading}
                        required
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="morada" className="text-primary-800 font-medium">
                      Morada
                    </Label>
                    <Input
                      id="morada"
                      type="text"
                      placeholder="Rua, número, cidade, código postal"
                      value={formData.morada}
                      onChange={(e) => setFormData({...formData, morada: e.target.value})}
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

                  <Button 
                    type="submit"
                    className="w-full bg-primary-800 hover:bg-primary-700 text-white py-3 rounded-xl font-semibold"
                    disabled={loading}
                  >
                    Continuar para Pagamento →
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="p-4 bg-blue-50 rounded-xl mb-6">
                    <h3 className="font-medium text-blue-900 mb-2">Plano Selecionado: Básico</h3>
                    <p className="text-sm text-blue-700">
                      • 15 dias de teste grátis<br/>
                      • €29/mês após o período de teste<br/>
                      • Até 50 processos ativos<br/>
                      • Suporte por email
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="metodo_pagamento" className="text-primary-800 font-medium">
                      Método de Pagamento *
                    </Label>
                    <Select 
                      value={formData.metodo_pagamento} 
                      onValueChange={(value) => setFormData({...formData, metodo_pagamento: value})}
                      disabled={loading}
                    >
                      <SelectTrigger className="rounded-xl border-gray-200 focus:border-primary-800 focus:ring-primary-800">
                        <SelectValue placeholder="Selecione o método de pagamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stripe">
                          <div className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Cartão de Crédito (Stripe)
                          </div>
                        </SelectItem>
                        <SelectItem value="transferencia">Transferência Bancária</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="revolut">Revolut</SelectItem>
                        <SelectItem value="mbway">MB Way</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.userType !== 'cliente' && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
                      <h4 className="font-medium text-gray-900">Dados de Faturação</h4>
                      
                      <div className="space-y-2">
                        <Label htmlFor="nome_fatura" className="text-primary-800 font-medium">
                          Nome de Faturação *
                        </Label>
                        <Input
                          id="nome_fatura"
                          type="text"
                          placeholder="Nome ou empresa para faturação"
                          value={formData.nome_fatura}
                          onChange={(e) => setFormData({...formData, nome_fatura: e.target.value})}
                          className="rounded-xl border-gray-200 focus:border-primary-800 focus:ring-primary-800"
                          disabled={loading}
                          required={formData.userType !== 'cliente'}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="nif_fatura" className="text-primary-800 font-medium">
                          NIF de Faturação *
                        </Label>
                        <Input
                          id="nif_fatura"
                          type="text"
                          placeholder="123456789"
                          value={formData.nif_fatura}
                          onChange={(e) => setFormData({...formData, nif_fatura: e.target.value.replace(/\D/g, '').slice(0, 9)})}
                          className="rounded-xl border-gray-200 focus:border-primary-800 focus:ring-primary-800"
                          maxLength={9}
                          disabled={loading}
                          required={formData.userType !== 'cliente'}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="morada_fatura" className="text-primary-800 font-medium">
                          Morada de Faturação
                        </Label>
                        <Input
                          id="morada_fatura"
                          type="text"
                          placeholder="Morada para faturação"
                          value={formData.morada_fatura}
                          onChange={(e) => setFormData({...formData, morada_fatura: e.target.value})}
                          className="rounded-xl border-gray-200 focus:border-primary-800 focus:ring-primary-800"
                          disabled={loading}
                        />
                      </div>
                    </div>
                  )}

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
                  </div>

                  <div className="flex space-x-4">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1"
                      disabled={loading}
                    >
                      ← Voltar
                    </Button>
                    <Button 
                      type="submit"
                      className="flex-1 bg-primary-800 hover:bg-primary-700 text-white py-3 rounded-xl font-semibold"
                      disabled={loading}
                    >
                      {loading ? 'A criar conta...' : 'Finalizar Registo'}
                    </Button>
                  </div>
                </>
              )}
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
