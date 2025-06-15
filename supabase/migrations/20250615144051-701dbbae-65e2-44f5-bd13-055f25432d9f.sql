
-- Tabela para controlar subscrições de add-ons jurídicos (ex: Insolvências)
create table if not exists public.addons_assinaturas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  addon text not null, -- Ex: 'insolvencia', 'calendario', etc.
  plano text not null, -- Nome do plano associado ('profissional', 'enterprise', etc.)
  ativo boolean not null default true,
  data_ativacao timestamptz default now(),
  data_finalizacao timestamptz
);

-- Ativar RLS
alter table public.addons_assinaturas enable row level security;

-- O utilizador pode ver as suas próprias subscrições
create policy "O utilizador pode ver os seus add-ons"
  on public.addons_assinaturas
  for select
  using (auth.uid() = user_id);

-- O utilizador pode ativar o próprio add-on apenas se for para si próprio
create policy "O utilizador pode ativar o próprio add-on"
  on public.addons_assinaturas
  for insert
  with check (auth.uid() = user_id);

-- O utilizador pode terminar o próprio add-on
create policy "O utilizador pode terminar o próprio add-on"
  on public.addons_assinaturas
  for update
  using (auth.uid() = user_id);

-- O utilizador pode remover o próprio add-on
create policy "O utilizador pode remover o próprio add-on"
  on public.addons_assinaturas
  for delete
  using (auth.uid() = user_id);

