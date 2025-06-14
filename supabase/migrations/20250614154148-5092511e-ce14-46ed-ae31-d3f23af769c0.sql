
-- 1. Enum para status dos checklist e estado de bens
do $$
begin
  if not exists (select from pg_type where typname = 'estado_bem_insolvencia') then
    create type public.estado_bem_insolvencia as enum ('livre', 'penhorado', 'alienado', 'indisponível', 'vendido');
  end if;
  if not exists (select from pg_type where typname = 'status_checklist_insolvencia') then
    create type public.status_checklist_insolvencia as enum ('pendente', 'em_progresso', 'concluido', 'atrasado');
  end if;
end$$;

-- 2. Tabela de processos de insolvência
create table public.insolvencias (
  id uuid primary key default gen_random_uuid(),
  numero_processo text not null,
  tribunal text not null,
  tipo text not null,
  devedor text not null,
  data_abertura date not null,
  juridico_id uuid not null,
  created_at timestamp with time zone default now()
);

-- 3. Tabela de credores
create table public.credores (
  id uuid primary key default gen_random_uuid(),
  insolvencia_id uuid references public.insolvencias(id) on delete cascade,
  nome text not null,
  nif text,
  email text
);

-- 4. Tabela de créditos
create table public.creditos (
  id uuid primary key default gen_random_uuid(),
  credor_id uuid references public.credores(id) on delete cascade,
  tipo_credito text not null,
  valor numeric not null,
  data date,
  documentos jsonb
);

-- 5. Tabela de bens do inventário
create table public.bens_inventario (
  id uuid primary key default gen_random_uuid(),
  insolvencia_id uuid references public.insolvencias(id) on delete cascade,
  descricao text not null,
  valor_estimado numeric,
  estado public.estado_bem_insolvencia default 'livre'
);

-- 6. Tabela de dívidas da massa
create table public.dividas_massa (
  id uuid primary key default gen_random_uuid(),
  insolvencia_id uuid references public.insolvencias(id) on delete cascade,
  descricao text not null,
  categoria text,
  valor numeric
);

-- 7. Negócios em curso
create table public.negocios_curso (
  id uuid primary key default gen_random_uuid(),
  insolvencia_id uuid references public.insolvencias(id) on delete cascade,
  descricao text not null,
  estado text,
  documento text -- url presumido: ligação ao ficheiro, pode ser expandido depois
);

-- 8. Documentos legais da insolvência
create table public.documentos_insolvencia (
  id uuid primary key default gen_random_uuid(),
  insolvencia_id uuid references public.insolvencias(id) on delete cascade,
  tipo_documento text not null,
  conteudo text,
  data timestamp with time zone default now()
);

-- 9. Checklist legal por fase
create table public.checklist_insolvencia (
  id uuid primary key default gen_random_uuid(),
  insolvencia_id uuid references public.insolvencias(id) on delete cascade,
  etapa text not null,
  status public.status_checklist_insolvencia default 'pendente',
  prazo date
);

-- 10. Row Level Security
alter table public.insolvencias enable row level security;
alter table public.credores enable row level security;
alter table public.creditos enable row level security;
alter table public.bens_inventario enable row level security;
alter table public.dividas_massa enable row level security;
alter table public.negocios_curso enable row level security;
alter table public.documentos_insolvencia enable row level security;
alter table public.checklist_insolvencia enable row level security;

-- Função utilitária para checar se user é admin/juridico do processo
create or replace function public.pode_gerir_insolvencia(_user_id uuid, _insolvencia_id uuid)
returns boolean
language sql
stable
security definer
as $$
  select exists (
    select 1
    from public.insolvencias i 
    where i.id = _insolvencia_id and i.juridico_id = _user_id
  ) or public.has_role(_user_id, 'admin');
$$;

-- Policies para insolvencias
create policy "Ver insolvencias do próprio juridico/admin" on public.insolvencias
for select using (
  juridico_id = auth.uid()
  or public.has_role(auth.uid(), 'admin')
);

create policy "Gerir só se for juridico/responsável ou admin" on public.insolvencias
for update using (
  juridico_id = auth.uid()
  or public.has_role(auth.uid(), 'admin')
);

create policy "Criar só se for juridico/admin" on public.insolvencias
for insert with check (
  public.has_role(auth.uid(), 'jurista')
  or public.has_role(auth.uid(), 'admin')
);

-- Demais tabelas: só quem pode gerir insolvencia pode ver/inserir/editar, mais protegendo dados ligados
create policy "Ver apenas envolvidos" on public.credores
for select using (
  public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
);

create policy "Gerir apenas envolvidos" on public.credores
for all using (
  public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
);

create policy "Ver apenas envolvidos" on public.creditos
for select using (
  public.pode_gerir_insolvencia(auth.uid(), (select insolvencia_id from public.credores c where c.id = credor_id))
);
create policy "Gerir apenas envolvidos" on public.creditos
for all using (
  public.pode_gerir_insolvencia(auth.uid(), (select insolvencia_id from public.credores c where c.id = credor_id))
);

create policy "Ver apenas envolvidos" on public.bens_inventario
for select using (
  public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
);
create policy "Gerir apenas envolvidos" on public.bens_inventario
for all using (
  public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
);

create policy "Ver apenas envolvidos" on public.dividas_massa
for select using (
  public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
);
create policy "Gerir apenas envolvidos" on public.dividas_massa
for all using (
  public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
);

create policy "Ver apenas envolvidos" on public.negocios_curso
for select using (
  public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
);
create policy "Gerir apenas envolvidos" on public.negocios_curso
for all using (
  public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
);

create policy "Ver apenas envolvidos" on public.documentos_insolvencia
for select using (
  public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
);
create policy "Gerir apenas envolvidos" on public.documentos_insolvencia
for all using (
  public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
);

create policy "Ver apenas envolvidos" on public.checklist_insolvencia
for select using (
  public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
);
create policy "Gerir apenas envolvidos" on public.checklist_insolvencia
for all using (
  public.pode_gerir_insolvencia(auth.uid(), insolvencia_id)
);

