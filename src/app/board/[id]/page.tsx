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
      <div className='text-[22px] font-semibold'>게시판제목</div>
      <PostList postList={postList} />
      {user ? <WriteButton id={id} /> : null}
    </section>
  );
}

export default BoardPage;
