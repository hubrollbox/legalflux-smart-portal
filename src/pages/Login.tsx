
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, Eye, EyeOff, ArrowLeft, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);

  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already logged in
  if (user) {
    navigate('/dashboard');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Por favor, preencha todos os campos.');
      setLoading(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Por favor, insira um email válido.');
      setLoading(false);
      return;
    }

    try {
      const { error } = await signIn(formData.email, formData.password);
      
      if (error) {
        console.error('Login error:', error);
        
        // Handle specific error types
        if (error.message?.includes('Invalid login credentials')) {
          setError('Email ou palavra-passe incorrectos.');
        } else if (error.message?.includes('Email not confirmed')) {
          setError('Por favor, confirme o seu email antes de fazer login.');
        } else if (error.message?.includes('Too many requests')) {
          setError('Muitas tentativas. Tente novamente em alguns minutos.');
        } else {
          setError('Erro ao fazer login. Tente novamente.');
        }
      } else {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo ao Legalflux",
        });
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setError('Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative w-full max-w-md">
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
              Bem-vindo de volta
            </CardTitle>
            <p className="text-gray-600">
              Acesse sua conta para continuar
            </p>
          </CardHeader>

          <CardContent className="p-8">
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-primary-800 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value.trim()})}
                  className="rounded-xl border-gray-200 focus:border-primary-800 focus:ring-primary-800"
                  required
                  disabled={loading}
                />
              </div>

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

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300" disabled={loading} />
                  <span className="text-gray-600">Lembrar-me</span>
                </label>
                <a href="#" className="text-primary-800 hover:underline">
                  Esqueceu a palavra-passe?
                </a>
              </div>

              <Button 
                type="submit"
                className="w-full bg-primary-800 hover:bg-primary-700 text-white py-3 rounded-xl font-semibold"
                disabled={loading}
              >
                {loading ? 'A entrar...' : 'Entrar'}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Ainda não tem conta?{' '}
                <Link to="/register" className="text-primary-800 hover:underline font-medium">
                  Criar conta
                </Link>
              </p>
            </div>

            {/* 2FA Notice */}
            <div className="mt-6 p-4 bg-accent-50 rounded-xl">
              <p className="text-sm text-accent-800 text-center">
                🔒 Autenticação em dois factores disponível para maior segurança
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
