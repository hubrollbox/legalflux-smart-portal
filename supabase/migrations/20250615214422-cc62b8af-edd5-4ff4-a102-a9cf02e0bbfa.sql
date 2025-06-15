
-- Corrige a função validar_numero_profissional para definir o search_path
create or replace function public.validar_numero_profissional()
returns trigger
language plpgsql
security definer
set search_path to public
as $function$
begin
  if NEW.role = 'juridico' and (NEW.numero_profissional is null or length(trim(NEW.numero_profissional)) = 0) then
    raise exception 'Campo numero_profissional é obrigatório para utilizadores jurídicos.';
  end if;
  return NEW;
end;
$function$;
