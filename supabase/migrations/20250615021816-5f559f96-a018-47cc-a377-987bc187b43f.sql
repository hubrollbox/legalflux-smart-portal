
-- USER_INTEGRATIONS TABLE:
-- Make sure each user can fully manage their own integrations, admins can manage all

-- 1. Allow users to SELECT their own integrations
CREATE POLICY "Users can read their own integrations"
  ON public.user_integrations
  FOR SELECT
  USING (user_id = auth.uid());

-- 2. Allow users to INSERT for their own user_id
CREATE POLICY "Users can create own integrations"
  ON public.user_integrations
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- 3. Allow users to UPDATE their own integrations
CREATE POLICY "Users can update own integrations"
  ON public.user_integrations
  FOR UPDATE
  USING (user_id = auth.uid());

-- 4. Allow users to DELETE their own integrations
CREATE POLICY "Users can delete own integrations"
  ON public.user_integrations
  FOR DELETE
  USING (user_id = auth.uid());

-- 5. Allow admins to manage everything
CREATE POLICY "Admins may manage all integrations"
  ON public.user_integrations
  FOR ALL
  USING (public.has_role(auth.uid(),'admin'))
  WITH CHECK (public.has_role(auth.uid(),'admin'));


-- USERS_EXTENDED TABLE:
-- Each user can access and update their own extended profile, admins manage all

-- 6. Allow users to SELECT their own profile
CREATE POLICY "Users can view their extended profile"
  ON public.users_extended
  FOR SELECT
  USING (id = auth.uid());

-- 7. Allow users to UPDATE their own profile
CREATE POLICY "Users can update their extended profile"
  ON public.users_extended
  FOR UPDATE
  USING (id = auth.uid());

-- 8. Allow users to INSERT (register) only their own user_id
CREATE POLICY "Users can create their profile"
  ON public.users_extended
  FOR INSERT
  WITH CHECK (id = auth.uid());

-- 9. Allow admins to manage all
CREATE POLICY "Admins manage all extended profiles"
  ON public.users_extended
  FOR ALL
  USING (public.has_role(auth.uid(),'admin'))
  WITH CHECK (public.has_role(auth.uid(),'admin'));


-- USER_ROLES TABLE:
-- Allow users to see their own roles, but only admins can assign/edit roles

-- 10. Allow users to SELECT their own roles
CREATE POLICY "Users can read their roles"
  ON public.user_roles
  FOR SELECT
  USING (user_id = auth.uid());

-- 11. Allow only admins to INSERT (assign roles)
CREATE POLICY "Admins assign roles"
  ON public.user_roles
  FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 12. Allow only admins to UPDATE/DELETE roles
CREATE POLICY "Admins can update roles"
  ON public.user_roles
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
  ON public.user_roles
  FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));
