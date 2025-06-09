
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Eye, EyeOff, Scale } from 'lucide-react';

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
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As palavras-passe não coincidem.",
        variant: "destructive"
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
      const { error: insertError } = await supabase
        .from('users_extended')
        .insert([{
          email: formData.email,
          role: formData.tipo as 'cliente' | 'assistente' | 'advogado' | 'admin',
          status: 'pending',
          nome: formData.nome,
          telefone: formData.telefone,
          nif: formData.nif,
          numero_profissional: formData.numero_profissional,
          morada: formData.morada,
          metodo_pagamento: formData.metodo_pagamento as any,
          dados_faturacao: formData.tipo === 'empresa' ? formData.dados_empresa : {}
        }]);

      if (insertError) throw insertError;

      toast({
        title: "Registo enviado!",
        description: "O seu registo foi enviado para aprovação. Será contactado em breve."
      });

      navigate('/');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Erro no registo",
        description: error.message || "Ocorreu um erro durante o registo.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl rounded-2xl border-0 shadow-2xl">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <Scale className="h-12 w-12 text-primary-800" />
          </div>
          <CardTitle className="text-3xl font-bold text-primary-800">
            Criar Conta - LegalFlux
          </CardTitle>
          <p className="text-gray-600">
            Junte-se à plataforma jurídica mais avançada dos PALOP
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dados Básicos */}
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
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                <Label htmlFor="tipo">Tipo de Utilizador *</Label>
                <Select value={formData.tipo} onValueChange={(value) => setFormData({ ...formData, tipo: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cliente">Cliente</SelectItem>
                    <SelectItem value="advogado">Advogado</SelectItem>
                    <SelectItem value="assistente">Assistente</SelectItem>
                    <SelectItem value="empresa">Empresa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Campos Condicionais */}
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

            {formData.tipo === 'empresa' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome_empresa">Nome da Empresa</Label>
                  <Input
                    id="nome_empresa"
                    type="text"
                    value={formData.dados_empresa.nome_empresa}
                    onChange={(e) => setFormData({
                      ...formData,
                      dados_empresa: { ...formData.dados_empresa, nome_empresa: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="setor">Setor</Label>
                  <Input
                    id="setor"
                    type="text"
                    value={formData.dados_empresa.setor}
                    onChange={(e) => setFormData({
                      ...formData,
                      dados_empresa: { ...formData.dados_empresa, setor: e.target.value }
                    })}
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nif">NIF</Label>
                <Input
                  id="nif"
                  type="text"
                  value={formData.nif}
                  onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="morada">Morada</Label>
                <Input
                  id="morada"
                  type="text"
                  value={formData.morada}
                  onChange={(e) => setFormData({ ...formData, morada: e.target.value })}
                />
              </div>
            </div>

            {/* Método de Pagamento */}
            <div>
              <Label>Método de Pagamento Preferido</Label>
              <RadioGroup 
                value={formData.metodo_pagamento} 
                onValueChange={(value) => setFormData({ ...formData, metodo_pagamento: value })}
                className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="stripe" id="stripe" />
                  <Label htmlFor="stripe">Stripe (Cartão)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="transferencia" id="transferencia" />
                  <Label htmlFor="transferencia">Transferência</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mbway" id="mbway" />
                  <Label htmlFor="mbway">MB Way</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal">PayPal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="revolut" id="revolut" />
                  <Label htmlFor="revolut">Revolut</Label>
                </div>
              </RadioGroup>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary-800 hover:bg-primary-700"
              disabled={loading}
            >
              {loading ? 'A processar...' : 'Enviar Registo para Aprovação'}
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
  );
};

export default Register;
