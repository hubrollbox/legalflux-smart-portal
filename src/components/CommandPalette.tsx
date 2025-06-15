
import * as React from "react";
import { CommandDialog, CommandInput, CommandList, CommandItem, CommandGroup, CommandEmpty } from "@/components/ui/command";
import { useNavigate } from "react-router-dom";
import { list, user, fileText, search } from "lucide-react";

const quickActions = [
  {
    label: "Novo Processo",
    icon: fileText,
    to: "/processos",
  },
  {
    label: "Novo Cliente",
    icon: user,
    to: "/clientes",
  },
  {
    label: "Ir para Calendário",
    icon: list,
    to: "/calendario",
  },
  {
    label: "Pesquisa Global",
    icon: search,
    to: "/",
  },
];

const CommandPalette = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Digite para procurar..." />
      <CommandList>
        <CommandEmpty>Nenhum resultado.</CommandEmpty>
        <CommandGroup heading="Ações rápidas">
          {quickActions.map((opt) => (
            <CommandItem
              key={opt.label}
              onSelect={() => {
                setOpen(false);
                navigate(opt.to);
              }}
            >
              <opt.icon size={18} className="mr-2" />
              {opt.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandPalette;
