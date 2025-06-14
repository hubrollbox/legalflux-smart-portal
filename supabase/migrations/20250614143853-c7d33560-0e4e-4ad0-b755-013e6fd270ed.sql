
-- Políticas RLS para `user_roles`
drop policy if exists "User can read own roles" on public.user_roles;
create policy "User can read own roles"
  on public.user_roles
  for select using (auth.uid() = user_id);

drop policy if exists "User can insert own roles" on public.user_roles;
create policy "User can insert own roles"
  on public.user_roles
  for insert with check (auth.uid() = user_id);

drop policy if exists "User can update own roles" on public.user_roles;
create policy "User can update own roles"
  on public.user_roles
  for update using (auth.uid() = user_id);

drop policy if exists "User can delete own roles" on public.user_roles;
create policy "User can delete own roles"
  on public.user_roles
  for delete using (auth.uid() = user_id);

-- Políticas para usuarios_planos (caso já exista)
do $$
begin
  if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'usuarios_planos') then
    drop policy if exists "User can read own plan" on public.usuarios_planos;
    create policy "User can read own plan"
      on public.usuarios_planos
      for select using (auth.uid() = user_id);

    drop policy if exists "User can insert own plan" on public.usuarios_planos;
    create policy "User can insert own plan"
      on public.usuarios_planos
      for insert with check (auth.uid() = user_id);

    drop policy if exists "User can update own plan" on public.usuarios_planos;
    create policy "User can update own plan"
      on public.usuarios_planos
      for update using (auth.uid() = user_id);

    drop policy if exists "User can delete own plan" on public.usuarios_planos;
    create policy "User can delete own plan"
      on public.usuarios_planos
      for delete using (auth.uid() = user_id);
  end if;
end $$;
