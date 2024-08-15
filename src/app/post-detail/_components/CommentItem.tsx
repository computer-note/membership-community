'use client';

import ImageWithFallback from '@/components/ImageWithFallback';

import { useEffect, useRef, useState } from 'react';
import useCommentHandlers from '@/hooks/useCommentHandler';

import { extractHHMM, extractYYYYMMDD } from '@/utils/format';

import { type CommentType } from '@/types/common';
import { type FormEvent, type KeyboardEvent } from 'react';

interface Props {
  commentItem: CommentType;
  isOwnedByLoginUser: boolean;
  postId: string;
}

const COMMENT_EDIT_MODE_HEIGHT = '300px';
const COMMENT_MAX_LENGTH = 300;

function CommentItem({
  commentItem,
  isOwnedByLoginUser,
  postId,
}: Props) {
  const {
    id: comment_id,
    content,
    created_at,
    user_nickname,
    user_rank_name,
    user_profile_img,
  } = commentItem;

  const commentTextAreaRef = useRef<null | HTMLTextAreaElement>(null);
  const [shouldShowEditModeUIs, setShouldShowEditModeUIs] =
    useState<boolean>(false);

  const { handleModifyComment, handleDeleteComment } =
    useCommentHandlers(postId, comment_id);

  const [currentLength, setCurrentLength] = useState(0);

  useEffect(() => {
    const commentTextArea = commentTextAreaRef.current!;

    fitSizeToContent(commentTextArea);
    setCurrentLength(commentTextArea.value.length);
  }, [commentTextAreaRef.current]);

  function handleEnterEditModeButtonClick() {
    const commentTextArea = commentTextAreaRef.current!;

    enterEditMode(commentTextArea);
  }

  function handleExitEditModeButtonClick() {
    const commentTextArea = commentTextAreaRef.current!;

    exitEditMode(commentTextArea);
  }

  async function handleTextAreaKeydown(e: KeyboardEvent) {
    const commentTextArea = commentTextAreaRef.current!;

    setCurrentLength(commentTextArea.value.length);

    if (e.code === 'Escape') {
      commentTextArea.value = content; //원래 내용으로 복구

      exitEditMode(commentTextArea);
    }

    if (e.code === 'Enter') {
      commentTextArea.form?.requestSubmit();

      e.preventDefault();
    }

    if (
      currentLength >= COMMENT_MAX_LENGTH &&
      e.code !== 'Backspace' &&
      e.code !== 'NumpadDecimal'
    ) {
      e.preventDefault();

      return;
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const commentTextArea = commentTextAreaRef.current!;

    handleModifyComment(commentTextArea.value);

    alert('댓글이 수정되었습니다.');

    exitEditMode(commentTextArea);
  }

  async function handleDeleteButtonClick() {
    handleDeleteComment();

    alert('댓글이 삭제되었습니다.');
  }

  function enterEditMode(textarea: HTMLTextAreaElement) {
    setShouldShowEditModeUIs(true);
    textarea.style.height = COMMENT_EDIT_MODE_HEIGHT;
    textarea.readOnly = false;
    textarea.focus();
  }

  function exitEditMode(textarea: HTMLTextAreaElement) {
    setShouldShowEditModeUIs(false);
    fitSizeToContent(textarea);
    textarea.readOnly = true;
  }

  function fitSizeToContent(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
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
                onClick={handleEnterEditModeButtonClick}
                className='hover:underline'
              >
                수정
              </button>
              <button
                onClick={handleDeleteButtonClick}
                className='hover:underline'
              >
                삭제
              </button>
            </div>
          ) : null}
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <textarea
              onKeyDown={handleTextAreaKeydown}
              ref={commentTextAreaRef}
              defaultValue={content}
              readOnly
              className='w-[100%] text-[15px] leading-[22px] break-words overflow-y resize-none max-h-[500px] min-h-[21px]'
            />

            {shouldShowEditModeUIs && (
              <div>
                <span
                  className={`${
                    currentLength >= COMMENT_MAX_LENGTH &&
                    'text-red-400'
                  }`}
                >
                  {currentLength}
                </span>
                {' / '}
                <span>{COMMENT_MAX_LENGTH}</span>
              </div>
            )}

            <div className='flex justify-between text-[12px] '>
              <div className='text-[#979797] '>
                <span className='mr-[8px]'>
                  {extractYYYYMMDD(created_at)}
                </span>
                <span>{extractHHMM(created_at)}</span>
              </div>
              {shouldShowEditModeUIs ? (
                <div>
                  <button
                    onClick={handleExitEditModeButtonClick}
                    className='mr-[8px]'
                  >
                    취소
                  </button>
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
