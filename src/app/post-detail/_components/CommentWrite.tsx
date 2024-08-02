'use client';

import { SupabaseBrowserApi } from '@/api/supabase.browser.api';
import { CommentCreateFormType } from '@/types/common';
import { useState } from 'react';

interface Props {
  postId: string;
}

function CommentWrite({ postId }: Props) {
  const [comment, setComment] = useState<string>('');

  async function handleCommentCreate(e: React.FormEvent) {
    e.preventDefault();

    if (comment.length === 0) {
      alert('댓글을 입력해주세요.');
      return;
    }

    const form = e.target as HTMLFormElement;

    const user = await SupabaseBrowserApi.getUser();

    const commentForm: CommentCreateFormType = {
      content: comment,
      post_id: postId,
      user_id: user.id,
    };

    await SupabaseBrowserApi.createComment(commentForm);

    alert('댓글등록');

    form.reset();
  }

  return (
    <section>
      <form onSubmit={handleCommentCreate}>
        <button>등록</button>
        <div>
          <span>댓글입력:</span>
          <input onChange={e => setComment(e.target.value)} />
        </div>
      </form>
    </section>
  );
}

export default CommentWrite;
