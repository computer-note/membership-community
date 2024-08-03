import { CommentType } from '@/types/common';
import EditableCommentItem from './EditableCommentItem';
import { SupabaseServerApi } from '@/api/supabase.server.api';
import CommentItem from './CommentItem';

interface Props {
  commentList: CommentType[];
}

async function CommentList({ commentList }: Props) {
  const user = await SupabaseServerApi.getUser();

  return (
    <div className='flex flex-col items-center gap-5 p-2'>
      {commentList.map(commentItem => {
        const isOwnedByLoginUser =
          user && user.id === commentItem.user_id ? true : false;

        return isOwnedByLoginUser ? (
          <EditableCommentItem
            key={commentItem.id}
            commentItem={commentItem}
          />
        ) : (
          <CommentItem
            key={commentItem.id}
            commentItem={commentItem}
          />
        );
      })}
    </div>
  );
}

export default CommentList;
