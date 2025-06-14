
# Backend LegalFlux (Nest.js)

## Como rodar

```bash
npm i
npm run start:dev
```

### Env vars esperadas

- `AWS_REGION`
- `SQS_URL`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

---

## OIDC via GitHub Actions (para deploy seguro)

Recomende rodar pipeline usando [OIDC](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect). Ajuste o workflow `.github/workflows/deploy.yml` para obter temporariamente as credenciais de deploy ao invés de armazenar secrets estaticamente.

---

### Outros links

- [NestJS](https://docs.nestjs.com/)
- [SQS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html)

