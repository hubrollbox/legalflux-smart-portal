# 🚀 LegalFlux Smart Portal

[![Licença MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-green.svg)](https://nodejs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-integrated-3ECF8E.svg)](https://supabase.io/)

![Dashboard LegalFlux](Devices_Set_LegalFlux.png) 
*Painel de controle completo para gestão jurídica*

## 📌 Índice

- [Visão Geral](#-visão-geral)
- [Destaques](#✨-destaques)
- [Capturas de Tela](#📸-capturas-de-tela)
- [Público-Alvo](#🎯-público-alvo)
- [Planos](#📦-planos)
- [Tecnologias](#⚙️-tecnologias)
- [Instalação](#🚀-instalação)
- [Contato](#📬-contato)

## 🌐 Visão Geral

Plataforma completa para advogados e escritórios que otimiza processos, centraliza informações e potencializa resultados.

**Principais benefícios:**
- Gestão unificada de casos jurídicos
- Portal autônomo para clientes
- Agenda integrada com lembretes automáticos
- Geração de documentos legais

## ✨ Destaques

### 📋 Painel de Controle Inteligente
- Visão geral de processos ativos (28+ casos simultâneos)
- Alertas de prazos críticos
- Estatísticas de produtividade

### 📅 Gestão de Prazos
![Mobile Preview](mockup_mobile_Legalflux.png)
*Visualização mobile de prazos processuais*

- Controle de prazos para os próximos dias
- Notificações automáticas
- Integração com calendários

### 📑 Módulo de Insolvência
- Geração automática de documentos (CIRE Art. 129º, 154º)
- Gestão de credores e inventário
- Checklist por fase processual

## 📸 Capturas de Tela

| Dashboard Principal | Visão Mobile |
|---------------------|--------------|
| ![Desktop View](Devices_Set_LegalFlux.png) | ![Mobile View](mockup_mobile_Legalflux.png) |

**Funcionalidades visíveis:**
- Listagem de processos ativos
- Próximos prazos (2 dias)
- Documentos recentes adicionados
- Agenda de audiências

## 🎯 Público-Alvo

- **Advogados autônomos**
  - Gestão de 20+ casos simultâneos
  - Controle financeiro integrado

- **Escritórios pequenos/médios**
  - Até 3 assistentes (plano Profissional)
  - Dashboard colaborativo

- **Administradores de insolvência**
  - Módulo especializado (add-on)
  - Geração de documentos CIRE

## 📦 Planos

| Recurso               | Basic | Profissional | Enterprise |
|-----------------------|-------|-------------|------------|
| Processos ilimitados  | ✅    | ✅          | ✅         |
| Armazenamento         | 100MB | 2GB         | 10GB+      |
| Assistente jurídico   | ❌    | 3           | Ilimitado  |
| Dashboard financeiro  | ❌    | Básico      | Completo   |
| Suporte 24/7          | ❌    | ❌          | ✅         |

## ⚙️ Tecnologias

**Stack Principal:**
- **Frontend**: Next.js + TailwindCSS
- **Backend**: Supabase (PostgreSQL)
- **Autenticação**: Magic Links
- **Hospedagem**: Vercel Edge

```mermaid
graph TD
  A[Clientes] --> B[Next.js]
  B --> C[Supabase]
  C --> D[(PostgreSQL)]
  C --> E[Autenticação]
  C --> F[Armazenamento]
