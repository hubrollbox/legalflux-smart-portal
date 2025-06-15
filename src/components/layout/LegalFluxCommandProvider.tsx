
import { ReactNode } from "react";
import CommandPalette from "@/components/CommandPalette";

export default function LegalFluxCommandProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <CommandPalette />
      {children}
    </>
  );
}
