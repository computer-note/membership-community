'use client';

import { SupabaseBrowserApi } from '@/api/supabase.browser.api';
import ImageWithFallback from '@/components/ImageWithFallback';
import { type CommentType } from '@/types/common';
import { extractHHMM, extractYYYYMMDD } from '@/utils/format';
import {
  type FormEvent,
  type KeyboardEvent,
  useEffect,
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
    user_profile_img,
  } = commentItem;

  const commentTextAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);

  useEffect(() => {
    const commentTextArea = commentTextAreaRef.current!;

    commentTextArea.style.height =
      commentTextArea.scrollHeight + 'px';
  }, [commentTextAreaRef.current]);

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
    const commentTextArea = commentTextAreaRef.current!;

    commentTextArea.style.height =
      commentTextArea.scrollHeight + 'px';

    if (e.code === 'Escape') {
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
    <li className='flex py-[14px] pr-[23px] gap-[12px] w-[100%]'>
      <div>
        <ImageWithFallback
          width={36}
          height={36}
          src={user_profile_img}
          alt='프로필 사진'
        />
      </div>
      <div className='w-[100%]'>
        <div className='flex justify-between'>
          <div>
            <span className='text-[14px] font-[600] mr-[6px] '>
              {user_nickname}
            </span>
            <span className='text-[14px]'>{user_rank_name}</span>
          </div>

          {isOwnedByLoginUser ? (
            <div className='flex gap-[6px] text-[13px] '>
              <button
                onClick={handleEnterEditMode}
                className='hover:underline'
              >
                수정
              </button>
              <button
                onClick={handleCommentDelete}
                className='hover:underline'
              >
                삭제
              </button>
            </div>
          ) : null}
        </div>

        <div>
          <form onSubmit={handleCommentSubmit}>
            <textarea
              ref={commentTextAreaRef}
              className='w-[100%] text-[15px] leading-[22px] break-words overflow-y resize-none max-h-[500px] min-h-[19px]'
              defaultValue={content}
              onKeyDown={handleEditKeydown}
            />

            <div className='flex justify-between text-[12px] '>
              <div className='text-[#979797] '>
                <span className='mr-[8px]'>
                  {extractYYYYMMDD(created_at)}
                </span>
                <span>{extractHHMM(created_at)}</span>
              </div>
              {isInEditMode ? (
                <div>
                  <button className='mr-[8px]'>취소</button>
                  <button>등록</button>
                </div>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </li>
  );
}

export default CommentItem;
