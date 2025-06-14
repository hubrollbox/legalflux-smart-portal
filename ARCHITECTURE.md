
# 📐 LegalFlux Smart Portal – Arquitetura

## Autenticação (Supabase)
```
[Usuário] ⇄ [Frontend React/Vite] ⇄ [Supabase Auth (JWT)]
```
- Fluxo:  
  Usuário faz login > Frontend → Supabase SDK → Validação/token JWT → Estado persistido com Zustand.

- **Zustand**: Estado local/global (ex: `useAuthStore.ts`) persiste sessão/token no localStorage.

- **Proteção de Rotas**: Componentes como `<ProtectedRoute />` bloqueiam acesso se não autenticado.

## CI/CD (AWS + GitHub Actions)

```
[Push code] → [GitHub Actions]
    ├─ Lint/Test (ESLint, Jest, Cypress)
    ├─ Build (Vite/Next.js)
    ├─ Deploy (AWS S3, Lambda, Amplify ou Vercel)
```
- **Secrets AWS**: Recomenda-se OIDC + GitHub Actions para rotação e proteção de credenciais.
- **Validação obrigatória**: Rodar lint e testes antes de build/deploy automático.

## Segurança
- Preferir cookies httpOnly/sameSite via backend (NextAuth ou API personalizada).
- Middleware de rate limit (exemplo Upstash) recomendado em `/middleware.ts` (Next.js).

---

## Referências
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Zustand Docs](https://docs.pmnd.rs/zustand)
- [GitHub Actions + OIDC](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)
- [Upstash Rate Limit Example](https://upstash.com/docs/rate-limits/with-next)
