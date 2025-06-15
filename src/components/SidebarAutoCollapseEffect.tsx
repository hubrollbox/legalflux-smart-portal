
import { useEffect } from "react";
import { useSidebar } from "@/components/ui/sidebar";

function useAutoCollapseSidebar() {
  const { setOpen, isMobile, userToggledSidebar } = useSidebar();
  useEffect(() => {
    if (isMobile) return;
    if (userToggledSidebar) return;
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [setOpen, isMobile, userToggledSidebar]);
}

const SidebarAutoCollapseEffect = () => {
  useAutoCollapseSidebar();
  return null;
};

export default SidebarAutoCollapseEffect;
