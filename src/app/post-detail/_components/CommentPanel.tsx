import { SupabaseServerApi } from '@/api/supabase.server.api';

import CommentList from './CommentList';
import CommentWrite from './CommentWrite';

interface Props {
  postId: string;
}

async function CommentPanel({ postId }: Props) {
  const commentList = await SupabaseServerApi.getCommentList(postId);

  return (
    <section className='mt-[40px]'>
      <CommentList commentList={commentList} postId={postId} />
      <CommentWrite postId={postId} />
    </section>
  );
}

export default CommentPanel;
