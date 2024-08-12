import { SupabaseServerApi } from '@/api/supabase.server.api';
import PostList from './_components/PostList';

async function page() {
  const user = await SupabaseServerApi.getUser();

  const postList = await SupabaseServerApi.getPostListByUserId(
    user?.id!
  );

  console.log('postList ↓');
  console.dir(postList);

  return (
    <section>
      <PostList postList={postList} />
    </section>
  );
}

export default page;
