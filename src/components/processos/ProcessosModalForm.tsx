
import ProcessoForm from "@/components/processos/ProcessoForm";

// Wrapper para poder usar em modalità modal padrão (show/hide)
const ProcessosModalForm = ({
  open,
  onOpenChange,
  onSubmit,
  processo,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onSubmit: (data: any) => Promise<void>;
  processo: any;
}) => (
  <ProcessoForm
    open={open}
    onOpenChange={onOpenChange}
    onSubmit={onSubmit}
    processo={processo}
  />
);
export default ProcessosModalForm;
