'use client';

import { SupabaseBrowserApi } from '@/api/supabase.browser.api';
import { type CommentType } from '@/types/common';
import {
  type FormEvent,
  type KeyboardEvent,
  useRef,
  useState,
} from 'react';

interface Props {
  commentItem: CommentType;
  isOwnedByLoginUser: boolean;
}

function CommentItem({ commentItem, isOwnedByLoginUser }: Props) {
  const {
    content,
    created_at,
    id: comment_id,
    user_id,
    user_nickname,
    user_rank_name,
  } = commentItem;

  const commentTextAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);

  async function handleCommentDelete() {
    await SupabaseBrowserApi.deleteComment(comment_id);
    //Todo. 에러처리 로직추가

    alert('댓글이 삭제되었습니다.');
  }

  function handleEnterEditMode() {
    const commentTextArea = commentTextAreaRef.current!;

    setIsInEditMode(true);
    commentTextArea.readOnly = false;
    commentTextArea.focus();
  }

  async function handleEditKeydown(e: KeyboardEvent) {
    if (e.code === 'Escape') {
      const commentTextArea = commentTextAreaRef.current!;

      commentTextArea.value = content; //원래 있던 내용으로 복구

      commentTextArea.readOnly = true;
      setIsInEditMode(false);
    }

    if (e.code === 'Enter') {
      e.target.form.requestSubmit();

      e.preventDefault();
    }
  }

  async function handleCommentSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const commentTextArea = commentTextAreaRef.current!;

    await SupabaseBrowserApi.modifyComment({
      comment_id,
      content: commentTextArea.value,
    });

    alert('댓글이 수정되었습니다.');

    setIsInEditMode(false);
    commentTextArea.readOnly = true;
  }

  return (
    <div className='flex flex-col items-start w-[80%]'>
      <div>작성일: {created_at.toDateString()}</div>
      <div>작성자: {`${user_nickname} (${user_rank_name})`} </div>
      <div>
        <span>댓글내용:</span>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            className='h-[100px] w-[300px]'
            ref={commentTextAreaRef}
            defaultValue={content}
            onKeyDown={handleEditKeydown}
            readOnly
          />
          {isInEditMode ? <button>수정완료</button> : null}
        </form>
      </div>
      {isOwnedByLoginUser ? (
        <div>
          <button onClick={handleEnterEditMode}>수정</button>
          <button onClick={handleCommentDelete}>삭제</button>
        </div>
      ) : null}
    </div>
  );
}

export default CommentItem;
