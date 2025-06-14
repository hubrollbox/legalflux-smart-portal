
// Edge Function para gerar PDF/documento legal e enviar por email (Resend)
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

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
    const { insolvenciaId, tipo_documento, email_destino } = await req.json();

    // --- 1. Simular conteúdo PDF (poderá ser gerado real via outro serviço, por ora txt-base64) ---
    // (Em produção, usar lib de PDF real ou serviço externo)
    const docContent = `Documento automático LegalFlux: ${tipo_documento}\nInsolvência: ${insolvenciaId}\nData: ${new Date().toISOString()}`;
    const fakeUrl = `https://iibvdqcwycrcyskxvsgu.supabase.co/storage/v1/object/public/documentos/demo/${insolvenciaId}-${tipo_documento}.txt`;

    // --- 2. Registar na tabela documentos_insolvencia ---
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnon = Deno.env.get("SUPABASE_ANON_KEY");
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
        tipo_documento,
        conteudo: fakeUrl,
        data: new Date().toISOString(),
      })
    });
    const docInsert = await dbRes.json();

    // --- 3. Enviar email via Resend ---
    if (email_destino) {
      await resend.emails.send({
        from: "LegalFlux <onboarding@resend.dev>",
        to: [email_destino],
        subject: `Documento legal (${tipo_documento})`,
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

    return new Response(JSON.stringify({ success: true, doc: docInsert[0] }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("[EdgeFunction] ERRO gerar_documento_insolvencia:", error);
    return new Response(
      JSON.stringify({ error: error.message || String(error) }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
