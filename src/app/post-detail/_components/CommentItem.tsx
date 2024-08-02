'use client';

import { CommentType, UserInfoType } from '@/types/common';
import { useAuthContext } from './../../../providers/AuthContextProvider';
import { SupabaseBrowserApi } from '@/api/supabase.browser.api';
import { useRef } from 'react';

interface Props {
  commentItem: CommentType;
}

function CommentItem({ commentItem }: Props) {
  const {
    content,
    created_at,
    id: comment_id,
    user_id,
    user_nickname,
    user_rank_name,
  } = commentItem;

  const user = useAuthContext();
  const commentInputRef = useRef<HTMLSpanElement | null>(null);

  async function handleDeleteComment() {
    //Todo. 에러처리 로직추가
    await SupabaseBrowserApi.deleteComment(comment_id);

    alert('댓글이 삭제되었습니다.');
  }

  function handleClickModify() {
    const commentInput = commentInputRef.current!;

    if (!commentInput.isContentEditable) {
      commentInput.contentEditable = 'true';
      commentInput.focus();
      commentInput.addEventListener('keydown', handleModifyInput);
    }
  }

  async function handleModifyInput(e: globalThis.KeyboardEvent) {
    if (e.code === 'Enter') {
      const commentInput = commentInputRef.current!;

      await SupabaseBrowserApi.modifyComment({
        comment_id,
        content: commentInput.innerText,
      });

      commentInput.contentEditable = 'false';
      commentInput.removeEventListener('keydown', handleModifyInput);

      alert('댓글이 수정되었습니다.');
    }

    if (e.code === 'Escape') {
      const commentInput = commentInputRef.current!;
      commentInput.innerText = content;

      commentInput.contentEditable = 'false';
      commentInput.removeEventListener('keydown', handleModifyInput);
    }
  }

  return (
    <div className='flex flex-col items-start w-[80%]'>
      <div>작성일: {created_at.toDateString()}</div>
      <div>작성자: {`${user_nickname} (${user_rank_name})`} </div>
      <div>
        댓글내용: <span ref={commentInputRef}>{content}</span>
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
