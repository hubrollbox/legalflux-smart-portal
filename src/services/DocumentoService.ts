// DocumentoService.ts
// Serviço para upload, versionamento e busca de documentos jurídicos
import { supabase } from '@/integrations/supabase';

export interface Documento {
  id?: string;
  nome: string;
  url: string;
  versao: number;
  criadoEm?: string;
  atualizadoEm?: string;
  processoId?: string;
  clienteId?: string;
  textoIndexado?: string;
}

const TABLE = 'documentos';

export const DocumentoService = {
  async list(filtro: Partial<Documento> = {}) {
    let query = supabase.from(TABLE).select('*');
    if (filtro.processoId) query = query.eq('processoId', filtro.processoId);
    if (filtro.clienteId) query = query.eq('clienteId', filtro.clienteId);
    const { data, error } = await query.order('atualizadoEm', { ascending: false });
    if (error) throw error;
    return data as Documento[];
  },
  async upload(file: File, meta: Partial<Documento>) {
    // Upload para Supabase Storage
    const filePath = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from('documentos').upload(filePath, file);
    if (error) throw error;
    // Salvar metadados no banco
    const doc: Documento = {
      ...meta,
      nome: file.name,
      url: data?.path || '',
      versao: 1,
      criadoEm: new Date().toISOString(),
      atualizadoEm: new Date().toISOString(),
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
    const filePath = `${Date.now()}-v${(doc.versao || 1) + 1}-${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage.from('documentos').upload(filePath, file);
    if (uploadError) throw uploadError;
    // Atualizar registro
    const { data: updated, error: updateError } = await supabase.from(TABLE).update({
      url: uploadData?.path,
      versao: (doc.versao || 1) + 1,
      atualizadoEm: new Date().toISOString(),
    }).eq('id', id).select().single();
    if (updateError) throw updateError;
    return updated as Documento;
  },
  async indexarTexto(id: string, texto: string) {
    // Salva texto extraído/ocr para busca
    const { data, error } = await supabase.from(TABLE).update({ textoIndexado: texto }).eq('id', id).select().single();
    if (error) throw error;
    return data as Documento;
  },
  async buscarPorConteudo(query: string) {
    // Busca por texto indexado
    const { data, error } = await supabase.from(TABLE).select('*').ilike('textoIndexado', `%${query}%`);
    if (error) throw error;
    return data as Documento[];
  },
};
