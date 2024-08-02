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
      {commentList.map(commentItem => (
        <CommentItem
          key={commentItem.id}
          commentItem={commentItem}
          user={user}
        />
      ))}
    </div>
  );
}

export default CommentList;
