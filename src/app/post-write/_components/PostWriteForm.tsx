'use client';

import TextInput from './TextInput';
import BoardSelect from './BoardSelect';
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('./Editor'), {
  ssr: false,
});

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  usePostCreateMutation,
  usePostModifyMutation,
} from '@/hooks/usePostTanstack';

import {
  type PostDetailType,
  type PostFormType,
} from '@/types/common';
import { type FormEvent } from 'react';
import { type PostMethodType } from './type';

interface Props {
  postDetail: PostDetailType | null;
  defaultSelectedBoardId: string | '';
  user_id: string;
  user_level: number;
  postMethod: PostMethodType;
}

//Todo. 게시글 작성 중에 다른 페이지로 이동하려고 할 시 알림메시지 표시
function PostWriteForm({
  user_id,
  user_level,
  postDetail,
  postMethod,
  defaultSelectedBoardId,
}: Props) {
  const router = useRouter();
  const [editorContent, setEditorContent] = useState<string>(
    postDetail?.content ?? ''
  );

  const postCreateMutation = usePostCreateMutation();
  const postModifyMutation = usePostModifyMutation();

  async function handleWritePost(e: FormEvent) {
    e.preventDefault();

    const formElem = e.target as HTMLFormElement;
    const formData = new FormData(formElem);

    const title = formData.get('title') as string;
    const item_img = formData.get('item_img') as string;
    const price = formData.get('price') as string;
    const board_id = formData.get('board_id') as string;

    const content = editorContent;

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
      post_id: postDetail?.id,
    };

    if (postMethod === 'create') {
      postCreateMutation.mutate(postFormData);
      alert('게시글 작성 완료');
      router.push(`/board/${board_id}`);
    } else if (postMethod === 'modify') {
      postModifyMutation.mutate(postFormData);
      alert('게시글 수정 완료');
      //Todo. 해당 포스트의 게시글 상세 페이지의 캐시 무효화
      router.push(`/post-detail/${postDetail?.id}`);
    }
  }

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
