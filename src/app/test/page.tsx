import { SupabaseApi } from '@/api/supabase.api';

async function page() {
  const res = await SupabaseApi.getUser();

  console.log('res ↓');
  console.dir(res);

  return <section>TEST</section>;
}

export default page;
