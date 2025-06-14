
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface Step1Props {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

const Step1 = ({ value, onChange, onNext }: Step1Props) => (
  <div className="space-y-6">
    <div>
      <Label htmlFor="tipo">Tipo de Utilizador *</Label>
      <Select value={value} onValueChange={onChange}>
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
    <Button className="w-full bg-primary-800 hover:bg-primary-700" disabled={!value} onClick={onNext}>
      Próximo
    </Button>
  </div>
);

export default Step1;
