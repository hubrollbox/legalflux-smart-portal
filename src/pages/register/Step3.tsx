
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Step3 = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center space-y-6 py-8">
      <CheckCircle className="h-16 w-16 text-green-600 mb-2" />
      <h2 className="text-2xl font-bold text-primary-800">Registo enviado!</h2>
      <p className="text-gray-700 text-center max-w-xs">O seu registo foi enviado para aprovação. Será contactado em breve.</p>
      <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 mt-4 w-full max-w-md">
        <h3 className="font-semibold text-primary-800 mb-2">Próximos Passos</h3>
        <ul className="list-disc pl-6 text-gray-700 text-sm space-y-1">
          <li>Complete o seu perfil da firma</li>
          <li>Adicione documentos iniciais</li>
          <li>Configure integrações (Google Drive, OneDrive, etc.)</li>
          <li>Convite membros da equipa</li>
        </ul>
        <Button className="mt-4 w-full bg-primary-800 hover:bg-primary-700" onClick={() => navigate("/login")}>
          Ir para Login
        </Button>
      </div>
    </div>
  );
};

export default Step3;
