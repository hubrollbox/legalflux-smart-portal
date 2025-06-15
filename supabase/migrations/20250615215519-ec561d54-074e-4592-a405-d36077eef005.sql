
-- Corrige a função update_updated_at_column para definir o search_path
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
security definer
set search_path to public
as $function$
begin
    NEW.updated_at = NOW();
    return NEW;
end;
$function$;
