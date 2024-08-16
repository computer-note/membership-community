import {
  usePostCreateMutation,
  usePostModifyMutation,
} from '@/hooks/usePostTanstack';
import { useRouter } from 'next/navigation';

import { FormEvent } from 'react';
import { PostMethodType } from '../_components/type';
import { PostDetailType, PostFormType } from '@/types/common';

interface PostHandlerContext {
  editorContent: string;
  postMethod: PostMethodType;
  postDetail: PostDetailType | null;
  user_id: string;
}

export function useHandleWritePost({
  editorContent,
  postDetail,
  postMethod,
  user_id,
}: PostHandlerContext) {
  const postCreateMutation = usePostCreateMutation();
  const postModifyMutation = usePostModifyMutation();
  const router = useRouter();

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
      //Todo. 해당 포스트의 상세 페이지 캐시 무효화
      router.push(`/post-detail/${postDetail?.id}`);
    }
  }

  return { handleWritePost };
}
