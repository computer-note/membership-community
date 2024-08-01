import { CommentType } from '@/types/common';

interface Props {
  commentItem: CommentType;
}

function CommentItem({ commentItem }: Props) {
  const {
    content,
    created_at,
    id,
    user_id,
    user_nickname,
    user_rank_name,
  } = commentItem;

  return (
    <div className='flex flex-col items-start'>
      <span>작성일: {created_at.toDateString()}</span>
      <span>작성자: {`${user_nickname} (${user_rank_name})`} </span>
      <span>댓글내용: {content}</span>

      <button>수정삭제</button>
    </div>
  );
}

export default CommentItem;
