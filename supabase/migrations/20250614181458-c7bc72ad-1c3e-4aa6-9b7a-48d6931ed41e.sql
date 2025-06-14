
-- Phase 1: Critical RLS Policy Implementation for insolvency module

-- 1. documentos_insolvencia: Only assigned lawyer (juridico_id) or admin can access
drop policy if exists "Enable read for all" on public.documentos_insolvencia;
drop policy if exists "Enable insert for all" on public.documentos_insolvencia;
drop policy if exists "Enable update for all" on public.documentos_insolvencia;
drop policy if exists "Enable delete for all" on public.documentos_insolvencia;

create policy "Jurista/Admin pode SELECT documentos_insolvencia" 
  on public.documentos_insolvencia
  for select
  using (
    public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
  );

create policy "Jurista/Admin pode INSERT documentos_insolvencia" 
  on public.documentos_insolvencia
  for insert
  with check (
    public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
  );

create policy "Jurista/Admin pode UPDATE documentos_insolvencia" 
  on public.documentos_insolvencia
  for update
  using (
    public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
  );

create policy "Jurista/Admin pode DELETE documentos_insolvencia" 
  on public.documentos_insolvencia
  for delete
  using (
    public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
  );

-- 2. credores: Only assigned lawyer (juridico_id) or admin can access
drop policy if exists "Enable read for all" on public.credores;
drop policy if exists "Enable insert for all" on public.credores;
drop policy if exists "Enable update for all" on public.credores;
drop policy if exists "Enable delete for all" on public.credores;

create policy "Jurista/Admin pode SELECT credores"
  on public.credores
  for select
  using (
    public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
  );

create policy "Jurista/Admin pode INSERT credores"
  on public.credores
  for insert
  with check (
    public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
  );

create policy "Jurista/Admin pode UPDATE credores"
  on public.credores
  for update
  using (
    public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
  );

create policy "Jurista/Admin pode DELETE credores"
  on public.credores
  for delete
  using (
    public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
  );

-- 3. bens_inventario
drop policy if exists "Enable read for all" on public.bens_inventario;
drop policy if exists "Enable insert for all" on public.bens_inventario;
drop policy if exists "Enable update for all" on public.bens_inventario;
drop policy if exists "Enable delete for all" on public.bens_inventario;

create policy "Jurista/Admin pode SELECT bens_inventario"
  on public.bens_inventario
  for select
  using (
    public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
  );

create policy "Jurista/Admin pode INSERT bens_inventario"
  on public.bens_inventario
  for insert
  with check (
    public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
  );

create policy "Jurista/Admin pode UPDATE bens_inventario"
  on public.bens_inventario
  for update
  using (
    public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
  );

create policy "Jurista/Admin pode DELETE bens_inventario"
  on public.bens_inventario
  for delete
  using (
    public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
  );

-- 4. dividas_massa
drop policy if exists "Enable read for all" on public.dividas_massa;
drop policy if exists "Enable insert for all" on public.dividas_massa;
drop policy if exists "Enable update for all" on public.dividas_massa;
drop policy if exists "Enable delete for all" on public.dividas_massa;

create policy "Jurista/Admin pode SELECT dividas_massa"
  on public.dividas_massa
  for select
  using (
    public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
  );

create policy "Jurista/Admin pode INSERT dividas_massa"
  on public.dividas_massa
  for insert
  with check (
    public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
  );

create policy "Jurista/Admin pode UPDATE dividas_massa"
  on public.dividas_massa
  for update
  using (
    public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
  );

create policy "Jurista/Admin pode DELETE dividas_massa"
  on public.dividas_massa
  for delete
  using (
    public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
  );

-- 5. negocios_curso
drop policy if exists "Enable read for all" on public.negocios_curso;
drop policy if exists "Enable insert for all" on public.negocios_curso;
drop policy if exists "Enable update for all" on public.negocios_curso;
drop policy if exists "Enable delete for all" on public.negocios_curso;

create policy "Jurista/Admin pode SELECT negocios_curso"
  on public.negocios_curso
  for select
  using (
    public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
  );

create policy "Jurista/Admin pode INSERT negocios_curso"
  on public.negocios_curso
  for insert
  with check (
    public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
  );

create policy "Jurista/Admin pode UPDATE negocios_curso"
  on public.negocios_curso
  for update
  using (
    public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
  );

create policy "Jurista/Admin pode DELETE negocios_curso"
  on public.negocios_curso
  for delete
  using (
    public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
  );

-- 6. checklist_insolvencia
drop policy if exists "Enable read for all" on public.checklist_insolvencia;
drop policy if exists "Enable insert for all" on public.checklist_insolvencia;
drop policy if exists "Enable update for all" on public.checklist_insolvencia;
drop policy if exists "Enable delete for all" on public.checklist_insolvencia;

create policy "Jurista/Admin pode SELECT checklist_insolvencia"
  on public.checklist_insolvencia
  for select
  using (
    public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
  );

create policy "Jurista/Admin pode INSERT checklist_insolvencia"
  on public.checklist_insolvencia
  for insert
  with check (
    public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
  );

create policy "Jurista/Admin pode UPDATE checklist_insolvencia"
  on public.checklist_insolvencia
  for update
  using (
    public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
  );

create policy "Jurista/Admin pode DELETE checklist_insolvencia"
  on public.checklist_insolvencia
  for delete
  using (
    public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
  );
