
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CredoresSection from "@/components/insolvencia/CredoresSection";
import CreditosSection from "@/components/insolvencia/CreditosSection";
import BensInventarioSection from "@/components/insolvencia/BensInventarioSection";
import DividasMassaSection from "@/components/insolvencia/DividasMassaSection";
import NegociosCursoSection from "@/components/insolvencia/NegociosCursoSection";
import DocumentosSection from "@/components/insolvencia/DocumentosSection";
import ChecklistSection from "@/components/insolvencia/ChecklistSection";

const fetchInsolvencia = async (id: string) => {
  const { data, error } = await supabase
    .from("insolvencias")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data;
};

const InsolvenciaDetalhe: React.FC = () => {
  const { id } = useParams();
  const [tab, setTab] = useState("info");

  const { data: insolvencia, isLoading } = useQuery({
    queryKey: ["insolvencia", id],
    queryFn: () => fetchInsolvencia(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return <div className="p-8 text-muted-foreground">A carregar...</div>;
  }
  if (!insolvencia) {
    return <div className="p-8 text-danger">Processo não encontrado.</div>;
  }

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex items-center space-x-2 text-muted-foreground text-xs mb-2">
        <Link to="/insolvencias" className="hover:underline">
          Insolvências
        </Link>
        <span>/</span>
        <span className="text-black">{insolvencia.numero_processo}</span>
      </div>
      <h1 className="text-xl font-semibold mb-1">
        Processo: {insolvencia.numero_processo}
      </h1>
      <div className="text-sm mb-2">
        <b>Tribunal:</b> {insolvencia.tribunal} | <b>Devedor:</b> {insolvencia.devedor}
      </div>
      <Tabs value={tab} onValueChange={setTab} className="mt-4">
        <TabsList>
          <TabsTrigger value="info">Informação Geral</TabsTrigger>
          <TabsTrigger value="credores">Credores</TabsTrigger>
          <TabsTrigger value="creditos">Créditos</TabsTrigger>
          <TabsTrigger value="bens">Inventário</TabsTrigger>
          <TabsTrigger value="dividas">Dívidas Massa</TabsTrigger>
          <TabsTrigger value="negocios">Negócios em Curso</TabsTrigger>
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <div className="bg-muted p-4 rounded mb-2">
            <p>
              <b>Tipo:</b> {insolvencia.tipo}
              <br />
              <b>Data Abertura:</b> {insolvencia.data_abertura}
              <br />
              <b>Criado em:</b> {insolvencia.created_at}
            </p>
          </div>
        </TabsContent>
        <TabsContent value="credores">
          <CredoresSection insolvenciaId={insolvencia.id} />
        </TabsContent>
        <TabsContent value="creditos">
          <CreditosSection insolvenciaId={insolvencia.id} />
        </TabsContent>
        <TabsContent value="bens">
          <BensInventarioSection insolvenciaId={insolvencia.id} />
        </TabsContent>
        <TabsContent value="dividas">
          <DividasMassaSection insolvenciaId={insolvencia.id} />
        </TabsContent>
        <TabsContent value="negocios">
          <NegociosCursoSection insolvenciaId={insolvencia.id} />
        </TabsContent>
        <TabsContent value="checklist">
          <ChecklistSection insolvenciaId={insolvencia.id} />
        </TabsContent>
        <TabsContent value="documentos">
          <DocumentosSection insolvenciaId={insolvencia.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InsolvenciaDetalhe;
