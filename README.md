# LegalFlux Smart Portal 
Uma plataforma moderna e eficiente para a gestão de fluxos jurídicos. Desenvolvida com Vite, React, TypeScript, Tailwind CSS e Supabase.

---

## 🧭 Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação Local](#instalação-local)
- [Configuração de Ambiente](#configuração-de-ambiente)
- [Publicação e Deploy](#publicação-e-deploy)
- [Testes](#testes)
- [Planeamento e Evolução](#planeamento-e-evolução)
- [Recursos Úteis](#recursos-úteis)
- [Segurança](#segurança)
- [Contributo](#contributo)
- [Licença](#licença)
- [Apoio e Suporte](#apoio-e-suporte)
- [Agradecimentos](#agradecimentos)

---

## 👁 Visão Geral

O **LegalFlux Smart Portal** é uma plataforma web desenvolvida para facilitar a gestão de processos jurídicos, com foco em escritórios de advocacia, juristas e assistentes legais. Através de uma interface intuitiva e moderna, permite a organização de documentos, autenticação segura e gestão de acessos com diferentes níveis de permissão.

---

## ✨ Funcionalidades

- 🔐 Autenticação segura através do Supabase Auth  
- 📁 Armazenamento e gestão de documentos jurídicos  
- 👥 Gestão de utilizadores com diferentes permissões: Administrador, Cliente, Assistente, Jurista, Escritório  
- 📊 Painel de controlo com métricas (em desenvolvimento)  
- 📬 Sistema de notificações e alertas  
- 🔎 Melhorias na experiência do utilizador com paginação e indicadores de carregamento  

---

## 🛠 Tecnologias Utilizadas

**Frontend:**  
- Vite  
- React  
- TypeScript  
- Tailwind CSS  
- shadcn/ui  

**Backend e Infraestrutura:**  
- Supabase (Auth, Storage, PostgreSQL)  
- Vercel (Hospedagem e CI/CD)

**Testes:**  
- Jest  
- Cypress  

---

## 🚀 Instalação Local

### Pré-requisitos

- Node.js versão 18 ou superior  
- npm versão 9 ou superior  
- Conta Supabase (camada gratuita é suficiente)

### Instruções

```bash
git clone https://github.com/hubrollbox/legalflux-smart-portal.git
cd legalflux-smart-portal
npm install
Crie um ficheiro .env.local com base no ficheiro .env.example e insira as seguintes variáveis:

env
Copy
Edit
NEXT_PUBLIC_SUPABASE_URL=sua-url-do-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anónima
Inicie o servidor de desenvolvimento:

bash
Copy
Edit
npm run dev
A aplicação estará acessível em http://localhost:3000

⚙️ Configuração de Ambiente
No Supabase:

Ativar Row-Level Security (RLS) em todas as tabelas.

Definir políticas de acesso seguras e adequadas a cada tabela.

Configurar CORS para permitir apenas os domínios autorizados (ex.: https://legalflux.pt).

Variáveis de Ambiente:

Gerir as variáveis de ambiente através do painel da Vercel.

Nunca expor a chave SUPABASE_SERVICE_ROLE_KEY no frontend.

☁️ Publicação e Deploy
Recomendado: Vercel
Criar uma conta gratuita em vercel.com

Ligar o repositório do GitHub à Vercel

Configurar as variáveis de ambiente no painel da Vercel

Ativar cabeçalhos de segurança como CSP e HSTS

Garantir que o Supabase possui RLS ativo e corretamente configurado

Alternativas compatíveis:
Netlify

Render

Outras plataformas compatíveis com Vite

🧪 Testes
Testes Unitários (Jest):
bash
Copy
Edit
npm run test
Testes End-to-End (Cypress):
bash
Copy
Edit
npm run cypress:open
⚠️ Recomenda-se utilizar um projeto Supabase separado para testes, de forma a evitar alterações nos dados reais.

🗺 Planeamento e Evolução
✅ Sistema de autenticação e permissões

✅ Interface inicial com painel de controlo

☐ Assinatura digital de documentos

☐ Integração com bases jurídicas externas

☐ Exportação de relatórios em formato PDF

☐ Notificações por push e e-mail

☐ Alternância entre temas (claro / escuro)

🔍 Recursos Úteis
Documentação Vite

Documentação React

Documentação Supabase

Tailwind CSS

shadcn/ui

Conventional Commits

🔒 Segurança
Tendo em conta a sensibilidade dos dados jurídicos, seguem-se as recomendações de segurança:

Row-Level Security (RLS): ativar e definir políticas de acesso por utilizador.

sql
Copy
Edit
CREATE POLICY "Users can view their own documents"
ON documents
FOR SELECT
USING (auth.uid() = user_id);
Chaves de API:

Utilizar apenas anon no frontend.

A service_role deve ser usada exclusivamente em ambientes de servidor ou edge functions.

CORS:

Restringir o acesso apenas a domínios autorizados.

Backups:

Ativar backups automáticos no Supabase.

Auditoria e Logs:

Utilizar os logs do Supabase para monitorizar acessos e anomalias.

Evitar comprometer .env.local:

Assegurar que está listado no .gitignore.

Verificação de Segurança:

Utilizar ferramentas como GitGuardian para prevenir exposição de chaves API.

🤝 Contributo
Siga os passos abaixo para contribuir:

bash
Copy
Edit
git checkout -b feature/nome-da-feature
git commit -m "feat: descrição da funcionalidade"
git push origin feature/nome-da-feature
Efetuar um fork do repositório

Criar uma nova branch

Submeter um Pull Request

Padrões recomendados:

Commits: Conventional Commits

Estilo de código: Guia de Estilo JavaScript da Airbnb

📄 Licença
Distribuído sob a licença MIT. Consulte o ficheiro LICENSE para mais informações.

💬 Apoio e Suporte
Caso surjam dúvidas, sugestões ou problemas:

Abrir uma issue neste repositório

Ou contactar por e-mail: suporte@legalflux.com

🌟 Agradecimentos
O nosso agradecimento especial às comunidades e ferramentas que tornaram este projecto possível:

Supabase

Vite

React

Tailwind CSS

shadcn/ui

