'use client';

import { FormEvent } from 'react';
import { PostDetailType, PostFormType } from '@/types/common';
import { SupabaseBrowserApi } from '@/api/supabase.browser.api';
import { useRouter } from 'next/navigation';
import TextInput from './TextInput';
import BoardSelect from './BoardSelect';

interface Props {
  postDetail: PostDetailType | null;
  board_id: number | '';
  user_id: string;
  user_level: number;
}

//Todo. 게시글 작성 중에 다른 페이지로 이동하려고 할 시 알림메시지 표시
function PostWriteForm({
  postDetail,
  board_id: defaultSelectedBoardId,
  user_id,
  user_level,
}: Props) {
  const router = useRouter();

  async function handleWritePost(e: FormEvent) {
    e.preventDefault();

    const formElem = e.target as HTMLFormElement;
    const formData = new FormData(formElem);

    const title = formData.get('title') as string;
    const item_img = formData.get('item_img') as string;
    const price = formData.get('price') as string;
    const content = formData.get('content') as string;
    const board_id = formData.get('board') as string;

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
      board_id: +board_id,
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
        <button className='w-[50px] h-[36px] px-[12px] text-[13px] font-[700] bg-[#03c75a1f] text-[#009F47] rounded-[6px] '>
          등록
        </button>
      </div>

      <div className='flex flex-col gap-[12px] border border-[#eee] rounded-[14px] px-[20px] py-[28px] mr-[8px]'>
        <BoardSelect
          className='h-[48px] rounded-[12px]'
          name='board'
          user_level={user_level}
          defaultSelectedBoardId={defaultSelectedBoardId}
        />

        <TextInput
          placeholder='상품명(제목)'
          name='title'
          defaultValue={postDetail?.title}
        />
        <TextInput
          placeholder='가격을 입력하세요'
          name='price'
          defaultValue={postDetail?.price}
        />

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
