
// Edge Function para gerar PDF/documento legal e enviar por email (Resend)
// Fase 2: Autenticação JWT e segurança reforçada

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// Valida JWT Supabase e retorna o userId (ou null)
async function getUserIdFromJwt(req: Request, supabaseAnon: string, supabaseUrl: string): Promise<string | null> {
  const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  const token = authHeader.replace("Bearer ", "");
  // Checa JWT via Supabase Auth endpoint
  const verifyRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apikey: supabaseAnon,
    },
  });
  if (!verifyRes.ok) return null;
  const json = await verifyRes.json();
  return json?.id ?? null;
}

// Check if user can manage this insolvency
async function podeGerirInsolvencia(userId: string, insolvenciaId: string, supabaseAnon: string, supabaseUrl: string): Promise<boolean> {
  // Chama rpc/pode_gerir_insolvencia
  const res = await fetch(`${supabaseUrl}/rest/v1/rpc/pode_gerir_insolvencia`, {
    method: "POST",
    headers: {
      apikey: supabaseAnon,
      Authorization: `Bearer ${supabaseAnon}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _user_id: userId, _insolvencia_id: insolvenciaId }),
  });
  if (!res.ok) return false;
  const json = await res.json();
  return json === true;
}

// Validadores auxiliares
function validateEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) && email.length < 255;
}
function sanitizeTipoDocumento(tipo: string) {
  // Permita só nomes documentais permitidos
  const allowedTypes = [
    "Relação Provisória de Credores",
    "Inventário de Bens",
    "Relação de Credores Reconhecidos"
  ];
  return allowedTypes.includes(tipo) ? tipo : null;
}
function isUuidLike(str: string) {
  return /^[0-9a-fA-F-]{36}$/.test(str);
}

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // -- Config
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnon = Deno.env.get("SUPABASE_ANON_KEY");

    // -- 1. Parse e valida input
    let body;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "JSON mal formado." }), { status: 400, headers: corsHeaders });
    }
    const { insolvenciaId, tipo_documento, email_destino } = body || {};

    // Validação básica dos campos
    if (!insolvenciaId || !isUuidLike(insolvenciaId)) {
      return new Response(JSON.stringify({ error: "insolvenciaId inválido." }), { status: 400, headers: corsHeaders });
    }
    const checkedTipoDoc = sanitizeTipoDocumento(tipo_documento);
    if (!checkedTipoDoc) {
      return new Response(JSON.stringify({ error: "Tipo de documento inválido." }), { status: 400, headers: corsHeaders });
    }
    if (email_destino && !validateEmail(email_destino)) {
      return new Response(JSON.stringify({ error: "Email destino inválido." }), { status: 400, headers: corsHeaders });
    }

    // -- 2. Auth e autorização
    const requesterId = await getUserIdFromJwt(req, supabaseAnon, supabaseUrl);
    if (!requesterId) {
      return new Response(JSON.stringify({ error: "Requer autenticação." }), { status: 401, headers: corsHeaders });
    }
    const permitido = await podeGerirInsolvencia(requesterId, insolvenciaId, supabaseAnon, supabaseUrl);
    if (!permitido) {
      return new Response(JSON.stringify({ error: "Sem permissão para aceder ao processo." }), { status: 403, headers: corsHeaders });
    }

    // --- 3. Simular conteúdo PDF (poderá ser gerado real via outro serviço, por ora txt-base64) ---
    // (Em produção, usar lib de PDF real ou serviço externo)
    const docContent = `Documento automático LegalFlux: ${checkedTipoDoc}\nInsolvência: ${insolvenciaId}\nData: ${new Date().toISOString()}`;
    const fakeUrl = `https://iibvdqcwycrcyskxvsgu.supabase.co/storage/v1/object/public/documentos/demo/${insolvenciaId}-${checkedTipoDoc.replace(/\s+/g, "_")}.txt`;

    // --- 4. Registar na tabela documentos_insolvencia ---
    const dbRes = await fetch(`${supabaseUrl}/rest/v1/documentos_insolvencia`, {
      method: "POST",
      headers: {
        apikey: supabaseAnon,
        Authorization: `Bearer ${supabaseAnon}`,
        "Content-Type": "application/json",
        Prefer: "return=representation"
      },
      body: JSON.stringify({
        insolvencia_id: insolvenciaId,
        tipo_documento: checkedTipoDoc,
        conteudo: fakeUrl,
        data: new Date().toISOString(),
      })
    });
    const docInsert = await dbRes.json();

    // --- 5. Enviar email via Resend (se pedido) ---
    if (email_destino) {
      await resend.emails.send({
        from: "LegalFlux <onboarding@resend.dev>",
        to: [email_destino],
        subject: `Documento legal (${checkedTipoDoc})`,
        html: `<b>Segue em anexo o documento legal gerado automaticamente.<br>
        <a href="${fakeUrl}" target="_blank">${fakeUrl}</a>`,
      });

      // Registar log da partilha/envio
      await fetch(`${supabaseUrl}/rest/v1/logs_partilha_documentos_insolvencia`, {
        method: "POST",
        headers: {
          apikey: supabaseAnon,
          Authorization: `Bearer ${supabaseAnon}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documento_id: docInsert[0]?.id,
          enviado_para: email_destino,
          metodo: "email",
          sucesso: true,
          detalhe: `Enviado automaticamente via Edge Function LegalFlux`,
        })
      });
    }

    // Resposta segura sem detalhes de backend
    return new Response(JSON.stringify({ success: true, doc: docInsert[0] }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    // Só loga detalhes internamente, nunca para fora
    console.error("[EdgeFunction] ERRO gerar_documento_insolvencia:", error);
    return new Response(
      JSON.stringify({ error: "Falha ao gerar documento. Se o erro persistir, contacte o administrador." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
