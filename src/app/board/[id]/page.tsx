import PostList from '../_components/PostList';
import WriteButton from '../_components/WriteButton';

import { SupabaseServerApi } from '@/api/supabase.server.api';

interface Props {
  params: { id: string };
}

async function BoardPage({ params: { id } }: Props) {
  const postList = await SupabaseServerApi.getPostList(+id);
  const user = await SupabaseServerApi.getUser();

  return (
    <section>
      <div>BoardPage {id}</div>
      {user ? <WriteButton id={id} /> : null}
      <PostList postList={postList} />
    </section>
  );
}

export default BoardPage;
