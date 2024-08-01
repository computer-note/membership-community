import PostList from '../_components/PostList';
import { SupabaseApi } from './../../../api/supabase.api';

interface Props {
  params: { id: string };
}

async function BoardPage({ params: { id } }: Props) {
  const postList = await SupabaseApi.getPostList(+id);
  return (
    <main>
      <div>BoardPage {id}</div>
      <PostList postList={postList} />
    </main>
  );
}

export default BoardPage;
