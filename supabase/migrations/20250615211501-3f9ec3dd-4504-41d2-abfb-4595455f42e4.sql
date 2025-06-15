
-- Corrige a função pode_gerir_insolvencia para definir o search_path
create or replace function public.pode_gerir_insolvencia(_user_id uuid, _insolvencia_id uuid)
returns boolean
language sql
stable
security definer
set search_path to public
as $$
  select exists (
    select 1
    from public.insolvencias i 
    where i.id = _insolvencia_id and i.juridico_id = _user_id
  ) or public.has_role(_user_id, 'admin');
$$;
