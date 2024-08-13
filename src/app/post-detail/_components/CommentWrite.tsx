'use client';

import { useAuthContext } from '@/providers/AuthContextProvider';
import { CommentCreateFormType } from '@/types/common';
import { type ChangeEvent, useState } from 'react';

import { useCommentCreateMutation } from '@/hooks/useCommentTanstack';

interface Props {
  postId: string;
}

function CommentWrite({ postId }: Props) {
  const [comment, setComment] = useState<string>('');
  const user = useAuthContext();

  const createCommentMutation = useCommentCreateMutation(postId);

  async function handleCommentCreate(e: React.FormEvent) {
    e.preventDefault();

    if (comment.length === 0) {
      alert('댓글을 입력해주세요.');
      return;
    }

    const form = e.target as HTMLFormElement;

    const commentForm: CommentCreateFormType = {
      content: comment,
      post_id: postId,
      user_id: user!.id,
    };

    createCommentMutation.mutate(commentForm);

    alert('댓글등록');

    form.reset();
  }

  function handleOnChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setComment(e.target.value);

    const textArea = e.target as HTMLTextAreaElement;
    textArea.style.height = textArea.scrollHeight + 'px';
  }

  return (
    <section className='flex flex-col border-[2px] border-[#0000001a] rounded-[6px] px-[16px] py-[10px] gap-[10px] '>
      <div>
        <span className='text-[14px] font-[600] mr-[6px] '>
          {user?.nickname}
        </span>
        <span className='text-[14px]'>{user?.rank_name}</span>
      </div>
      <form onSubmit={handleCommentCreate}>
        <div>
          <textarea
            onChange={handleOnChange}
            placeholder='댓글을 남겨보세요'
            className='resize-none w-[100%] text-[13px]'
          />
        </div>
        <div className='float-right'>
          <button className='text-[13px] text-[#009f47] bg-[#03c75a1f] rounded-[6px] font-[700] h-[34px] w-[46px]'>
            등록
          </button>
        </div>
      </form>
    </section>
  );
}

export default CommentWrite;
