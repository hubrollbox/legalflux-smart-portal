
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Processos from "./pages/Processos";
import Calendario from "./pages/Calendario";
import Clientes from "./pages/Clientes";
import Chat from "./pages/Chat";
import Financeiro from "./pages/Financeiro";
import Definicoes from "./pages/Definicoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/processos" element={<Processos />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/definicoes" element={<Definicoes />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
