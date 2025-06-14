
-- 1. Tabela para log de partilha/envio de documentos legais de insolvência
create table if not exists public.logs_partilha_documentos_insolvencia (
  id uuid primary key default gen_random_uuid(),
  documento_id uuid references public.documentos_insolvencia(id) on delete cascade,
  enviado_por uuid,
  enviado_para text,
  metodo text not null default 'email', -- ou outro futuro: 'link'
  data_envio timestamp with time zone default now(),
  sucesso boolean default true,
  detalhe text
);

-- 2. Enum para tipo/plano de subscrição se ainda não existir
do $$
begin
  if not exists (select from pg_type where typname = 'plano_tipo') then
    create type public.plano_tipo as enum ('basic', 'profissional', 'enterprise');
  end if;
end$$;

-- 3. Adicionar coluna/plano nas users (se ainda não existir, já existe mas garantimos enum)
alter table if exists public.users 
  alter column plano type public.plano_tipo using plano::text::public.plano_tipo;

-- 4. Trigger para actualizar campo updated_at (caso se queira logs temporal em tabelas principais)
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
    NEW.updated_at = NOW();
    return NEW;
end;
$$ language plpgsql;

do $$
begin
  if not exists (select 1 from pg_trigger where tgname = 'set_updated_at_on_creditos') then
    create trigger set_updated_at_on_creditos before update on public.creditos
      for each row execute procedure public.update_updated_at_column();
  end if;
  if not exists (select 1 from pg_trigger where tgname = 'set_updated_at_on_credores') then
    create trigger set_updated_at_on_credores before update on public.credores
      for each row execute procedure public.update_updated_at_column();
  end if;
  if not exists (select 1 from pg_trigger where tgname = 'set_updated_at_on_bens_inventario') then
    create trigger set_updated_at_on_bens_inventario before update on public.bens_inventario
      for each row execute procedure public.update_updated_at_column();
  end if;
  if not exists (select 1 from pg_trigger where tgname = 'set_updated_at_on_dividas_massa') then
    create trigger set_updated_at_on_dividas_massa before update on public.dividas_massa
      for each row execute procedure public.update_updated_at_column();
  end if;
  if not exists (select 1 from pg_trigger where tgname = 'set_updated_at_on_negocios_curso') then
    create trigger set_updated_at_on_negocios_curso before update on public.negocios_curso
      for each row execute procedure public.update_updated_at_column();
  end if;
end$$;

-- 5. Garantir colunas created_at e updated_at padrões em todas as tabelas administrativas
alter table if exists public.creditos 
  add column if not exists created_at timestamp with time zone default now(),
  add column if not exists updated_at timestamp with time zone default now();

alter table if exists public.credores 
  add column if not exists created_at timestamp with time zone default now(),
  add column if not exists updated_at timestamp with time zone default now();

alter table if exists public.bens_inventario 
  add column if not exists created_at timestamp with time zone default now(),
  add column if not exists updated_at timestamp with time zone default now();

alter table if exists public.dividas_massa 
  add column if not exists created_at timestamp with time zone default now(),
  add column if not exists updated_at timestamp with time zone default now();

alter table if exists public.negocios_curso 
  add column if not exists created_at timestamp with time zone default now(),
  add column if not exists updated_at timestamp with time zone default now();

-- 6. (Opcional - facilitar auditoria futura) Tabela de logs gerais de operações CRUD em insolvência
create table if not exists public.logs_operacoes_insolvencia (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  insolvencia_id uuid,
  tabela text, -- exemplo: 'creditos', 'credores'
  operacao text, -- 'create', 'update', 'delete'
  registro_id uuid,
  data timestamp with time zone default now(),
  detalhes text
);

