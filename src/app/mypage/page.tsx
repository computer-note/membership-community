import { SupabaseServerApi } from '@/api/supabase.server.api';
import PostList from './_components/PostList';

async function page() {
  const user = await SupabaseServerApi.getUser();

  const postList = await SupabaseServerApi.getPostListByUserId(
    user?.id!
  );

  return (
    <section className='w-[860px] pr-[10px]'>
      <PostList postList={postList} />
    </section>
  );
}

export default page;
