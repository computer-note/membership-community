'use client';

import PostItem from './PostItem';

import { PostItemType } from '@/types/common';
import { useUserPostListQuery } from '@/hooks/usePostTanstack';

interface Props {
  userId: string;
  postList: PostItemType[];
}

function PostList({ userId, postList: postListInitialData }: Props) {
  const { data: postList } = useUserPostListQuery(
    userId,
    postListInitialData
  );

  return (
    <table className='border-t border-[#666]  text-[13px] '>
      <thead className='h-[45px] border-b border-[#f2f2f2]'>
        <tr>
          <th className='w-[660px]'>제목</th>
          <th className='w-[120px]'>작성일</th>
          <th className='w-[80px]'>조회</th>
        </tr>
      </thead>
      <tbody>
        {postList?.map(postItem => (
          <tr
            key={postItem.id}
            className='h-[38px] border-b border-[#f2f2f2]'
          >
            <PostItem postItem={postItem} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PostList;
