
-- Corrige a função validate_numero_profissional para definir o search_path
create or replace function public.validate_numero_profissional()
returns trigger
language plpgsql
security definer
set search_path to public
as $function$
BEGIN
  IF NEW.role = 'advogado' AND (NEW.numero_profissional IS NULL OR LENGTH(TRIM(NEW.numero_profissional)) = 0) THEN
    RAISE EXCEPTION 'Número profissional é obrigatório para advogados.';
  END IF;
  RETURN NEW;
END;
$function$;
