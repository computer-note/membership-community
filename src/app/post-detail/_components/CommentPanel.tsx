import { SupabaseApi } from '@/api/supabase.api';
import CommentList from './CommentList';
import CommentWrite from './CommentWrite';

interface Props {
  postId: string;
}

async function CommentPanel({ postId }: Props) {
  const commentList = await SupabaseApi.getCommentList(postId);

  return (
    <section>
      <CommentList commentList={commentList} />
      <CommentWrite />
    </section>
  );
}

export default CommentPanel;
