
-- 1. RLS policy correction for user_roles

-- Remove any redundant/contradictory old policies if they exist
drop policy if exists "User can read own roles" on public.user_roles;
drop policy if exists "User can insert own roles" on public.user_roles;
drop policy if exists "User can update own roles" on public.user_roles;
drop policy if exists "User can delete own roles" on public.user_roles;
drop policy if exists "Admins or Juristas podem atribuir cliente/assistente; outros só o próprio" on public.user_roles;

-- Only the user themselves can read their roles, or admins can view all
create policy "User can read own roles"
  on public.user_roles
  for select
  using (
    auth.uid() = user_id
    or public.has_role(auth.uid(), 'admin')
  );

-- Only the user themselves can insert roles for themselves, unless admin/jurista assigns cliente/assistente
create policy "Admins or Juristas podem atribuir cliente/assistente; outros só o próprio"
  on public.user_roles
  for insert
  with check (
    (
      (role = 'cliente' or role = 'assistente')
      and (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'jurista'))
    )
    or (
      (role <> 'cliente' and role <> 'assistente')
      and (auth.uid() = user_id)
    )
  );

-- Only the user themselves or admin can update/delete their own roles
create policy "User can update own roles"
  on public.user_roles
  for update
  using (
    auth.uid() = user_id
    or public.has_role(auth.uid(), 'admin')
  );

create policy "User can delete own roles"
  on public.user_roles
  for delete
  using (
    auth.uid() = user_id
    or public.has_role(auth.uid(), 'admin')
  );

-- 2. RLS for API keys/secrets in user_integrations table
drop policy if exists "Enable read for all" on public.user_integrations;
drop policy if exists "Enable insert for all" on public.user_integrations;
drop policy if exists "Enable update for all" on public.user_integrations;
drop policy if exists "Enable delete for all" on public.user_integrations;

-- Only the integration's owner or admin can access the integration row
create policy "User/Admin can select their own integrations"
  on public.user_integrations
  for select
  using (auth.uid() = user_id or public.has_role(auth.uid(), 'admin'));

create policy "User/Admin can manage own integrations"
  on public.user_integrations
  for insert
  with check (auth.uid() = user_id or public.has_role(auth.uid(), 'admin'));

create policy "User/Admin can update own integrations"
  on public.user_integrations
  for update
  using (auth.uid() = user_id or public.has_role(auth.uid(), 'admin'));

create policy "User/Admin can delete own integrations"
  on public.user_integrations
  for delete
  using (auth.uid() = user_id or public.has_role(auth.uid(), 'admin'));

-- 3. No SQL needed for password reset (handled only by Supabase Auth API/token)
