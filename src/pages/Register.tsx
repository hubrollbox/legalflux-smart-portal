import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nome: '',
    telefone: '',
    tipo: '',
    nif: '',
    numero_profissional: '',
    morada: '',
    metodo_pagamento: '',
    dados_empresa: {
      nome_empresa: '',
      setor: ''
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: 'Erro',
        description: 'E-mail inválido.',
        variant: 'destructive',
      });
      return;
    }

    // Validação de força de senha
    if (formData.password.length < 8) {
      toast({
        title: 'Erro',
        description: 'A senha deve ter pelo menos 8 caracteres.',
        variant: 'destructive',
      });
      return;
    }

    // Validação de confirmação de senha
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Erro',
        description: 'As senhas não correspondem.',
        variant: 'destructive',
      });
      return;
    }

    if (formData.tipo === 'advogado' && !formData.numero_profissional) {
      toast({
        title: "Erro",
        description: "Número profissional é obrigatório para advogados.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Create user in users_extended table
      const userInsert: Database['public']['Tables']['users_extended']['Insert'] = {
        email: formData.email,
        role: formData.tipo as 'cliente' | 'assistente' | 'advogado' | 'admin',
        status: 'pending',
        nome: formData.nome,
        telefone: formData.telefone,
        nif: formData.nif,
        numero_profissional: formData.numero_profissional,
        morada: formData.morada,
        metodo_pagamento: formData.metodo_pagamento as string,
        dados_faturacao: formData.tipo === 'empresa' ? formData.dados_empresa : {},
        id: crypto.randomUUID()
      };
      const { error: insertError } = await supabase
        .from('users_extended')
        .insert([userInsert]);

      if (insertError) throw insertError;

      toast({
        title: "Registo enviado!",
        description: "O seu registo foi enviado para aprovação. Será contactado em breve.",
      });
      // Redireciona para a página de aprovação de utilizadores
      setTimeout(() => navigate('/admin/approve-users', { replace: true }), 1200);
    } catch (error) {
      const err = error as { message?: string };
      console.error('Registration error:', error);
      toast({
        title: "Erro no registo",
        description: err.message || "Ocorreu um erro durante o registo.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4 register-page">
      <div className="w-full max-w-md flex flex-col items-center">
        <Link to="/">
          <img src="/logo-legalflux-192.png" alt="Legalflux Logo" width={64} height={64} className="mb-4" />
        </Link>
        <Card className="w-full rounded-2xl border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-primary-800">
              Criar Conta
            </CardTitle>
            <p className="text-gray-600 text-base">
              Junte-se à plataforma jurídica mais avançada dos PALOP
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="password">Palavra-passe *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Esconder palavra-passe' : 'Mostrar palavra-passe'}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirmar Palavra-passe *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="tipo">Tipo de Utilizador *</Label>
                <Select value={formData.tipo} onValueChange={(value) => setFormData({ ...formData, tipo: value })}>
                  <SelectTrigger id="tipo" name="tipo" required>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cliente">Cliente</SelectItem>
                    <SelectItem value="advogado">Advogado</SelectItem>
                    <SelectItem value="assistente">Assistente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.tipo === 'advogado' && (
                <div>
                  <Label htmlFor="numero_profissional">Número Profissional *</Label>
                  <Input
                    id="numero_profissional"
                    type="text"
                    value={formData.numero_profissional}
                    onChange={(e) => setFormData({ ...formData, numero_profissional: e.target.value })}
                    placeholder="Ex: 12345-OA"
                    required
                  />
                </div>
              )}
              <Button type="submit" className="w-full bg-primary-800 hover:bg-primary-700">
                {loading ? 'Aguarde...' : 'Criar Conta'}
              </Button>
              <div className="text-center">
                <p className="text-gray-600">
                  Já tem conta?{' '}
                  <Link to="/login" className="text-primary-800 hover:underline font-medium">
                    Fazer login
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
