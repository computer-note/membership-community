'use client';

import { PostItemType } from '@/types/common';
import PostItem from './PostItem';

import { useBoardPostListQuery } from '@/hooks/usePostTanstack';

interface Props {
  postList: PostItemType[];
  boardId: number;
}

function PostList({ postList: postListInitialData, boardId }: Props) {
  const { data: postList } = useBoardPostListQuery(
    boardId,
    postListInitialData
  );

  return (
    <table>
      <thead className='border-t border-black'>
        <tr className='*:h-[40px] *:text-[13px]'>
          <th className='w-[594px]'>제목</th>
          <th className='w-[118px] text-left'>작성자</th>
          <th className='w-[80px]'>작성일</th>
          <th className='w-[60px]'>조회</th>
        </tr>
      </thead>
      <tbody>
        {postList.map(postItem => (
          <PostItem key={postItem.id} postItem={postItem} />
        ))}
      </tbody>
    </table>
  );
}

export default PostList;
