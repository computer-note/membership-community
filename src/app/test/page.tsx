import { SupabaseServerApi } from '@/api/supabase.server.api';

async function page() {
  const res = await SupabaseServerApi.getUser();

  console.log('res ↓');
  console.dir(res);

  return <section>TEST</section>;
}

export default page;
