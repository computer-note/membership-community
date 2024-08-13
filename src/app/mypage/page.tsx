import { SupabaseServerApi } from '@/api/supabase.server.api';
import PostList from './_components/PostList';
import PostButtons from './_components/PostButtons';

async function page() {
  const user = await SupabaseServerApi.getUser();

  const postList = await SupabaseServerApi.getPostListByUserId(
    user?.id!
  );

  return (
    <section className='w-[860px] pr-[10px]'>
      <PostList postList={postList} userId={user?.id!} />
      <PostButtons />
      <div className='mb-[16px]'></div>
    </section>
  );
}

export default page;
