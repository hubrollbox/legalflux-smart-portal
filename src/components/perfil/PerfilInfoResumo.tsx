
import { Button } from "@/components/ui/button";

interface PerfilInfoResumoProps {
  nome: string;
  email: string;
  telefone: string;
  onEditar: () => void;
}

const PerfilInfoResumo = ({
  nome,
  email,
  telefone,
  onEditar,
}: PerfilInfoResumoProps) => (
  <div className="space-y-2">
    <div>
      <span className="font-medium">Nome: </span>
      {nome || <span className="italic text-muted-foreground">—</span>}
    </div>
    <div>
      <span className="font-medium">Email: </span>
      {email || <span className="italic text-muted-foreground">—</span>}
    </div>
    <div>
      <span className="font-medium">Telefone: </span>
      {telefone || <span className="italic text-muted-foreground">—</span>}
    </div>
    <div className="flex gap-3 mt-4">
      <Button size="sm" onClick={onEditar}>Editar perfil</Button>
    </div>
  </div>
);

export default PerfilInfoResumo;
