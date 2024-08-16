'use client';

import TextInput from './TextInput';
import BoardSelect from './BoardSelect';
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('./Editor'), {
  ssr: false,
});

import { useState } from 'react';
import { useHandleWritePost } from '../_hooks/useHandleWritePost';

import { type PostDetailType } from '@/types/common';
import { type PostMethodType } from './type';

interface Props {
  postDetail: PostDetailType | null;
  defaultSelectedBoardId: string | '';
  user_id: string;
  user_level: number;
  postMethod: PostMethodType;
}

function PostWriteForm({
  user_id,
  user_level,
  postDetail,
  postMethod,
  defaultSelectedBoardId,
}: Props) {
  const [editorContent, setEditorContent] = useState<string>(
    postDetail?.content ?? ''
  );

  const { handleWritePost } = useHandleWritePost({
    editorContent,
    postDetail,
    postMethod,
    user_id,
  });

  return (
    <form onSubmit={handleWritePost}>
      <section className='flex justify-between border-b border-[#000] pr-[24px] mb-[26px] '>
        <h1 className='text-[22px] font-[700] mb-[16px]  '>
          카페 글쓰기
        </h1>
        <button className='w-[50px] h-[36px] px-[12px] text-[13px] font-[700] bg-[#03c75a1f] text-[#009F47] rounded-[6px] '>
          등록
        </button>
      </section>

      <section className='flex flex-col gap-[12px] border border-[#eee] rounded-[14px] px-[20px] py-[28px] mr-[8px]'>
        <BoardSelect
          className='h-[48px] rounded-[12px]'
          htmlName='board_id'
          user_level={user_level}
          defaultSelectedBoardId={defaultSelectedBoardId}
        />
        <TextInput
          placeholder='상품명(제목)'
          htmlName='title'
          defaultValue={postDetail?.title}
        />
        <TextInput
          placeholder='가격을 입력하세요'
          htmlName='price'
          defaultValue={postDetail?.price}
        />
        <TextInput
          placeholder='이미지 주소를 입력하세요'
          htmlName='item_img'
          defaultValue={postDetail?.item_img}
        />
        <Editor
          setEditorContent={setEditorContent}
          defaultValue={postDetail?.content!}
        />
      </section>
    </form>
  );
}

export default PostWriteForm;
