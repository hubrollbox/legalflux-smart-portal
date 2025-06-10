// DocumentoService.ts
// Serviço para upload, versionamento e busca de documentos jurídicos
import { supabase } from '@/integrations/supabase/client';

export interface Documento {
  id?: string;
  caso_id: string;
  nome: string;
  url: string;
  descricao?: string | null;
  criado_em?: string | null;
}

const TABLE = 'documentos';

export const DocumentoService = {
  async list(filtro: Partial<Documento> = {}) {
    let query = supabase.from(TABLE).select('*');
    if (filtro.caso_id) query = query.eq('caso_id', filtro.caso_id);
    const { data, error } = await query.order('criado_em', { ascending: false });
    if (error) throw error;
    return data as Documento[];
  },
  async upload(file: File, meta: Partial<Documento>) {
    // Upload para Supabase Storage
    const filePath = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from('documentos').upload(filePath, file);
    if (error) throw error;
    // Salvar metadados no banco
    const doc: Partial<Documento> = {
      ...meta,
      nome: file.name,
      url: data?.path || '',
      criado_em: new Date().toISOString(),
    };
    const { data: docData, error: docError } = await supabase.from(TABLE).insert([doc]).select().single();
    if (docError) throw docError;
    return docData as Documento;
  },
  async versionar(id: string, file: File) {
    // Buscar documento atual
    const { data: doc, error } = await supabase.from(TABLE).select('*').eq('id', id).single();
    if (error) throw error;
    // Upload nova versão
    const filePath = `${Date.now()}-v2-${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage.from('documentos').upload(filePath, file);
    if (uploadError) throw uploadError;
    // Atualizar registro
    const { data: updated, error: updateError } = await supabase.from(TABLE).update({
      url: uploadData?.path,
      criado_em: new Date().toISOString(),
    }).eq('id', id).select().single();
    if (updateError) throw updateError;
    return updated as Documento;
  },
};
