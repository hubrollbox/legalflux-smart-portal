
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DadosEmpresa {
  nome_empresa: string;
  setor: string;
}
export interface Step2FormData {
  email: string;
  password: string;
  confirmPassword: string;
  nome: string;
  telefone: string;
  tipo: string;
  nif: string;
  numero_profissional: string;
  morada: string;
  metodo_pagamento: string;
  dados_empresa: DadosEmpresa;
}

interface Step2Props {
  formData: Step2FormData;
  onChange: (data: Partial<Step2FormData>) => void;
  onBack: () => void;
  onSuccess: () => void;
  setRegistered: (r: boolean) => void;
}

const validateStep2 = (formData: Step2FormData) => {
  if (!formData.nome || !formData.email || !formData.password || !formData.confirmPassword) {
    return "Preencha todos os campos obrigatórios.";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    return "E-mail inválido.";
  }
  if (formData.password.length < 8) {
    return "A senha deve ter pelo menos 8 caracteres.";
  }
  if (formData.password !== formData.confirmPassword) {
    return "As senhas não correspondem.";
  }
  if (formData.tipo === "advogado" && !formData.numero_profissional) {
    return "Número profissional é obrigatório para advogados.";
  }
  return "";
};

const Step2 = ({ formData, onChange, onBack, onSuccess, setRegistered }: Step2Props) => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const validationMsg = validateStep2(formData);
        if (validationMsg) {
          toast({ title: "Erro", description: validationMsg, variant: "destructive" });
          return;
        }
        setLoading(true);
        try {
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
                telefone: formData.telefone,
              },
            },
          });
          if (error) throw error;
          const userId = data.user?.id;
          if (!userId) throw new Error("ID de utilizador não encontrado. Contacte o suporte.");
          const profileInsert = {
            id: userId,
            email: formData.email,
            role: formData.tipo as "cliente" | "assistente" | "advogado" | "admin",
            status: "pending",
            nome: formData.nome || "",
            telefone: formData.telefone || "",
            nif: formData.nif || "",
            numero_profissional: formData.numero_profissional || "",
            morada: formData.morada || "",
            metodo_pagamento: formData.metodo_pagamento || "",
            dados_faturacao: formData.tipo === "empresa" ? formData.dados_empresa : {},
          };
          const { error: insertError } = await supabase.from("users_extended").insert([profileInsert]);
          if (insertError) throw insertError;
          setRegistered(true);
          onSuccess();
        } catch (error) {
          const err = error as { message?: string; email?: string };
          if (err && typeof err === "object" && err.message?.includes("User already registered")) {
            toast({
              title: "E-mail já registado",
              description: "Já existe uma conta associada a este e-mail. Por favor faça login.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Erro no registo",
              description: err && typeof err === "object" && err.message
                ? err.message
                : "Ocorreu um erro durante o registo.",
              variant: "destructive",
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
          <Input
            id="nome"
            type="text"
            value={formData.nome}
            onChange={(e) => onChange({ nome: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onChange({ email: e.target.value })}
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
              onChange={(e) => onChange({ password: e.target.value })}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Esconder palavra-passe" : "Mostrar palavra-passe"}
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
            onChange={(e) => onChange({ confirmPassword: e.target.value })}
            required
          />
        </div>
      </div>
      {formData.tipo === "advogado" && (
        <div>
          <Label htmlFor="numero_profissional">Número Profissional *</Label>
          <Input
            id="numero_profissional"
            type="text"
            value={formData.numero_profissional}
            onChange={(e) => onChange({ numero_profissional: e.target.value })}
            placeholder="Ex: 12345-OA"
            required
          />
        </div>
      )}
      {formData.tipo === "cliente" && (
        <div>
          <Label htmlFor="nif">NIF</Label>
          <Input id="nif" type="text" value={formData.nif} onChange={(e) => onChange({ nif: e.target.value })} />
        </div>
      )}
      <Button type="submit" className="w-full bg-primary-800 hover:bg-primary-700">
        {loading ? "Aguarde..." : "Criar Conta"}
      </Button>
      <Button type="button" variant="ghost" className="w-full" onClick={onBack}>
        Voltar
      </Button>
    </form>
  );
};

export default Step2;
