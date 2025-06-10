// DocumentoUpload.tsx
import { useRef, useState } from 'react';
import { DocumentoService, Documento } from '@/services/DocumentoService';
import { Button } from '@/components/ui/button';

interface DocumentoUploadProps {
  onUpload: (doc: Documento) => void;
  casoId: string; // required, matches Supabase schema
  descricao?: string | null;
}

export default function DocumentoUpload({ onUpload, casoId, descricao }: DocumentoUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const doc = await DocumentoService.upload(file, { caso_id: casoId, descricao });
      onUpload(doc);
      if (fileRef.current) fileRef.current.value = '';
    } catch (err) {
      alert('Erro ao fazer upload.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="flex gap-2 items-center">
      <label htmlFor="file-upload" className="sr-only">Arquivo</label>
      <input id="file-upload" type="file" ref={fileRef} className="input" required />
      <Button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Upload'}</Button>
    </form>
  );
}
