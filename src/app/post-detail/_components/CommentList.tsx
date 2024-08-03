import { CommentType } from '@/types/common';
import CommentItem from './CommentItem';
import { SupabaseServerApi } from '@/api/supabase.server.api';

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

        return (
          <CommentItem
            key={commentItem.id}
            commentItem={commentItem}
            isOwnedByLoginUser={isOwnedByLoginUser}
          />
        );
      })}
    </div>
  );
}

export default CommentList;
