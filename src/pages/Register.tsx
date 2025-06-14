
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
// removed direct database import for types

const Register = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
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

  // Step 1: Select user type
  const Step1 = (
    <div className="space-y-6">
      <div>
        <Label htmlFor="tipo">Tipo de Utilizador *</Label>
        <Select value={formData.tipo} onValueChange={value => setFormData({ ...formData, tipo: value })}>
          <SelectTrigger id="tipo" name="tipo">
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cliente">Cliente</SelectItem>
            <SelectItem value="advogado">Advogado</SelectItem>
            <SelectItem value="assistente">Assistente</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button className="w-full bg-primary-800 hover:bg-primary-700" disabled={!formData.tipo} onClick={() => setStep(2)}>
        Próximo
      </Button>
    </div>
  );

  // Step 2: Registration form (with new behavior)
  const Step2 = (
    <form
      onSubmit={async e => {
        e.preventDefault();

        if (!formData.nome || !formData.email || !formData.password || !formData.confirmPassword) {
          toast({ title: 'Erro', description: 'Preencha todos os campos obrigatórios.', variant: 'destructive' });
          return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          toast({ title: 'Erro', description: 'E-mail inválido.', variant: 'destructive' });
          return;
        }
        if (formData.password.length < 8) {
          toast({ title: 'Erro', description: 'A senha deve ter pelo menos 8 caracteres.', variant: 'destructive' });
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          toast({ title: 'Erro', description: 'As senhas não correspondem.', variant: 'destructive' });
          return;
        }
        if (formData.tipo === 'advogado' && !formData.numero_profissional) {
          toast({ title: 'Erro', description: 'Número profissional é obrigatório para advogados.', variant: 'destructive' });
          return;
        }
        setLoading(true);

        // 1. Register user in Supabase Auth
        try {
          // Email redirect for email confirmation
          const redirectUrl = `${window.location.origin}/`;
          const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
              emailRedirectTo: redirectUrl,
              data: {
                nome: formData.nome,
                tipo: formData.tipo,
                numero_profissional: formData.numero_profissional,
                nif: formData.nif,
                telefone: formData.telefone
                // additional profile data (not sensitive)
              }
            }
          });
          if (error) {
            throw error;
          }

          // 2. Insert profile into users_extended (with Auth user id)
          const userId = data.user?.id;
          if (!userId) throw new Error('ID de utilizador não encontrado. Contacte o suporte.');

          // Prepare profile insert
          const profileInsert = {
            id: userId,
            email: formData.email,
            role: formData.tipo as 'cliente' | 'assistente' | 'advogado' | 'admin',
            status: 'pending',
            nome: formData.nome || "",
            telefone: formData.telefone || "",
            nif: formData.nif || "",
            numero_profissional: formData.numero_profissional || "",
            morada: formData.morada || "",
            metodo_pagamento: formData.metodo_pagamento || "",
            dados_faturacao: formData.tipo === 'empresa' ? formData.dados_empresa : {},
            // All columns present, for nullables use empty or null
            // auto-generated fields handled by supabase
          };

          const { error: insertError } = await supabase.from('users_extended').insert([profileInsert]);
          if (insertError) throw insertError;

          setRegistered(true);
          setStep(3);
        } catch (error) {
          const err = error as { message?: string; email?: string };
          if (err && typeof err === 'object' && err.message?.includes('User already registered')) {
            toast({
              title: "E-mail já registado",
              description: "Já existe uma conta associada a este e-mail. Por favor faça login.",
              variant: "destructive"
            });
          } else {
            toast({
              title: 'Erro no registo',
              description: err && typeof err === 'object' && err.message ? err.message : 'Ocorreu um erro durante o registo.',
              variant: 'destructive'
            });
          }
        } finally {
          setLoading(false);
        }
      }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="nome">Nome Completo *</Label>
          <Input id="nome" type="text" value={formData.nome} onChange={e => setFormData({ ...formData, nome: e.target.value })} required />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="password">Palavra-passe *</Label>
          <div className="relative">
            <Input id="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required />
            <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Esconder palavra-passe' : 'Mostrar palavra-passe'}>
              {showPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
            </Button>
          </div>
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirmar Palavra-passe *</Label>
          <Input id="confirmPassword" type="password" value={formData.confirmPassword} onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} required />
        </div>
      </div>
      {/* Campos específicos por tipo */}
      {formData.tipo === 'advogado' && (
        <div>
          <Label htmlFor="numero_profissional">Número Profissional *</Label>
          <Input id="numero_profissional" type="text" value={formData.numero_profissional} onChange={e => setFormData({ ...formData, numero_profissional: e.target.value })} placeholder="Ex: 12345-OA" required />
        </div>
      )}
      {formData.tipo === 'cliente' && (
        <div>
          <Label htmlFor="nif">NIF</Label>
          <Input id="nif" type="text" value={formData.nif} onChange={e => setFormData({ ...formData, nif: e.target.value })} />
        </div>
      )}
      {/* Add more fields for assistente or empresa if needed */}
      <Button type="submit" className="w-full bg-primary-800 hover:bg-primary-700">{loading ? 'Aguarde...' : 'Criar Conta'}</Button>
      <Button type="button" variant="ghost" className="w-full" onClick={() => setStep(1)}>
        Voltar
      </Button>
    </form>
  );

  // Step 3: Confirmation and onboarding
  const Step3 = (
    <div className="flex flex-col items-center space-y-6 py-8">
      <CheckCircle className="h-16 w-16 text-green-600 mb-2" />
      <h2 className="text-2xl font-bold text-primary-800">Registo enviado!</h2>
      <p className="text-gray-700 text-center max-w-xs">O seu registo foi enviado para aprovação. Será contactado em breve.</p>
      {/* Onboarding checklist placeholder */}
      <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 mt-4 w-full max-w-md">
        <h3 className="font-semibold text-primary-800 mb-2">Próximos Passos</h3>
        <ul className="list-disc pl-6 text-gray-700 text-sm space-y-1">
          <li>Complete o seu perfil da firma</li>
          <li>Adicione documentos iniciais</li>
          <li>Configure integrações (Google Drive, OneDrive, etc.)</li>
          <li>Convite membros da equipa</li>
        </ul>
        <Button className="mt-4 w-full bg-primary-800 hover:bg-primary-700" onClick={() => navigate('/login')}>Ir para Login</Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4 register-page">
      <div className="w-full max-w-md flex flex-col items-center">
        <Link to="/">
          <img src="/logo-legalflux-192.png" alt="Legalflux Logo" width={64} height={64} className="mb-4" onError={e => { (e.target as HTMLImageElement).src = '/logo.png'; }} />
        </Link>
        <Card className="w-full rounded-2xl border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-primary-800">Criar Conta</CardTitle>
            <p className="text-gray-600 text-base">Junte-se à plataforma jurídica mais avançada dos PALOP</p>
          </CardHeader>
          <CardContent>
            {step === 1 && Step1}
            {step === 2 && Step2}
            {step === 3 && Step3}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;

