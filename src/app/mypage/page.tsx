import { SupabaseServerApi } from '@/api/supabase.server.api';
import PostList from './_components/PostList';
import MyPageBottomUIs from './_components/MyPageBottomUIs';

async function page() {
  const user = await SupabaseServerApi.getUser();

  const postList = await SupabaseServerApi.getPostListByUserId(
    user?.id!
  );

  return (
    <section className='w-[860px] pr-[10px]'>
      <PostList postList={postList} userId={user?.id!} />
      <MyPageBottomUIs userId={user?.id!} />
      <div className='mb-[16px]'></div>
    </section>
  );
}

export default page;
