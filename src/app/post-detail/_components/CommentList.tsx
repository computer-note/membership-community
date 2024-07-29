import { CommentType } from '@/types/common';
import CommentItem from './CommentItem';

interface Props {
  commentList: CommentType[];
}

function CommentList({ commentList }: Props) {
  return (
    <div className='flex flex-col gap-3'>
      {commentList.map(commentItem => (
        <CommentItem key={commentItem.id} commentItem={commentItem} />
      ))}
    </div>
  );
}

export default CommentList;
