'use client';

import { SupabaseBrowserApi } from '@/api/supabase.browser.api';
import { type CommentType, type UserInfoType } from '@/types/common';
import { type FormEvent, type KeyboardEvent, useRef } from 'react';

interface Props {
  commentItem: CommentType;
  user: UserInfoType | null;
}

function CommentItem({ commentItem, user }: Props) {
  const {
    content,
    created_at,
    id: comment_id,
    user_id,
    user_nickname,
    user_rank_name,
  } = commentItem;

  const commentInputRef = useRef<HTMLInputElement | null>(null);

  async function handleDeleteComment() {
    await SupabaseBrowserApi.deleteComment(comment_id);
    //Todo. 에러처리 로직추가

    alert('댓글이 삭제되었습니다.');
  }

  function handleClickModify() {
    const commentInput = commentInputRef.current!;

    commentInput.readOnly = false;
    commentInput.focus();
  }

  async function handleKeydown(e: KeyboardEvent) {
    if (e.code === 'Escape') {
      const commentInput = commentInputRef.current!;

      commentInput.innerText = content; //원래 있던 내용으로 복구
      commentInput.readOnly = true;
    }
  }

  async function handleModifySubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const commentInput = commentInputRef.current!;

    await SupabaseBrowserApi.modifyComment({
      comment_id,
      content: commentInput.value,
    });

    alert('댓글이 수정되었습니다.');
    commentInput.readOnly = true;
  }

  return (
    <div className='flex flex-col items-start w-[80%]'>
      <div>작성일: {created_at.toDateString()}</div>
      <div>작성자: {`${user_nickname} (${user_rank_name})`} </div>
      <div>
        댓글내용:
        <form onSubmit={handleModifySubmit}>
          <input
            ref={commentInputRef}
            defaultValue={content}
            onKeyDown={handleKeydown}
            readOnly
          />
          <button>수정완료</button>
        </form>
      </div>

      {user?.id === user_id ? (
        <div>
          <button onClick={handleClickModify}>수정</button>
          <button onClick={handleDeleteComment}>삭제</button>
        </div>
      ) : null}
    </div>
  );
}

export default CommentItem;
