import PostList from '../_components/PostList';
import WriteButton from '../_components/WriteButton';

import { SupabaseServerApi } from '@/api/supabase.server.api';

interface Props {
  params: { id: string };
}

async function BoardPage({ params: { id: boardId } }: Props) {
  const postList = await SupabaseServerApi.getPostListByBoardId(
    +boardId
  );
  const user = await SupabaseServerApi.getUser();

  return (
    <section>
      <div className='text-[22px] font-semibold'>게시판제목</div>
      <PostList boardId={+boardId} postList={postList} />
      {user ? <WriteButton id={boardId} /> : null}
    </section>
  );
}

export default BoardPage;
