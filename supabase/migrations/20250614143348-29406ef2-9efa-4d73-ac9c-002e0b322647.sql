
-- Criação da enum se ainda não existir
do $$ begin
if not exists (select 1 from pg_type where typname = 'app_role') then
  create type public.app_role as enum ('admin', 'jurista', 'assistente', 'cliente', 'advogado_senior');
end if;
end $$;

-- Criação da tabela user_roles
create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  role public.app_role not null,
  unique (user_id, role)
);

-- Ativar RLS (sem políticas ainda)
alter table public.user_roles enable row level security;
