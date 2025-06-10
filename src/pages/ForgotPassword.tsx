import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simular envio de e-mail de redefinição
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Erro ao enviar e-mail de redefinição.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao processar a solicitação.');
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
