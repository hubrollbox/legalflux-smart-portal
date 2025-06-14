export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      advogados: {
        Row: {
          criado_em: string | null
          escritorio_id: string | null
          id: string
          user_id: string
        }
        Insert: {
          criado_em?: string | null
          escritorio_id?: string | null
          id?: string
          user_id: string
        }
        Update: {
          criado_em?: string | null
          escritorio_id?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "advogados_escritorio_id_fkey"
            columns: ["escritorio_id"]
            isOneToOne: false
            referencedRelation: "escritorios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "advogados_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_advogado_escritorio"
            columns: ["escritorio_id"]
            isOneToOne: false
            referencedRelation: "escritorios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_advogado_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_advogados_escritorio"
            columns: ["escritorio_id"]
            isOneToOne: false
            referencedRelation: "escritorios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_advogados_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      assinaturas: {
        Row: {
          criado_em: string | null
          id: string
          plano_id: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          criado_em?: string | null
          id?: string
          plano_id?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          criado_em?: string | null
          id?: string
          plano_id?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assinaturas_plano_id_fkey"
            columns: ["plano_id"]
            isOneToOne: false
            referencedRelation: "planos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assinaturas_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_assinatura_plano"
            columns: ["plano_id"]
            isOneToOne: false
            referencedRelation: "planos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_assinatura_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_assinaturas_plano"
            columns: ["plano_id"]
            isOneToOne: false
            referencedRelation: "planos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_assinaturas_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      assistentes: {
        Row: {
          advogado_id: string
          criado_em: string | null
          id: string
          user_id: string
        }
        Insert: {
          advogado_id: string
          criado_em?: string | null
          id?: string
          user_id: string
        }
        Update: {
          advogado_id?: string
          criado_em?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assistentes_advogado_id_fkey"
            columns: ["advogado_id"]
            isOneToOne: false
            referencedRelation: "advogados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assistentes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_assistente_advogado"
            columns: ["advogado_id"]
            isOneToOne: false
            referencedRelation: "advogados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_assistente_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_assistentes_advogado"
            columns: ["advogado_id"]
            isOneToOne: false
            referencedRelation: "advogados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_assistentes_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      available_integrations: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          documentation_url: string | null
          icon_url: string | null
          id: string
          is_active: boolean | null
          name: string
          oauth_config: Json | null
          type: Database["public"]["Enums"]["integration_type"]
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          documentation_url?: string | null
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          oauth_config?: Json | null
          type: Database["public"]["Enums"]["integration_type"]
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          documentation_url?: string | null
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          oauth_config?: Json | null
          type?: Database["public"]["Enums"]["integration_type"]
        }
        Relationships: []
      }
      bens_inventario: {
        Row: {
          descricao: string
          estado: Database["public"]["Enums"]["estado_bem_insolvencia"] | null
          id: string
          insolvencia_id: string | null
          valor_estimado: number | null
        }
        Insert: {
          descricao: string
          estado?: Database["public"]["Enums"]["estado_bem_insolvencia"] | null
          id?: string
          insolvencia_id?: string | null
          valor_estimado?: number | null
        }
        Update: {
          descricao?: string
          estado?: Database["public"]["Enums"]["estado_bem_insolvencia"] | null
          id?: string
          insolvencia_id?: string | null
          valor_estimado?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bens_inventario_insolvencia_id_fkey"
            columns: ["insolvencia_id"]
            isOneToOne: false
            referencedRelation: "insolvencias"
            referencedColumns: ["id"]
          },
        ]
      }
      casos: {
        Row: {
          advogado_id: string | null
          cliente_id: string | null
          criado_em: string | null
          descricao: string | null
          fechado_em: string | null
          id: string
          is_fechado: boolean | null
          status: string | null
          titulo: string
        }
        Insert: {
          advogado_id?: string | null
          cliente_id?: string | null
          criado_em?: string | null
          descricao?: string | null
          fechado_em?: string | null
          id?: string
          is_fechado?: boolean | null
          status?: string | null
          titulo: string
        }
        Update: {
          advogado_id?: string | null
          cliente_id?: string | null
          criado_em?: string | null
          descricao?: string | null
          fechado_em?: string | null
          id?: string
          is_fechado?: boolean | null
          status?: string | null
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "casos_advogado_id_fkey"
            columns: ["advogado_id"]
            isOneToOne: false
            referencedRelation: "advogados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "casos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_caso_advogado"
            columns: ["advogado_id"]
            isOneToOne: false
            referencedRelation: "advogados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_caso_cliente"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_casos_advogado"
            columns: ["advogado_id"]
            isOneToOne: false
            referencedRelation: "advogados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_casos_cliente"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      checklist_insolvencia: {
        Row: {
          etapa: string
          id: string
          insolvencia_id: string | null
          prazo: string | null
          status:
            | Database["public"]["Enums"]["status_checklist_insolvencia"]
            | null
        }
        Insert: {
          etapa: string
          id?: string
          insolvencia_id?: string | null
          prazo?: string | null
          status?:
            | Database["public"]["Enums"]["status_checklist_insolvencia"]
            | null
        }
        Update: {
          etapa?: string
          id?: string
          insolvencia_id?: string | null
          prazo?: string | null
          status?:
            | Database["public"]["Enums"]["status_checklist_insolvencia"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "checklist_insolvencia_insolvencia_id_fkey"
            columns: ["insolvencia_id"]
            isOneToOne: false
            referencedRelation: "insolvencias"
            referencedColumns: ["id"]
          },
        ]
      }
      clientes: {
        Row: {
          advogado_id: string | null
          criado_em: string | null
          criado_por: string | null
          id: string
          telefone: string | null
          user_id: string
        }
        Insert: {
          advogado_id?: string | null
          criado_em?: string | null
          criado_por?: string | null
          id?: string
          telefone?: string | null
          user_id: string
        }
        Update: {
          advogado_id?: string | null
          criado_em?: string | null
          criado_por?: string | null
          id?: string
          telefone?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "clientes_advogado_id_fkey"
            columns: ["advogado_id"]
            isOneToOne: false
            referencedRelation: "advogados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clientes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_cliente_advogado"
            columns: ["advogado_id"]
            isOneToOne: false
            referencedRelation: "advogados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_cliente_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_clientes_advogado"
            columns: ["advogado_id"]
            isOneToOne: false
            referencedRelation: "advogados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_clientes_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      creditos: {
        Row: {
          credor_id: string | null
          data: string | null
          documentos: Json | null
          id: string
          tipo_credito: string
          valor: number
        }
        Insert: {
          credor_id?: string | null
          data?: string | null
          documentos?: Json | null
          id?: string
          tipo_credito: string
          valor: number
        }
        Update: {
          credor_id?: string | null
          data?: string | null
          documentos?: Json | null
          id?: string
          tipo_credito?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "creditos_credor_id_fkey"
            columns: ["credor_id"]
            isOneToOne: false
            referencedRelation: "credores"
            referencedColumns: ["id"]
          },
        ]
      }
      credores: {
        Row: {
          email: string | null
          id: string
          insolvencia_id: string | null
          nif: string | null
          nome: string
        }
        Insert: {
          email?: string | null
          id?: string
          insolvencia_id?: string | null
          nif?: string | null
          nome: string
        }
        Update: {
          email?: string | null
          id?: string
          insolvencia_id?: string | null
          nif?: string | null
          nome?: string
        }
        Relationships: [
          {
            foreignKeyName: "credores_insolvencia_id_fkey"
            columns: ["insolvencia_id"]
            isOneToOne: false
            referencedRelation: "insolvencias"
            referencedColumns: ["id"]
          },
        ]
      }
      dividas_massa: {
        Row: {
          categoria: string | null
          descricao: string
          id: string
          insolvencia_id: string | null
          valor: number | null
        }
        Insert: {
          categoria?: string | null
          descricao: string
          id?: string
          insolvencia_id?: string | null
          valor?: number | null
        }
        Update: {
          categoria?: string | null
          descricao?: string
          id?: string
          insolvencia_id?: string | null
          valor?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "dividas_massa_insolvencia_id_fkey"
            columns: ["insolvencia_id"]
            isOneToOne: false
            referencedRelation: "insolvencias"
            referencedColumns: ["id"]
          },
        ]
      }
      documentos: {
        Row: {
          caso_id: string
          criado_em: string | null
          descricao: string | null
          id: string
          nome: string
          url: string
        }
        Insert: {
          caso_id: string
          criado_em?: string | null
          descricao?: string | null
          id?: string
          nome: string
          url: string
        }
        Update: {
          caso_id?: string
          criado_em?: string | null
          descricao?: string | null
          id?: string
          nome?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "documentos_caso_id_fkey"
            columns: ["caso_id"]
            isOneToOne: false
            referencedRelation: "casos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_documento_caso"
            columns: ["caso_id"]
            isOneToOne: false
            referencedRelation: "casos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_documentos_caso"
            columns: ["caso_id"]
            isOneToOne: false
            referencedRelation: "casos"
            referencedColumns: ["id"]
          },
        ]
      }
      documentos_insolvencia: {
        Row: {
          conteudo: string | null
          data: string | null
          id: string
          insolvencia_id: string | null
          tipo_documento: string
        }
        Insert: {
          conteudo?: string | null
          data?: string | null
          id?: string
          insolvencia_id?: string | null
          tipo_documento: string
        }
        Update: {
          conteudo?: string | null
          data?: string | null
          id?: string
          insolvencia_id?: string | null
          tipo_documento?: string
        }
        Relationships: [
          {
            foreignKeyName: "documentos_insolvencia_insolvencia_id_fkey"
            columns: ["insolvencia_id"]
            isOneToOne: false
            referencedRelation: "insolvencias"
            referencedColumns: ["id"]
          },
        ]
      }
      escritorios: {
        Row: {
          criado_em: string | null
          endereco: string | null
          id: string
          nome: string
          telefone: string | null
        }
        Insert: {
          criado_em?: string | null
          endereco?: string | null
          id?: string
          nome: string
          telefone?: string | null
        }
        Update: {
          criado_em?: string | null
          endereco?: string | null
          id?: string
          nome?: string
          telefone?: string | null
        }
        Relationships: []
      }
      eventos: {
        Row: {
          caso_id: string | null
          created_at: string | null
          data_fim: string | null
          data_inicio: string
          descricao: string | null
          id: string
          tipo: string | null
          titulo: string
          user_id: string | null
        }
        Insert: {
          caso_id?: string | null
          created_at?: string | null
          data_fim?: string | null
          data_inicio: string
          descricao?: string | null
          id?: string
          tipo?: string | null
          titulo: string
          user_id?: string | null
        }
        Update: {
          caso_id?: string | null
          created_at?: string | null
          data_fim?: string | null
          data_inicio?: string
          descricao?: string | null
          id?: string
          tipo?: string | null
          titulo?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "eventos_caso_id_fkey"
            columns: ["caso_id"]
            isOneToOne: false
            referencedRelation: "casos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eventos_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      insolvencias: {
        Row: {
          created_at: string | null
          data_abertura: string
          devedor: string
          id: string
          juridico_id: string
          numero_processo: string
          tipo: string
          tribunal: string
        }
        Insert: {
          created_at?: string | null
          data_abertura: string
          devedor: string
          id?: string
          juridico_id: string
          numero_processo: string
          tipo: string
          tribunal: string
        }
        Update: {
          created_at?: string | null
          data_abertura?: string
          devedor?: string
          id?: string
          juridico_id?: string
          numero_processo?: string
          tipo?: string
          tribunal?: string
        }
        Relationships: []
      }
      mensagens: {
        Row: {
          arquivo_url: string | null
          caso_id: string | null
          conteudo: string
          created_at: string | null
          destinatario_id: string | null
          id: string
          lida: boolean | null
          remetente_id: string | null
        }
        Insert: {
          arquivo_url?: string | null
          caso_id?: string | null
          conteudo: string
          created_at?: string | null
          destinatario_id?: string | null
          id?: string
          lida?: boolean | null
          remetente_id?: string | null
        }
        Update: {
          arquivo_url?: string | null
          caso_id?: string | null
          conteudo?: string
          created_at?: string | null
          destinatario_id?: string | null
          id?: string
          lida?: boolean | null
          remetente_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mensagens_caso_id_fkey"
            columns: ["caso_id"]
            isOneToOne: false
            referencedRelation: "casos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mensagens_destinatario_id_fkey"
            columns: ["destinatario_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mensagens_remetente_id_fkey"
            columns: ["remetente_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      negocios_curso: {
        Row: {
          descricao: string
          documento: string | null
          estado: string | null
          id: string
          insolvencia_id: string | null
        }
        Insert: {
          descricao: string
          documento?: string | null
          estado?: string | null
          id?: string
          insolvencia_id?: string | null
        }
        Update: {
          descricao?: string
          documento?: string | null
          estado?: string | null
          id?: string
          insolvencia_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "negocios_curso_insolvencia_id_fkey"
            columns: ["insolvencia_id"]
            isOneToOne: false
            referencedRelation: "insolvencias"
            referencedColumns: ["id"]
          },
        ]
      }
      notes: {
        Row: {
          id: number
          title: string
        }
        Insert: {
          id?: never
          title: string
        }
        Update: {
          id?: never
          title?: string
        }
        Relationships: []
      }
      notificacoes: {
        Row: {
          created_at: string | null
          id: string
          lida: boolean | null
          mensagem: string
          tipo: string | null
          titulo: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          lida?: boolean | null
          mensagem: string
          tipo?: string | null
          titulo: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          lida?: boolean | null
          mensagem?: string
          tipo?: string | null
          titulo?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notificacoes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      permissoes: {
        Row: {
          criado_em: string | null
          id: string
          tipo: string
          user_id: string | null
        }
        Insert: {
          criado_em?: string | null
          id?: string
          tipo: string
          user_id?: string | null
        }
        Update: {
          criado_em?: string | null
          id?: string
          tipo?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_permissoes_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      planos: {
        Row: {
          criado_em: string | null
          descricao: string | null
          id: string
          nome: string
          preco: number
        }
        Insert: {
          criado_em?: string | null
          descricao?: string | null
          id?: string
          nome: string
          preco: number
        }
        Update: {
          criado_em?: string | null
          descricao?: string | null
          id?: string
          nome?: string
          preco?: number
        }
        Relationships: []
      }
      system_logs: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          severity: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          severity?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          severity?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      tarefas: {
        Row: {
          atribuido_a: string | null
          caso_id: string | null
          created_at: string | null
          criado_por: string | null
          descricao: string | null
          id: string
          prazo: string | null
          status: Database["public"]["Enums"]["status_tarefa"] | null
          titulo: string
          updated_at: string | null
        }
        Insert: {
          atribuido_a?: string | null
          caso_id?: string | null
          created_at?: string | null
          criado_por?: string | null
          descricao?: string | null
          id?: string
          prazo?: string | null
          status?: Database["public"]["Enums"]["status_tarefa"] | null
          titulo: string
          updated_at?: string | null
        }
        Update: {
          atribuido_a?: string | null
          caso_id?: string | null
          created_at?: string | null
          criado_por?: string | null
          descricao?: string | null
          id?: string
          prazo?: string | null
          status?: Database["public"]["Enums"]["status_tarefa"] | null
          titulo?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tarefas_atribuido_a_fkey"
            columns: ["atribuido_a"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tarefas_caso_id_fkey"
            columns: ["caso_id"]
            isOneToOne: false
            referencedRelation: "casos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tarefas_criado_por_fkey"
            columns: ["criado_por"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      transacoes: {
        Row: {
          caso_id: string | null
          cliente_id: string | null
          created_at: string | null
          data_transacao: string | null
          descricao: string | null
          id: string
          metodo_pagamento: string | null
          observacoes: string | null
          referencia: string | null
          tipo: string
          valor: number
        }
        Insert: {
          caso_id?: string | null
          cliente_id?: string | null
          created_at?: string | null
          data_transacao?: string | null
          descricao?: string | null
          id?: string
          metodo_pagamento?: string | null
          observacoes?: string | null
          referencia?: string | null
          tipo: string
          valor: number
        }
        Update: {
          caso_id?: string | null
          cliente_id?: string | null
          created_at?: string | null
          data_transacao?: string | null
          descricao?: string | null
          id?: string
          metodo_pagamento?: string | null
          observacoes?: string | null
          referencia?: string | null
          tipo?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "transacoes_caso_id_fkey"
            columns: ["caso_id"]
            isOneToOne: false
            referencedRelation: "casos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transacoes_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_integrations: {
        Row: {
          created_at: string | null
          credentials: Json | null
          id: string
          integration_type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          credentials?: Json | null
          id?: string
          integration_type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          credentials?: Json | null
          id?: string
          integration_type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          apagado_em: string | null
          aprovado: boolean | null
          criado_em: string | null
          email: string
          foto_perfil: string | null
          id: string
          nome: string
          password: string
          plano: Database["public"]["Enums"]["plano_tipo"] | null
          telefone: string | null
          tipo: string
        }
        Insert: {
          apagado_em?: string | null
          aprovado?: boolean | null
          criado_em?: string | null
          email: string
          foto_perfil?: string | null
          id?: string
          nome: string
          password: string
          plano?: Database["public"]["Enums"]["plano_tipo"] | null
          telefone?: string | null
          tipo: string
        }
        Update: {
          apagado_em?: string | null
          aprovado?: boolean | null
          criado_em?: string | null
          email?: string
          foto_perfil?: string | null
          id?: string
          nome?: string
          password?: string
          plano?: Database["public"]["Enums"]["plano_tipo"] | null
          telefone?: string | null
          tipo?: string
        }
        Relationships: []
      }
      users_extended: {
        Row: {
          criado_por: string | null
          dados_faturacao: Json | null
          data_criacao: string | null
          email: string
          id: string
          metodo_pagamento: string | null
          morada: string | null
          nif: string | null
          nome: string | null
          numero_profissional: string | null
          role: string
          status: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          telefone: string | null
        }
        Insert: {
          criado_por?: string | null
          dados_faturacao?: Json | null
          data_criacao?: string | null
          email: string
          id: string
          metodo_pagamento?: string | null
          morada?: string | null
          nif?: string | null
          nome?: string | null
          numero_profissional?: string | null
          role: string
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          telefone?: string | null
        }
        Update: {
          criado_por?: string | null
          dados_faturacao?: Json | null
          data_criacao?: string | null
          email?: string
          id?: string
          metodo_pagamento?: string | null
          morada?: string | null
          nif?: string | null
          nome?: string | null
          numero_profissional?: string | null
          role?: string
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          telefone?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_escritorio_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      pode_gerir_insolvencia: {
        Args: { _user_id: string; _insolvencia_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "admin"
        | "jurista"
        | "assistente"
        | "cliente"
        | "advogado_senior"
      estado_bem_insolvencia:
        | "livre"
        | "penhorado"
        | "alienado"
        | "indisponível"
        | "vendido"
      integration_status: "ativo" | "inativo" | "erro" | "pendente"
      integration_type:
        | "oauth"
        | "manual"
        | "citius"
        | "sitaf"
        | "stripe"
        | "gmail"
        | "drive"
        | "outlook"
        | "whatsapp"
        | "zoom"
        | "teams"
      payment_method:
        | "stripe"
        | "transferencia"
        | "cartao"
        | "paypal"
        | "revolut"
        | "mbway"
      plano_tipo: "gratis" | "basico" | "profissional" | "escritorio"
      status_caso: "activo" | "pendente" | "arquivado" | "concluido"
      status_checklist_insolvencia:
        | "pendente"
        | "em_progresso"
        | "concluido"
        | "atrasado"
      status_tarefa: "pendente" | "em_progresso" | "concluida" | "atrasada"
      tipo_documento: "peticao" | "contrato" | "processo" | "recibo" | "outro"
      transaction_type: "receita" | "despesa" | "honorario" | "reembolso"
      user_role: "cliente" | "advogado" | "assistente" | "admin"
      user_status: "pending" | "approved" | "suspended" | "cancelled"
      user_type:
        | "cliente"
        | "assistente"
        | "advogado"
        | "advogado_senior"
        | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "admin",
        "jurista",
        "assistente",
        "cliente",
        "advogado_senior",
      ],
      estado_bem_insolvencia: [
        "livre",
        "penhorado",
        "alienado",
        "indisponível",
        "vendido",
      ],
      integration_status: ["ativo", "inativo", "erro", "pendente"],
      integration_type: [
        "oauth",
        "manual",
        "citius",
        "sitaf",
        "stripe",
        "gmail",
        "drive",
        "outlook",
        "whatsapp",
        "zoom",
        "teams",
      ],
      payment_method: [
        "stripe",
        "transferencia",
        "cartao",
        "paypal",
        "revolut",
        "mbway",
      ],
      plano_tipo: ["gratis", "basico", "profissional", "escritorio"],
      status_caso: ["activo", "pendente", "arquivado", "concluido"],
      status_checklist_insolvencia: [
        "pendente",
        "em_progresso",
        "concluido",
        "atrasado",
      ],
      status_tarefa: ["pendente", "em_progresso", "concluida", "atrasada"],
      tipo_documento: ["peticao", "contrato", "processo", "recibo", "outro"],
      transaction_type: ["receita", "despesa", "honorario", "reembolso"],
      user_role: ["cliente", "advogado", "assistente", "admin"],
      user_status: ["pending", "approved", "suspended", "cancelled"],
      user_type: [
        "cliente",
        "assistente",
        "advogado",
        "advogado_senior",
        "admin",
      ],
    },
  },
} as const
