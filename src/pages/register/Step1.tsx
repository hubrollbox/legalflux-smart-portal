
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Step1Props {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

// Permite escolha entre Jurista ou Empresa
const Step1 = ({ value, onChange, onNext }: Step1Props) => (
  <div className="space-y-6">
    <div>
      <Label htmlFor="tipo">Tipo de Utilizador *</Label>
      <RadioGroup
        id="tipo"
        name="tipo"
        value={value}
        onValueChange={onChange}
        className="mt-2 flex flex-col gap-2"
      >
        <div className="flex items-center">
          <RadioGroupItem value="advogado" id="jurista" />
          <Label htmlFor="jurista" className="ml-2">Jurista (Advogado/Solicitador)</Label>
        </div>
        <div className="flex items-center">
          <RadioGroupItem value="empresa" id="empresa" />
          <Label htmlFor="empresa" className="ml-2">Empresa</Label>
        </div>
      </RadioGroup>
      <span className="block text-xs text-gray-500 mt-2">
        Juristas e Empresas podem registar-se. Clientes e Assistentes são adicionados pelo painel do Jurista.
      </span>
    </div>
    <Button className="w-full bg-primary-800 hover:bg-primary-700" disabled={!value} onClick={onNext}>
      Próximo
    </Button>
  </div>
);

export default Step1;
