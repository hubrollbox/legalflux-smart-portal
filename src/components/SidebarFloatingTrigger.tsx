
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Botão flutuante para abrir/fechar sidebar em mobile.
 * Fica visível apenas em ecrãs pequenos.
 */
const SidebarFloatingTrigger = () => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;
  return (
    <SidebarTrigger className="fixed bottom-4 left-4 z-50 shadow-lg bg-white hover:bg-accent-100 border rounded-full px-3 py-2 md:hidden" />
  );
};

export default SidebarFloatingTrigger;
