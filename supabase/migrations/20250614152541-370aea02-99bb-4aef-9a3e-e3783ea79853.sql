
-- Corrige a policy de INSERT na user_roles: apenas permite que admin ou jurista insiram "cliente"/"assistente", todos os outros inserts continuam apenas para o próprio utilizador nos outros casos.

drop policy if exists "Admins or Juristas podem atribuir cliente/assistente; outros só o próprio" on public.user_roles;
create policy "Admins or Juristas podem atribuir cliente/assistente; outros só o próprio" 
  on public.user_roles
  for insert
  with check (
    -- Se for cliente ou assistente, só admin ou jurista podem criar
    (
      (role = 'cliente' or role = 'assistente')
      and (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'jurista'))
    )
    -- Nos outros casos, só o próprio pode criar o seu papel
    or (
      (role <> 'cliente' and role <> 'assistente')
      and (auth.uid() = user_id)
    )
  );
