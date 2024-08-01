import PostList from '../_components/PostList';
import { SupabaseServerApi } from '@/api/supabase.server.api';

interface Props {
  params: { id: string };
}

async function BoardPage({ params: { id } }: Props) {
  const postList = await SupabaseServerApi.getPostList(+id);
  return (
    <section>
      <div>BoardPage {id}</div>
      <PostList postList={postList} />
    </section>
  );
}

export default BoardPage;
