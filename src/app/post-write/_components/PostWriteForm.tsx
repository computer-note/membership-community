'use client';

import { FormEvent } from 'react';
import { PostFormType } from '@/types/common';
import { SupabaseBrowserApi } from '@/api/supabase.browser.api';
import { useRouter } from 'next/navigation';
import TextInput from './TextInput';

interface Props {
  board_id: number;
  user_id: string;
}

//Todo. 게시글 작성 중에 다른 페이지로 이동하려고 할 시 알림메시지 표시
function PostWriteForm({ board_id, user_id }: Props) {
  const router = useRouter();

  async function handleWritePost(e: FormEvent) {
    e.preventDefault();

    const formElem = e.target as HTMLFormElement;
    const formData = new FormData(formElem);

    const title = formData.get('title') as string;
    const item_img = formData.get('item_img') as string;
    const price = formData.get('price') as string;
    const content = formData.get('content') as string;

    //Todo. 유효성 검사 로직 추가
    if (
      !title.length ||
      !item_img.length ||
      !price.length ||
      !content.length
    ) {
      alert('필드를 모두 입력해주세요.');
      return;
    }

    const postFormData: PostFormType = {
      board_id,
      user_id,
      content,
      item_img,
      price: Number.isNaN(+price) ? '9999' : price,
      title,
    };

    //에러 처리
    await SupabaseBrowserApi.createPost(postFormData);

    alert('게시글 작성 완료');

    router.push(`/board/${board_id}`);

    //Todo. 이후 RevalidatePath 할지 결정
  }

  return (
    <form onSubmit={handleWritePost}>
      <div className='flex justify-between border-b border-[#000] pr-[24px] mb-[26px] '>
        <h1 className='text-[22px] font-[700] mb-[16px]  '>
          카페 글쓰기
        </h1>
        <button>등록</button>
      </div>

      <div className='flex flex-col gap-[12px] border border-[#eee] rounded-[14px] px-[20px] py-[28px] mr-[8px]'>
        <TextInput placeholder='상품명(제목)' name='title' />
        <TextInput placeholder='가격을 입력하세요' name='price' />

        <div>
          <label htmlFor='item_img'>이미지</label>
          <input name='item_img' />
        </div>

        <div>
          <label htmlFor='content'>내용</label>
          <input name='content' />
        </div>
      </div>
    </form>
  );
}

export default PostWriteForm;
