import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const fetchContracts = async ({ pageParam = 0 }) => {
  const { data, error } = await supabase
    .from('contracts')
    .select('*')
    .range(pageParam * 10, pageParam * 10 + 9);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
