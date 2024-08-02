import { PostFormType } from '@/types/common';
import { FormEvent } from 'react';

interface Props {
  params: { board_id: string };
}

function PostWritePage({ params: { board_id } }: Props) {
  function handleWritePost(e: FormEvent) {}

  return (
    <section>
      <form onSubmit={handleWritePost}>
        <div>
          <label>제목</label> <input />
        </div>
        <div>
          <label>이미지</label> <input />
        </div>
        <div>
          <label>내용</label> <input />
        </div>
      </form>
    </section>
  );
}

export default PostWritePage;
