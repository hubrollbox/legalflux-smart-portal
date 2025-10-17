-- Tabela principal para Administração de Insolvências
create table if not exists public.insolvencias (
    id uuid primary key default gen_random_uuid(),
    processo_numero text not null,
    entidade_id uuid references public.clientes(id) on delete set null,
    administrador_id uuid references public.usuarios(id) on delete set null,
    tipo text not null, -- ex: "insolvência pessoal", "insolvência empresarial"
    estado text not null, -- ex: "ativo", "encerrado"
    data_abertura date not null,
    data_encerramento date,
    valor_ativo numeric,
    valor_passivo numeric,
    observacoes text,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Índices para performance
create index if not exists idx_insolvencias_entidade on public.insolvencias(entidade_id);
create index if not exists idx_insolvencias_administrador on public.insolvencias(administrador_id);

-- Exemplo de tabela de usuários (ajuste conforme seu schema)
-- create table if not exists public.usuarios (
--     id uuid primary key default gen_random_uuid(),
--     email text unique not null
-- );

-- Políticas RLS (Row Level Security)
alter table public.insolvencias enable row level security;

-- Permitir que administradores vejam tudo, outros só registros próprios
create policy "Insolvencias: Administradores podem acessar tudo" on public.insolvencias
    for select using (
        exists (
            select 1 from public.usuarios_roles ur
            where ur.usuario_id = auth.uid() and ur.role = 'admin'
        )
        or administrador_id = auth.uid()
    );

create policy "Insolvencias: Administradores podem inserir" on public.insolvencias
    for insert with check (
        exists (
            select 1 from public.usuarios_roles ur
            where ur.usuario_id = auth.uid() and ur.role = 'admin'
        )
    );

create policy "Insolvencias: Administradores ou responsáveis podem atualizar" on public.insolvencias
    for update using (
        exists (
            select 1 from public.usuarios_roles ur
            where ur.usuario_id = auth.uid() and ur.role = 'admin'
        )
        or administrador_id = auth.uid()
    );

create policy "Insolvencias: Administradores podem deletar" on public.insolvencias
    for delete using (
        exists (
            select 1 from public.usuarios_roles ur
            where ur.usuario_id = auth.uid() and ur.role = 'admin'
        )
    );

-- Ajuste os nomes das tabelas de usuários/roles conforme seu schema real.
-- Adicione triggers para updated_at se necessário.
