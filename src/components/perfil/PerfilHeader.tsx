
import { CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

interface PerfilHeaderProps {
  email: string;
  role?: string | null;
}

const PerfilHeader = ({ email, role }: PerfilHeaderProps) => (
  <CardHeader className="flex flex-row gap-4 items-center">
    <User className="h-8 w-8 text-primary-700" />
    <div>
      <CardTitle>
        Bem-vindo, {email}
      </CardTitle>
      <p className="text-sm text-gray-500">
        Tipo de utilizador:{" "}
        <span className="font-semibold">{role || "n/d"}</span>
      </p>
    </div>
  </CardHeader>
);

export default PerfilHeader;
