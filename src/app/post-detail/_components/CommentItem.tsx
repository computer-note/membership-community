import { CommentType } from '@/types/common';

interface Props {
  commentItem: CommentType;
}

function CommentItem({ commentItem }: Props) {
  const { content, createdAt, id, postId, userInfo } = commentItem;

  return (
    <div>
      <span>댓글({id}).</span>
      <span>작성일: {createdAt.toDateString()}</span>
      <span>작성자: {userInfo.nickname}</span>
      <span>댓글내용: {content}</span>

      <button>본인작성댓글이면 수정삭제 버튼을 표시합니다.</button>
    </div>
  );
}

export default CommentItem;
