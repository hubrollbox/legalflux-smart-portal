-- Tabela de Conflitos de Interesse
create table if not exists public.conflitos (
  id uuid primary key default gen_random_uuid(),
  entity_id uuid not null references users(id),
  case_id uuid not null references casos(id),
  reason text not null,
  resolved boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

-- Row Level Security
alter table public.conflitos enable row level security;

-- Policy: Apenas usuários autenticados podem ver conflitos relacionados a eles
create policy "Conflitos: select próprios ou administrados" on public.conflitos
  for select using (
    auth.role() = 'admin' or entity_id = auth.uid()
  );

-- Policy: Apenas admin ou o próprio usuário pode inserir
create policy "Conflitos: insert" on public.conflitos
  for insert with check (
    auth.role() = 'admin' or entity_id = auth.uid()
  );

-- Policy: Apenas admin pode atualizar ou resolver
create policy "Conflitos: update" on public.conflitos
  for update using (
    auth.role() = 'admin'
  );

-- Policy: Apenas admin pode deletar
create policy "Conflitos: delete" on public.conflitos
  for delete using (
    auth.role() = 'admin'
  );
