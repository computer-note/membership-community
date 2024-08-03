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
    <div className='flex flex-col items-start w-[80%]'>
      <div>작성일: {created_at.toDateString()}</div>
      <div>작성자: {`${user_nickname} (${user_rank_name})`} </div>
      <div>
        <span>댓글내용:</span>
        <textarea
          className='h-[100px] w-[300px]'
          defaultValue={content}
          readOnly
        />
      </div>
    </div>
  );
}

export default CommentItem;
