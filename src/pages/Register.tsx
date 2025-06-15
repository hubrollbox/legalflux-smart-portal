import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Step1 from "./register/Step1";
import Step2, { Step2FormData } from "./register/Step2";
import Step3 from "./register/Step3";

const initialFormData: Step2FormData = {
  email: "",
  password: "",
  confirmPassword: "",
  nome: "",
  telefone: "",
  tipo: "",
  nif: "",
  numero_profissional: "",
  morada: "",
  metodo_pagamento: "",
  dados_empresa: {
    nome_empresa: "",
    setor: "",
  },
};

const Register = () => {
  const [step, setStep] = useState(1);
  const [registered, setRegistered] = useState(false);
  const [formData, setFormData] = useState<Step2FormData>(initialFormData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4 register-page">
      <div className="w-full max-w-md flex flex-col items-center">
        <Link to="/">
          <img
            src="/lovable-uploads/e64d9504-cd29-4461-8732-1fa9de63eda5.png"
            alt="Legalflux Logo"
            width={64}
            height={64}
            className="mb-4"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/lovable-uploads/e64d9504-cd29-4461-8732-1fa9de63eda5.png";
            }}
          />
        </Link>
        <Card className="w-full rounded-2xl border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-primary-800">Criar Conta – Jurista ou Empresa</CardTitle>
            <p className="text-gray-600 text-base">Junte-se à plataforma jurídica. Juristas e empresas podem registar-se de forma autónoma. Clientes e Assistentes são criados pelo painel do Jurista.</p>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <Step1
                value={formData.tipo}
                onChange={(tipo) => setFormData((d) => ({
                  ...d,
                  tipo,
                  numero_profissional: "",
                  dados_empresa: {
                    ...d.dados_empresa,
                    setor: ""
                  },
                }))}
                onNext={() => setStep(2)}
              />
            )}
            {step === 2 && (
              <Step2
                formData={formData}
                onChange={(data) => setFormData((prev) => ({
                  ...prev,
                  ...data,
                  tipo: prev.tipo, // Preserve tipo selection
                }))}
                onBack={() => setStep(1)}
                onSuccess={() => setStep(3)}
                setRegistered={setRegistered}
              />
            )}
            {step === 3 && <Step3 />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
