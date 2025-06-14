
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { AES, enc } from "npm:crypto-js@4.2.0";

const KEY = Deno.env.get("CREDENTIALS_SECRET");

// Classic CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    const { data, cipherText, mode } = await req.json();
    if (!KEY) throw new Error("CREDENTIALS_SECRET não está definido.");
    if (mode === "decrypt") {
      if (!cipherText) throw new Error("cipherText obrigatório.");
      const bytes = AES.decrypt(cipherText, KEY);
      const plain = bytes.toString(enc.Utf8);
      return new Response(JSON.stringify({ data: plain }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } else {
      if (!data) throw new Error("data obrigatório.");
      const encrypted = AES.encrypt(data, KEY).toString();
      return new Response(JSON.stringify({ cipherText: encrypted }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
