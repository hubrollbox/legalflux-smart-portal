
# 📚 API Reference

Documentação dos principais endpoints do backend LegalFlux (ajuste conforme migração para Nest.js).

## 🎯 Exemplos Gerais (Request/Response)

### Autenticação

- **POST `/api/auth/login`**  
  _Body:_
  ```json
  { "email": "user@x.pt", "password": "*******" }
  ```
  _Response 200:_
  ```json
  { "token": "jwt", "user": {...} }
  ```
  _Response 429 (Rate Limit):_
  ```json
  { "error": "Too many requests", "code": 429 }
  ```

### Processos

- **GET `/api/processos`**
  _Headers:_ `Authorization: Bearer <token>`
  _Response 200:_
  ```json
  [ { "id": "xxx", "numero": "2022/456", ... } ]
  ```
  _Response 401:_
  ```json
  { "error": "Unauthorized", "code": 401 }
  ```

### Exemplos de Rate Limit

- **Código:** `429`
- **Mensagem:** `"Too many requests. Try again later."`
- **Dica:** Integre middleware como Upstash ou mesmo “rate-limit-axios” no frontend.

---

> Para cada rota, detalhar:
> - Path
> - Método
> - Autorização/Regras de acesso (RBAC)
> - Parâmetros (query/body)
> - Exemplo de resposta e erros

