
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Props {
  onQueryChange: (q: string) => void;
}
const IntegrationSearchBar = ({ onQueryChange }: Props) => {
  const [q, setQ] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQ(e.target.value);
    onQueryChange(e.target.value);
  }

  return (
    <div className="mb-8 flex items-center w-full max-w-lg mx-auto relative">
      <Search className="absolute left-3 text-accent-400 pointer-events-none" size={20} />
      <Input
        className="pl-10 pr-3 py-2 rounded-lg bg-accent-50 placeholder:text-accent-400"
        value={q}
        onChange={handleChange}
        placeholder="Buscar integrações..."
        aria-label="Buscar integrações"
      />
    </div>
  );
};

export default IntegrationSearchBar;
