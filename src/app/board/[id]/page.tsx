import PostList from '../_components/PostList';
import { SupabaseApi } from './../../../api/supabase.api';

interface Props {
  params: { id: string };
}

async function BoardPage({ params: { id } }: Props) {
  const postList = await SupabaseApi.getPostList(+id);
  return (
    <section>
      <div>BoardPage {id}</div>
      <PostList postList={postList} />
    </section>
  );
}

export default BoardPage;
