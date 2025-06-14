
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// Allow CORS for frontend
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const {
      token_url,
      code,
      client_id,
      client_secret,
      redirect_uri,
      extra // any extra object: scope, code_verifier, etc.
    } = body || {};

    if (!token_url || !code || !client_id || !client_secret || !redirect_uri) {
      return new Response(JSON.stringify({ error: "Missing required parameters." }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    // Build required params for OAuth token exchange
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri,
      client_id,
      client_secret
    });
    if (extra && typeof extra === "object") {
      for (const [key, value] of Object.entries(extra)) {
        if (typeof value === "string") {
          params.append(key, value);
        }
      }
    }

    const resp = await fetch(token_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params.toString()
    });

    const tokens = await resp.json();
    if (!resp.ok) {
      return new Response(JSON.stringify({ error: tokens.error_description || "OAuth token exchange failed." }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    return new Response(JSON.stringify(tokens), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (e) {
    console.error("[EdgeFunction][oauth_token_exchange] ERROR", e);
    return new Response(JSON.stringify({ error: "Internal error." }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});
