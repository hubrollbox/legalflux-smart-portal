
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        setError('Erro ao enviar instruções de recuperação. Confira o e-mail.');
        return;
      }
      setSubmitted(true);
    } catch (err) {
      setError('Erro ao processar a solicitação.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Esqueci Minha Senha</h1>
        {submitted ? (
          <p className="text-green-600">Um e-mail de redefinição foi enviado para {email}.</p>
        ) : (
          <>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mb-4"
            />
            {error && <p className="text-red-600 mb-2">{error}</p>}
            <Button type="submit" className="w-full bg-primary-800 hover:bg-primary-700">
              Enviar
            </Button>
          </>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
