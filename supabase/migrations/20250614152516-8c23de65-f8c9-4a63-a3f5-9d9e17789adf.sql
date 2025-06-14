
-- 1. Cria o tipo enum para roles se ainda não existir
do $$ begin
if not exists (select 1 from pg_type where typname = 'app_role') then
  create type public.app_role as enum ('admin', 'jurista', 'assistente', 'cliente', 'advogado_senior');
end if;
end $$;

-- 2. Cria a função de verificação de role, com argumento do tipo correto
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;
